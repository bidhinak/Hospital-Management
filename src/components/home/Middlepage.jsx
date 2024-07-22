import { useNavigate } from "react-router";

function Middlepage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col gap-20">
        <div className="flex flex-row gap-6 px-20 py-6 mt-16">
          <img
            className="h-fit w-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-863h3Luh2DPdh8lF-1y63TZdh0HsR-IJag&s"
            alt=""
          />
          <span className="flex flex-col gap-2">
            <h5 className="font-sans text-3xl">About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
              impedit officiis nulla aspernatur est! Fugit aliquid pariatur
              vero! Repudiandae.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque nulla, laudantium consequuntur, impedit aut quam
              accusantium amet officia optio veritatis voluptatibus animi
              perspiciatis error iste, accusamus repellendus ab tempore saepe?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non
              deserunt aut pariatur sed debitis esse accusamus! Eius minus
              voluptate ab saepe tempore excepturi, quia fuga blanditiis
              obcaecati, magnam molestiae?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque,
              non, sequi, rerum ut perferendis cumque vitae magni tempora dolor
              enim omnis corrupti fugit nisi? Quasi architecto unde dicta
              laborum in?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non iste
              labore praesentium. Modi repellendus, asperiores mollitia, nisi
              tempora autem eius ex esse molestias minima neque commodi
              praesentium veniam soluta rerum!
            </p>
          </span>
        </div>
        <div className="bg-blue-400  text-center mx-20 p-10 text-white rounded-sm flex flex-col gap-4 ">
          <h1 className="text-4xl">DO YOU NEED EMERGENCY MEDICAL CARE?CALL</h1>
          <h1 className="text-4xl">7845691230/0495 254632</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptates quisquam labore iste nostrum, debitis accusamus dolore
            libero!
          </p>
          <button
            onClick={() => navigate("/userlogin")}
            className="self-center rounded-md bg-black p-3 "
          >
            BOOK APPOINTMENTS
          </button>
        </div>
        <div className="text-center m-14 flex flex-col gap-4">
          <h1 className="font-serif text-4xl">
            We Maintain Cleanliness Rules inside
          </h1>
          <h1 className=" font-serif text-4xl">our Hospital</h1>
          <hr className="self-center border-1.5 gap-4 border-black w-[50%]" />
          <p className="text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            ullam accusamus veniam ratione soluta sequi nihil facilis ipsam
            explicabo, possimus modi voluptatibus repellat molestiae! Assumenda
            quis aperiam officiis dolores quidem. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Repellat architecto dolorum eos
            officiis, beatae quidem adipisci officia ex deleniti fugiat placeat
            delectus repellendus quisquam aliquam laudantium, autem cum, eveniet
            excepturi?
          </p>
          <div className=" grid grid-flow-row sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
            <img
              className="size-96 "
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <img
              src="https://media.gettyimages.com/id/1334802740/video/4k-video-footage-of-a-young-male-doctor-going-through-paperwork-with-a-patient-in-an-office.jpg?s=640x640&k=20&c=Gr31ANzKmuATAifaoG59dextcW77TtYsnALyR2CTs48="
              className="size-96"
              alt=""
            />

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzbrINIJbQUo5CBfOB6buLi97NH4wdBQ5oQ&s"
              className="size-96"
              alt=""
            />
            <img
              className="size-96"
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <img
              className="size-96"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIDlAuTWgChHZFLukBZwdVzuKufXJuK_QihAoFr-lmwPWMFUJr2jdgOTSxUA&s"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Middlepage;
