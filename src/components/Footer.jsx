import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-neutral-400 hover:text-neutral-300 transition-colors font-sans font-light text-sm tracking-wide"
  >
    {children}
  </Link>
);

const FooterSection = ({ title, children }) => (
  <div className="space-y-6">
    <h4 className="font-serif text-lg text-white tracking-wide">{title}</h4>
    {children}
  </div>
);

const Footer = () => {
  const footerLinks = [
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Catering", path: "/catering" },
  ];

  return (
    <footer className="bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-white tracking-wider">
              BAKERY
            </h3>
            <p className="font-sans font-light text-sm text-neutral-400 leading-relaxed">
              Crafting moments of joy through the art of baking, since 1995.
            </p>
          </div>

          {/* Visit Section */}
          <FooterSection title="Visit">
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-neutral-500 mt-1" />
                <div className="font-sans font-light">
                  <p className="text-neutral-300">Find Us</p>
                  <p className="text-sm text-neutral-400">
                    123 Bakery Street
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-neutral-500 mt-1" />
                <div className="font-sans font-light">
                  <p className="text-neutral-300">Call Us</p>
                  <p className="text-sm text-neutral-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </FooterSection>

          {/* Links Section */}
          <FooterSection title="Explore">
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </div>
          </FooterSection>

          {/* Newsletter Section */}
          <FooterSection title="Newsletter">
            <div className="space-y-4">
              <p className="font-sans font-light text-sm text-neutral-400">
                Subscribe to receive updates and special offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-neutral-800 text-neutral-300 px-4 py-2 font-sans font-light text-sm flex-grow focus:outline-none"
                />
                <button className="bg-white text-neutral-900 px-4 py-2 font-sans font-light text-sm hover:bg-neutral-100 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </FooterSection>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans font-light text-sm text-neutral-500">
              {new Date().getFullYear()} Sheikh Bakery. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/zainshayykh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
