/**
 * server/routes/orders.js
 * All order-related endpoints (all protected by JWT)
 *
 * GET    /api/orders            — list / search / filter
 * POST   /api/orders            — create order
 * GET    /api/orders/prices     — get garment price list
 * GET    /api/orders/dashboard  — dashboard stats
 * GET    /api/orders/:id        — single order
 * PATCH  /api/orders/:id/status — update status
 * PUT    /api/orders/:id        — full update (admin)
 * DELETE /api/orders/:id        — delete (admin)
 */

const express              = require('express');
const Order                = require('../models/Order');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All order routes require authentication
router.use(protect);

/* ── Garment price list ─────────────────────── */
router.get('/prices', (req, res) => {
  res.json({ prices: Order.GARMENT_PRICES });
});

/* ── Dashboard stats ────────────────────────── */
router.get('/dashboard', async (req, res) => {
  try {
    const [statusCounts, revenueResult, totalOrders] = await Promise.all([
      Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.countDocuments(),
    ]);

    const byStatus = { RECEIVED: 0, PROCESSING: 0, READY: 0, DELIVERED: 0 };
    statusCounts.forEach(({ _id, count }) => (byStatus[_id] = count));

    res.json({
      totalOrders,
      totalRevenue:  revenueResult[0]?.total || 0,
      byStatus,
      readyCount:      byStatus.READY,
      processingCount: byStatus.PROCESSING,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard data.' });
  }
});

/* ── List / Search / Filter orders ─────────── */
router.get('/', async (req, res) => {
  try {
    const {
      q,           // full-text search (name, phone)
      status,      // RECEIVED | PROCESSING | READY | DELIVERED
      garment,     // garment type filter
      phone,       // exact phone search
      page  = 1,
      limit = 20,
      sort  = '-createdAt',
    } = req.query;

    const filter = {};

    // Status filter
    if (status) filter.status = status;

    // Garment type filter — match any garment item by name
    if (garment) filter['garments.name'] = garment;

    // Exact phone filter
    if (phone) filter.phone = phone.trim();

    // Text search (name or phone substring)
    if (q) {
      const regex = new RegExp(q.trim(), 'i');
      filter.$or  = [{ customerName: regex }, { phone: regex }];
    }

    const skip  = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate('createdBy', 'name email'),
      Order.countDocuments(filter),
    ]);

    res.json({
      orders,
      pagination: {
        total,
        page:       Number(page),
        limit:      Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: err.message });
  }
});

/* ── Create order ───────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, garments, estimatedDelivery, notes } = req.body;

    // Validate garments against known prices
    const prices      = Order.GARMENT_PRICES;
    const invalidItem = (garments || []).find(g => !prices[g.name]);
    if (invalidItem) {
      return res.status(400).json({ message: `Unknown garment: ${invalidItem.name}` });
    }

    // Attach server-side prices (never trust client-sent prices)
    const validatedGarments = (garments || []).map(g => ({
      name:  g.name,
      qty:   g.qty,
      price: prices[g.name],
    }));

    const order = await Order.create({
      customerName,
      phone,
      garments:          validatedGarments,
      estimatedDelivery: new Date(estimatedDelivery),
      notes,
      createdBy:         req.user._id,
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── Single order ───────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [{ orderId: req.params.id }, { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null }],
    }).populate('createdBy', 'name email');

    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order.' });
  }
});

/* ── Update status ──────────────────────────── */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── Full update (admin only) ───────────────── */
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const { customerName, phone, garments, estimatedDelivery, status, notes } = req.body;
    const prices = Order.GARMENT_PRICES;

    const validatedGarments = (garments || []).map(g => ({
      name:  g.name,
      qty:   g.qty,
      price: prices[g.name] || g.price,
    }));

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { customerName, phone, garments: validatedGarments, estimatedDelivery, status, notes },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ── Delete order (admin only) ──────────────── */
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order.' });
  }
});

module.exports = router;