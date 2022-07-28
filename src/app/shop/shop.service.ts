import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPagination } from '../core/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private api = environment.api;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IPagination>(`${this.api}/products`);
  }
}
