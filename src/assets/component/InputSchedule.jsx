import { useState } from "react";

export default function InputForm({setShowForm, stateItems}) {
    const [data, setData] = useState({
        uid: crypto.randomUUID(),
        date: "",
    });

    function handleSubmit(event) {
    event.preventDefault();

    if (!data.date) {
        alert("Please fill in all required fields.");
        return;
    }

    const existingData = JSON.parse(localStorage.getItem("schedules")) || [];
    const newData = [...existingData, data];
    localStorage.setItem("schedules", JSON.stringify(newData));

    setShowForm(false);
    setData({date: ""});
    stateItems(prev => [...prev, data]);
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
            Add New Schedule
          </h2>
        </header>

        <fieldset className="border-none p-0 m-0">
          <div className="w-full space-y-6">
            <div className="form-group w-full flex flex-col items-center gap-2">
              <label
                className="text-text-primary font-[Montserrat] font-semibold text-lg"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="w-[55%] p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat]"
                type="date"
                id="date"
                name="date"
                value={data.date}
                onChange={(e) => setData({...data, date: e.target.value})}
                required
                aria-required="true"
              />
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
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
}