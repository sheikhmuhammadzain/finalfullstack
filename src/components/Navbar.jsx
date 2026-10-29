import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = useCart();
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navLinks = [
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Catering', path: '/catering' }
    ];

    return (
        <nav className="fixed w-full z-50 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <h1 className="font-serif text-2xl tracking-wider">BAKERY</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-sans font-light text-sm tracking-wider hover:text-neutral-500 transition-colors ${
                                    location.pathname === link.path ? 'text-neutral-800' : 'text-neutral-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="font-sans font-light text-sm tracking-wider text-neutral-600 hover:text-neutral-800 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="font-sans font-light text-sm tracking-wider text-neutral-600 hover:text-neutral-800 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                        
                        <Link to="/cart" className="relative">
                            <ShoppingBag className="h-5 w-5 text-neutral-600 hover:text-neutral-800 transition-colors" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-sans">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6 text-neutral-600" />
                            ) : (
                                <MenuIcon className="h-6 w-6 text-neutral-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isOpen
                        ? 'max-h-screen opacity-100 visible'
                        : 'max-h-0 opacity-0 invisible'
                }`}
            >
                <div className="px-4 py-4 bg-white space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block font-sans font-light text-sm tracking-wider hover:text-neutral-500 transition-colors ${
                                location.pathname === link.path ? 'text-neutral-800' : 'text-neutral-600'
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;