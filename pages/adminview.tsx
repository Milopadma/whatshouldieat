import React from "react";
import { useState } from "react";
import Image from "next/image";
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
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-zinc-100 text-neutral-800">
          <div className="flex flex-col items-baseline">
            <h1 className="text-6xl">Logged in as {session.user?.name}</h1>
            {allFoodArray.map((food) => (
              <div key={food.id} className="flex flex-row">
                <p>{food.name}</p>
                <button className="border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200 py-1 px-4 rounded transition-colors duration-200 ease-in-out">
                  Remove
                </button>
              </div>
            ))}

            <button
              className="mt-4 border-2 border-green-700 text-green-900 hover:bg-green-900 hover:text-green-200  text-2xl py-2 px-8 rounded transition-colors duration-200 ease-in-out"
              onClick={() => signOut()}
            >
              sign out
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
