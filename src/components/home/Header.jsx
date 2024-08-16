import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { page: "FACILITIES", link: "/facilities" },
  { page: "OFFICIAL LOGIN", link: "/officiallogin" },
];

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="flex flex-row justify-between p-8">
        <h1>HOSPITAL</h1>
        <button
          className="inline-flex items-center ml-auto md:hidden text-black hover:text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:flex-row md:ml-auto w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <li
              onClick={() => navigate("/home")}
              className="relative group cursor-pointer"
            >
              HOME
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </li>

            <div className="relative group">
              <li className="cursor-pointer">
                DEPARTMENTS
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </li>
              <div className="absolute hidden z-10 group-hover:block bg-white shadow-lg rounded-lg mt-2 w-48">
                <a
                  href="#section1"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Cardiology
                </a>
                <a
                  href="#section2"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  General Surgery
                </a>
                <a
                  href="#section3"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dental
                </a>
                <a
                  href="#section4"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Anesthesia
                </a>
                <a
                  href="#section5"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Orthopedics
                </a>
                <a
                  href="#section6"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Urology
                </a>
              </div>
            </div>

            {navItems.map((ele) => (
              <li key={ele.link} className="relative group">
                <NavLink to={ele.link} className="cursor-pointer">
                  {ele.page}
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
