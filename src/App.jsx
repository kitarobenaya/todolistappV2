import { useState, useEffect } from "react";
import Header from "./assets/component/Header.jsx";
import Schedule from "./assets/component/Schedule.jsx";
import Footer from "./assets/component/Footer.jsx";
import InputSchedule from "./assets/component/InputForm/InputSchedule.jsx";
import InputTask from "./assets/component/InputForm/InputTask.jsx";
import Alert from "./assets/component/PopUpAlert/Alert.jsx";
import DecisionAlert from "./assets/component/PopUpAlert/DecisionAlert.jsx";
import "./App.css";

export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  const [schedules, setSchedules] = useState([]);
  // mengambil data dari localStorage
  useEffect(() => {
    setSchedules(JSON.parse(localStorage.getItem("schedules")) || []);
    setIsMounted(true);
  }, []);

  const [items, setItems] = useState([]);
  // mengambil data dari localStorage
  useEffect(() => {
    const existingItems = schedules.flatMap((schedule) => schedule.items) || [];
    setItems(existingItems);
    setIsMounted(true);
  }, [schedules]);

  // menyimpan data ke localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("schedules", JSON.stringify(schedules));
    }
  }, [schedules, isMounted]);

  // untuk alert
  const [conditionAlert, setConditionAlert] = useState("");
  // untuk yes / no alert
  const [decisionConditionAlert, setDecisionConditionAlert] = useState("");

  const [uid, setUid] = useState("");
  const [showInputForm, setShowInputForm] = useState(false);
  const [showInputTask, setInputTask] = useState(false);
  const [date, setDate] = useState("");
  const isScheduleEmpty = schedules.length === 0;
  const ScheduleEmptySty = isScheduleEmpty
    ? " flex flex-col items-center justify-center grow pb-20"
    : "grow";

  const handleContOpen = (id) =>
    setSchedules(
      schedules.map((schedule) => ({
        ...schedule,
        items: schedule.items.map((item) =>
          item.uid === id ? { ...item, isContOpen: !item.isContOpen } : item
        ),
      }))
    );

  const handleDeleteList = (uid) => {
    const updatedSchedules = schedules.filter(
      (schedule) => schedule.uid !== uid
    );
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  function handleDeleteTask(uid) {
    const existingSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const updatedSchedules = existingSchedules.map((sch) => ({
      ...sch,
      items: sch.items.filter((it) => it.uid !== uid) || [],
    }));
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setSchedules(updatedSchedules);
  }

  return (
    <>
      {showInputForm && (
        <InputSchedule
          showInputForm={showInputForm}
          setShowForm={setShowInputForm}
          schedules={schedules}
          setSchedules={setSchedules}
          setConditionAlert={setConditionAlert}
        />
      )}

      {showInputTask && (
        <InputTask
          date={date}
          showInputTask={showInputTask}
          setInputTask={setInputTask}
          setSchedules={setSchedules}
          setConditionAlert={setConditionAlert}
        />
      )}

      {decisionConditionAlert == "task" && (
        <DecisionAlert
          message={"Are you sure?"}
          type={"task"}
          setDecisionConditionAlert={setDecisionConditionAlert}
          uid={uid}
          handleDeleteList={handleDeleteTask}
          setConditionAlert={setConditionAlert}
        />
      )}

      {decisionConditionAlert == "schedule" && (
        <DecisionAlert
          message={"Are you sure?"}
          type={"schedule"}
          setDecisionConditionAlert={setDecisionConditionAlert}
          uid={uid}
          handleDeleteList={handleDeleteList}
          setConditionAlert={setConditionAlert}
        />
      )}

      {conditionAlert == "success" && (
        <Alert
          message={"Success!"}
          type={"success"}
          onClose={setConditionAlert}
        />
      )}

      {conditionAlert == "error" && (
        <Alert
          message={"Please fill in all required fields."}
          type={"error"}
          onClose={setConditionAlert}
        />
      )}

      {conditionAlert == "max" && (
        <Alert
          message={"Maximum schedule is 4."}
          type={"error"}
          onClose={setConditionAlert}
        />
      )}

      {conditionAlert == "exist" && (
        <Alert
          message={"Schedule already exists."}
          type={"error"}
          onClose={setConditionAlert}
        />
      )}

      <Header />

      <div className="controls size-full flex justify-end mb-8 pt-4 pr-3">
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

      <main
        className={`schedule-manager size-full mt-8 ${ScheduleEmptySty}`}
        role="main"
      >
        {isScheduleEmpty ? (
          <div className="size-fit flex justify-center items-center">
            <p className="text-center text-text-secondary font-[Montserrat] italic text-[1rem]">
              No schedules available. Please add a schedule.
            </p>
          </div>
        ) : (
          <Schedule
            schedules={schedules}
            items={items}
            handleContOpen={handleContOpen}
            setInputTask={setInputTask}
            setDate={setDate}
            setSchedules={setSchedules}
            setConditionAlert={setConditionAlert}
            setDecisionConditionAlert={setDecisionConditionAlert}
            setUid={setUid}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
