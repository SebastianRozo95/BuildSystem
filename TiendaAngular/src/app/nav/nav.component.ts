import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: Observable<firebase.User>;
  returnUrl: string;
  productos : Object[];

  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute, private compraService: CompraService) {
    this.user = afAuth.authState;
    this.afAuth.auth.onAuthStateChanged(function(user){
      if (!user) {
        router.navigateByUrl('/login');
      }
    });
  }

  isIn = false;
  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.productos = this.compraService.carrito;
    if(this.productos.length<1){
      this.router.navigateByUrl('/home');
    }

  }

  isValid(){
    if(this.compraService.carrito.length>0){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
  }

}
