import * as React from "react";
import { AnimatedCircle } from "../../animated/AnimatedCircle";
import { Icon } from "../../Icon";
import { AlternatingContent } from "../../animated/AlternatingContent";
import { View } from "react-native";
import { StoneAvailabilityTracker } from "../../../../native/advertisements/StoneAvailabilityTracker";
import { colors, styles } from "../../../styles";
import { Util } from "../../../../util/Util";
import { xUtil } from "../../../../util/StandAloneUtil";
import { MINIMUM_REQUIRED_FIRMWARE_VERSION } from "../../../../ExternalConfig";


export function DeviceEntryIcon({stone, stoneId}) {
  let customStyle = {};

  let size = 60;

  let color = colors.csBlueDark.rgba(0.5);
  if (StoneAvailabilityTracker.isDisabled(stoneId) !== true || true) {
    color = colors.black.hex;
  }

  if (StoneAvailabilityTracker.isDisabled(stoneId) === false) {
    if (stone.errors.hasError === true) {
      return (
        <AlternatingContent
          style={{width:size, height:size, justifyContent:'center', alignItems:'center'}}
          fadeDuration={500}
          switchDuration={2000}
          contentArray={[
            <Icon name={'ios-warning'} size={40} color={colors.menuRed.hex} style={{backgroundColor:'transparent'}} />,
            <Icon name={stone.config.icon} size={35} color={colors.menuRed.hex} />,
          ]}
        />
      );
    }
    else if (
      stone.config.firmwareVersion && (
      Util.canUpdate(stone) === true ||
      xUtil.versions.canIUse(stone.config.firmwareVersion, MINIMUM_REQUIRED_FIRMWARE_VERSION) === false)
    ) {
      return (
        <AlternatingContent
          style={{width:size, height:size, justifyContent:'center', alignItems:'center'}}
          fadeDuration={500}
          switchDuration={2000}
          contentArray={[
            <Icon name={'c1-update-arrow'} size={44} color={color} style={{backgroundColor:'transparent'}} />,
            <Icon name={stone.config.icon} size={35} color={color} />,
          ]} />
      );
    }
  }
  else {
    customStyle = {borderWidth:1, borderColor: 'transparent'}
  }

  return (
      <Icon name={stone.config.icon} size={35} color={color} />
  );
}
