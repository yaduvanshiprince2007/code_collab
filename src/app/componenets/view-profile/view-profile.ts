import { Component, EventEmitter, input, output, signal } from '@angular/core';
import { IProfile } from '../../interface/IProfile';

@Component({
  selector: 'app-view-profile',
  imports: [],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {

  profiledata = input<IProfile | null>();
  edit = output<boolean>();

  onEditClick(){
    this.edit.emit(true);
  }
}
