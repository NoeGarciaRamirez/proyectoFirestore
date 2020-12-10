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

  clicBotonInsertar() {
    this.firestoreService.insertar("articulos", this.articuloEditando).then(() => {
      console.log('Artículo creado correctamente!');
      this.articuloEditando= {} as Articulo;
    }, (error) => {
      console.error(error);
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


  clicBotonBorrar() {
    this.firestoreService.borrar("articulos", this.idArticuloSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaArticulos();
      // Limpiar datos de pantalla
      this.articuloEditando = {} as Articulo;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("articulos", this.idArticuloSelec, this.articuloEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaArticulos();
      // Limpiar datos de pantalla
      this.articuloEditando = {} as Articulo;
    })
  }

}
