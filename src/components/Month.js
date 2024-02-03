// Month.js
import React, { useContext } from "react";
import Day from "./Day";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function Month() {
  const { monthIndex, selectedYear } = useContext(GlobalContext);
  const monthMatrix = getMonth(monthIndex, selectedYear);

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {monthMatrix.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
