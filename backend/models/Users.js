const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    status: String,
    bio: String,
    profilePicture: String,
    contactDetails: Object,
    requirements: Array,
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel