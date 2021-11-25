import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const actorsApi = createApi({
  reducerPath: "actorsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    popularActor: builder.query({
      query: () => `/trending/person/day?api_key=${API_KEY}`,
    }),
    actorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${API_KEY}`,
    }),
    actorSocials: builder.query({
      query: (id) => `/person/${id}/external_ids?api_key=${API_KEY}`,
    }),
    actorsPopular: builder.query({
      query: (id) =>
        `/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`,
    }),
  }),
});
export const {
  usePopularActorQuery,
  useActorSocialsQuery,
  useActorDetailsQuery,
  useActorsPopularQuery,
} = actorsApi;
