// App.js

import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import AllMonthsView from "./components/AllMonthsView";
import YearHeader from "./components/YearHeader";
import axios from "axios";
import dayjs from "dayjs";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, viewMonth, viewYear } =
    useContext(GlobalContext);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex, selectedYear));
    fetchHolidays();
  }, [selectedYear]);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        `https://calendarific.com/api/v2/holidays?api_key=9ay6tbvNdZl3GFtegwo39mJuJ4bkYO3c&country=US&year=${selectedYear}`
      );

      const fetchedEvents = response.data.response.holidays.map((holiday) => ({
        title: holiday.name,
        description: holiday.description,
        start: dayjs(holiday.date.iso).toDate(),
        end: dayjs(holiday.date.iso).toDate(),
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        {viewYear && (
          <React.Fragment>
            <YearHeader />
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
            <AllMonthsView selectedYear={selectedYear} events={events} />
          </React.Fragment>
        )}
        {viewMonth && (
          <React.Fragment>
            <CalendarHeader />
            <div className="flex flex-1">
              <Sidebar />
              {/* Pass selectedYear as a prop to Month component */}
              <Month
                month={currentMonth}
                selectedYear={selectedYear}
                events={events}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
