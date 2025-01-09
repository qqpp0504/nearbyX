/* eslint-disable react/prop-types */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import closeIcon from "../assets/close-icon.png";
import Place from "./Place.jsx";
import Comment from "./Comment.jsx";

export default function PlaceDetail({ placeItem, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  console.log(placeItem);
  return (
    <div className="fixed flex flex-col top-[5%] z-20 overflow-hidden h-[95%] w-full bg-white rounded-t-2xl shadow-top">
      <div className="h-[270px] bg-gray-500 relative shrink-0 overflow-hidden z-10">
        <button onClick={onClose} className="absolute z-20 top-4 left-2">
          <img src={closeIcon} alt="Colse icon" />
        </button>

        <Swiper
          className="mySwiper"
          onActiveIndexChange={(s) => {
            setPhotoIndex(s.activeIndex);
          }}
        >
          {placeItem.photos.map((photo) => (
            <SwiperSlide key={photo.getURI()}>
              <img src={photo.getURI()} alt="店家照片" className="w-full" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex text-[10px] items-end absolute right-3 bottom-10 z-20 text-white bg-gray-900 rounded-xl w-fit px-2">
          <span className="text-[12px]">{photoIndex + 1}</span>
          <div className="mx-[2px]">/</div>
          <span>{placeItem.photos.length}</span>
        </div>
      </div>

      <div className="px-4 border-b-8 mt-[-30px] bg-white border-b-gray-100 rounded-t-3xl z-10">
        <Place type={2} placeItem={placeItem} />
      </div>

      <div className="px-4 pt-4 grow overflow-hidden  flex flex-col">
        <span className="text-gray-800 font-semibold">{`評價(${placeItem.reviews.length})`}</span>
        <div className="overflow-scroll grow">
          {placeItem.reviews?.map((review, index) => (
            <Comment key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
