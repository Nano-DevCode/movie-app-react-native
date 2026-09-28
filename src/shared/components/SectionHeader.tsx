import { Text, View } from "react-native";

type HeaderSize = "sm" | "md" | "lg";
type HeaderAlign = "left" | "center" | "right";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  size?: HeaderSize;
  align?: HeaderAlign;
  className?: string;
}

const SIZE_CONFIG: Record<
  HeaderSize,
  {
    titleSize: string;
    subtitleSize: string;
    badgeSize: string;
    showDot: boolean;
    containerMargin: string;
  }
> = {
  lg: {
    titleSize: "text-2xl font-extrabold",
    subtitleSize: "text-xs mt-0.5",
    badgeSize: "text-[11px]",
    showDot: true,
    containerMargin: "mb-3",
  },
  md: {
    titleSize: "text-xl font-bold",
    subtitleSize: "text-[11px] mt-0.5",
    badgeSize: "text-[10px]",
    showDot: false,
    containerMargin: "mb-2",
  },
  sm: {
    titleSize: "text-base font-semibold",
    subtitleSize: "text-[10px]",
    badgeSize: "text-[9px]",
    showDot: false,
    containerMargin: "mb-1.5",
  },
};

// Clases de alineación para contenedores y textos
const ALIGN_CONFIG: Record<
  HeaderAlign,
  { container: string; text: string; badge: string }
> = {
  left: {
    container: "items-start",
    text: "text-left",
    badge: "justify-start",
  },
  center: {
    container: "items-center",
    text: "text-center",
    badge: "justify-center",
  },
  right: {
    container: "items-end",
    text: "text-right",
    badge: "justify-end",
  },
};

export const SectionHeader = ({
  title,
  subtitle,
  badge,
  size = "md",
  align = "left",
  className = "",
}: SectionHeaderProps) => {
  const { titleSize, subtitleSize, badgeSize, showDot, containerMargin } =
    SIZE_CONFIG[size];
  const { container, text, badge: badgeAlign } = ALIGN_CONFIG[align];

  return (
    <View className={`px-5 ${containerMargin} ${container} ${className}`}>
      {/* Badge / Overline superior */}
      {badge ? (
        <View
          className={`flex-row items-center gap-1.5 mb-1 w-full ${badgeAlign}`}
        >
          {showDot && <View className="h-2 w-2 rounded-full bg-primary" />}
          <Text
            className={`${badgeSize} font-bold uppercase tracking-widest text-primary dark:text-primary-light`}
          >
            {badge}
          </Text>
        </View>
      ) : null}

      {/* Título */}
      <Text
        numberOfLines={1}
        className={`${titleSize} ${text} w-full tracking-tight text-foreground dark:text-foreground-dark`}
      >
        {title}
      </Text>

      {/* Subtítulo */}
      {subtitle ? (
        <Text
          numberOfLines={2}
          className={`${subtitleSize} ${text} w-full font-medium text-foreground-muted leading-tight`}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default SectionHeader;
