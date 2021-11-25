import React from "react";

const PopularArtist = () => {
  return (
    <div>
      <div className="h-52 2xl:h-60 w-36 2xl:w-44 mr-3 relative group">
        <img
          src="https://image.tmdb.org/t/p/original/oeiwIwNVk2yRpndp8gxtSFMEfDO.jpg"
          alt=""
          className="h-full w-full rounded-lg"
        />
        <div className="absolute bg-black-background bg-opacity-50 h-full w-full top-0 left-0 p-3 flex flex-col opacity-0	 group-hover:opacity-100">
          <span className="text-lg font-semibold text-proj-red">Actor</span>
          <span className="text-lg font-thin">Paul Wesly</span>
        </div>
      </div>
    </div>
  );
};

export default PopularArtist;
