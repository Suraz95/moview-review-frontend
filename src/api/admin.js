import { CatchError, getAuthToken } from "../utils/helper";
import client from "./client";

export async function getAdminStats() {
   try {
      const { data } = await client.get("/admin/stats", {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}
