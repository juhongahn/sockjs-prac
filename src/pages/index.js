import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ExampleComponent = () => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS('http://eenaa.jegal.shop:8080/socket');
    const stompClient = Stomp.over(sock);

    stompClient.connect({}, () => {
      console.log('Connected to STOMP WebSocket server');

      stompClient.subscribe('/topic/greetings', (greeting) => {
        console.log(JSON.parse(greeting.body).content);
      });
    });

    setStompClient(stompClient);

    return () => {
      //stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      {stompClient ? <div>Connected to STOMP WebSocket server</div> : <div>Disconnected from STOMP WebSocket server</div>}
    </div>
  );
};
export default ExampleComponent;