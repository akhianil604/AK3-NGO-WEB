const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_no: { type: String, required: true },
    role: { type: String, default: 'user' , required: true }, 
    queries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'query', required:true }] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
