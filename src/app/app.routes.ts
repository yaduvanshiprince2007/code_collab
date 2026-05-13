import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth-page/auth-page';
import { ChangePassword } from './componenets/change-password/change-password';
import { ForgotPassowrd } from './componenets/forgot-passowrd/forgot-passowrd';
import { Login } from './componenets/login/login';
import { Regsiter } from './componenets/regsiter/regsiter';
import { userAuthGuard } from './guard/user-auth-guard';
import { ProfilePage } from './pages/profile-page/profile-page';
import { ChatPage } from './pages/chat-page/chat-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },

  {
    path: 'auth',
    loadComponent: () => import('./pages/auth-page/auth-page').then(() => AuthPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () => import('./componenets/login/login').then(() => Login),
      },
      {
        path: 'signup',
        loadComponent: () => import('./componenets/regsiter/regsiter').then(() => Regsiter),
      },
      {
        path: 'forgotpassword',
        loadComponent: () =>
          import('./componenets/forgot-passowrd/forgot-passowrd').then(() => ForgotPassowrd),
      },
    ],
  },

  {
    path: 'profile',
     loadComponent: () => import('./pages/profile-page/profile-page').then(() => ProfilePage),
    canActivate: [userAuthGuard],
    children: [
      {
        path: 'changepassword',
        loadComponent: () => import('./componenets/change-password/change-password').then(() => ChangePassword),
      },
    ],
  },
  {
    path:'chat',
    canActivate: [userAuthGuard],
    loadComponent: () => import('./pages/chat-page/chat-page').then(() => ChatPage),
  }
];
