import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Articulo } from '../articulo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articuloEditando: Articulo; 

  constructor(private firestoreService: FirestoreService) {
    // Crear un artículo vacío
    this.articuloEditando = {} as Articulo;
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("articulos", this.articuloEditando).then(() => {
      console.log('Artículo creado correctamente!');
      this.articuloEditando= {} as Articulo;
    }, (error) => {
      console.error(error);
    });
  }

}