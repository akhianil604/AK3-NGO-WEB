const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    userName: { type: String, required: function() { return !this.userId; } }, // Required if userId is not present
    userEmail: { type: String, required: function() { return !this.userId; } }, // Required if userId is not present
    userPhone: { type: String, required: function() { return !this.userId; } }, // Required if userId is not present

    status: { type: String, enum: ['open', 'assigned', 'resolved'], default: 'open', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    history: [{
        timestamp: { type: Date, default: Date.now , required: true},
        assignedToRole: { type: String , required: true},
    }],
    files: [{
        data: { type: Buffer, required: true }, 
        contentType: { type: String, required: true }, 
        filename: { type: String, required: true }, 
    }]
    
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;

