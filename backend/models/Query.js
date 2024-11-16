const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String, enum: ["Harrassment", "Forced Labor", 
        "Human Trafficking", "Child Marriage", "DOmestic Violence", 
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


/* 1. Victim"s Name - "input"
2. Gender - "checkbox/radio button"
3. DOB - "DOB input"
4. Age - "age/number"
4. Phone - "input tel"
5. Email Address - "email input" 
6. Marital Status (Minor/Unmarried/Married) - "radio"
8. Educational Qualification - "drop-down option"
9. Residential Address - "textarea"
10. City/Town - "input/drop-down(too tedious)"
11. State - "input/drop-down(too tedious)"
12. Category [Nature of Atrocity/Assistance] (Drop-Down Menu)
13. Description - "textarea"
14. Choose File - "input file"

NGO Categories: 
1. Harassment
2. Forced Labour
3. Human Trafficking
4. Child Marriage
5. Domestic Violence
6. Dowry
7. Rehabilitation-Assistance */
