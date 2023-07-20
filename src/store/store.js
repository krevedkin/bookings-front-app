import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CONFIG } from "../config";
import { API } from "../http/api";

export const useHomePageStore = create((set, get) => ({
  // Состояние для Rating компонента (звездочки)
  starsCount: 0,
  setStarsCount: (value) => {
    set((state) => {
      return {
        ...state,
        starsCount: value,
      };
    });
  },

  // Состояние для Slider компонента и текста под ним
  costSliderValues: [0, 10000],
  setCostSliderValues: (event, newValue, activeThumb) => {
    const minDistance = 10;
    if (!Array.isArray(newValue)) {
      return;
    }

    set((state) => {
      if (activeThumb === 0) {
        return {
          costSliderValues: [
            Math.min(newValue[0], state.costSliderValues[1] - minDistance),
            state.costSliderValues[1],
          ],
        };
      } else {
        return {
          costSliderValues: [
            state.costSliderValues[0],
            Math.max(newValue[1], state.costSliderValues[0] + minDistance),
          ],
        };
      }
    });
  },

  // Состояние для SideBar копонента
  isMobileOpen: false,
  setIsMobileOpen: () => {
    set((state) => {
      return {
        ...state,
        isMobileOpen: !state.isMobileOpen,
      };
    });
  },

  //состояние для Select компонента
  dropdownValue: "all",
  places: [],
  fetchPlaces: async () => {
    try {
      const response = await fetch("http://localhost:8000/hotels/locations", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      set({ places: await response.json() });
    } catch (error) {
      console.error(error);
    }
  },
  setDropdownValue: (value) => {
    set((state) => {
      return {
        ...state,
        dropdownValue: value,
      };
    });
  },

  //состояние DateChooser
  dateFrom: null,
  setSelectedDateFrom: (date) => set({ dateFrom: date }),
  dateTo: null,
  setSelectedDateTo: (date) => set({ dateTo: date }),

  // Обработчики кнопок
  handleConfirmButton: async () => {
    const dateFrom = get().dateFrom;
    const dateTo = get().dateTo;
    const starsCount = get().starsCount;
    const [minCost, maxCost] = get().costSliderValues;
    const dropdownValue = get().dropdownValue;

    const data = {
      date_from:
        dateFrom !== null
          ? `${dateFrom["$y"]}-${dateFrom["$M"]}-${dateFrom["$D"]}`
          : null,
      date_to:
        dateTo !== null
          ? `${dateTo["$y"]}-${dateTo["$M"]}-${dateTo["$D"]}`
          : null,
      stars: starsCount !== 0 ? starsCount : null,
      min_price: minCost !== 0 ? minCost : null,
      max_price: maxCost !== 10000 ? maxCost : null,
      city: dropdownValue !== "all" ? dropdownValue : null,
    };

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null)
    );

    get().fetchHotels(filteredData);
  },

  handleResetButton: () => {
    set((state) => ({
      ...state,
      starsCount: 0,
      costSliderValues: [0, 10000],
      dropdownValue: "all",
      dateFrom: null,
      dateTo: null,
    }));
    get().fetchHotels();
  },
  hotels: [],
  loading: false,
  fetchHotels: async (data) => {
    const queryParams = new URLSearchParams({
      ...data,
    });

    try {
      set({ loading: true });
      const response = await fetch(
        `http://localhost:8000/hotels?${queryParams}`
      );
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      const data = await response.json();
      console.log(data);
      set({ hotels: data });
      return data
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export const useHotelPageStore = create((set, get) => ({
  hotelData: null,
  getHotelData: async (hotelId) => {
    try {
      console.log("fetching hotel data");

      const response = await fetch(`http://localhost:8000/hotels/${hotelId}`);
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      const data = await response.json();
      set({ hotelData: data });
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  // handleHotelLikeButton: async (hotelId, isPressed) => {
  //   if (!isPressed) {
  //     await API.addFavoriteHotel(hotelId);
  //     return !isPressed;
  //   } else {
  //     await API.deleteFavoriteHotel(hotelId);
  //     return !isPressed;
  //   }
  // },
}));

export const useAppBarStore = create(
  persist(
    (set, get) => ({
      favoriteBadgeCount: 0,
      bookingBadgeCount: 0,
      isDarkMode: false,
      setIsDarkMode: (value) => set({ isDarkMode: value }),
      setFavoriteBadgeCount: (newValue) =>
        set(() => ({ favoriteBadgeCount: newValue })),
    }),
    { name: "hotel-app-storage" }
  )
);

export const useBookingPageStore = create((set, get) => ({
  hotelData: null,
  roomData: null,
  daysCount: 0,
  totalPrice: 0,

  setHotelName: (name) => {
    set((state) => {
      return {
        ...state,
        hotelName: name,
      };
    });
  },
  getHotelData: async (hotelId) => {
    try {
      console.log("fetching room data");
      const response = await fetch(`http://localhost:8000/hotels/${hotelId}`);
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      const data = await response.json();
      set({ hotelData: data });
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getRoomData: async (roomId) => {
    try {
      console.log("fetching room data");
      const response = await fetch(
        `http://localhost:8000/hotels/rooms/${roomId}`
      );
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      const data = await response.json();
      set({ roomData: data });
      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));
