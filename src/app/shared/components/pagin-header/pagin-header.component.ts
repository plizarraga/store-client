import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagin-header',
  templateUrl: './pagin-header.component.html',
  styleUrls: ['./pagin-header.component.scss']
})
export class PaginHeaderComponent {
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;
  
  constructor() { }
}
