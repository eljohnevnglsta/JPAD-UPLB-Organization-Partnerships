import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const Dashboard = () => {
  const userEmail = JSON.parse(localStorage.getItem("account")).email;
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [partnerships, setPartnerships] = useState({
    new: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    return Array.from({ length: date.getDate() }, (_, index) => index + 1);
  };

  const fetchDashboardData = async () => {
    try {
      const eventResponse = await axios.get("http://localhost:3001/event/get/all");
      setEvents(
        eventResponse.data.filter(
          (event) =>
            event.publisher === userEmail || event.partnerIds.includes(userEmail)
        )
      );

      const requestResponse = await axios.get("http://localhost:3001/request/get/all");
      const requests = requestResponse.data;
      setPartnerships({ 
        new: requests.filter((request) => request.invitee === userEmail && request.status === "pending").length,
        accepted: requests.filter((request) => request.status === "approved" && (request.publisher === userEmail || request.invitee === userEmail)).length,
        pending: requests.filter((request) => request.publisher === userEmail && request.status === "pending").length,
        rejected: requests.filter((request) => request.status === "rejected" && (request.publisher === userEmail || request.invitee === userEmail)).length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const getWeekday = (year, month, day) => new Date(year, month, day).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div className="tailwind-scope">
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="p-6 flex-1 space-y-8">
        {/* Partnership Summary - Flex Row and Smaller */}
        <div className="flex flex-wrap mb-8 justify-between">
          <div className="bg-white shadow-lg rounded-lg p-4 w-150 text-center flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold text-gray-700">{partnerships.new}</h1>
            <p className="text-sm text-gray-500">New partnership requests</p>
          </div>
          <div className="bg-green-500 text-white shadow-lg rounded-lg p-4 w-150 text-center flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">{partnerships.accepted}</h1>
            <p className="text-sm">Accepted partnerships</p>
          </div>
          <div className="bg-blue-500 text-white shadow-lg rounded-lg p-4 w-150 text-center flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">{partnerships.pending}</h1>
            <p className="text-sm">Pending partnerships</p>
          </div>
          <div className="bg-red-500 text-white shadow-lg rounded-lg p-4 w-150 text-center flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">{partnerships.rejected}</h1>
            <p className="text-sm">Rejected partnerships</p>
          </div>
        </div>

        {/* Calendar Section - More Space */}
        <section className="calendar-section bg-white shadow-lg rounded-lg p-6 h-full">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePreviousMonth}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Previous
            </button>
            <p className="text-xl font-medium text-gray-700">
              {months[currentMonth]}, {currentYear}
            </p>
            <button
              onClick={handleNextMonth}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: getWeekday(currentYear, currentMonth, 1) }).map(
              (_, index) => (
                <div className="text-center" key={`empty-${index}`} />
              )
            )}

            {daysInMonth.map((day, index) => {
              const currentDate = new Date(currentYear, currentMonth, day);

              const filteredEvents = events.filter((event) => {
                const eventDate = new Date(event.startDate);
                return (
                  eventDate.getDate() === currentDate.getDate() &&
                  eventDate.getMonth() === currentDate.getMonth() &&
                  eventDate.getFullYear() === currentDate.getFullYear()
                );
              });

              return (
                <div key={index} className="relative flex flex-col items-center">
                  <div className="text-center py-2 rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
                    {day}
                  </div>
                  {filteredEvents.map((event, eventIndex) => (
                    <span
                      key={eventIndex}
                      className={`absolute top-1 left-1 text-xs px-1 py-0.5 rounded-full bg-${event.eventType === "meeting" ? "blue" : "green"}-500 text-white`}
                      title={event.description}
                    >
                      {event.title}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
