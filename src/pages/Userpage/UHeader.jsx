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

  return (
    <div>
      <div className=" flex flex-row justify-between p-8 bg-gradient-to-t from-blue-300 bg-blue-700 text-white">
        <h1>HOSPITAL MANAGEMENT</h1>
        <span className=" relative ">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="search doctors or departments..."
            className=" bg-white text-black rounded-3xl px-3 py-1.5   outline-none"
          />
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
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/udashboard")}
            >
              HOME
            </li>
            {/* <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/about")}
            >
              ABOUT US
            </li> */}
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/ubookedschedule")}
            >
              SCHEDULE
            </li>
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/uprofile")}
            >
              PROFILE
            </li>
            <li
              className="cursor-pointer hover:text-gray-200"
              onClick={() => {
                dispatch(updateUser(initialState));
                navigate("/");
              }}
            >
              LOGOUT
            </li>
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
                  className="cursor-pointer font-medium text-xl text-red-500 "
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
