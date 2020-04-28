import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Metodo contrutor da classe;
  constructor(
    private afa: AngularFireAuth
    ) { }

  // Metodo para login no sistema;
  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  // Metodo para registrar usuario no sistema;
  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  // Metodo para deslogar do sistema;
  logout() {
    return this.afa.auth.signOut();
  }

  // Metodo para verificar a autenticação do usuário;
  getAuth() {
    return this.afa.auth;
  }
}
