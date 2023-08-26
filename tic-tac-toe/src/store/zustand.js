import { create } from "zustand";

const useStore = create((set) => ({
  squares: Array(9).fill(null),
  xIsNext: true,
  setSquares: (data) => set({ squares: data }),
  setXIsNext: (data) => set({ xIsNext: data }),
}));

export default useStore;
