
// import axios from "axios";
// import {useNavigate} from "react-router-dom"

// const Dashboard = () => {
//     const navigate = useNavigate();

//     const logoutUser = async () => {
//       try {
//         await axios.get('http://localhost:3000/api/auth/logout');
//         setUser(null)
//         navigate('http://localhost:3000/api/auth/login')
//       } catch (error) {
//         console.error("Logout failed", error)
//       }
//     }
//   return (
//     <div>
//         <h1>Dashboard</h1>
//         {!!user && (
//           <>
//           <h1>hi {user.firstName}</h1>
//           <button onClick={logoutUser}>Logout</button>
//           </>)}
//     </div>
//   )
// }

// export default Dashboard