import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  id: any;
  recipe:any;
  categories:any[]=[];
  catList: any[]=[];

  constructor(private route: ActivatedRoute, private router: Router, private postPvdr:PostProvider, private toast:ToastController) { 
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    });
    
  }

  ngOnInit() {
    this.showRecipe();
    this.loadCategories();

  }

  showRecipe(){
    let body= {
      id_recipe: this.id,
      mode: "infoRecipe"
    };
    this.postPvdr.postData(body, 'api.php').subscribe(async data =>{
      var alertmsg = data.msg;
      if(data.success){
        this.recipe=data.recipe;
        console.log("lootro: "+this.recipe.id);
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

  loadCategories(){
    let body= {
      id:this.id,
      mode: "loadCategoriesById"
    };
    this.postPvdr.postData(body, 'api.php').subscribe(async data =>{
      var alertmsg = data.msg;
      if(data.success){
        this.categories=data.categories;
        for(let i=0;i<this.categories.length;i++){
          this.catList[i]=false;
          console.log(this.categories[i]);
        }
      }else{
        console.log(alertmsg);
      }
    }); 
  }

}
