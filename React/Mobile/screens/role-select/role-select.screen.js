import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function RoleSelectScreen({ navigation }) {
  const { primaryColor, secondaryColor, thirdColor, inactiveColor } = useContext(AppContext);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: primaryColor,
        alignItems: 'center',
        paddingHorizontal: 63,
      }}>
      <View
        style={{
          width: '100%',
          top: '33.33%',
        }}>
        <CustomButton
          buttonStyle={{ backgroundColor: secondaryColor }}
          text={"Log in"}
          onPress={() => navigation.navigate('LoginScreen')}
        />

        <CustomButton
          buttonStyle={{ backgroundColor: thirdColor }}
          text={"User Sign up"}
          onPress={() => navigation.navigate('SignupUser')}
        />

        <CustomButton
          buttonStyle={{ backgroundColor: thirdColor }}
          text={"Service Sign up"}
          onPress={() => navigation.navigate('SignupService')}
        />
      </View>
    </View>
  );
}