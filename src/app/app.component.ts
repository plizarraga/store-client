import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './models/product';
import { IPagination } from './models/pagination';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products: IProduct[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/products').subscribe(
      (respnse: IPagination) => {
        console.log(respnse);
        this.products = respnse.data
      },
      (error) => console.log(error)
    );
  }
}
