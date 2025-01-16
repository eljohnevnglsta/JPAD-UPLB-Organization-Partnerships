import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for API requests
import "../stylesheets/Dashboard.css";

const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]); // Store events fetched from the backend
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

  // Function to get the days in the current month
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0); // Last day of the month
    const days = [];
    for (let i = 1; i <= date.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  // Fetch events and partnership data from the backend
  const fetchDashboardData = async (month, year) => {
    try {
      // Fetch the partnership counts
      const partnershipsResponse = await axios.get(
        `http://localhost:5000/api/partnerships?month=${month + 1}&year=${year}`
      );
      setPartnerships(partnershipsResponse.data); // Assuming the API returns { new, accepted, pending, rejected }

      // Fetch the events for the given month and year
      const eventsResponse = await axios.get(
        `http://localhost:5000/api/events?month=${month + 1}&year=${year}`
      );
      setEvents(eventsResponse.data); // Assuming the API returns an array of events
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(currentMonth, currentYear);
  }, [currentMonth, currentYear]);  

  // Navigate to the previous month
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // Move to December of the previous year
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // Move to January of the next year
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  // Get the weekday for alignment
  const getWeekday = (year, month, day) => {
    return new Date(year, month, day).getDay(); // 0 is Sunday, 1 is Monday...
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-container">
          <span className="site-name">sitename</span>
          <nav>
            <a href="#">dashboard</a>
            <a href="#">partnerships</a>
            <a href="#">
              <img src="search-icon.png" alt="Search" />
            </a>
            <a href="#">Young Software Engineers Society</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-box black">
            <h1>{partnerships.new}</h1>
            <p>new partnership requests</p>
          </div>
          <div className="stat-box green">
            <h1>{partnerships.accepted}</h1>
            <p>accepted partnerships</p>
          </div>
          <div className="stat-box blue">
            <h1>{partnerships.pending}</h1>
            <p>pending partnerships</p>
          </div>
          <div className="stat-box red">
            <h1>{partnerships.rejected}</h1>
            <p>rejected partnerships</p>
          </div>
        </div>

        {/* Calendar Section */}
        <section className="calendar-section">
          <h2>upcoming events</h2>
          <div className="calendar-navigation">
            <button onClick={handlePreviousMonth}>Previous</button>
            <p>
              {months[currentMonth]}, {currentYear}
            </p>
            <button onClick={handleNextMonth}>Next</button>
          </div>
          <div className="calendar">
            {/* Calendar Header */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div className="day" key={day}>
                {day}
              </div>
            ))}

            {/* Empty cells for alignment */}
            {Array.from({ length: getWeekday(currentYear, currentMonth, 1) })
              .map((_, index) => (
                <div className="date empty" key={`empty-${index}`} />
              ))}

            {/* Calendar Dates */}
            {daysInMonth.map((day, index) => (
              <div className="date" key={index}>
                {day}
                {events
                  .filter(
                    (event) =>
                      new Date(event.startDate).getDate() === day &&
                      new Date(event.startDate).getMonth() === currentMonth &&
                      new Date(event.startDate).getFullYear() === currentYear
                  )
                  .map((event, eventIndex) => (
                    <span
                      className={`event ${event.type}`} // Use the event's type for dynamic styling
                      key={eventIndex}
                    >
                      {event.title}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
