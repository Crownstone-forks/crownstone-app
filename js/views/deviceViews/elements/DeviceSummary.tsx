import * as React from 'react'; import { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  Text,
  View
} from 'react-native';
const Actions = require('react-native-router-flux').Actions;

import {styles, colors, screenWidth, screenHeight, availableScreenHeight} from '../../styles'
import { LOG } from '../../../logging/Log'
import {Util} from "../../../util/Util";
import {Icon} from "../../components/Icon";
import {StoneUtil} from "../../../util/StoneUtil";
import {AnimatedCircle} from "../../components/animated/AnimatedCircle";


export class DeviceSummary extends Component<any, any> {
  constructor() {
    super();
    this.state = {pendingCommand: false}
  }

  _getIcon(stone, element) {
    let currentState = stone.state.state;
    let color = colors.menuBackground.hex;
    if (currentState > 0) {
      color = colors.green.hex;
    }

    if (stone.config.disabled) {
      color = colors.gray.hex;
    }

    let size = 0.35*screenWidth;
    let innerSize = size - 6;
    return (
      <TouchableOpacity onPress={() => {
        Actions.applianceSelection({
          sphereId: this.props.sphereId,
          applianceId: stone.config.applianceId,
          stoneId: this.props.stoneId,
          callback: (applianceId) => {
            this.props.store.dispatch({
            sphereId: this.props.sphereId,
            stoneId: this.props.stoneId,
            type: 'UPDATE_STONE_CONFIG',
            data: {applianceId: applianceId}
          });
        }});
      }} >
        <AnimatedCircle size={size*1.05} color={colors.black.rgba(0.08)}>
          <AnimatedCircle size={size} color={color}>
            <AnimatedCircle size={innerSize} color={color} borderWidth={3} borderColor={colors.white.hex}>
              <Icon name={element.config.icon} size={0.575*innerSize} color={'#fff'} />
            </AnimatedCircle>
          </AnimatedCircle>
        </AnimatedCircle>
      </TouchableOpacity>
    );
  }

  _getButton(stone) {
    let currentState = stone.state.state;
    let label = 'Turn On';
    let color = colors.green.hex;
    if (currentState > 0) {
      label = 'Turn Off';
      color = colors.menuBackground.hex;
    }
    let size = 0.4*screenWidth;
    let innerSize = size - 8;
    let borderWidth = 3;

    if (stone.config.disabled) {
      color = colors.gray.hex;
      return (
        <View style={{width:0.75*screenWidth, height:size*1.05, alignItems:'center'}}>
          <View style={{flex:2}} />
          <Text style={deviceStyles.text}>{'Searching...'}</Text>
          <View style={{flex:1}} />
          <Text style={deviceStyles.subText}>{'Once I hear from this Crownstone, the button will reappear.'}</Text>
          <View style={{flex:1}} />
          <ActivityIndicator animating={true} size='small' color={colors.white.hex} />
          <View style={{flex:2}} />
        </View>
      );
    }


    if (this.state.pendingCommand === true) {
      return (
        <AnimatedCircle size={size*1.05} color={colors.black.rgba(0.08)}>
          <AnimatedCircle size={size} color={colors.white.hex}>
            <AnimatedCircle size={innerSize} color={colors.white.hex} borderWidth={borderWidth} borderColor={color}>
              <ActivityIndicator animating={true} size='large' color={colors.menuBackground.hex} />
            </AnimatedCircle>
          </AnimatedCircle>
        </AnimatedCircle>
      );
    }
    else {
      return (
        <TouchableOpacity onPress={() => {
          let newState = (currentState === 1 ? 0 : 1);
          this.setState({pendingCommand:true});

          StoneUtil.switchBHC(
            this.props.sphereId,
            this.props.stoneId,
            stone,
            newState,
            this.props.store,
            () => { this.setState({pendingCommand:false});},
            'from _getButton in DeviceSummary'
          );

        }}>
          <AnimatedCircle size={size*1.05} color={colors.black.rgba(0.08)}>
            <AnimatedCircle size={size} color={colors.white.hex}>
              <AnimatedCircle size={innerSize} color={colors.white.hex} borderWidth={borderWidth} borderColor={color}>
                <Text style={{color: color, fontSize:23, fontWeight:'600'}}>{label}</Text>
              </AnimatedCircle>
            </AnimatedCircle>
          </AnimatedCircle>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const store = this.props.store;
    const state = store.getState();
    const sphere = state.spheres[this.props.sphereId];
    const stone = sphere.stones[this.props.stoneId];
    const element = Util.data.getElement(sphere, stone);
    const location = Util.data.getLocationFromStone(sphere, stone);

    let locationLabel = "Currently in Room:";
    let locationName = "No";
    if (location) {
      locationLabel = "Located in:";
      locationName = location.config.name;
    }

    return (
      <View style={{flex:1, paddingBottom:35}}>
        <DeviceInformation left={"Energy Consumption:"} leftValue={stone.state.currentUsage + ' W'} right={locationLabel} rightValue={locationName} />
        <DeviceInformation left={stone.config.applianceId ? "Crownstone Name:" : "Connected Device:"}
                           leftValue={stone.config.applianceId ? stone.config.name : 'None'}
                           right={"Connected to Mesh:"} rightValue={stone.config.meshNetworkId ? 'Yes' : 'Not Yet'} />
        <View style={{flex:0.5}} />
        <View style={{width:screenWidth, alignItems:'center'}}>{this._getIcon(stone, element)}</View>
        <View style={{flex:1}} />
        <Text style={deviceStyles.explanation}>{stone.config.applianceId ? Util.spreadString('tap icon to change device') : Util.spreadString('tap icon to select device')}</Text>
        <View style={{flex:1}} />
        <View style={{width:screenWidth, alignItems:'center'}}>{this._getButton(stone)}</View>
        <View style={{flex:0.5}} />
      </View>
    )
  }
}


export class DeviceInformation extends Component<any, any> {
  render() {
    return (
      <View>
        <View style={{width:screenWidth, flexDirection:'row', padding:10, paddingBottom:0}}>
          <Text style={deviceStyles.subText}>{this.props.left}</Text>
          <View style={{flex:1}} />
          <Text style={[deviceStyles.subText]}>{this.props.right}</Text>
        </View>
        <View style={{width:screenWidth, flexDirection:'row', paddingLeft:10, paddingRight:10}}>
          <Text style={deviceStyles.text}>{this.props.leftValue}</Text>
          <View style={{flex:1}} />
          <Text style={[deviceStyles.text]}>{this.props.rightValue}</Text>
        </View>
      </View>
    )
  }
}


let textColor = colors.white;
let deviceStyles = StyleSheet.create({
  text: {
    color: textColor.hex,
    fontSize: 18,
    fontWeight:'600'
  },
  subText: {
    color: textColor.rgba(0.5),
    fontSize: 13,
    textAlign:'center'
  },
  explanation: {
    width: screenWidth,
    color: textColor.rgba(0.5),
    fontSize: 13,
    textAlign:'center'
  }
});