import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  starsReceived: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
