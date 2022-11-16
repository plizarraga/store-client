import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PaginHeaderComponent } from './components/pagin-header/pagin-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';

@NgModule({
  declarations: [PaginHeaderComponent, PagerComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    PaginationModule,
    CarouselModule,
    BsDropdownModule,
    ReactiveFormsModule,
    PaginHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
  ],
})
export class SharedModule {}
