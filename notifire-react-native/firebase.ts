import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
// @ts-ignore
import {initializeApp} from 'firebase/app';
import {Platform} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBYKBZ3VUrsPMGZnuKai6b8gDIg6-oPEm8',
    projectId: 'notifire-react-native',
    project_number: '195964618867',
    messagingSenderId: '195964618867',
    packageName: 'com.notifire',
    appId: '1:195964618867:android:fe6f9d6b6485c0e6918206'
};
export default function Firebase() {
    const vapidKey = 'BH_pLOOmS6Iz8OgEgGb-JUN81Ig54QmjvLcpfgy6dQMKxSwkqOjx3QOuZDm7gA0WukBgPaEXdl45gzyiARLH8L0'

    async function getFirebaseToken() {
        initializeApp(firebaseConfig);
        //store FCM token on the app current user id
        const authUserId = 1;
        //check if the app has right permissions before getting the FCM token
        const hasPermissions = await messaging().hasPermission();

        function getFCMToken() {
            return messaging().getToken({
                vapidKey: vapidKey
            });
        }

        if (Platform.OS === 'ios') {
            if (hasPermissions) {
                await messaging().registerDeviceForRemoteMessages();

                const fcmToken = await getFCMToken();

                await AsyncStorage.setItem(
                    'authUser',
                    JSON.stringify({fcm_token: fcmToken, id: authUserId})
                );
            } else {
                await messaging().requestPermission();
            }
        } else if (Platform.OS === 'android') {
            if (hasPermissions) {
                const fcmToken = await getFCMToken();

                await AsyncStorage.setItem(
                    'authUser',
                    JSON.stringify({fcm_token: fcmToken, id: authUserId})
                );
            }
        }
    }

    getFirebaseToken()
        .then((r) => console.log(r))
        .catch((error) => console.log(error))
}
