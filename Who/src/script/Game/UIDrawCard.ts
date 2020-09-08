import { Admin, DrawCard, Click, Tools, EventAdmin, Animation2D, Effects, Share, Gold, TimerAdmin, Setting, Dialog } from "../Frame/lwg";
import ADManager from "../../TJ/Admanager";

export default class UIDrawCard extends DrawCard.DrawCardScene {
    /** @prop {name:Card, tips:"选项卡预制体", type:Prefab}*/
    public Card: Laya.Prefab;

    lwgOnAwake(): void {
        Gold.goldAppear();
        Setting.setBtnVinish();
    }

    lwgOnEnable(): void {
        this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
        this.self['FreeAds'].value = (DrawCard._freeAds.num % 3).toString();


        TimerAdmin.frameLoop(320, this, () => {
            Animation2D.move_Simple(this.self['ReflectMask'], -263, -271, 399, 71, 800, 0, () => {
                Animation2D.fadeOut(this.self['Reflect2'], 0, 1, 200, 0, () => {
                    Animation2D.fadeOut(this.self['Reflect2'], 1, 0, 300, 0, () => {
                        Effects.light_Infinite(this.self['Mirror'], this, 360, 318, 800, 800, 0, null, 0.01, 1);
                    });
                });
            }, Laya.Ease.cubicInOut);
        }, true)
    }

    lwgEventReg(): void {

        let Img = this.self['Surface'] as Laya.Sprite;
        let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));

        //开始抽卡 
        EventAdmin.reg('drawCardEvent', this, () => {
            if (DrawCard._residueDraw.num <= 0) {
                Dialog.createHint_Middle(Dialog.HintContent["没有抽奖次数了，请通过观看广告获取！"]);
                return;
            } else {
                DrawCard._residueDraw.num--;
                this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
            }

            this.self['DrawDisPlay'].x = 0;
            this.self['BtnTake'].visible = false;

            for (let index = 0; index < 10; index++) {
                Laya.timer.once(index * 100, this, () => {
                    let Card = Laya.Pool.getItemByCreateFun('Card', this.Card.create, this.Card) as Laya.Sprite;
                    this.self['CardParent'].addChild(Card);
                    let spcing = (Laya.stage.width - 5 * Card.width) / 6;
                    Card.pos(globalPos.x, globalPos.y);
                    Card.scale(0, 0);
                    Card.name = 'Card' + index;

                    let Pic = Card.getChildByName('Pic') as Laya.Image;
                    Pic.visible = false;

                    let x, y;
                    if (index <= 4) {
                        x = (spcing + Card.width / 2) + (Card.width + spcing) * index;
                        y = globalPos.y - 150;
                    } else {
                        x = (spcing + Card.width / 2) + (Card.width + spcing) * (index - 5);
                        y = globalPos.y + 150;
                    }
                    Animation2D.move_Scale(Card, 0, globalPos.x, globalPos.y, x, y, 1, 200);

                    if (index == 8) {
                        Animation2D.fadeOut(this.self['DrawDisPlayBg'], 0, 0.5, 300);
                    } else if (index == 9) {
                        EventAdmin.notify('flop');
                    }
                })
            }
        })

        // 开始一个一个翻牌
        EventAdmin.reg('flop', this, () => {
            if (!this.self['cardIndex']) {
                this.self['cardIndex'] = 0;
            }
            let Card = this.self['CardParent'].getChildByName('Card' + this.self['cardIndex']) as Laya.Sprite;
            if (!Card) {
                this.self['cardIndex'] = null;
                Laya.timer.once(500, this, () => {
                    Admin._openScene(Admin.SceneName.UIShare, null, () => { Share._fromWhich = Admin.SceneName.UIDrawCard });
                })
                return;
            }
            var func = () => {
                this.self['cardIndex']++;
                EventAdmin.notify('flop');
            }

            Animation2D.cardRotateX_OneFace(Card, () => {
                let Pic = Card.getChildByName('Pic') as Laya.Image;
                Pic.visible = true;
            }, 100, 50, () => {
                if (this.self['cardIndex'] == 4 || this.self['cardIndex'] == 8) {
                    Card.zOrder = 4 * 10;
                    let x = Card.x;
                    let y = Card.y;
                    Animation2D.leftRight_Shake(Card, 20, 100, 200, () => {
                        Animation2D.rotate_Scale(Card, 0, 1, 1, 720, 3, 3, 400, 200, () => {
                            for (let index = 0; index < 5; index++) {
                                let pointAarr = Tools.point_RandomPointByCenter(new Laya.Point(globalPos.x, globalPos.y), 200, 100);
                                Laya.timer.once(300 * index, this, () => {
                                    Effects.createExplosion_Rotate(this.self['CardParent'], 25, pointAarr[0].x, pointAarr[0].y, 'star', 10, 10);
                                })
                            }
                            Animation2D.move_Scale(Card, 3, Card.x, Card.y, x, y, 1, 200, 2000, null, () => {
                                func();
                            });
                        });
                        Animation2D.move_Simple(Card, x, y, globalPos.x, globalPos.y, 250, 100);
                    });
                } else {
                    func();
                }
            });
        })

        EventAdmin.reg(Admin.SceneName.UIShare + Admin.SceneName.UIDrawCard, this, () => {
            this.self['BtnTake'].visible = true;
        })
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnFree'], this, null, null, () => {
            // ADManager.ShowReward(() => {
            DrawCard._freeAds.num++;
            if (DrawCard._freeAds.num % 3 == 0 && DrawCard._freeAds.num !== 0) {
                DrawCard._freeAds.num = 0;
                DrawCard._residueDraw.num++;
                this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
            }
            this.self['FreeAds'].value = (DrawCard._freeAds.num % 3).toString();
            // })
        });

        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            Admin._closeScene(this.self);
        });

        Click.on(Click.Type.noEffect, this.self['DrawDisPlay'], this, (e: Laya.Event) => {
            e.stopPropagation();
        }, null, null);

        Click.on(Click.Type.noEffect, this.self['BtnTake'], this, (e: Laya.Event) => {
            this.self['DrawDisPlay'].x = -800;
            Tools.node_RemoveAllChildren(this.self['CardParent']);
        }, null, null);

        Click.on(Click.Type.noEffect, this.self['BtnTake'], this, (e: Laya.Event) => {
            this.self['DrawDisPlay'].x = -800;
            Tools.node_RemoveAllChildren(this.self['CardParent']);
        }, null, null);

        Click.on(Click.Type.noEffect, this.self['Surface'], this,
            // 按下
            (e: Laya.Event) => {
                // 初始化一个绘制节点
                if (!this.self.getChildByName('DrawSp')) {
                    this.self['Drawlength'] = 0;
                    let DrawSp = new Laya.Sprite();
                    this.self.addChild(DrawSp);
                    DrawSp.name = 'DrawSp';
                    DrawSp.pos(0, 0);
                    this.self['DrawSp'] = DrawSp;
                }
                // 初始化初始位置
                this.self['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
            },
            // 移动
            (e: Laya.Event) => {
                // 范围控制
                let Img = this.self['Surface'] as Laya.Sprite;
                let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));
                if (new Laya.Point(e.stageX, e.stageY).distance(globalPos.x, globalPos.y) > Img.width / 2) {
                    this.self['DrawPosArr'] = null;
                    return;
                }
                // 画线
                if (this.self['DrawPosArr']) {
                    this.self['DrawSp'].graphics.drawLine(this.self['DrawPosArr'].x, this.self['DrawPosArr'].y, e.stageX, e.stageY, "#000000", 8);

                    this.self['DrawSp'].graphics.drawCircle(e.stageX, e.stageY, 4, "#000000");

                    this.self['Drawlength'] += (this.self['DrawPosArr'] as Laya.Point).distance(e.stageX, e.stageY);
                    this.self['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
                }
            },
            // 抬起
            () => {
                this.self.getChildByName('DrawSp').removeSelf();
                EventAdmin.notify('drawCardEvent');
                this.self['DrawPosArr'] = null;
            },
            // 出图片
            () => {
                this.self['DrawPosArr'] = null;
            });
    }
    lwgOnDisable(): void {
        Setting.setBtnAppear();
    }
}