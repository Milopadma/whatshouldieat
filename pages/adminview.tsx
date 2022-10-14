import React from "react";
//prisma
import { prisma } from "../src/lib/prisma";
//nextuath
import { useSession, signIn, signOut } from "next-auth/react";

interface Food {
  id: number;
  name: string;
}

interface AdminViewProps {
  allFoodArray: Food[];
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
  return {
    props: {
      allFoodArray,
    },
  };
};

const AdminView: React.FC<AdminViewProps> = ({ allFoodArray }) => {
  const [foodArray, setFoodArray] = React.useState<Food[]>(allFoodArray);
  const { data: session } = useSession();

  //on component load, store all food in state
  React.useEffect(() => {
    setFoodArray(allFoodArray);
  }, []);

  //methods
  //method to remove food from state and DB
  const removeClickHandler = async (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    //show a fake loading state
    setFoodArray((prev) => {
      return prev.filter((food) => food.id !== id);
    });
    try {
      const body = id;
      await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    //on success, refetch then refresh state
    setFoodArray(foodArray.filter((food) => food.id !== id));
  };

  if (session) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-zinc-100 text-neutral-800">
          <div className="flex flex-col items-baseline">
            <h1 className="text-6xl">Logged in as {session.user?.name}</h1>
            <h2 className="text-4xl italic mt-2 mb-8 text-neutral-600">Current Food Database View</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1">
              {foodArray.map((food) => (
                <div key={food.id} className="flex flex-row min-w-[33vw] justify-between px-8 outline-1 outline-gray-300">
                  <p>{food.name}</p>
                  <button
                    className="border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200 py-1 px-4 rounded transition-colors duration-200 ease-in-out"
                    onClick={(e) => removeClickHandler(e, food.id)}
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
