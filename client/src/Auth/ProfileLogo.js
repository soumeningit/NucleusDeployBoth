// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../service/authAPI'; // Make sure this import is correct


// const ProfileLogo = ({ img }) => {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const tokenObj = useSelector((state) => state.auth)
//     console.log("tokenObj : ", tokenObj);
//     const token = tokenObj.token;

//     const handleLogout = (event) => {
//         event.preventDefault();
//         console.log("email : ", token);
//         dispatch(logout(token, navigate));
//     };

//     if (!tokenObj) {
//         return null;
//     }


//     return (
//         <div className="relative">
//             <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
//                 <img src={img} alt="Profile" className="w-8 h-8 rounded-full" />
//             </button>
//             {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
//                     {/* <Link to="dashboard/my-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link> */}
//                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfileLogo;