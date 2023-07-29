import axios from "axios";
import { CONFIG } from "../config";
import { parse_jwt } from "../utils/jwt";
const instance = axios.create({
  withCredentials: true,
  baseURL: CONFIG.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const response = await axios.post(
          `${CONFIG.baseUrl}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("access_token", response.data.access_token);
        return instance.request(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
  }
);

export class API {
  static async getHotelsList(filterParams) {
    try {
      return await instance.get("/hotels", {
        params: { ...filterParams },
      });
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  static async getHotelData(hotelId) {
    try {
      return await instance.get(`/hotels/${hotelId}`);
    } catch (error) {
      throw error;
    }
  }
  static async getCitiesList() {
    try {
      return await instance.get("hotels/cities");
    } catch (error) {
      throw error;
    }
  }

  static async getRoomData(roomId) {
    try {
      return await instance.get(`/hotels/rooms/${roomId}`);
    } catch (error) {
      throw error;
    }
  }

  //TODO тут харкод юзера
  static async addFavoriteHotel(hotelId) {
    try {
      const payload = {
        hotel_id: hotelId,
      };
      const response = await instance.post("/hotels/favorite", payload);
      console.log(response.data);
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  //TODO тут харкод юзера
  static async deleteFavoriteHotel(hotelId) {
    try {
      const payload = {
        hotel_id: hotelId,
        user_id: 1,
      };
      return await instance.delete(`/hotels/favorite`, {
        data: payload,
      });
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  static async registerUser(email, password) {
    const payload = {
      email: email,
      password: password,
    };
    const config = {
      baseURL: CONFIG.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      return await axios.post("/auth/register", payload, config);
    } catch (error) {
      throw error;
    }
  }
  static async loginUser(email, password) {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      baseURL: CONFIG.baseUrl,
    };

    const payload = {
      username: email,
      password: password,
    };
    try {
      const response = await axios.post("/auth/token", payload, config);
      const token = response.data.access_token;
      if (token) {
        const token_data = parse_jwt(token);
        localStorage.setItem("access_token", token);
        return { status: response.status, username: token_data.sub };
      }
    } catch (error) {
      throw error;
    }
  }
  static async logoutUser() {
    try {
      const response = await instance.post("/auth/logout");
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
    }
  }
}
