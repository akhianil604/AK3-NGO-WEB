const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String, enum: ["Harassment", "Forced Labour", 
        "Human Trafficking", "Child Marriage", "Domestic Violence", 
        "Dowry", "Rehabilitation"], required: true }],
    // files: [{
    //     data: { type: Buffer, required: true }, 
    //     contentType: { type: String, required: true }, 
    //     filename: { type: String, required: true }, 
    // }],
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required : true},
    gender: {type: String, enum:["Male", "Female", "Other"], required: true},
    dob: { type: Date, required: true},
    // age: { type: Number, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    marital: { type: String, enum: ['Minor', 'Unmarried', 'Married'], required: true},
    education: { type: String, enum:['None', 'Primary', 'Secondary', 'Diploma', 'UG', 'PG'], required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    
    status: { type: String, enum: ["open", "assigned", "resolved"], default: "open", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    // Maybe make separate db for history to not clutter up Query
    history: { type: [{
        timestamp: { type: Date, default: Date.now , required: true},
        assignedToRole: { type: String , enum:["admin", "ngo", "police"], required: true},
    }], default: [{
        timestamp: Date.now(),
        assignedToRole: "admin"
    }]}   
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
