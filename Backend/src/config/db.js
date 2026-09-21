//We need a database to store the data requested and given by client. Here we will use mongodb+mongoose which is a NoSQL database.
import mongoose from "mongoose"
//Created a connectdb function to connect mongodb database with our server.mongoose is used to 
//perform the connect using mongoose() method and async await is used for synchronization.
//We will store our mongodb connection string in .env file so that no one outside can access our database.
//In order to do that we will store the connection string in .env file. Then we will use dotenv extension to use it from env file in our server and database.
export const connectdb = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
   console.log("MongoDB connected successfully!!!")
  }
  catch(error){
     console.error("Error found!!!")
  }
}