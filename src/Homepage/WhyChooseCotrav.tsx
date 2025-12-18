import React from "react";
import experienceImg from "../assets/images/Experience.png";
import solutionImg from "../assets/images/Solution.png";
import panImg from "../assets/images/PAN.png";
import teamImg from "../assets/images/Team.png";

const features = [
  {
    title: "Experience",
    desc: "With 10 years of team experience, we have built and upgraded a reliable technology.",
    image: experienceImg,
  },
  {
    title: "Solution Provider",
    desc: "With our problem-solving approach, we provide support to you at every step.",
    image: solutionImg,
  },
  {
    title: "PAN India tie-ups",
    desc: "Providing services to corporates all over India, with partnerships and tie-ups with many stakeholders.",
    image: panImg,
  },
  {
    title: "Team Work & Flexibility",
    desc: "With 10 years of team experience, we have built and upgraded a reliable technology.",
    image: teamImg,
  },
];
const services = [
  "TICKETING",
  "HOTEL BOOKINGS",
  "CABS",
  "LOGISTICS",
  "FRRO & VISA CONSULTANCY",
];

const WhyChoose = () => {
  return (
    <section className="bg-white py-20">
      {/* HEADING */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold">
          Why choose <span className="main_text_color">CoTrav?</span>
        </h2>
        <p className="mt-4 text-lg font-medium">
          Everything You Need, All in One Place.
        </p>
        <p className="mt-2 text-gray-600">
          Manage every step of your business travel with a single, seamless
          platform.
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition"
          >
            {/* ICON */}
            <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-full ">
              <img
                src={item.image}
                alt={item.title}
                className="w-8 h-8 object-contain"
              />
            </div>

            <h3 className="main_text_color font-semibold mb-4">{item.title}</h3>

            <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div className="text-center mt-24">
        <h2 className="text-3xl font-bold">
          Services <span className="main_text_color">We Offer</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We makes corporate travel easy with one powerful platform.
          <br />
          Powerful Platform.
        </p>
      </div>
      <section className="w-full bg-[#6C5CE7] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 text-center text-white">
            {services.map((item, index) => (
              <div key={index}>
                <p className="font-semibold tracking-wide">{item}</p>
                <div className="flex justify-center mt-2 text-yellow-400">
                  ★★★★★
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default WhyChoose;
