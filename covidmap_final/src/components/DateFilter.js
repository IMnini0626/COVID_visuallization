import React from "react";
import { useDate } from "../hooks/useDate";

function DateFilter({ selectedDate, changeDate,closeModal }) {
  const latestDates = useDate();
  return (
    <div className="filter__date" onClick={() => closeModal()}>
      {latestDates.map((item,key) =>{
        
        const date  = `${item.getMonth() + 1}/${item.getDate() }`

        return (
          <div className="dateItem" key={key}>
          <input type="radio" name="day" onChange={() => changeDate(item)}  checked={+selectedDate === +item} />
          <label htmlFor="">{date}</label>
        </div>
        )
      })}

      
    </div>
  );
}

export default DateFilter;
