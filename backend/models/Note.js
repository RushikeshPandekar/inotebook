const mongoose=require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  userId:{
     type:mongoose.Schema.Types.ObjectId
  },
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  tags:{
    type:[String],
    required:true,
    default:["genral"],
  },
  date:{
    type:Date,
    default:Date.now,
  }
});

module.exports=mongoose.model("notes",NotesSchema);