export default function DecisionAlert({message, setDecisionConditionAlert, uid, handleDeleteList, setConditionAlert}) {

  return (
    <div
      className="glassBackground fixed inset-0 flex items-center justify-center bg-[rgba(0, 0, 0, 0.2)] backdrop-blur-lg z-50 overflow-hidden animate-alertPop"
      role="dialog"
    >
      <div className="absolute w-full h-[40%] bg-white flex items-center justify-center flex-col rounded-lg shadow-lg z-60 sm:w-[60%] sm:h-[30%] lg:w-[40%] lg:h-[40%]">
        <div className="error w-[120px] h-[120px] bg-orange-300 rounded-full flex items-center justify-center flex-col relative">
            <div className="line1 absolute w-[50px] h-[15px] rotate-[90deg] top-10 bg-white rounded-full"></div>
            <div className="line2 absolute w-[15px] h-[15px] top-20 bg-white rounded-full"></div>
        </div>
        <h2 className="text-black text-xl font-bold font-[Montserrat] mt-2">{message}</h2>
            <div className="button-wrapper flex flex-row gap-4">
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-[#6E867B] transition-colors duration-300 ease-in-out cursor-pointer" onClick={() => {
                    handleDeleteList(uid);
                    setDecisionConditionAlert('');
                    setConditionAlert('success');
                }}>Yes</button>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-[#6E867B] transition-colors duration-300 ease-in-out cursor-pointer" onClick={() => setDecisionConditionAlert('')}>Cancel</button>
            </div>
      </div>
    </div>
  );
}
