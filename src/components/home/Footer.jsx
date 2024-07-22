function Footer() {
  return (
    <div>
      <hr className=" border-1  border-black w-[100%]" />
      <div className="flex flex-row justify-evenly gap-4 p-10 text-center bg-gray-600 text-white">
        <div className="flex flex-col gap-3"> 
          <h5>HOSPITAL MANAGEMENT</h5>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-youtube"></i>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-serif">Quick Link</h2>
          <h6>Home</h6>
          <h6>About us</h6>
          <h6>Services</h6>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-serif">Hospital Time</h2>
          <h6>Monday-Friday</h6>
          <h6>Saturday</h6>
        </div>
        <div className="flex flex-col pt-6 gap-3">
          <h5></h5>
          <h6>7am-11pm</h6>
          <h6>8am-10pm</h6>
        </div>
      </div>
    </div>
  );
}

export default Footer;
