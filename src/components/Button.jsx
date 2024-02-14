const bgClass = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  gray: "bg-gray-200 hover:bg-gray-300",
};

const colorClass = {
  white: "text-white",
};

const widthClass = {
  full: "w-full",
};

export default function Button({ children, bg, color, width, onClick }) {
  let classes = bg ? bgClass[bg] : "";
  classes += color ? " " + colorClass[color] : "";
  classes += width ? " " + widthClass[width] : "";
  return (
    <button className={` px-3 py-1 rounded-md ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}
