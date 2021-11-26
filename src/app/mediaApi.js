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
        const { type, id } = args;
        return `/${type}/${id}/watch/providers?api_key=${API_KEY}`;
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
    mediaDetails: builder.query({
      query: (args) => {
        const { type, id } = args;
        return `/${type}/${id}?api_key=${API_KEY}&language=en-US`;
      },
    }),
    tvSeasonDetails: builder.query({
      query: (args) => {
        const { id, seasonNumber } = args;
        return `/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;
      },
    }),
    searchQuery: builder.query({
      query: (query) =>
        `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    }),
    discoverMedia: builder.query({
      query: (args) => {
        const { search, type } = args;
        return `/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_keywords=${search}&with_watch_monetization_types=flatrate`;
      },
    }),
    ottList: builder.query({
      query: (type) =>
        `/watch/providers/${type}?api_key=${API_KEY}&language=en-US`,
    }),
  }),
});
export const {
  useMediaTrendingQuery,
  useMediaTrendingDayQuery,
  useMediaPopularQuery,
  useFreeToWatchQuery,
  useUpComingMediaQuery,
  useMediaDetailsQuery,
  useMediaWatchProvidersQuery,
  useMediaCastQuery,
  useSimilarMediaQuery,
  useMediaVideosQuery,
  useTvSeasonDetailsQuery,
  useSearchQueryQuery,
  useDiscoverMediaQuery,
  useOttListQuery,
} = mediaApi;
