import { Admin, Click, EventAdmin } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
import { GVariate } from "../Lwg_Template/Global";

export default class UIResurgence extends Admin.Scene {

    lwgOnEnable(): void {
        Admin._gameStart = false;
        ADManager.TAPoint(TaT.BtnShow, 'closeword_revive');
        ADManager.TAPoint(TaT.BtnShow, 'ADrevivebt_revive');
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnResurgence'], this, null, null, this.btnResurgenceUp);
        Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp);
    }
    btnResurgenceUp(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'ADrevivebt_revive');

            Admin._gameStart = true;
            EventAdmin.notify(EventAdmin.EventType.scene3DResurgence);
            this.self.close();
        })
    }
    btnNoUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'closeword_revive');

        EventAdmin.notify(EventAdmin.EventType.closeOperation);
        Admin._openScene(Admin.SceneName.UIDefeated);
        this.self.close();
    }
}