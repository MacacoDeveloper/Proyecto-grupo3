import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];

  ngOnInit() {
  }


  //Cerrar sesión
  singOut() {
    this.firebaseSvc.singOut();
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }
  // Obtener Productos
  getProducts() {
    let path = `users/${this.user().uid}/products`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        sub.unsubscribe();
      }
    })
  }

  //Agregar o actualizar producto
  addUpdateProduct(product?: Product) {
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add.update-modal'
    })
  }


}
