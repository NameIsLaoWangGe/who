import UIStart from "./UIStart";
import { SkinQualified, Gold, Setting, Shop, Click, Dialog, EventAdmin, Animation2D, Admin, Tools, Backpack, TimerAdmin, Effects, Color } from "../Frame/lwg";
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

        // 轮盘
        let CardParent = this.self['CardParent'] as Laya.Sprite;
        TimerAdmin.frameLoop(150, this, () => {
            for (let i = 1; i < 8; i++) {
                const Card = CardParent.getChildByName("Card" + i) as Laya.Image;
                let index0 = (i + 1) > 7 ? 1 : (i + 1);
                const Card0 = CardParent.getChildByName("Card" + index0) as Laya.Image;
                let time = 500;
                // 加个缩放
                Animation2D.move_Simple(Card, Card.x, Card.y, Card0.x, Card0.y, time, 0, () => {
                });
                let alpha0 = 0.6;
                switch (i) {
                    case 1:
                        alpha0 = 0.1;
                        break;
                    case 7:
                        alpha0 = 1;
                        break;
                    default:
                        break;
                }
                Animation2D.fadeOut(Card, 1, alpha0, time, 0, () => {
                    Card.name = 'Card' + index0;
                    if (i == 7) {
                        for (let j = 1; j < 8; j++) {
                            const Card1 = CardParent.getChildByName("Card" + j) as Laya.Image;
                            switch (j) {
                                case 1:
                                    Card1.zOrder = 7;
                                    break;
                                case 2:
                                    Card1.zOrder = 5;
                                    break;
                                case 3:
                                    Card1.zOrder = 3;
                                    break;
                                case 4:
                                    Card1.zOrder = 1;
                                    break;
                                case 5:
                                    Card1.zOrder = 2;
                                    break;
                                case 6:
                                    Card1.zOrder = 4;
                                    break;
                                case 7:
                                    Card1.zOrder = 6;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    Animation2D.fadeOut(Card, alpha0, 1, time, 0, () => {
                    })
                })
            }
        });

        // logo流光
        TimerAdmin.frameLoop(60, this, () => {
            Animation2D.move_Simple(this.self['Logo1Liuguang'], -53, 0, 418, 90, 500, 200);
        }, true);
        let fc = new Laya.ColorFilter();
        TimerAdmin.frameLoop(150, this, () => {
            let R = Tools.randomCountNumer(255)[0];
            let G = Tools.randomCountNumer(255)[0];
            let B = Tools.randomCountNumer(255)[0];
            console.log(R, G, B);
            Color.spinmap(this.self['Logo1'], [R, G, B], 60);
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