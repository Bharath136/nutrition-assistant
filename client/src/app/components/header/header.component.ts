import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn = false

  constructor(private router:Router){
    const token = localStorage.getItem('jwtToken')
    if(token){
      this.isLoggedIn = true
    }
  }

  onLogout(){
    localStorage.clear()
    this.isLoggedIn = false
    this.router.navigate(['/login'])
  }
}
