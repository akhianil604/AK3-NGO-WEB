const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Query = require('../models/Query');

const router = express.Router();

// For regular users
router.post('/register', async (req, res) => {
    const { name, password, email, phone_no,
        dob, age, married, education, address,
        city, state
     } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const usercount = await User.find({"role":"user"}).countDocuments()+1;
        const usercode = "USR"+String(usercount).padStart(4, '0');
        const newUser = new User({ 
            usercode: usercode,
            name: name, 
            password: hashedPassword,
            email: email,
            phone_no: phone_no,
            dob: dob,
            age: age,
            married: married,
            education: education,
            address: address,
            city: city,
            state: state,
        });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { usercode, password } = req.body;

    try {
        const user = await User.findOne({ usercode });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id; 
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

router.post('/newQuery', async (req, res) => {
    const { user_id, name, email, phone_no, 
        dob, age, married, education, address,
        city, state, title, desc, category, files, 
     } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newQuery = new Query({
            user_id: user_id || null,
            name: name, 
            email: email,
            phone_no: phone_no,
            dob: dob,
            age: age,
            married: married,
            education: education,
            address: address,
            city: city,
            state: state,

            title: title, 
            desc: desc,
            category: category,
            files: files,
        });
        await newQuery.save({ session });

        await User.findByIdAndUpdate(
            user_id,
            { $push: { queries: { $each: [newQuery._id], $position: 0 }}}, 
            { session }
        );
        await session.commitTransaction();
        res.status(201).send('Query created');

    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).send('Error creating query');
    } finally {
        session.endSession();
    }
});

router.get('/queriesFromRole', async(req, res)=>{
    try {
        const {user_id} =  req.query;
        const user = await Query.findById(user_id);
        const result = await Query.find({"history.0.assignedToRole" : user.role})
        res.status(200).send(result); 
    }
    catch (error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
})



module.exports = router;
