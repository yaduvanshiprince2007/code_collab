import { Component, input, output, signal } from '@angular/core';
import { IProfile } from '../../interface/IProfile';

export interface IPerson {
  id: string | number;
  avatar: string;
  unread: number;
  name: string;
}
@Component({
  selector: 'app-friends-list',
  imports: [],
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.css',
})
export class FriendsList {
  members = input<IPerson[]>([]);
  selectedData = output<string|number>();
  constructor(){
   
  }

  handleSetSelected(id:string|number){
    this.selectedData.emit(id);
  }
  
}
