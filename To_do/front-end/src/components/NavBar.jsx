import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <nav className="bg-gray-950 text-white/80  flex justify-between items-center px-12 py-3">
        
        <div>
            <h1 className="text-2xl font-medium hover:text-white">To Do App</h1>
        </div>
        <ul className="text-2xl font-medium flex gap-6 ">
            <li className="hover:text-white"><Link to="/">List</Link></li>
            <li className="hover:text-white"><Link to="/add">Add Task</Link></li>

        </ul>
        
        </nav>
    )
}
export default NavBar