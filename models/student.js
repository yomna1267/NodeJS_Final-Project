import { Schema, model } from "mongoose";

const student = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    acadimic_number: {
        type: Number,
        required: true,
    },
    pervious_subjects: {
        type: [],
        required: false
    },
    enrolled_subjects: {
        type: [],
        required: false
    }
},
{timestamps:true});

export default model('student', student);