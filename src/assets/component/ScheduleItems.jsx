// ScheduleItem.jsx
import { useState, useEffect } from "react";
import RightArrow from "./../img/right-arrow.png";
import LeftArrow from "./../img/left-arrow.png";
import EditForm from "./EditForm.jsx";


const ANIM_DURATION = 700; // ms

export default function ScheduleItem({ item, onContOpen, setItems, setSchedule }) {
  // animasi mount/unmount
  const [show, setShow] = useState(item.isContOpen);
  const [render, setRender] = useState(item.isContOpen);
  const [showEditForm, setEditForm] = useState(false);

  useEffect(() => {
    if (item.isContOpen) {
      setRender(true);
      setShow(true);
    } else {
      setShow(false);
      const t = setTimeout(() => setRender(false), ANIM_DURATION);
      return () => clearTimeout(t);
    }
  }, [item.isContOpen]);

  function handleDeleteTask(uid) {
    const existingSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const updatedSchedules = existingSchedules.map(sch => ({
      ...sch,
      items: sch.items.filter(it => it.uid !== uid)
    }));
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setItems(prev => prev.filter(it => it.uid !== uid));
    setSchedule(updatedSchedules);
  }

  function handleCheckTask(uid) {
    const existingSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const updatedSchedules = existingSchedules.map(sch => ({
      ...sch,
      items: sch.items.map(it => 
        it.uid === uid ? { ...it, checked: !it.checked } : it
      )
    }));
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setItems(prev => 
      prev.map(it => 
        it.uid === uid ? { ...it, checked: !it.checked } : it
      )
    );
  }

  // className helpers (Tailwind)
  const cardBg = item.checked ? "bg-emerald-200" : "bg-white";
  const textLine = item.checked ? "line-through" : "";
  const actionClass = show
    ? "animate-controlIn"
    : "pointer-events-none animate-controlOut";

  return (
    <>
      {showEditForm && <EditForm uid={item.uid} title={item.title} time1={item.time1} time2={item.time2} desc={item.desc} checked={item.checked} date={item.date} stateItems={setItems} setEditForm={setEditForm} />}
    <div
      className="schedule-container size-full flex justify-center items-center flex-col relative "
      role="listitem"
    >
      {/* Action panel */}
      {render && (
        <aside
          className={`
          schedule-actions flex justify-center items-center flex-col gap-2
          bg-text-primary p-2 rounded-br-xl rounded-tr-xl
          absolute right-[-2.4rem] shadow-2xl transition-all duration-300
          ${actionClass}
        `}
          aria-label="Schedule item actions"
        >
          {/* Completion status */}
          <div className="completion-status inline-flex items-center">
            <label
              className="flex items-center cursor-pointer relative"
              htmlFor={`complete-${item.uid}`}
            >
              <input
                type="checkbox"
                id={`complete-${item.uid}`}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-500 checked:border-green-500"
                checked={item.checked}
                onChange={() => handleCheckTask(item.uid)}
                aria-label="Mark as complete"
              />
              <span
                className="checkmark absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="action-buttons flex flex-col items-center gap-2 ">
            <button
              type="button"
              className="delete-button size-6 p-2 rounded-full bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out relative flex justify-center items-center cursor-pointer"
              onClick={() => handleDeleteTask(item.uid)}
              aria-label="Delete schedule item"
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
            <button
              type="button"
              className="edit-button font-[Montserrat] text-white hover:underline cursor-pointer"
              onClick={() => setEditForm(true)}
              aria-label="Edit schedule item"
            >
              Edit
            </button>
          </div>
        </aside>
      )}

      {/* Schedule card */}
      <article
        className={`schedule-card w-[96%] h-fit p-1 rounded-2xl shadow-xl flex items-center relative ${cardBg}`}
        aria-labelledby={`schedule-title-${item.uid}`}
      >
        <div className="schedule-content p-4">
          <header>
            <h2
              id={`schedule-title-${item.uid}`}
              className={`schedule-title font-[Montserrat] font-bold text-xl text-text-primary mb-2 ${textLine}`}
            >
              {item.title}
            </h2>
            <time
              dateTime={item.time1 +  "-" + item.time2}
              className={`schedule-time font-[Montserrat] text-text-secondary mb-4 block ${textLine}`}
            >
              {item.time1} - {item.time2}
            </time>
          </header>
          <p
            className={`schedule-description font-[Montserrat] text-text-secondary max-w-full break-words ${textLine}`}
          >
            {item.desc}
          </p>
        </div>

        {/* Toggle panel button */}
        <button
          type="button"
          className="schedule-control flex items-center size-fit rounded-full bg-button-accent p-2 hover:cursor-pointer hover:bg-[#F4E2BB] transition-colors duration-500 ease-in-out absolute right-0.5 z-10"
          onClick={() => onContOpen(item.uid)}
          aria-label={
            item.isContOpen ? "Close actions panel" : "Open actions panel"
          }
          aria-expanded={item.isContOpen}
        >
          <img
            src={item.isContOpen ? LeftArrow : RightArrow}
            alt=""
            className="size-5 select-none"
            aria-hidden="true"
          />
        </button>
      </article>
    </div>
    </>
  );
}
