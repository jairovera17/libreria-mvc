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
    this.editar=false;
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

  private update_libro(input: any){
    input.edit=false;
    let URL = this.serverURL+'/libro/update_libro?titulo='+input.titulo
    +'&autor='+input.autor
    +'&editorial='+input.editorial
    +'&isbn='+input.isbn;
    this._http.get(URL)
      .subscribe(
        res=>{
          this.get_libros()
        },
        err=>{
          console.log('error modificando libro')
        }
      )
  }

  private search_libros(input: any){
    this.editar=false
    let URL = this.serverURL+'/libro/read_libro?titulo='+input;
    console.log(URL)
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

  private delete_libro(input: Libro){
    let URL = this.serverURL+'/libro/delete_libro?isbn='+input.isbn;
    this._http.get(URL)
      .subscribe(
        res=>{
          var index = this.libros.indexOf(input);
          this.libros.splice(index,1)
        },
        err=>{
          console.log('error eliminando libro')
        }
      )
  }

  private create_libro(input: any){
    this.editar=false;
    let URL = this.serverURL+'/libro/create_libro?titulo='+input.titulo
    +'&autor='+input.autor
    +'&editorial='+input.editorial
    +'&isbn='+input.isbn;
    this._http.get(URL)
      .subscribe(
        res=>{
          var nuevoLibro = new Libro('hola',input.titulo,input.autor,input.editorial,input.isbn);
          this.libros.push(nuevoLibro)
        },
        err=>{
          console.log('error creando libro')
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
    public isbn:string,
    public edit:boolean = false){}
}
