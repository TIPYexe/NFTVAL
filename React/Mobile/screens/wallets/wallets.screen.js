import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, FlatList, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function WalletsScreen({ navigation }) {
  const { primaryColor, secondaryColor, API_URL, deviceW, deviceH, connectedWallets, setConnectedWallets } = useContext(AppContext);
  const cancelButton = 'https://i.ibb.co/b7YqTsG/cancel.png';
  const addButton = 'https://i.ibb.co/ZN2vCsG/add.png';
  const [toDelete, setToDelete] = useState(null);
  const [renderSurePopup, setRenderSurePopup] = useState(false);

  const getWallets = async () => {
    try {
      var result = await fetch(`${API_URL}/wallet`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => { 
          setConnectedWallets(data.wallet_addr)  
          return data.wallet_addr; 
        });
    } catch (error) {
      console.error(error);
    }
  }

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
      width: deviceW * 0.8,
      top: deviceW * 0.1,
    },
    logoStyle: {
      width: deviceW * 0.12,
      height: deviceW * 0.12,
    },
    addresStyle: {
      zIndex: 1,
      position: 'absolute',
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      backgroundColor: secondaryColor,
      marginLeft: deviceW * 0.1,
      paddingLeft: 30,
      paddingRight: 15,
      paddingVertical: 12,
      borderRadius: 10,
    },
    cryptoBackground: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 100,
      zIndex: 2,
    }
  });

  const removeWallet = (address) => {
    if (toDelete === address) {

      const tempList = connectedWallets.filter(item => item.address !== address);
      setConnectedWallets(tempList);
    }
  }

  const areYouSurePopup = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <View style={{ backgroundColor: 'white', width: deviceW * 0.8, height: deviceH * 0.5, justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, paddingHorizontal: deviceW * 0.12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
              Are you sure you want to disconnect this wallet?
            </Text>
            <View>
              <CustomButton
                buttonStyle={{ backgroundColor: secondaryColor }}
                text={"Yes"}
                onPress={() => {
                  setRenderSurePopup(false);
                  setToDelete(null);
                  removeWallet(toDelete);
                }} />
              <CustomButton
                buttonStyle={{ backgroundColor: primaryColor }}
                textStyle={{ color: secondaryColor }}
                text={"No"}
                onPress={() => {
                  setToDelete(null);
                  setRenderSurePopup(false);
                }} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const renderWallet = (wallet, index) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      style={{ width: '100%', marginBottom: 15, justifyContent: 'center', alignItems: "flex-start" }}
      onPress={() => {
        if (toDelete === wallet.address) {
          setToDelete(null);
        } else {
          setToDelete(wallet.address)
        }
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cryptoBackground}
        onPress={() => {
          // setSelectedWallet(wallet.address);
          setRenderSurePopup(true);
          // removeWallet(wallet.address);
          // render areYouSurePopup
          // delete si din DB
        }}>
        <Image source={{ uri: toDelete === wallet.address ? cancelButton : wallet.image }} style={styles.logoStyle} />
      </TouchableOpacity>
      <Text style={styles.addresStyle} numberOfLines={1} ellipsizeMode='tail'>
        {wallet.address}
      </Text>
    </TouchableOpacity>
  )

  const renderAddButton = () => {
    return (
      <View style={{ position: "absolute", bottom: 0, flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ backgroundColor: secondaryColor, width: deviceW * 0.15, height: deviceW * 0.1 }}>
          <View style={{ backgroundColor: primaryColor, width: '100%', height: '100%', borderBottomRightRadius: 100 }} />
        </View>
        <TouchableOpacity activeOpacity={0.9}
          style={[styles.cryptoBackground, { borderBottomLeftRadius: 0, backgroundColor: secondaryColor, borderBottomRightRadius: 0 }]}>
          <Image source={{ uri: addButton }} style={[styles.logoStyle, { backgroundColor: 'transparent' }]} />
        </TouchableOpacity>
        <View style={{ backgroundColor: secondaryColor, width: deviceW * 0.15, height: deviceW * 0.1 }}>
          <View style={{ backgroundColor: primaryColor, width: '100%', height: '100%', borderBottomLeftRadius: 100 }} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.canvas}>
      <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
        {renderAddButton()}
        <View style={{ position: 'absolute', width: '100%' }}>
          <FlatList
            data={connectedWallets}
            keyExtractor={(item) => item.address}
            renderItem={({ index, item }) => (
              renderWallet(item, index)
            )}
            showsVerticalScrollIndicator={false}
          // ListEmptyComponent={ }
          />
        </View>
      </View>
      {renderSurePopup && areYouSurePopup()}
    </View>);
}
