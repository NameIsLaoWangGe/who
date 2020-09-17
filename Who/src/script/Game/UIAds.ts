import { Click, Admin } from "../Frame/lwg";
import ADManager from "../../TJ/Admanager";
export default class UIAds extends Admin.Scene {
    adAction: any;
    setCallBack(_adAction): void {
        this.adAction = _adAction;
    }
    lwgOnEnable(): void {
        this.self['BtnClose'].visible = false;
        Laya.timer.frameOnce(120, this, () => {
            this.self['BtnClose'].visible = true;
        })
    }
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, () => {
            Admin._closeScene(this.self);
        });
        Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, () => {
            ADManager.ShowReward(this.adAction, null);
            Admin._closeScene(this.self);
        });
    }
    onDisable(): void {
    }
}