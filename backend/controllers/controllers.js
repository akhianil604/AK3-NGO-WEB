const User = require('../models/User');
const Query = require('../models/Query');
const bcrypt = require('bcrypt');
const auth = require("../auth")

const register = async (req, res) => {
    const { name, password, gender, email, phone_no,
        dob, age, married, education, address,
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
        const user = await User.findOne({ usercode });
        if (user && await bcrypt.compare(password, user.password)) {
            res.send({token: generateToken(user)}); // This should be stored in localstorage on frontend
        } else {
            res.status(401).send('Invalid credentials'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

const newAnonQuery = async (req, res) => {
    const { name, email, phone_no, gender,
        dob, age, married, education, address,
        city, state, title, desc, category, files, 
     } = req.body;

    try {
        const newQuery = new Query({
            name: name, 
            gender: gender,
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
        await newQuery.save();
        res.status(201).send('Query created');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating query');
    } 
}

//Only difference is this authenticates the user
const newRegisteredQuery = async (req, res) => {
    const { user, name, email, phone_no, gender,
        dob, age, married, education, address,
        city, state, title, desc, category, files, 
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newQuery = new Query({
            user_id: user.id,
            name: name, 
            gender: gender,
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
            user.role,
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

const getUserQueries = async(req, res)=>{
    try{
        const result = await Query.find({"user_id" : req.user.id},{title:1, category:1, desc:1})
        res.status(200).send(result); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const getAssignedQueries = async(req, res)=>{
    try{
        const result = await Query.find({"assignedTo" : req.user.id},{title:1, category:1, desc:1})
        res.status(200).send(result); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const getPendingQueries = async(req, res)=>{
    try{
        const result = await Query.find({"history.0.assignedToRole" : req.user.role, "assignedTo" : null},{title:1, category:1, desc:1})
        res.status(200).send(result); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const updateUserDetails = async(req,res)=>{
    const {name, email, phone_no, address,
        password, gender, education, married
    }= req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await Query.findByIdAndUpdate(req.user.id,{
            name: name,
            email: email,
            phone_no: phone_no,
            address: address,
            password: hashedPassword,
            gender: gender,
            education: education,
            married: married
        })
        res.status(200).send("Updated user details"); 
    } catch(error){
        console.error(error);
        res.status(500).send('Error updating user details');
    }
}

module.exports = {register, login, 
    newAnonQuery, newRegisteredQuery, 
    getQueriesFromRole, getUserQueries, getAssignedQueries, getPendingQueries, getQueryStatus,
    acceptQuery, resolveQuery, rejectQuery, sendQueryToRole, };