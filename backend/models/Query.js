const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, enums: ["harrassment", "forced_labor", 
        "human_trafficking", "child_marraige", "domestic_violence", 
        "dowry", "rehabilitation"], required: true },
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String, required : true},
    gender: {type: String, enum:["male", "female", "other"], required: true},
    dob: { type: Date, required: true},
    age: { type: Number, required: true},
    email: { type: String, required: true},
    phone_no: { type: String, required: true},
    married: { type: String, enum: ['minor', 'unmarried', 'married'], required: true},
    education: { type: String, enum:['school', '10thpass', '12th_pass', 'diploma', 'undergrad', 'postgrad'], required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    role: {type: String, enum: ['user', 'police', 'ngo', 'admin'], default: 'user'},

    status: { type: String, enum: ["open", "assigned", "resolved"], default: "open", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    history: { type: [{
        timestamp: { type: Date, default: Date.now , required: true},
        assignedToRole: { type: String , enum:["admin", "ngo", "police"], required: true},
    }], default: [{
        timestamp: Date.now(),
        assignedToRole: "admin"
    }]},
    files: [{
        data: { type: Buffer, required: true }, 
        contentType: { type: String, required: true }, 
        filename: { type: String, required: true }, 
    }]
    
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
