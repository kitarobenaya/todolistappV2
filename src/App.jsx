import { useState } from "react";
import ScheduleItem from "./assets/component/ScheduleItems.jsx";
import "./App.css";

const initialData = [
  {
    id: crypto.randomUUID(),
    title: "Sample Schedule",
    time: "10:00 AM - 11:00 AM",
    description: "This is a sample description of the schedule item.",
    checked: false,
    isContOpen: false
  },
  {
    id: crypto.randomUUID(),
    title: "Sample Schedule 2",
    time: "10:00 AM - 11:00 AM",
    description: "This is a sample description of the schedule item.",
    checked: false,
    isContOpen: false
  }
];

export default function App() {
  const [items, setItems] = useState(initialData);

  const handleCheck = (id) =>
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, checked: !it.checked } : it
      )
    );

  const handleContOpen = (id) =>
    setItems(prev =>
      prev.map(it => ({
        ...it,
        isContOpen: it.id === id ? !it.isContOpen : false
      }))
    );

  return (
    <>
      <header>
        <h1 className="text-4xl font-bold text-center font-[Montserrat] mt-4 text-text-primary animate-title underline underline-offset-8">
          Schedule Your Day with Kitaro's To-Do List App
        </h1>
      </header>

      <main className="size-full mt-16">
        <section className="size-full flex justify-end mb-8">
          <button className="addButton bg-accent p-2 mr-8 rounded-xl hover:bg-[#6E867B] hover:cursor-pointer">
            <span className="add-text flex justify-center size-fit font-[Montserrat] font-bold text-text-primary relative">
              Add Schedule
            </span>
          </button>
        </section>

        <section className="schedule-list size-full flex flex-row gap-8 justify-center items-center mb-16 flex-wrap">
          <article className="tanggal-schedule w-[28rem] h-fit bg-accent rounded-2xl flex flex-col gap-6 items-center p-2">
            <h1 className="text-center font-bold font-[Montserrat] text-2xl text-text-primary">
              Senin, 19 Juli 2025
            </h1>

            {items.map(item => (
              <ScheduleItem
                key={item.id}
                item={item}
                onCheck={handleCheck}
                onContOpen={handleContOpen}
              />
            ))}
          </article>
          <article className="tanggal-schedule w-[28rem] h-fit bg-accent rounded-2xl flex flex-col gap-6 items-center p-2">
            <h1 className="text-center font-bold font-[Montserrat] text-2xl text-text-primary">
              Senin, 19 Juli 2025
            </h1>

            {items.map(item => (
              <ScheduleItem
                key={item.id}
                item={item}
                onCheck={handleCheck}
                onContOpen={handleContOpen}
              />
            ))}
          </article>
        </section>
      </main>
    </>
  );
}