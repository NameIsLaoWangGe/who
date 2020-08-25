import { VictoryScene, Admin, Gold, Setting, PalyAudio, Effects, EventAdmin, Task, Click } from "../Frame/lwg";
import ADManager, { TaT } from "../TJ/Admanager";

export default class UIVictory extends VictoryScene {

    lwgNodeDec(): void {
    }

    lwgOnEnable(): void {
    }

    /**本关获得金币显示*/
    getGoldDisPlay(number): void {

    }
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIStart, this.self);
        });
    }
    offClick(): void {
    }

    btnNext_BytedanceUp(): void {

    }

    btnSelectUp(): void {

    }

    btnNormalUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_success');
        this.offClick();
        Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
            this.advFunc(1);
        });
    }

    btnAdvUp(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_success');
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                this.advFunc(10);
            });
        })
    }

    /**
     * 奖励
     * @param number 倍数
     */
    advFunc(number: number): void {
        Gold.addGold(10);
        Admin._openScene(Admin.SceneName.UIStart, this.self);
    }

    lwgOnDisable(): void {
        EventAdmin.notify(EventAdmin.EventType.nextCustoms);
    }
}