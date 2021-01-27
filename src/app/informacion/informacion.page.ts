import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Articulo } from '../articulo';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  id = null;

  constructor(private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.obtenerArticulo();
  }

  document: any = {
    id: "",
    data: {} as Articulo
  };

  articuloEditando: Articulo;
  idArticuloSelec: string;

  async alertConfirmar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Artículos',
      message: '¿Eliminar el artículo?',
      buttons: [
        {
          text: 'Aceptar',
          role: 'submit',
          handler: () => {
            this.clicBotonBorrar();
          }
        }, 
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
    });
    await alert.present();
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("articulos", this.id).then(() => {
      // Actualizar la lista completa
      // Limpiar datos de pantalla
      this.articuloEditando = {} as Articulo;
    });
    this.router.navigate(["/home"]);
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("articulos", this.id, this.document.data).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Articulo;
    })
  }
  
  clicBotonInsertar() {
    this.firestoreService.insertar("articulos", this.document.data).then(() => {
      console.log('Artículo creado correctamente!');
      this.document.data= {} as Articulo;
    }, (error) => {
      console.error(error);
    });
    this.router.navigate(["/home"]);
  }

  obtenerArticulo() {
    this.firestoreService.consultarPorId("articulos", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Articulo;
      }
    });
  }
  //Botones del footer
  home() {

    this.router.navigate(["/home"]);

  }

  infoApp() {

    this.router.navigate(["/about"]);

  }

  map() {

    this.router.navigate(["/map"]);

  }
}
