import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider'
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {

  name: string = "";
  description: string = "";
  image: File;
  url:any;
  categories:any[]=[];
  catList: any[]=[];
  checkedCat: any[]=[];

  constructor(private router:Router, private toast:ToastController, private postPvdr:PostProvider) { }

  ngOnInit() {
    this.loadCategories();
  }

  async addRecipe(){
    if(this.name.trim()==""){
      const toast = await this.toast.create({
        message: 'Nombre requerido',
        duration: 2000
      });
      toast.present();
    }else if(this.description.trim()==""){
      const toast = await this.toast.create({
        message: 'Descripcion requerida',
        duration: 2000
      });
      toast.present();
    }else if(this.image == null){
      const toast = await this.toast.create({
        message: 'imagen requerida',
        duration: 2000
      });
      toast.present();
    }else{
      for(let i=0;i<this.catList.length;i++){
        if(this.catList[i]){
          this.checkedCat.push(i+1);
        }
      }
      console.log(this.checkedCat);
      let body= {
        name: this.name,
        description: this.description,
        image: this.url,
        categories: this.checkedCat,
        mode: "addRecipe"
      };

      this.postPvdr.postData(body, 'api.php').subscribe(async data =>{
        var alertmsg = data.msg;
        if(data.success){
          this.router.navigate(['/inicio']);
          const toast = await this.toast.create({
            message: '¡Receta añadida!',
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

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
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
        }
      }else{
        console.log(alertmsg);
      }
    }); 
  };

  onCheckedChange(category:any){
    if(this.catList[category.id-1]){
      this.catList[category.id-1]=false;
      console.log(this.catList[category.id-1]);
    }else if(!this.catList[category.id-1]){
      this.catList[category.id-1]=true;
      console.log(this.catList[category.id-1]);
    }
      
    
  }
}
