import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-e-base-content/20">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
             <h1 className="text-3xl font-mono font-bold text-primary tracking-tighter mx-2xl">
                SmartNoteBoard
             </h1>
             <div className="flex items-center gap-3">
                <Link to={'/create'} className="flex btn btn-primary rounded-full px-3">
                  <PlusIcon className="size-3.5"/>  
                  <span className="text-1xl">Add Note</span>
                </Link>
             </div>
            </div>
        </div>
      
    </header>
  )
}

export default NavBar
