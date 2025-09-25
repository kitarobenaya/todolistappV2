import { useState } from "react";
import Header from "./assets/component/Header.jsx";
import ScheduleItem from "./assets/component/ScheduleItems.jsx";
import InputForm from "./assets/component/InputSchedule.jsx";
import InputItems from "./assets/component/InputItems.jsx";
import "./App.css";

export default function App() {
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem("schedules")) || []
  );
  const [showInputForm, setShowInputForm] = useState(false);
  const [showInputTask, setInputTask] = useState(false);
  const [date, setDate] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("schedules"))?.flatMap((sch) => sch.items) || []);

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
        <InputForm setShowForm={setShowInputForm} stateItems={setSchedules} />
      )}
      {showInputTask && (
        <InputItems
          date={date}
          setInputTask={setInputTask}
          stateItems={setItems}
          setSchedules={setSchedules}
        />
      )}

      < Header />

      <main className="schedule-manager size-full mt-8" role="main">
        <div className="controls size-full flex justify-end mb-8">
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

        <section
          className="schedule-list size-full flex p-2 gap-6 justify-center items-center mb-16 flex-wrap"
          aria-label="Schedule lists by date"
        >
          {/* schedule list */}
          {schedules.map((schedule) => {
            const hari = new Date(schedule.date).toLocaleDateString("id-ID", {
              weekday: "long",
            });

            return (
              <article
                key={schedule.uid}
                className="schedule-day w-[28rem] h-fit bg-accent rounded-2xl flex flex-col gap-6 schedules-center p-2 relative sm:w-[30rem]"
                aria-labelledby={schedule.uid}
              >
                <header>
                  <h2
                    id="date-heading-1"
                    className="text-center font-bold font-[Montserrat] text-[1.3rem] text-text-primary sm:text-[1.5rem]"
                  >
                    <time dateTime={schedule.date}>
                      {hari + ", " + schedule.date}
                    </time>
                  </h2>
                  <div className="action-button size-fit flex justify-end items-center absolute top-2 right-4 sm:top-4 sm:right-6">
                    {/* Delete button */}
                    <button
                      type="button"
                      className="delete-button size-6 p-2 rounded-full bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out relative flex justify-center items-center cursor-pointer"
                      onClick={() => handleDeleteList(schedule.uid)}
                      aria-label="Delete schedule list"
                    >
                      <span className="sr-only">Delete</span>
                      <div
                        className="w-3 h-1 bg-white absolute rotate-45"
                        aria-hidden="true"
                      />
                      <div
                        className="w-3 h-1 bg-white absolute -rotate-45"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </header>

                <div className="schedule-items flex flex-col gap-6" role="list">
                  {!schedule.items || schedule.items.length == 0 ? (
                    <p className="text-center text-text-secondary font-[Montserrat] italic text-[0.9rem]">
                      No tasks available. Please add a task.
                    </p>
                  ) : (
                    items
                      .filter((it) => it?.date === schedule.date)
                      .map((item) => (
                        <ScheduleItem
                          key={item.uid}
                          item={item}
                          setItems={setItems}
                          onContOpen={handleContOpen}
                          setSchedule={setSchedules}
                        />
                      ))
                  )}
                </div>

                <footer className="controls w-full h-fit flex justify-center items-center mb-2">
                  <button
                    type="button"
                    className="add-schedule-btn w-[90%] bg-maroon p-1 rounded-xl hover:bg-[#865555] cursor-pointer transition-colors duration-500 ease-in-out flex gap-2 justify-center items-center"
                    aria-label="Add new schedule"
                    onClick={() => {
                      setInputTask(true);
                      setDate(schedule.date);
                    }}
                  >
                    <span className="add-task-btn-text font-[Montserrat] font-bold text-white relative flex justify-center text-[0.9rem] sm:text-[1.09rem]">
                      Add Task
                    </span>
                  </button>
                </footer>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
