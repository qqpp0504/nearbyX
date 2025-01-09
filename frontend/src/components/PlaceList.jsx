import { useEffect, useState } from "react";

import noPlaceImage from "../assets/no-place.png";
import EventEmitter from "../utils/EventEmitter.js";
import Place from "./Place.jsx";
import PlaceDetail from "./PlaceDetail.jsx";

export default function PlaceList() {
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [places, setPlaces] = useState();
  const [place, setPlace] = useState();

  useEffect(() => {
    EventEmitter.on("nearbyPlaces", (data) => {
      if (data.length > 0) {
        setVisible(true);
        setPlaces(data);
      }
    });

    EventEmitter.on("renderRoute", () => {
      setDetailVisible(false);
    });
  }, []);

  function handleOpenDetail(place) {
    setPlace(place);
    setDetailVisible(true);
  }

  function handleCloseDetail() {
    setDetailVisible(false);
  }

  return (
    <>
      {visible && (
        <div>
          <div className="fixed bottom-0 h-64 bg-white w-full rounded-t-3xl flex flex-col items-center justify-center shadow-2xl overflow-scroll pt-3 px-5">
            {places ? (
              places.map((place) => (
                <Place
                  onClick={() => {
                    handleOpenDetail(place);
                  }}
                  key={place.id}
                  placeItem={place}
                />
              ))
            ) : (
              <>
                <img src={noPlaceImage} alt="Location not found." />
                <p className="text-gray-400">無搜索結果</p>
              </>
            )}
          </div>
          {detailVisible && (
            <PlaceDetail placeItem={place} onClose={handleCloseDetail} />
          )}
        </div>
      )}
    </>
  );
}
