import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      enum:['admin','user'],
      default:'user'  
    },
    profilePicture: {
      type: Buffer,
    },
  },
  { timestaps: true }
);

userSchema.pre('save',function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const encryptedPassword = bcrypt.hashSync(user.password,SALT);
  user.password = encryptedPassword;
  next();
});

userSchema.methods.comparePasswords = function compare(password) {
  return bcrypt.compareSync(password,this.password);
}

userSchema.methods.genJwt = function generate(){
  return jwt.sign({
      id:this._id,
      email:this.email
  },
  'SnapSecret',
  {
      expiresIn:'1h'
  });
}

const User = mongoose.model("User", userSchema);

export default User;
