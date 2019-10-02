const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        riquire: true
    },
    email: {
        type: String, 
        unique: true, 
        riquire: true, 
        lowercase: true
    },
    password: {
        type: String, 
        riquire: true, 
        select: false
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', UserSchema);

