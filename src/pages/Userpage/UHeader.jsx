import { useNavigate } from "react-router-dom";
import { initialState, updateUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

function UHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/usersearch?q=${query}`
      );
      console.log(response);

      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [visibleHome, setVisibleHome] = useState(false);
  const showHome = () => setVisibleHome(true);
  const hideHome = () => setVisibleHome(false);
  const [visibleschedule, setvisibleschedule] = useState(false);
  const showschedule = () => setvisibleschedule(true);
  const hideschedule = () => setvisibleschedule(false);
  const [visibleprofile, setvisibleprofile] = useState(false);
  const showprofile = () => setvisibleprofile(true);
  const hideprofile = () => setvisibleprofile(false);
  const [visiblelogout, setvisiblelogout] = useState(false);
  const showlogout = () => setvisiblelogout(true);
  const hidelogoout = () => setvisiblelogout(false);
  const [visiblesearch, setvisiblesearch] = useState(false);
  const showsearch = () => setvisiblesearch(true);
  const hidesearch = () => setvisiblesearch(false);
  return (
    <div>
      <div className=" flex flex-row justify-between p-8 bg-gradient-to-t from-blue-300 bg-blue-700 text-white">
        <h1 className="shadow-md rounded-md p-2">HOSPITAL MANAGEMENT</h1>
        <span className=" relative ">
          {visiblesearch ? (
            <span onMouseLeave={hidesearch}>
              <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="doctors or departments..."
                className=" bg-white text-black rounded-2xl px-3 py-1.5   outline-none"
              />
            </span>
          ) : (
            <span onMouseOver={showsearch}>
              <i className="ml-2 shadow-md border rounded-full p-2 fa-solid fa-magnifying-glass text-xl cursor-pointer"></i>
            </span>
          )}
        </span>

        <button
          className="inline-flex items-center ml-auto md:hidden text-white hover:text-gray-200 focus:outline-none"
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
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8">
            {visibleHome ? (
              <span onMouseLeave={hideHome}>
                <li
                  className="cursor-pointer  "
                  onClick={() => navigate("/udashboard")}
                >
                  HOME
                </li>
              </span>
            ) : (
              <span onMouseOver={showHome}>
                <i className="fa-solid shadow-md fa-house-user text-xl cursor-pointer"></i>
              </span>
            )}
            {/* <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/about")}
            >
              ABOUT US
            </li> */}
            {visibleschedule ? (
              <span onMouseLeave={hideschedule}>
                <li
                  className="cursor-pointer "
                  onClick={() => navigate("/ubookedschedule")}
                >
                  SCHEDULE
                </li>
              </span>
            ) : (
              <span onMouseOver={showschedule}>
                <i className="fa-solid shadow-md fa-calendar-day text-xl cursor-pointer"></i>
              </span>
            )}
            {visibleprofile ? (
              <span onMouseLeave={hideprofile}>
                <li
                  className="cursor-pointer "
                  onClick={() => navigate("/uprofile")}
                >
                  PROFILE
                </li>
              </span>
            ) : (
              <span onMouseOver={showprofile}>
                <i className="fa-solid shadow-md fa-id-card text-xl cursor-pointer"></i>
              </span>
            )}
            {visiblelogout ? (
              <span onMouseLeave={hidelogoout}>
                <li
                  className="cursor-pointer "
                  onClick={() => {
                    dispatch(updateUser(initialState));
                    navigate("/");
                  }}
                >
                  LOGOUT
                </li>
              </span>
            ) : (
              <span onMouseOver={showlogout}>
                <i className="fa-solid shadow-md fa-right-from-bracket text-xl cursor-pointer"></i>
              </span>
            )}
          </ul>
        </nav>
      </div>
      <div>
        <ul className="absolute top-[10%] self-center left-[25%] w-[40%] z-10">
          <li>
            {results.map((res) => (
              <div
                key={res.id}
                className="outline-none bg-blue-300 border-gray-400 shadow-xl rounded-lg text-balance  border p-3"
              >
                <h1>{res.name}</h1>
                <h2>{res.department}</h2>
                <p
                  className="cursor-pointer hover:underline font-medium text-xl text-red-500 "
                  onClick={() => navigate(`/udocprofile/${res.id}`)}
                >
                  schedule view
                </p>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UHeader;
