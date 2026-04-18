/**
 * server/models/Order.js
 * Dry-cleaning order schema
 */

const mongoose = require('mongoose');

/* ── Garment prices (single source of truth) ── */
const GARMENT_PRICES = {
  'Shirt':        40,
  'Pants':        50,
  'Saree':       120,
  'Suit/Blazer': 180,
  'Kurta':        60,
  'Jacket':      150,
  'Bedsheet':    100,
  'Curtain':      80,
  'Sweater':      90,
  'T-Shirt':      35,
};

const garmentItemSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, enum: Object.keys(GARMENT_PRICES) },
    qty:   { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type:   String,
      unique: true,
      index:  true,
    },
    customerName: {
      type:     String,
      required: [true, 'Customer name is required'],
      trim:     true,
      index:    true,
    },
    phone: {
      type:     String,
      required: [true, 'Phone number is required'],
      trim:     true,
      match:    [/^\d{10}$/, 'Phone must be 10 digits'],
      index:    true,
    },
    garments: {
      type:     [garmentItemSchema],
      validate: {
        validator: v => v && v.length > 0,
        message:   'At least one garment is required',
      },
    },
    total: {
      type: Number,
      min:  0,
    },
    status: {
      type:    String,
      enum:    ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
      default: 'RECEIVED',
      index:   true,
    },
    estimatedDelivery: {
      type:     Date,
      required: [true, 'Estimated delivery date is required'],
    },
    notes: {
      type:    String,
      trim:    true,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
    },
  },
  { timestamps: true }
);

/* Auto-generate orderId and compute total before saving */
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Generate orderId: CLN-YYMMDD-XXXX
    const now      = new Date();
    const datePart = now.toISOString().slice(2, 10).replace(/-/g, '');
    const randPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    this.orderId   = `CLN-${datePart}-${randPart}`;
  }

  // Recalculate total from garments
  this.total = this.garments.reduce((sum, g) => sum + g.qty * g.price, 0);

  next();
});

/* Text index for full-text search across customer name + phone */
orderSchema.index({ customerName: 'text', phone: 'text' });

/* Export prices so routes can use them */
orderSchema.statics.GARMENT_PRICES = GARMENT_PRICES;

module.exports = mongoose.model('Order', orderSchema);
