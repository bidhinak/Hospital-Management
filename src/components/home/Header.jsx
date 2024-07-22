import { NavLink } from "react-router-dom";

const navItems = [
  { page: "HOME", link: "/home" },
  { page: "FACILITIES", link: "/facilities" },
  { page: "DEPARTMENTS", link: "/departments" },
  { page: "OFFICIAL LOGIN", link: "/officiallogin" },
];
function Header() {
  return (
    <div>
      <div className=" flex flex-row justify-between  p-8">
      <h1>HOSPITAL</h1>
        <ul className="flex flex-row gap-5">
       
          {navItems.map((ele) => (
            <NavLink to={ele.link} key={ele.link}>
              <li>{ele.page}</li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
