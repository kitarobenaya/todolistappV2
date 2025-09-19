import { useState } from "react";

export default function InputItems({ date, setInputTask, stateItems }) {
  const [dataItems, setDataItems] = useState({
    uid: crypto.randomUUID(),
    title: "",
    time1: "",
    time2: "",
    desc: "",
    checked: false,
    date: date,
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!dataItems.title || !dataItems.date) {
      alert("Please fill in all required fields.");
      return;
    }

    const existingSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const existingItems = existingSchedules.find(sch => sch.date === dataItems.date)?.items || [];
    const updatedItems = [...existingItems, dataItems];
    const updatedSchedules = existingSchedules.map(sch => 
      sch.date === dataItems.date ? { ...sch, items: updatedItems } : sch
    );

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setInputTask(false);
    setDataItems({ title: "", date: "", description: "" });
    stateItems(prev => [...prev, dataItems]);
  }

  return (
    <div
      className="glassBackground fixed inset-0 flex items-center justify-center bg-[rgba(0, 0, 0, 0.2)] backdrop-blur-lg z-20 overflow-hidden"
      role="dialog"
      aria-labelledby="form-title"
    >
      <form
        className="input-form w-[50%] h-fit flex flex-col gap-8 bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
        aria-label="Add new schedule form"
      >
        <header>
          <h2
            id="form-title"
            className="text-3xl font-[Montserrat] font-bold text-text-primary underline underline-offset-8 text-center"
          >
            Add New Task
          </h2>
        </header>

        <fieldset className="border-none p-0 m-0">
          <div className="w-full space-y-5">
            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold text-lg"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="w-[55%] p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat]"
                type="text"
                id="title"
                name="title"
                value={dataItems.title}
                onChange={(e) =>
                  setDataItems({ ...dataItems, title: e.target.value })
                }
                required
                aria-required="true"
              />
            </div>

            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold text-lg"
                htmlFor="time"
              >
                Time
              </label>
              <div className="input-wrapper flex flex-row w-[70%] items-center gap-4">
                <input
                  className="w-[55%] p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat]"
                  type="time"
                  id="time1"
                  name="time1"
                  value={dataItems.time1}
                  onChange={(e) =>
                    setDataItems({ ...dataItems, time1: e.target.value })
                  }
                  required
                  aria-required="true"
                />

                <p className="text-text-primary font-[Montserrat] text-lg">
                  Until
                </p>

                <input
                  className="w-[55%] p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat]"
                  type="time"
                  id="time2"
                  name="time2"
                  value={dataItems.time2}
                  onChange={(e) =>
                    setDataItems({ ...dataItems, time2: e.target.value })
                  }
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold text-lg"
                htmlFor="description"
              >
                Title
              </label>
              <textarea
                className="w-[55%] p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                id="description"
                name="description"
                rows="4"
                placeholder="Enter description..."
                aria-multiline="true"
              ></textarea>
            </div>
          </div>
        </fieldset>

        <footer className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-accent text-text-primary font-[Montserrat] font-bold py-2 px-4 rounded-lg hover:bg-[#6E867B] transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={handleSubmit}
          >
            Add Schedule
          </button>
          <button
            type="button"
            className="bg-red-500 text-white font-[Montserrat] font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={() => setInputTask(false)}
          >
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
}
