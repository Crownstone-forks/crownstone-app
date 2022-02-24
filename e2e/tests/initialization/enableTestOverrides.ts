import {waitFor} from 'detox';
import {$, replaceText, screenshot, tap, tapReturnKey, waitToNavigate, waitToShow} from "../../util/TestUtil";
import {CONFIG} from "../../testSuite.e2e";

export const EnableTestOverrides = () => {
  test('should set the UI test overrides', async () => {
    await waitFor($('LoginSplash')).toBeVisible().withTimeout(10000);
    let versionElement = $('VersionHiddenButton');
    await versionElement.multiTap(5);

    await waitToNavigate('TestConfiguration');

    await replaceText("cloudV1Input"  ,`http://${CONFIG.IP_ADDRESS}:3000/api/`);
    await replaceText("cloudV2Input"  ,`http://${CONFIG.IP_ADDRESS}:3050/api/`);
    await replaceText("mockBluenetUrl",`http://${CONFIG.IP_ADDRESS}:3100/`);
    await tapReturnKey("mockBluenetUrl");
    await tap("mockImageLibrary");
    await tap("mockBluenetPromise");

    await screenshot();

    await tap('closeModal');

    await waitToNavigate('LoginSplash');
  });
};

