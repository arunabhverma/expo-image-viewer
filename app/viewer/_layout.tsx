import React, { useLayoutEffect } from "react";
import { Slot, useNavigation } from "expo-router";

export default function Layout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: false,
      headerBlurEffect: "dark",
    });
  });
  return <Slot />;
}
