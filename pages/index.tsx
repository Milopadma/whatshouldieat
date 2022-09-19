import React from "react";
import { useState } from "react";
import Image from "next/image";

//prisma
import prisma from "../lib/prisma";

import Footer from "../src/components/Footer";

export const getStaticProps = async () => {
  const allFood = await prisma.food.findMany({
    where: {
      id: {
        gt: 0,
        lte: 100,
      },
    },
  });

  return {
    props: {
      allFood,
    },
  };
};

type Props = {
  allFood: {
    id: number;
    name: string;
  };
};

const showRandomFood = (allFood: any) => {
  const randomFood = allFood[Math.floor(Math.random() * allFood.length)];
  return randomFood;
};

const imageloader = () => {
  return `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/taco_1f32e.png`;
};

const Home: React.FC<Props> = (props) => {
  const [food, setFood] = useState("sushi");

  return (
    <div className="m-8">
      {/* title */}
      <h1 className="mt-32 text-6xl italic flex justify-center bg-slate-400">
        what should i eat?
      </h1>
      <h5 className="text-yellow-700 font-serif text-2xl italic flex justify-center">
        (mau makan apa besok?)
      </h5>
      {/* subtitle */}
      <h1 className="mt-8 text-4xl flex justify-center">
        {food}
      </h1>
      {/* button */}
      <div className="mt-8 flex justify-center">
        <button
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-6 rounded"
          onClick={async () => {
            const randomFood = showRandomFood(props.allFood);
            setFood(randomFood.name);
          }}
        >
          reroll
        </button>
      </div>
      {/* image */}
      <div className="mt-8 flex justify-center">
        <Image
          loader={imageloader}
          src={imageloader()}
          alt="food"
          width={400}
          height={400}
          className="rounded-full"
          unoptimized={true}
        />
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
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
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
      <Footer></Footer>
    </div>
  );
};

export default Home;
