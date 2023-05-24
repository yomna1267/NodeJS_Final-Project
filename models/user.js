import { Schema, model } from "mongoose";

const user = new Schema({
    username:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['student', 'doctor', 'admin'],
        default: 'student',
        required: true
    }
});

export default model('user', user);
