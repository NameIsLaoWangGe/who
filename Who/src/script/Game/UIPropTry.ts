import { PropTry, Tools, Admin, Click, Backpack } from "../Frame/lwg";
import ADManager from "../../TJ/Admanager";

export default class UIPropTry extends PropTry.PropTryScene {

    lwgOnAwake(): void {
        Tools.node_ShowExcludedChild(this.self['Platform'], [Admin._platform], true);
    }

    lwgOnEnable(): void {
        this.self['BtnClose'].visible = false;
        Laya.timer.once(2000, this, () => {
            this.self['BtnClose'].visible = true;
        })
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });

        Click.on(Click.Type.noEffect, this.self['Bytedance_Low_Select'], this, null, null, () => {
            this.self['Bytedance_Low_BtnGet'].visible = this.self['Bytedance_Low_Dot'].visible = this.self['Bytedance_Low_Dot'].visible ? false : true;
        });

        Click.on(Click.Type.largen, this.self['Bytedance_Low_BtnGet'], this, null, null, () => {
            // ADManager.ShowReward(() => {
            Backpack._prop1.num++;
            Backpack._prop2.num++;
            Admin._openScene(Admin.SceneName.GameScene, this.self);
            // })
        });

    }

}