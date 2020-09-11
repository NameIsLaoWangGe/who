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
        // 背景旋转光
        TimerAdmin.frameLoop(1, this, () => {
            this.self['Guang2'].rotation += 0.7;
            this.self['Guang1'].rotation -= 0.3;
        })
        this.self['Guang1'].alpha = 0;
        this.self['Guang2'].alpha = 0;
        Animation2D.fadeOut(this.self['Guang1'], 0, 1, 1000, 300);
        Animation2D.fadeOut(this.self['Guang2'], 0, 1, 1000, 300);

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
        // logo流光
        TimerAdmin.frameLoop(60, this, () => {
            Animation2D.move_Simple(this.self['Logo1Liuguang'], -53, 0, 418, 90, 500, 200);
        }, true);
        // 标题变色
        TimerAdmin.frameLoop(130, this, () => {
            Color.changeConstant(this.self['Logo1Set'], [0, 0, 0], [255, 255, 255], 120);
        }, true)
        // 下落粒子
        TimerAdmin.frameRandomLoop(10, 30, this, () => {
            Effects.particle_FallingVertical(this.self['FallParent']);
        }, true);
        // 峡谷七大高手
        this.self['Logo2'].scale(0, 0);
        Animation2D.bombs_Appear(this.self['Logo2'], 0, 1, 1.1, 0, 200, 100, 500, () => {
            TimerAdmin.frameLoop(200, this, () => {
                Animation2D.swell_shrink(this.self['Logo2'], 1, 1.05, 200);
            }, true);
        })

        // 设置卡牌初始位置和大小
        for (let i = 1; i < 8; i++) {
            const Card = this.self['CardParent'].getChildByName("Card" + i) as Laya.Image;
            EventAdmin.notify('cardZOder', [Card, i]);
            Card.y = -1000;
            if (i == 2 || i == 7) {
                Card.scale(0.95, 0.95);
            } else if (i == 3 || i == 6) {
                Card.scale(0.9, 0.9);
            } else if (i == 4 || i == 5) {
                Card.scale(0.85, 0.85);
            }
        }

        // 卡牌的出现
        for (let i = 1; i < 8; i++) {
            const Card = this.self['CardParent'].getChildByName("Card" + i) as Laya.Image;
            let arr = [];
            if (i == 1) {
                arr = [331, 262];
            } else if (i == 2 || i == 7) {
                arr = [282, 309];
            } else if (i == 3 || i == 6) {
                arr = [241, 346];
            } else if (i == 4 || i == 5) {
                arr = [214, 385];
            }
            Animation2D.move_Simple(Card, Card.x, Card.y, Card.x, arr[1], 500, (i - 1) * 200, () => {
                if (i == 7) {
                    EventAdmin.notify('cardLight');
                    EventAdmin.notify('zhuanpan');
                }
            }, Laya.Ease.cubicInOut);
        }
    }

    lwgEventReg(): void {
        // 转盘
        EventAdmin.reg('zhuanpan', this, () => {
            TimerAdmin.frameLoop(150, this, () => {
                for (let i = 1; i < 8; i++) {
                    const Card = this.self['CardParent'].getChildByName("Card" + i) as Laya.Image;
                    let index0 = (i + 1) > 7 ? 1 : (i + 1);
                    const Card0 = this.self['CardParent'].getChildByName("Card" + index0) as Laya.Image;
                    let time = 500;
                    // 加个缩放
                    let scale0 = 1;
                    if (index0 == 1) {
                    } else if (index0 == 2 || index0 == 7) {
                        scale0 = 0.95;
                    } else if (index0 == 3 || index0 == 6) {
                        scale0 = 0.9;
                    } else if (index0 == 4 || index0 == 5) {
                        scale0 = 0.85;
                    }
                    Animation2D.move_Scale(Card, Card.scaleX, Card.x, Card.y, Card0.x, Card0.y, scale0, time, 0);
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
                                const Card1 = this.self['CardParent'].getChildByName("Card" + j) as Laya.Image;
                                if (!Card1) {
                                    return;
                                }
                                EventAdmin.notify('cardLight');
                                EventAdmin.notify('cardZOder', [Card1, j]);
                            }
                        }
                        Animation2D.fadeOut(Card, alpha0, 1, time, 0);
                    })
                }
            });
        })
        // 第一个变色
        EventAdmin.reg('cardLight', this, () => {
            Color.changeOnce(this.self['CardParent'].getChildByName('Card1'), [90, 60, 0], 20);
        })
        // 改变层级
        EventAdmin.reg('cardZOder', this, (Card, index) => {
            switch (index) {
                case 1:
                    Card.zOrder = 7;
                    break;
                case 2:
                    Card.zOrder = 5;
                    break;
                case 3:
                    Card.zOrder = 3;
                    break;
                case 4:
                    Card.zOrder = 1;
                    break;
                case 5:
                    Card.zOrder = 2;
                    break;
                case 6:
                    Card.zOrder = 4;
                    break;
                case 7:
                    Card.zOrder = 6;
                    break;
                default:
                    break;
            }
        })
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