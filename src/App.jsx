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
            <article className="schedule-card bg-white w-[96%] h-fit p-1 rounded-2xl shadow-xl flex justify-center items-center relative">

                {click && (
                  <aside className="schedule-actions flex justify-center items-center flex-col gap-2 bg-text-primary p-2 rounded-br-xl rounded-tr-xl absolute right-[-3rem] z-20 shadow-2xl">
                    <div class="inline-flex items-center">
                      <label class="flex items-center cursor-pointer relative">
                        <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-500 checked:border-green-500" id="check" />
                        <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                          </svg>
                        </span>
                      </label>
                    </div> 
                    <button type="button" className="delete-button size-[24px] p-2 rounded-full bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out relative flex justify-center items-center hover:cursor-pointer">
                      <div className="line1 w-3 h-[4px] bg-white rotate-45 absolute "></div>
                      <div className="line1 w-3 h-[4px] bg-white rotate-[-45deg] absolute"></div>
                    </button>
                    <button className="edit-button font-[Montserrat] text-white hover:underline hover:cursor-pointer">
                      Edit
                    </button>
                  </aside>
                )}

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

              <div className="schedule-control flex items-center size-fit rounded-full bg-button-accent p-2 hover:cursor-pointer hover:bg-[#F4E2BB] transition-colors duration-500 ease-in-out absolute right-0.5 z-10" onClick={() => setClick(!click)}>
                <img src={click ? LeftArrow : RightArrow} alt="" className="size-5 select-none z-0" />
              </div>

            </article>
          </article>
        </section>
      </main>

    </>
  );
}
