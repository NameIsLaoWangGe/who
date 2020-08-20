import { lwg, Click, EventAdmin, Dialog, Admin, Task, Gold } from "../Lwg_Template/lwg";
import ADManager from "../TJ/Admanager";
import { GVariate } from "../Lwg_Template/Global";

export default class UITask_GetAward extends Admin.Object {


    lwgBtnClick(): void {
        let BtnGet = this.self.getChildByName('BtnGet') as Laya.Image;
        Click.on(Click.Type.largen, BtnGet, this, null, null, this.btnGetUp);
    }
    btnGetUp(): void {
        if (this.self['dataSource'][Task.TaskProperty.name] === '观看广告获得金币') {
            EventAdmin.notify(Task.EventType.adsGetAward_Every, [this.self['dataSource']]);
            return;
        }
        if (this.self['dataSource'][Task.TaskProperty.get] === 1) {
            EventAdmin.notify(Task.EventType.getAward, [this.self['dataSource']]);
        } else if (this.self['dataSource'][Task.TaskProperty.get] === 0) {
            console.log('任务没有完成');
        } else if (this.self['dataSource'][Task.TaskProperty.get] === -1) {
            console.log('或者已经领取过！');
        }

    }
}