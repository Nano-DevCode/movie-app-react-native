import { MovieCast } from "@/features/movies/components/MovieCast";
import { MovieHeader } from "@/features/movies/components/MovieHeader";
import { MovieStats } from "@/features/movies/components/MovieStats";
import { useMovie } from "@/features/movies/hooks/useMovie";
import { appColors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useGlobalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MovieDetailScreen() {
  const router = useRouter();
  const globalParams = useGlobalSearchParams<{
    id?: string;
    movieId?: string;
  }>();
  const insets = useSafeAreaInsets();

  const rawId =
    globalParams.id ||
    globalParams.movieId ||
    (Object.values(globalParams)[0] as string | undefined);
  const movieId = Number(rawId);
  const hasValidId = !isNaN(movieId) && movieId > 0;

  const { movie, cast, isLoading, isError, refetch } = useMovie(
    hasValidId ? movieId : undefined,
  );

  if (!hasValidId) {
    return (
      <View
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="flex-1 items-center justify-center bg-background dark:bg-background-dark px-6"
      >
        <Ionicons name="alert-circle-outline" size={48} color="#f59e0b" />
        <Text className="mt-4 text-base font-bold text-foreground dark:text-foreground-dark">
          ID de película no válido
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-5 px-5 py-2.5 rounded-xl bg-primary active:opacity-80"
        >
          <Text className="text-white font-semibold text-xs">Volver</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading || !movie) {
    return (
      <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
        <ActivityIndicator size="large" color={appColors.primary.DEFAULT} />
        <Text className="mt-3 text-xs text-foreground-muted dark:text-foreground-muted-dark font-medium">
          Cargando detalles de la película...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark px-6">
        <Ionicons name="film-outline" size={48} color="#ef4444" />
        <Text className="mt-4 text-base font-bold text-foreground dark:text-foreground-dark">
          No se encontró la película
        </Text>
        <Pressable
          onPress={() => refetch()}
          className="mt-5 px-5 py-2.5 rounded-xl bg-primary active:opacity-80"
        >
          <Text className="text-white font-semibold text-xs">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        {/* 1. Header con datos verificados de la película */}
        <MovieHeader
          id={movie.id}
          title={movie.title}
          backdrop={movie.backdrop}
          poster={movie.poster}
          rating={movie.rating}
        />

        {/* 2. Poster flotante superpuesto y Título */}
        <View className="px-5 -mt-20 flex-row items-end">
          <View
            style={{ width: 112, height: 160 }}
            className="rounded-2xl overflow-hidden border-2 border-background dark:border-background-dark shadow-2xl bg-zinc-800"
          >
            <Image
              source={{ uri: movie.poster }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
            />
          </View>

          <View className="flex-1 ml-4 pb-2">
            <Text
              numberOfLines={2}
              className="text-xl font-black text-foreground dark:text-foreground-dark"
            >
              {movie.title}
            </Text>

            {movie.originalTitle && movie.originalTitle !== movie.title && (
              <Text
                numberOfLines={1}
                className="text-xs italic text-foreground-muted dark:text-foreground-muted-dark mt-0.5"
              >
                {movie.originalTitle}
              </Text>
            )}

            <Text className="text-xs font-semibold text-primary mt-1">
              {movie.releaseDate.getFullYear()}
            </Text>
          </View>
        </View>

        {/* 3. Tags de Géneros */}
        {movie.genres && movie.genres.length > 0 && (
          <View className="flex-row flex-wrap gap-2 px-5 mt-5">
            {movie.genres.map((genre) => (
              <View
                key={genre}
                className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              >
                <Text className="text-[11px] font-semibold text-primary">
                  {genre}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* 4. Tarjetas de Métricas */}
        <MovieStats
          budget={movie.budget}
          duration={movie.duration}
          rating={movie.rating}
          companies={movie.productionCompanies}
        />

        {/* 5. Sinopsis */}
        <View className="px-5 mt-7">
          <Text className="text-base font-bold text-foreground dark:text-foreground-dark mb-2">
            Sinopsis
          </Text>
          <Text className="text-sm leading-6 text-foreground-muted dark:text-foreground-muted-dark">
            {movie.description}
          </Text>
        </View>

        {/* 6. Reparto */}
        <MovieCast cast={cast} />
      </ScrollView>
    </View>
  );
}
