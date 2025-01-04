import { useEffect, useRef } from "react";

export default function Map() {
  const mapContainerRef = useRef();

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function showError() {}

  // 獲取使用者的地理位置
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initLocation, showError);
    } else {
      showError();
    }
  }

  return <div ref={mapContainerRef} className="h-screen"></div>;
}
