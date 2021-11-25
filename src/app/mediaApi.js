import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    mediaTrending: builder.query({
      query: (args) => {
        const { type } = args;
        return `/trending/${type}/week?api_key=${API_KEY}`;
      },
    }),
    mediaTrendingDay: builder.query({
      query: (args) => {
        const { type } = args;
        return `/trending/${type}/day?api_key=${API_KEY}`;
      },
    }),
    mediaPopular: builder.query({
      query: (args) => {
        const { type } = args;
        return `/${type}/popular?api_key=${API_KEY}`;
      },
    }),
    freeToWatch: builder.query({
      query: (args) => {
        const { type } = args;
        return `/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=free&with_status=0&with_type=0`;
      },
    }),
    upComingMedia: builder.query({
      query: () => `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    }),
    mediaWatchProviders: builder.query({
      query: (args) => {
        const { type } = args;
        return `/${type}/580489/watch/providers?api_key=${API_KEY}`;
      },
    }),
    mediaCast: builder.query({
      query: (args) => {
        const { type, id } = args;
        return `/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`;
      },
    }),
    similarMedia: builder.query({
      query: (args) => {
        const { type, id } = args;
        return `/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
      },
    }),
    mediaVideos: builder.query({
      query: (args) => {
        const { type, id } = args;
        return `/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`;
      },
    }),
    movieDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}&language=en-US`,
    }),
  }),
});
export const {
  useMediaTrendingQuery,
  useMediaTrendingDayQuery,
  useMediaPopularQuery,
  useFreeToWatchQuery,
  useUpComingMediaQuery,
  useMovieDetailsQuery,
  useMediaWatchProvidersQuery,
  useMediaCastQuery,
  useSimilarMediaQuery,
  useMediaVideosQuery,
} = mediaApi;
