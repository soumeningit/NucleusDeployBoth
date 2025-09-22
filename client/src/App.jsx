import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import CoursesPage from "./pages/Courses";
import PlaygroundPage from "./pages/Playground";
import SignupPage from "./pages/Auth/Signup";
import Otp from "./pages/Auth/OTP";
import SignInPage from "./pages/Auth/Sigin";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyPassword from "./pages/Auth/VerifyPassword";
import DashboardMain from "./Dashboard/DashboardMain";
import ProfilePage from "./Dashboard/Page/Profile";
import SettingsPage from "./Dashboard/Page/Setting";
import Courses from "./Dashboard/Page/Courses";
import Cart from "./Dashboard/Page/Cart";
import CourseDetailPage from "./Dashboard/Page/CourseDetails";
import CoursePlayerPage from "./Dashboard/Page/CoursePlayerPage";
import CreateCourse from "./Dashboard/Page/CreateCourse";
import Activity from "./Dashboard/Page/Activity";
import LLMChat from "./pages/LLMChat";
import QuizInterface from "./Dashboard/Page/QuizInterface";
import AnalyticsPage from "./Dashboard/Components/AnalyticsDashboard";
import EditCourse from "./pages/EditCourse";
import EnrolledCourses from "./Dashboard/Page/EnrolledCourses";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/pages/AdminDashboard";
import UserManagementPage from "./components/Admin/pages/UsersManagement";
import CourseManagement from "./components/Admin/pages/CourseManageMent";
import CategoryManagement from "./components/Admin/pages/Categories";
import FinancialsPage from "./components/Admin/pages/Finacials";
import ModerationPage from "./components/Admin/pages/Moderation";
import SiteSettingsPage from "./components/Admin/pages/AdminSetting";
import Notification from "./components/Admin/pages/Notification";
import OAuth from "./pages/Auth/OAuth";
import ProtectedRoute from "./customhooks/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<VerifyPassword />} />
        <Route path="/oauth-success/verify" element={<OAuth />} />
        <Route
          path="/course/details/:courseId"
          element={<CourseDetailPage />}
        />
        <Route
          element={
            <ProtectedRoute>
              <DashboardMain />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route
            path="/dashboard/course/details/:courseId"
            element={<CourseDetailPage />}
          />
          <Route
            path="/dashboard/course/learn/:courseId"
            element={<CoursePlayerPage />}
          />
          <Route path="/dashboard/create-course" element={<CreateCourse />} />
          <Route path="/dashboard/activity" element={<Activity />} />
          <Route path="/dashboard/llm-chat" element={<LLMChat />} />
          <Route path="/dashboard/challenges" element={<QuizInterface />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route
            path="/dashboard/edit-course/:courseId"
            element={<EditCourse />}
          />
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
        </Route>

        <Route element={<AdminLayout />}>
          <Route index path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/admin/financials" element={<FinancialsPage />} />
          <Route path="/admin/moderation" element={<ModerationPage />} />
          <Route path="/admin/settings" element={<SiteSettingsPage />} />
          <Route
            path="/admin/course/details/:courseId"
            element={<CourseDetailPage />}
          />
          <Route path="/admin/notifications" element={<Notification />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
