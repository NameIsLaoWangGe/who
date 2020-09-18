import { VictoryScene, Admin, Gold, Setting, PalyAudio, Effects, EventAdmin, Task, Click, Dialog, Backpack, Tools } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import RecordManager from "../../TJ/RecordManager";

export default class UIVictory extends VictoryScene {

    lwgOnAwake(): void {
        ADManager.TAPoint(TaT.BtnShow, 'UIVictory_Three');
        Tools.node_2DShowExcludedChild(this.self['Platform'], [Admin._platform]);
        if (Admin._gameLevel.value % 4 == 0) {
            Backpack._trophy.num += 50;
        } else {
            Backpack._trophy.num += 5;
        }
        Admin._gameLevel.value++;
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
            } else {
                this.self['Tag'].skin = 'Game/UI/UIVictory/qipao.png';
            }
        })
    }

    lwgBtnClick(): void {
        let Dot: Laya.Sprite;
        if (Admin._platform = Admin._platformTpye.Bytedance) {
            Dot = this.var('Bytedance_Dot');
        } else if (Admin._platform = Admin._platformTpye.WeChat) {
            Dot = this.var('WeChat_Dot');
        }
        /**
         * 奖励
         * @param number 奖励数量
         */
        var generalAward = (number: number) => {
            Admin._clickLock.switch = true;
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                Gold.addGold(number);
                Admin._openScene(Admin.SceneName.UIStart, this.self);
                Admin._clickLock.switch = false;
            });
        }
        var moreAwards = () => {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'UIVictory_Three');
                generalAward(300);
            })
        }
        // 字节
        Click.on(Click.Type.largen, this.self['Bytedance_BtnNext'], this, null, null, () => {
            if (Dot.visible) {
                moreAwards();
            } else {
                generalAward(100);
            }
        });
        Click.on(Click.Type.largen, this.self['Bytedance_BtnShare'], this, null, null, () => {
            RecordManager._share('noAward', () => {
                Dialog.createHint_Middle(Dialog.HintContent["分享成功!"]);
            })
        });
        Click.on(Click.Type.noEffect, this.self['Bytedance_BtnSelect'], this, null, null, () => {
            if (Dot.visible) {
                Dot.visible = false;
            } else {
                Dot.visible = true;
            }
        });
        // OPPO
        Click.on(Click.Type.largen, this.self['OPPO_BtnMore'], this, null, null, () => {
            moreAwards();
        });
        Click.on(Click.Type.largen, this.self['OPPO_BtnNext'], this, null, null, () => {
            generalAward(100);
        });

        // 微信
        Click.on(Click.Type.largen, this.self['WeChat_BtnGeneral'], this, null, null, () => {
            moreAwards();
        });
        Click.on(Click.Type.largen, this.self['WeChat_BtnMore'], this, null, null, () => {
            generalAward(100);
        });
        Click.on(Click.Type.largen, this.self['Wechat_BtnSelect'], this, null, null, () => {
            if (Dot.visible) {
                this.var('WeChat_BtnMulti').visible = false;
                this.var('WeChat_BtnNormal').visible = true;
                Dot.visible = false;
            } else {
                this.var('WeChat_BtnMulti').visible = true;
                this.var('WeChat_BtnNormal').visible = false;
                Dot.visible = true;
            }
        });
    }

    lwgOnDisable(): void {
        EventAdmin.notify(EventAdmin.EventType.nextCustoms);
    }
}