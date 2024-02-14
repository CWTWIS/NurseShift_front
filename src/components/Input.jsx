export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  errorMessage,
  label,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
