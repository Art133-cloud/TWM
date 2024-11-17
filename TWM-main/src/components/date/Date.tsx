import { useState, useEffect, useRef } from "react";
import styles from "./Date.module.scss";
import Calendar from "../calendar/Calendar";
import CalendarIcon from "../../../public/assets/svg/CalendarIcon";

const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day; 
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  return startOfWeek;
};

const formatWeek = (date: Date) => {
  const startOfWeek = getStartOfWeek(date);
  return startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const formattedDate = formatWeek(selectedDate); 

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  const toggleCalendar = () => setCalendarOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.datePicker} ref={datePickerRef}>
      <h2>Check In</h2>
      <div className={styles.dateDisplay} onClick={toggleCalendar}>
        <span>{formattedDate}</span>
        <CalendarIcon />
      </div>

      {isCalendarOpen && (
        <Calendar closeCalendar={closeCalendar} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      )}
    </div>
  );
}
