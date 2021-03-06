import { Start, Click, Admin, Setting, Gold, DateAdmin, CheckIn, TimerAdmin, Animation2D, Effects, Tools, Backpack, EventAdmin, Loding, Dialog, SkinQualified } from "../Frame/lwg";
import UIResurgence from "./UIResurgence";
import { Game3D } from "./Game3D";
import { Guide } from "../Frame/Guide";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UIStart extends Start.StartScene {

    lwgOnAwake(): void {
        Setting.setBtnAppear();
        Gold.createGoldNode(629, 174);
        EventAdmin.notify(Guide.EventType.onStep);
        ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnStart');
        ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnCard');
        ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnRanking');
        ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnDrawCard');
        ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnChickIn');
        ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnQualifyCard');
    }

    lwgOpenAniAfter(): void {
        if (Guide._complete.bool) {
            CheckIn._fromWhich = Admin.SceneName.UILoding;
            if (!CheckIn._todayCheckIn.bool) {
                console.log('没有签到过，弹出签到页面！');
                Admin._openScene(Admin.SceneName.UICheckIn);
            } else {
                if (SkinQualified._adsNum.value < 7) {
                    Admin._openScene(Admin.SceneName.UISkinQualified);
                }
                console.log('签到过了，今日不可以再签到');
            }
        }
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

        TimerAdmin.loop(2000, this, () => {
            Animation2D.bomb_LeftRight(this.self['BtnStart'], 1.22, 250);
        }, true);
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
            ADManager.TAPoint(TaT.BtnClick, 'UIStart_BtnStart');

            if (!Guide._complete.bool) {
                if (Guide._whichStepNum == 8) {
                    EventAdmin.notify(Guide.EventType.complete);
                    Admin._openScene(Admin.SceneName.UIPropTry, this.self);
                }
                return;
            } else {
                Admin._openScene(Admin.SceneName.UIPropTry, this.self);
            }
        });

        Click.on(Click.Type.largen, this.self['BtnDrawCard'], this, null, null, () => {
            ADManager.TAPoint(TaT.BtnClick, 'UIStart_BtnDrawCard');

            if (!Guide._complete.bool) {
                return;
            }
            Admin._openScene(Admin.SceneName.UIDrawCard, this.self);
        });

        Click.on(Click.Type.largen, this.self['BtnChickIn'], this, null, null, () => {
            CheckIn._fromWhich = Admin.SceneName.UIStart;
            ADManager.TAPoint(TaT.BtnClick, 'UIStart_BtnChickIn');
            if (!Guide._complete.bool) {
                return;
            }
            Admin._openScene(Admin.SceneName.UICheckIn);
        });
        Click.on(Click.Type.largen, this.self['BtnQualifyCard'], this, null, null, () => {

            ADManager.TAPoint(TaT.BtnClick, 'UIStart_BtnQualifyCard');
            if (!Guide._complete.bool) {
                return;
            }
            Admin._openScene(Admin.SceneName.UISkinQualified);
        });
        Click.on(Click.Type.largen, this.self['BtnCard'], this, null, null, () => {

            ADManager.TAPoint(TaT.BtnClick, 'UIStart_BtnCard');

            if (!Guide._complete.bool) {
                if (Guide._whichStepNum == 6) {
                    EventAdmin.notify(Guide.EventType.stepComplete);
                    EventAdmin.notify(Game3D.EventType.openUICard);
                    Admin._openScene(Admin.SceneName.UICard, this.self, null, Laya.stage.numChildren - 4);
                }
                return;
            } else {
                EventAdmin.notify(Game3D.EventType.openUICard);
                Admin._openScene(Admin.SceneName.UICard, this.self);
            }
        });

        Click.on(Click.Type.largen, this.self['BtnRanking'], this, null, null, () => {
            ADManager.TAPoint(TaT.BtnShow, 'UIStart_BtnRanking');

            Dialog.createHint_Middle(Dialog.HintContent["敬请期待!"]);
        });
    }

    lwgOnDisable(): void {
        Setting.setBtnVinish();
        Gold.goldVinish();
    }
}
