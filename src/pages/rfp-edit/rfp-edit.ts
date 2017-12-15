import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { RfbServiceProvider } from '../../providers/rfb-service/rfb-service';
import { RfpListPage } from '../../pages/rfp-list/rfp-list';
import { Toast } from '@ionic-native/toast'
import * as moment from 'moment';
/**
 * Generated class for the RfpEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rfp-edit',
  templateUrl: 'rfp-edit.html'
  })
export class RfpEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public rfbServiceProvider: RfbServiceProvider, private toast: Toast, private platform: Platform) {
  }

  public rfpDetail: any = null;


  public rfpModel: any = {
    "id": "0",
    "no": "",
    "bid_number": "",
    "project_id": "",
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RfpEditPage', this.navParams.get('id'));
    this.getProjectList();
    this.getUserList();
    this.getInfo(this.navParams.get('id'));
   

  }

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



  selectePermitValue() {
    console.log('msg in permitSelectHandler')
    let seletedValue = this.permitList.map(function (elem) {
      return elem.selected ? elem.value : '';
    }).join(",");
    
    return seletedValue;
  }



  getInfo(id) {
    let rfpParam: any = {};
    rfpParam.id = id;
    //console.log('rfpParam', rfpParam);
    this.rfbServiceProvider.getList(rfpParam).subscribe(data => {
      this.rfpDetail = data.json().list[0];
      this.updateInitInfo();
    });
  }



  updateInitInfo() {
    if (this.rfpDetail != undefined)
    {
      this.rfpModel.id = this.rfpDetail.id;
      this.rfpModel.no = this.rfpDetail.no;
      this.rfpModel.bid_number = this.rfpDetail.bid_number;
      this.rfpModel.project_id = this.rfpDetail.project_id;
      this.rfpModel.format = this.rfpDetail.format;
      this.rfpModel.title = this.rfpDetail.title;
      this.rfpModel.description = this.rfpDetail.description;
      this.rfpModel.rfptype = this.rfpDetail.rfptype;
      this.rfpModel.permits = this.rfpDetail.permits;
      this.rfpModel.requested_by_id = this.rfpDetail.requested_by_id;
      this.rfpModel.plan_start_date = this.rfpDetail.plan_start_date ? moment(this.rfpDetail.plan_start_date).format('YYYY-MM-DD'): null;
      this.rfpModel.approver_id = this.rfpDetail.approver_id;
      console.log('this.rfpModel.plan_start_date', this.rfpModel.plan_start_date);

      let seletedPermit = this.rfpModel.permits ? this.rfpModel.permits.split(',') : [];
      for (var i = 0; i < seletedPermit.length; i++)
      {

        for (var j = 0; j < this.permitList.length; j++) {

          if (this.permitList[j].value == seletedPermit[i])
          {
            this.permitList[j].selected = true; 

          }

        }

      }
      this.permitList.map(function (elem) {
        return elem.selected ? elem.value : '';
      })




 
    }
  }

  update() {

    let saveRfpParam: any = {};
    saveRfpParam.id = this.rfpModel.id;
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

    this.rfbServiceProvider.updateRfp(this.rfpModel.id,saveRfpParam).subscribe(data => {

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

  showListPage() {
    this.navCtrl.setRoot(RfpListPage);
  }
}
