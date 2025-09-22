import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import DashboardHeader from "../Components/DashboardHeader";
import { FiDollarSign, FiUsers, FiStar, FiLoader } from "react-icons/fi";
import useAuthContext from "../../customhooks/useAuthContext";
import { getAnalyticsAPI } from "../../operation/service/ProfileService";

// Register the components you need for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Helper Components (Unchanged) ---
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
    <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

// NEW: A component for the loading state to reduce repetition
const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start animate-pulse">
    <div className="p-3 rounded-full mr-4 bg-slate-200 h-12 w-12"></div>
    <div className="flex-1">
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-slate-200 rounded w-3/4"></div>
    </div>
  </div>
);

// --- Main Page Component ---
function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7"); // Corresponds to <option> values
  const [data, setData] = useState(null); // Will hold API response
  const [loading, setLoading] = useState(true);
  const [token] = useAuthContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!token) return;
      setLoading(true);
      try {
        const response = await getAnalyticsAPI(token, timeRange);
        console.log("Analytics data fetched from server:", response);
        if (response.status === 200) {
          setData(response.data);
          setCourses(response.data.courses || []);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setData(null); // Reset data on error
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    }
    fetchAnalytics();
  }, [timeRange, token]);

  // --- Chart Configuration ---
  // These are now calculated only when `data` is available
  const chartLabels = data?.revenueTrend?.map((d) => d.name) || [];
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Revenue (₹)",
        data: data?.revenueTrend?.map((d) => d.revenue) || [],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Enrollments",
        data: data?.revenueTrend?.map((d) => d.enrollments) || [],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Revenue (₹)" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: { display: true, text: "Enrollments" },
        grid: { drawOnChartArea: false },
      },
    },
    plugins: { legend: { position: "top" } },
    interaction: { intersect: false, mode: "index" },
  };

  return (
    <div>
      <DashboardHeader title="Analytics" />

      <div className="mt-8 space-y-8">
        <div className="flex justify-end mb-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-slate-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="365">All Time</option>
          </select>
        </div>

        {/* UPDATED: Conditional rendering for loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              icon={<FiDollarSign className="text-green-800" />}
              title="Total Revenue"
              value={`₹${data.totalRevenue.toFixed(2)}`}
              color="bg-green-100"
            />
            <StatCard
              icon={<FiUsers className="text-indigo-800" />}
              title="Enrollments"
              value={data.totalEnrollments.toLocaleString()}
              color="bg-indigo-100"
            />
            <StatCard
              icon={<FiStar className="text-yellow-800" />}
              title="Average Rating"
              value={data.averageRating.toFixed(1)}
              color="bg-yellow-100"
            />
          </div>
        ) : null}

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Performance Trends
          </h2>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full animate-pulse">
                <div className="w-full h-full bg-slate-200 rounded-md"></div>
              </div>
            ) : data ? (
              <Line options={chartOptions} data={chartData} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">Could not load chart data.</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="py-2">Course</th>
                    <th className="py-2 text-center">Enrollments</th>
                    <th className="py-2 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(courses) &&
                    courses.length > 0 &&
                    courses.map((course) => (
                      <tr
                        key={course._id}
                        className="border-t border-slate-200"
                      >
                        <td className="py-3 font-medium text-slate-800">
                          {course.courseName}
                        </td>
                        <td className="py-3 text-center">
                          {course.studentsEnrolled.length}
                        </td>
                        <td className="py-3 text-right font-semibold text-green-600">
                          ₹
                          {(
                            course?.price * course.studentsEnrolled.length
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
