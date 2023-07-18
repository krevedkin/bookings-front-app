import { create } from "zustand";

export const useSideBarStore = create((set, get) => ({
  // Состояние для Rating компонента (звездочки)
  starsCount: 0,
  setStarsCount: (value) => {
    set((state) => {
      console.log(state.starsCount);
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
    console.log("fetching places.....");

    try {
      const response = await fetch("http://localhost:8000/hotels/locations", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      set({ places: await response.json() });
    } catch (error) {
      console.log(error);
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
  handleConfirmButton: () => {
    const dateFrom = get().dateFrom;
    const dateTo = get().dateTo;
    const starsCount = get().starsCount;
    const [minCost, maxCost] = get().costSliderValues;
    const dropdownValue = get().dropdownValue;

    const data = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      starsCount: starsCount,
      minCost: minCost,
      maxCost: maxCost,
      dropdownValue: dropdownValue,
    };

    console.log(data);
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
  },

  testData: "hello im from first store",
}));

export const useHotelsStore = create((set, get) => ({
  hotels: [],
  loading: false,

  fetchHotels: async () => {
    console.log("fetching hotels....");
    try {
      set({ loading: true });
      const response = await fetch("http://localhost:8000/hotels", {
        body: JSON.stringify(useSideBarStore.getState().data)
      });
      if (!response.ok) throw new Error("Failed to fetch! Try again");
      set({ hotels: await response.json() });
      console.log(get().hotels);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  hotelImages: [],
  addHotelImage: (image) =>
    set((state) => ({ hotelImages: [...state.hotelImages, image] })),

  // fetchHotelImage: async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/hotels/image");
  //     if (!response.ok) {
  //       throw new Error("Failed to load the image");
  //     }

  //     const blob = await response.blob();
  //     const imageUrl = URL.createObjectURL(blob);

  //     return imageUrl;
  //   } catch (error) {
  //     console.error("Error loading image:", error);
  //     return null;
  //   }
  // },

  useTestData: () => {
    console.log(useSideBarStore.getState().testData);
  },
}));
