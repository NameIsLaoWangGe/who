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
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });

        Click.on(Click.Type.largen, this.self['BtnDrawCard'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIDrawCard, this.self);
        });

        Click.on(Click.Type.largen, this.self['BtnChickIn'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UICheckIn);
        });
    }

    lwgOnDisable(): void {
        Setting.setBtnVinish();
        Gold.goldVinish();
    }
}
