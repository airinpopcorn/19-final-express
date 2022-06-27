import http from 'http';
import { AddressInfo } from 'net';
import { app } from './app.js';

const PORT = process.env.PORT || 3200;

const onError = (error: Error) => {
    console.log(error.message);
};
const onListening = () => {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : (addr as AddressInfo).port;

    console.log(`Escuchando en el puerto ${bind}`);
};

app.set('port', PORT);
const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(PORT);
