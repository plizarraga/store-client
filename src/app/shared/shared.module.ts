import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginHeaderComponent } from './components/pagin-header/pagin-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaginHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PaginHeaderComponent,
    PagerComponent
  ]
})
export class SharedModule { }
