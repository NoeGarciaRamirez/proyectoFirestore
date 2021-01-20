import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Articulo } from '../articulo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articuloEditando: Articulo;
  arrayColeccionArticulos: any = [{
    id:"",
    data: {} as Articulo
  }]

  constructor(private firestoreService: FirestoreService, private router: Router) {
    // Crear un artículo vacío
    this.articuloEditando = {} as Articulo;
    this.obtenerListaArticulos();

  }

  obtenerListaArticulos() {
    this.firestoreService.consultar("articulos").subscribe((resultadoConsultaArticulos) => {
      this.arrayColeccionArticulos = [];
      resultadoConsultaArticulos.forEach((datosArticulo: any) => {
        this.arrayColeccionArticulos.push({
          id: datosArticulo.payload.doc.id,
          data: datosArticulo.payload.doc.data()
        });
      })
    });
  }

  idArticuloSelec: string;

  selecArticulo(articuloSelec) {
    console.log("Articulo seleccionado: ");
    console.log(articuloSelec);
    this.idArticuloSelec = articuloSelec.id;
    this.articuloEditando.nombre = articuloSelec.data.nombre;
    this.articuloEditando.descripcion = articuloSelec.data.descripcion;

    this.router.navigate(["/informacion/" , articuloSelec.id]);

  }

  nuevoArticulo() {

    this.router.navigate(["/informacion/nuevo"]);

  }

  //Botones del footer
  home() {

    this.router.navigate(["/home"]);

  }

  infoApp() {

    this.router.navigate(["/infoApp"]);

  }

  map() {

    this.router.navigate(["/map"]);

  }
}
