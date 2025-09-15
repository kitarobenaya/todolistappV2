import { useState } from "react";
import RightArrow from './assets/img/right-arrow.png';
import LeftArrow from './assets/img/left-arrow.png';
import "./App.css";


export default function App() {
  const [click, setClick] = useState(false);
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold text-center font-[Montserrat] mt-4 text-text-primary animate-title underline underline-offset-8">
          Schedule Your Day with Kitaro's To-Do List App
        </h1>
      </header>

      <main className="size-full mt-16">
        <section className="size-full flex justify-end mb-8">
          <button
            type="button"
            className="addButton bg-accent p-2 mr-8 rounded-xl hover:bg-[#6E867B] hover:cursor-pointer"
          >
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
            <article className="schedule-card bg-white w-[96%] h-fit p-1 rounded-2xl shadow-xl flex justify-between items-center relative">
              <div className="schedule-content p-4">
                <header>
                  <h2 className="schedule-title font-[Montserrat] font-bold text-xl text-text-primary mb-2">
                    Sample Schedule
                  </h2>
                  <time className="schedule-time font-[Montserrat] text-text-secondary mb-4">
                    10:00 AM - 11:00 AM
                  </time>
                </header>
                <p className="schedule-description font-[Montserrat] text-text-secondary max-w-full break-words">
                  This is a sample description of the schedule item.
                </p>
              </div>
              <div className="schedule-control flex items-center size-fit rounded-full bg-button-accent p-2 hover:cursor-pointer hover:bg-[#45505A] absolute right-0.5 z-10" onClick={() => setClick(!click)}>
                <img src={click ? LeftArrow : RightArrow} alt="" className="size-5 select-none z-0" />
              </div>
            </article>
          </article>
        </section>
      </main>
    </>
  );
}
