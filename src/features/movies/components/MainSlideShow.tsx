import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import { Movie } from "../interfaces/movie.interface";

type CarouselSize = "sm" | "md" | "lg";

interface Props {
  movies: Movie[];
  size?: CarouselSize;
  nextLoadPage?: () => void;
  isLoadingNextPage?: boolean;
}

const SIZE_CONFIG: Record<
  CarouselSize,
  { visibleItems: number; showOverlay: boolean; radius: string; scale: number }
> = {
  lg: {
    visibleItems: 2.5,
    showOverlay: true,
    radius: "rounded-2xl",
    scale: 0.85,
  },
  md: {
    visibleItems: 3.5,
    showOverlay: false,
    radius: "rounded-xl",
    scale: 0.88,
  },
  sm: {
    visibleItems: 4.5,
    showOverlay: false,
    radius: "rounded-lg",
    scale: 0.9,
  },
};

const MainSlideShow = ({
  movies,
  size = "md",
  nextLoadPage,
  isLoadingNextPage = false,
}: Props) => {
  const router = useRouter();
  const { width: PAGE_WIDTH } = useWindowDimensions();
  const isLandscape = PAGE_WIDTH > 500;
  const orientationKey = isLandscape ? "landscape" : "portrait";
  const isLoadingLock = useRef(false);

  if (!movies || movies.length === 0) {
    return null;
  }

  const baseConfig = SIZE_CONFIG[size];
  const visibleItems = isLandscape
    ? baseConfig.visibleItems + 1.8
    : baseConfig.visibleItems;
  const { showOverlay, radius, scale } = baseConfig;

  const itemWidth = Math.round(PAGE_WIDTH / visibleItems);
  const itemHeight = Math.round(itemWidth * 1.5);

  const handleSnapToItem = (index: number) => {
    const triggerIndex = Math.floor(movies.length * 0.6);

    if (
      index >= triggerIndex &&
      !isLoadingLock.current &&
      !isLoadingNextPage &&
      nextLoadPage
    ) {
      isLoadingLock.current = true;
      nextLoadPage();

      setTimeout(() => {
        isLoadingLock.current = false;
      }, 1000);
    }
  };

  return (
    <View className="py-2 relative">
      <Carousel
        key={orientationKey}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        loop={false}
        autoplay={false}
        itemSize={itemWidth}
        style={{
          width: PAGE_WIDTH,
          height: itemHeight + (showOverlay ? 0 : 28),
          justifyContent: "center",
          alignItems: "center",
        }}
        layout={{
          type: "parallax",
          scale: scale,
          offset: Math.round(itemWidth * 0.12),
        }}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item }) => (
          <View
            style={{ width: itemWidth, height: "100%", paddingHorizontal: 3 }}
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
              <View
                style={{ height: itemHeight }}
                className={`w-full overflow-hidden bg-surface dark:bg-surface-dark border border-border/40 dark:border-border-dark/40 shadow-md ${radius}`}
              >
                <Image
                  source={{ uri: item.poster }}
                  contentFit="cover"
                  transition={250}
                  cachePolicy="memory-disk"
                  style={{ width: "100%", height: "100%" }}
                />

                <View className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm">
                  <Text className="text-white text-[10px] font-bold">
                    ★ {item.rating ? item.rating.toFixed(1) : "N/A"}
                  </Text>
                </View>

                {showOverlay && (
                  <View className="absolute bottom-0 inset-x-0 bg-black/65 p-2 justify-end">
                    <Text
                      numberOfLines={1}
                      className="text-white text-xs font-bold"
                    >
                      {item.title}
                    </Text>
                  </View>
                )}
              </View>

              {!showOverlay && (
                <Text
                  numberOfLines={1}
                  className="mt-1 text-[11px] font-medium text-foreground dark:text-foreground-dark px-0.5"
                >
                  {item.title}
                </Text>
              )}
            </Pressable>
          </View>
        )}
      />

      {/* Indicador de carga lateral sutil sin interferir en los items del carrusel */}
      {isLoadingNextPage && (
        <View className="absolute right-3 top-4 bg-black/75 px-2 py-1 rounded-full flex-row items-center space-x-1.5 shadow-sm z-10">
          <ActivityIndicator size="small" color="#818cf8" />
          <Text className="text-[10px] text-white font-medium">
            Cargando...
          </Text>
        </View>
      )}
    </View>
  );
};

export default MainSlideShow;
