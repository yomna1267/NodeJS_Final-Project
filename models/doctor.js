import { Schema, model } from "mongoose";
const doctor = new Schema({
    name:{
        type: String,
        required: true,
    },

    code:{
       type: String,
        required: false, 
    },

    department:{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'department'
    },

   subject:{
        type: Schema.Types.ObjectId,
        required: false,
    }
});

export default model('doctor', doctor);
