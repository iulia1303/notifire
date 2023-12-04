import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Dimensions} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
// import firebase from './firebase';
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function App() {
    // firebase();
    async function onDisplayNotification() {
        // // Request permissions (required for iOS)
        // await notifee.requestPermission()
        //
        // // Create a channel (required for Android)
        // const channelId = await notifee.createChannel({
        //     id: 'default',
        //     name: 'Default Channel',
        // });
        //
        // // Display a notification
        // await notifee.displayNotification({
        //     title: 'Notification Title',
        //     body: 'Main body content of the notification',
        //     android: {
        //         channelId,
        //         smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        //         // pressAction is needed if you want the notification to open the app when pressed
        //         pressAction: {
        //             id: 'default',
        //         },
        //     },
        // });
    }
    const notifications = [
        {
            "id": 41,
            "title": "Morning Stretch Reminder",
            "content": "Start your day with a good stretch! Stretching in the morning helps improve flexibility and blood circulation.",
            "created_at": "2023-11-02T07:00:00.000000Z",
            "updated_at": "2023-11-02T07:00:00.000000Z",
            "read": 0
        },
        {
            "id": 42,
            "title": "Hydration Alert",
            "content": "Time to drink water! Keep yourself hydrated to maintain focus and energy throughout the day.",
            "created_at": "2023-11-03T09:30:00.000000Z",
            "updated_at": "2023-11-03T09:30:00.000000Z",
            "read": 1
        },
        {
            "id": 43,
            "title": "Fruit Break",
            "content": "Snack time! Grab a healthy fruit for a nutritious and refreshing break.",
            "created_at": "2023-11-04T11:00:00.000000Z",
            "updated_at": "2023-11-04T11:00:00.000000Z",
            "read": 1
        },
        {
            "id": 44,
            "title": "Bedtime Wind-down",
            "content": "Prepare for bed. Wind down by avoiding screens and creating a relaxing atmosphere for better sleep quality.",
            "created_at": "2023-11-05T21:30:00.000000Z",
            "updated_at": "2023-11-05T21:30:00.000000Z",
            "read": 0
        },
        {
            "id": 45,
            "title": "Workout Session",
            "content": "Time to hit the gym! Enjoy a workout session to boost your energy and improve your overall health.",
            "created_at": "2023-11-06T18:00:00.000000Z",
            "updated_at": "2023-11-06T18:00:00.000000Z",
            "read": 0
        },
        {
            "id": 46,
            "title": "Healthy Snack Option",
            "content": "Discover a new healthy snack option! Try some nuts or seeds for a tasty and nutritious treat.",
            "created_at": "2023-11-07T15:00:00.000000Z",
            "updated_at": "2023-11-07T15:00:00.000000Z",
            "read": 0
        },
        {
            "id": 47,
            "title": "Mindful Breathing",
            "content": "Take a moment for mindful breathing. Relax and focus on your breath to reduce stress and improve concentration.",
            "created_at": "2023-11-08T12:00:00.000000Z",
            "updated_at": "2023-11-08T12:00:00.000000Z",
            "read": 0
        },
        {
            "id": 48,
            "title": "Water Tracking",
            "content": "Have you reached your water intake goal today? Track and ensure you're drinking enough water for optimal health.",
            "created_at": "2023-11-09T16:30:00.000000Z",
            "updated_at": "2023-11-09T16:30:00.000000Z",
            "read": 0
        },
        {
            "id": 49,
            "title": "Healthy Recipe",
            "content": "Explore a new healthy recipe! Cooking at home with nutritious ingredients can be both fun and beneficial.",
            "created_at": "2023-11-10T13:45:00.000000Z",
            "updated_at": "2023-11-10T13:45:00.000000Z",
            "read": 0
        },
        {
            "id": 50,
            "title": "Bedtime Reminder",
            "content": "Bedtime approaching! Establish a consistent sleep schedule for better rest and overall well-being.",
            "created_at": "2023-11-11T22:00:00.000000Z",
            "updated_at": "2023-11-11T22:00:00.000000Z",
            "read": 0
        }
    ]

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [markingReadNotificationId, setMarkingReadNotificationId] = useState(false);
    const [remoteMessage, setRemoteMessage] = useState({});

    // messaging().onMessage(async remoteMessage => {
    //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     setRemoteMessage(JSON.stringify(remoteMessage));
    // });
    const handleNotificationPress = (notification) => {
        if (notification?.read === 0 && !markingReadNotificationId) {
            setMarkingReadNotificationId(notification.id);
            const updatedNotifications = notifications
                ? notifications?.map((n) =>
                    n?.id === notification?.id
                        ? {
                            ...n,
                            read: 1
                        }
                        : { ...n }
                )
                : null;
        }
    };
    return (
        <ScrollView style={styles.container}>
            {/*<View><Text>{remoteMessage}</Text></View>*/}
            <View style={styles.header}>
                <Button title="Display Notification" onPress={() => onDisplayNotification()} />
                <TouchableOpacity>
                    <Text style={styles.readAllNotifications}>
                        Read all
                    </Text>
                </TouchableOpacity>
                <View style={styles.icon}>
                    <Text style={styles.iconText}>
                        3
                    </Text>
                </View>
            </View>
            <View style={styles.notifications}>
                {notifications &&
                    notifications?.map((notification) => (
                        <TouchableOpacity
                            onPress={() => handleNotificationPress(notification)}
                            key={notification.id}
                            style={[
                                styles.notification,
                                notification?.read && styles.readNotification
                            ]}
                        >
                            <Text style={styles.notificationTitle}>
                                {notification.title}
                            </Text>
                            <Text style={styles.notificationText}>
                                {notification.content}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 12
                }}
            >
                {page > 1 && (
                    <Button
                        title={'Previous'}></Button>
                )}
                <Text style={{alignSelf: 'center'}}>
                    Page {page}/{totalPages}
                </Text>
                {page < totalPages && (
                    <Button
                        title={'Next'}></Button>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 16
    },
    readAllNotifications: {
        // fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.35,
        color: '#000',
        textDecorationLine: 'underline'
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold'
    },
    notifications: {
        flex: 1,
        padding: 16
    },
    notification: {
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        minHeight: height / 10,
        width: width * 0.93,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    readNotification: {
        opacity: 0.5
    },
    notificationTitle: {
        // fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.35,
        color: '#000',
        marginBottom: 5
    },
    notificationText: {
        // fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.35,
        color: '#000'
    },
    animationText: {
        color: '#000',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 100,
        fontSize: 18
    },
    lottieAnimation: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: width / 3
    }
});
