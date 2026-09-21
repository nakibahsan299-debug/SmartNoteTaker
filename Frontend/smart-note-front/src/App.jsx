import { Routes,Route } from "react-router"
import Homepage from "./Pages/Homepage"
import Createpage from "./Pages/Createpage"
import NoteDetails from "./Pages/NoteDetails"



//This is the main react arrow function.
const App = () => {
  return (
    <div data-theme="nord" className="min-h-screen bg-base-100">
      

      <Routes>
        <Route path="/" element={<Homepage/>}>Homepage</Route>
        <Route path="/create" element={<Createpage/>}>Createpage</Route>
        <Route path="/note/:id" element={<NoteDetails/>}>Note page</Route>
      </Routes>
    </div>
  )
}

export default App

