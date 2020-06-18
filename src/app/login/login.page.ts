import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string = "";
  password:string = "";

  constructor(private router:Router, private toast:ToastController, private postPvdr:PostProvider) { 
    if(this.postPvdr.loginState){
      this.router.navigate(['/logout']);
    }
  }

  ngOnInit() {
    if(this.postPvdr.loginState){
      this.router.navigate(['/logout']);
    }
  }

  async login(){
    if(this.username.trim()==""){
      const toast = await this.toast.create({
        message: 'Nombre de usuario o email requerido',
        duration: 2000
      });
      toast.present();
    }else if(this.password.trim()==""){
      const toast = await this.toast.create({
        message: 'Contraseña requerida',
        duration: 2000
      });
      toast.present();
    }else{
      let body= {
        username: this.username,
        password: this.password,
        mode: "login"
      };

      this.postPvdr.postData(body, 'api.php').subscribe(async data =>{
        var alertmsg = data.msg;
        if(data.success){
          this.postPvdr.loginState = true;
          this.postPvdr.username = data.result['username'];
          this.postPvdr.email = data.result['email'];
          this.router.navigate(['/logout']);
          const toast = await this.toast.create({
            message: 'Inicio de sesión completado',
            duration: 2000
          });
          toast.present();
          
        }else{
          const toast = await this.toast.create({
            message: alertmsg,
            duration: 2000
          });
          toast.present();
          console.log(data.msg);
        }
      }); 
    }
  }

  toRegister(){
    this.router.navigate(['/register']);
  }
}
