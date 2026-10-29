import React from 'react';
import { Leaf, Heart, Users } from 'lucide-react';

const AboutSection = ({ title, content, icon: Icon }) => (
  <div className="mb-16 group">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-neutral-600 group-hover:text-neutral-800 transition-colors" />
      <h2 className="font-light text-2xl text-neutral-800">{title}</h2>
    </div>
    <p className="text-neutral-600 leading-relaxed font-light">{content}</p>
  </div>
);

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-extralight text-4xl text-neutral-800 mb-4">Our Story</h1>
        <p className="text-neutral-500 font-light max-w-xl mx-auto">
          A journey of flavors, crafted with care and served with passion
        </p>
      </div>

      <div className="space-y-12">
        <AboutSection
          title="Our Philosophy"
          icon={Leaf}
          content="We believe in the power of simple, thoughtfully prepared food. Our kitchen celebrates seasonal ingredients, sourced from local farmers and producers who share our commitment to quality and sustainability. Every dish tells a story of tradition, innovation, and respect for our ingredients."
        />

        <AboutSection
          title="Our Passion"
          icon={Heart}
          content="Food is more than sustenance—it's an experience that brings people together. We pour our hearts into creating memorable dining moments, from carefully crafted dishes to warm, attentive service. Our passion for hospitality drives us to exceed expectations with every visit."
        />

        <AboutSection
          title="Our Team"
          icon={Users}
          content="Behind every dish is a dedicated team of culinary professionals who share a vision for excellence. From our experienced chefs to our attentive service staff, we work together to create an environment where creativity flourishes and quality is paramount."
        />
      </div>

      <div className="mt-20 text-center">
        <p className="text-sm text-neutral-500 font-light italic">
          "The pleasure of good food is in the details"
        </p>
      </div>
    </div>
  );
};

export default About;
