importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-messaging.js');

var config = {
  apiKey: 'AIzaSyBKAae8XUCloWylPeLBoe_IwESfEV5SXFg',
  authDomain: 'alex-nearest.firebaseapp.com',
  databaseURL: 'https://alex-nearest.firebaseio.com',
  projectId: 'alex-nearest',
  storageBucket: 'alex-nearest.appspot.com',
  messagingSenderId: '627687139349'
}

firebase.initializeApp(config);

const messaging = firebase.messaging();


messaging.requestPermission()
  .then(function () {
    console.log('requestPermission - OK');
    return messaging.getToken();
  })
  .then(function (token) {
    console.log('getToken - OK');
    console.log('Token: ' + token);
  })
  .catch(function (rr) {
    console.log('requestPermission failed! ' + err);
  });

messaging.onMessage(function(payload) {
  console.log('onMessage: ', payload);
});















/* // Initialize Firebase App

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '1019013830321'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
var messaging = firebase.messaging();


// Handle Background Notifications

// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.'

  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
}); */