// We are designing REST API (90% time used).
//API works as a waiter. Create a bridge between Client and backend server
//import express from "express"
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectdb } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "../Middleware/ratelimit.js";
import cors from "cors"
const app = express();

dotenv.config();



//Middleware is a function that runs between request and response.
//It works like a security guard.




//Middleware
app.use(express.json()) //This middleware will parse JSON bodies: req.body.

//CORS=CORS is a browser security rule.
//When a website is trying to fetch data from another website like the frontend website is trying to fetch data from another domain, the browser might
//block it for security reason.
//This is what called CORS error.
//To reduce this error we will install a dependency named CORS and set it in the middleware.

//Middleware
app.use(cors()) //This middleware will set cors functionality to disable cors error.

//Middleware for RateLimiting
app.use(ratelimiter)



//Custom Middleware
app.use((req,res,next)=>{
   console.log(`The request method is: ${req.method} and the request url is ${req.url}`)
   next();
})

//api/notes is used to prefix a part to the specific part of the url which will be routed by router object.
//Top connect router object with the middleware server.js we used noteRoutes in the use() method where api/notes part of the url is prefixed.

app.use('/api/notes',notesRoutes);               

//This method will set specific url for every CRUD method
//It says for any request that starts with / use the routes defined in notesRoutes
//Here use() is a method that works as middleware. '/api/notes' is the base and it is prefixed and notesRoutes is a Router object where the url '\' will be used



/* app.get('/api/notes', (req,res)=>{
   //Send notes
   res.status(200).send("You made your first API with 10 notes")
})
//201 means post created successfully
app.post('/api/notes', (req,res)=>{
   //Send notes
   res.status(201).json({message:"post created successfully!!"})
})

app.put('/api/notes/create/:id', (req,res)=>{
   //Send notes
   res.status(200).json({message:"post updated successfully!!"})
})

app.delete('/api/notes/create/:id', (req,res)=>{
   //Send notes
   res.status(200).json({message:"post deleted successfully!!"})
})
///api/notes/2121212
*/
//.listen() method is used to open a server at a specific port.
connectdb().then(()=>{
   app.listen(5001, ()=>{
    console.log("Server opened at port:5001")
}) 
})


