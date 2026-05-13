import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PopupModal } from "../popup-modal/popup-modal";

@Component({
  selector: 'app-forgot-passowrd',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-passowrd.html',
  styleUrl: './forgot-passowrd.css',
})
export class ForgotPassowrd {

  passwordChangeForm!:FormGroup;

  constructor(fb:FormBuilder){
    this.passwordChangeForm = fb.group({
      email:''
    })
  }

  handleSubmit(){
    console.log(this.passwordChangeForm.value);
  }
}
