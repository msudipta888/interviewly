import { Usermodel } from "../database/userschema.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenBlacklistModel } from "../database/tokenblacllist.js";
import bcrypt from 'bcrypt'
dotenv.config();
export const Register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
  
      const user = await Usermodel.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
     await Usermodel.findOneAndUpdate(
        {email:email},
        {$set:{
            name:name,
            email:email,
            password:hashedPassword,
        }},
        {upsert:true,new:true}
    );
  
     
      const token = jwt.sign(email, process.env.SECRET_KEY);
  
      res.status(201).json({ msg: "User created successfully", token });
    } catch (error) {
      res.status(500).json({ msg: "Error in registering user", error });
    }
  };

  export const Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }
  
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password" });
      }
  
     
      const newToken = jwt.sign(email, process.env.SECRET_KEY);
  
      res.status(200).json({ msg: "Login successful", token: newToken });
    } catch (error) {
      res.status(500).json({ msg: "Error in logging in", error: error.message });
    }
  };
  export const Signout = async (req, res) => {
    const authHeader = req.header('authorization');
  
    if (!authHeader) {
      return res.status(400).send({ message: 'No authorization header provided' });
    }
  
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;
  
    if (!token) {
      return res.status(400).send({ message: 'No token provided' });
    }
  
    try {
      jwt.verify(token, process.env.SECRET_KEY);
  
      const blacklistedToken = new TokenBlacklistModel({ token });
      await blacklistedToken.save();
  
      return res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {
  
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Invalid token' });
      }
  
      return res.status(500).send({ message: 'An error occurred during signout' });
    }
  };
  