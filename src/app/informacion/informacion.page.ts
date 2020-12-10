import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Articulo } from '../articulo';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  id = null;

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  document: any = {
    id: "",
    data: {} as Articulo
  };

  public asdas() {
    this.firestoreService.consultarPorId("articulos", idConsultar).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la articulo en consola
        console.log(this.document.data.titulo);
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Articulo;
      } 
    });
  };

}