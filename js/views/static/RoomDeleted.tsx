import * as React from 'react'; import { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import {Background} from "../components/Background";
import {colors, OrangeLine, screenWidth} from "../styles";

export class RoomDeleted extends Component<any, any> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Deleted",
    }
  };

  render() {
    return (
      <Background image={this.props.backgrounds.detailsDark}>
        <OrangeLine/>
        <Text>Room Deleted.</Text>
      </Background>
    )
  }

}

