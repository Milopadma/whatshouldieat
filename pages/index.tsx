import { useState } from "react";

const Home = () => {
  const [food, setFood] = useState("sushi");
  return (
    <div className="m-8">
      {/* title */}
      <h1 className="text-3xl italic flex justify-center">
        what should i eat?
      </h1>
      {/* button */}
      <div className="flex justify-center">
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
      {/* subtitle */}
      <h1 className="text-3xl italic flex justify-center">{food}</h1>
      {/* inputfield */}
      <h2 className="flex justify-center">want to add more food to the db?</h2>
      <input placeholder="food" type="text" />
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
  );
};

export default Home;
