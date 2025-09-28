import { useState } from "react";
import Header from "./assets/component/Header.jsx";
import Schedule from "./assets/component/Schedule.jsx";
import Footer from "./assets/component/Footer.jsx";
import InputForm from "./assets/component/InputForm/InputSchedule.jsx";
import InputTask from "./assets/component/InputForm/InputTask.jsx";
import "./App.css";

export default function App() {
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem("schedules")) || []
  );
  const [showInputForm, setShowInputForm] = useState(false);
  const [showInputTask, setInputTask] = useState(false);
  const [date, setDate] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("schedules"))?.flatMap((sch) => sch.items) || []);
  const isScheduleEmpty = schedules.length === 0;
  const ScheduleEmptySty = isScheduleEmpty ? " flex flex-col items-center justify-center grow pb-20" : "grow";

  const handleContOpen = (id) =>
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        isContOpen: it?.uid === id ? !it?.isContOpen : it?.isContOpen,
      }))
    );

  const handleDeleteList = (uid) => {
    const updatedSchedules = schedules.filter(
      (schedule) => schedule.uid !== uid
    );
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  return (
    <>
      {showInputForm && (
        <InputForm showInputForm={showInputForm} setShowForm={setShowInputForm} stateItems={setSchedules} />
      )}

      {showInputTask && (
        <InputTask
          date={date}
          showInputTask={showInputTask}
          setInputTask={setInputTask}
          stateItems={setItems}
          setSchedules={setSchedules}
        />
      )}

      < Header />

      <div className="controls size-full flex justify-end mb-8 pt-4 pr-3">
        <button
          type="button"
          className="add-schedule-btn bg-accent p-1 mr-4 rounded-xl hover:bg-[#6E867B] cursor-pointer transition-colors duration-500 ease-in-out flex gap-2 items-center sm:p-2 sm:mr-8"
          aria-label="Add new schedule"
          onClick={() => setShowInputForm(true)}
        >
          <span className="add-schedule-btn-text font-[Montserrat] font-bold text-text-primary relative flex justify-center text-[0.9rem] sm:text-[1rem]">
            Add Schedule
          </span>
        </button>
      </div>

      <main className={`schedule-manager size-full mt-8 ${ScheduleEmptySty}`} role="main">

        {isScheduleEmpty && (
          <div className="size-fit flex justify-center items-center">
            <p className="text-center text-text-secondary font-[Montserrat] italic text-[1rem]">
              No schedules available. Please add a schedule.
            </p>
          </div>
        )}

        {!isScheduleEmpty && (
          <Schedule
            schedules={schedules}
            handleDeleteList={handleDeleteList}
            items={items}
            setItems={setItems}
            handleContOpen={handleContOpen}
            setInputTask={setInputTask}
            setDate={setDate}
            setSchedules={setSchedules}
          />
        )}
        
      </main>

      < Footer />
    </>
  );
}
