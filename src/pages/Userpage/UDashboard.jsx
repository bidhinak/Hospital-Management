
import { useCallback, useEffect, useRef, useState } from "react";
import UHeader from "./UHeader"
import Ulistview from "./Ulistview"
import { useSelector } from "react-redux";
const slides = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLKdJ-kluAFtfyG-s8IcKOqH71TsF6HDDJlTww2lbtLXsqwDWVPc7kiH_OUfP26n8S85I&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJlHUNQZu5BJzwq2KvdJ4pMqbD6n9Dn_wAOiiU_lvxlKacyrpjBjWeSdA9Y82VGF6Zmxs&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPJHzM-k8NAIomO0msO0Tm_q3f2te0wEwoMCjKblu1fjzdX2egS9W9V2x_TJ4ZLVI9IU&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBd4tgsdI374HQ-qCiLALxnnm0aNS4YQ7Eb4VDEmdv_psHYnSPKzWWA4OEVWWoCVugAhY&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaSZt28gCvqDOG0R19t2msfb5bxeWQwHjGi7vAIeJRsWfafV-kEGkN9CQzGvGI8tZwM4&usqp=CAU",
];

function UDashboard() {
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
    <>
     <UHeader/>
     <div className="w-full overflow-hidden relative">
        <div
          className="w-full flex duration-1000  "
          style={{ marginLeft: `-${marginLeft}%` }}
        >
          {slides.map((slide) => (
            <img className="min-w-full  h-96 object-fill" key={slide.id} src={slide} />
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
      <h1>Hi {username} ,Welcome to This Hospital</h1> 
     <Ulistview/>
    </>
  )
}

export default UDashboard
