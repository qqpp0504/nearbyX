import { useEffect, useRef, useState } from "react";

import noLocationImage from "../assets/no-location.png";

export default function Map() {
  const mapContainerRef = useRef();
  const [error, setError] = useState(false);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showError() {
    setError(true);
  }

  function initLocation(position) {
    const userLocation = new window.google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    const mapOptions = {
      center: userLocation, // 使用者當前位置
      zoom: 18, // 地圖縮放層級
      mapTypeId: "roadmap", // 地圖類型：roadmap, satellite, hybrid, terrain
      streetViewControl: false, // 是否顯示街景控制
      fullscreenControl: true, // 是否顯示全螢幕控制
      mapId: "677bf3146b6e0df5",
    };

    // 初始化地圖
    new window.google.maps.Map(mapContainerRef.current, mapOptions);
  }

  // 獲取使用者的地理位置
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initLocation, showError);
    } else {
      showError();
    }
  }

  return (
    <div ref={mapContainerRef} className="h-screen">
      {error && (
        <div className="fixed bottom-0 h-64 bg-white w-full rounded-t-3xl flex flex-col items-center justify-center gap-5">
          <img src={noLocationImage} alt="Unable to retrieve location image." />
          <p className="text-gray-400">該裝置不支持 GPS</p>
        </div>
      )}
    </div>
  );
}
