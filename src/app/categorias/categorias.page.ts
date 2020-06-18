import { Component, OnInit, Provider } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categories:any[]=[];
  catList: any[]=[];
  recipes:any[]=[];
  selectedCat:any=1;

  constructor(private postPvdr:PostProvider, private toast:ToastController,private router:Router) { }

  ngOnInit() {
    this.loadCategories();
    this.loadRecipes();
  }

  loadCategories(){
    let body= {
      mode: "loadCategories"
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
  };

  loadRecipes(){
    let body= {
      category:this.selectedCat,
      mode: "showListByCategory"
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
      }
    }); 
  }

  onChangeCategory(id){
    this.selectedCat=id;
    this.loadRecipes();
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
