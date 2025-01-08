import { useEffect, useState } from "react";

import noPlaceImage from "../assets/no-place.png";
import EventEmitter from "../utils/EventEmitter.js";

export default function PlaceList() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    EventEmitter.on("nearbyPlaces", (data) => {
      if (data.length > 0) {
        setVisible(true);
      }
    });
  }, []);

  return (
    <>
      {visible && (
        <div>
          <div className="fixed bottom-0 h-64 bg-white w-full rounded-t-3xl flex flex-col items-center justify-center gap-5">
            <img src={noPlaceImage} alt="Location not found." />
            <p className="text-gray-400">無搜索結果</p>
          </div>
        </div>
      )}
    </>
  );
}
