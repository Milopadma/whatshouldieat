interface NotificationProps {
  message: string;
  type: string;
  isShowing: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  isShowing,
}) => {
  const opacity = isShowing ? 1 : 0;
  const bgColor = type === "success" ? "rgb(21 128 61)" : "rgb(185 28 28)";

  return (
    <div
      style={{ transition: "all 0.3s ease-in-out", opacity: opacity }}
      className={`transition-all ease-in-out duration-300`}
    >
      <h1 className="mt-32  text-l flex justify-center">
        <div
          style={{ backgroundColor: bgColor }}
          className={`relative text-white rounded px-9 py-2 mb-4`}
        >
          {message}
        </div>
      </h1>
    </div>
  );
};

export default Notification;
