import { Start, Click, Admin, Setting, Gold, DateAdmin, CheckIn, TimerAdmin, Animation2D, Effects } from "../Frame/lwg";
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
        Admin._gameLevel.value++;
        for (let i = 0; i < this.self['LevelStyle'].numChildren; i++) {
            let ele = this.self['LevelStyle'].getChildAt(i) as Laya.Image;
            let index = Number(ele.name.substring(9, ele.name.length));
            if (Admin._gameLevel.value % 4 !== 0) {
                if (index <= Admin._gameLevel.value % 4) {
                    ele.gray = false;
                    // console.log(ele);
                } else {
                    ele.gray = true;
                }
            } else {
                TimerAdmin.frameLoop(100, this, () => {
                    Animation2D.shookHead_Simple(this.self['LvIcon4'], 15, 200);
                    Effects.createExplosion_Rotate(this.self['LvIcon4'].parent, 25, this.self['LvIcon4'].x,this.self['LvIcon4'].y, 'star', 10, 5);
                });
                break;
            }
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
