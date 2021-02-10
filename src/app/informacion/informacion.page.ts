import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Articulo } from '../articulo';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

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
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private imagePicker: ImagePicker) { }

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
  //fileURL: string;

  async uploadImagePicker() {
    //Mensaje de espera
    const loading = await this.loadingController.create({
      message: 'Por favor espere...'
    });

    //Mensaje de finalización de subida de imagen
    const toast = await this.toastController.create({
      message: 'Imagen subida con éxito',
      duration: 2000
    });

    //Comprobar si la aplicación tiene permisos de lectura
    this.imagePicker.hasReadPermission().then(
      (result) => {
        //Si no tiene permiso de lectura se solicita al usuario
        if(result == false) {
          this.imagePicker.requestReadPermission();
        } else {
          //Abrir selector de imágenes
          this.imagePicker.getPictures({
            maximumImagesCount: 1,    //Permite 1 imagen
            outputType: 1             // 1 = Base 64
          }).then(
            (results) => {
              //En la variable results se tienen las imágenes seleccionadas
              let nombreCarpeta = "imagenes";
              //Recorrer todas las imágenes que haya seleccionado el usuario
              //Aunque realmente sólo será 1 como se ha indicado en las opciones
              for (var i = 0; i < results.length; i++) {
                //Muestra mensaje de espera
                loading.present();
                //Assignar nombre de imagen en función de la hora actual para
                //evitar duplicidades de nombres
                let nombreImagen = `${new Date().getTime()}`;
                //Llamar al método que sube la imagen al Storage
                this.firestoreService.uploadImage(nombreCarpeta, nombreImagen,
                results[i])
                .then(snapshot => {
                  snapshot.ref.getDownloadURL()
                  .then(downloadURL => {
                    //En la variable downloadURL se tiene la dirección de descarga
                    //de la imagen
                    console.log("downloadURL:" + downloadURL);
                    //Meter el enlace de la imagen en el objeto
                    this.document.data.imagen = downloadURL;
                    //fileURL = downloadURL;
                    //Mostrar el mensaje de finalización de subida
                    toast.present();
                    //Ocultar mensaje de espera
                    loading.dismiss();
                  })
                })
              }
            },
            (err) => {
              console.log(err)
            }
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  async deleteFile(fileURL) {
    console.log('Llega a iniciar deleteFile con la URL: '+fileURL);
    const toast = await this.toastController.create({
      message: 'Archivo eliminado correctamente',
      duration: 2000
    });
    this.firestoreService.deleteFileFromURL(fileURL)
    .then(() => {
      toast.present();
    }, (err) => {
      console.log(err);
    });
  }

  async alertConfirmar(fileURL) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Artículos',
      message: '¿Eliminar el artículo?',
      buttons: [
        {
          text: 'Aceptar',
          role: 'submit',
          handler: () => {
            this.clicBotonBorrar(fileURL);
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

  clicBotonBorrar(fileURL) {
    this.deleteFile(fileURL);
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
        this.document.data = {};
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
