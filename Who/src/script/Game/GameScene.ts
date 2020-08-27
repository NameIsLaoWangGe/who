import { Admin, Dialog, Click, EventAdmin, Tools, Loding, DateAdmin } from "../Frame/lwg";
import { Game3D } from "./Game3D";

export default class GameScene extends Admin.Scene {
    /** @prop {name:Option, tips:"选项卡预制体", type:Prefab}*/
    public Option: Laya.Prefab;
    /** @prop {name:GuessCard, tips:"对方提问预制体", type:Prefab}*/
    public GuessCard: Laya.Prefab;

    /**选项卡*/
    OptionParent: Laya.Sprite;
    lwgOnAwake(): void {
    }

    lwgNodeDec(): void {
        this.OptionParent = this.self['OptionParent'] as Laya.Sprite;
    }

    lwgEventReg(): void {
        // 下一回合
        EventAdmin.reg(Game3D.EventType.nextRound, this, () => {

        })
        // 胜利
        EventAdmin.reg(EventAdmin.EventType.victory, this, () => {
            Admin._gameSwitch = false;
            Admin._openScene(Admin.SceneName.UIVictory, this.self);
        })

        // 对方答题
        EventAdmin.reg(Game3D.EventType.oppositeAnswer, this, (questionAndYesOrNo, cardName) => {
            // console.log(questionAndYesOrNo, cardName)
            Tools.node_RemoveAllChildren(this.OptionParent);
            this.createOppositeQuestion(questionAndYesOrNo, cardName);
        })

        // 我方答题
        EventAdmin.reg(Game3D.EventType.meAnswer, this, (questionArr) => {
            this.createQuestion(questionArr);
        })
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
        let Option = Laya.Pool.getItemByCreateFun('Option', this.Option.create, this.Option) as Laya.Sprite;
        let Content = Option.getChildByName('Content') as Laya.Label;
        Content.text = question;
        parent.addChild(Option);
        Option.pos(x, y);
        if (click) {
            Click.on(Click.Type.largen, Option, this, null, null, () => {
                EventAdmin.notify(Game3D.EventType.judgeMeAnswer, question);
            });
        }
        return Option;
    }

    /**创建对方提问*/
    createOppositeQuestion(questionAndYesOrNo: Array<any>, cardName: string): void {
        let GuessCard = Laya.Pool.getItemByCreateFun('GuessCard', this.GuessCard.create, this.GuessCard) as Laya.Sprite;
        this.self.addChild(GuessCard);
        GuessCard.pos(360, 576);

        let QuestionBaord = GuessCard.getChildByName('QuestionBaord') as Laya.Label;
        let Question = QuestionBaord.getChildByName('Question') as Laya.Label;
        Question.text = questionAndYesOrNo[0];

        let CardName = GuessCard.getChildByName('CardName') as Laya.Label;
        CardName.text = cardName;

        let BtnYes = GuessCard.getChildByName('BtnYes') as Laya.Label;
        Click.on(Click.Type.largen, BtnYes, this, null, null, () => {
            if (questionAndYesOrNo[1]) {
                GuessCard.removeSelf();
                EventAdmin.notify(Game3D.EventType.judgeOppositeAnswer, [questionAndYesOrNo[0]]);
            } else {
                console.log('不可胡乱回答！');
            }
        });

        let BtnNo = GuessCard.getChildByName('BtnNo') as Laya.Label;
        Click.on(Click.Type.largen, BtnNo, this, null, null, () => {
            if (!questionAndYesOrNo[1]) {
                GuessCard.removeSelf();
                EventAdmin.notify(Game3D.EventType.judgeOppositeAnswer, [questionAndYesOrNo[0]]);
            } else {
                console.log('不可胡乱回答！');
            }
        });
    }

    onStageMouseDown(e: Laya.Event): void {
        let hitResult: Laya.HitResult = Tools.d3_rayScanning(Game3D.MainCamera, Game3D.Scene3D, new Laya.Vector2(e.stageX, e.stageY))[0];
        let sprite3D;
        if (hitResult) {
            sprite3D = hitResult.collider.owner;
            EventAdmin.notify(Game3D.EventType.judgeMeClickCard, sprite3D);
        }
    }

    lwgBtnClick(): void {

    }
}

