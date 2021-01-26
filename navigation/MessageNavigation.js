import { createStackNavigator } from 'react-navigation-stack';
import Messages from "../screens/messages/Messages";
import Message from "../screens/messages/Message";
import styles from "../styles";

export default createStackNavigator({
      Messages: {
        screen: Messages,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            headerBackTitle: " ",
            title: "Messages"
        }
    },
        Message: {
        screen: Message,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            headerBackTitle: " ",
            title: "Message"
        }
    },
});