import { PenLine,  Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { localdate } from "../../lib/Utils"
import axios from "axios"
import toast from "react-hot-toast"

const NoteCard = ({note,setNotes}) => {

  const handleDelete = async (e,id)=>{
     e.preventDefault()  // get rid of the navigation behavior
     
     if(window.confirm("Do you really want to delete this not")) 
     {
        try {
        await axios.delete(`http://localhost:5001/api/notes/${id}`)
        toast.success("Note deleted successfully")
        setNotes((prev)=>{
            //Filter method in Javascript is used to filter out some elements of an array based on specific condition.Here, prev refers to the current or previous elements in the arraylist.
            return prev.filter(note=>
            note._id!==id //Get rid of the deleted note
          )
        })
     } catch (error) {
       console.error("Error occured",error)
     }
     }
     else
     {
       return
     }
  }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-2 border-solid border-[#58d8f899] hover:border-[#0b94b699] transition-all duration-200">
       <div className="card-body flex flex-col gap-0.5">
         <h1 className="card-title text-center text-[#053c4a99]">
            {note.title}
         </h1>
         <p className="text-base-content/70 line-clamp-1 mt-2 text-[#053c4a99]">{note.content}</p>
         <div class="card-actions justify-between items-center mt-4">
            <span className="text-ba-100  text-[#053c4a99]">{localdate(new Date(note.createdAt))}</span>
            <div className="icon flex items-center gap-0.6">
                <PenLine className="size-4"/>
                <button className="btn  btn-xs btn-ghost" onClick={(e)=>{
                      handleDelete(e,note._id)
                    }}>
                    <Trash2Icon className="size-4 text-amber-700"/>
                </button>
            </div>
         </div>
       </div>
    </Link>
  )
}

export default NoteCard

