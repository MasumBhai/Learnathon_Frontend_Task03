import {Component, Inject, OnInit} from '@angular/core';
import {ShowUserService} from "../../service/show-user.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  rows: any = [];
  totalCount: number = 0;
  dataParams: any = {
    page_num: 0,
    page_size: 0
  };
  editOverlaySet: boolean = false
  
  constructor(
      private all_users: ShowUserService,
      @Inject(DOCUMENT) private document: Document
  ) { }
  
  getAllHeroList() {
    this.rows = this.all_users.front;
    this.totalCount = this.all_users.total_count;
  }
  
  elementsPerPageToggled() {
    if (this.dataParams.page_size < 1 || !this.dataParams.page_size) {
      this.dataParams.page_size = 2
    }
  }
  
  editClicked(row: any) {
    // this.windowService.open(PopupWindowComponent, { title: `Edit ${row.username}'s Info` })
    this.editOverlaySet = !this.editOverlaySet
  }
  
  deleteClicked(row: any) {
    this.all_users.deleteUser(row.id)
    this.getAllHeroList()
  }
  
  ngOnInit(): void {
    this.dataParams.page_num = 1;
    this.dataParams.page_size = 8;
    this.getAllHeroList()
  }

}
