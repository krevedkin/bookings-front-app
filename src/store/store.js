import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API } from "../http/api";

export const authStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    { name: "hotel-app-auth" }
  )
);

export const useHomePageStore = create((set, get) => ({
  // Состояние для Rating компонента (звездочки)
  starsCount: 0,
  setStarsCount: (value) => {
    set({ starsCount: value });
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
  setIsMobileOpen: () => set({ isMobileOpen: !get().isMobileOpen }),

  //состояние для Select компонента
  dropdownValue: "all",
  cities: [],
  getCities: async () => {
    try {
      const response = await API.getCitiesList();
      set({ cities: response?.data });
    } catch (error) {
      console.error(error, "Невозможно получить список городов");
    }
  },
  setDropdownValue: (value) => {
    set({ dropdownValue: value });
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
          ? `${dateFrom["$y"]}-${dateFrom["$M"] + 1}-${dateFrom["$D"]}`
          : null,
      date_to:
        dateTo !== null
          ? `${dateTo["$y"]}-${dateTo["$M"] + 1}-${dateTo["$D"]}`
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
    set({
      starsCount: 0,
      costSliderValues: [0, 10000],
      dropdownValue: "all",
      dateFrom: null,
      dateTo: null,
    });
    get().fetchHotels();
  },

  // список отелей
  hotels: [],
  loading: false,
  fetchHotels: async (filterParams) => {
    try {
      set({ loading: true });
      const response = await API.getHotelsList(filterParams);
      set({ hotels: response?.data });
      return response;
    } catch (error) {
      console.error(error, "Невозможно получить список отелей");
    } finally {
      set({ loading: false });
    }
  },

  fetchFavoriteHotels: async () => {
    try {
      set({ loading: true });
      const response = await API.getHotelsList({ favorites_only: true });
      set({ hotels: response?.data });
    } catch (error) {
      console.error(error, "Невозможно получить список избранных отелей");
    } finally {
      set({ loading: false });
    }
  },

  //заголовок страницы
  pageTitle: "Все отели",
  setPageTitle: (title) => {
    set({ pageTitle: title });
  },
}));

export const useHotelPageStore = create((set) => ({
  hotelData: null,
  getHotelData: async (hotelId) => {
    try {
      const response = await API.getHotelData(hotelId);
      set({ hotelData: response?.data });
      return response;
    } catch (error) {
      console.error(error, "Невозможно получить данные об отеле");
    }
  },
}));

export const useAppBarStore = create(
  persist(
    (set, get) => ({
      favoriteBadgeCount: 0,
      bookingBadgeCount: 0,
      isDarkMode: false,
      userName: null,
      setUserName: (userName) => set({ userName: userName }),
      setIsDarkMode: (value) => set({ isDarkMode: value }),

      setFavoriteBadgeCount: (newValue) =>
        set(() => ({ favoriteBadgeCount: newValue })),
    }),

    {
      name: "hotel-app-storage",
    }
  )
);

export const useBookingPageStore = create((set, get) => ({
  hotelData: null,
  roomData: null,
  daysCount: 0,
  totalPrice: 0,

  getRoomData: async (roomId) => {
    try {
      const response = await API.getRoomData(roomId);
      set({ roomData: response?.data });
      return response;
    } catch (error) {
      console.error(error, "Невозможно получить данные о комнате");
    }
  },
}));

export const useLoginFormStore = create((set, get) => ({
  errorMessage: null,
  setErrorMessage: (msg) => set({ errorMessage: msg }),

  emailValue: "",
  setEmailValue: (value) => set({ emailValue: value }),

  passwordValue: "",
  setPasswordValue: (value) => set({ passwordValue: value }),

  sumbitLogin: async () => {
    try {
      return await API.loginUser(get().emailValue, get().passwordValue);
    } catch (error) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            set({ errorMessage: "Неправильный логин или пароль" });
            break;
          case 422:
            set({ errorMessage: "Не указан логин или пароль" });
            break;
          case 500:
            set({ errorMessage: "Ошибка сервера, попробуйте позже" });
            break;
          default:
            set({ errorMessage: "Неизвестная ошибка" });
        }
      } else {
        set({ errorMessage: "Нет ответа от сервера" });
      }
    }
  },
}));

export const useRegistrationFormStore = create((set, get) => ({
  errorMessage: null,
  setErrorMessage: (msg) => set({ errorMessage: msg }),

  emailValue: "",
  setEmailValue: (value) => set({ emailValue: value }),

  passwordValue: "",
  setPasswordValue: (value) => set({ passwordValue: value }),

  passwordConfirmValue: "",
  setPasswordConfirmValue: (value) => set({ passwordConfirmValue: value }),

  submitRegistration: async () => {
    try {
      return await API.registerUser(get().emailValue, get().passwordValue);
    } catch (error) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 409:
            set({ errorMessage: "Пользователь с таким email уже существует" });
            break;
          case 422:
            set({ errorMessage: "Не указан логин или пароль" });
            break;
          default:
            set({ errorMessage: "Неизвестная ошибка" });
        }
      } else {
        set({ errorMessage: "Нет ответа от сервера" });
      }
    }
  },
}));
