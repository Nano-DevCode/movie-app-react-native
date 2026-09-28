import { appColors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

interface Props {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export const DrawerUserHeader = ({
  name = "Usuario Demo",
  email = "usuario@movieapp.com",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
}: Props) => {
  return (
    <View className="px-5 pt-4 pb-6 border-b border-border/40 dark:border-border-dark/40 bg-surface/40 dark:bg-surface-dark/40">
      <View className="relative w-16 h-16 mb-3">
        <Image
          source={{ uri: avatarUrl }}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          className="w-16 h-16 rounded-full border-2 border-primary"
        />
        <View className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface dark:border-surface-dark" />
      </View>

      <Text
        numberOfLines={1}
        className="text-base font-bold tracking-tight text-foreground dark:text-foreground-dark"
      >
        {name}
      </Text>
      <Text
        numberOfLines={1}
        className="text-xs text-foreground-muted dark:text-foreground-muted-dark mt-0.5"
      >
        {email}
      </Text>

      <View className="mt-3 flex-row items-center self-start px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
        <Ionicons name="sparkles" size={11} color={appColors.primary.DEFAULT} />
        <Text className="text-[10px] font-semibold text-primary ml-1 uppercase tracking-wider">
          Cinéfilo Pro
        </Text>
      </View>
    </View>
  );
};
