import mongoose from mongoose; 

const studentSchema=new mongoose.Schema({
    name:String, 
    marks:Number
}); 

export default mongoose.model("Student",studentSchema);