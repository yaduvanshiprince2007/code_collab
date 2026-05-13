import { Component, signal } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { IProfile } from '../../interface/IProfile';
import { ViewProfile } from "../../componenets/view-profile/view-profile";
import { EditProfile } from "../../componenets/edit-profile/edit-profile";
import { PopupModal } from "../../componenets/popup-modal/popup-modal";

@Component({
  selector: 'app-profile-page',
  imports: [ViewProfile, EditProfile, PopupModal],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  profiledata = signal <IProfile | null>(null);
  profileDataEdit= signal<boolean>(false);

  constructor(private profileService: ProfileService) {
    this.getuserDetail();
  } // Removed FormBuilder if unused

  getuserDetail(){
    this.profileService.getprofileDetail().subscribe((data) => {
      this.profiledata.set(data);
    });
  }

  editUserDetail(isedit:boolean){
    this.profileDataEdit.set(isedit);
  }
}