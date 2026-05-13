import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignalrService } from '../../services/signalr-service';
import { FriendsList, IPerson } from "../../componenets/friends-list/friends-list";
import { ChatBox, IMessage } from "../../componenets/chat-box/chat-box";
import { ChatService } from '../../services/chat-service';
import { IResponse } from '../../interface/IResponse';
import { IProfile } from '../../interface/IProfile';

@Component({
  selector: 'app-chat-page',
  imports: [ReactiveFormsModule, CommonModule, FriendsList, ChatBox],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css',
})
export class ChatPage implements OnInit {
  searchText = signal('');
  usermessage!:FormGroup;
  currentMessage = '';
  members = signal<IPerson[]>([]);
  selectedUser = signal<IPerson| null>(null);
  signalRService = inject(SignalrService);
  chatService = inject(ChatService);

  constructor(fb:FormBuilder){
    this.getMembers();
    this.usermessage = fb.group({
      message:''
    })
  }

   ngOnInit(): void {
    this.signalRService.startConnection();
  }

  getMembers(){
    this.chatService.getFriendsList().subscribe({
      next:(res:IResponse)=>{
        var result =  res.data as IProfile[];
        const modifiedData: IPerson[] =  result.map((member)=>{
          const avatar = member.name
          .split(' ')
          .map(x => x[0])
          .join('')
          .toUpperCase();

          return {
            id:member.id,
            avatar: avatar,
            unread: 0,
            name: member.name
          }
        })
        this.members.set(modifiedData);
        this.selectedUser.set(this.members()[0]);
      }
    })
  }
  
  messages = this.signalRService.messages;

  selectMember(id: string | number) {
    const memberData = this.members().find(x=>x.id == id);
    if(memberData){
      this.selectedUser.set(memberData);
    }
  }

  handleSendMessage(message:string){
    debugger;
    if (!message?.trim()) return;
    this.signalRService.sendMessage(
      this.selectedUser()?.id.toString() ?? "",
      message
    );
  }
}
