<template>

</template>
<script setup>

import NotificationService from '../services/NotificationService';

const props = defineProps({
  user: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

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

const saveSubscription = async () => {
  const registration = await navigator.serviceWorker.register('/sw.js');
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.VUE_APP_PUBLIC_KEY),
  });

  const account = {
    account_id: props.user.account_id,
    role_id: props.user.role_id,
    subscription: JSON.stringify(subscription),
  }
  await NotificationService.saveNotification(account);
}

const requestNotificationPermission = async () => {
  if ( ('serviceWorker' in navigator) && ('Notification' in window) && ('PushManager' in window) ) {
    const registration = await navigator.serviceWorker.register('/sw.js');
    let permission;
    if (registration) {
      permission = await Notification.requestPermission();
    }
    if ( (permission === 'granted') && (props.user) ) {
      await saveSubscription();
    }
  }
}

requestNotificationPermission();
</script>