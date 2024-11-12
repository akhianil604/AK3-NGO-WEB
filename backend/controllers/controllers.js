const User = require('../models/User');
const Query = require('../models/Query');
const bcrypt = require('bcrypt');
const auth = require("../auth")
const mongoose = require('mongoose')

const register = async (req, res) => {
    const { name, password, gender, email, phone,
        DOB, maritalStatus, education, address,
        city, state
     } = req.body;

    try {
        const userExists = await User.findOne({"email": email});
        if(userExists){
                res.status(409).send('Email already registered');
            }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);

            const usercount = await User.find({"role":"user"}).countDocuments()+1;
            const usercode = "USR"+String(usercount).padStart(4, '0');
            //Should send this usercode to given email
            const newUser = new User({ 
                usercode: usercode,
                name: name, 
                password: hashedPassword,
                gender: gender,
                email: email,
                phone: phone,
                dob: DOB,
                marital: maritalStatus,
                education: education,
                address: address,
                city: city,
                state: state,
            });
            await newUser.save();
            res.status(201).send({token: auth.generateToken(newUser)});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

const login = async (req, res) => {
    const { usercode, password } = req.body;

    try {
        const user = await User.findOne({ usercode:  usercode });
        if (user && await bcrypt.compare(password, user.password)) {
            res.send({token: auth.generateToken(user)}); // This should be stored in localstorage on frontend
        } else {
            res.status(401).send('Invalid credentials'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

const newAnonQuery = async (req, res) => {
    const { name, email, phone, gender,
        dob, marital, education, address,
        city, state, title, description, category, 
     } = req.body;

    try {
        const newQuery = new Query({
            name: name, 
            gender: gender,
            email: email,
            phone: phone,
            dob: dob,
            marital: marital,
            education: education,
            address: address,
            city: city,
            state: state,

            title: title, 
            description: description,
            category: category,
            // files: files,
        });
        await newQuery.save();
        res.status(201).send('Query created');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating query');
    } 
}

//Only difference is this authenticates the user
const newRegisteredQuery = async (req, res) => {
    const {victimName, email, phone, gender,
        dob, maritalStatus, education, address,
        city, state, title, description, category, 
    } = req.body;

    // const session = await mongoose.startSession();
    // session.startTransaction();
    // console.log(req.user);
    // console.log(req.user.id);

    try {
        const newQuery = new Query({
            user_id: req.user.id,
            name: victimName, 
            gender: gender,
            email: email,
            phone: phone,
            dob: dob,
            marital: maritalStatus,
            education: education,
            address: address,
            city: city,
            state: state,

            title: title, 
            description: description,
            category: category,
            // files: files,
        });
        await newQuery.save();
        // await newQuery.save({ session });

        
        // await User.findByIdAndUpdate(
        //     req.user.id,
        //     { $push: { queries: { $each: [newQuery._id], $position: 0 }}}, 
        //     // { session }
        // );
        
        // await session.commitTransaction();
        res.status(201).send('Query created');

    } catch (error) {
        // await session.abortTransaction();
        console.error(error);
        res.status(500).send('Error creating query');
    } finally {
        // session.endSession();
    }
}

const sendQueryToRole = async(req, res)=>{
    try{
        const { queryId, targetRole, user } = req.body;
        if(targetRole == "admin" && (user.role == "ngo" || user.role == "pol") ||
        user.role == "admin" && (targetRole == "ngo" || targetRole == "pol") ){
            await Query.findByIdAndUpdate(queryId, 
                { $push: { history:{ timestamp: Date.now(), assignedtoRole: targetRole } },
                $set: { status: "open", assignedTo: null }}
            )
        }
        else{
            res.status(400).send("Invalid roles");
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error sending query to role');
    } 
}

const getQueryStatus = async(req, res)=>{
    try{
        const { queryId } = req.body;
        const status = await Query.findById(queryId, {status : 1});
        res.status(200).send(status);
    } catch (error){
        console.error(error);
        res.status(500).send('Error getting query status');
    } 
}

const acceptQuery = async(req, res)=>{
    try{
        const {queryId, user} = req.body;
        if (await Query.findById(queryId) === user.role){
            await Query.findByIdAndUpdate(queryId, {status: "assigned", assignedTo: user.role});
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error accepting queries');
    } 
}

const resolveQuery = async(req, res)=>{
    try{
        const { queryId } = req.body;
        const queryDoc = await Query.findById(queryId);
        if (queryDoc.assignedTo === req.user.id){
            await Query.findByIdAndUpdate(queryId, {status: "resolved"});
        }
        else{
            res.status(401).send('User has not claimed query')
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error completing query');
    } 
}

const rejectQuery = async(req, res)=>{
    try{
        const { queryId } = req.body;
        const queryDoc = await Query.findById(queryId);
        if (queryDoc.assignedTo === req.user.id){
            await Query.findByIdAndUpdate(queryId, {status: "open", assignedTo: null}); 
        }
        else{
            res.status(401).send('User has not claimed query')
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Error completing query');
    } 
}

const getQueriesFromRole = async(req, res)=>{
    try {
        const result = await Query.find({"history.0.assignedToRole" : req.user.role},{title:1, category:1, desc:1})
        res.status(200).send(result); 
    } catch (error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

/*     {
        "title": "Minor Girl being forcibly married",
        "category": "Child Marriage",
        "description": "Attend to the immediate requirements of new project planning.",
        "name": "hello",
        "gender": "Male",
        "dob": "27-01-2001",
        "phone": "aaa",
        "email": "mail",
        "marital": "married",
        "education": "edu",
        "address": "address",
        "city": "city"
    }, */

const getUserQueries = async(req, res)=>{
    try{
        const result = await Query.find({"user_id" : req.user.id},
            {
                title:1, category:1, description:1, 
                name:1, gender:1, dob:1, phone:1,
                email:1, marital:1, education:1,
                address:1, city:1, _id: 1
            })
        // console.log(result);
        res.status(200).send(result); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const getAssignedQueries = async(req, res)=>{
    try{
        const result = await Query.find({"assignedTo" : req.user.id},{title:1, category:1, description:1})
        res.status(200).send(result); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const getPendingQueries = async(req, res)=>{
    try{
        const result = await Query.find({"history.0.assignedToRole" : req.user.role, "assignedTo" : null},{title:1, category:1, description:1})
        res.status(200).send(result); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const updateUserDetails = async(req,res)=>{
    const {name, email, phone, address,
        password, gender, education, marital
    }= req.body;

    try{
        // console.log(req.user);
        // const hashedPassword = await bcrypt.hash(password, 10);
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;
        if (gender) updateData.gender = gender;
        if (education) updateData.education = education;
        if (marital) updateData.marital = marital;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        // console.log(updateData);
        
        await User.findByIdAndUpdate(req.user.id, updateData)
        // console.log(result);
        res.status(200).send("Updated user details"); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error updating user details');
    }
}

const getUserDetails = async(req, res)=>{
    try{
        const status = await User.findById(req.user.id, 
            { 
                usercode : 1,
                name: 1,
                gender: 1,
                dob: 1,
                email: 1,
                phone: 1,
                education: 1,
                marital: 1,
                address: 1,
            }
        );
        res.status(200).send(status);
    } catch (error){
        console.error(error);
        res.status(500).send('Error getting user details');
    } 
}

// const deleteQuery = async(req,res)=>{

//     try{

//     } catch(error){
//         console.error(error);
//         res.status(500).send('Error updating user details');
//     }
// }

module.exports = {register, login, updateUserDetails,
    newAnonQuery, newRegisteredQuery, 
    getQueriesFromRole, getUserQueries, getAssignedQueries, getPendingQueries, getQueryStatus,
    acceptQuery, resolveQuery, rejectQuery, sendQueryToRole, 
    getUserDetails};