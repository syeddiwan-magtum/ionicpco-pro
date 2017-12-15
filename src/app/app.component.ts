import { Component, ViewChild} from '@angular/core';
import { Platform, Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { RfpListPage } from '../pages/rfp-list/rfp-list';
import { ProjectsPage } from '../pages/projects/projects';
//import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  //rootPage: any = RfpListPage;

  constructor(public platform: Platform, public statusBar: StatusBar, private menuCtrl: MenuController,public splashScreen: SplashScreen) {


    this.pages = [
      { title: 'RFP', component: RfpListPage },
      { title: 'Project', component: ProjectsPage }

    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
   /* this.storage.remove(`user api_token`);
    this.storage.remove('user info');

    this.nav.setRoot(LoginPage);
    this.menuCtrl.enable(false);
    */
  }

}

