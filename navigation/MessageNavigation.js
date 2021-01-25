import { createStackNavigator } from 'react-navigation-stack';
import Messages from "../screens/messages/Messages";
import Message from "../screens/messages/Message";
import styles from "../styles";

export default createStackNavigator({
    Messages: {
        screen: Messages,
        navigationOptions: {
            headerTintColor: styles.blackColor,
            // Router값이 이상한걸 Back으로 수정
            headerBackTitle: " ",
            title: "Messages"
        }
    } ,
    Message
});