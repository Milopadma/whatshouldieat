import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1>hello</h1>
      <Link href={"/home"}> Click me </Link>
    </div>
  );
};

export default Home;
