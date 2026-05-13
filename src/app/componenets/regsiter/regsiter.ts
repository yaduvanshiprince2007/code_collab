import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { IRegisterUser } from '../../interface/IProfile';

@Component({
  selector: 'app-regsiter',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './regsiter.html',
  styleUrl: './regsiter.css',
})
export class Regsiter {
    userSignupForm!:FormGroup;
    userService = inject(UserService);

  constructor(fb:FormBuilder){
    this.userSignupForm = fb.group<IRegisterUser>({
      name:'',
      email:'',
      phoneNo: '',
      password:'',
    })
  }

  handleSubmit(){
    console.log(this.userSignupForm.value);
    this.userService.registerUser(this.userSignupForm.value)
  }

}
