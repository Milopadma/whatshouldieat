import React from "react";
import { useState } from "react";
import Image from "next/image";
//prisma
import { prisma } from "../src/lib/prisma";

import Footer from "../src/components/Footer";

export const getServerSideProps = async () => {
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
  const [newFood, setNewFood] = useState("");

  const addNewFood = async (e: React.SyntheticEvent, newFood: string) => {
    e.preventDefault();
    try {
      const body = newFood;
      await fetch("/api/buffer/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newFoodLowercase = newFood.toLowerCase();
    const allFoodObject: any = props.allFood;
    //check if the food is already in the database and not an empty string
    if (
      allFoodObject.some((item: any) => item.name === newFoodLowercase) ||
      newFoodLowercase === "" ||
      //is not a number
      !isNaN(Number(newFoodLowercase))
    ) {
      alert(
        "This food is already in the database or you didn't enter anything or you entered a number."
      );
    } else {
      //add the new food to the database
      addNewFood(e, newFoodLowercase);
      //show a notification div that the food was added
      newFoodAdded();
      //clear the text input field
      setNewFood("");
    }
  };

  const newFoodAdded = () => {
    const notification = document.getElementById("notification");
    notification!.style.opacity = "1";
    setTimeout(() => {
      notification!.style.opacity = "0";
    }, 3000);
  };

  return (
    <div className="m-8">
      {/* title */}
      <h1 className="mt-32 text-6xl italic flex justify-center items-start text-center">
        what should i eat?
      </h1>
      <h5 className="text-yellow-700 font-serif text-2xl italic flex justify-center">
        (mau makan apa besok?)
      </h5>
      {/* subtitle */}
      <h1 className="mt-8 text-4xl flex justify-center transition-all ease-in-out duration-200 text-center">
        {food}
      </h1>

      {/* button */}
      <div className="mt-8 flex justify-center">
        <button
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-8 rounded transition-colors ease-in-out duration-300"
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
          priority={true}
          style={{ imageRendering: "pixelated" }}
          placeholder="blur"
          // blur data uRL
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          // blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAwIDUwQzUwIDUwIDUwIDAgNTAgMGMwIDAgMCA1MCA1MCA1MGg1MHYtNTB6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
        />
      </div>

      {/* inputfield */}

      <div
        id="notification"
        style={{ opacity: "0" }}
        className="transition-all ease-in-out duration-300"
      >
        <h1 className="mt-32  text-l flex justify-center ">
          <div className="relative bg-green-700 text-white rounded px-9 py-2 mb-4">
            Successfully added!
          </div>
        </h1>
      </div>
      <h2 className="flex justify-center">want to add more food to the db?</h2>
      <div className="">
        <form onSubmit={onSubmit} className="flex justify-center items-center ">
          <input
            className="m-2 italic border-2 border-blue-50 rounded-md py-2 px-4"
            placeholder="e.g steak"
            type="text"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
          />
          <button
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded transition-colors ease-in-out duration-300"
            onClick={onSubmit}
          >
            add food
          </button>
        </form>
      </div>
      <div className="mt-2 flex justify-center"></div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
