import { Admin, DrawCard, Click, Tools, EventAdmin, Animation2D, Effects, Share, Gold, TimerAdmin, Setting, Dialog, Backpack, PalyAudio } from "../Frame/lwg";
import ADManager from "../../TJ/Admanager";
import { Game3D } from "./Game3D";
import { Guide } from "../Frame/Guide";

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

        // 镜面效果
        TimerAdmin.frameLoop(320, this, () => {
            Animation2D.move_Simple(this.self['ReflectMask'], -263, -271, 399, 71, 800, 0, () => {
                Animation2D.fadeOut(this.self['Reflect2'], 0, 1, 200, 0, () => {
                    Animation2D.fadeOut(this.self['Reflect2'], 1, 0, 300, 0, () => {
                        // Effects.light_SimpleInfinite(this.self['Mirror'], this, 360, 318, 800, 800, 0, null, 0.01, 1);
                    });
                });
            }, Laya.Ease.cubicInOut);
        }, true);

        TimerAdmin.frameRandomLoop(100, 160, this, () => {
            Effects.light_SimpleInfinite(this.self, 360, 640, 720, 1280, 0, 'Game/UI/UIDrawCard/guang2.png', 0.01);
        }, true);

        TimerAdmin.frameLoop(8, this, () => {
            if (!this['middleOff']) {
                Effects.particle_AnnularInhalation(this.self['SceneContent'], new Laya.Point(this.self['Mirror'].x, this.self['Mirror'].y), [400, 500]);
            }
        })

        TimerAdmin.loop(2000, this, () => {
            Animation2D.bomb_LeftRight(this.self['BtnFree'], 1.1, 250);
        }, true);

        TimerAdmin.loop(3000, this, () => {
            Animation2D.fadeOut(this.self['Logo2'], 1, 0.5, 200, 0, () => {
                Animation2D.fadeOut(this.self['Logo2'], 0.5, 1, 100, 0, () => {
                })
            })
        })

        TimerAdmin.frameRandomLoop(30, 100, this, () => {
            for (let index = 0; index < 1; index++) {
                Laya.timer.once(index * 180, this, () => {
                    Effects.aureole_Continuous(this.self['Guang3'], new Laya.Point(this.self['Guang3'].width / 2, this.self['Guang3'].height / 2), 150, 150, null, ['Game/UI/UIDrawCard/guang3.png'], 0, 0.02);
                })
            }
        }, true)

        // 抽卡界面光效，直接闪烁
        TimerAdmin.frameLoop(1, this, () => {
            this.self['Guang5'].rotation += 0.7;
            this.self['Guang6'].rotation -= 0.3;
        })
    }

    lwgOpenAniAfter(): void {
        Game3D.Scene3D.active = false;
    }

    lwgEventReg(): void {
        // 引导的时候，用两个遮罩盖住按钮的点击
        EventAdmin.reg(Guide.EventType.start, this, () => {
        })

        let Img = this.self['Surface'] as Laya.Sprite;
        let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));
        //开始抽卡 
        EventAdmin.reg('drawCardEvent', this, () => {
        
            // 抽卡限制
            if (DrawCard._residueDraw.num <= 0) {
                Dialog.createHint_Middle(Dialog.HintContent["没有抽奖次数了，请通过观看广告获取！"]);
                return;
            } else {
                DrawCard._residueDraw.num--;
                this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
            }

            // 前两次固定抽卡,后面随机抽卡
            DrawCard._drawCount.num++;
            let cardObjArr = [];
            let SROrSSR;
            if (DrawCard._drawCount.num == 1) {
                cardObjArr = Tools.arrayRandomGetOut(Game3D.getCardObjByQuality(Game3D.Quality.R), 9);
                if (Tools.randomNumber(10) >= 8) {
                    SROrSSR = Tools.arrayRandomGetOut(Game3D.getCardObjByQuality(Game3D.Quality.SSR))[0];
                } else {
                    SROrSSR = Tools.arrayRandomGetOut(Game3D.getCardObjByQuality(Game3D.Quality.SR))[0];
                }
                cardObjArr.push(SROrSSR);

            } else if (DrawCard._drawCount.num == 2) {
                // 从还没有获得的卡牌中随机
                cardObjArr = Tools.arrayRandomGetOut(Game3D.getQualityObjArrByNameArr(Backpack._noHaveCard.arr, Game3D.Quality.R), 9);

                if (Tools.randomNumber(10) >= 8) {
                    SROrSSR = Tools.arrayRandomGetOut(Game3D.getQualityObjArrByNameArr(Backpack._noHaveCard.arr, Game3D.Quality.SR))[0];
                } else {
                    SROrSSR = Tools.arrayRandomGetOut(Game3D.getQualityObjArrByNameArr(Backpack._noHaveCard.arr, Game3D.Quality.SSR))[0];
                }
                cardObjArr.push(SROrSSR);
                // console.log(Backpack._noHaveCard.arr);
                // console.log(Backpack._noHaveCard.arr);
            } else {
                cardObjArr = Tools.arrayRandomGetOut(Game3D.getCardObjByQuality(Game3D.Quality.R), 9);
                if (Tools.randomNumber(10) >= 8) {
                    SROrSSR = Tools.arrayRandomGetOut(Game3D.getCardObjByQuality(Game3D.Quality.SSR))[0];
                } else {
                    SROrSSR = Tools.arrayRandomGetOut(Game3D.getCardObjByQuality(Game3D.Quality.SR))[0];
                }
                cardObjArr.push(SROrSSR);
                // 给重复的卡牌添加标记
                let equalNameArr = Tools.array_ExcludeArrays([Game3D.getNameArrByObjArr(cardObjArr), Backpack._haveCardArray.arr]);
                this['repetitionCardNum'] = equalNameArr.length;
                for (let i = 0; i < cardObjArr.length; i++) {
                    for (let j = 0; j < equalNameArr.length; j++) {
                        if (cardObjArr[i][Game3D.CardProperty.name] == equalNameArr[j]) {
                            cardObjArr[i]['repetitionCard'] = true;
                        }
                    }
                }
            }
            // console.log(cardObjArr);
            Backpack._haveCardArray.add(Game3D.getNameArrByObjArr(cardObjArr));
            cardObjArr = Tools.arrayRandomGetOut(cardObjArr, cardObjArr.length);
            // console.log(cardObjArr);
            // 开始动画表现
            Admin._clickLock.switch = true;
            this.self['DrawDisPlay'].x = 0;
            this.self['BtnTake'].visible = false;
            this.self['DrawDisPlayBg'].alpha = 0;
            this.self['Guang5'].alpha = 0;
            this.self['Guang6'].alpha = 0;
            for (let index = 0; index < 10; index++) {
                Laya.timer.once(index * 100, this, () => {
                    let Card = Laya.Pool.getItemByCreateFun('Card', this.Card.create, this.Card) as Laya.Image;
                    Card['objData'] = cardObjArr[index];
                    let Back = Card.getChildByName('Back') as Laya.Image;
                    Back.skin = 'Game/UI/UIDrawCard/' + Card['objData'][Game3D.CardProperty.quality] + '.png';
                    this.self['CardParent'].addChild(Card);
                    let spcing = (this.self['CardParent'].width - 5 * Card.width) / 6;
                    Card.pos(globalPos.x, globalPos.y);
                    Card.scale(0, 0);
                    Card.name = 'Card' + index;
                    Card.zOrder = 0;
                    let Pic = Card.getChildByName('Pic') as Laya.Image;
                    Pic.skin = 'Game/UI/UIDrawCard/Card/' + Card['objData'][Game3D.CardProperty.name] + '.jpg';
                    Pic.visible = false;
                    let x, y;
                    if (index <= 4) {
                        x = (spcing + Card.width / 2) + (Card.width + spcing) * index;
                        y = globalPos.y - 100;
                    } else {
                        x = (spcing + Card.width / 2) + (Card.width + spcing) * (index - 5);
                        y = globalPos.y + 100;
                    }
                    Animation2D.move_Scale(Card, 0, globalPos.x, globalPos.y, x, y, 1, 200, 0, Laya.Ease.expoIn);

                    if (index == 3) {
                        Animation2D.fadeOut(this.self['DrawDisPlayBg'], 0, 0.7, 500, 0, () => {
                            Animation2D.fadeOut(this.self['Guang5'], 0, 1, 500);
                            Animation2D.fadeOut(this.self['Guang6'], 0, 1, 500);
                        });
                    } else if (index == 9) {
                        EventAdmin.notify('flop');
                        Admin._clickLock.switch = false;
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
            PalyAudio.playSound('Game/Voice/fanpai.wav');
            Animation2D.cardRotateX_OneFace(Card, () => {
                (Card.getChildByName('Pic') as Laya.Image).visible = true;
                if (!Card['objData']['repetitionCard']) {
                    let New = Card.getChildByName('New') as Laya.Sprite;
                    New.visible = true;
                    Animation2D.bombs_Appear(New, 0, 1, 1.1, 5, 100, 200, 250);
                }
            }, 100, 50, () => {
                // console.log(Card['objData'][Game3D.CardProperty.quality]);
                if (Card['objData'][Game3D.CardProperty.quality] == Game3D.Quality.SR || Card['objData'][Game3D.CardProperty.quality] == Game3D.Quality.SSR) {

                    Card.zOrder = (this.self['cardIndex'] + 1) * 10;
                    let x = Card.x;
                    let y = Card.y;
                    let ReflectPic = Card.getChildByName('Reflect') as Laya.Image;

                    TimerAdmin.frameRandomLoop(15, 35, this, () => {
                        for (let index = 0; index < 1; index++) {
                            Laya.timer.once(index * 200, this, () => {
                                Effects.aureole_Continuous(Card, new Laya.Point(Card.width / 2, Card.height / 2), 41.5, 55, null, ['Frame/Effects/ui_square_guang2.png'], 0.1, 0.002);
                            })
                        }
                    }, true)
                    Animation2D.leftRight_Shake(Card, 20, 100, 300, () => {
                        PalyAudio.playSound('Game/Voice/xiyoukazhanshi.wav');
                        Animation2D.rotate_Scale(Card, 0, 1, 1, 720, 3, 3, 400, 200, () => {
                            Animation2D.move_Simple(ReflectPic.getChildByName('LiuGuang'), -21, -9, 131, 180, 500, 400, () => {
                                Animation2D.fadeOut(ReflectPic.getChildByName('Guang'), 0, 1, 250, 0, () => {
                                    Animation2D.fadeOut(ReflectPic.getChildByName('Guang'), 1, 0, 200, 0);
                                });
                            }, Laya.Ease.expoIn);
                            for (let index = 0; index < 5; index++) {
                                let pointAarr = Tools.point_RandomPointByCenter(new Laya.Point(globalPos.x, globalPos.y), 200, 100);
                                Laya.timer.once(300 * index, this, () => {
                                    Effects.createExplosion_Rotate(this.self['CardParent'], 25, pointAarr[0].x, pointAarr[0].y, 'star', 10, 10);
                                });
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

        // 关闭分享界面，我都要按钮出现
        EventAdmin.reg(Admin.SceneName.UIShare + Admin.SceneName.UIDrawCard, this, () => {
            this.self['BtnTake'].visible = true;
            EventAdmin.notify(Guide.EventType.onStep);
        })
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnFree'], this, null, null, () => {
            if (!Guide._complete.bool) {
                return;
            }
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
            if (!Guide._complete.bool) {
                if (Guide._whichStepNum == 5) {
                    Admin._openScene(Admin.SceneName.UIStart, this.self, null, Laya.stage.numChildren - 3);
                    EventAdmin.notify(Guide.EventType.stepComplete);
                }
                return;
            } else {
                Admin._openScene(Admin.SceneName.UIStart, this.self);
            }
        });

        Click.on(Click.Type.noEffect, this.self['DrawDisPlay'], this, (e: Laya.Event) => {
            e.stopPropagation();
        });

        Click.on(Click.Type.largen, this.self['BtnTake'], this, null, null, (e: Laya.Event) => {
            EventAdmin.notify(Guide.EventType.stepComplete);
            Admin._clickLock.switch = true;
            let arrRepetitionCard = [];
            let arrCard = [];
            for (let index = 0; index < this.self['CardParent'].numChildren; index++) {
                let Card = this.self['CardParent'].getChildAt(index) as Laya.Sprite;
                if (Card['objData']['repetitionCard']) {
                    arrRepetitionCard.push(Card);
                } else {
                    arrCard.push(Card);
                }
            }
            var anifunc = () => {
                Animation2D.fadeOut(this.self['DrawDisPlay'], 1, 0, 200, 0, () => {
                    EventAdmin.notify(Guide.EventType.onStep);
                    this.self['DrawDisPlay'].x = -800;
                    this.self['DrawDisPlay'].alpha = 1;
                    Admin._clickLock.switch = false;
                })
                Tools.node_RemoveAllChildren(this.self['CardParent']);
            }
            var arrCardAni = () => {
                for (let i = 0; i < arrCard.length; i++) {
                    const Card = arrCard[i];
                    let globalPos = Card.localToGlobal(new Laya.Point(Card.width / 2, Card.height / 2));
                    Laya.timer.once(i * 150, this, () => {
                        Animation2D.move_Simple(Card, Card.x, globalPos.y, Card.x, -300, 800, 0, () => {
                            if (i == arrCard.length - 1) {
                                anifunc();
                            }
                        }, Laya.Ease.cubicOut)
                    })
                }
            }
            var arrRepetitionCardAni = () => {
                for (let j = 0; j < arrRepetitionCard.length; j++) {
                    const Card = arrRepetitionCard[j];
                    let globalPos = Card.localToGlobal(new Laya.Point(Card.width / 2, Card.height / 2));
                    Laya.timer.once((j + 1) * 150, this, () => {
                        Effects.createExplosion_Rotate(this.self['CardParent'], 25, globalPos.x, globalPos.y, Effects.SkinStyle.dot, 10, 10);
                        Card.visible = false;
                        Gold.getGoldAni_Heap(Laya.stage, 8, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(globalPos.x, globalPos.y), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                            Gold.addGold(Card['objData'][Game3D.CardProperty.repetition]);
                            if (j == arrRepetitionCard.length - 1) {
                                if (j == 9) {
                                    anifunc();
                                } else {
                                    arrCardAni();
                                }
                            }
                        });
                    })
                }
            }
            if (arrRepetitionCard.length == 0) {
                arrCardAni();
            } else {
                arrRepetitionCardAni();
            }
        });

        Click.on(Click.Type.noEffect, this.self['Surface'], this,
            // 按下
            (e: Laya.Event) => {
                EventAdmin.notify(Guide.EventType.stepComplete);
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
                this['middleOff'] = true;
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
                if (this.self.getChildByName('DrawSp')) {
                    this.self.getChildByName('DrawSp').removeSelf();
                } else {
                    return;
                }
                EventAdmin.notify('drawCardEvent');
                this.self['DrawPosArr'] = null;
                this['middleOff'] = false;
            },
            // 出图片
            () => {
                if (this.self.getChildByName('DrawSp')) {
                    this.self.getChildByName('DrawSp').removeSelf();
                } else {
                    return;
                }
                EventAdmin.notify('drawCardEvent');
                this.self['DrawPosArr'] = null;
                this['middleOff'] = false;
            });
    }
    lwgBeforeVanishAni() {
        Game3D.Scene3D.active = true;
    };
    lwgOnDisable(): void {
        Setting.setBtnAppear();
    }
}