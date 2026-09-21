import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import RateLimitedUI from "../Components/RateLimitedUI"
import axios from "axios";
import NoteCard from "../Components/NoteCard";

import NotesNotFound from "../Components/NotesNotFound";




const Homepage = () => {
  const [isRateLimited,setisRateLimited]=useState(false);   //UseState always returns an array, not an object. Thats why [] is used.This useState() will check whether RateLimiting is reached or not.
  const [notes,setNotes]=useState([])      //This useState() is used to create notes.Initially, there will be no notes so it will be zero.            
  const [isLoading,setisLoading]=useState(true)  //This useState is used to load data on the website while retrieving it from backend domain.
  
  //useEffect will be used to create the side effect when the data is fetched from the backend server. It will work only one time.
  useEffect(()=>{
    
    async function fetchData(){
      try {
        const res = await axios.get("http://localhost:5001/api/notes") //GET method is used to set GET request to the Backend server. The data will be retrieved in the Json format.
        console.log(res.data)         
        setNotes(res.data) 
        console.log(notes)
        setisRateLimited(false)
      } catch (error) {
        console.error("Could not fetch data",error)
        if(error.response.status===429)
        {
          setisRateLimited(true)
        }
        else
        {
          console.error("Failed to load note",error)
        }
      } finally {
        setisLoading(false)
      }
    }
    fetchData();
  },[])
  return (
    <div className="min-h-screen bg-base-100">
      <NavBar></NavBar>
      {isRateLimited && <RateLimitedUI/>}
      <div className="max-w-7xl mx-auto p-2 mt-6">
         {isLoading && 
         <div className="text-center text-3xl text-primary">
             Loading notes...
          </div>}
          {notes.length==0 && isLoading==false &&
           <NotesNotFound/>
          }
          {notes.length>0 && !isRateLimited && 
          ( <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
               {
                //map method is used to perform operation on each element of an array. When we use arrow function inside map we must return jsx. Here, each element of the note
                //will be returned by the arrow function passed as an arguement in the javascript map method.
                 notes.map(note=>{
                 return(
                  <NoteCard key={note.id} note={note} setNotes={setNotes}/>   
                 )  
                 })
               }
          </div>
          )
          }
      </div>
    </div>
  )
}

export default Homepage
