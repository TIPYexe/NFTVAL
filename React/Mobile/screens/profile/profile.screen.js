import React, { useState, useContext, useEffect } from 'react';
import { View, Image } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function ProfileScreen({ navigation }) {
  const { primaryColor, secondaryColor, thirdColor, user, setUser, handleSignout, deviceW, updateEmail } = useContext(AppContext);
  const [email, setEmail] = useState(user.user_email);
  const [changes, setChanges] = useState(false);
  const profilePicture = 'https://i.ibb.co/K09KSHT/4904883e-aa4b-448a-8296-a09a8d7e3bd0.jpg';

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
      <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Image source={{ uri: profilePicture }} style={{ width: deviceW * 0.5, height: deviceW * 0.5, borderRadius: 100 }} />

        <View style={{ width: '100%' }}>
          <CustomInput
            title={'user'}
            value={`${user.user_f_name} ${user.user_l_name}`}
            editable={false}
          />
          <CustomInput
            title={'email'}
            value={email}
            onChangeText={(e) => {
              setEmail(e);
              setChanges(true);
            }}
          />
        </View>

        <View>
          {changes &&
            <CustomButton
              buttonStyle={{ backgroundColor: thirdColor }}
              text={"Save"}
              inputStyle={{ color: 'black' }}
              onPress={() => {
                // navigation.navigate('Dashboard');
                updateEmail(email);
              }}
            />}
          <CustomButton
            buttonStyle={{ backgroundColor: secondaryColor }}
            text={"Log out"}
            inputStyle={{ color: 'black' }}
            onPress={() => {
              setUser(null);
            }}
          />
          <CustomButton
            buttonStyle={{ backgroundColor: secondaryColor }}
            text={"Delete"}
            inputStyle={{ color: 'black' }}
            onPress={() => {
              handleSignout(user.user_id);
            }}
          />
        </View>
      </View>
    </View>
  );
}
