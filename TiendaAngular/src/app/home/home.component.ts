/**
 * Clase tienda(home)
 */
import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FilterPipe } from '../filter.pipe';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { CompraService } from '../compra.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home, body',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  inputCantidad : string[]=['0'];

  constructor(db: AngularFireDatabase, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private compraService: CompraService) {
    this.items = db.list('/products');
  }

  ngOnInit() {
    this.items.subscribe(items => items.forEach(item => this.inputCantidad.push('1') ));
  }

  modalProducto(nombre, valor, disponible, imagen, informacion) {
    this.modal.alert()
        .size('lg')
        .showClose(true)
        .title(nombre)
        .body(`
            <div class="row">
              <div class="col-xs-5 col-sm-4"><img src="`+ imagen +`" class="img-thumbnail"></div>
              <div class="col-xs-7 col-sm-8"><ul>
                <li><strong>Precio:</strong> `+ valor +`</li>
                <li><strong>Unidades Disponibles:</strong> `+ disponible +`</li>
                <li><strong>Información:</strong> `+ informacion +`</li>
              </ul></div>
            </div>`)
        .okBtn('atrás')
        .okBtnClass('btn btn-default pull-left')
        .open();
  }

  addCarrito(keyP, nombreP, valorP, disponibleP, imagenP){
    if(this.inputCantidad[keyP]!="0"){
      this.compraService.carrito.push({key: keyP, nombre: nombreP, valor: valorP, disponible: disponibleP, cantidad: this.inputCantidad[keyP], imagen: imagenP},)
    }

  }

}
