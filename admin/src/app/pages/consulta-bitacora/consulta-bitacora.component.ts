import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Bitacora } from 'src/app/models/bitacora';

@Component({
  selector: 'app-consulta-bitacora',
  templateUrl: './consulta-bitacora.component.html',
  styleUrls: ['./consulta-bitacora.component.css']
})
export class ConsultaBitacoraComponent implements OnInit {

  id: string;
  item: Bitacora = new Bitacora()
  constructor(private service: BitacoraService, private route: ActivatedRoute, private alert: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.service.obtenerUno(this.id).subscribe(data => {
      this.item = data
    })
  }

}
