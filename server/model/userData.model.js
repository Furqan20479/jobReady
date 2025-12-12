import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
    },

    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,

    },
    confirmPassword:{
        type: String,
    },
});

const userModel = mongoose.model("userData", userSchema, "users");
export default userModel;
