import { Component, EventEmitter, inject, output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ILoginReq } from '../../interface/ILogin';
import { IResponse } from '../../interface/IResponse';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userloginForm!:FormGroup;
  #authService!: AuthService;
  ForgotPassowrd = output<boolean>();
  router = inject(Router);

  constructor(fb:FormBuilder, _authService:AuthService){
    this.userloginForm = fb.group<ILoginReq>({
      userid:'',
      password:''
    });
    this.#authService = _authService;
  }

  async handleSubmit(){
    const res = await this.#authService.userlogin(this.userloginForm.value);
    if(res.success){
      await this.router.navigate(['/profile']);
    }
    else{
      alert("error while login")
    }
  }
  handleForgotClick(){
    this.ForgotPassowrd.emit(true);
  }
}
