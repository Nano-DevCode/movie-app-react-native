import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  budget: number;
  duration: number;
  rating: number;
  companies: string[];
}

export const MovieStats = ({ budget, duration, rating, companies }: Props) => {
  return (
    <View className="px-5 mt-7">
      <View className="flex-row gap-3">
        {/* Rating card */}
        <View className="flex-1 p-3.5 rounded-2xl bg-surface dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 items-center">
          <Ionicons name="star" size={18} color="#f59e0b" />
          <Text className="text-sm font-bold text-foreground dark:text-foreground-dark mt-1">
            {rating}/10
          </Text>
          <Text className="text-[10px] text-foreground-muted dark:text-foreground-muted-dark uppercase tracking-wider">
            Calificación
          </Text>
        </View>

        {/* Duración */}
        <View className="flex-1 p-3.5 rounded-2xl bg-surface dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 items-center">
          <Ionicons name="time-outline" size={18} color="#818cf8" />
          <Text className="text-sm font-bold text-foreground dark:text-foreground-dark mt-1">
            {duration > 0 ? `${duration} min` : "N/A"}
          </Text>
          <Text className="text-[10px] text-foreground-muted dark:text-foreground-muted-dark uppercase tracking-wider">
            Duración
          </Text>
        </View>

        {/* Presupuesto */}
        <View className="flex-1 p-3.5 rounded-2xl bg-surface dark:bg-surface-dark border border-border/50 dark:border-border-dark/50 items-center">
          <Ionicons name="cash-outline" size={18} color="#10b981" />
          <Text
            numberOfLines={1}
            className="text-sm font-bold text-foreground dark:text-foreground-dark mt-1"
          >
            {budget > 0 ? `$${(budget / 1_000_000).toFixed(0)}M` : "N/A"}
          </Text>
          <Text className="text-[10px] text-foreground-muted dark:text-foreground-muted-dark uppercase tracking-wider">
            Presupuesto
          </Text>
        </View>
      </View>

      {/* Compañías productoras */}
      {companies.length > 0 && (
        <View className="mt-4 p-3.5 rounded-2xl bg-surface dark:bg-surface-dark border border-border/50 dark:border-border-dark/50">
          <Text className="text-[10px] font-bold text-foreground-muted dark:text-foreground-muted-dark uppercase tracking-wider mb-1">
            Estudios y Productoras
          </Text>
          <Text
            numberOfLines={2}
            className="text-xs font-medium text-foreground dark:text-foreground-dark leading-5"
          >
            {companies.join(" • ")}
          </Text>
        </View>
      )}
    </View>
  );
};
