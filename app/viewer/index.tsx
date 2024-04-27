import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { memo } from "react";
import ImageView from "../../components/ImageViewing";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";

const Viewer = ({ images, onClose, initialImageIndex }) => {
  console.log("images", images);
  const HeaderComponent = ({ imageIndex }) => {
    return (
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View style={{ flex: 1 }} />
        <BlurView
          style={{
            flex: 1,
            alignItems: "center",
            borderRadius: 100,
            overflow: "hidden",
            padding: 5,
          }}
          tint={"dark"}
          intensity={Platform.select({ android: 0, ios: 100 })}
        >
          <Text style={{ color: "white" }}>Hello world {imageIndex}</Text>
        </BlurView>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={() => {}}
            hitSlop={16}
          >
            <AntDesign name="close" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageView
        images={images}
        initialImageIndex={initialImageIndex}
        visible
        HeaderComponent={HeaderComponent}
        onRequestClose={onClose}
      />
    </View>
  );
};

export default memo(Viewer);

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
  closeButton: {
    // marginRight: 10,
    // marginTop: 10,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#00000077",
  },
});
