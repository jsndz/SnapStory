import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    type:{
        type:String,
        required:true,
        enum:['like','dislike']
    },
},{timestaps:true});

const Like = mongoose.model('Like', likeSchema);

export default Like;  