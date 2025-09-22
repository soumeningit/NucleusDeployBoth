import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import {
  FaUsers,
  FaBookOpen,
  FaUserPlus,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
  FaSearch,
  FaRupeeSign,
} from "react-icons/fa";

import useAuthContext from "../../../customhooks/useAuthContext";
import { getAdminDashboardDataAPI } from "../../../operation/service/AdminService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// --- SUB-COMPONENTS (within the same file) --- //

const StatsCard = ({ title, value, change, changeType, icon }) => {
  const isIncrease = changeType === "increase";
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`flex items-center text-sm font-semibold ${
            isIncrease ? "text-green-500" : "text-red-500"
          }`}
        >
          {isIncrease ? (
            <FaArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <FaArrowDown className="h-4 w-4 mr-1" />
          )}
          {change}
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="font-bold text-lg"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} enrolls`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CoursePopularityChart = ({ coursePopularityData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={coursePopularityData}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {coursePopularityData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

function AdminDashboard() {
  const [token] = useAuthContext();
  const [coursePopularityData, setCoursePopularityData] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [recentUsersData, setRecentUsersData] = useState([]);
  const [additionalData, setAdditionalData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalEnrollments: 0,
  });
  const statsCardsData = [
    {
      title: "Total Users",
      value: additionalData?.totalUsers?.toLocaleString() || "0",
      change: "+11.01%",
      changeType: "increase",
      icon: <FaUsers className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Total Courses",
      value: additionalData?.totalCourses?.toLocaleString() || "0",
      change: "+2.5%",
      changeType: "increase",
      icon: <FaBookOpen className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Total Revenue",
      value: `₹${additionalData?.totalRevenue?.toLocaleString() || "0"}`,
      change: "+1.2%",
      changeType: "increase",
      icon: <FaRupeeSign className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "New Enrollments (Month)",
      value: additionalData?.totalEnrollments?.toLocaleString() || "0",
      change: "+15.3%",
      changeType: "increase",
      icon: <FaUserPlus className="h-6 w-6 text-gray-500" />,
    },
  ];

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const response = await getAdminDashboardDataAPI(token);
        console.log("Admin Dashboard Data:", response);

        if (response.status === 200) {
          setCoursePopularityData(response.data.data.popularCourseData);
          setEnrollmentData(response.data.data.monthlyEnrollments);
          setAdditionalData({
            totalUsers: response.data.data.totalUsers,
            totalCourses: response.data.data.totalCourses,
            totalRevenue: response.data.data.totalRevenue / 100,
            totalEnrollments: response.data.data.totalEnrollments,
          });
          setRecentUsersData(response.data.data.recentUsers);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    }
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-md text-gray-500 mt-1">
              Welcome back, here's an overview of your platform's performance.
            </p>
          </div>
          <div className="relative mt-4 sm:mt-0">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses or users..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCardsData.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          {/* Enrollment Trends Chart */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-1 text-gray-800">
              Enrollment Trends
            </h2>
            <p className="text-sm text-gray-500 mb-6">Past 7 months</p>
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart
                  data={enrollmentData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
                  <YAxis tick={{ fill: "#6B7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "0.5rem",
                      border: "1px solid #E5E7EB",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend iconType="circle" />
                  <Bar
                    dataKey="enrollments"
                    fill="#3B82F6"
                    barSize={30}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Popularity Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <h2 className="text-xl font-semibold mb-1 text-gray-800">
              Course Popularity
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Based on current enrollments
            </p>
            <div className="flex-grow flex items-center justify-center">
              <CoursePopularityChart
                coursePopularityData={coursePopularityData}
              />
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Enrollments
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-100 bg-gray-50">
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Roll
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                    Date
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {recentUsersData.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-gray-900">
                        {user?.firstName + " " + user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>
                    <td className="p-4 text-gray-700">
                      {user?.accountType.slice(0, 1).toUpperCase() +
                        user?.accountType.slice(1)}
                    </td>
                    <td className="p-4 text-gray-600 hidden md:table-cell">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      <button className="text-gray-500 hover:text-gray-800">
                        <FaEllipsisV size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
