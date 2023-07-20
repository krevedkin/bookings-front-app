import axios from "axios";
import { CONFIG } from "../config";
const instance = axios.create({
  baseURL: CONFIG.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export class API {
  static async getHotelsList(filterParams) {
    try {
      const response = await instance.get("/hotels", {
        params: { ...filterParams },
      });
      return response.data;
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  static async getHotelData(hotelId) {
    try {
      const response = await instance.get(`/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }
  static async getCitiesList() {
    try {
      const response = await instance.get("/cities");
      return response.data;
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  static async getRoomData(roomId) {
    try {
      const response = await instance.get(`/hotels/rooms/${roomId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  static async addFavoriteHotel(hotelId) {
    try {
      const payload = {
        hotel_id: hotelId,
        user_id: 1,
      };
      const response = await instance.post("/hotels/favorite", payload);
      console.log(response.data);
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  static async deleteFavoriteHotel(hotelId) {
    try {
      const payload = {
        hotel_id: hotelId,
        user_id: 1,
      };
      const response = await instance.delete(`/hotels/favorite`, {
        data: payload,
      });
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }
}
