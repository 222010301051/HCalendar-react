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
function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, viewMonth, viewYear } =
    useContext(GlobalContext);
  const [selectedYear, setSelectedYear] = useState(2023);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

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
            <AllMonthsView selectedYear={selectedYear} />
          </React.Fragment>
        )}{" "}
        {/* No Sidebar and CalendarHeader for the year view */}
        {viewMonth && (
          <React.Fragment>
            <CalendarHeader />
            <div className="flex flex-1">
              <Sidebar />
              <Month month={currenMonth} />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
export default App;
