import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Articulo } from '../articulo';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  id = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  document: any = {
    id: "",
    data: {} as Articulo
  };

}
