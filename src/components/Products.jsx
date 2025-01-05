import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  Star,
  ShoppingBag,
  Clock,
  Phone,
  Mail,
  Plus,
  ArrowRight,
} from "lucide-react";

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
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Showing sample products instead.");
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
            onClick={() =>
              document
                .getElementById("menu")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="group bg-white text-black px-8 py-4 rounded-full text-sm tracking-wide hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            Explore Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <span className="text-sm tracking-wider text-gray-500 uppercase mb-4">
              Our Menu
            </span>
            <h2 className="text-4xl font-serif mb-4">Handcrafted with Love</h2>
          </div>

          {/* Categories */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            {["all", "cakes", "bread", "pastries", "cookies"].map(
              (category) => (
                <button
                  key={category}
                  className={`px-6 py-2.5 rounded-full text-sm tracking-wide whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-[4/3] relative overflow-hidden mb-6">
                  <img
                    src={product.image || "/api/placeholder/400/300"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <span className="font-serif text-lg">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <ChefHat className="w-6 h-6" />,
                title: "Master Bakers",
                description: "Expertly crafted by our skilled artisans",
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Premium Quality",
                description: "Using only the finest ingredients",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Fresh Daily",
                description: "Baked fresh every morning",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm tracking-wider text-gray-500 uppercase mb-4 block">
                Visit Us
              </span>
              <h2 className="text-4xl font-serif mb-12">Get in Touch</h2>
              <div className="space-y-8">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "Phone",
                    info: "+1 (555) 123-4567",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: "Email",
                    info: "info@sheikhbakery.com",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Hours",
                    info: ["Mon-Fri: 7am - 8pm", "Sat-Sun: 8am - 6pm"],
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-serif mb-1">{item.title}</h3>
                      {Array.isArray(item.info) ? (
                        item.info.map((line, i) => (
                          <p key={i} className="text-gray-500">
                            {line}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-500">{item.info}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="https://cdn.prod.website-files.com/63ea45ebaef615f2a548607b/66d7936d50a956c0f1b9f8db_66d792c0765ca7b3550ac1b9_AdobeStock_713042638.jpeg"
                alt="Our Shop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
