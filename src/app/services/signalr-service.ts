import { inject, Injectable, signal } from '@angular/core';

import * as SignalR from '@microsoft/signalr';

import { AuthService } from './auth-service';
import { IMessage } from '../componenets/chat-box/chat-box';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  // Store all messages
  messages = signal<IMessage[]>([]);

  // Inject auth service
  authService = inject(AuthService);

  // SignalR connection
  #hubConnection!: SignalR.HubConnection;

  // Start websocket connection
  startConnection() {
    const token = this.authService.getToken();

    // Stop if token missing
    if (!token) {
      console.log('Token not found');
      return;
    }

    // Create connection
    this.#hubConnection = new SignalR.HubConnectionBuilder()

      .withUrl('https://localhost:7203/chatHub', {
        // Send JWT token
        accessTokenFactory: () => token,

        // Optional transport
        transport: SignalR.HttpTransportType.WebSockets,
      })

      // Auto reconnect
      .withAutomaticReconnect()

      // Logging
      .configureLogging(SignalR.LogLevel.Information)

      .build();

    // Register all listeners
    this.registerEvents();

    // Start connection
    this.#hubConnection
      .start()

      .then(() => {
        console.log('SignalR Connected');
      })

      .catch((err) => {
        console.log('Connection Error:', err);
      });
  }

  // Register all SignalR events
  registerEvents() {
    // Receive message
    this.#hubConnection.on(
      'ReceiveMessage',

      (senderId: string, message: string) => {
        console.log('Message Received');

        console.log(senderId);

        console.log(message);

        // Add message to UI
        this.messages.update((prev) => [
          ...prev,

          {
            id: senderId,
            message,
            own: false,

            time: new Date().toLocaleTimeString(),
          },
        ]);
      },
    );

    // Reconnected
    this.#hubConnection.onreconnected(() => {
      console.log('SignalR Reconnected');
    });

    // Connection closed
    this.#hubConnection.onclose(() => {
      console.log('SignalR Connection Closed');
    });
  }

  // Send message to backend
  sendMessage(receiverId: string, message: string) {
    // Stop empty messages
    if (!message.trim()) return;

    this.#hubConnection
      .invoke('SendMessage', receiverId, message)
      .then(() => {
        this.messages.update((prev) => [
          ...prev,
          {
            id: 'me',
            message,
            own: true,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      })
      .catch((err) => {
        console.log('Send Error:', err);
      });
  }
}
