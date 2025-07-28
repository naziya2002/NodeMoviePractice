const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength:8
  },
  confirmpassword:{
    type:String,
    required:[true,"Confirm Password is required"],
    validate:{
      // custom validator only work for save and create 
      validator:function(val){
        return val==this.password
      },
      message:"Password and ConfirmPassword Should be Same"
    }
  }
});


UserSchema.pre('save',async function (next){
  if(!this.isModified("password"))return next();

 this.password= await bcrypt.hash(this.password,10)

 this.confirmpassword=undefined


  next()
})
UserSchema.methods.ComparePassword=async(password,passwordInDb)=>{

 return await bcrypt.compare(password,passwordInDb)
}

const User=mongoose.model("User",UserSchema)

module.exports=User
