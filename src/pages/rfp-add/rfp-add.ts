import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { RfbServiceProvider } from '../../providers/rfb-service/rfb-service';
import { RfpListPage } from '../../pages/rfp-list/rfp-list';
import { Toast } from '@ionic-native/toast'
/**
 * Generated class for the RfpAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rfp-add',
  templateUrl: 'rfp-add.html'
})
export class RfpAddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public rfbServiceProvider: RfbServiceProvider, private toast: Toast, public platform:Platform) {
  }


  public rfpModel: any = {
          "id": "0",
          "no": "",
          "bid_number":"",
          "project_id": "",
          "project_no": "",
          "format": "standard",
          "title": "",
          "description": "",
          "rfptype": "new",
          "permits": "",
          "requested_by_id": "",
          "plan_start_date": "",
          "approver_id": ""
  };

  public permitList: Array<any> = [{ "label": "City Permit approvals required", "selected": false, "value": "city_permit" },
    { "label": "Utilities Permit required", "selected": false, "value": "utilities_permit" },
    { "label": "Recycle Permit required", "selected": false, "value": "recycle_permit" }];

  public projectList: Array<any> = new Array();
  public userList: Array<any> = new Array();


  getProjectList() {

    let projectParam: any = {};
    this.rfbServiceProvider.getProjectList(projectParam).subscribe(data => {
      this.projectList = data.json().list;
      console.log('requested_by_id =', this.projectList);
    });
  }

  getUserList() {

    let usersParam: any = {};
    this.rfbServiceProvider.getUserList(usersParam).subscribe(data => {
      this.userList = data.json().list;
      console.log('requested_by_id =', this.userList);
    });
  }


  selectePermitValue()
  {
    console.log('msg in permitSelectHandler')
    let seletedValue = this.permitList.map(function (elem) {
                  return elem.selected ? elem.value: '';
    }).join(",");

    console.log('msg in selectePermitValue ', seletedValue);
    return seletedValue;
  }


  save() {

    let saveRfpParam: any = {};
    saveRfpParam.no = this.rfpModel.no;
    saveRfpParam.bid_number = this.rfpModel.bid_number;
    saveRfpParam.project_id = this.rfpModel.project_id;
    saveRfpParam.format = this.rfpModel.format;
    saveRfpParam.title = this.rfpModel.title;
    saveRfpParam.description = this.rfpModel.description;
    saveRfpParam.rfptype = this.rfpModel.rfptype;
    saveRfpParam.permits = this.selectePermitValue();
    saveRfpParam.requested_by_id = this.rfpModel.requested_by_id;
    saveRfpParam.approver_id = this.rfpModel.approver_id;
    saveRfpParam.plan_start_date = this.rfpModel.plan_start_date;
    saveRfpParam.is_active = 1;
   
    this.rfbServiceProvider.saveRfp(saveRfpParam).subscribe(data => {

      let resData = data.json();
      if (resData.success) {
        if (this.platform.is('cordova')) {
          this.toast.show(resData.message, '50000', 'center').subscribe();
        }
        this.navCtrl.setRoot(RfpListPage);
      }
      console.log(data);
    },
      err => {
        
      }
    );

   
  }

  showListPage()
  {
    this.navCtrl.setRoot(RfpListPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RfpAddPage');
    this.getProjectList();
    this.getUserList();
  }



}
