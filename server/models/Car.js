const carSchema = new mongoose.Schema({
  seller: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, min: 2000 },
  pricePerDay: { type: Number, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  images: [String],
  features: [String],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  availability: { type: Boolean, default: true }
}, { timestamps: true });

carSchema.index({ location: '2dsphere' });