import React, { useState, useContext, useEffect } from 'react';
import { View } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState();
  const { primaryColor, secondaryColor, handleLogin } = useContext(AppContext);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 63,
        backgroundColor: primaryColor,
      }}>
      <View style={{ width: '100%' }}>
        <CustomInput
          title={'user id'}
          value={username}
          onChangeText={setUsername}
        />
        <CustomButton
          buttonStyle={{ backgroundColor: secondaryColor, marginTop: 115 }}
          text={"Submit"}
          onPress={() => {
            handleLogin(username);
          }}
        />
      </View>
    </View>
  );
}
