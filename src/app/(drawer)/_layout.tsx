import { CustomDrawerContent } from "@/shared/components/CustomDrawerContent";
import { appColors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "nativewind";

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Drawer
      drawerContent={() => <CustomDrawerContent />}
      screenOptions={{
        headerShown: true,
        swipeEdgeWidth: 0,
        swipeEnabled: true,
        headerStyle: {
          backgroundColor: isDark
            ? appColors.background.dark
            : appColors.background.DEFAULT,
        },
        headerTintColor: isDark
          ? appColors.foreground.dark
          : appColors.foreground.DEFAULT,
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: isDark
            ? appColors.background.dark
            : appColors.background.DEFAULT,
          width: 290,
        },
        drawerActiveTintColor: appColors.primary.DEFAULT,
        drawerActiveBackgroundColor: isDark
          ? "rgba(129, 140, 248, 0.12)"
          : "rgba(99, 102, 241, 0.08)",
        drawerInactiveTintColor: isDark ? "#a1a1aa" : "#71717a",
        drawerLabelStyle: {
          fontWeight: "600",
          marginLeft: -10,
        },
        drawerItemStyle: {
          borderRadius: 12,
          paddingHorizontal: 8,
          marginHorizontal: 12,
          marginVertical: 3,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Inicio",
          title: "Movie App",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Ajustes",
          title: "Configuración",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
