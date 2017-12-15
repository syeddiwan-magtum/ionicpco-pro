import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RfpAddPage } from '../../pages/rfp-add/rfp-add';
import { RfpEditPage } from '../../pages/rfp-edit/rfp-edit';
import { RfbServiceProvider } from '../../providers/rfb-service/rfb-service';
import * as moment from 'moment';


/**
 * Generated class for the RfpListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rfp-list',
  templateUrl: 'rfp-list.html'   
})
export class RfpListPage {

  public list: Array<any>;
  
  public approval_list: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rfbServiceProvider: RfbServiceProvider) {

  }


  getList() {
    let rfpParam: any = {};
    console.log('this.rfbServiceProvider.userInfo', this.rfbServiceProvider.userInfo);
    rfpParam.requested_by_id = this.rfbServiceProvider.userInfo.user.id;

    this.rfbServiceProvider.getList(rfpParam).subscribe(data => {
      this.list = data.json().list;
      console.log('requested_by_id =',this.list);  
    });
  }


  getPendingApproveList() {
    let rfpParam: any = {};
    rfpParam.approver_id = this.rfbServiceProvider.userInfo.user.id;
    //console.log('rfpParam', rfpParam);
    this.rfbServiceProvider.getList(rfpParam).subscribe(data => {
      this.approval_list = data.json().list;

      this.approval_list.map(function (element) {
        element.updated_at = element.update_at ? moment(element.updated_at) : null;
      })

      console.log('approval_list ',this.approval_list);
    });
  }




  openAddPage() {
    this.navCtrl.setRoot(RfpAddPage);
  }



  toggleApproveAndReject(rfp: any) {


    let updateRfpParam: any = {};
    if (rfp.rfptype != 'approve')
    {
      updateRfpParam.rfptype = 'approve';
    }
    else
    {
      updateRfpParam.rfptype = 'reject';
    }
  
    this.rfbServiceProvider.updateRfp(rfp.id, updateRfpParam).subscribe(data => {

      let resData = data.json();
      if (resData.success) {
        this.getPendingApproveList();
      }
      console.log(data);
    },
      err => {
      }
    );


  }
  
  edit(rfp: any) {

    this.navCtrl.push(RfpEditPage, { id: rfp.id });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RfpListPage');
    this.getList();
    this.getPendingApproveList();
  }

}
