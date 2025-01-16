import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const InterviewSchema = new mongoose.Schema({
    userId: 
    { type: String, required:true,default:uuidv4,unique:true },

    name:{
        type:String,
        required:true
    },
   country:{
    type:String,
    required:true
   },
   company:{
    type:String,
    required:true
   },
   position:{
    type:String,
    required:true
    },
    questions:{
        type:[String],
        required:true,
       validate:{
        validator:(val)=>val.length<=3,
        message: "Maximum 3 questions allowed.",
       }
    },
    experience:{
        type:Number,
        required:true
    },
    previousSal :{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
},
{
    collection:"InterviewExperience",
    timestamps:true,
    versionKey:false

});


InterviewSchema.pre('findOneAndUpdate',function(next){
    this.set({updateAt:Date.now()});
    next();
});
InterviewSchema.pre('updateOne', function(next){
    this.set({updateAt:Date.now()});
    next();
})

export const InterView = mongoose.model('InterViewExp',InterviewSchema);