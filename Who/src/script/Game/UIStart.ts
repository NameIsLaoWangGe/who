import { Start, Click, Admin, Setting, Gold, DateAdmin, CheckIn, TimerAdmin, Animation2D, Effects, Tools, Backpack } from "../Frame/lwg";
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

    lwgOnEnable(): void {
        for (let i = 0; i < this.self['LevelStyle'].numChildren; i++) {
            let ele = this.self['LevelStyle'].getChildAt(i) as Laya.Image;
            let index = Number(ele.name.substring(9, ele.name.length));
            if (Admin._gameLevel.value % 4 !== 0) {
                if (index <= Admin._gameLevel.value % 4) {
                    ele.gray = false;
                    if (index == Admin._gameLevel.value % 4) {
                        TimerAdmin.frameLoop(100, this, () => {
                            Animation2D.swell_shrink(ele.getChildAt(1), 1, 1.1, 200);
                        })
                    }
                } else {
                    ele.gray = true;
                }
            } else {
                TimerAdmin.frameLoop(100, this, () => {
                    this.self['LvIcon4'].zOrder = 1000;
                    Animation2D.shookHead_Simple(this.self['LvIcon4'], 15, 200);
                    Effects.createExplosion_Rotate(this.self['LvIcon4'].parent, 10, this.self['LvIcon4'].x, this.self['LvIcon4'].y, 'star', 1, 15);
                });
                break;
            }
        }

        if (Admin._gameLevel.value % 4 == 0) {
            this.self['ProgressBar'].mask.x = 0;
            this.self['Percent'].text = '100 %';
        } else {
            this.self['ProgressBar'].mask.x = -460 + Admin._gameLevel.value % 4 * (460 / 4);
            this.self['Percent'].text = Admin._gameLevel.value % 4 * 25 + '%';
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIPropTry, this.self);
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
