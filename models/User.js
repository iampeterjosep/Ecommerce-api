const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);