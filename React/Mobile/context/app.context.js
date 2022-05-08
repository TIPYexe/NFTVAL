import { createContext, useState, useMemo } from "react";
import { Dimensions } from 'react-native';
import { Camera } from "expo-camera";
import axios from "axios";
import { navigate } from "../navigation/root.navigation";

const AppContext = createContext();

function AppProvider(props) {
  const [enableKeyboard, setEnableKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [orientation, setOrientation] = useState(null);

  const [primaryColor, setPrimaryColor] = useState("#000023");
  const [secondaryColor, setSecondaryColor] = useState("#03C9C3");
  const [thirdColor, setThirdColor] = useState("#F3F3F3");
  const [inactiveColor, setInactiveColor] = useState("#707070");

  const [user, setUser] = useState(null);
  const [nft2Store, setNft2Store] = useState(null);
  const [connectedWallets, setConnectedWallets] = useState([{
    image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
    address: "erd1tnmaspua9dsxd36xzwy8ed75ru26pf7fxxvfun4jm9km7v6pvfdsh0g9sg"
  }]);
  const [cooldownNfts, setCooldownNfts] = useState(null);

  const [permissionCamera, setPermissionCamera] = useState(false);
  const [checkedCamera, setCheckedCamera] = useState(false);

  const [API_URL, SET_API_URL] = useState("http://192.168.0.111:8000");
  const [API_URL_ELROND, SET_API_URL_ELROND] = useState("https://api.elrond.com");

  const [deviceW, setDeviceW] = useState(Dimensions.get('window').width);
  const [deviceH, setDeviceH] = useState(Dimensions.get('window').height);

  const checkpermissionCamera = async () => {
    const { status } = await Camera.getPermissionAsync();
    if (status === "granted") {
      setPermissionCamera(true);
    } else {
      setPermissionCamera(false);
    }
  };

  const handleLogin = (user_id) => {
    fetch(`${API_URL}/user/${user_id}`, {
      method: 'GET'
    }).then(response => response.json())
      .then(data => {
        setUser(data[0]);
        navigate("Dashboard");
      })
      .catch(error => {
        console.log('error: ', error);
      })
  }

  const handleSignup = (first_name, last_name, user_password, user_email) => {
    var model = {
      user_f_name: first_name,
      user_l_name: last_name,
      user_email: user_email,
      password: user_password,
      user_dob: '2000-02-20'
    };
    fetch(`${API_URL}/user`, {
      method: 'POST',
      body: JSON.stringify(model),
    }).then(response => response.json())
      .then(data => {
        setUser(model);
        navigate("Dashboard");
      })
      .catch(error => {
        console.log('error: ', error);
      })
  }

  const handleSignout = (user_id) => {
    var model = {
      user_id: parseInt(user_id),
    };
    console.log(model);
    fetch(`${API_URL}/user/${user_id}`, {
      method: 'DELETE',
      body: JSON.stringify(model),
    }).then(response => response.json())
      .then(data => {
        setUser(null);
      })
      .catch(error => {
        console.log('error: ', error);
      })
  }

  const updateEmail = (email) => {
    var model = {
      user_id: user.user_id,
      user_email: email,
      user_f_name: user.user_f_name,
      user_l_name: user.user_l_name,
      user_dob: user.user_dob,
      password: user.password
    }
    fetch(`${API_URL}/user/${user.user_id}`, {
      method: 'PUT',
      body: JSON.stringify(model),
    }).then(response => response.json())
      .then(data => {
        setUser(model);
      })
      .catch(error => {
        console.log('error: ', error);
      })
  }

  const store = {
    // General app
    enableKeyboard,
    setEnableKeyboard,
    isLoading,
    setIsLoading,
    orientation,
    setOrientation,

    // File upload
    fileUploading,
    setFileUploading,

    // User data
    user,
    setUser,
    nft2Store,
    setNft2Store,
    connectedWallets,
    setConnectedWallets,
    cooldownNfts,
    setCooldownNfts,

    // Permissions
    permissionCamera,
    setPermissionCamera,
    checkedCamera,

    // API
    API_URL,
    API_URL_ELROND,

    // Auth
    handleLogin,
    handleSignup,
    handleSignout,
    updateEmail,

    // Color Pallete
    primaryColor,
    secondaryColor,
    thirdColor,
    inactiveColor,

    // Device
    deviceW,
    deviceH,
  };

  const storeForProvider = useMemo(() => store, [store]);
  return <AppContext.Provider value={storeForProvider}>{props.children}</AppContext.Provider>;
}

export { AppContext };
export default AppProvider;
