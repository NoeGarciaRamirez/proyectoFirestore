import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  //Botones del footer
  home() {

    this.router.navigate(["/home"]);

  }

  infoApp() {

    this.router.navigate(["/about"]);

  }

  map() {

    this.router.navigate(["/map"]);

  }

}
