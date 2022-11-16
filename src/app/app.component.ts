import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe({
        next: () => this.router.navigateByUrl('/shop'),
        error: (error) => console.error(error),
      });
    }
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => console.log('basket init'),
        error: (error) => console.error(error),
      });
    }
  }
}
