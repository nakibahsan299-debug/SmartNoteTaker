import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import {toast} from "react-hot-toast"
import axios from "axios"


const Createpage = () => {
  const [title,setNewNote] = useState("")
  const [content,setNewContent] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate =useNavigate()
  
  const handleSubmit = async (e)=>{
      e.preventDefault()
      if(!title.trim() && !content.trim())
      {
        toast.error("You have to enter a value")
        return
      }
      setLoading(true)
      try {
        await axios.post("http://localhost:5001/api/notes", {
          title,
          content
        })
        navigate("/")
      } catch (error) {
        console.error("There is an error",error)
        toast.error("Failed to create a post")
      } finally{
        setLoading(false)
      }
  }
 
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-7 py-8">
        <div className="navbar max-w-2xl mx-70">
         <Link to={"/"} className="btn btn-ghost mb-6">
           <ArrowLeftIcon className="size-5"/>
           <div className="flex text-blue-400 font-bold text-xl font-mono gap-0.5">
              Back to Notes
           </div>
         </Link>
        </div>
        <div className="card max-w-7xl">
          <div className="card-body mx-74 flex flex-col">
             <h1 className="text-3xl font-bold text-blue-400 font-mono mb-2">Create New Note</h1>
             <form onSubmit={handleSubmit}> 
               <div className="form-control mt-5 flex flex-nowrap flex-col gap-1">
                  <label className="label-1">
                    <span className="title mx-1.5 font-bold text-mono text-blue-400 text-lg">Title</span>
               </label>
               <input type="text" className="title-input border-2 mx-2 h-11 w-196 px-3 py-3 text-m rounded-full" placeholder="Note Title" 
                 value={title} onChange={(e)=>{
                  setNewNote(e.target.value)
                 }} />
               </div>

               <div className="form-control mt-5 flex flex-nowrap flex-col gap-1">
                  <label className="label-1">
                    <span className="content mx-1.5 font-bold text-mono text-blue-400 text-lg">Content</span>
               </label>
               <textarea className="text-area border-2 mx-2 h-40 w-196 px-3 py-3 text-sm rounded-sm" placeholder="Write your content here...." 
                 value={content} onChange={(e)=>{
                  setNewContent(e.target.value)
                 }} />
               </div>

               <div className="form-action flex justify-end"> 
                 <button type="submit" className="submit-btn bg-green-500 mt-2 translate-x-[120px] h-14 w-30 rounded-full text-center py-4 font-bold font-mono text-1xl hover:bg-green-700 transition-all duration-75" disabled={loading} >
                   {loading? "Creating..." : "Create Note"}
                 </button>
               </div>

             </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Createpage
