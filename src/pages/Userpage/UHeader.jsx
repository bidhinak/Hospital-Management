/* eslint-disable no-empty */
import { useNavigate } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function UHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverState, setHoverState] = useState({
    home: false,
    schedule: false,
    profile: false,
    logout: false,
    search: false,
  });

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/usersearch?q=${query}`
      );
      setResults(response.data);
    } catch (error) {}
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMouseEnter = (key) => {
    setHoverState((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key) => {
    setHoverState((prevState) => ({ ...prevState, [key]: false }));
  };

  return (
    <header>
      <div className="flex flex-row justify-between items-center p-6 bg-gradient-to-r from-blue-700 to-purple-500 text-white shadow-lg">
        <h1 className="tracking-wider">HOSPITAL MANAGEMENT</h1>

        <div className="relative flex-1 mx-4" ref={searchContainerRef}>
          {hoverState.search ? (
            <div onMouseLeave={() => handleMouseLeave("search")}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search doctors or departments..."
                className="w-full sm:w-3 md:w-1/2 bg-white text-black rounded-full px-4 py-2 outline-none transition-all duration-300 shadow-sm"
              />
            </div>
          ) : (
            <div onMouseEnter={() => handleMouseEnter("search")}>
              <i className="ml-2 shadow-md border rounded-full p-2 fa-solid fa-magnifying-glass text-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"></i>
            </div>
          )}
        </div>

        <button
          className="inline-flex items-center ml-auto md:hidden text-white hover:text-gray-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
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
          } md:flex md:items-center md:static absolute left-0 top-20 w-full md:w-auto bg-blue-400 md:bg-transparent p-4 md:p-0 z-20`}
        >
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8">
            {hoverState.home ? (
              <li
                className="cursor-pointer"
                onClick={() => navigate("/udashboard")}
                onMouseLeave={() => handleMouseLeave("home")}
              >
                HOME
              </li>
            ) : (
              <i
                className="fa-solid fa-house-user text-2xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
                onMouseEnter={() => handleMouseEnter("home")}
                onClick={() => navigate("/udashboard")}
              ></i>
            )}
            {hoverState.schedule ? (
              <li
                className="cursor-pointer"
                onClick={() => navigate("/ubookedschedule")}
                onMouseLeave={() => handleMouseLeave("schedule")}
              >
                SCHEDULE
              </li>
            ) : (
              <i
                className="fa-solid fa-calendar-day text-2xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
                onMouseEnter={() => handleMouseEnter("schedule")}
                onClick={() => navigate("/ubookedschedule")}
              ></i>
            )}
            {hoverState.profile ? (
              <li
                className="cursor-pointer"
                onClick={() => navigate("/uprofile")}
                onMouseLeave={() => handleMouseLeave("profile")}
              >
                PROFILE
              </li>
            ) : (
              <i
                className="fa-solid fa-id-card text-2xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
                onMouseEnter={() => handleMouseEnter("profile")}
                onClick={() => navigate("/uprofile")}
              ></i>
            )}
            {hoverState.logout ? (
              <li
                className="cursor-pointer"
                onClick={() => {
                  dispatch(updateUser(initialState));
                  navigate("/");
                }}
                onMouseLeave={() => handleMouseLeave("logout")}
              >
                LOGOUT
              </li>
            ) : (
              <i
                className="fa-solid fa-right-from-bracket text-2xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
                onMouseEnter={() => handleMouseEnter("logout")}
                onClick={() => {
                  dispatch(updateUser(initialState));
                  navigate("/");
                }}
              ></i>
            )}
          </ul>
        </nav>
      </div>

      {results.length > 0 && (
        <ul className="absolute left-[20%] right-[40%] mx-auto mt-2 bg-white text-black rounded-lg shadow-lg z-10">
          {results.map((res) => (
            <li
              key={res.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/udocprofile/${res.id}`)}
            >
              <h3 className="font-semibold">{res.name}</h3>
              <p className="text-sm">{res.department}</p>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default UHeader;
