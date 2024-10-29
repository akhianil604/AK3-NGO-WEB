const { model } = require("mongoose");

function generateToken(user){
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

function authenticateRole(...allowedRoles){
    return (req, res, next) => {
        const userRole = req.user.role; // Extracted from the JWT
    
        if (!allowedRoles.includes(userRole)) {
          return res.sendStatus(403); // Forbidden
        }
        next(); // User is authorized
      };
}

module.exports = {generateToken, authenticateToken, authenticateRole}