import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  private jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private router: Router) {
  }

  isUserAuthenticated() {
    const token: string | null = localStorage.getItem("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  
  public logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["login"]).then(() => alert("You have been Logged Out"));
  }

  ngOnInit(): void {
  }

}
