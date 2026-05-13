import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, effect, input, output } from '@angular/core';
import { IProfile } from '../../interface/IProfile';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  userSignupForm!:FormGroup;
  cancelEdit = output<boolean>();
  editProfileDetail = input<IProfile |null>(null);

  constructor(fb:FormBuilder){
    this.userSignupForm = fb.group({
      name: '',
      email:'',
      phone:'',
    });

    effect(() => {

      const profile = this.editProfileDetail();

      if (profile) {

        this.userSignupForm.patchValue({
          name: profile.name,
          email: profile.email,
          phone: profile.phoneNo
        });
      }
    });
  }
  
  onCancelEdit(){
    this.cancelEdit.emit(false);
  }

  handleSubmit(){
    this.onCancelEdit();
  }
}
