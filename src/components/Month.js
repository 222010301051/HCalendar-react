import React, { useContext } from "react";
import Day from "./Day";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
export default function Month({ month }) {
  const { monthIndex } = useContext(GlobalContext);
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
