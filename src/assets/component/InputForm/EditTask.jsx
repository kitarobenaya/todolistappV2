import { useState } from "react";

export default function EditTask({showEditForm, uid, title, time1, time2, desc, checked, date, stateItems, setEditForm, setCondition }) {
  const [newdataItems, setNewDataItems] = useState({
    uid: uid,
    title: title,
    time1: time1,
    time2: time2,
    desc: desc,
    checked: checked,
    date: date,
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!newdataItems.title || !newdataItems.date || !newdataItems.time1 || !newdataItems.time2) {
      setCondition('error');
      return;
    }

    const existingSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const updatedSchedules = existingSchedules.map(sch => ({
      ...sch,
        items: sch.items.map(it =>
            it.uid === newdataItems.uid ? newdataItems : it
        )
    }));
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setEditForm(false);
    stateItems(prev => 
      prev.map(it => 
        it.uid === newdataItems.uid ? newdataItems : it
      )
    );
    setCondition('success');
  }

  const formAnimation = showEditForm ? "animate-popOpen" : "animate-popClose";

  return (
    <div
      className="glassBackground fixed inset-0 flex items-center justify-center bg-[rgba(0, 0, 0, 0.2)] backdrop-blur-lg z-20 overflow-hidden"
      role="dialog"
      aria-labelledby="form-title"
    >
      <form
        className={`input-form w-full h-fit flex flex-col gap-8 bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl sm:w-[450px] md:w-[500px] animate-popOpen ${formAnimation}`}
        aria-label="Add new schedule form"
      >
        <header>
          <h2
            id="form-title"
            className="text-2xl font-[Montserrat] font-bold text-text-primary underline underline-offset-8 text-center"
          >
            Edit Task
          </h2>
        </header>

        <fieldset className="border-none p-0 m-0">
          <div className="w-full space-y-5">
            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold "
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="w-[80%] p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat] sm:w-full"
                type="text"
                id="title"
                name="title"
                value={newdataItems.title}
                onChange={(e) =>
                  setNewDataItems({ ...newdataItems, title: e.target.value })
                }
                required
                aria-required="true"
              />
            </div>

            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold "
                htmlFor="time"
              >
                Time
              </label>
              <div className="input-wrapper flex flex-row w-full items-center gap-4">
                <input
                  className="w-[55%] p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat]"
                  type="time"
                  id="time1"
                  name="time1"
                  value={newdataItems.time1}
                  onChange={(e) =>
                    setNewDataItems({ ...newdataItems, time1: e.target.value })
                  }
                  required
                  aria-required="true"
                />

                <p className="text-text-primary font-[Montserrat] ">
                  Until
                </p>

                <input
                  className="w-[55%] p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat]"
                  type="time"
                  id="time2"
                  name="time2"
                  value={newdataItems.time2}
                  onChange={(e) =>
                    setNewDataItems({ ...newdataItems, time2: e.target.value })
                  }
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-[80%] p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat] sm:w-full"
                id="description"
                name="description"
                rows="4"
                value={newdataItems.desc}
                onChange={(e) =>
                  setNewDataItems({ ...newdataItems, desc: e.target.value })
                }
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
            Update Schedule
          </button>
          <button
            type="button"
            className="bg-red-500 text-white font-[Montserrat] font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={() => setEditForm(false)}
          >
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
}
