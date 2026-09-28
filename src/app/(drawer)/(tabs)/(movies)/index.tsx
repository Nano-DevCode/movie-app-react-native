import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MovieHorizontalList from "@/features/movies/components/MovieHorizontalList";
import { useMovies } from "@/features/movies/hooks/useMovies";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { SectionHeader } from "@/shared/components/SectionHeader";

const HomeScreen = () => {
  const { nowPlaying, popular, topRated, upcoming } = useMovies();
  const safeArea = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Recarga todas las listas invalidando la caché de TanStack Query
  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["movies"] });
    setIsRefreshing(false);
  };

  // Pantalla de carga inicial (solo mientras la cartelera principal no tenga datos)
  if (nowPlaying.isLoading && nowPlaying.movies.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background dark:bg-background-dark"
      contentContainerStyle={{
        paddingTop: 8,
        paddingBottom: Math.max(safeArea.bottom, 32),
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="#818cf8"
          colors={["#818cf8"]}
        />
      }
    >
      {/* 1. NOW PLAYING (Destacadas / Tamaño Grande con Zoom) */}
      <View className="mb-4">
        <SectionHeader
          size="lg"
          align="left"
          badge="En Cartelera"
          title="Estrenos en Cines"
          subtitle="Las producciones más recientes que están llenando las salas"
        />
        <MovieHorizontalList
          movies={nowPlaying.movies}
          size="lg"
          loadNextPage={nowPlaying.nextLoadPage}
          isLoadingNextPage={nowPlaying.isFetchingNextPage}
        />
      </View>

      {/* 2. POPULARES */}
      {popular.movies.length > 0 && (
        <View className="mb-4">
          <SectionHeader
            size="md"
            align="left"
            badge="Tendencia"
            title="Lo Más Visto de la Semana"
            subtitle="Las historias favoritas que todo el mundo está comentando"
          />
          <MovieHorizontalList
            movies={popular.movies}
            size="md"
            loadNextPage={popular.nextLoadPage}
            isLoadingNextPage={popular.isFetchingNextPage}
          />
        </View>
      )}

      {/* 3. MEJOR VALORADAS */}
      {topRated.movies.length > 0 && (
        <View className="mb-4">
          <SectionHeader
            size="md"
            align="left"
            badge="Aclamadas"
            title="Joyas de la Crítica"
            subtitle="Producciones con la mayor puntuación de la audiencia y especialistas"
          />
          <MovieHorizontalList
            movies={topRated.movies}
            size="md"
            loadNextPage={topRated.nextLoadPage}
            isLoadingNextPage={topRated.isFetchingNextPage}
          />
        </View>
      )}

      {/* 4. PRÓXIMAMENTE */}
      {upcoming.movies.length > 0 && (
        <View className="mb-4">
          <SectionHeader
            size="md"
            align="left"
            badge="Muy Pronto"
            title="Próximos Lanzamientos"
            subtitle="Agrega a tu radar los títulos más esperados del año"
          />
          <MovieHorizontalList
            movies={upcoming.movies}
            size="sm"
            loadNextPage={upcoming.nextLoadPage}
            isLoadingNextPage={upcoming.isFetchingNextPage}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
