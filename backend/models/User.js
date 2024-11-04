const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usercode: { type: String, required: true, unique: true}, //only used for login
    name: { type: String, required : true},
    password: { type: String, required: true },
    gender: {type: String, enum: ["male", "female", "other"], required: true},
    dob: { type: Date, required: true},
    age: { type: Number, required: true},
    email: { type: String, required: true, unique: true, 
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    phone_no: { type: String, required: true,
        validate: {
            validator: function(v) {
                return /\d{9}/.test(v);
            },
            message: "Please enter a valid phone no"
        },},
    married: { type: String, enum: ['minor', 'unmarried', 'married'], required: true},
    education: { type: String, enum:['school', '10thpass', '12th_pass', 'diploma', 'undergrad', 'postgrad'], required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
    role: {type: String, enum: ['user', 'police', 'ngo', 'admin'], default: 'user'},
});

const User = mongoose.model('User', userSchema);

module.exports = User;


/* Sign Up:
1. Name - "input"
2. Gender - "checkbox/radio button"
3. DOB - "DOB input"
4. Age - "age/number"
5. Email Address - "email input"
6. Phone Number (Guardian's Phone Number if User is Minor) - "input tel"
7. Marital Status (Minor/Unmarried/Married) - "radio"
8. Educational Qualification - "drop-down option"
9. Address - "textarea"
10. City/Town - "input/drop-down(too tedious)"
11. State - "input/drop-down(too tedious)"

Educational Qualifications:
1. Schooling Not Completed
2. 10th Grade Pass
3. 12th Grade Pass
4. Diploma
5. Undergraduate
6. Graduate/Postgraduate */