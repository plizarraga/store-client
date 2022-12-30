import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkStepper } from '@angular/cdk/stepper';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper: CdkStepper;
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntetent(): void {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper.next();
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }
}
