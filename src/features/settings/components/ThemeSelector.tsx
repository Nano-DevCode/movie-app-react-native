import { Button } from "@/shared/components/Button";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Text, View } from "react-native";

type ThemeOption = "light" | "dark" | "system";

const ThemeSelector = () => {
  const { setColorScheme } = useColorScheme();
  const [themePreference, setThemePreference] = useState<ThemeOption>("system");

  const handleSelect = (option: ThemeOption) => {
    setThemePreference(option);
    setColorScheme(option);
  };

  return (
    <View className="flex-1 bg-white dark:bg-background-dark p-6">
      <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        Configuración
      </Text>

      {/* Tarjeta de configuración de Tema */}
      <View className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
        <Text className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
          Tema de la aplicación
        </Text>
        <Text className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
          Selecciona cómo quieres ver la interfaz.
        </Text>

        <View className="flex-row gap-2">
          {/* Botón Claro */}
          <Button
            title="Claro"
            size="sm"
            variant={themePreference === "light" ? "primary" : "outline"}
            className="flex-1"
            onPress={() => handleSelect("light")}
          />

          {/* Botón Oscuro */}
          <Button
            title="Oscuro"
            size="sm"
            variant={themePreference === "dark" ? "primary" : "outline"}
            className="flex-1"
            onPress={() => handleSelect("dark")}
          />

          {/* Botón Sistema */}
          <Button
            title="Sistema"
            size="sm"
            variant={themePreference === "system" ? "primary" : "outline"}
            className="flex-1"
            onPress={() => handleSelect("system")}
          />
        </View>
      </View>
    </View>
  );
};

export default ThemeSelector;
