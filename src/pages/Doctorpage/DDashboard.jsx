import { useSelector } from "react-redux";
import DHeader from "./DHeader";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
const slides = [
  "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=600",
];

function DDashboard() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);

  const [marginLeft, setMarginLeft] = useState(0);
  const timeRef = useRef(null);
  const goToNext = useCallback(() => {
    marginLeft >= (slides.length - 1) * 100
      ? setMarginLeft(0)
      : setMarginLeft(marginLeft + 100);
  }, [marginLeft]);
  const goToPrev = () => {
    marginLeft <= 0
      ? setMarginLeft((slides.length - 1) * 100)
      : setMarginLeft(marginLeft - 100);
  };
  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(timeRef.current);
  }, [goToNext]);
  return (
    <div>
      <DHeader />
      <div className="w-full overflow-hidden relative">
        <div
          className="w-full flex duration-1000  "
          style={{ marginLeft: `-${marginLeft}%` }}
        >
          {slides.map((slide) => (
            <img
              className="min-w-full  h-96 object-fill"
              key={slide.id}
              src={slide}
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600 bg-white py-6 px-3 rounded-sm"
          onClick={goToPrev}
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-600 bg-white py-6 px-3 rounded-sm"
          onClick={goToNext}
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <h1 className="text-3xl font-serif p-3 ">Hi {username}</h1>
      <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-[60%]  gap-4 p-3  mx-auto  ">
        <div
          className="flex flex-row gap-3 cursor-pointer hover:bg-green-400  justify-evenly text-center text-2xl rounded-md bg-green-600 p-4"
          onClick={() => navigate("/dscheduleadd")}
        >
          <span className="flex flex-col gap-2">
            <h1 className="text-2xl text-white ">SCHEDULE</h1>
            <p className="font-serif">Create</p>
          </span>
          <i className="fa-regular fa-calendar-plus text-white self-center"></i>
        </div>
        <div
          className="flex flex-row gap-3  hover:bg-blue-300 cursor-pointer justify-evenly text-center text-2xl rounded-md bg-blue-600 p-4"
          onClick={() => navigate("/dscheduleview")}
        >
          <span className="flex flex-col gap-2">
            <h1 className="text-2xl text-white ">SCHEDULE</h1>
            <p className="font-serif">View</p>
          </span>
          <i className="fa-solid fa-calendar-days text-white self-center "></i>
        </div>
      </div>
    </div>
  );
}

export default DDashboard;
