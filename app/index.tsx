import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import ImageViewing from "../lightbox/ImageViewing";

const WIDTH = Dimensions.get("window").width;
const COLUMNS = 4;
const GAP = 3;

const AlbumEntry = ({ album, setModal }) => {
  const theme = useTheme();
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id}>
      <Text style={[styles.albumTitle, { color: theme.colors.text }]}>
        {album.title}
      </Text>
      <FlatList
        numColumns={COLUMNS}
        scrollEnabled={false}
        data={assets}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item: asset, index }) => (
          <PlatformPressable
            key={index.toString()}
            style={styles.pressable}
            onPress={() => setModal({ index, assets })}
            android_ripple={{
              foreground: true,
              color: "rgba(0,0,0,0.2)",
            }}
          >
            <Image source={{ uri: asset.uri }} style={{ flex: 1 }} />
          </PlatformPressable>
        )}
      />
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={albums}
        overScrollMode="always"
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
        statusBarTranslucent
        visible={Boolean(isModal)}
        onRequestClose={() => setIsModal(null)}
      >
        <StatusBar style="light" backgroundColor="transparent" translucent />
        {isModal && (
          <ImageViewing
            visible={Boolean(isModal)}
            images={isModal?.assets}
            onRequestClose={() => setIsModal(null)}
            initialImageIndex={isModal?.index}
          />
        )}
      </Modal>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  albumTitle: {
    fontSize: 14,
    fontWeight: "500",
    margin: 15,
    marginBottom: 10,
  },
  columnWrapper: {
    gap: GAP,
  },
  pressable: {
    width: WIDTH / COLUMNS - ((COLUMNS - 1) * GAP) / COLUMNS,
    marginTop: GAP,
    aspectRatio: 1,
  },
});
