import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';

export interface Inavitem{
  name:string,
  route:string,
}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(_authService:AuthService){
  }
  navBarData:Inavitem[] =[
    {name:'Home',route:'/home'},
    {name:'Profile',route:'/profile'},
    {name:'Chat',route:'/chat'}
  ]
}
