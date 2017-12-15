import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RfpListPage } from '../pages/rfp-list/rfp-list';
import { RfpAddPage } from '../pages/rfp-add/rfp-add';
import { RfpEditPage } from '../pages/rfp-edit/rfp-edit';
import { ProjectsPage } from '../pages/projects/projects';
import { ApiConstantProvider } from '../providers/api-constant/api-constant';
import { RfbServiceProvider } from '../providers/rfb-service/rfb-service';
import { Toast } from '@ionic-native/toast';
//import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RfpListPage,
    RfpAddPage,
    RfpEditPage,
    ProjectsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  // IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RfpListPage,
    RfpAddPage,
    RfpEditPage,
    ProjectsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiConstantProvider,
    RfbServiceProvider
  ]
})
export class AppModule {}
