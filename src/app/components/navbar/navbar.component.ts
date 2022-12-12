import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icons } from '../../helper/icons'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  icons = icons;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigate(to: string) {
    console.log(to)
    this.router.navigate([to]);
  }  

}
