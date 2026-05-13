import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
    passwordChangeForm!:FormGroup;

  constructor(fb:FormBuilder){
    this.passwordChangeForm = fb.group({
      old:'',
      new:''
    })
  }

  handleSubmit(){
    console.log(this.passwordChangeForm.value);
  }
}
