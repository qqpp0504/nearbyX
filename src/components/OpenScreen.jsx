import classes from "./OpenScreen.module.css";
import screenBuildingImage from "../assets/screen-building.png";

export default function OpenScreen({ onClick }) {
  function handleClick() {
    onClick();
  }

  return (
    <div
      className={`text-white fixed w-full h-full flex flex-col justify-center items-center ${classes["open-screen"]}`}
    >
      <img
        src={screenBuildingImage}
        alt="App logo displaying the brand emblem."
      />
      <div className="text-[4.25rem]">nearbyX</div>
      <button
        onClick={handleClick}
        className="text-center border rounded-3xl px-12 py-3 mt-7"
      >
        開始使用
      </button>
    </div>
  );
}
