import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Email Invalid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true,
        validate: (value) => {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can't use 'Pasword'")
            }
        }
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    }
}, {
    timestamps: true
})

/*Hash Plain text passowrd before saving*/
userSchema.pre('save', async function (next) {
    const user = this;
    /*isModified () checks if 'passowrd' field has changed or newly created or not*/
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, 10)
    }
    next();
})

/*Custom methods for password checking*/
userSchema.methods.matchPassword = async function (enteredPassword) {
    const user = this;
    return await bcrypt.compare(enteredPassword,user.password)
}

const User = mongoose.model('User', userSchema);
export default User;