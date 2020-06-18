import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  username=this.postPvdr.username;
  email=this.postPvdr.email;

  constructor(private router:Router, private toast:ToastController, private postPvdr:PostProvider) {
    if(!this.postPvdr.loginState){
      this.router.navigate(['/login']);
    }
    console.log(this.username);
    console.log(this.email);
  }

  ngOnInit() {
    if(!this.postPvdr.loginState){
      this.router.navigate(['/login']);
    }
    console.log(this.username);
    console.log(this.email);
  }

  logout(){
    this.postPvdr.loginState = false;
    this.postPvdr.username = "";
    this.postPvdr.email = "";
    this.router.navigate(['/login']);
  }

}
