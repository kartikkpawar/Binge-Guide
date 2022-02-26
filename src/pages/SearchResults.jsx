import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { useSearchQueryQuery } from "../app/mediaApi";
import { useSearchParams } from "react-router-dom";
import GlobalMovie from "../components/GlobalMovie";
const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useSearchQueryQuery(searchParams.get("search"));

  return (
    <div className="bg-black-background h-screen p-8 hideScrollBar">
      <div
        className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6 w-max mb-8"
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack className="cursor-pointer text-2xl" />
      </div>
      <span className="my-5 text-4xl text-white">
        {data?.total_results > 0 ? "Results" : "Nothing Found. Try Again"}
      </span>
      <div className="h-full w-full hideScrollBar flex flex-wrap mx-auto mt-8">
        {!isLoading &&
          data?.total_results > 0 &&
          data?.results?.map(
            (result) =>
              result.media_type !== "person" && (
                <GlobalMovie
                  type={result.media_type === "tv" ? true : false}
                  name={result.title || result.original_name}
                  date={result.first_air_date || result.release_date}
                  image={result.poster_path}
                  id={result.id}
                  white
                />
              )
          )}
      </div>
    </div>
  );
};

export default SearchResults;
