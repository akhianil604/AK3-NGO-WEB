const jwt = require("jsonwebtoken");

function generateToken(user){
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // console.log(err);
  
      if (err) return res.sendStatus(403);
  
      req.user = user;
      // console.log(user);
  
      next();
    })
  }

module.exports = {generateToken, authenticateToken}