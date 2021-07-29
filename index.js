import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Module RCTImageLoader requires',
  'Module ToastManager',
  'Require cycles*',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RNWebGLTextureLoader requires main queue setup',
  // RN 0.58.6 ships with RNCameraRoll with this issue: https://github.com/facebook/react-native/issues/23755:
  'Module RCTImagePickerManager requires main queue setup since it overrides `init`',
])

// import 'react-native-console-time-polyfill';
import { Platform } from 'react-native';
// import * as Sentry from "@sentry/react-native";
import { config } from './sentrySettings'
import { USE_ERROR_REPORTING } from "./app/js/ExternalConfig";
import { loadRoutes } from "./app/js/views/Routes";
import { BackgroundProcessHandler } from "./app/js/backgroundProcesses/BackgroundProcessHandler";
import DeviceInfo from 'react-native-device-info';
import Bugsnag from "@bugsnag/react-native";

Bugsnag.start();
Bugsnag.notify(new Error('Test error'))
if (USE_ERROR_REPORTING) {
  // let sentryConfig = {
  //   dsn: null,
  //   // deactivateStacktraceMerging: true,
  //   autoBreadcrumbs: {
  //     'xhr': false,      // XMLHttpRequest
  //     'console': false,  // console logs
  //   }
  // }
  //
  // if (Platform.OS === 'android') {
  //   if (config.android) {
  //     sentryConfig.dsn = config.android;
  //   }
  // }
  // else {
  //   if (config.ios) {
  //     sentryConfig.dsn = config.ios;
  //   }
  // }
  //
  // Sentry.init(sentryConfig)
  //
  // Sentry.addBreadcrumb({
  //   category: 'AppState',
  //   data: {
  //     state: "started",
  //   }
  // });
}

loadRoutes();
BackgroundProcessHandler.start();

