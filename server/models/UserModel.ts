import mongoose, { Document } from "mongoose";
const validator = require("validator");
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

interface data extends Document {
  Name?: String;
  email?: String;
  password?: String;
}

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

});

userSchema.methods.genratetoken=async function<data>(res:any)
{
    try {
        const token=jwt.sign({email:this.email},process.env.SECRET_KEY,{expiresIn:'1hr'})
        return token;  
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

userSchema.pre<data>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

const userModel: any = mongoose.model("user", userSchema);
export default userModel;
