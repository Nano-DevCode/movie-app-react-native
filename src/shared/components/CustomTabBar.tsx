import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      className="flex-row items-center justify-around bg-white dark:bg-background-dark border-t border-border dark:border-border-dark pt-3 px-4 shadow-lg"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Título definido en options.title o el nombre de la ruta
        const label = options.title !== undefined ? options.title : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            className={`flex-1 items-center justify-center py-1 rounded-xl transition-all ${
              isFocused ? "scale-105" : "opacity-60"
            }`}
          >
            {/* Aquí puedes renderizar iconos si los pasas en options.tabBarIcon */}
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? "#4f46e5" : "#71717a",
                size: 24,
              })}

            <Text
              className={`text-xs mt-1 font-medium ${
                isFocused
                  ? "text-primary dark:text-primary-light font-semibold"
                  : "text-foreground-muted"
              }`}
            >
              {typeof label === "string" ? label : route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
