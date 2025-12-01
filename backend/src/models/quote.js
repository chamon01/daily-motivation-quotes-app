import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  author: { type: String, default: 'Unknown', trim: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flagged: { type: Boolean, default: false },
  flagReason: { type: String },
  approved: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Quote', quoteSchema);
