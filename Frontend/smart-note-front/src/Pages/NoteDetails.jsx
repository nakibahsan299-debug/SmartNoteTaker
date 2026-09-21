import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import toast from "react-hot-toast"
import { LoaderIcon } from "lucide-react"
import { Link } from "react-router"
import { ArrowLeftIcon } from "lucide-react"
import { Trash2Icon } from "lucide-react"


const NoteDetails = () => {
  const [note,setNote] = useState("")  //This is array destructing [...] = useState() because useState() will return a string array and assigned it to after setNote()
  const [load,setLoading] = useState(true)
  const [saving,setSaving] = useState(false)
  const [prenote,setPrenote] = useState("")

  const navigate = useNavigate()
  //We will use object destructing. const {...} = function()
  const {id}  = useParams()  //useParams() always return an object. Thats why destructor {} is used for object destructing.
  console.log(id)
  
  useEffect(()=>{
    
  const fetchData2 = async ()=>{
   try {
    
   const res = await axios.get(`http://localhost:5001/api/notes/${id}`)
   setNote(res.data)
   setPrenote(res.data)

   } catch (error) {
     console.error("Error occured",error)
     toast.error("Sorry!!Could not load page")
   }finally{
     setLoading(false)
   }
  }
  fetchData2()
 }
  ,[id])

  const handleDelete = async (e,id)=>{
    e.preventDefault()
    if(!window.confirm("Do you really want to delete this note?")){
      return
    }
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")
    } catch (error) {
       console.error("Error happened",error)
       toast.error("Failed to delete note")
    }
  }
  const handleSave = async (e,id)=>{
     e.preventDefault()
    if(!note.title.trim() && !note.content.trim()){
      toast.error("Please enter the value")
      return
    }
    setSaving(true)
    try {
      await axios.put(`http://localhost:5001/api/notes/${id}`,note)
      if(prenote.title!=note.title && prenote.content!=note.content)
      {
        toast.success("Title and Content updated successfully")
      }
      else if(prenote.title!=note.title && prenote.content==note.content)
      {
        toast.success("Title updated successfully")
      }
      else{
       toast.success("Content updated successfully")
      }
      
      navigate("/")
    } catch (error) {
      console.error("Error occured",error)
    } finally{
      setSaving(false)
    }
   
  }
 //console.log({note})
 if(load){
  return(
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
       <LoaderIcon className="animate-spin size-10"/>
    </div>
  )
 }
  return ( 
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-7 py-8 flex items-center justify-between mb-6">
         <div className="navbar max-w-2xl mx-70">
         <Link to={"/"} className="btn btn-ghost mb-6">
           <ArrowLeftIcon className="size-5"/>
           <div className="flex text-blue-400 font-bold text-xl font-mono gap-0.5">
              Back to Notes
           </div>
         </Link>
        </div>
        <div className="btn  btn-xs btn-ghost font-bold text-xl text-red-600 font-mono gap-0.5 mr-100 translate-y-[-15.5px] p-6 border-red-600 rounded-3xl" 
            onClick={(e)=> handleDelete(e,note._id)}>
                    <Trash2Icon className="h-5 w-4 text-amber-700"/>
                    Delete Note
        </div>
      </div>
    <div className="card bg-base-200  mb-40 translate-y-[-60px]">
      <div className="card-body">
           <div className="form-control mt-5 flex flex-nowrap flex-col ml-[295px] gap-1">
                  <label className="label-1">
                    <span className="title mx-1.5 font-bold text-mono text-blue-400 text-lg">Title</span>
               </label>
               <input type="text" className="title-input border-2 mx-2 h-11 w-196 px-3 py-3 text-m rounded-full" placeholder="Note Title" 
                 value={note.title} onChange={(e)=>{
                  setNote({...note,title:e.target.value})
                 }} />
            </div>
           
            <div className="form-control mt-5 flex flex-nowrap flex-col ml-[295px] gap-1">
                  <label className="label-1">
                    <span className="content mx-1.5 font-bold text-mono text-blue-400 text-lg">Content</span>
               </label>
               <textarea className="text-area border-2 mx-2 h-40 w-196 px-3 py-3 text-sm rounded-sm" placeholder="Write your content here...." 
                 value={note.content} onChange={(e)=>{
                  setNote({...note,content:e.target.value})
                 }} />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary h-10 w-25 mr-[400px] translate-y-[10px] rounded-3xl " disabled={saving} onClick={(e)=>{
                 handleSave(e,note._id)
              }}>
                 {saving? "Saving.." : "Save"}
              </button>
            </div>
           
      </div>
    </div>
    </div>
  )
}

export default NoteDetails

