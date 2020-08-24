import { Admin, Dialog, Click, EventAdmin } from "../Frame/lwg";
import { Game3D } from "./Game3D";

export default class GameScene extends Admin.Scene {
    /** @prop {name:Option, tips:"选项卡预制体", type:Prefab}*/
    public Option: Laya.Prefab;

    OptionParent: Laya.Sprite;
    lwgOnAwake(): void {
        this.creatQuestion();
    }

    lwgNodeDec(): void {
        this.OptionParent = this.self['OptionParent'] as Laya.Sprite;
    }

    lwgEventReg(): void {
        EventAdmin.reg('nextRound', this, () => {
            this.creatQuestion();
        })
    }
    lwgOnEnable(): void {

    }

    /**创建问题*/
    creatQuestion(): void {
        // console.log(Game3D.questionArr);
        if (this.OptionParent.numChildren > 0) {
            this.OptionParent.removeChildren(0, this.OptionParent.numChildren - 1);
        }
        let arr = [];
        if (Game3D.questionArr.length < 3) {
            this.createOption(this.self['OptionParent'], this.self['OptionParent'].width / 2, this.self['OptionParent'].height / 2, Game3D.questionArr[0], false);
        } else {
            for (let index = 0; index < Game3D.questionArr.length; index++) {
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

                this.createOption(this.self['OptionParent'], x, y, Game3D.questionArr[index], true);
            }
        }
    }
    createOption(parent, x, y, question: string, click: boolean): Laya.Sprite {
        let Option = Laya.Pool.getItemByCreateFun('Option', this.Option.create, this.Option) as Laya.Sprite;
        let Content = Option.getChildByName('Content') as Laya.Label;
        Content.text = question;
        parent.addChild(Option);
        Option.pos(x, y);
        if (click) {
            Click.on(Click.Type.largen, Option, this, null, null, () => {
                EventAdmin.notify(Game3D.EventType.judgeQuestion, question);
            });
        }
        return Option;
    }

    /**
     * 特征判断
     * 
    */
    judgeCharacteristic(): void {

    }

    lwgBtnClick(): void {

    }
}