import { useState, useEffect } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Platform,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Viewer from "./viewer";

const AlbumEntry = ({ album, setModal }) => {
  const theme = useTheme();
  const router = useRouter();
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text style={{ color: theme.colors.text }}>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        <FlatList
          numColumns={5}
          scrollEnabled={false}
          data={assets}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item: asset, index }) => (
            <Pressable
              key={index.toString()}
              onPress={
                () => setModal({ index, assets })
                // router.push({
                //   pathname: "/viewer",
                //   params: {
                //     index: index,
                //     images: JSON.stringify(assets),
                //   },
                // })
              }
              android_ripple={{
                foreground: true,
                color: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image source={{ uri: asset.uri }} width={50} height={50} />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const App = () => {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [isModal, setIsModal] = useState(null);

  async function getAlbums() {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  console.log("state", isModal);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={albums}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item: album, index: key }) => (
          <AlbumEntry
            key={key.toString()}
            album={album}
            setModal={(data) => setIsModal(data)}
          />
        )}
      />
      <Modal
        animationType="slide"
        transparent
        visible={Boolean(isModal)}
        onRequestClose={() => setIsModal(null)}
      >
        <Viewer
          images={isModal?.assets}
          onClose={() => setIsModal(null)}
          initialImageIndex={isModal?.index}
        />
      </Modal>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

// import React, { memo, useEffect, useState } from "react";
// import {
//   FlatList,
//   Modal,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   View,
//   useWindowDimensions,
// } from "react-native";
// import { Image } from "expo-image";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ImageData } from "../mock/IMAGES";
// import Viewer from "./viewer";

// const Home = () => {
//   const { width } = useWindowDimensions();
//   const [state, setState] = useState({
//     imageData: ImageData,
//     isModal: null,
//     likedIndex: [],
//   });

//   const renderItem = ({ item, index }) => {
//     let imageWidth = width / 2;

//     let aspectRatio = item.width / item.height;
//     const imageHeight = imageWidth / aspectRatio;

//     return (
//       <View
//         style={{
//           width: "100%",
//           height: imageHeight,
//           borderRadius: 15,
//           overflow: "hidden",
//         }}
//       >
//         <Pressable
//           onPress={() => setState((prev) => ({ ...prev, isModal: index }))}
//         >
//           <Image
//             source={{ uri: item.uri }}
//             style={{ width: "100%", height: imageHeight }}
//           />
//         </Pressable>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
//       <FlatList
//         data={state.imageData}
//         keyExtractor={(i) => i.id}
//         renderItem={renderItem}
//         contentInsetAdjustmentBehavior="automatic"
//       />
//       <Modal
//         animationType="slide"
//         transparent
//         visible={Boolean(state.isModal)}
//         onRequestClose={() => setState((prev) => ({ ...prev, isModal: null }))}
//       >
//         <Viewer
//           images={state.imageData}
//           onClose={() => setState((prev) => ({ ...prev, isModal: null }))}
//           initialImageIndex={state.isModal}
//         />
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default memo(Home);

// const styles = StyleSheet.create({
//   containerStyle: {},
// });
