import mongoose from "mongoose";

//1st step: We have to create a schema(Blueprint) of the model.
//2nd step: We will create a model of the schema.
const noteSchema = mongoose.Schema({
    //These are the two types of data for the database.
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
   },
   {timestamps: true} //It will describe the time when the note was generated
)

const notesModel = mongoose.model("NoteTaker",noteSchema);

export default notesModel;