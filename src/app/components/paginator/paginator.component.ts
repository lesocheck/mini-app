import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'table-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit, OnChanges {
  @Input() pagesCount: number;
  @Input() totalRows?: number;
  @Input() rowsPerPage: number;
  @Input() currentPage: number;
  @Output() pageSelected = new EventEmitter<number>();
  @Output() pageRowsChanged = new EventEmitter<number>();

  pages: Array<number> = [];
  pageChanged = new Subject<number>();

  constructor() {}

  ngOnInit() {
    this.pageChanged
      .pipe(debounceTime(1500))
      .subscribe(t => this.gotoPage(t));
  }

  ngOnChanges() {
    this.setPages();
  }


  gotoPage(page: number) {
    if (page < 0) {
      return;
    }
    this.currentPage = page;
    if (page >= 0) {
      this.pageSelected.emit(page);
    }
  }

  setPages() {
    const res = [];
    let i = 1;
    while (i <= this.pagesCount) {
      if (
        (i < 5 && this.currentPage < 5) ||
        Math.abs(this.currentPage - i + 1) < 2 ||
        (i < 3 && this.currentPage > 3) ||
        this.pagesCount - i < 3
      ) {
        res.push(i);
      } else {
        if (res[res.length - 1] !== 0) {
          res.push(0);
        }
      }
      i++;
    }
    this.pages = res;
  }

  getPage(page: number) {
    return page !== 0 ? page : '...';
  }
}
