import { Component, OnInit } from '@angular/core';
import { GeneroMusicaService } from '../../services/genero-musica.service';
import { IdiomaService } from '../../services/idioma.service';
import { AlertService } from '../../services/alert.service';
import { Musica } from '../../models/musica';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  constructor(private generoService: GeneroMusicaService, private idiomasService: IdiomaService, private alert: AlertService,
               private musica: MusicaService) { }
  objetos: Musica[] = [];
  filtros: any = {};
  generos: any[] = [];
  idiomas: any[] = [];
  ngOnInit() {
    this.cargarGeneros();
    this.cargarIdiomas();
    //this.cargar()
  }

  cargarGeneros() {
    this.generoService.obtener().subscribe(result => {
      this.generos = result
    })
  }

  cargarIdiomas() {
    this.idiomasService.obtener().subscribe(result => {
      this.idiomas = result;
    })
  }

  cargar() {
    console.log(this.filtros);
    if(!this.verificarParametros(this.filtros)) {
      this.alert.error('No ingreso parametros');
      return;
    }
    this.alert.showLoading()
    this.musica.obtener(this.filtros).subscribe(data => {
      this.objetos = data;
      console.log(this.objetos);
      this.alert.hideLoading();
    })
  }

  verificarParametros(obj) {
    if (Object.keys(obj).length === 0) return false;
    for(let key of Object.keys(obj)) {
      console.log(obj[key] !== "")
      if(obj[key] !== "") {
        return true;
      }
    }
    return false;
  }
}
