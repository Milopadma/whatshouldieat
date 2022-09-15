import { NextPage } from "next";
import Link from "next/link";

const NewHome: NextPage = () => {
  return (
    <div>
      <h1>hello</h1>
      <p>this is a new route</p>
      <Link href={"/"}> back home </Link>
    </div>
  );
};

export default NewHome;
