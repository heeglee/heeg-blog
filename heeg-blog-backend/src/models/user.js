const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: String,
    hashedPassword: String
});

// instance methods
UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        // param 1st: payload; data you want to set in token
        {
            _id: this.id,
            username: this.username,
        },
        // param 2nd: JWT secret code
        process.env.JWT_SECRET,
        // param 3rd: options
        {
            expiresIn: '7d',
        },
    );

    return token;
}

// static methods
UserSchema.statics.findByUsername = function(username) {
    // User.findOne();
    return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;