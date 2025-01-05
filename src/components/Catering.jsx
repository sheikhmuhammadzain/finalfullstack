import React from 'react';
import { Users, Utensils, Gift, Calendar } from 'lucide-react';

const CateringCard = ({ title, description, icon: Icon }) => (
  <div className="group">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-neutral-600 group-hover:text-neutral-800 transition-colors" />
      <h3 className="font-light text-xl text-neutral-800">{title}</h3>
    </div>
    <p className="text-neutral-600 leading-relaxed font-light pl-8">
      {description}
    </p>
  </div>
);

const ServiceItem = ({ text }) => (
  <div className="flex items-center gap-2">
    <div className="w-1 h-1 bg-neutral-400 rounded-full" />
    <span className="text-neutral-600 font-light">{text}</span>
  </div>
);

const Catering = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-extralight text-4xl text-neutral-800 mb-4">Catering Services</h1>
        <p className="text-neutral-500 font-light max-w-xl mx-auto">
          Elevate your events with our bespoke catering solutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <CateringCard
          icon={Users}
          title="Corporate Events"
          description="From intimate board meetings to large-scale conferences, we provide professional catering services tailored to your business needs. Our corporate menus are designed for both elegance and efficiency."
        />
        <CateringCard
          icon={Gift}
          title="Private Celebrations"
          description="Whether it's a wedding, birthday, or family reunion, we create memorable dining experiences for your special occasions. Each menu is customized to reflect your personal style and preferences."
        />
        <CateringCard
          icon={Utensils}
          title="Full-Service Catering"
          description="Our team handles everything from setup to service to cleanup. We provide professional staff, equipment, and all the necessities for a seamless event."
        />
        <CateringCard
          icon={Calendar}
          title="Event Planning"
          description="Let us help you plan the perfect event. Our experienced team can assist with menu planning, dietary accommodations, and timing coordination."
        />
      </div>

      <div className="bg-neutral-50 p-8 md:p-12">
        <h2 className="font-light text-2xl text-neutral-800 mb-6 text-center">Our Services Include</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 max-w-2xl mx-auto">
          <ServiceItem text="Menu customization" />
          <ServiceItem text="Professional staff" />
          <ServiceItem text="Equipment rental" />
          <ServiceItem text="Setup and cleanup" />
          <ServiceItem text="Bar service" />
          <ServiceItem text="Dietary accommodations" />
          <ServiceItem text="Event coordination" />
          <ServiceItem text="Delivery service" />
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-neutral-500 font-light mb-6">
          Ready to plan your event? Contact us for a personalized quote.
        </p>
        <a
          href="/contact"
          className="inline-block bg-neutral-900 text-white py-3 px-8 hover:bg-neutral-800 transition-colors font-light"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default Catering;
