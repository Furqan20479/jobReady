import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <section className="hero w-full h-screen bg bg-amber-200 flex justify-center items-center flex-col">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          nostrum dolores cumque molestias laborum, inventore consequatur porro
          commodi sunt voluptatibus necessitatibus et nobis.
        </h2>

        <button
          type="button"
          className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-300"
        >
          Shop Now
        </button>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-xl mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>

            <p className="text-amber-600 text-xl font-bold mt-2">
              Rs {product.prize}
            </p>

            <button
              className="w-full mt-4 py-2 bg-amber-500 text-white rounded-xl font-semibold 
                   hover:bg-amber-600 transition-all duration-300 shadow"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
