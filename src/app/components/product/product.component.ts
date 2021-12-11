import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Observable } from 'rxjs';
import { ProductI } from 'src/app/models/ProductI';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();
  products$: Observable<ProductI[]> = new Observable<ProductI[]>();
  products: any;
  file!: File ;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  constructor(private service:ProductServiceService) { }

  ngOnInit(): void {
    this.retrieveImage();
  }

  selectFile(event: any): void {
    this.file = event.target.files[0];
  }

  Save(){
    console.log(this.file)
    this.product.image = this.file;
    console.log(this.product);
    this.service.upload(this.product).subscribe( res=>{
      try {
        console.log('HTTP response', res)
        this.retrieveImage();
        this.product = new Product();
      } catch (error) {
        console.log('HTTP Error', error)
      }
    });
  }
/*
  retrieveProducts() {
    let data: any;
    this.service.get().pipe(
    ).subscribe(res =>{
      this.products = res
      this.base64Data = this.products.image;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    });
    console.log(this.products)
    };
*/
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    
   this.service.get().subscribe(data =>{
    this.products = data;
    console.log(data)
   });
  }
  retrieveImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.products$ = this.service.get()
  }
}
