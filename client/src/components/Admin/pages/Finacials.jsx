import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiUserCheck,
  FiFileText,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import Modal from "../../common/Modal";
import { getPaymentsAPI } from "../../../operation/service/AdminService";
import useAuthContext from "../../../customhooks/useAuthContext";

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
    <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

function FinancialsPage() {
  const [activeTab, setActiveTab] = useState("sales"); // 'sales' or 'payouts'
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [payoutData, setPayoutData] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    instructor: null,
  });

  const [additionalData, setAdditionalData] = useState({
    totalRevenue: 0,
    totalEarnings: 0,
    totalPayouts: 0,
    transactionCount: 0,
  });

  const [token] = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getPaymentsAPI(token);
        if (response.status === 200) {
          setSalesData(response?.data?.data?.payments || []);
          setAdditionalData({
            totalRevenue: response?.data?.data?.totalRevenue || 0,
            totalEarnings: response?.data?.data?.totalEarnings || 0,
            totalPayouts: response?.data?.data?.totalPayouts || 0,
            transactionCount: response?.data?.data?.transactionCount || 0,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
      // if (activeTab === "sales") {
      //   setSalesData(mockFinancialData.sales);
      // } else {
      //   setPayoutData(mockFinancialData.payouts);
      // }
    };
    fetchData();
  }, [activeTab]);

  const openPayoutModal = (instructor) => {
    setModalState({ isOpen: true, instructor });
  };
  const closePayoutModal = () =>
    setModalState({ isOpen: false, instructor: null });

  const handleConfirmPayout = () => {
    const { instructor } = modalState;
    console.log(
      `Processing payout of ₹${instructor.pendingAmount} for ${instructor.name}`
    );
    // Here you would call an API to process the payout
    // and then refetch the data to update the UI
    closePayoutModal();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Financials</h1>
        <p className="text-slate-500">
          Track sales, earnings, and manage instructor payouts.
        </p>
      </div>

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiDollarSign className="text-green-800" />}
          title="Total Revenue (30d)"
          value={`₹${additionalData.totalRevenue.toLocaleString()}`}
          color="bg-green-100"
        />
        <StatCard
          icon={<FiTrendingUp className="text-indigo-800" />}
          title="Platform Earnings (30d)"
          value={`₹${additionalData.totalEarnings.toLocaleString()}`}
          color="bg-indigo-100"
        />
        <StatCard
          icon={<FiUserCheck className="text-blue-800" />}
          title="Payouts Sent (30d)"
          value={`₹${additionalData.totalPayouts.toLocaleString()}`}
          color="bg-blue-100"
        />
        <StatCard
          icon={<FiFileText className="text-orange-800" />}
          title="Transactions (30d)"
          value={additionalData.transactionCount.toLocaleString()}
          color="bg-orange-100"
        />
      </div>

      {/* --- Main Content with Tabs --- */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-6 px-6">
            <button
              onClick={() => setActiveTab("sales")}
              className={`py-4 px-1 font-medium border-b-2 ${
                activeTab === "sales"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Sales & Transactions
            </button>
            <button
              onClick={() => setActiveTab("payouts")}
              className={`py-4 px-1 font-medium border-b-2 ${
                activeTab === "payouts"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Instructor Payouts
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Sales Tab Content */}
          {activeTab === "sales" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right">Instructor Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12">
                        <FiLoader className="mx-auto animate-spin text-2xl" />
                      </td>
                    </tr>
                  ) : (
                    salesData.map((sale) => (
                      <tr
                        key={sale._id}
                        className="border-b border-gray-400 hover:bg-slate-50"
                      >
                        <td className="py-3 px-4 text-slate-600">
                          {new Date(sale?.paymentTime).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {sale?.user?.firstName + " " + sale?.user?.lastName}
                        </td>
                        <td className="py-3 px-4">
                          {sale?.course?.courseName}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">
                          ₹{sale.amount.toFixed(2) / 100}
                        </td>
                        <td className="py-3 px-4 text-right text-green-600 font-semibold">
                          ₹
                          {(sale.amount.toFixed(2) / 100 - 50).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Payouts Tab Content */}
          {activeTab === "payouts" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="py-3 px-4">Instructor</th>
                    <th className="py-3 px-4 text-right">Total Earnings</th>
                    <th className="py-3 px-4 text-right">Paid Amount</th>
                    <th className="py-3 px-4 text-right">Pending Payout</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12">
                        <FiLoader className="mx-auto animate-spin text-2xl" />
                      </td>
                    </tr>
                  ) : (
                    payoutData.map((inst) => (
                      <tr
                        key={inst.id}
                        className="border-b border-gray-400 hover:bg-slate-50"
                      >
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {inst.name}
                        </td>
                        <td className="py-3 px-4 text-right">
                          ₹{inst.totalEarnings.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          ₹{inst.paidAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-orange-600">
                          ₹{inst.pendingAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openPayoutModal(inst)}
                            disabled={inst.pendingAmount <= 0}
                            className="bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                          >
                            Process Payout
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- Confirmation Modal --- */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closePayoutModal}
        icon={<FiAlertTriangle className="h-8 w-8 text-orange-600" />}
        heading="Confirm Payout"
        text={`Are you sure you want to process a payout of ₹${modalState.instructor?.pendingAmount.toLocaleString()} to ${
          modalState.instructor?.name
        }?`}
        primaryButtonText="Yes, Process Payout"
        onPrimaryClick={handleConfirmPayout}
        secondaryButtonText="Cancel"
        onSecondaryClick={closePayoutModal}
      />
    </div>
  );
}

export default FinancialsPage;
