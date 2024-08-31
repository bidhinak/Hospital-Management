import Footer from "../Footer";
import Header from "../Header";

function Facilities() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 md:p-8 lg:p-12">
        <h1 className="text-4xl lg:text-5xl text-gray-800 font-bold mb-4 lg:mb-6">
          Our Facilities
        </h1>
        <p className="font-semibold text-lg text-gray-600 mb-6">
          Provides services for minor surgical procedures like dressing of
          lacerated wounds, suturing of minor lacerations & re-suturing.
        </p>

        <div className="grid gap-6 md:gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src="https://rajendrahospital.org/img/408936.jpg"
              alt="Medical Lab"
            />
            <h2 className="text-2xl text-gray-700 font-bold mt-4">
              Well Equipped Computerized Medical Lab
            </h2>
            <p className="text-lg font-normal text-gray-600 mt-2">
              OUR IN-HOUSE LABORATORY FACILITIES
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              expedita eaque quo modi reprehenderit, iusto itaque laudantium in
              pariatur dolorum natus beatae asperiores tempora illum quaerat
              facilis accusantium, earum non.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src="https://rajendrahospital.org/img/408935.jpg"
              alt="Digital X-Ray"
            />
            <h2 className="text-2xl text-gray-700 font-bold mt-4">
              Digital X-Ray
            </h2>
            <p className="text-lg font-normal text-gray-600 mt-2">
              Digital X-rays Vs. Traditional X-rays
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium et amet sapiente eos, delectus esse, molestiae dolores
              mollitia hic labore adipisci assumenda quae rerum ullam, fuga
              alias. Ullam, ut dignissimos.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src="https://rajendrahospital.org/img/crm.jpg"
              alt="C-Arm"
            />
            <h2 className="text-2xl text-gray-700 font-bold mt-4">C-Arm</h2>
            <p className="text-lg font-normal text-gray-600 mt-2">
              C-Arm X-Ray Machines: All You Need to Know
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              fugiat incidunt commodi ratione sapiente cumque perferendis?
              Quaerat at explicabo eius sit voluptates dolorum qui nemo quos
              facere quia, debitis reprehenderit?
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src="https://rajendrahospital.org/img/4089310.jpg"
              alt="Ultra Sound Scan"
            />
            <h2 className="text-2xl text-gray-700 font-bold mt-4">Ultra Sound Scan</h2>
            <p className="text-lg font-normal text-gray-600 mt-2">
            Diagnostic technique
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              qui. Nisi aliquid ratione et pariatur optio perspiciatis veniam
              vel distinctio cum doloremque? Ratione soluta ipsam placeat
              dignissimos totam impedit vel?
            </p>
            <p className="text-md text-gray-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              fugiat incidunt commodi ratione sapiente cumque perferendis?
              Quaerat at explicabo eius sit voluptates dolorum qui nemo quos
              facere quia, debitis reprehenderit?
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Facilities;
