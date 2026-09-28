import { useFavoritesStore } from "@/features/favorites/store/favorites.store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  id: number;
  title: string;
  backdrop?: string;
  poster?: string;
  rating?: number;
}

const HEADER_HEIGHT = 380;

export const MovieHeader = ({ id, title, backdrop, poster, rating }: Props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const imageUri = backdrop || poster;

  // Selector reactivo en Zustand
  const isFav = useFavoritesStore((state) =>
    state.favorites.some((fav) => Number(fav.id) === Number(id)),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const handleToggleFavorite = () => {
    // Validar que id y title existan antes de llamar a toggleFavorite
    if (!id || isNaN(Number(id)) || Number(id) <= 0 || !title?.trim()) {
      console.warn(
        "❌ No se puede guardar en favoritos: id o title no válidos",
        {
          id,
          title,
        },
      );
      return;
    }

    toggleFavorite({
      id: Number(id),
      title: title.trim(),
      poster: poster || "",
      rating: rating ?? 0,
    });
  };

  return (
    <View
      style={{
        width: "100%",
        height: HEADER_HEIGHT,
        backgroundColor: "#18181b",
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
      />

      {/* Degradado superior */}
      <LinearGradient
        colors={["rgba(0,0,0,0.75)", "transparent"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: insets.top + 70,
        }}
      />

      {/* Degradado inferior */}
      <LinearGradient
        colors={["transparent", "rgba(9, 9, 11, 0.6)", "rgba(9, 9, 11, 1)"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
        }}
      />

      {/* Botones de navegación y acción */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 8,
          left: 16,
          right: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="w-10 h-10 rounded-full items-center justify-center bg-black/50 border border-white/20 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </Pressable>

        <Pressable
          onPress={handleToggleFavorite}
          hitSlop={12}
          className="w-10 h-10 rounded-full items-center justify-center bg-black/50 border border-white/20 active:opacity-70"
        >
          <Ionicons
            name={isFav ? "bookmark" : "bookmark-outline"}
            size={20}
            color={isFav ? "#f59e0b" : "#ffffff"}
          />
        </Pressable>
      </View>
    </View>
  );
};
