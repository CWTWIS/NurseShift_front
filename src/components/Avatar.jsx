import profileImg from "../assets/profileImage.png";

export default function Avatar({ src, size = 2.5, onClick, onHover }) {
  return (
    <img
      src={src || profileImg}
      alt="userPic"
      className={`rounded-full ${onHover}`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
      onClick={onClick}
    />
  );
}
