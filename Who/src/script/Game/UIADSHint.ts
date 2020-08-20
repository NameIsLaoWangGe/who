import { Admin, Click, EventAdmin } from "../Lwg_Template/lwg";
import ADManager from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";
export default class UIADSHint extends Admin.Scene {

    adAction;
    setCallBack(_adAction) {
        this.adAction = _adAction;
    }

    lwgOnEnable(): void {
        this.self.x = 0;
        this.self.y = 0;
        this.self['BtnClose'].visible = false;
        Laya.timer.frameOnce(120, this, () => {
            this.self['BtnClose'].visible = true;
        })
    }
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp);
        Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, this.btnConfirmUp);
    }

    btnCloseUp(): void {
        this.self.close();
    }
    btnConfirmUp(): void {
        ADManager.ShowReward(this.adAction, null);
        this.self.close();
    }

    lwgOnDisable(): void {
        console.log('退出');
    }
}
