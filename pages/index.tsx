import { useState } from "react";

const Home = () => {
  const [food, setFood] = useState("sushi");
  return (
    <div className="m-8">
      {/* title */}
      <h1 className="mt-32 text-3xl italic flex justify-center">
        what should i eat?
      </h1>
      {/* subtitle */}
      <h1 className="mt-8 text-3xl italic flex justify-center">{food}</h1>
      {/* button */}
      <div className="mt-8 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            // You can use any data fetching library
            const res = await fetch("/api/hello");
            const json = await res.json();
            console.log(json);
            setFood(json.name);
          }}
        >
          click me
        </button>
      </div>

      {/* inputfield */}
      <h2 className="mt-32 flex justify-center">
        want to add more food to the db?
      </h2>
      <div className="flex justify-center 0">
        <input
          className="mt-2 italic border-2 border-blue-50 rounded-md p-2"
          placeholder="food here"
          type="text"
        />
      </div>
      <div className="mt-2 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            // You can use any data fetching library
            const res = await fetch("/api/addFood", {
              method: "POST",
              body: JSON.stringify({ food }),
            });
            const json = await res.json();
            console.log(json);
          }}
        >
          add food
        </button>
      </div>
    </div>
  );
};

export default Home;
