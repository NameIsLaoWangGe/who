import { Start, Click, Admin, Setting, Gold, DateAdmin } from "../Frame/lwg";

export default class UIStart extends Start.StartScene {

    lwgOnAwake(): void {
        Setting.setBtnAppear();
        Gold.createGoldNode(629, 174);
    }

    lwgAdaptive(): void {
        this.self['BtnStart'].y = Laya.stage.height * 0.779;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIVictoryBox, this.self);
        });
    }

    lwgOnDisable(): void {
        Setting.setBtnVinish();
        Gold.goldVinish();
    }
}
