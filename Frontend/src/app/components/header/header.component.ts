import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public currentUser;

  ngOnInit(): void {
    this.auth.user.subscribe(
      response => {
        console.log(response)
        this.currentUser = response;
      },
      error => console.log(error)
    )
  }

  logout() {
    this.auth.logout();
  }

}
