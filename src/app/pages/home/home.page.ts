import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { Subscription } from 'rxjs';
import { Orcamento } from 'src/app/interfaces/orcamento';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  [x: string]: any;
  private loading: any;
  private orcamento = new Array<Orcamento>();
  private OrcamentosSubscription: Subscription;


  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private orcamentosService: OrcamentoService,
    private authService: AuthService
    ) {
      this.OrcamentosSubscription = this.orcamentosService.getOrcamentos().subscribe(data => {
        this.orcamento = data;
      });
  }

  ngOnInit() {}

  ngonDestry() {
    this.OrcamentosSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  contato() {
    this.navCtrl.navigateForward('/contato');
  }

  agenda() {
    this.navCtrl.navigateForward('/agenda');
  }

  orcamentos() {
    this.navCtrl.navigateForward('/orcamento');
  }

  setting() {
    this.navCtrl.navigateForward('/settings');
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde, saindo do sistema...'
    });
    return this.loading.present();
  }

  deleteOramento() {
    console.log('Exclui um orçamento.');
  }
}
