import UDP from 'react-native-udp';

const getLocalIPAddress = async () => {
    return new Promise((resolve, reject) => {
    const socket = UDP.createSocket({ type: 'udp4' });

    socket.on('message', (msg, rinfo) => {
        console.log('Received %s from %s:%d', msg, rinfo.address, rinfo.port);
        resolve(rinfo.address);
        socket.close();
    });

    socket.on('error', (err) => {
        console.error('Error:', err);
        reject(err);
        socket.close();
    });

    socket.bind(0, () => {
        const message = Buffer.from('Hello, server!');
        socket.send(message, 0, message.length, 3000, '192.168.1.1', (err) => {
        if (err) {
            console.error('Error sending message:', err);
            reject(err);
            socket.close();
        }
    });
    });
});
};
