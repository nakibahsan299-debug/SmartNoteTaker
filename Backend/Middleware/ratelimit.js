import ratelimit from "../src/config/upstash.js"

//It is a middleware functionality. In this functionality we will define the ratelimiting algorithm for the middleware function. 
//In the server.js file we will use the middleware using use() method.
const ratelimiter = async (req,res,next)=>{
    try {
     const {success} = await ratelimit.limit("my-limit-key") //Normally we will use user_id after authentication. But in this case we will 
     // only work with ip-address.
     if(!success)
     {
        return res.status(429).json({message:"Too many requests!!!Try again later"})
     }
     next()
    } catch (error) {
       console.error("Something went wrong") 
       next(error)
    }

}

export default ratelimiter;