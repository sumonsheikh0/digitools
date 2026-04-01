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
      <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b flex justify-around items-center px-10 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DigiTools</h1>

        <div className="flex gap-6 text-gray-700">
          <span>Products</span>
          <span>Features</span>
          <span>Pricing</span>
          <span>Testimonials</span>
          <span>FAQ</span>
        </div>



        <div className="flex items-center gap-6">

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setShowCart(true);

              setTimeout(() => {
                const section = document.getElementById("cart-section");
                section?.scrollIntoView({
                  behavior: "smooth",
                  block: "center"
                });
              }, 100);
            }}
          >
            <i className="fa-solid fa-cart-shopping text-xl text-indigo-600"></i>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
              {cart.length}
            </span>
          </div>

          <button className="text-sm">Login</button>

          <button className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white px-4 py-2 rounded-full text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 px-10 py-20 items-center">

        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Supercharge Your <br /> Digital Workflow
          </h1>

          <p className="text-gray-500 mt-4">
            Access premium AI tools and templatesAccess premium AI tools, design assets, templates, and productivity
            software—all in one place. Start creating faster today.

            Explore Products

          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white px-6 py-2 rounded-full">
              Explore Products
            </button>

            <button className="border-2 border-indigo-600 px-6 py-3 rounded-full text-indigo-600 hover:text-white hover:bg-gradient-to-r from-indigo-700 to-purple-600 px-4 py-2 rounded-full ">
              <i class="fa-solid fa-play"></i> Watch Demo
            </button>
          </div>
        </div>

        <img
          src="/src/assets/banner.png"
          className="rounded-xl w-full max-w-md ml-auto"
        />

      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-16">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center">


          <div className="py-6 border-b md:border-b-0 md:border-r border-white/30">
            <h2 className="text-5xl font-bold">50K+</h2>
            <p className="mt-2 text-lg text-gray-200">Active Users</p>
          </div>


          <div className="py-6 border-b md:border-b-0 md:border-r border-white/30">
            <h2 className="text-5xl font-bold">200+</h2>
            <p className="mt-2 text-lg text-gray-200">Premium Tools</p>
          </div>


          <div className="py-6">
            <h2 className="text-5xl font-bold">4.9</h2>
            <p className="mt-2 text-lg text-gray-200">Rating</p>
          </div>

        </div>

      </section>

      {/* PRODUCTS TITLE */}
      <div className="text-center mt-20">

        <h2 className="text-4xl font-bold text-gray-800">
          Premium Digital Tools
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Choose from our curated collection of premium digital products designed
          to boost your productivity and creativity.
        </p>

        {/* TOGGLE BUTTON */}
        <div className="mt-6 flex justify-center">

          <div className="bg-gray-100 p-1 rounded-full flex gap-1 shadow-inner">

            {/* Products */}
            <button
              onClick={() => setShowCart(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${!showCart
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              Products
            </button>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${showCart
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              Cart ({cart.length})
            </button>

          </div>

        </div>
      </div>
      {/* PRODUCTS */}
      {!showCart && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-10">

          {productsData.map((product) => {

            //  TAG COLOR LOGIC
            let badgeColor = "";
            if (product.tagType === "best") {
              badgeColor = "bg-yellow-100 text-yellow-600";
            } else if (product.tagType === "popular") {
              badgeColor = "bg-purple-100 text-purple-600";
            } else if (product.tagType === "new") {
              badgeColor = "bg-green-100 text-green-600";
            }

            return (
              <div
                key={product.id}
                className="relative bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
              >

                {/*  BADGE */}
                {product.tag && (
                  <span className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${badgeColor}`}>
                    {product.tag}
                  </span>
                )}

                {/*  ICON */}
                <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>

                {/* DESC */}
                <p className="text-gray-500 text-sm mb-4">
                  {product.description}
                </p>

                {/* PRICE */}
                <p className="font-bold text-xl mb-4">
                  ${product.price}
                  <span className="text-sm text-gray-400">/{product.period}</span>
                </p>

                {/* FEATURES */}
                <ul className="text-sm mb-6 space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✔</span> {f}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-full hover:scale-105 transition"
                >
                  Buy Now
                </button>

              </div>
            );
          })}

        </div>
      )}

      {/* CART */}
      {showCart && (
        <div id="cart-section" className="px-10 py-16">

          <div className="bg-white p-8 rounded-2xl shadow max-w-3xl mx-auto">

            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Your Cart
            </h3>

            {/* EMPTY */}
            {cart.length === 0 ? (
              <div className="text-center text-gray-400 py-16">
                <i className="fa-solid fa-cart-shopping text-5xl mb-4"></i>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* ITEMS */}
                <div className="space-y-4">

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 px-5 py-4 rounded-xl"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">

                        {/* IMAGE */}
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <img
                            src={item.image}
                            className="w-6 h-6 object-contain"
                          />
                        </div>

                        {/* NAME + PRICE */}
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            ${item.price}
                          </p>
                        </div>

                      </div>

                      {/* RIGHT */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center mt-8 text-gray-600">
                  <span>Total:</span>
                  <span className="text-xl font-semibold text-gray-800">
                    ${total}
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  onClick={checkout}
                  className="w-full mt-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
                >
                  Proceed To Checkout
                </button>
              </>
            )}
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