// src/features/favorites/store/favorites.store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FavoriteMovie {
  id: number;
  title: string;
  poster: string;
  rating?: number;
}

interface FavoritesState {
  favorites: FavoriteMovie[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  toggleFavorite: (movie: FavoriteMovie) => void;
  isFavorite: (id: number | string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      _hasHydrated: false,

      setHasHydrated: (status: boolean) => {
        set({ _hasHydrated: status });
      },

      toggleFavorite: (movie: FavoriteMovie) => {
        if (!movie || movie.id == null) return;

        const targetId = Number(movie.id);
        // Validar estrictamente que el objeto recibido tenga un ID numérico válido (> 0)
        if (isNaN(targetId) || targetId <= 0) return;

        const currentFavorites = (get().favorites ?? []).filter(
          (fav) => fav && fav.id != null && !isNaN(Number(fav.id)) && Number(fav.id) > 0
        );

        const exists = currentFavorites.some((fav) => Number(fav.id) === targetId);

        if (exists) {
          set({
            favorites: currentFavorites.filter((fav) => Number(fav.id) !== targetId),
          });
        } else {
          const sanitizedMovie: FavoriteMovie = {
            id: targetId,
            title: movie.title?.trim() || "Sin título",
            poster: movie.poster || "",
            rating: typeof movie.rating === "number" ? movie.rating : 0,
          };

          set({
            favorites: [sanitizedMovie, ...currentFavorites],
          });
        }
      },

      isFavorite: (id: number | string) => {
        if (id == null) return false;
        const targetId = Number(id);
        if (isNaN(targetId) || targetId <= 0) return false;

        return (get().favorites ?? []).some(
          (fav) => Number(fav.id) === Number(id)
        );
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "movie-favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // Se ejecuta cuando AsyncStorage termina de leer los datos del teléfono
        state?.setHasHydrated(true);
      },
    }
  )
);