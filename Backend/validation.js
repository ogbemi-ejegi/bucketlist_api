const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const jwtValidation = (req, res, next) => {
  // try {
  //   const { authorization: token } = req.headers;
  //   const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
  //   req.userData = decoded;
  //   next();
  // } catch (err) {
  //   return res.status(401).json({
  //     message: 'Auth failed'
  //   });
  // }
  const token = req.cookies.auth;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, token_data){
      if(err){
        return res.status(403).send('Error');
      } else {
        req.userData = token_data;
        next();
      }
    });
  }

  
};


const registerValidation = data => {
    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        passwordAgain: Joi.string().min(6).max(255).required()
    })
    return schema.validate(data);
}

const loginValidation = data => {
  const schema = Joi.object().keys({
      username: Joi.string().min(6).required(),
      password: Joi.string().min(6).max(255).required()
  })
  return schema.validate(data);
}


const bucketValidation = data => {
    const schema = Joi.object({
        bucketname: Joi.string().min(6).required()
    });
  return schema.validate(data);
}

const itemValidation = data => {
  const schema = Joi.object({
      itemname: Joi.string().required()
  });
return schema.validate(data);
}


/*
module.exports = {
    jwtValidation,
    registrationValidation,
    loginValidation,
    bucketValidation
}*/
module.exports.jwtValidation = jwtValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.bucketValidation = bucketValidation;