import { useEffect, useRef, useState } from "react";

import noLocationImage from "../assets/no-location.png";
import EventEmitter from "../utils/EventEmitter.js";

const directionsRenderer = new window.google.maps.DirectionsRenderer();

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

    EventEmitter.on("renderRoute", (pos) => {
      renderRoute(pos);
    });
  }, []);

  useEffect(() => {
    if (places.length > 0) {
      places.forEach((item) => {
        new window.google.maps.marker.AdvancedMarkerElement({
          map: map.current,
          position: item.location,
          content: new window.google.maps.marker.PinElement({
            background: "#4a82ff",
            borderColor: "#a8c2f7",
            glyphColor: "white",
          }).element,
        });
      });
    }
  }, [places]);

  // 搜尋半徑內的地點
  function doSearchNearby(data) {
    const { type, radius } = data;

    window.Place.searchNearby({
      // required parameters
      fields: [
        "displayName",
        "photos",
        "location",
        "businessStatus",
        "regularOpeningHours",
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
      EventEmitter.emit("nearbyPlaces", places);
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

  // 繪製路線
  function renderRoute(pos) {
    // 創建 Directions Service 和 Directions Renderer
    const directionsService = new window.google.maps.DirectionsService();

    directionsRenderer.setMap(map.current);
    directionsService.route(
      {
        origin: window.userLocation,
        destination: pos,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (res, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(res);
        } else {
          alert("路線繪製失敗");
        }
      }
    );
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
