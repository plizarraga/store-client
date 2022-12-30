import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntetent(): void {
    this.basketService.createPaymentIntent().subscribe({
      next: (basket) => {
        console.log('Payment intent')
        console.log(basket);
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }
}
