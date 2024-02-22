export default function FormButton({ children, onClick }) {
  return (
    <button
      className="px-2.5 py-1.5 text-blue-500 font-medium hover:bg-gray-100 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
