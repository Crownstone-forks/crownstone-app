
import { Languages } from "../../Languages"

function lang(key,a?,b?,c?,d?,e?) {
  return Languages.get("AddItemsToSphere", key)(a,b,c,d,e);
}
import * as React from 'react'; import { Component } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';


import { screenWidth, colors, deviceStyles, screenHeight } from "../styles";
import {Background} from "../components/Background";
import {textStyle} from "../deviceViews/elements/DeviceBehaviour";
import {IconButton} from "../components/IconButton";
import { core } from "../../core";
import { TopbarBackButton } from "../components/topbar/TopbarButton";
import { NavigationUtil } from "../../util/NavigationUtil";
import { Permissions } from "../../backgroundProcesses/PermissionManager";


let iconSize = 100;

export const addCrownstoneExplanationAlert = (actionOnOK = () => {}) => {
  Alert.alert(
    lang("_Adding_a_Crownstone__Plu_header"),
    lang("_Adding_a_Crownstone__Plu_body"),
    [{text: lang("_Adding_a_Crownstone__Plu_left"), style:'cancel',onPress: () => { Linking.openURL('https://shop.crownstone.rocks/?launch=en&ref=http://crownstone.rocks/en/').catch(err => {}) }},
          {
    text: lang("_Adding_a_Crownstone__Plu_right"), onPress: () => { actionOnOK() }}]
  );
};

export class AddItemsToSphere extends Component<any, any> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params === undefined) { return }

    return {
      title: lang("Add_to_Sphere"),
      headerLeft: <TopbarBackButton text={lang("Back")} onPress={() => { NavigationUtil.back(); }} />
    }
  };

  render() {
    let hightlightAddCrownstoneButton = false;
    if (Permissions.inSphere(this.props.sphereId).seeSetupCrownstone) {
      let state = core.store.getState();
      let sphere = state.spheres[this.props.sphereId];
      if (sphere) {
        if (Object.keys(sphere.stones).length === 0) {
          hightlightAddCrownstoneButton = true;
        }
      }
    }

    return (
      <Background image={core.background.detailsDark} hasNavBar={false}>
        <ScrollView>
          <View style={{ width: screenWidth, alignItems:'center' }}>
            <View style={{height: 30}} />
            <Text style={[deviceStyles.header]}>{ lang("Add_to_your_Sphere") }</Text>
            <View style={{height: 0.2*iconSize}} />
            <IconButton
              name="c1-sphere"
              size={0.75*iconSize}
              color="#fff"
              buttonSize={iconSize}
              buttonStyle={{backgroundColor:colors.csBlueDark.hex, borderRadius: 0.2*iconSize}}
            />
            <View style={{height: 0.2*iconSize}} />
            <Text style={textStyle.specification}>{ lang("You_can_add_Rooms__People") }</Text>
            <View style={{height: 0.2*iconSize}} />
            <View  style={{flexDirection:'row', alignItems:'center'}}>
              <AddItem icon={'md-cube'} label={ lang("Room")} callback={() => {
                NavigationUtil.navigateAndReplace("RoomAdd", { sphereId: this.props.sphereId });
              }} />
              <AddItem icon={'c2-crownstone'} highlight={hightlightAddCrownstoneButton} label={ lang("Crownstone")} callback={() => {
                NavigationUtil.navigateAndReplace("AddCrownstone", {sphereId: this.props.sphereId});
              }} />
            </View>
            <View  style={{flexDirection:'row'}}>
              <AddItem icon={'ios-body'} label={ lang("Person")} callback={() => {
                NavigationUtil.navigateAndReplace("SphereUserInvite",{sphereId: this.props.sphereId});
              }} />
              <AddItem icon={'ios-link'} label={ lang("Something_else_")} callback={() => {
                NavigationUtil.navigateAndReplaceVia("SphereEdit","SphereIntegrations",{sphereId: this.props.sphereId})
              }} />
            </View>
          </View>
          <View style={{height: 30}} />
        </ScrollView>
      </Background>
    );
  }
}

function AddItem(props) {
  let usedIconSize = iconSize;
  if (props.highlight) { usedIconSize = 1.3*iconSize}

  return (
    <TouchableOpacity style={{alignItems:'center', padding:10}} onPress={() => { props.callback(); }}>
      <IconButton
        name={props.icon}
        size={0.75*usedIconSize}
        color={colors.white.hex}
        addColor={props.highlight ? colors.green.hex : colors.menuBackground.hex}
        addIcon={true}
        buttonSize={usedIconSize}
        buttonStyle={{
          backgroundColor: props.highlight ? colors.menuTextSelected.hex : colors.green.hex,
          borderRadius: 0.2*usedIconSize,
          borderColor: colors.white.hex,
          borderWidth: props.highlight ? 5 : 0,
        }}
      />
      <Text style={{paddingTop:10, color: colors.white.hex, fontWeight:'bold'}}>{props.label}</Text>
    </TouchableOpacity>
  );
}