import { Component, OnInit } from '@angular/core';
import { Orcamento } from 'src/app/interfaces/orcamento';
import { Subscription, from } from 'rxjs';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.page.html',
  styleUrls: ['./orcamento.page.scss'],
})
export class OrcamentoPage implements OnInit {
  private orcamentoDB: Orcamento = {};
  private loading: any;
  private orcamentoId: string = null;
  private orcamentoSubcrisption: Subscription;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private orcamentoService: OrcamentoService
  ) {
    // tslint:disable-next-line:no-string-literal
    this.orcamentoId = this.activatedRoute.snapshot.params['id'];

    // tslint:disable-next-line:curly
    if (this.orcamentoId) this.loadOrcamento();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.orcamentoSubcrisption) this.orcamentoSubcrisption.unsubscribe();
  }

  loadOrcamento() {
    this.orcamentoSubcrisption = this.orcamentoService.getOrcamento(this.orcamentoId).subscribe(data => {
      this.orcamentoDB = data;
    });
  }

  // Metodo realiza cadastro de orçamento;
  cancelarOrcamento() {
    this.navCtrl.navigateForward('/home');
  }

  // Metodo realiza cadastro de orçamento;
  async cadastarOrcamento() {
    await this.presentLoading();

    this.orcamentoDB.id = this.authService.getAuth().currentUser.uid;

    if (this.orcamentoId) {
      try {
        await this.orcamentoService.updateOrcamento(this.orcamentoId, this.orcamentoDB);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar orçamento.');
        this.loading.dismiss();
      }
    } else {
      this.orcamentoDB.createdAt = new Date().getTime();

      try {
        await this.orcamentoService.addOrcamento(this.orcamentoDB);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar orçamento.');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, Aguarde... '
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
