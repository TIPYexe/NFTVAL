import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { AppContext } from "../../context/app.context";

export default function DashboardScreen({ navigation }) {

  const { primaryColor, secondaryColor, thirdColor, API_URL_ELROND, deviceW, connectedWallets } = useContext(AppContext);
  const [nft2Store, setNft2Store] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collectionsTickers, setCollectionsTickers] = useState([]);

  const styles = StyleSheet.create({
    canvas: {
      backgroundColor: primaryColor,
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingHorizontal: deviceW * 0.1,
      paddingTop: deviceW * 0.1,
    },
    container: {
      width: '100%',
    },
    elementContainer: {
      height: deviceW * 0.8,
      marginBottom: 27,
    },
    previewStyle: {
      padding: 5,
      paddingTop: 0,
      backgroundColor: secondaryColor,
      borderRadius: 10,
      zIndex: 1,
      // position: 'absolute',
      flex: 1,
      alignItems: 'center',
    },
    imageStyle: {
      flex: 1,
      borderRadius: 8,
      width: deviceW * 0.8 * 0.9,
      height: deviceW * 0.8 * 0.9,
    }
  })

  const CustomImage = ({ connection, type }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.previewStyle, type === 'store' && { backgroundColor: thirdColor, right: 0, bottom: 0, zIndex: 2 }]}
        onPress={() => {
          if (type === 'store') {
            navigation.navigate('Store', { store: connection.store });
          } else {
            navigation.navigate('NftCollection', { collection: connection.collection });
          }
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.5)',
          }}>
          {type === 'store' ? "STORE" : connection.collection.name}
        </Text>
        <Image source={{ uri: type === 'store' ? connection.store.image : connection.collection.image }} style={styles.imageStyle} />
      </TouchableOpacity>
    );
  }

  const getCollectionsTickers = async (wallet) => {
    try {
      var result = await fetch(`${API_URL_ELROND}/accounts/${wallet.address}/nfts`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          var filtered = [];

          data.filter((value, index, self) => {
            if (index === self.findIndex(t => (t.ticker === value.ticker)))
              filtered.push(Object.keys(value)
                .filter(key => ['ticker', 'url'].includes(key))
                .reduce((obj, key) => {
                  return {
                    ...obj,
                    [key]: value[key]
                  };
                }, {}));
          });

          setCollectionsTickers(filtered);
          return filtered;
        });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  const getCollectionName = async (collection, wallet) => {
    try {
      var result = await fetch(`${API_URL_ELROND}/collections/${collection.ticker}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          var filtered = [];

          filtered.push(Object.keys(data)
            .filter(key => ['name', 'ticker'].includes(key))
            .reduce((obj, key) => {
              return {
                ...obj,
                [key]: data[key]
              };
            }, { image: collection.url, wallet: wallet.address }));

          setCollections(collections => [...collections, filtered]);
          return filtered;
        });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  const initializeConns = (lista) => {
    lista.forEach(collection => {
      const connection = {
        collection: {
          image: collection[0].image,
          name: collection[0].name,
          ticker: collection[0].ticker,
          wallet: collection[0].wallet,
        },
        store: {
          image: "https://i.ibb.co/8zxY17z/service1.jpg",
        }
      };
      setNft2Store(nft2Store => [...nft2Store, connection]);
    });
  }

  useEffect(() => {
    const unsub = () => {
      if (collectionsTickers.length === 0) {
        for (const wallet of connectedWallets)
          getCollectionsTickers(wallet).then(result => result.forEach(collection => getCollectionName(collection, wallet)));
      } else if (collections.length === collectionsTickers.length) {
        initializeConns(collections);
      }
    }
    return unsub();
  }, [collections]);

  return (
    <View style={styles.canvas}>
      {collections.length == nft2Store.length &&
        <View style={styles.container}>
          <FlatList
            data={nft2Store}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ index, item }) => (
              <TouchableOpacity key={index} style={styles.elementContainer}>
                <CustomImage connection={item} type={'collection'} />
                {/* <CustomImage connection={item} type={'store'} /> */}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      }
    </View>
  );
}
