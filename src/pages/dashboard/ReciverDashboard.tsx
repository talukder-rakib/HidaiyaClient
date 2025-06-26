import React, { useMemo } from "react";
import {
  Bell,
  Calendar,
  Download,
  Eye,
  Filter,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

export default function ReceiverDashboard() {
  // Static sample requests — replace with API or Redux state
  const requests = [
    {
      date: "12/02/2025",
      amount: "৳1,000",
      category: "Medical Aid",
      status: "Approved",
    },
    {
      date: "18/04/2025",
      amount: "৳800",
      category: "Education",
      status: "Pending",
    },
    {
      date: "30/05/2025",
      amount: "৳500",
      category: "Basic Needs",
      status: "Rejected",
    },
  ];

  // Static announcements — replace with API or Redux state
  const announcements = [
    {
      title: "New Zakat Fund Available",
      date: "06/06/2025",
      message: "Submit your request form by end of this month to be considered.",
    },
    {
      title: "ID Verification Deadline",
      date: "20/05/2025",
      message:
        "Please upload your NID documents to continue receiving assistance.",
    },
  ];

  // Get logged-in user info from token
  const token = useAppSelector(selectToken);
  const user = useMemo(() => (token ? (verifyToken(token) as unknown as TUser) : null), [token]);

  // Handler placeholders
  const handleRequestZakat = () => {
    alert("Redirecting to Zakat request form...");
  };

  const handleFilterRequests = () => {
    alert("Filter functionality coming soon.");
  };

  const handleExportRequests = () => {
    alert("Export functionality coming soon.");
  };

  const handleViewRequest = (req: typeof requests[0]) => {
    alert(`Viewing request dated ${req.date} for amount ${req.amount}`);
  };

  const handleViewAllAnnouncements = () => {
    alert("Redirecting to full announcements page...");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle menu"
            className="flex flex-col justify-center gap-1 w-6 h-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="block h-0.5 bg-gray-700 w-4"></span>
            <span className="block h-0.5 bg-gray-700 w-4"></span>
            <span className="block h-0.5 bg-gray-700 w-4"></span>
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 select-none">
            Receiver Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            aria-label="Notifications"
            className="relative focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </button>
          <div
            aria-label="User profile"
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700"
          >
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-6 md:py-8 space-y-12 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              Welcome{user?.userEmail ? `, ${user.userEmail}` : ""}!
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Track your assistance requests and stay informed
            </p>
          </div>
          <button
            onClick={handleRequestZakat}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-6 py-2 md:py-3 rounded-lg font-medium flex items-center gap-2 text-sm md:text-base transition-colors"
            aria-label="Request Zakat"
          >
            <span className="text-lg leading-none">+</span>
            <span>Request Zakat</span>
          </button>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Total Received",
              value: "৳2,300",
              icon: <TrendingUp className="w-5 h-5 mr-1 text-blue-600" />,
              subtitle: "+৳300 this month",
              color: "text-green-600",
            },
            {
              title: "Active Requests",
              value: "2",
              icon: <Calendar className="w-5 h-5 text-gray-600" />,
            },
            {
              title: "Rejected Requests",
              value: "1",
              icon: <Users className="w-5 h-5 text-gray-600" />,
            },
          ].map((stat, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              role="region"
              aria-labelledby={`stat-title-${idx}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  id={`stat-title-${idx}`}
                  className="text-gray-600 text-sm font-semibold select-none"
                >
                  {stat.title}
                </h3>
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 select-text">{stat.value}</p>
              {stat.subtitle && (
                <p
                  className={`mt-2 flex items-center text-sm font-semibold ${stat.color}`}
                  aria-label={stat.subtitle}
                >
                  {stat.icon}
                  <span className="ml-1">{stat.subtitle}</span>
                </p>
              )}
            </article>
          ))}
        </section>

        {/* Requests and Announcements */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Requests Table */}
          <section
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            aria-labelledby="requests-title"
          >
            <header className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
              <div>
                <h3
                  id="requests-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Your Requests
                </h3>
                <p className="text-sm text-gray-500">Track all your Zakat requests</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleFilterRequests}
                  className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Filter requests"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={handleExportRequests}
                  className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Export requests"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead className="bg-gray-50">
                  <tr>
                    {["Date", "Amount", "Category", "Status", "Action"].map((col) => (
                      <th
                        key={col}
                        className="px-4 md:px-6 py-3 text-left font-semibold text-gray-500 uppercase"
                        scope="col"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((req, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      tabIndex={0}
                      role="row"
                      aria-label={`Request on ${req.date} for amount ${req.amount} under ${req.category} with status ${req.status}`}
                      onClick={() => handleViewRequest(req)}
                    >
                      <td className="px-4 md:px-6 py-4 text-gray-900">{req.date}</td>
                      <td className="px-4 md:px-6 py-4 font-medium text-gray-900">{req.amount}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-700">{req.category}</td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full select-none ${
                            req.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : req.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                          aria-label={`Status: ${req.status}`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-500 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewRequest(req);
                          }}
                          className="hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                          aria-label="View request details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Announcements Panel */}
          <section
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-auto max-h-[480px]"
            aria-labelledby="announcements-title"
          >
            <h3
              id="announcements-title"
              className="text-lg font-semibold text-gray-900 mb-4"
            >
              Announcements
            </h3>
            <div className="space-y-6">
              {announcements.map((item, i) => (
                <article
                  key={i}
                  tabIndex={0}
                  className="space-y-2 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                  aria-label={`Announcement titled ${item.title} dated ${item.date}`}
                >
                  <header className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 select-text">
                      {item.title}
                    </h4>
                    <time
                      className="text-xs text-gray-400 select-none"
                      dateTime={new Date(item.date).toISOString()}
                    >
                      {item.date}
                    </time>
                  </header>
                  <p className="text-sm text-gray-600 leading-relaxed select-text">
                    {item.message}
                  </p>
                </article>
              ))}
            </div>
            <button
              onClick={handleViewAllAnnouncements}
              className="w-full mt-6 text-center text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              aria-label="View all announcements"
            >
              View All Announcements
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}
