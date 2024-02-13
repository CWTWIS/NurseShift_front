export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  errorMessage,
  label,
}) {
  return (
    <div className="flex flex-col">
      {label}
      <input placeholder={placeholder} />
    </div>
  );
}
