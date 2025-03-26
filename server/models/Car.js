const vehicleSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['car', 'bike'] },
    brand: String,
    model: String,
    hourlyRate: Number,
    location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
    },
    images: [String], // AWS S3 URLs
    });