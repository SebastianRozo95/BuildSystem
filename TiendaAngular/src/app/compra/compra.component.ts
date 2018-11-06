/**
 * Clase de compra
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CompraService } from '../compra.service'
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  productos : Array<any>;
  total: number = 0;
  returnUrl: string;
  items: FirebaseListObservable<any>;

  constructor(private compraService: CompraService, db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.items = db.list('/products');
    this.productos = this.compraService.carrito;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.calculateTotals()
  }

  calculateTotals() {
    for(let data of this.productos) {
      this.total += data.cantidad * data.valor;
    }
  }

  btnPagar(){
    var nuevaCantidad;
    for(let data of this.productos) {
      nuevaCantidad = data.disponible - data.cantidad;
      this.items.update(data.key, { disponible: nuevaCantidad });
    }
    this.compraService.carrito= [];
    this.total=0;
    this.router.navigateByUrl('/login');
  }

}
