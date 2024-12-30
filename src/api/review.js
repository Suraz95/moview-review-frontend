import { CatchError, getAuthToken } from "../utils/helper";
import client from "./client";

// Add Review @POST
export async function addReview(formData, movieId) {
   try {
      const { data } = await client.post(`/reviews/add/${movieId}`, formData, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// get reviews for movie @GET
export async function getReviewsByMovie(movieId) {
   try {
      const { data } = await client.get(`/reviews/get-reviews-by-movie/${movieId}`);
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Delete Review @DELETE
export async function deleteReview(reviewId) {
   try {
      const { data } = await client.delete(`/reviews/remove/${reviewId}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Delete Review @PATCH
export async function editReview(reviewId, formData) {
   try {
      const { data } = await client.patch(`/reviews/edit/${reviewId}`, formData, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}
