import { Component, OnInit } from '@angular/core';
import { faTwitter, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;

  constructor() { }

  ngOnInit(): void {
  }

}
