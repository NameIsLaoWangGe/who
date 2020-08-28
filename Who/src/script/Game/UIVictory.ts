import { VictoryScene, Admin, Gold, Setting, PalyAudio, Effects, EventAdmin, Task, Click, Dialog } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import RecordManager from "../../TJ/RecordManager";

export default class UIVictory extends VictoryScene {

    lwgOnAwake(): void {
        switch (Admin._platform) {
            case Admin._platformTpye.OPPO:
                this.self['OPPO'].visible = true;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = false;
                break;

            case Admin._platformTpye.WeChat:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = true;
                this.self['Bytedance'].visible = false;
                break;

            case Admin._platformTpye.Bytedance:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = true;
                break;
            default:
                break;
        }
    }

    lwgOnEnable(): void {
        PalyAudio.playVictorySound();

        Effects.createFireworks(Laya.stage, 40, 430, 200);
        Effects.createFireworks(Laya.stage, 40, 109, 200);

        Effects.createLeftOrRightJet(Laya.stage, 'right', 40, 720, 300);
        Effects.createLeftOrRightJet(Laya.stage, 'left', 40, 0, 300);


        let Num1 = this.self['GlodNum'].getChildByName('Num') as Laya.Label;
        Num1.text = '+' + 100;

        Gold.GoldNode = this.self['GoldNode'];
        let Num2 = this.self['GoldNode'].getChildByName('Num') as Laya.Label;
        Num2.text = Gold._num.value.toString();

        let time = 0;
        Laya.timer.frameLoop(8, this, () => {
            time++;
            if (time % 2 == 0) {
                this.self['Tag'].skin = 'Game/UI/UIVictory/dajia.png';
            }else{
                this.self['Tag'].skin = 'Game/UI/UIVictory/qipao.png';
            }
        })
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, () => {
            if (this.self['Dot_Bytedance'].visible) {
                ADManager.ShowReward(() => {
                    ADManager.TAPoint(TaT.BtnClick, 'closeword_success');
                    this.getGold(300);
                })
            } else {
                this.getGold(100);
            }
        });

        Click.on(Click.Type.largen, this.self['BtnShare'], this, null, null, () => {
            RecordManager._share('noAward', () => {
                Dialog.createHint_Middle(Dialog.HintContent["分享成功!"]);
            })
        });

        Click.on(Click.Type.noEffect, this.self['BtnSelect_Bytedance'], this, null, null, () => {
            if (this.self['Dot_Bytedance'].visible) {
                this.self['Dot_Bytedance'].visible = false;
            } else {
                this.self['Dot_Bytedance'].visible = true;
            }
        });
    }

    /**
     * 奖励
     * @param number 奖励数量
     */
    getGold(number: number): void {
        Admin._clickLock.switch = true;
        Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
            Gold.addGold(number);
            Admin._openScene(Admin.SceneName.UIStart, this.self);
            Admin._clickLock.switch = false;
        });
    }

    lwgOnDisable(): void {
        EventAdmin.notify(EventAdmin.EventType.nextCustoms);
    }
}