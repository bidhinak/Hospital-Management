import { useNavigate } from "react-router";

function Frontpage() {
  const navigate=useNavigate();
  return (
    <div>
      <div className="px-20 py-6 flex flex-col gap-6">
        <h1 className="font-bold text-5xl">MAKE YOUR DAY BETTER</h1>
        <p className="font-light text-lg">
          Schedule your appointments for a doctor without delay.
        </p>
        <div className="relative">
          <img
            className="w-full h-60 md:h-80 lg:h-96  rounded-lg shadow-lg"
            src="https://w0.peakpx.com/wallpaper/315/432/HD-wallpaper-medical-hospital.jpg"
            alt="Medical Hospital"
          />
          <button
            onClick={() => navigate("/userlogin")}
            className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-black text-white rounded-lg p-3 px-6 text-sm md:text-base lg:text-lg shadow-md transition-transform hover:bg-emerald-600 hover:scale-105"
          >
            BOOK APPOINTMENTS
          </button>
        </div>
        <div className="text-center m-14 flex flex-col gap-4">
          <h1 className="font-serif text-4xl">
            We Offer Different Services To
          </h1>
          <h1 className=" font-serif text-4xl">Improve Your Health</h1>
          <hr className="self-center border-1.5 gap-4 border-black w-[50%]" />
        </div>
      </div>
    </div>
  );
}

export default Frontpage;
