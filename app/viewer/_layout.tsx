import {
  Slot,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const shortTheTitle = (title) => {
  return title.length >= 15
    ? title.slice(0, 6) + "..." + title.slice(title.length - 6, title.length)
    : title;
};

export default function Layout() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBlurEffect: "dark",
        headerStyle: {
          backgroundColor:
            Platform.OS === "ios" ? "transparent" : "rgba(0, 0, 0, 0.5)",
        },
        statusBarTranslucent: true,
        statusBarColor: "transparent",
        statusBarAnimation: "fade",
        headerTintColor: "white",
        statusBarStyle: "light",
        headerTransparent: true,
      }}
    />
  );
}
