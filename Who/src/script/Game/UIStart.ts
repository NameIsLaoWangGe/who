import { Start, Click, Admin } from "../Frame/lwg";

export default class UIStart extends Start.StartScene {

    lwgOnAwake(): void { }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });
    }
}