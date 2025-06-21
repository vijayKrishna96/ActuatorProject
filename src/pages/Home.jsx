import React, {  useState } from "react";


function Home() {
  const [actuators, setActuators] = useState([]);
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort by Price</option>
          <option value="price_asc">Low to High</option>
          <option value="price_desc">High to Low</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filter by Type</option>
          <option value="Double Acting">Double Acting</option>
          <option value="Spring Return">Spring Return</option>
        </select>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filter by Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actuators.map((actuator) => (
          <div
            key={actuator._id}
            className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden p-4 hover:shadow-xl transition duration-300"
          >
            <img
              className="h-40 w-full object-contain"
              src={actuator.imageUrl}
              alt={actuator.name}
            />

            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-semibold text-gray-800">{actuator.name}</h2>
              <p className="text-sm text-gray-600">Type: {actuator.type}</p>
              <p className="text-sm text-gray-600">Size: {actuator.size}</p>
              <p className="text-sm text-gray-600">Model: {actuator.modelNumber}</p>
              <p className="text-sm text-gray-600">Rotation: {actuator.rotation}</p>
              <p className="text-lg font-bold text-indigo-600 mt-2">₹{actuator.price}</p>
            </div>

            <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
