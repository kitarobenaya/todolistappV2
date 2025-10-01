import { useState, useEffect } from "react";

export default function InputForm({showInputForm, setShowForm, stateItems, setCondition}) {
    const [data, setData] = useState({
        uid: crypto.randomUUID(),
        date: "",
        items: []
    });

    function handleSubmit(event) {
    event.preventDefault();

    if (!data.date) {
        setCondition('error');
        return;
    }

    const existingData = JSON.parse(localStorage.getItem("schedules")) || [];

    if(existingData.length === 4) {
        setCondition('max');
        return;
    }

    const newData = [...existingData, data];
    localStorage.setItem("schedules", JSON.stringify(newData));

    setCondition('success');
    setData({date: ""});
    stateItems(prev => [...prev, data]);
    setShowForm(false);
    }

    // Animation for form
    const ANIM_DURATION = 700; // ms
    useEffect(() => {
      let timeoutId;
      if (!showInputForm) {
        timeoutId = setTimeout(() => {
          setShowForm(false);
        }, ANIM_DURATION);
      }
      return () => clearTimeout(timeoutId);
    }, [showInputForm, setShowForm]);
    const formAnimation = showInputForm ? "animate-popOpen" : "animate-popClose";

  return (
    <>
      <div
        className="glassBackground fixed inset-0 flex items-center justify-center bg-[rgba(0, 0, 0, 0.2)] backdrop-blur-lg z-20 overflow-hidden"
        role="dialog"
        aria-labelledby="form-title"
      >
        <form
          className={`input-form w-full h-fit flex flex-col gap-8 bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl sm:w-[450px] md:w-[500px] ${formAnimation}`}
          aria-label="Add new schedule form"
        >
          <header>
            <h2
              id="form-title"
              className="text-2xl font-[Montserrat] font-bold text-text-primary underline underline-offset-8 text-center"
            >
              Add New Schedule
            </h2>
          </header>

          <fieldset className="border-none p-0 m-0">
            <div className="w-full space-y-6">
              <div className="form-group w-full flex flex-col items-center gap-2">
                <label
                  className="text-text-primary font-[Montserrat] font-semibold"
                  htmlFor="date"
                >
                  Date:
                </label>
                <input
                  className="w-[55%] p-2 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-[Montserrat] sm:w-[70%]"
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
    </>
  );
}