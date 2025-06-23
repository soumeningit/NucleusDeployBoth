import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Components/Common/NavBar";
import ContactUs from "./Pages/ContactUs";
import OtpForm from "./Components/LogInSignUP/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword"
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/Dashboard/MyProfile";
import PrivateRoute from "./Components/Common/PrivateRoute";
import Error from './Pages/Error'
import Setting from "./Components/Dashboard/Setting";
import EnrolledCourses from "./Components/Dashboard/EnrolledCourses";
import CartItem from "./Components/Dashboard/CartItem";
import { useSelector } from "react-redux";
import CreateInstCourse from "./Components/Dashboard/AddCourse/CreateInstCourse";
import InstrProfile from "./Components/Dashboard/AddCourse/InstrCourse/InstrProfile";
import AdminDashboard from "./admin/AdminDashboard";
import UsersInAdminPage from "./admin/UsersInAdminPage";
import Analytics from "./admin/Analytics";
import Announcements from "./admin/Announcements";
import DraftCourse from "./admin/DraftCourse";
import CatagoryPage from "./Pages/CatagoryPage"
import CourseLandingPage from "./Pages/CourseLandingPage";
import ViewCourse from "./Pages/ViewCourse";
import Video from "./Components/VideoDetails/Video";
import Message from "./Pages/Message";
import InstructorDashboard from "./Components/Dashboard/InstructorDashboard";
import AboutUs from "./Pages/AboutUs";
import AllCourses from "./Pages/AllCourses";
import Registration from "./Pages/Registration";
import SignIn from "./Pages/SignIn";
import EditCourse from "./Components/Dashboard/AddCourse/InstrCourse/EditCourse";
import CourseDetails from "./Components/Dashboard/AddCourse/InstrCourse/CourseDetails";


function App() {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col font-inter min-h-screen overflow-hidden">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/catagory/:categoryName" element={<CatagoryPage />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/courses/:courseId" element={<CourseLandingPage />} />
        <Route path="/verify-email" element={<OtpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:courseId" element={<UpdatePassword />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile/:id" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Setting />} />
          {
            user?.accountType === "Student" &&
            <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/dashboard/cart" element={<CartItem />} />
            </>
          }
          {
            user?.accountType === "Instructor" &&
            <>
              <Route path="/dashboard/add-course" element={<CreateInstCourse />} />
              <Route path="/dashboard/my-courses" element={<InstrProfile />} />
              <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="/dashboard/my-courses/details/:courseId" element={<CourseDetails />} />
            </>
          }
          {
            user?.accountType === "Admin" &&
            <>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/dashboard/profile" element={<MyProfile />} />
              <Route path="/dashboard/users" element={<UsersInAdminPage />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/announcements" element={<Announcements />} />
              <Route path="/dashboard/draft-course" element={<DraftCourse />} />
            </>
          }

        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {
            user?.accountType === "Student" && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<Video />}
                />
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-Section/:subSectionId/question-answer"
                  element={<Message />}
                />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div >
  );
}

export default App;
