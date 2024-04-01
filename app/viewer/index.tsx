import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ImageView from "../../components/ImageViewing";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useHeaderHeight } from "@react-navigation/elements";
import { BlurView } from "expo-blur";

const Viewer = () => {
  const navigation = useNavigation();
  const { images, index } = useLocalSearchParams();
  const parseImages = JSON.parse(images);

  const statusbarHeight = StatusBar;
  const statusBarHeight = Constants.statusBarHeight;
  const headerHeight = useHeaderHeight();

  const Header = ({ imageIndex }) => {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: headerHeight + statusBarHeight / 2,
        }}
      >
        <BlurView
          pointerEvents="none"
          intensity={Platform.OS === "ios" ? 100 : 0}
          tint="dark"
          style={styles.blurHeaderView}
        >
          <Text style={styles.headerText}>
            {imageIndex + 1}
            {" of "}
            {parseImages.length}
          </Text>
        </BlurView>
      </View>
    );
  };

  const Footer = ({ imageIndex }) => {
    return (
      <View
        style={{
          width: "100%",
          height: 100,
        }}
      >
        <BlurView
          pointerEvents="none"
          intensity={Platform.OS === "ios" ? 100 : 0}
          tint="dark"
          style={{ flex: 1 }}
        ></BlurView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageView
        images={parseImages}
        initialImageIndex={+index}
        onTapFire={(e) => {
          navigation.setOptions({ headerShown: e });
        }}
        activeIndex={(e) => {
          navigation.setOptions({ title: parseImages[e].filename });
        }}
        visible
        onRequestClose={() => {}}
        HeaderComponent={({ imageIndex }) => <Header imageIndex={imageIndex} />}
        FooterComponent={({ imageIndex }) => <Footer imageIndex={imageIndex} />}
      />
    </View>
  );
};

export default Viewer;

const styles = StyleSheet.create({
  blurHeaderView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: Platform.select({
      ios: "transparent",
      android: "rgba(0, 0, 0, 0.1)",
    }),
  },
  headerText: {
    fontWeight: "600",
    color: "white",
  },
});
