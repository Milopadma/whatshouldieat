import DropdownDaisy from "./DropdownDaisy";

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <DropdownDaisy
        title="what is this?"
        description="this is a food picker"
      />
      <button className="btn">button</button>
    </footer>
  );
};

export default Footer;
