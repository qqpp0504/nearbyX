/* eslint-disable react/prop-types */
import ratingStarIcon from "../assets/rating-star-icon.png";
import distanceIcon from "../assets/distance-icon.png";
import { isPlaceOpen } from "../utils/isPlaceOpen.js";
import noImageIcon from "../assets/no-image-icon.png";
import EventEmitter from "../utils/EventEmitter.js";

export default function Place({ placeItem, type = 1, onClick }) {
  // 店家營業狀況
  let operatingStatusClasses =
    "px-1 leading-5 text-center rounded text-[10px] font-normal";

  let operatingStatus;
  const openingHours = placeItem.regularOpeningHours;

  if (openingHours) {
    if (isPlaceOpen(openingHours.weekdayDescriptions)) {
      operatingStatus = "營業中";
      operatingStatusClasses += " bg-green-100 text-green-500";
    } else {
      operatingStatus = "非營業時間";
      operatingStatusClasses += " bg-red-100 text-red-500";
    }
  } else {
    operatingStatus = "無營業時間資訊";
    operatingStatusClasses += " bg-gray-100 text-gray-500";
  }

  // 計算與目的地之間的距離
  function countDistance() {
    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      placeItem.location,
      window.userLocation
    );

    if (distance > 999) {
      distance = (distance / 1000).toFixed(2) + "km";
    } else {
      distance = Math.round(distance) + "m";
    }

    return distance;
  }

  function handleRenderRoute() {
    EventEmitter.emit("renderRoute", placeItem.location);
  }

  return (
    <div className="flex justify-between items-center pt-3 pb-3 border-b-2 border-gray-50 w-full">
      <div className="flex justify-between items-center gap-4">
        {type === 1 && (
          <>
            {placeItem.photos[0] ? (
              <img
                src={placeItem.photos[0]?.getURI()}
                alt="店家圖片"
                className="w-[100px] h-[70px] rounded-md overflow-hidden"
              ></img>
            ) : (
              <div className="w-[100px] h-[70px] flex flex-col gap-1 justify-center items-center">
                <img src={noImageIcon} alt="No store image." className="w-7" />
                <span className="text-xs text-gray-400">無圖片資訊</span>
              </div>
            )}
          </>
        )}

        <button
          onClick={type === 1 ? onClick : undefined}
          className={`w-[230px] flex flex-col ${type === 2 && "cursor-text"}`}
        >
          <span className="text-gray-700 font-semibold">
            {placeItem.displayName}
          </span>
          <div className="text-xs text-gray-600 mt-1">
            {placeItem.formattedAddress}
          </div>
          <div className="flex mt-1 justify-start">
            <div className={operatingStatusClasses}>{operatingStatus}</div>
            <div className="h-5 leading-5 flex items-center ml-2 text-[10px] text-gray-400 gap-1">
              <img
                className="w-[14px] h-[14px]"
                src={ratingStarIcon}
                alt="Rating star icon"
              />
              <span>{placeItem.rating}</span>
            </div>
          </div>
        </button>
      </div>

      <div className="position w-[37px] text-center">
        <button onClick={handleRenderRoute}>
          <img src={distanceIcon} alt="Map pin icon" />
        </button>
        <div className="text-xs text-gray-600 mt-1">{countDistance()}</div>
      </div>
    </div>
  );
}
