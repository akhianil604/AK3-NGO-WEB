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
            res.send({token: generateToken(user._id)}); // This should be stored in localstorage on frontend
        } else {
            res.status(401).send('Invalid credentials'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

const newQuery = async (req, res) => {
    const { user_id, name, email, phone_no, gender,
        dob, age, married, education, address,
        city, state, title, desc, category, files, 
     } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newQuery = new Query({
            user_id: user_id || null,
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
}

const queriesFromRole = async(req, res)=>{
    try {
        const {user_id} =  req.query;
        const user = await Query.findById(user_id);
        const result = await Query.find({"history.0.assignedToRole" : user.role})
        res.status(200).send(result); 
    } catch (error){
        console.error(error);
        res.status(500).send('Error getting queries');
    }
}

const acceptQuery = async(req, res)=>{
    try{
        const {queryId, user_id} = req.body;
        Query.findByIdAndUpdate(queryId, {status: "assigned", assignedTo: user_id});
    } catch (error){
        console.error(error);
        res.status(500).send('Error accepting queries');
    } 
}

module.exports = {register, login, newQuery, queriesFromRole, acceptQuery};