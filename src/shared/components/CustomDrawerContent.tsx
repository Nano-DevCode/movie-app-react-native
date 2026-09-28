import { DrawerUserHeader } from "@/features/profile/components/DrawerUserHeader";
import { appColors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, usePathname, useRouter } from "expo-router";
import { DrawerNavigationHelpers } from "expo-router/build/react-navigation/drawer/types";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomDrawerProps {
  navigation?: DrawerNavigationHelpers;
}

interface NavItem {
  path: Href;
  label: string;
  iconOutline: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
  badge?: string;
}

// Aquí TypeScript ahora sí te sugerirá y autocompletará las rutas de tus carpetas:
const navItems: NavItem[] = [
  {
    path: "/(drawer)/(tabs)/(movies)",
    label: "Inicio",
    iconOutline: "film-outline",
    iconFilled: "film",
  },
  {
    path: "/(drawer)/settings",
    label: "Ajustes",
    iconOutline: "settings-outline",
    iconFilled: "settings",
  },
];

export const CustomDrawerContent = ({ navigation }: CustomDrawerProps) => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: Href) => {
    // 1. Cierra el drawer primero o en paralelo para respuesta táctil instantánea
    navigation?.closeDrawer();
    // 2. Navega directamente sin el retardo de Link asChild
    router.navigate(path);
  };

  const handleLogout = () => {
    navigation?.closeDrawer();
    console.log("Cerrar sesión");
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark justify-between">
      {/* 1. Header + Enlaces de Navegación */}
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <DrawerUserHeader />

        {/* Etiqueta de Sección */}
        <View className="px-5 pt-6 pb-2">
          <Text className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground/70 dark:text-muted-foreground-dark/70">
            Navegación
          </Text>
        </View>

        {/* Lista de Enlaces */}
        <View className="px-3 space-y-1">
          {navItems.map((item) => {
            const pathStr = typeof item.path === "string" ? item.path : "";
            const isTabItem = pathStr.includes("(tabs)");
            const isSettingsItem = pathStr.includes("settings");

            const isActive =
              pathname.startsWith(pathStr) ||
              (isTabItem &&
                (pathname === "/" ||
                  pathname.includes("movies") ||
                  pathname.includes("favorites"))) ||
              (isSettingsItem && pathname.includes("settings"));

            return (
              <Pressable
                key={pathStr}
                onPress={() => handleNavigate(item.path)}
                className={`flex-row items-center justify-between px-3 py-2.5 rounded-2xl ${
                  isActive
                    ? "bg-primary/10 dark:bg-primary/15"
                    : "active:bg-muted/40 dark:active:bg-muted-dark/30"
                }`}
              >
                <View className="flex-row items-center flex-1">
                  {/* Indicador de barra vertical activa */}
                  <View
                    className={`w-1 h-5 rounded-full mr-2.5 ${
                      isActive ? "bg-primary" : "bg-transparent"
                    }`}
                  />

                  {/* Icono con cápsula redondeada */}
                  <View
                    className={`w-9 h-9 rounded-xl items-center justify-center mr-3 ${
                      isActive
                        ? "bg-primary/20 dark:bg-primary/25 border border-primary/30"
                        : "bg-surface-variant dark:bg-surface-variant-dark/40"
                    }`}
                  >
                    <Ionicons
                      name={isActive ? item.iconFilled : item.iconOutline}
                      size={20}
                      color={isActive ? appColors.primary.DEFAULT : "#71717a"}
                    />
                  </View>

                  {/* Texto del menú */}
                  <Text
                    className={`text-sm tracking-tight ${
                      isActive
                        ? "font-bold text-primary"
                        : "font-medium text-foreground dark:text-foreground-dark"
                    }`}
                  >
                    {item.label}
                  </Text>
                </View>

                {/* Flecha sutil lateral derecha */}
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={isActive ? appColors.primary.DEFAULT : "#a1a1aa"}
                  style={{ opacity: isActive ? 0.9 : 0.4 }}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* 2. Footer: Botón Cerrar Sesión + Versión */}
      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="px-4 pt-3 border-t border-border/30 dark:border-border-dark/30 bg-background/50 dark:bg-background-dark/50"
      >
        <Pressable
          className="flex-row items-center justify-center py-3 px-4 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 active:opacity-70"
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={19} color="#ef4444" />
          <Text className="text-red-500 font-semibold text-sm ml-2.5">
            Cerrar Sesión
          </Text>
        </Pressable>

        <Text className="text-center text-[10px] text-muted-foreground/60 dark:text-muted-foreground-dark/60 mt-3">
          MovieApp v1.0.0
        </Text>
      </View>
    </View>
  );
};
