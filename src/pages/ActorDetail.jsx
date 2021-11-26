import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import {
  useActorDetailsQuery,
  useActorSocialsQuery,
  useActorsPopularQuery,
} from "../app/actorsApi";

const ActorDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: actor, isLoading: isActorLoading } = useActorDetailsQuery(
    params.id
  );
  const { data: actorSocial, isLoading: socialLoading } = useActorSocialsQuery(
    params.id
  );
  const { data: actorPopular, isLoading: popularLoading } =
    useActorsPopularQuery(params.id);
  const handleClick = (type, id) => {
    if (type) {
      return navigate(`/tv-detail/${id}/1`);
    }
    return navigate(`/movie-detail/${id}`);
  };
  return (
    !isActorLoading && (
      <div className="bg-black-background h-screen p-8 hideScrollBar">
        <div
          className="p-3 bg-white bg-opacity-60 text-black rounded-full mr-6 w-max"
          onClick={() => navigate("/")}
        >
          <IoMdArrowBack className="cursor-pointer text-2xl" />
        </div>
        <div className="h-max p-4 flex mt-2 w-full">
          <div className="h-full w-2/12">
            <img
              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
              alt={actor.name}
              className="h-96 w-max rounded-lg"
            />
            {!socialLoading && (
              <div className="text-white flex  mt-5 text-4xl">
                {actorSocial.facebook_id && (
                  <a
                    href={`https://www.facebook.com/${actorSocial.facebook_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillFacebook className="mr-3 cursor-pointer" />
                  </a>
                )}

                {actorSocial.twitter_id && (
                  <a
                    href={`https://www.instagram.com/${actorSocial.twitter_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineTwitter className="mr-3 cursor-pointer" />
                  </a>
                )}

                {actorSocial.instagram_id && (
                  <a
                    href={`https://www.instagram.com/${actorSocial.instagram_id}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineInstagram className="mr-3 cursor-pointer" />
                  </a>
                )}
              </div>
            )}

            <div className="text-white mt-6 flex flex-col">
              <span className="text-xl">Personal Info</span>
              <div className="flex  flex-col mt-5">
                <span className="font-semibold text-lg">Known For</span>
                <span className="font-thin text-lg -mt-1">
                  {actor.known_for_department}
                </span>
              </div>{" "}
              <div className="flex  flex-col mt-5">
                <span className="font-semibold text-lg">Popularity</span>
                <span className="font-thin text-lg -mt-1">
                  {actor.popularity * 10} %
                </span>
              </div>{" "}
              <div className="flex  flex-col mt-5">
                <span className="font-semibold text-lg">Gender</span>
                <span className="font-thin text-lg -mt-1">
                  {actor.gender === 2 && "Male"}
                  {actor.gender === 1 && "Female"}
                </span>
              </div>{" "}
              <div className="flex  flex-col mt-5">
                <span className="font-semibold text-lg">Birthday</span>
                <span className="font-thin text-lg -mt-1">
                  {actor.birthday}
                </span>
              </div>{" "}
              <div className="flex  flex-col mt-5">
                <span className="font-semibold text-lg">Place of Birth</span>
                <span className="font-thin text-lg -mt-1">
                  {actor.place_of_birth}
                </span>
              </div>{" "}
              <div className="flex  flex-col mt-5">
                <span className="font-semibold text-lg">Also Know As</span>
                {actor.also_known_as.map((item) => (
                  <span className="font-thin text-lg mt-1">{item}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-10/12 ml-5 text-white">
            <span className="text-4xl font-semibold">{actor.name}</span>
            <div className="flex flex-col mt-10 w-9/12">
              <span className="text-xl font-semibold">Biography</span>
              <p className="mt-5 text-lg">{actor.biography}</p>
            </div>
            <div className="mt-12">
              <span className="text-2xl font-semibold">Popular For</span>
              {!popularLoading && (
                <div className="flex mb-3 w-11/12 mt-6 flex-wrap h-96 hideScrollBar cursor-pointer">
                  {actorPopular.cast.map(
                    (popular) =>
                      popular.poster_path && (
                        <div
                          key={popular.key}
                          className="h-64 w-40 mr-5 mb-8 flex flex-col  items-center"
                          onClick={() =>
                            handleClick(popular.media_type === "tv", popular.id)
                          }
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original${popular.poster_path}`}
                            alt=""
                            className="h-full w-max rounded-xl mb-1"
                          />
                          <span className="text-white  text-sm">
                            {popular.title}
                          </span>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ActorDetail;
