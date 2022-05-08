import React, { useState, useContext, useEffect } from 'react';
import { View } from "react-native";
import { CustomInput } from '../../../components';
import { CustomButton } from '../../../components';
import { AppContext } from '../../../context/app.context';

export default function SignupUser({ navigation }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const { primaryColor, secondaryColor, handleSignup } = useContext(AppContext);

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
      <View style={{ width: '100%', flex: 1, justifyContent: 'space-around' }}>
        <View>
          <CustomInput
            title={'first name'}
            value={firstName}
            onChangeText={setFirstName}
          />
          <CustomInput
            title={'last name'}
            value={lastName}
            onChangeText={setLastName}
          />
          <CustomInput
            title={'password'}
            value={password}
            onChangeText={setPassword}
            password
          />
          <CustomInput
            title={'email'}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <CustomButton
          buttonStyle={{ backgroundColor: secondaryColor }}
          text={"Sign up"}
          onPress={() => {
            handleSignup(firstName, lastName, password, email);
          }}
        />
      </View>
    </View>
  );
}
