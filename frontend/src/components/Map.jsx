import { useEffect, useRef, useState } from "react";

import noLocationImage from "../assets/no-location.png";
import EventEmitter from "../utils/EventEmitter.js";

// 根據給定的半徑來決定地圖縮放等級
function getZoomLevel(radius) {
  const zoomRadiusMap = [
    { radius: 100, zoom: 18 },
    { radius: 200, zoom: 17 },
    { radius: 500, zoom: 16 },
    { radius: 1000, zoom: 15.5 },
    { radius: 3000, zoom: 14 },
    { radius: 5000, zoom: 14.5 },
  ];

  for (const entry of zoomRadiusMap) {
    if (radius <= entry.radius) return entry.zoom;
  }

  return 10;
}

export default function Map() {
  const map = useRef();
  const [error, setError] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    EventEmitter.on("search", (data) => {
      if (data) {
        doSearchNearby(data);
      }
    });
  }, []);

  useEffect(() => {
    if (places.length > 0) {
      places.forEach((item) => {
        new window.AdvancedMarkerElement({
          map: map.current,
          position: item.location,
          content: new window.PinElement({
            background: "#FBBC04",
            borderColor: "#137333",
            glyphColor: "white",
          }).element,
        });
      });
    }
  }, [places]);

  function doSearchNearby(data) {
    const { type, radius } = data;

    window.Place.searchNearby({
      // required parameters
      fields: [
        "displayName",
        "photos",
        "location",
        "businessStatus",
        "rating",
        "formattedAddress",
        "reviews",
      ],
      locationRestriction: {
        center: window.userLocation,
        radius: radius,
      },
      // optional parameters
      includedPrimaryTypes: [type],
      maxResultCount: 20,
      rankPreference: window.SearchNearbyRankPreference.POPULARITY,
      language: "zh-tw",
      region: "us",
    }).then((res) => {
      const { places } = res;
      setPlaces(places);
      map.current.setZoom(getZoomLevel(radius));
    });
  }

  function showError() {
    setError(true);
  }

  function initLocation(position) {
    window.userLocation = new window.google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    const mapOptions = {
      center: window.userLocation, // 使用者當前位置
      zoom: 18, // 地圖縮放層級
      mapTypeId: "roadmap", // 地圖類型：roadmap, satellite, hybrid, terrain
      streetViewControl: false, // 是否顯示街景控制
      fullscreenControl: false, // 是否顯示全螢幕控制
      mapId: "677bf3146b6e0df5",
    };

    // 初始化地圖
    map.current = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    new window.AdvancedMarkerElement({
      map: map.current,
      position: window.userLocation,
    });
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
    <div id="map" className="h-screen">
      {error && (
        <div className="fixed bottom-0 h-64 bg-white w-full rounded-t-3xl flex flex-col items-center justify-center gap-5">
          <img src={noLocationImage} alt="Unable to retrieve location image." />
          <p className="text-gray-400">該裝置不支持 GPS</p>
        </div>
      )}
    </div>
  );
}
