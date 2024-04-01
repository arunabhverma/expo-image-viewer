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
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";

const AlbumEntry = ({ album }) => {
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
              onPress={() =>
                router.push({
                  pathname: "/viewer",
                  params: {
                    index: index,
                    images: JSON.stringify(assets),
                  },
                })
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item: album, index: key }) => (
          <AlbumEntry key={key.toString()} album={album} />
        )}
      />
    </SafeAreaView>
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
