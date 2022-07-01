import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);

    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message);

    const reviewData = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `${reviewData.title} is on cinema!`,
      options: {
        body: reviewData.overview,
        icon: 'icons/192x192.png',
        image: `${CONFIG.BASE_IMAGE_URL + reviewData.poster_path}`,
        vibrate: [200, 100, 200],
      },
    });
  },
};

const sendDataToWebsocket = (reviewData) => {
  const data = JSON.stringify(reviewData);

  socket.send(data);
};

export { WebSocketInitiator, sendDataToWebsocket };
