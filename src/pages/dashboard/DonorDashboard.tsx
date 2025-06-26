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
  PieChart,
  FileText,
} from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example data for Pie Chart
const pieData = [
  { name: "Poor & Needy", value: 400 },
  { name: "Education", value: 300 },
  { name: "Healthcare", value: 300 },
  { name: "Other", value: 200 },
];
const COLORS = ["#4ade80", "#60a5fa", "#fbbf24", "#f87171"];

// Mock donations & feedback (replace with real API call or Redux state)
const donations = [
  {
    date: "20/03/2025",
    amount: "৳250",
    receiver: "Ahmad Family",
    category: "Poor & Needy",
    status: "Completed",
  },
  {
    date: "21/04/2025",
    amount: "৳500",
    receiver: "Education Fund",
    category: "Education",
    status: "Completed",
  },
  {
    date: "01/05/2025",
    amount: "৳150",
    receiver: "Medical Aid",
    category: "Healthcare",
    status: "Pending",
  },
];

const feedback = [
  {
    name: "Fatima Al-Zahra",
    initials: "FA",
    date: "05/03/2025",
    message:
      "Your generous donation helped my family during our difficult time. May Allah bless you abundantly!",
  },
  {
    name: "Community Center",
    initials: "CC",
    date: "01/08/2024",
    message:
      "Thanks to your support, we were able to provide meals for 50 families this month.",
  },
];

export default function DonorDashboard() {
  // Get logged-in user info from token
  const token = useAppSelector(selectToken);
  const user = useMemo(() => (token ? (verifyToken(token) as unknown as TUser) : null), [token]);

  // Handler placeholders
  const handleGiveZakat = () => {
    // TODO: Open modal or redirect to donation page
    alert("Redirecting to donation form...");
  };

  const handleFilterDonations = () => {
    // TODO: Show filter modal or dropdown
    alert("Filter functionality coming soon.");
  };

  const handleExportDonations = () => {
    // TODO: Export donation data as CSV/PDF
    alert("Export functionality coming soon.");
  };

  const handleViewDonation = (donation: typeof donations[0]) => {
    // TODO: Show detailed donation info modal/page
    alert(`Viewing donation to ${donation.receiver} on ${donation.date}`);
  };

  const handleDownloadReport = () => {
    // TODO: Generate and download PDF report (use jsPDF or similar)
    alert("PDF generation coming soon.");
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
            Donor Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button
            aria-label="Notifications"
            className="relative focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
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
              Welcome back{user?.userEmail ? `, ${user.userEmail}` : ""}!
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Here's your donation overview
            </p>
          </div>
          <button
            onClick={handleGiveZakat}
            className="bg-green-600 hover:bg-green-700 text-white px-5 md:px-6 py-2 md:py-3 rounded-lg font-medium flex items-center gap-2 text-sm md:text-base transition-colors"
            aria-label="Give Zakat Now"
          >
            <span className="text-lg leading-none">+</span>
            <span>Give Zakat Now</span>
          </button>
        </section>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Donated",
              value: "৳4,500",
              icon: <TrendingUp className="w-5 h-5 mr-1 text-green-600" />,
              subtitle: "+12% from last month",
              color: "text-green-600",
            },
            {
              title: "Active Campaigns",
              value: "8",
              icon: <Calendar className="w-5 h-5 text-gray-600" />,
            },
            {
              title: "Receivers Helped",
              value: "23",
              icon: <Users className="w-5 h-5 text-gray-600" />,
              subtitle: "+3 this month",
              color: "text-green-600",
            },
            {
              title: "Pending Donations",
              value: "2",
              icon: <Calendar className="w-5 h-5 text-gray-600" />,
            },
          ].map((card, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              role="region"
              aria-labelledby={`card-title-${idx}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  id={`card-title-${idx}`}
                  className="text-gray-600 text-sm font-semibold select-none"
                >
                  {card.title}
                </h3>
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 select-text">{card.value}</p>
              {card.subtitle && (
                <p
                  className={`mt-2 flex items-center text-sm font-semibold ${card.color}`}
                  aria-label={card.subtitle}
                >
                  {card.icon}
                  <span className="ml-1">{card.subtitle}</span>
                </p>
              )}
            </article>
          ))}
        </section>

        {/* Recent Donations & Feedback */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Donations Table */}
          <section
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            aria-labelledby="donations-title"
          >
            <header className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
              <div>
                <h3
                  id="donations-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Recent Donations
                </h3>
                <p className="text-sm text-gray-500">Your latest Zakat contributions</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleFilterDonations}
                  className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Filter donations"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={handleExportDonations}
                  className="px-4 py-2 border rounded-md text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Export donations"
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
                    {[
                      "Date",
                      "Amount",
                      "Receiver",
                      "Category",
                      "Status",
                      "Action",
                    ].map((col) => (
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
                  {donations.map((donation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewDonation(donation)}
                      tabIndex={0}
                      role="row"
                      aria-label={`Donation on ${donation.date} of amount ${donation.amount} to ${donation.receiver}`}
                    >
                      <td className="px-4 md:px-6 py-4 text-gray-900">{donation.date}</td>
                      <td className="px-4 md:px-6 py-4 font-medium text-gray-900">
                        {donation.amount}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-700">{donation.receiver}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-700">{donation.category}</td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full select-none ${
                            donation.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                          aria-label={`Status: ${donation.status}`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-500 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDonation(donation);
                          }}
                          className="hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          aria-label="View donation details"
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

          {/* Feedback Panel */}
          <section
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-auto max-h-[480px]"
            aria-labelledby="feedback-title"
          >
            <h3
              id="feedback-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              Receiver Feedback
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Messages from those you've helped
            </p>
            <div className="space-y-6">
              {feedback.map((item, index) => (
                <article
                  key={index}
                  className="space-y-1"
                  aria-label={`Feedback from ${item.name} dated ${item.date}`}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium select-none">
                          {item.initials}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 select-text">
                        {item.name}
                      </span>
                    </div>
                    <time
                      className="text-xs text-gray-400 select-none"
                      dateTime={new Date(item.date).toISOString()}
                    >
                      {item.date}
                    </time>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed select-text">
                    "{item.message}"
                  </p>
                </article>
              ))}
            </div>
            <button
              className="w-full mt-6 text-center text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="View all feedback"
              onClick={() => alert("Redirecting to full feedback page...")}
            >
              View All Feedback
            </button>
          </section>
        </section>

        {/* Insights & Reports */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Donation Insights with Recharts Pie Chart */}
          <section
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            aria-labelledby="insights-title"
          >
            <header className="flex items-center justify-between mb-4">
              <h3
                id="insights-title"
                className="text-lg font-semibold text-gray-900"
              >
                Donation Insights
              </h3>
              <PieChart className="w-6 h-6 text-gray-500" />
            </header>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <RePieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* PDF Report Download */}
          <section
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between"
            aria-label="PDF report download"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Generate PDF Report
                </h3>
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Download your donation statement or feedback summary.
              </p>
            </div>
            <button
              onClick={handleDownloadReport}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Download donation report"
            >
              Download Report
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}
