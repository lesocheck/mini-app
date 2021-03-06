import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import {IQueryParameters, Paginated} from '../../helpers';
import {IAnimalListItem} from '../../models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  @Input() records$: Paginated<IAnimalListItem>;
  @Input() qp: IQueryParameters;
  @Output() navigateToPage = new EventEmitter<number>();
  @Output() rowClicked = new EventEmitter<number>();

  constructor() {}

  getPageNumber() {
    return this.qp.endAt / 10;
  }

  getPageCount() {
    if (this.records$) {
      return (Math.ceil(+this.records$.totalRecords / 10));
    }
  }

  goToPage(page: number) {
    this.navigateToPage.emit(page);
  }

  onRowClicked(rowId: number) {
    this.rowClicked.emit(rowId);
  }
}
