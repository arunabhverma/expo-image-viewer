/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onRequestClose: () => void;
};

const HIT_SLOP = 16;

const ImageDefaultHeader = ({ onRequestClose }: Props) => {
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity
        style={[styles.closeButton, styles.blurredBackground]}
        onPress={onRequestClose}
        hitSlop={HIT_SLOP}
      >
        <AntDesign name="close" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
    pointerEvents: "box-none",
  },
  closeButton: {
    marginRight: 10,
    marginTop: 10,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#00000077",
  },
  blurredBackground: {
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  } as ViewStyle,
});

export default ImageDefaultHeader;
