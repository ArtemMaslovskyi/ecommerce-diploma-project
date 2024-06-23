const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {HttpsError} = require("../error_handler");

const {SECRET_KEY} = process.env;

const authenticate = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    // IF no auth headers are provided
    // THEN return 401 Unauthorized error
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: 'Auth headers not provided in the request.'
        
      });
    }

    // IF bearer auth header is not provided
    // THEN return 401 Unauthorized error
    if (!authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: false,
        error: 'Invalid auth mechanism.'
      });
    }

    const token = authHeader.split(' ')[1];

    // IF bearer auth header is provided, but token is not provided
    // THEN return 401 Unauthorized error
    if (!token) {
      return res.status(401).json({
        status: false,
        error:  'Bearer token missing in the authorization headers.'
      })
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: 'Invalid access token provided, please login again.'
        });
      }

      req.user = user; // Save the user object for further use
      next();
    });  
}

module.exports = authenticate;