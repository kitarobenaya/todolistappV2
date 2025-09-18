import { useState } from "react";
import ScheduleItem from "./assets/component/ScheduleItems.jsx";
import InputForm from "./assets/component/InputForm.jsx";
import "./App.css";

export default function App() {
  const [schedules, setSchedules] = useState(JSON.parse(localStorage.getItem("schedules")) || []);
  const [showInputForm, setShowInputForm] = useState(false);
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

  // const handleCheck = (id) =>
  //   setItems(prev =>
  //     prev.map(it =>
  //       it.id === id ? { ...it, checked: !it.checked } : it
  //     )
  //   );

  // const handleContOpen = (id) =>
  //   setItems(prev =>
  //     prev.map(it => ({
  //       ...it,
  //       isContOpen: it.id === id ? !it.isContOpen : false
  //     }))
  //   );

  return (
    <>
      {showInputForm && <InputForm setShowForm={setShowInputForm} stateItems={setSchedules} />}

      <header className="app-header mt-4">
        <h1 className="text-4xl font-bold text-center font-[Montserrat] text-text-primary animate-title underline underline-offset-8">
          Schedule Your Day with Kitaro's To-Do List App
        </h1>
      </header>

      <main className="schedule-manager size-full mt-16" role="main">
        <div className="controls size-full flex justify-end mb-8">
          <button 
            type="button"
            className="add-schedule-btn bg-accent p-2 mr-8 rounded-xl hover:bg-[#6E867B] cursor-pointer transition-colors duration-500 ease-in-out flex gap-2 items-center"
            aria-label="Add new schedule"
            onClick={() => setShowInputForm(true)}
          >
            <span className="add-schedule-btn-text font-[Montserrat] font-bold text-text-primary relative flex justify-center">
              Add Schedule
            </span>
          </button>
        </div>

        <section 
          className="schedule-list size-full flex flex-row gap-8 justify-center items-center mb-16 flex-wrap"
          aria-label="Schedule lists by date"
        >
          {/* schedule list */}
          {schedules.map(schedule => {
            const hari = new Date(schedule.date).toLocaleDateString('id-ID', { weekday: 'long' });  
            return (
            <article 
              className="schedule-day w-[28rem] h-fit bg-accent rounded-2xl flex flex-col gap-6 schedules-center p-2"
              aria-labelledby={schedule.uid}
            >
              <header>
                <h2 
                  id="date-heading-1"
                  className="text-center font-bold font-[Montserrat] text-2xl text-text-primary"
                >
                  <time dateTime={schedule.date}>{hari+ ", " +schedule.date}</time>
                </h2>
              </header>

              <div className="schedule-items flex flex-col gap-6" role="list">
                {/* {items.map(item => (
                  <ScheduleItem
                    key={item.id}
                    item={item}
                    onCheck={handleCheck}
                    onContOpen={handleContOpen}
                  />
                ))} */}
              </div>

              <footer className="controls w-full h-fit flex justify-center items-center mb-2">
                <button
                  type="button"
                  className="add-schedule-btn w-full bg-maroon p-2 rounded-xl hover:bg-[#865555] cursor-pointer transition-colors duration-500 ease-in-out flex gap-2 justify-center items-center"
                  aria-label="Add new schedule"
                  onClick={() => setShowInputForm(true)}
                >
                  <span className="add-task-btn-text font-[Montserrat] font-bold text-white relative flex justify-center">
                    Add Task
                  </span>
                </button>
              </footer>
            </article>
          )})}

        </section>
      </main>

    </>
  );
}