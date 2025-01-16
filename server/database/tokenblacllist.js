import mongoose from 'mongoose';

const TokenBlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    expiry: { type: Date, default:Date.now,expires:'1h' },
});

export const TokenBlacklistModel = mongoose.model('TokenBlacklist', TokenBlacklistSchema);
