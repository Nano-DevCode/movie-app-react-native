import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Movie } from "../interfaces/movie.interface";

type ListSize = "sm" | "md" | "lg";

interface Props {
  movies: Movie[];
  title?: string;
  size?: ListSize;
  loadNextPage?: () => void;
  isLoadingNextPage?: boolean;
}

const SPACING = 14;

const SIZE_CONFIG: Record<
  ListSize,
  { visibleItems: number; showOverlay: boolean; radius: string }
> = {
  lg: {
    visibleItems: 2.2,
    showOverlay: true,
    radius: "rounded-2xl",
  },
  md: {
    visibleItems: 3.1,
    showOverlay: false,
    radius: "rounded-xl",
  },
  sm: {
    visibleItems: 4.1,
    showOverlay: false,
    radius: "rounded-lg",
  },
};

const MovieHorizontalList = ({
  movies,
  title,
  size = "md",
  loadNextPage,
  isLoadingNextPage = false,
}: Props) => {
  const router = useRouter();
  const { width: PAGE_WIDTH } = useWindowDimensions();
  const isLandscape = PAGE_WIDTH > 500;
  const orientationKey = isLandscape ? "landscape" : "portrait";

  const [scrollX] = useState(() => new Animated.Value(0));
  const onEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    scrollX.setValue(0);
  }, [orientationKey, scrollX]);

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
      }),
    [scrollX],
  );

  const baseConfig = SIZE_CONFIG[size];
  const visibleItems = isLandscape
    ? baseConfig.visibleItems + 1.8
    : baseConfig.visibleItems;
  const { showOverlay, radius } = baseConfig;

  const itemWidth = Math.round(PAGE_WIDTH / visibleItems);
  const itemHeight = Math.round(itemWidth * 1.5);
  const snapInterval = itemWidth + SPACING;
  const horizontalPadding = Math.max(
    0,
    Math.round((PAGE_WIDTH - itemWidth) / 2),
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: snapInterval,
      offset: snapInterval * index,
      index,
    }),
    [snapInterval],
  );

  if (!movies || movies.length === 0) {
    return null;
  }

  const handleEndReached = () => {
    if (
      !onEndReachedCalledDuringMomentum.current &&
      !isLoadingNextPage &&
      loadNextPage
    ) {
      loadNextPage();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  return (
    <View className="my-3">
      {title && (
        <View className="px-5 mb-2.5 flex-row items-center justify-between">
          <Text className="text-xl font-bold tracking-tight text-foreground dark:text-foreground-dark">
            {title}
          </Text>
        </View>
      )}

      <Animated.FlatList
        key={orientationKey}
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingVertical: 12, // Margen extra para que el scale y el translateY no corten la sombra superior
        }}
        snapToInterval={snapInterval}
        snapToAlignment="center"
        decelerationRate="fast"
        bounces={false}
        getItemLayout={getItemLayout}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={false} // Evita parpadeos en los bordes agrandados
        ListFooterComponent={
          isLoadingNextPage ? (
            <View
              style={{ width: itemWidth, height: itemHeight }}
              className="items-center justify-center mr-4"
            >
              <ActivityIndicator size="small" color="#818cf8" />
              <Text className="mt-2 text-[10px] text-foreground-muted dark:text-foreground-muted-dark">
                Cargando...
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * snapInterval,
            index * snapInterval,
            (index + 1) * snapInterval,
          ];

          // 1. Escala: 0.88 en laterales -> 1.08 en centro
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.88, 1.08, 0.88],
            extrapolate: "clamp",
          });

          // 2. Opacidad: 0.45 apagada -> 1.0 viva
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.45, 1, 0.45],
            extrapolate: "clamp",
          });

          // 3. Elevación: Sube 8px en el centro para dar efecto flotante
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [6, -8, 6],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: itemWidth,
                marginRight: SPACING,
                transform: [{ scale }, { translateY }],
                opacity,
              }}
            >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/movie/[id]",
                    params: { id: String(item.id) },
                  })
                }
                className="flex-1 active:opacity-90"
              >
                {/* Contenedor del póster con sombra reforzada */}
                <View
                  style={{ height: itemHeight }}
                  className={`w-full overflow-hidden bg-surface dark:bg-surface-dark border border-border/40 dark:border-border-dark/40 shadow-xl ${radius}`}
                >
                  <Image
                    source={{ uri: item.poster }}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                    style={{ width: "100%", height: "100%" }}
                  />

                  {/* Rating Badge */}
                  <View className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm">
                    <Text className="text-white text-[10px] font-bold">
                      ★ {item.rating ? item.rating.toFixed(1) : "N/A"}
                    </Text>
                  </View>

                  {/* Overlay en versión grande */}
                  {showOverlay && (
                    <View className="absolute bottom-0 inset-x-0 bg-black/70 p-2 justify-end">
                      <Text
                        numberOfLines={1}
                        className="text-white text-xs font-bold tracking-tight text-center"
                      >
                        {item.title}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Título exterior para tamaños medianos y pequeños */}
                {!showOverlay && (
                  <Text
                    numberOfLines={1}
                    className="mt-2 text-xs font-semibold text-foreground dark:text-foreground-dark px-0.5 text-center"
                  >
                    {item.title}
                  </Text>
                )}
              </Pressable>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default MovieHorizontalList;
