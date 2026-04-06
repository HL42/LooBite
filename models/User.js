/**
 * Artifact Name: User.js
 * Description: Domain entity representing a registered student or owner.
 * Programmer: Fuquan
 * Date: April 6, 2026
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // 
  email: { type: String, required: true }, // 
  verificationStatus: { type: Boolean, default: false } // 
});

module.exports = mongoose.model('User', userSchema);