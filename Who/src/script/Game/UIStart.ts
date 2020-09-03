import { Start, Click, Admin, Setting, Gold, DateAdmin, CheckIn } from "../Frame/lwg";
import UIResurgence from "./UIResurgence";

export default class UIStart extends Start.StartScene {

    lwgOnAwake(): void {
        Setting.setBtnAppear();
        Gold.createGoldNode(629, 174);
        Laya.timer.once(200, this, () => {
            CheckIn.openCheckIn();
        })
    }

    lwgAdaptive(): void {
        this.self['BtnStart'].y = Laya.stage.height * 0.779;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });

        Click.on(Click.Type.largen, this.self['BtnDrawCard'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIDrawCard);
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
