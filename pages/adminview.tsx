import React from "react";
//prisma
import { prisma } from "../src/lib/prisma";
import { operator } from "@prisma/client";
//nextuath
import { useSession, signIn, signOut } from "next-auth/react";

interface Food {
  id: number;
  name: string;
}

interface AdminViewProps {
  allFoodArray: Food[];
  bufferFoodArray: Food[];
  operators: operator[];
}

export const getServerSideProps = async () => {
  const allFoodArray = await prisma.food.findMany({
    where: {
      id: {
        gt: 0,
        lte: 100,
      },
    },
  });
  const bufferFoodArray = await prisma.buffer.findMany({
    where: {
      id: {
        gt: 0,
        lte: 100,
      },
    },
  });
  //get the list of admins
  const operators = await prisma.operator.findMany({});
  return {
    props: {
      allFoodArray,
      bufferFoodArray,
      operators,
    },
  };
};

const AdminView: React.FC<AdminViewProps> = ({
  allFoodArray,
  bufferFoodArray,
  operators,
}) => {
  const [foodArray, setFoodArray] = React.useState<Food[]>(allFoodArray);
  const [statebufferfoodArray, setstatebufferFoodArray] =
    React.useState<Food[]>(bufferFoodArray);
  const { data: session } = useSession();
  const isOperator = operators.some((operator) => {
    return operator.name === session?.user?.email;
  });
  //on component load, store all food in state
  React.useEffect(() => {
    setFoodArray(allFoodArray);
    setstatebufferFoodArray(bufferFoodArray);
    //check if current user session username exists in operator array
    //if not, redirect to home page
    if (session && session.user) {
      const username = session.user.name;
      const operator = operators.find((operator) => operator.name === username);
      if (!operator) {
        window.location.href = "/";
      }
    }
  }, []);

  //methods
  //method to remove food from state and DB
  const removeClickHandler = async (
    e: React.SyntheticEvent,
    id: number,
    type: string
  ) => {
    e.preventDefault();
    try {
      const body = id;
      await fetch(`/api/${type}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    //on success, refetch then refresh state
    if (type === "live") {
      setFoodArray(foodArray.filter((food) => food.id !== id));
      setFoodArray((prev) => {
        return prev.filter((food) => food.id !== id);
      });
    } else {
      setstatebufferFoodArray((prev) => {
        return prev.filter((food) => food.id !== id);
      });
      setstatebufferFoodArray(
        statebufferfoodArray.filter((food) => food.id !== id)
      );
    }
  };

  //method to add food from buffer to live
  const addClickHandler = async (
    e: React.SyntheticEvent,
    id: number,
    type: string
  ) => {
    e.preventDefault();
    try {
      const body = id;
      await fetch(`/api/${type}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    //on success, refetch then refresh state
    if (type === "live") {
      setFoodArray(foodArray.filter((food) => food.id !== id));
      setFoodArray((prev) => {
        return prev.filter((food) => food.id !== id);
      });
    } else {
      setstatebufferFoodArray((prev) => {
        return prev.filter((food) => food.id !== id);
      });
      setstatebufferFoodArray(
        statebufferfoodArray.filter((food) => food.id !== id)
      );
    }
  };

  if (isOperator && session) {
    if (statebufferfoodArray !== undefined) {
      return (
        <>
          <div className="flex justify-center items-center min-h-screen bg-zinc-100 text-neutral-800">
            <div className="flex flex-col items-baseline">
              <h1 className="text-6xl">Logged in as {session.user?.name}</h1>
              <h2 className="text-4xl italic mt-2 mb-8 text-neutral-600">
                Buffer Food Database View
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1">
                {statebufferfoodArray.map((food) => (
                  <div
                    key={food.id}
                    className="flex flex-row min-w-[33vw] justify-between px-8 outline-1 outline-gray-300"
                  >
                    <p>{food.name}</p>
                    <div>
                      <button
                        className="border-2 border-neutral-700 text-red-900 hover:bg-red-900 hover:text-red-200 py-1 px-4 rounded transition-colors duration-200 ease-in-out"
                        onClick={(e) =>
                          removeClickHandler(e, food.id, "buffer")
                        }
                      >
                        Remove
                      </button>
                      <button
                        className="border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200 py-1 px-4 rounded transition-colors duration-200 ease-in-out"
                        onClick={(e) => addClickHandler(e, food.id, "live")}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="text-4xl italic mt-2 mb-8 text-neutral-600">
                Live Food Database View
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1">
                {foodArray.map((food) => (
                  <div
                    key={food.id}
                    className="flex flex-row min-w-[33vw] justify-between px-8 outline-1 outline-gray-300"
                  >
                    <p>{food.name}</p>
                    <button
                      className="border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200 py-1 px-4 rounded transition-colors duration-200 ease-in-out"
                      onClick={(e) => removeClickHandler(e, food.id, "live")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="mt-8 border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200  text-2xl py-2 px-8 rounded transition-colors duration-200 ease-in-out"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex justify-center items-center min-h-screen bg-zinc-100 text-neutral-800">
            <div className="flex flex-col items-baseline">
              <h1 className="text-6xl">Logged in as {session.user?.name}</h1>
              <h2 className="text-4xl italic mt-2 mb-8 text-neutral-600">
                Buffer Food Database Empty
              </h2>
              <h2 className="text-4xl italic mt-2 mb-8 text-neutral-600">
                Live Food Database View
              </h2>
              <div className="grid lg:grid-cols-2 grid-cols-1">
                {foodArray.map((food) => (
                  <div
                    key={food.id}
                    className="flex flex-row min-w-[33vw] justify-between px-8 outline-1 outline-gray-300"
                  >
                    <p>{food.name}</p>
                    <button
                      className="border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200 py-1 px-4 rounded transition-colors duration-200 ease-in-out"
                      onClick={(e) => removeClickHandler(e, food.id, "live")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="mt-8 border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200  text-2xl py-2 px-8 rounded transition-colors duration-200 ease-in-out"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-zinc-100 text-neutral-800">
        <div className="flex flex-col items-baseline">
          <h1 className="text-6xl">Not logged in</h1>
          <button
            className="mt-4 border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200  text-2xl py-2 px-8 rounded transition-colors duration-200 ease-in-out"
            onClick={() => signIn()}
          >
            sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminView;
