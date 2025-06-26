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
import { useMemo } from "react";

export default function DonorDashboard() {
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

  const token = useAppSelector(selectToken);
  const user = useMemo(() => (token ? (verifyToken(token) as unknown as TUser) : null), [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button className="flex flex-col justify-center gap-1 w-6 h-6">
            <span className="block h-0.5 bg-gray-700 w-4"></span>
            <span className="block h-0.5 bg-gray-700 w-4"></span>
            <span className="block h-0.5 bg-gray-700 w-4"></span>
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">Donor Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-6 md:py-8 space-y-10">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Welcome back{user?.userEmail ? `, ${user.userEmail}` : ""}!
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Here's your donation overview</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm md:text-base">
            <span className="text-lg">+</span>
            <span>Give Zakat Now</span>
          </button>
        </section>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{
            title: "Total Donated",
            value: "৳4,500",
            icon: <TrendingUp className="w-4 h-4 mr-1" />,
            subtitle: "+12% from last month",
            color: "text-green-600",
          },
          {
            title: "Active Campaigns",
            value: "8",
            icon: <Calendar className="w-4 h-4 text-gray-600" />,
          },
          {
            title: "Receivers Helped",
            value: "23",
            icon: <Users className="w-4 h-4 text-gray-600" />,
            subtitle: "+3 this month",
            color: "text-green-600",
          },
          {
            title: "Pending Donations",
            value: "2",
            icon: <Calendar className="w-4 h-4 text-gray-600" />,
          }].map((card, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">{card.title}</span>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{card.value}</div>
              {card.subtitle && (
                <p className={`mt-1 flex items-center text-sm ${card.color}`}>
                  {card.icon}
                  <span className="ml-1">{card.subtitle}</span>
                </p>
              )}
            </div>
          ))}
        </section>

        {/* TODO Features Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Donations Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Donations</h3>
                <p className="text-sm text-gray-500">Your latest Zakat contributions</p>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <button className="px-3 py-2 border rounded-md text-sm flex items-center gap-1 hover:bg-gray-50">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="px-3 py-2 border rounded-md text-sm flex items-center gap-1 hover:bg-gray-50">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {["Date", "Amount", "Receiver", "Category", "Status", "Action"].map((col) => (
                      <th
                        key={col}
                        className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {donations.map((donation, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 text-gray-900">{donation.date}</td>
                      <td className="px-4 md:px-6 py-4 font-medium text-gray-900">{donation.amount}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-700">{donation.receiver}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-700">{donation.category}</td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            donation.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-500">
                        <button className="hover:bg-gray-100 p-1 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-5 md:p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Receiver Feedback</h3>
              <p className="text-sm text-gray-500">Messages from those you've helped</p>
            </div>
            <div className="p-5 md:p-6 space-y-6">
              {feedback.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-medium">{item.initials}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">"{item.message}"</p>
                </div>
              ))}
              <button className="w-full text-center text-blue-600 text-sm font-medium hover:underline">
                View All Feedback
              </button>
            </div>
          </div>
        </section>

        {/* Additional Features Coming */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Insights Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Donation Insights</h3>
              <PieChart className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600">Pie chart or summary of donations by category (Coming soon)</p>
          </div>

          {/* PDF Reports */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generate PDF Report</h3>
              <FileText className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Download your donation statement or feedback summary.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
              Download Report
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
