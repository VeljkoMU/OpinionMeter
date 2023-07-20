import { Component, OnInit } from '@angular/core';
import { PagingData } from '../models/paging-data';
import { Store } from '@ngrx/store';
import { State } from 'src/store/app-state';
import { selectCurrentPageNum } from 'src/store/selectors';
import { getPageResults } from 'src/store/actions';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-controls',
  templateUrl: './page-controls.component.html',
  styleUrls: ['./page-controls.component.css']
})
export class PageControlsComponent implements OnInit {
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  public pagingData: PagingData|undefined

  constructor(private store: Store<State>,) { }

  ngOnInit(): void {
    this.store.select(selectCurrentPageNum).subscribe((data: PagingData) => {
        this.pagingData = data;
    })
  }

  public navigateNext() {
    if(this.pagingData?.hasNextPage) {
    const newPage = this.pagingData?.currentPage + 1;
    this.store.dispatch(getPageResults({newPage: newPage}));
    }
  }

  public navigatePrev() {
    if(this.pagingData?.hasPrevPage) {
    const newPage = this.pagingData?.currentPage - 1;
    this.store.dispatch(getPageResults({newPage: newPage}));
    }
  }
}
