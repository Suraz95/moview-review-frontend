import { CatchError, getAuthToken } from "../utils/helper";
import client from "./client";

// Create Actor
export async function createActor(actorInfo) {
   try {
      const { data } = await client.post("/actors/create", actorInfo, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Search Actors
export async function searchActor(query) {
   try {
      const { data } = await client.get(`/actors/search?name=${query}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Fetch Actors for admin UI
export async function getActors(pageNumber, limit) {
   try {
      const { data } = await client.get(`/actors/get-actors?pageNo=${pageNumber}&limit=${limit}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Update Actor
export async function updateActor(actorId, formData) {
   try {
      const { data } = await client.post(`/actors/update/${actorId}`, formData, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Delete Actor
export async function deleteActor(actorId) {
   try {
      const { data } = await client.delete(`/actors/delete/${actorId}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// get Single Actor
export async function getSingleActor(actorId) {
   try {
      const { data } = await client.get(`/actors/actor/${actorId}`);
      return data;
   } catch (error) {
      return CatchError(error);
   }
}
