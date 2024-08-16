import Header from "../Header";

function Facilities() {
  return (
    <div>
      <Header />
      <h1 className="text-5xl text-gray-700 font-bold pl-6 ">
        Our Facilities Are
      </h1>
      <p className="font-semibold text-lg pl-8">
        Provides services for minor surgical procedure like dressing of
        lacerated wound, suturing of minor lacerations & resuturing.
      </p>

      <div className=" flex flex-col gap-2  pl-10 pr-10 p-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 place-items-center   text-balance text-center ">
          <img
            className="w-[80%] object-contain rounded-sm"
            src="https://rajendrahospital.org/img/408936.jpg"
            alt=""
          />
          <span>
            <h1 className="text-2xl text-gray-600 font-bold">
              Well Equipped Computerized Medical Lab
            </h1>
            <p className="text-lg font-normal ">
              OUR IN-HOUSE LABORATORY FACILITIES
            </p>

            <p className="text-md text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              expedita eaque quo modi reprehenderit, iusto itaque laudantium in
              pariatur dolorum natus beatae asperiores tempora illum quaerat
              facilis accusantium, earum non.
            </p>
          </span>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 place-items-center text-balance  text-center">
          <span>
            <h1 className="text-2xl text-gray-600 font-bold">Digital X Ray</h1>
            <p className="text-lg font-normal">
              Digital X-rays Vs. Traditional X-rays
            </p>
            <p className="text-md text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium et amet sapiente eos, delectus esse, molestiae dolores
              mollitia hic labore adipisci assumenda quae rerum ullam, fuga
              alias. Ullam, ut dignissimos.
            </p>
          </span>
          <img
            className="w-[80%] object-contain rounded-sm"
            src="https://rajendrahospital.org/img/408935.jpg"
            alt=""
          />
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 place-items-center text-balance text-center">
          <img
            className="w-[80%] object-contain rounded-sm"
            src="https://rajendrahospital.org/img/crm.jpg"
            alt=""
          />
          <span>
            <h1 className="text-2xl text-gray-600 font-bold">C-Arm </h1>
            <p className="text-lg font-normal ">
              C-Arm X-Ray Machines: All You Needed to Know
            </p>
            <p className="text-md text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              fugiat incidunt commodi ratione sapiente cumque perferendis?
              Quaerat at explicabo eius sit voluptates dolorum qui nemo quos
              facere quia, debitis reprehenderit?
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Facilities;
