import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  serverURL = 'http://localhost:1337';
  libros : Libro[] = [];
  editar : boolean = false;
  constructor(private _http:Http) { }

  ngOnInit() {
    this.get_libros();
  }

  private get_libros(){
    let URL = this.serverURL+'/libro';
    this._http.get(URL)
      .subscribe(
        res=>{
          let rjson: Libro [] = res.json()
          this.libros = rjson
        },
        err=>{
          console.log('error getting all books')
        }
      )
  }

  private search_libros(input: string){
    let URL = this.serverURL+'/libro?titulo='+input;
    this._http.get(URL)
      .subscribe(
        res=>{
          let rjson: Libro[] = res.json();
          this.libros=rjson;
        },
        err=>{
          console.log('error getting especified book')
        }
      )
  }


}

class Libro{
  constructor(
    public id:string,
    public titulo:string,
    public autor:string,
    public editorial:string,
    public isbn:string){}
}
