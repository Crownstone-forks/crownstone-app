import { colors, screenWidth, statusBarHeight, tabBarHeight, topBarHeight } from "../styles";
import { View, ViewStyle } from "react-native";
import {BlurView} from "@react-native-community/blur";
import * as React from "react";
import {NotificationLine} from "./NotificationLine";


export function NavBarBlur(props) {
  let backgroundColor = 'transparent';
  if (props.xlight) {
    backgroundColor = colors.white.rgba(0.4);
  }
  else if (props.xxlight) {
    backgroundColor = colors.white.rgba(0.6);
  }

  return (
    <BlurView blurType={'light'} blurAmount={4} style={{
      position:'absolute',
      bottom:0,
      height:tabBarHeight,
      width:screenWidth,
      backgroundColor
    }}>
      { props.line && <View style={{height:1, width: screenWidth, backgroundColor: colors.blue.rgba(0.45)}} /> }
    </BlurView>
  );
}

// export function TopBarBlur(props) {
//   let backgroundColor = 'transparent';
//   if (props.xlight) {
//     backgroundColor = colors.white.rgba(0.4);
//   }
//   else if (props.xxlight) {
//     backgroundColor = colors.white.rgba(0.6);
//   }
//
//   let style : ViewStyle = {
//     position:'absolute',
//     top:0, height: topBarHeight, width:screenWidth,
//     paddingBottom: 8,
//     backgroundColor
//   };
//
//   if (props.disabledBlur) {
//     return (
//       <View style={style}>
//         <View style={{flex:1}} />
//         { props.children }
//       </View>
//     )
//   }
//
//   return (
//     <BlurView blurType={'light'} blurAmount={4} style={style}>
//       <View style={{flex:1}} />
//       { props.children }
//     </BlurView>
//   );
// }



export function TopBarBlur(props: {xlight?: boolean, xxlight?: boolean, disabledBlur?: boolean, children?: any, showNotifications?: boolean}) {
  let backgroundColor = 'transparent';
  if (props.xlight) {
    backgroundColor = colors.white.rgba(0.4);
  }
  else if (props.xxlight) {
    backgroundColor = colors.white.rgba(0.6);
  }

  let style : ViewStyle = {
    height: topBarHeight, width:screenWidth,
    paddingBottom: 8,
    backgroundColor
  };

  if (props.disabledBlur) {
    return (
      <View style={{ position:'absolute', top:0 }}>
        <View style={style}>
        <View style={{flex:1}} />
        { props.children }
        </View>
        <NotificationLine showNotifications={props.showNotifications}/>
      </View>
    )
  }

  return (
    <View style={{ position:'absolute', top:0 }}>
      <BlurView blurType={'light'} blurAmount={4} style={style}>
        <View style={{flex:1}} />
        { props.children }
      </BlurView>
      <NotificationLine showNotifications={props.showNotifications}/>
    </View>
  );
}