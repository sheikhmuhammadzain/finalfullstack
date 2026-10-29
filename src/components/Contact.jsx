import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = ({ icon: Icon, title, content }) => (
  <div className="flex items-start gap-3 group">
    <Icon className="w-5 h-5 text-neutral-600 mt-1 group-hover:text-neutral-800 transition-colors" />
    <div>
      <h3 className="font-light text-neutral-800">{title}</h3>
      <p className="text-neutral-500 font-light">{content}</p>
    </div>
  </div>
);

const Input = ({ label, type = "text", ...props }) => (
  <div className="mb-6">
    <label className="block text-sm font-light text-neutral-600 mb-2">
      {label}
    </label>
    <input
      type={type}
      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-neutral-400 outline-none transition-colors font-light"
      {...props}
    />
  </div>
);

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-extralight text-4xl text-neutral-800 mb-4">Get in Touch</h1>
        <p className="text-neutral-500 font-light">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <form className="space-y-6">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
            <div className="mb-6">
              <label className="block text-sm font-light text-neutral-600 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 focus:border-neutral-400 outline-none transition-colors font-light resize-none"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-3 px-4 hover:bg-neutral-800 transition-colors font-light"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <ContactInfo
            icon={MapPin}
            title="Visit Us"
            content="123 Dining Street, Culinary District, Food City 12345"
          />
          <ContactInfo
            icon={Phone}
            title="Call Us"
            content="+1 (555) 123-4567"
          />
          <ContactInfo
            icon={Mail}
            title="Email Us"
            content="hello@restaurant.com"
          />
          <ContactInfo
            icon={Clock}
            title="Hours"
            content="Tue - Sun: 5:30 PM - 10:00 PM Closed Mondays"
          />
          
          <div className="pt-8 mt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 font-light">
              For private events and catering inquiries, please email us directly at 
              <a href="mailto:events@restaurant.com" className="text-neutral-800 ml-1 hover:text-neutral-600 transition-colors">
                events@restaurant.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
