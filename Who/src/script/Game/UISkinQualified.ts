import UIStart from "./UIStart";
import { SkinQualified, Gold, Setting, Shop, Click, Dialog, EventAdmin, Animation2D, Admin, Tools, Backpack, TimerAdmin, Effects } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import { Game3D } from "./Game3D";

export default class UISkinQualified extends SkinQualified.SkinQualifiedScene {

    lwgOnAwake(): void {
        ADManager.TAPoint(TaT.BtnShow, 'Adlimmitget');

        Gold.goldVinish();
        Setting.setBtnVinish();

        if (SkinQualified._adsNum.value >= 7) {
            this.self['BtnGet'].visible = false;
            this.self['AlreadyGet'].visible = true;
        } else {
            this.self['AlreadyGet'].visible = false;
            this.self['BtnGet'].visible = true;
            this.self['AdsNum'].value = SkinQualified._adsNum.value.toString();
        }
    }

    lwgOnEnable(): void {
        TimerAdmin.frameLoop(1, this, () => {
            this.self['Guang2'].rotation += 0.7;
            this.self['Guang1'].rotation -= 0.3;
        })

        TimerAdmin.loop(2000, this, () => {
            Animation2D.bomb_LeftRight(this.self['BtnGet'], 1.1, 250);
        }, true);

        // 星星闪烁动画左边
        TimerAdmin.frameRandomLoop(40, 60, this, () => {
            Effects.blink_Star(this.self['StarParent1'], new Laya.Point(0, 0), 80, 100, 'Game/UI/UISkinQualified/xingxing.png', 80, 80);
        }, true)
        // 星星闪烁动画右边
        TimerAdmin.frameRandomLoop(40, 60, this, () => {
            Effects.blink_Star(this.self['StarParent2'], new Laya.Point(0, 0), 80, 100, 'Game/UI/UISkinQualified/xingxing.png', 80, 80);
        }, true)
        // 星星闪烁动画右边
        TimerAdmin.frameRandomLoop(50, 80, this, () => {
            Effects.blink_Star(this.self['StarParent3'], new Laya.Point(0, 0), 300, 50, 'Game/UI/UISkinQualified/xingxing.png', 80, 80);
        }, true)
    }

    lwgAdaptive(): void {
        // this.self['SceneContent'].y = Laya.stage.height / 2;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnGet'], this, null, null, () => {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'Adlimmitget');
                SkinQualified._adsNum.value++;
                if (SkinQualified._adsNum.value >= 7) {
                    Backpack._haveCardArray.add(Game3D.getNameArrByObjArr(Game3D.getCardObjByQuality(Game3D.Quality.UR)));
                    Dialog.createHint_Middle(Dialog.HintContent["限定皮肤已经获得，请前往皮肤界面查看。"]);
                    Animation2D.fadeOut(this.self, 1, 0, 500, 500, () => {
                        Admin._closeScene(this.self);
                    });
                }
                this.self['AdsNum'].value = SkinQualified._adsNum.value.toString();
            })
        });
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            Admin._closeScene(this.self);
        });
    }
    lwgOnDisable(): void {
        Setting.setBtnAppear();
        Gold.goldAppear();
    }
}