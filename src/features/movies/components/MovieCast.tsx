import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CastMember } from "../interfaces/credits.interface";

interface Props {
  cast: CastMember[];
}

export const MovieCast = ({ cast }: Props) => {
  if (!cast || cast.length === 0) return null;

  return (
    <View className="mt-8">
      <View className="px-5 mb-4 flex-row items-center justify-between">
        <Text className="text-base font-bold text-foreground dark:text-foreground-dark">
          Reparto Principal
        </Text>
        <Text className="text-xs text-primary font-semibold">
          {cast.length} actores
        </Text>
      </View>

      <FlatList
        data={cast.slice(0, 15)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View className="mr-4 w-20 items-center">
            {/* Contenedor con tamaño en píxeles fijos (80x80) */}
            <View
              style={{ width: 80, height: 80 }}
              className="rounded-2xl overflow-hidden bg-zinc-800 border border-border/50 dark:border-border-dark/50 shadow-sm"
            >
              <Image
                source={{ uri: item.avatar }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>

            <Text
              numberOfLines={1}
              className="mt-2 text-xs font-semibold text-center text-foreground dark:text-foreground-dark"
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              className="text-[10px] text-center text-foreground-muted dark:text-foreground-muted-dark mt-0.5"
            >
              {item.character}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
