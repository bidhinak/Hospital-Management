import UHeader from "./UHeader"
import  { useState } from 'react';

function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 3; // Number of slides

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div>
        <UHeader/>
        <div>

  
    <div className="relative">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <img src="https://via.placeholder.com/600x400" alt="Slide 1" className="w-full" />
          <img src="https://via.placeholder.com/600x400" alt="Slide 2" className="w-full" />
          <img src="https://via.placeholder.com/600x400" alt="Slide 3" className="w-full" />
        </div>
      </div>
      <button
        className="absolute left-[50%] bottom-[10%] bg-lime-100 rounded-full px-5 py-4"
        onClick={prevSlide}
      >
        <i className="fa-solid fa-arrow-right "></i>
      </button>
      <button
        className="absolute right-[50%] bottom-[10%] bg-slate-100 rounded-full px-5 py-4"
        onClick={nextSlide}
      >
        <i className="fa-solid fa-arrow-left text-gray-600 "></i>
        </button>
    </div>
  


        </div>
      
    </div>
  )
}

export default About
