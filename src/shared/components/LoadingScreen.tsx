import { appColors } from "@/shared/constants/colors";
import LottieView from "lottie-react-native";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";

export default function LottieLoadingScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Color de los vectores de Lottie sincronizado con appColors
  const loaderColor = isDark
    ? appColors.primary.light // #818cf8: resalta sobre fondo negro
    : appColors.primary.DEFAULT; // #4f46e5: contraste ideal sobre fondo blanco

  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark px-8">
      {/* Contenedor central con resplandor suave */}
      <View className="relative items-center justify-center">
        {/* Glow de acento con opacidades directas sobre tu color primary */}
        <View className="absolute h-48 w-48 rounded-full bg-primary/10 dark:bg-primary/25 blur-3xl" />

        <LottieView
          // Forzar recreación de la instancia para aplicar el color al instante
          key={colorScheme}
          autoPlay
          loop
          style={{ width: 220, height: 220 }}
          source={require("../../../assets/animations/cool-loader.json")}
          colorFilters={[
            {
              keypath: "**",
              color: loaderColor,
            },
          ]}
        />
      </View>

      {/* Título adaptado a foreground */}
      <Text className="mt-6 text-xl font-bold tracking-tight text-foreground dark:text-foreground-dark">
        Cargando experiencia...
      </Text>

      {/* Subtexto descriptivo */}
      <Text className="mt-2 max-w-[260px] text-center text-xs font-medium text-foreground-muted leading-relaxed">
        Estamos optimizando los recursos para ti
      </Text>

      {/* Píldora de estado con surface y border definidos */}
      <View className="mt-8 flex-row items-center gap-2 rounded-full border border-border dark:border-border-dark bg-surface dark:bg-surface-dark px-3.5 py-1.5 shadow-sm">
        <View className="h-2 w-2 rounded-full bg-primary" />
        <Text className="text-[11px] font-semibold text-foreground-muted dark:text-foreground-dark">
          {isDark ? "Modo oscuro activo" : "Modo claro activo"}
        </Text>
      </View>
    </View>
  );
}
