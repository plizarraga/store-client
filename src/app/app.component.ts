import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    const basket_id = localStorage.getItem('basket_id');

    if (basket_id) {
      this.basketService.getBasket(basket_id).subscribe({
        next: () => console.log('basket init'),
        error: (error) => console.error(error),
      });
    }
  }
}
