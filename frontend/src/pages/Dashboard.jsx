import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
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
            <a href="#">Young...</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-box black">
            <h1>4</h1>
            <p>new partnership requests</p>
          </div>
          <div className="stat-box green">
            <h1>2</h1>
            <p>accepted partnerships</p>
          </div>
          <div className="stat-box blue">
            <h1>5</h1>
            <p>pending partnerships</p>
          </div>
          <div className="stat-box red">
            <h1>4</h1>
            <p>rejected partnerships</p>
          </div>
        </div>

        {/* Calendar Section */}
        <section className="calendar-section">
          <h2>upcoming events</h2>
          <p>Jan, 2025</p>
          <div className="calendar">
            {/* Calendar Header */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div className="day" key={day}>
                {day}
              </div>
            ))}

            {/* Calendar Dates with Events */}
            {[
              /* Week 1 */
              { date: "", events: [] },
              { date: "", events: [] },
              { date: "", events: [] },
              { date: "1", events: [] },
              { date: "2", events: ["Quotes"] },
              { date: "3", events: ["Giveaway"] },
              { date: "4", events: ["Blog", "Freebie"] },

              /* Week 2 */
              { date: "5", events: ["Blog", "Freebie"] },
              { date: "6", events: [] },
              { date: "7", events: [] },
              { date: "8", events: ["Quotes"] },
              { date: "9", events: ["Giveaway"] },
              { date: "10", events: ["Blog", "Freebie"] },
              { date: "11", events: [] },

              /* Week 3 */
              { date: "12", events: ["Quotes", "Blog"] },
              { date: "13", events: [] },
              { date: "14", events: ["Reel"] },
              { date: "15", events: ["Quotes"] },
              { date: "16", events: ["Giveaway"] },
              { date: "17", events: ["Blog", "Freebie"] },
              { date: "18", events: [] },

              /* Week 4 */
              { date: "19", events: ["Reel"] },
              { date: "20", events: ["Blog"] },
              { date: "21", events: [] },
              { date: "22", events: ["Quotes"] },
              { date: "23", events: ["Giveaway"] },
              { date: "24", events: ["Freebie"] },
              { date: "25", events: [] },

              /* Week 5 */
              { date: "26", events: ["Reel"] },
              { date: "27", events: [] },
              { date: "28", events: [] },
              { date: "29", events: ["Quotes"] },
              { date: "30", events: ["Giveaway"] },
              { date: "31", events: [] },
              { date: "", events: [] },
            ].map((day, index) => (
              <div className="date" key={index}>
                {day.date}
                {day.events.map((event, eventIndex) => (
                  <span
                    className={`event ${
                      event.toLowerCase() === "quotes"
                        ? "blue"
                        : event.toLowerCase() === "giveaway"
                        ? "orange"
                        : event.toLowerCase() === "blog"
                        ? "green"
                        : event.toLowerCase() === "reel"
                        ? "red"
                        : "gray"
                    }`}
                    key={eventIndex}
                  >
                    {event}
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
