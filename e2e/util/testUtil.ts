import { by, device, expect, element, waitFor } from 'detox';

export function $(id) {
  return element(by.id(id))
}
export function iosSingleAlertButton() {
  return element(by.type('_UIAlertControllerActionView')).atIndex(0)
}
export function iosIndexAlertButton(index: number = 0) {
  return element(by.type('_UIAlertControllerActionView')).atIndex(index)
}
export function androidSingleAlertButton() {
  return element(by.type('androidx.appcompat.widget.AppCompatButton'))
}
export function androidIndexAlertButton(index: number = 0) {
  return element(by.type('androidx.appcompat.widget.AppCompatButton')).atIndex(index);
}

async function tapAlertButton(buttonElement) {
  await expect(buttonElement).toBeVisible();
  await buttonElement.tap()
  await expect(buttonElement).not.toBeVisible();
}


export async function tapSingularAlertButton() {
  if (isIos()) {
    await tapAlertButton(iosSingleAlertButton());
  }
  else {
    await tapAlertButton(androidSingleAlertButton())
  }
}

export async function tapAlertCancelButton() {
  if (Platform() === 'ios') {
    await tapAlertButton(iosIndexAlertButton(0));
  }
  else {
    await tapAlertButton(androidIndexAlertButton(0))
  }
}
export async function tapAlertOKButton() {
  if (Platform() === 'ios') {
    await tapAlertButton(iosIndexAlertButton(1));
  }
  else {
    await tapAlertButton(androidIndexAlertButton(1))
  }
}

function delay(num) : Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, num)
  })
}

export function Platform() {
  return device.getPlatform()
}
export function isAndroid() {
  return device.getPlatform() === 'android';
}
export function isIos() {
  return device.getPlatform() === 'ios';
}