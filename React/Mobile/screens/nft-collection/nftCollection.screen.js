import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { AppContext } from "../../context/app.context";

export default function NFTCollectionScreen({ navigation, route }) {

    const { primaryColor, secondaryColor, API_URL_ELROND, deviceH, deviceW } = useContext(AppContext);
    const cooldownImage = 'https://i.ibb.co/tQv5YgV/cooldown.png';
    var collectionName = route.params.collection.name;

    const [nfts, setNfts] = useState(null);

    const getNFTs = async () => {
        console.log(route.params.collection);
        try { 
            var result = await fetch(`${API_URL_ELROND}/accounts/${route.params.collection.wallet}/nfts?collection=${route.params.collection.ticker}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    var filtered = [];
                    data.forEach(element => {
                        filtered.push(Object.keys(element)
                            .filter(key => ['name', 'url'].includes(key))
                            .reduce((obj, key) => {
                                return {
                                    ...obj,
                                    [key == 'url' ? 'image' : key]: element[key]
                                };
                            }, {}));
                    });

                    setNfts(filtered);
                    return filtered;
                });
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: primaryColor,
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: deviceW * 0.1,
        },
        container: {
            width: '100%',
            flex: 1,
        },
        previewStyle: {
            backgroundColor: secondaryColor,
            borderRadius: 10,
            maxWidth: deviceW * 0.8 * 0.47,
            alignItems: 'center',
            marginBottom: 20,
        },
        imageStyle: {
            borderRadius: 10,
            width: deviceW * 0.8 * 0.47,
            height: deviceW * 0.8 * 0.47,
        },
        clockContainer: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            zIndex: 2,
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        clockStyle: {
            opacity: 0.5,
            width: deviceW * 0.8 * 0.23,
            height: deviceW * 0.8 * 0.23,
        }
    })

    const renderNFT = (nft, index) => (
        <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={[styles.previewStyle]}
            onPress={() => { navigation.navigate('NFT', { nft: nft }) }}>
            <Text
                style={{
                    paddingHorizontal: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.5)',
                }}
                numberOfLines={1}
                ellipsizeMode='tail'>
                {nft.name}
            </Text>
            {nft.cooldown &&
                <View style={[styles.imageStyle, styles.clockContainer]}>
                    <Image source={{ uri: cooldownImage }} style={styles.clockStyle} />
                </View>
            }
            <Image source={{ uri: nft.image }} style={styles.imageStyle} />
        </TouchableOpacity>
    );

    useEffect(() => {
        getNFTs();
    }, []);


    return (
        <View style={styles.canvas}>
            <Text style={{ fontWeight: 'bold', fontSize: 35, textAlign: 'center', color: secondaryColor, paddingVertical: deviceH * 0.05, textDecorationLine: 'underline' }}>
                {collectionName}
            </Text>
            <View style={styles.container}>
                <FlatList
                    data={nfts}
                    keyExtractor={(item, index) => `${index}-${item.token}`}
                    renderItem={({ index, item }) => (
                        renderNFT(item, index)
                    )}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View >
    );
}
