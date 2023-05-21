import Dropdown from "../Dropdown";
import { useEffect, useState } from "react";

function DatePicker({
  setDate,
  startDate = new Date(),
  endDate = new Date(),
  value = new Date(),
}) {
  const getYears = () => {
    let years = [];
    for (let i = startDate.getFullYear(); i <= endDate.getFullYear(); i++) {
      years.push(i);
    }
    return years;
  };
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const getDays = (date) => {
    const longMonths = ["JAN", "MAR", "MAY", "JUL", "AUG", "OCT", "DEC"];
    const shortMonths = ["APR", "JUN", "SEP", "NOV"];
    let val;
    if (longMonths.includes(months[date.getMonth()])) {
      val = 31;
    } else if (shortMonths.includes(months[date.getMonth()])) {
      val = 30;
    } else {
      if (
        date.getFullYear() % 4 == 0 &&
        (date.getFullYear() % 100 != 0 || date.getFullYear() % 400 == 0)
      ) {
        val = 29;
      }
      val = 28;
    }
    let days = [];
    for (let i = 1; i <= val; i++) {
      days.push(i);
    }
    return days;
  };
  const [day, setDay] = useState(value.getDate() - 1);
  const [month, setMonth] = useState(value.getMonth());
  const [year, setYear] = useState(value.getFullYear());
  const date = new Date(value.getFullYear(), month, day + 1);
  const changeVal = (type, val) => {
    if (type == "year") {
      setYear(val + startDate.getFullYear());
      setDate(new Date(val + startDate.getFullYear(), month, day + 1));
    }
    if (type == "month") {
      setMonth(val);
      setDate(new Date(year, val, day + 1));
    }
    if (type == "day") {
      setDay(val);
      setDate(new Date(year, month, val + 1));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <Dropdown
        options={getDays(date)}
        selected={day}
        changeSelected={(val) => changeVal("day", val)}
      />
      <Dropdown
        options={months}
        selected={month}
        changeSelected={(val) => changeVal("month", val)}
      />
      <Dropdown
        options={getYears()}
        selected={year - startDate.getFullYear()}
        changeSelected={(val) => changeVal("year", val)}
      />
    </div>
  );
}
export default DatePicker;
