import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import send_message from '../../../server/apis/sendMessage';

const TestCompo = () => {
    const [messages, setMessages] = useState([]);
    // const message_collection = [];
    const [connected, setConnected] = useState(false);
    const option = {
        username: 'burjoy',
        password: "Tester123456"
    }
    const client = mqtt.connect('wss://fd463dae44d44830b87a2ab8ad7e97f1.s1.eu.hivemq.cloud:8884/mqtt', option);

    useEffect(() => {
         // Replace with your broker's WebSocket URL

        client.on('connect', () => {
            console.log('Connected to broker');
            setConnected(true);
            // client.subscribe('test', { qos: 0 }, (error) => {
            //     if (error) {
            //         console.error('Subscription error:', error);
            //     }
            // });
        });

        client.subscribe('test', { qos: 2 }, (error) => {
            if (error) {
                console.error('Subscription error:', error);
            }
        });

        client.on('message', (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            setMessages((prevMessages) => [...prevMessages, message.toString()]);
            // message_collection.push(message.toString());
            // console.log(message_collection);
            // if(message == "Testing MQTT connection"){
            //     const time = new Date().toLocaleString();
            //     // console.log(messages);
            //     send_message(time, message_collection);
            // }
        });

        client.on('error', (error) => {
            console.error('Connection error:', error);
        });

        // return () => {
        //     if (connected) {
        //         client.end();
        //     }
        // };
    }, []);
    console.log(messages);
    if(messages.at(-1) == "Testing MQTT connection"){
        const time = new Date().toLocaleString();
        // console.log(messages);
        send_message(time, messages);
    }

    return (
        <div>
            <h1>{connected}</h1>
            <h1>MQTT Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestCompo;
