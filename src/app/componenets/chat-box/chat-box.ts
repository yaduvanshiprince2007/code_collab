import { Component, computed, input, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IPerson } from '../friends-list/friends-list';

export interface IMessage {
  id: string;
  message: string;
  own: boolean;
  time: string;
}

@Component({
  selector: 'app-chat-box',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
})
export class ChatBox {
  messages = input<IMessage[]>([]);
  selectedUser = input<IPerson | null>();
  sendMessage = output<string>();

  userMessage = computed(() => {
    const currentUser = this.selectedUser();
    if (!currentUser) return [];
    return this.messages();
  });

  usermessage!: FormGroup;

  constructor(fb: FormBuilder) {
    this.usermessage = fb.group({
      message: '',
    });
  }

  handleOnSubmit() {
    const { message } = this.usermessage.value;
    this.sendMessage.emit(message);
    this.usermessage.reset();
  }
}
