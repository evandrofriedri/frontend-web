// const accountService = require("./src/services/AccountService");
// import accountService from '../services/AccountService';
// import Api from './Api';

console.log(accountService);

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const saveSubscription = async (subscription) => {
  console.log('SALVARRRRRR SUBSCRIPTION');
  const response = await fetch('http://127.0.0.1:3000/save-subscription', {
    method: 'post',
    headers: { 'Content-type': "application/json" },
    body: JSON.stringify(subscription),
  });

  return response.json();
}

self.addEventListener("activate", async (e) => {
  console.log('addEventListener active');
  const subscription = await self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BNH4SAq-4ry8PjESZlF55feCmdPNWTgIiiBthVhft7PNO4aSBQWEUzGCs53pCqoomsIm-usXm01yhf5LPiZ4l4I'),
  });

  console.log(subscription);

  const response = await saveSubscription(subscription);
  console.log(response);
});

self.addEventListener("push", e => {
  self.registration.showNotification("Wohoo!!", { body: e.data.text() })
});