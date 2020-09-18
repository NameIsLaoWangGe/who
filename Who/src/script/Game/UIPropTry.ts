import { PropTry, Tools, Admin, Click, Backpack } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import ZJADMgr from "../../TJ/ZJADMgr";

export default class UIPropTry extends PropTry.PropTryScene {

    lwgOnAwake(): void {
        ADManager.TAPoint(TaT.BtnShow, 'UIPropTry_BtnGet');

        Tools.node_2DShowExcludedChild(this.self['Platform'], [Admin._platform], true);
        if (Admin._platform == Admin._platformTpye.Bytedance) {
            Tools.node_2DShowExcludedChild(this.self[Admin._platformTpye.Bytedance], [ZJADMgr.ins.shieldLevel], true);
        }
    }

    lwgOnEnable(): void {
        this.self['BtnClose'].visible = false;
        Laya.timer.once(2000, this, () => {
            this.self['BtnClose'].visible = true;
        })
    }

    lwgBtnClick(): void {

        Click.on(Click.Type.noEffect, this.self['Bytedance_Low_Select'], this, null, null, this.bytedanceSelectUp);
        Click.on(Click.Type.largen, this.self['Bytedance_Low_BtnGet'], this, null, null, this.bytedanceGetUp);

        Click.on(Click.Type.noEffect, this.self['Bytedance_Mid_Select'], this, null, null, this.bytedanceSelectUp);
        Click.on(Click.Type.largen, this.self['Bytedance_Mid_BtnGet'], this, null, null, this.bytedanceGetUp);

        Click.on(Click.Type.noEffect, this.self['ClickBg'], this, null, null, this.clickBgtUp);
        Click.on(Click.Type.largen, this.self['Bytedance_High_BtnGet'], this, null, null, this.bytedanceGetUp);
        Click.on(Click.Type.largen, this.self['Bytedance_High_BtnNo'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });

        Click.on(Click.Type.largen, this.self['OPPO_BtnNo'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });
        Click.on(Click.Type.largen, this.self['OPPO_BtnGet'], this, null, null, () => {
            this.advFunc();
        });

        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        });
    }
    clickBgtUp(): void {
        let Dot;
        if (this.self['Low'].visible) {
            Dot = this.self['Bytedance_Low_Dot'];
        } else if (this.self['Mid'].visible) {
            Dot = this.self['Bytedance_Mid_Dot'];
        }
        if (!Dot) {
            return;
        }
        if (Dot.visible) {
            this.advFunc();
        } else {
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        }
    }

    bytedanceGetUp(e: Laya.Event): void {
        e.stopPropagation();
        this.advFunc();
    }

    bytedanceSelectUp(e: Laya.Event): void {
        e.stopPropagation();
        if (this.self['Low'].visible) {
            if (!this.self['Low']['count']) {
                this.self['Low']['count'] = 0;
            }
            this.self['Low']['count']++;
            if (this.self['Low']['count'] >= 4) {
                if (this.self['Bytedance_Low_Dot'].visible) {
                    this.self['Bytedance_Low_Dot'].visible = false;
                } else {
                    this.self['Bytedance_Low_Dot'].visible = true;
                }
            }
            if (ZJADMgr.ins.CheckPlayVideo()) {
                ADManager.ShowReward(null);
            }
        } else if (this.self['Mid'].visible) {
            if (!this.self['Mid']['count']) {
                this.self['Mid']['count'] = 0;
            }
            this.self['Mid']['count']++;
            if (this.self['Mid']['count'] >= 4) {
                if (this.self['Bytedance_Mid_Dot'].visible) {
                    this.self['Bytedance_Mid_Dot'].visible = false;
                } else {
                    this.self['Bytedance_Mid_Dot'].visible = true;
                }
            }
        }
    }
    advFunc(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'UIPropTry_BtnGet');
            Backpack._prop1.num++;
            Backpack._prop2.num++;
            Admin._openScene(Admin.SceneName.GameScene, this.self);
        })
    }
}