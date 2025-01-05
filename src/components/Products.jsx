import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ChefHat, Star, ShoppingBag, Clock, Phone, Mail, Plus, ArrowRight } from "lucide-react";

const dummyProducts = [
  {
    id: 1,
    name: "Artisanal Sourdough Bread",
    price: 8.99,
    description: "Naturally leavened with a 24-hour fermentation process",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "bread"
  },
  {
    id: 2,
    name: "Classic Croissant",
    price: 4.99,
    description: "Buttery, flaky layers with a golden-brown crust",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "pastries"
  },
  {
    id: 3,
    name: "Dark Chocolate Cake",
    price: 42.99,
    description: "Rich Belgian chocolate with a velvety ganache",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "cakes"
  }
];

const ProductCard = ({ product, onAddToCart }) => (
  <div className="group">
    <div className="relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <button
        onClick={() => onAddToCart(product.id)}
        className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
      >
        <ShoppingBag className="w-5 h-5 text-neutral-800" />
      </button>
    </div>
    <div className="pt-6">
      <h3 className="font-serif text-xl text-neutral-800 mb-2">{product.name}</h3>
      <p className="text-neutral-500 font-light text-sm mb-3">{product.description}</p>
      <p className="font-serif text-lg text-neutral-800">${product.price}</p>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts(selectedCategory);
        if (response?.data?.length > 0) {
          const backendProducts = response.data.map(product => ({
            ...product,
            description: product.description || "Fresh from our bakery",
            image: product.image || "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }));
          setProducts([...dummyProducts, ...backendProducts]);
        } else {
          setProducts(dummyProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Showing sample products instead.");
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <img
          src="https://d2w1ef2ao9g8r9.cloudfront.net/otl-images/_1600x847_crop_center-center_82_line/open-a-bakery-header.jpg"
          alt="Bakery"
          className="absolute inset-0 w-full h-full object-cover filter brightness-50"
        />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="inline-block text-white/80 tracking-wider text-sm mb-4 uppercase">
            Est. 1995
          </span>
          <h1 className="text-6xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            Sheikh Bakery
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-xl mx-auto font-light">
            Artisanal baked goods crafted with passion and tradition
          </p>
          <button
            onClick={() => document.getElementById("featured").scrollIntoView({ behavior: "smooth" })}
            className="group bg-white text-black px-8 py-4 rounded-full text-sm tracking-wide hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            Explore Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm tracking-wider text-neutral-500 uppercase mb-4 block">
              Our Products
            </span>
            <h2 className="font-serif text-4xl text-neutral-800 mb-4">
              Fresh from Our Ovens
            </h2>
            <p className="text-neutral-500 font-light max-w-2xl mx-auto">
              Discover our selection of freshly baked goods, each crafted with premium ingredients
              and time-honored techniques.
            </p>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
            {["all", "cakes", "bread", "pastries", "cookies"].map((category) => (
              <button
                key={category}
                className={`px-6 py-2.5 font-light text-sm tracking-wider whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 font-light">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 font-light">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <ChefHat className="w-8 h-8 mx-auto mb-6 text-neutral-800" />
              <h3 className="font-serif text-xl text-neutral-800 mb-4">Artisanal Quality</h3>
              <p className="text-neutral-500 font-light">
                Every item is crafted by hand using traditional methods and the finest ingredients
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-6 text-neutral-800" />
              <h3 className="font-serif text-xl text-neutral-800 mb-4">Fresh Daily</h3>
              <p className="text-neutral-500 font-light">
                Baked fresh every morning for the perfect taste and texture
              </p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-6 text-neutral-800" />
              <h3 className="font-serif text-xl text-neutral-800 mb-4">Premium Quality</h3>
              <p className="text-neutral-500 font-light">
                Using only the highest quality ingredients for superior taste
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
