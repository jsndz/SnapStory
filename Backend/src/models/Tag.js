import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    blog:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ] 
    
},{timestamps:true});
 
tagSchema.pre('save',function(next){
    this.title= this.title.toLowerCase()
    next();
})

const Tag = mongoose.model('tag', tagSchema);

export default  Tag;