import { appColors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Cálculo dinámico de padding inferior con piso mínimo para Android (evita overlap con botones del sistema)
  const bottomInset = Platform.select({
    ios: insets.bottom > 0 ? insets.bottom : 20,
    android: Math.max(insets.bottom > 0 ? insets.bottom + 4 : 0, 28),
    default: 12,
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark
            ? appColors.background.dark
            : appColors.background.DEFAULT,
          borderTopColor: isDark
            ? appColors.border.dark
            : appColors.border.DEFAULT,
          borderTopWidth: 1,
          height: 54 + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 4,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: isDark ? 0.3 : 0.05,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarActiveTintColor: isDark
          ? appColors.primary.light
          : appColors.primary.DEFAULT,
        tabBarInactiveTintColor: isDark ? "#71717a" : "#94a3b8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.2,
          margin: 0,
          padding: 0,
        },
        tabBarIconStyle: {
          marginBottom: 3,
        },
      }}
    >
      <Tabs.Screen
        name="(movies)"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(favorites)"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
