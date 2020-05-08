
import { Languages } from "../../Languages"

function lang(key,a?,b?,c?,d?,e?) {
  return Languages.get("LocationPermissionOverlay", key)(a,b,c,d,e);
}
import * as React from 'react'; import { Component } from 'react';
import {
  Alert, Linking, Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Icon }         from '../components/Icon'
import { OverlayBox }   from '../components/overlays/OverlayBox'
import {styles, colors, screenHeight, screenWidth} from '../styles'
import { Bluenet } from "../../native/libInterface/Bluenet";
import { core } from "../../core";
import { NavigationUtil } from "../../util/NavigationUtil";
import { HiddenFadeIn, HiddenFadeInView } from "../components/animated/FadeInView";

export class LocationPermissionOverlay extends Component<any, any> {
  unsubscribe : any;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notificationType: props.status,
      waitingOnPermission: false,
      showRequestFailed: false
    };
    this.unsubscribe = [];
  }

  componentDidMount() {
    this.setState({ visible: true });
    this.unsubscribe.push(core.nativeBus.on(core.nativeBus.topics.locationStatus, (status) => {
      switch (status) {
        case "off":
          if (this.state.waitingOnPermission) {
            this.setState({showRequestFailed: true, notificationType: status})
            if (Platform.OS === 'ios') {
              Alert.alert(
lang("_Request_not_allowed______header"),
lang("_Request_not_allowed______body"),
[{text:lang("_Request_not_allowed______left"), onPress:() => {
                Linking.openURL('app-settings:')
              }}])
            }
            return;
          }
          this.setState({notificationType: status});
          break;
        case "on":
          this.setState({visible: false, notificationType: status ,waitingOnPermission: false, showRequestFailed: false},
            () => {  NavigationUtil.closeOverlay(this.props.componentId); });
          break;
        case "unknown":
          this.setState({notificationType: status});
          break;
        case "noPermission":
          this.setState({notificationType: status});
          break;
        default: // "unknown":
          this.setState({notificationType: status});
          break;
      }
    }));
  }

  componentWillUnmount() {
    this.unsubscribe.forEach((callback) => {callback()});
    this.unsubscribe = [];
  }

  _getTitle() {
    switch (this.state.notificationType) {
      case "foreground":
        return "Only while-in-app permissions granted.";
      case "on":
        return "Location Services are on!";
      case "off":
        return "Location Services are disabled.";
      case "noPermission":
        return "Location permission missing.";
      default: // "unknown":
        return "Starting Location Services ...";
    }
  }

  _getText() {
    switch (this.state.notificationType) {
      case "foreground":
        return "Crownstone cannot react to your presence while the app is in the background with this permission.";
      case "on":
        return "Everything is great!";
      case "off":
      case "noPermission":
        return "Without location services, Crownstones cannot respond to your location and the app can\'t communicate with Crownstones correctly. This permission is required for the app to function.";
      default: // "unknown":
        return "This should not take long!";
    }
  }
  _getButton() {
    switch (this.state.notificationType) {
      case "foreground":
      case "off":
      case "noPermission":
        return (
          <TouchableOpacity
            onPress={() => { this.setState({waitingOnPermission: true}); Bluenet.requestLocationPermission() }}
            style={[styles.centered, {
              width: 0.4 * screenWidth,
              height: 36,
              borderRadius: 18,
              borderWidth: 2,
              borderColor: colors.blue3.rgba(0.5),
            }]}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: colors.blue3.hex}}>{ lang("Request_Permission") }</Text>
          </TouchableOpacity>
        );
    }
  }


  render() {
    return (
      <OverlayBox
        visible={this.state.visible}
        overrideBackButton={false}
      >
        <View style={{flex:1}} />
        <Icon
          name="ios-navigate"
          size={Math.min(0.30*screenHeight, 0.5*screenWidth)}
          color={colors.blue3.hex}
        />
        <View style={{flex:1}} />
        <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.blue3.hex, padding:5, textAlign:'center'}}>
          {this._getTitle()}
        </Text>
        <Text style={{fontSize: 11, fontWeight: 'bold',  color: colors.blue3.hex, padding:5, textAlign:'center'}}>
          {this._getText()}
        </Text>
        <View style={{flex:1}} />
        {this.state.showRequestFailed ?
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: colors.blue3.hex, padding: 5, textAlign: 'center' }}>{ lang("Request_failed____Youll_h") }</Text>
          : this._getButton()
        }
        <View style={{flex:1}} />
      </OverlayBox>
    );
  }
}