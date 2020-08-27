import { Start, Click, Admin, Setting, Gold } from "../Frame/lwg";

export default class UIStart extends Start.StartScene {

    lwgOnAwake(): void {
        Setting.setBtnAppear();
        Gold.createGoldNode(629, 174);
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });
    }

    lwgOnDisable(): void {
        Setting.setBtnVinish();
        Gold.goldVinish();
    }
}