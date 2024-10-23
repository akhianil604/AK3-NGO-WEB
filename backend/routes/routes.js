const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Query = require('../models/Query');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email, phone_no } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username: username, 
            password: hashedPassword,
            email: email,
            phone_no: phone_no,
        });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
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

//anonymous queries
router.post('/mewAnonQuery', async (req, res) => {
    const { username, email, phone_no, title, desc, files } = req.body;

    try {
        const newQuery = new Query({
            username: username,
            email: email,
            phone_no: phone_no,
            title: title, 
            desc: desc,
            files: files,
        });
        await newQuery.save(); 
        res.status(201).send('Anonymous query created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating anonymous query');
    }
});

//query from registered user
router.post('/newQuery', async (req, res) => {
    const { user_id, title, desc, files } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newQuery = new Query({
            user_id: user_id,
            title: title,
            desc: desc,
            files: files,
        });
        await newQuery.save({ session });

        await User.findByIdAndUpdate(
            user_id,
            { $push: { queries: newQuery._id } }, 
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

router.get('/queries', async(req, res)=>{
    const {role} =  req.body;
    res.send(Query.find());
})

module.exports = router;
