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
            className="h-96 w-full"
            src="https://w0.peakpx.com/wallpaper/315/432/HD-wallpaper-medical-hospital.jpg"
            alt=""
          />
          <button onClick={()=>navigate("/userlogin")} className="absolute hover:bg-emerald-50 hover:text-emerald-700  bottom-8 left-8 bg-black text-white rounded-md p-3 ">
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
