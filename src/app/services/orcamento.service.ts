import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Orcamento } from '../interfaces/Orcamento';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private orcamentoColletion: AngularFirestoreCollection<Orcamento>;

  constructor(private afs: AngularFirestore) {
    this.orcamentoColletion = this.afs.collection<Orcamento>('Orcamento');
  }

  getOrcamentos() {
    return this.orcamentoColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addOrcamento(orcamento: Orcamento) {
    return this.orcamentoColletion.add(orcamento);
  }

  getOrcamento(id: string) {
    return this.orcamentoColletion.doc<Orcamento>(id).valueChanges();
  }
  updateOrcamento(id: string, orcamento: Orcamento) {

  }

  deleteOrcamento(id: string) {

  }
}
