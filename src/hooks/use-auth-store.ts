import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/lib/api-client';
import type { User, AuthResponse, LoginPayload, SignupPayload } from '@shared/types';
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: () => boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: () => !!get().token,
      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api<AuthResponse>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          set({ user: data.user, token: data.token, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },
      signup: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api<AuthResponse>('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          set({ user: data.user, token: data.token, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'lexguard-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);