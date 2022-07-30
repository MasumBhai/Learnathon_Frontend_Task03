import {Component, OnInit} from '@angular/core';
import {Page} from "../../service/page";
import {ShowUserService, UserData} from "../../service/show-user.service";
import {map} from "rxjs/operators";

interface PageInfo {
    offset: number;
    pageSize: number;
    limit: number;
    count: number;
}


@Component({
    selector: 'app-show-user',
    templateUrl: './show-user.component.html',
    styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
    
    constructor(private userService: ShowUserService) {
    }
    
    dataSource: UserData | null = null;
    loadingIndicator = true;
    reorderable = true;
    
    temp: any = [];
    
    rows: any = [];
    // column: any = [{name: 'username'}, {name: 'email'}, {name: 'birthday'},{name:'id'}];
    column: any = [{name: 'username'}, {name: 'email'}, {name: 'birthday'}];
    allColumns: any = [{name: 'username'}, {name: 'email'}, {name: 'birthday'}];
    
    // @ViewChild('user_table') table: DatatableComponent | any; //Kaaj nai
    // @ViewChild(DatatableComponent) table: DatatableComponent;
    
    
    ngOnInit() {
        // this.initDataSource();
        // this.table.offset = 0;
        this.fetch((data) => {
            this.temp = [...data];  // cache the list
            
            this.rows = data;   // push our initial complete list
            
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        });
    }
    
    toggle(col: any) {
        const isChecked = this.isChecked(col);
        
        if (isChecked) {
            this.column = this.column.filter((c: { name: any; }) => {
                return c.name !== col.name;
            });
        } else {
            this.column = [...this.column, col];
        }
    }
    
    isChecked(col: any) {
        return (
            this.column.find((c: { name: any; }) => {
                return c.name === col.name;
            }) !== undefined
        );
    }
    
    baseUrl = 'http://three60.learnathon.net/api1/api/register'
    
    paginationUrl(page_number: number = 1) {
        return this.baseUrl + '?querypage=' + page_number
    }
    
    fetch(cb: { (data: any): void; (arg0: any): void; }) {
        const req = new XMLHttpRequest();
        req.open('GET', this.paginationUrl(1));
        
        req.onload = () => {
            const data = JSON.parse(req.response);
            cb(data);
            console.log(data.length);
            console.log(data[0].id);
        };
        
        req.send();
    }
    
    count: number = 0
    
    plus() {
        this.count = this.count + 1
    }
    
    updateFilter(event: KeyboardEvent) {
        // @ts-ignore
        const val = event.target.value.toLowerCase();
        
        // filter our data
        const temp = this.temp.filter(function (d: { username: string; }) {
            return d.username.toLowerCase().indexOf(val) !== -1 || !val;
        });
        
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    }
    
    
    private initDataSource() {
        this.userService.findAll(1).pipe(
            map((userData: UserData) => this.dataSource = userData)
        ).subscribe(
            // next:(response) => console.log(response),
        );
    }
}
