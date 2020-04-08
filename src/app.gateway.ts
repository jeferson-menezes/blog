import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
    path: '/websockets', serveClient: true
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer() wss: Server;
    lista = []

    afterInit(server: Server) {
        Logger.log('Initialized')
    }

    handleDisconnect(client: Socket) {
        Logger.log('Cliente disconected: ' + client.id)
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log("cliente conectado" + client.id);
        Logger.log('Client conected' + client.id)
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void { // WsResponse<string> {
        console.log(payload);
        this.lista.push(payload)
        this.wss.emit('msgToClient', payload)
        // return { event: 'msgToClient', data: payload }
    }

}