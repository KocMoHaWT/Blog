const db = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const emaiRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const saltRounds = 10;

const validateRegitstration = (email, password, name) => {
  const isValidEmail = email && emaiRegExp.test(email);
  const isValidPassword = password && password.toString().trim().length !== 0;
  const isValidName = name && name.trim() !== 0;
  return isValidEmail && isValidPassword && isValidName;
}

const validateLogin = (email, password) => {
  const isValidEmail = email && emaiRegExp.test(email);
  const isValidPassword = password && password.trim().length !== 0;
  return isValidEmail && isValidPassword;
}


const authorization = async (req, res) => {
  const { email, password } = req.body;
  if (!validateLogin(email, password)) {
    return res.status(401).end();
  }

 try {
  const user = await db.User.findOne({ where: { email }})

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).end();
    }

    const accessToken = jwt.sign({ type: 'access', id: user.id }, config.secretKey, { expiresIn: +config.accessExpire});
    const refreshToken = jwt.sign({ type: 'refresh', id: user.id }, config.secretKey, { expiresIn: +config.refreshExpire});
    res.status(200).json({ accessToken, refreshToken, name: user.name });
    res.end();
  }
 } catch (e) {
   console.log(e);
 }
}

const registration = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(validateRegitstration(email, password, name));

  if (!validateRegitstration(email, password, name)) {
    return res.status(401).end();
  }

  try {
    const passHash = bcrypt.hashSync(password, saltRounds);
    await db.User.create({email, password: passHash, name, role_id: 1});
    res.status(200);
    res.end();
  } catch (e) {
    console.log('error registration')
  }
}


const getNewRefreshToken = async (req, res) => {
  const { token } = req.body;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.secretKey);
  } catch {
    return res.status(401).end();
  }
 
  if (!decodedToken || decodedToken.type !== 'refresh' && !decodedToken.id) {
    res.status(401);
    res.end
    return;
  }

  const accessToken = jwt.sign({ type: 'access', id: decodedToken.id }, config.secretKey, { expiresIn: +config.accessExpire});
  const refreshToken = jwt.sign({ type: 'refresh', id: decodedToken.id }, config.secretKey, { expiresIn: +config.refreshExpire});
  return res.status(200).json({ accessToken, refreshToken });
}

module.exports = { authorization, registration, getNewRefreshToken };