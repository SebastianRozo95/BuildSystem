/**
 * Clase Login
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: Observable<firebase.User>;
  returnUrl: string;
  showClass: boolean = true;
  msg: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.user = afAuth.authState;
    this.showClass = true;
    this.afAuth.auth.onAuthStateChanged(function(user){
      if (user) {
        router.navigateByUrl('/home');
      }
    });
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then(resolve => this.router.navigateByUrl('/home'))
    .catch(error => this.msg = error.message);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }

}
