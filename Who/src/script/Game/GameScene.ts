import { Admin, Dialog, Click, EventAdmin, Tools, Loding, DateAdmin, Animation2D, Gold, Animation3D, Effects, Share } from "../Frame/lwg";
import { Game3D } from "./Game3D";

export default class GameScene extends Admin.Scene {
    /** @prop {name:Option, tips:"选项卡预制体", type:Prefab}*/
    public Option: Laya.Prefab;
    /** @prop {name:GuessCard, tips:"对方提问预制体", type:Prefab}*/
    public GuessCard: Laya.Prefab;
    /** @prop {name:DoWell, tips:"干得漂亮预制体", type:Prefab}*/
    public DoWell: Laya.Prefab;

    /**选项卡*/
    OptionParent: Laya.Sprite;
    lwgOnAwake(): void {
        Gold.goldAppear();
    }

    lwgNodeDec(): void {
        this.OptionParent = this.self['OptionParent'] as Laya.Sprite;
    }

    lwgEventReg(): void {
        // 对方答题
        EventAdmin.reg(Game3D.EventType.oppositeAnswer, this, (questionAndYesOrNo, cardName) => {
            Animation2D.fadeOut(this.OptionParent, this.OptionParent.alpha, 0, 300, 0, () => {
                Tools.node_RemoveAllChildren(this.OptionParent);
                this.createOppositeQuestion(questionAndYesOrNo, cardName);
            });
        })

        // 我方答题
        EventAdmin.reg(Game3D.EventType.meAnswer, this, (questionArr) => {
            this.createQuestion(questionArr);
            Animation2D.fadeOut(this.OptionParent, 0, 1, 300, 0, () => {
            });
        })

        // 胜利
        EventAdmin.reg(EventAdmin.EventType.victory, this, () => {
            Admin._gameSwitch = false;
            Admin._openScene(Admin.SceneName.UIShare, this.self, () => { Share._fromWhich = Admin.SceneName.UIVictory });
        })

        // 失败
        EventAdmin.reg(EventAdmin.EventType.defeated, this, () => {
            Admin._openScene(Admin.SceneName.UIResurgence);
        })

        // 复活
        EventAdmin.reg(EventAdmin.EventType.resurgence, this, () => {
            Tools.node_RemoveAllChildren(this.OptionParent);
        })

        //隐藏选项卡
        EventAdmin.reg(Game3D.EventType.hideOption, this, () => {
            Animation2D.fadeOut(this.OptionParent, 1, 0.5, 500, 100, () => { })
        })

        // 干得漂亮提示
        EventAdmin.reg(Game3D.EventType.doWell, this, () => {
            this.createDoWall();
        })
    }

    lwgAdaptive(): void {
        this.self['SceneContent'].y = Laya.stage.height * 0.792;
    }

    lwgOnEnable(): void {
        EventAdmin.notify(Game3D.EventType.opening);
    }

    /**创建问题*/
    createQuestion(questionArr): void {
        if (questionArr.length < 3) {
            this.createOption(this.self['OptionParent'], this.self['OptionParent'].width / 2, this.self['OptionParent'].height / 2, questionArr[0], false);
        } else {
            for (let index = 0; index < questionArr.length; index++) {
                let x, y;
                switch (index) {
                    case 0:
                        x = this.self['OptionParent'].width * 0.25;
                        y = this.self['OptionParent'].height * 0.25;
                        break;
                    case 1:
                        x = this.self['OptionParent'].width * 0.75;
                        y = this.self['OptionParent'].height * 0.25;
                        break;
                    case 2:
                        x = this.self['OptionParent'].width * 0.25;
                        y = this.self['OptionParent'].height * 0.75;
                        break;
                    case 3:
                        x = this.self['OptionParent'].width * 0.75;
                        y = this.self['OptionParent'].height * 0.75;
                        break;
                    default:
                        break;
                }
                this.createOption(this.self['OptionParent'], x, y, questionArr[index], true);
            }
        }
    }

    /**创建选项卡*/
    createOption(parent, x, y, question: string, click: boolean): Laya.Sprite {
        Admin._clickLock.switch = false;
        let Option = Laya.Pool.getItemByCreateFun('Option', this.Option.create, this.Option) as Laya.Sprite;
        let Content = Option.getChildByName('Content') as Laya.Label;
        Content.text = question;
        parent.addChild(Option);
        Option.pos(x, y);
        if (Content.text.length >= 10) {
            Content.fontSize = 22;
        } else if (Content.text.length >= 8 && Content.text.length < 10) {
            Content.fontSize = 25;
        } else if (Content.text.length >= 6 && Content.text.length < 8) {
            Content.fontSize = 28;
        } else if (Content.text.length < 6) {
            Content.fontSize = 30;
        }
        if (click) {
            Click.on(Click.Type.largen, Option, this, null, null, () => {
                Admin._clickLock.switch = true;
                EventAdmin.notify(Game3D.EventType.judgeMeAnswer, question);
            });
        }
        return Option;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
        });
    }

    /**创建对方提问卡*/
    createOppositeQuestion(questionAndYesOrNo: Array<any>, cardName: string): void {
        Admin._clickLock.switch = false;
        let GuessCard = Laya.Pool.getItemByCreateFun('GuessCard', this.GuessCard.create, this.GuessCard) as Laya.Sprite;
        this.self.addChild(GuessCard);
        GuessCard.pos(0, 0);

        let QuestionBaord = GuessCard.getChildByName('QuestionBaord') as Laya.Label;
        let Question = QuestionBaord.getChildByName('Question') as Laya.Label;
        Question.text = questionAndYesOrNo[0];
        Animation2D.bombs_Appear(QuestionBaord, 0, 1, 1.1, 0, 150, 50, 600);

        let Card = GuessCard.getChildByName('Card') as Laya.Sprite;
        let CardName = Card.getChildByName('CardName') as Laya.Label;
        CardName.text = cardName;
        Card.y = Laya.stage.height * 0.483;
        Animation2D.cardRotateX_TowFace(Card, 180);
        Animation2D.move_Simple(Card, -800, Card.y, Laya.stage.width / 2, Card.y, 500);

        let BtnYes = GuessCard.getChildByName('BtnYes') as Laya.Label;

        var btnYesUp = () => {
            if (questionAndYesOrNo[1]) {
                Admin._clickLock.switch = true;
                EventAdmin.notify(Game3D.EventType.judgeOppositeAnswer, [questionAndYesOrNo[0], true]);
            } else {
                Tools.color_Filter(Card, [255, 0, 0, 1], 100);
                Animation2D.swell_shrink(Card, 1, 1.05, 80);
                Animation2D.leftRight_Shake(Card, 30, 50, 0, () => {
                    console.log('回答错误！');
                }, false);
            }
        }

        Click.on(Click.Type.largen, BtnYes, this, null, null, btnYesUp);

        let BtnNo = GuessCard.getChildByName('BtnNo') as Laya.Label;

        var btnNoUp = () => {
            if (!questionAndYesOrNo[1]) {
                Admin._clickLock.switch = true;
                EventAdmin.notify(Game3D.EventType.judgeOppositeAnswer, [questionAndYesOrNo[0], false]);
            } else {
                Tools.color_Filter(Card, [255, 0, 0, 1], 100);
                Animation2D.swell_shrink(Card, 1, 1.05, 80);
                Animation2D.leftRight_Shake(Card, 30, 50, 0, () => {
                    console.log('回答错误！');
                }, false);
            }
        }
        Click.on(Click.Type.largen, BtnNo, this, null, null, btnNoUp);

        BtnYes.y = Laya.stage.height * 0.874;
        BtnNo.y = Laya.stage.height * 0.874;

        Animation2D.scale_Alpha(BtnNo, 0, 0, 0, 1, 1, 1, 150, 600);
        Animation2D.scale_Alpha(BtnYes, 0, 0, 0, 1, 1, 1, 150, 600);

        EventAdmin.reg(Game3D.EventType.hideGuessCard, this, (func) => {
            Animation2D.bombs_Vanish(QuestionBaord, 0, 0, 0, 150, 500);
            Animation2D.move_Simple(Card, Card.x, Card.y, 1200, Card.y, 500, 150);
            Animation2D.cardRotateX_TowFace(Card, 180, null, 200);

            Animation2D.scale_Alpha(BtnNo, 1, 1, 1, 0, 0, 0, 150, 400);
            Animation2D.scale_Alpha(BtnYes, 1, 1, 1, 0, 0, 0, 150, 400, () => {
                GuessCard.removeSelf();
                if (func) {
                    func();
                }
            });
        })
    }

    /**创建干的漂亮提示*/
    createDoWall(): void {
        let DoWell = Laya.Pool.getItemByCreateFun('DoWell', this.DoWell.create, this.DoWell) as Laya.Sprite;
        Laya.stage.addChild(DoWell);
        DoWell.pos(Laya.stage.width / 2, Laya.stage.height / 2 - 150);
        Animation2D.bombs_AppearAllChild(DoWell, 0, 1, 1.1, Tools.randomOneHalf() == 0 ? 15 : -15, 200, 100, 200);

        for (let index = 0; index < 5; index++) {
            let pointAarr = Tools.point_RandomPointByCenter(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2 - 150), 200, 100);
            Laya.timer.once(300 * index, this, () => {
                Effects.createExplosion_Rotate(this.self, 25, pointAarr[0].x, pointAarr[0].y, 'star', 10, 10);
            })
        }
        Laya.timer.once(1500, this, () => {
            Animation2D.bombs_Vanish(DoWell, 0, 1, 1.1, Tools.randomOneHalf() == 0 ? 15 : -15, 200);

        })
    }

    onStageMouseDown(e: Laya.Event): void {
        let MainCamera = Game3D.MainCamera.getChildAt(0) as Laya.Camera;
        let hitResult: Laya.HitResult = Tools.d3_rayScanning(MainCamera, Game3D.Scene3D, new Laya.Vector2(e.stageX, e.stageY))[0];
        let Sp3D;
        if (hitResult) {
            Sp3D = hitResult.collider.owner;
            EventAdmin.notify(Game3D.EventType.judgeMeClickCard, Sp3D);
        }
    }
}

