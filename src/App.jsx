import { useState } from "react";
import productsData from "./products.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) return toast.error("Already added");

    setCart([...cart, product]);
    toast.success("Added to cart");
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Removed");
  };

  const checkout = () => {
    setCart([]);
    toast.success("Checkout complete!");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-50">

      <ToastContainer />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b flex justify-between items-center px-10 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-600">DigiTools</h1>

        <div className="flex gap-6 text-gray-600">
          <span>Products</span>
          <span>Features</span>
          <span>Pricing</span>
        </div>

        <div className="flex items-center gap-4">

          {/* Cart Icon */}
          <div onClick={() => setShowCart(true)} className="relative cursor-pointer">
            <i className="fa-solid fa-cart-shopping text-xl"></i>

            {/* Cart Count */}
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-[2px] rounded-full shadow">
              {cart.length}
            </span>
          </div>

          <button className="text-sm">Login</button>

          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm">
            Get Started
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Supercharge Your Digital Workflow
          </h1>
          <p className="text-gray-500 mt-4">
            Access premium AI tools and templates
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full">
              Explore Products
            </button>
            <button className="border px-6 py-3 rounded-full">
              Watch Demo
            </button>
          </div>
        </div>

        <img src="/src/assets/banner.png" className="rounded-xl" />
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white grid grid-cols-3 text-center py-10">
        <div>
          <h2 className="text-3xl font-bold">50K+</h2>
          <p>Users</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">200+</h2>
          <p>Tools</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">4.9</h2>
          <p>Rating</p>
        </div>
      </section>

      {/* PRODUCTS TITLE */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold">Premium Digital Tools</h2>

        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={() => setShowCart(false)}
            className={`px-6 py-2 rounded-full ${!showCart ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
          >
            Products
          </button>

          <button
            onClick={() => setShowCart(true)}
            className={`px-6 py-2 rounded-full ${showCart ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
          >
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      {!showCart && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {productsData.map((product) => (
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-3">
                {product.description}
              </p>

              <p className="font-bold text-lg mb-4">
                ${product.price}/{product.period}
              </p>

              <ul className="text-sm mb-4 space-y-1">
                {product.features.map((f) => (
                  <li>✔ {f}</li>
                ))}
              </ul>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-full"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CART */}
      {showCart && (
        <div className="p-10">
          <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Your Cart</h3>

            {cart.map((item) => (
              <div className="flex justify-between mb-3">
                <span>{item.name}</span>
                <div className="flex gap-3">
                  <span>${item.price}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-5 font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button
              onClick={checkout}
              className="w-full mt-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-full"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* STEPS */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold mb-10">Get Started</h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">
          {["Create Account", "Choose Product", "Start Creating"].map((step) => (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="text-center py-20 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Starter</h3>
            <p>$0</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-xl shadow">
            <h3>Pro</h3>
            <p>$29</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Enterprise</h3>
            <p>$99</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Ready to Transform?</h2>
        <button className="mt-5 bg-white text-purple-600 px-6 py-2 rounded-full">
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white p-10 grid md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-bold text-xl">DigiTools</h2>
          <p className="text-gray-400 mt-2">
            Premium tools for creators
          </p>
        </div>

        <div>
          <h3>Product</h3>
          <p>Features</p>
          <p>Pricing</p>
        </div>

        <div>
          <h3>Company</h3>
          <p>About</p>
          <p>Careers</p>
        </div>

        <div>
          <h3>Social</h3>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
      </footer>
    </div>
  );
}