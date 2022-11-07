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

  // private routerSelectedMenu() {
  //   this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
  //     if(event.url)
  //       this.isHome = this.location.isCurrentPathEqualTo('/home');
  //       this.selectedMenu = event.url.includes('home') || this.isHome ? 'Início' : this.selectedMenu;
        
  //   });

}
