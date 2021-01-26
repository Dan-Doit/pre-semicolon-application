import React from "react";
import styled from 'styled-components/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  margin: -30px 0;
  width: ${constants.width / 2.5};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.navyColor};
  margin-top: 20px;
  font-weight: 600;
`;

export default ({ navigation }) => (
  <View>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);