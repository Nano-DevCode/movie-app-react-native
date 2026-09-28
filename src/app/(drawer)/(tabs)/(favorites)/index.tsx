import { useFavoritesStore } from "@/features/favorites/store/favorites.store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
    FlatList,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const favorites = useFavoritesStore((state) => state.favorites ?? []);

  const numColumns = screenWidth > 600 ? 4 : 2;
  const columnWidth = Math.floor(
    (screenWidth - 32 - (numColumns - 1) * 16) / numColumns,
  );

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 rounded-full items-center justify-center bg-zinc-100 dark:bg-zinc-800 mb-4">
            <Ionicons name="bookmark-outline" size={38} color="#71717a" />
          </View>
          <Text className="text-lg font-bold text-foreground dark:text-foreground-dark text-center">
            Aún no tienes favoritos
          </Text>
          <Text className="text-xs text-foreground-muted dark:text-foreground-muted-dark text-center mt-1.5 max-w-[260px]">
            Explora las películas y presiona el ícono del marcador en la esquina
            superior para guardarlas aquí.
          </Text>
        </View>
      ) : (
        <FlatList
          key={numColumns}
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          numColumns={numColumns}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: insets.bottom + 32,
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/movie/[id]",
                  params: { id: String(item.id) },
                })
              }
              className="mb-4 rounded-2xl overflow-hidden bg-surface dark:bg-surface-dark border border-border/40 dark:border-border-dark/40 shadow-sm active:opacity-80"
              style={{ width: columnWidth }}
            >
              <View style={{ width: columnWidth, height: columnWidth * 1.5 }}>
                <Image
                  source={{ uri: item.poster }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  transition={200}
                  cachePolicy="memory-disk"
                />
                {item.rating != null && item.rating > 0 && (
                  <View className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm">
                    <Text className="text-white text-[10px] font-bold">
                      ★ {item.rating.toFixed(1)}
                    </Text>
                  </View>
                )}
              </View>
              <View className="p-2.5">
                <Text
                  numberOfLines={1}
                  className="text-xs font-bold text-foreground dark:text-foreground-dark"
                >
                  {item.title}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
