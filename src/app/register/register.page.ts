import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = "";
  last_name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";

  constructor(private router:Router, private toast:ToastController, private postPvdr:PostProvider) { }

  ngOnInit() {
  }

  async register(){
    if(this.username.trim()==""){
      const toast = await this.toast.create({
        message: 'Nombre de usuario requerido',
        duration: 2000
      });
      toast.present();
    }else if(this.password.trim()==""){
      const toast = await this.toast.create({
        message: 'Contraseña requerida',
        duration: 2000
      });
      toast.present();
    }else if(this.password.trim()!=this.confirm_password.trim()){
      const toast = await this.toast.create({
        message: 'Contraseña requerida',
        duration: 2000
      });
      toast.present();
    }else if(this.name.trim()==""){
      const toast = await this.toast.create({
        message: 'Nombre requerido',
        duration: 2000
      });
      toast.present();
    }else if(this.last_name.trim()==""){
      const toast = await this.toast.create({
        message: 'Apellidos requeridos',
        duration: 2000
      });
      toast.present();
    }else if(this.email.trim()==""){
      const toast = await this.toast.create({
        message: 'Email requeridos',
        duration: 2000
      });
      toast.present();
    }else{
      let body= {
        name: this.name,
        last_name: this.last_name,
        username: this.username,
        email: this.email,
        password: this.password,
        mode: "register"
      };

      this.postPvdr.postData(body, 'api.php').subscribe(async data =>{
        var alertmsg = data.msg;
        if(data.success){
          this.router.navigate(['/login']);
          const toast = await this.toast.create({
            message: 'Registro completado',
            duration: 2000
          });
          toast.present();
          
        }else{
          const toast = await this.toast.create({
            message: alertmsg,
            duration: 2000
          });
          toast.present();
          console.log(alertmsg);
        }
      }); 
    }
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

}
