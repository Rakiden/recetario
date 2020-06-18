import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  recipes:any[]=[];
  
  constructor(private router:Router, private toast:ToastController, private postPvdr:PostProvider) { }

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes(){
    let body= {
      mode: "showList"
    };
    this.postPvdr.postData(body, 'api.php').subscribe(async data =>{
      var alertmsg = data.msg;
      if(data.success){
        this.recipes=data.recipes;
      }else{
        const toast = await this.toast.create({
          message: alertmsg,
          duration: 2000
        });
        toast.present();
        console.log(data.alertmsg);
      }
    }); 
  }

  toAddRecipe(){
    this.router.navigate(['/add-recipe']);
  }

  toInfo(id){
    let navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['/info'], navigationExtras);
    console.log(id);
  }
}
