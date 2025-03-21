import { create } from "zustand";

export const useAuthStore = create((set) => ({
    token: localStorage.getItem("jwt") || null,  // 초기 상태
    setToken: (token) => set({ token }),  // 토큰 저장
    logout: () => {
        localStorage.removeItem("jwt");  // 로그아웃 시 토큰 삭제
        set({ token: null });
    },
}));
