import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SelectPhoto from "../screens/photo/SelectPhoto";
import TakePhoto from "../screens/photo/TakePhoto";
import UploadPhoto from "../screens/photo/UploadPhoto";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
    {
    SelectPhoto: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "SelectPhoto"
      }
    },
    TakePhoto: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "TakePhoto"
      }
    }
    },
    {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.navyColor,
        marginBottom: 48
      },
      labelStyle: {
        color: styles.navyColor,
        fontWeight: "600"
      },
      style: {
          backgroundColor : styles.searchColor
      }
    }
    }
);

export default createStackNavigator({
    PhotoTabs: {
        screen: PhotoTabs,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            // Router값이 이상한걸 Back으로 수정
            headerBackTitle: " ",
            title: "Photo"
        }
    },
    UploadPhoto: {
        screen: UploadPhoto,
        navigationOptions: {
          headerTintColor: styles.blackColor,
          // Router값이 이상한걸 Back으로 수정
          headerBackTitle: " ",
          title: "UploadPhoto"
        }
    }
},
    {
        mode: "modal"
    }
);