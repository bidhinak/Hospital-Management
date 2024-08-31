import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });  
  };

  const handleScrollToMiddle = () => {
    window.scrollTo({
      top: 1200,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        <hr className="border-gray-600 mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="text-2xl font-bold mb-2">HOSPITAL MANAGEMENT</h5>
            <div className="flex gap-4 text-xl">
              <i className="fa-brands fa-facebook cursor-pointer hover:text-blue-500 transition-colors"></i>
              <i className="fa-brands fa-linkedin cursor-pointer hover:text-blue-700 transition-colors"></i>
              <i className="fa-brands fa-instagram cursor-pointer hover:text-pink-500 transition-colors"></i>
              <i className="fa-brands fa-youtube cursor-pointer hover:text-red-500 transition-colors"></i>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl font-serif mb-2">Quick Links</h2>
            <h6 className="cursor-pointer hover:text-blue-400 transition-colors" onClick={handleScrollToTop}>Home</h6>
            <h6 className="cursor-pointer hover:text-blue-400 transition-colors" onClick={() => navigate("/userlogin")}>About Us</h6>
            <h6 className="cursor-pointer hover:text-blue-400 transition-colors" onClick={handleScrollToMiddle}>Emergency</h6>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl font-serif mb-2">Hospital Time</h2>
            <h6>Monday - Friday</h6>
            <h6>Saturday</h6>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl font-serif mb-2">Hours</h2>
            <h6>7am - 11pm</h6>
            <h6>8am - 10pm</h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
