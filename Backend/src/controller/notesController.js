import Notes from "../models/Notes.js"
//We will create a controller to handle responsibilities of operating each request.
export async function displayAllNotes(req,res){
   try{
      const data = await Notes.find();
      //fetch data
      res.status(200).json(data); //.send() method is used to send response message to the client in interface.
      console.log("Fetched successfully")
   }
   catch(error){
      console.error("Data could not be fetched")
      res.status(500).send("Internal server error");
   }
}

export async function createNewNotes(req,res){
   //create data
   //Take title and content data from the user interface and send it to the database model for storage
   try{
      const {title,content} = req.body;  //It will take data from the html body but initially if we do not set middleware then the value for title and content will be undefined.
                                         // We have to set up middleware to pass the data to controller.
      const newNote = new Notes({title,content}); //Then we will create an object from the model Notes and pass the title and content data to the model
      const savedNote = await newNote.save();     //We will use the save method to store permanently the data in our model database
      res.status(201).json(savedNote)
   }
   catch(error){
      console.error("Data could not be created")
      res.status(500).send("Internal server error"); 
   }
}  

export async function displayNote(req,res){
    // This function will display a specific note
    try{
       const note_id = await Notes.findById(req.params.id)
       if(!note_id){
        res.status(404).json({message:"URL not found"})
       }
       console.log("Note displayed successfully")
       res.status(200).json(note_id)
     }
    catch(error){
       console.error("Cooked up",error)    
       res.status(500).json({message:"Internal server error"})
    }
    
}



export async function updateNotes(req,res){
   try{
     const {title,content} = req.body;  //this part is used to take data of title and content from the user and then 
     //We will use findByIDAndUpdate() method to find the id of the data that need to be updated. The parameters of this methods are
     //req.params.id which defines the id of the note that need to be updated, {title,content} json object which defines the data that need to be stored and the json object {new:true} is used to save the updated data.
     const updatedNote = await Notes.findByIdAndUpdate(req.params.id,{title,content},{new:true});
     console.log("Success occured");
     res.status(200).json(updatedNote);
   }
   catch(error){
     console.error("Error occured");
     res.status(200).json({message:"Internal server error"});
   }
   
} 
export async function deleteNotes(req,res){
    try{
       //We will use findByIdAndDelete() methods of mongoose by using Notes object from the model class. Here,
       //req.params.id is the id of the specific note we want to delete from our database
       const deletedNote = await Notes.findByIdAndDelete(req.params.id)
       console.log("Deletion occured")
       res.json({message:"Deleted successfully"})
    }
    catch(error){
        console.error("Deletion never occured",error)
        res.status(500).json({message:"Internal server error"})
    }
}