export default function Alert({message, type, onClose}) {
    const tailwindHandlerParent = type === "success" ? "success w-[120px] h-[120px] bg-green-600 rounded-full flex items-center justify-center relative" : type === 'error' ? 'error w-[120px] h-[120px] bg-red-600 rounded-full flex items-center justify-center relative' : '';
    const tailwindHandlerLine1 = type === "success" ? "line1 absolute w-[40px] h-[10px] rotate-[45deg] bg-white left-[1.3rem] top-16 rounded-l-full rounded-bl-full rounded-br-full" : "line1 absolute w-[60px] h-[10px] rotate-[45deg] bg-white rounded-full";
    const tailwindHandlerLine2 = type === "success" ? "line2 absolute w-[60px] h-[10px] rotate-[-47deg] bg-white top-14 right-[1.3rem] rounded-bl-full rounded-br-full rounded-r-full" : "line2 absolute w-[60px] h-[10px] rotate-[-45deg] bg-white rounded-full";

  return (
    <div
      className="glassBackground fixed inset-0 flex items-center justify-center bg-[rgba(0, 0, 0, 0.2)] backdrop-blur-lg z-50 overflow-hidden animate-alertPop"
      role="dialog"
      aria-labelledby="alert-title"
    >
      <div className="absolute w-[40%] h-[40%] bg-white flex items-center justify-center flex-col rounded-lg shadow-lg z-60">
        <div className={`${tailwindHandlerParent}`}>
            <div className={`${tailwindHandlerLine1}`}></div>
            <div className={`${tailwindHandlerLine2}`}></div>
        </div>
        <h2 className="text-black text-xl font-bold font-[Montserrat] mt-2">{message}</h2>
            <button className="mt-4 bg-accent text-text-primary px-4 py-2 rounded-lg hover:bg-[#6E867B] transition-colors duration-300 ease-in-out cursor-pointer" onClick={() => onClose('')}>OK</button>
      </div>
    </div>
  );
}
