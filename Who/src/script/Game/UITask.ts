import { lwg, Click, EventAdmin, Dialog, Admin, Task, Gold, Shop, Setting } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
import { GVariate } from "../Lwg_Template/Global";

export default class UITask extends lwg.Task.TaskScene {

    taskOnAwake(): void {
        console.log(Laya.stage);
        ADManager.TAPoint(TaT.BtnShow, 'Adtask');

        GVariate._stageClick = false;
        Setting.setBtnVinish();
    }
    taskEventReg(): void {
        // 点击领取奖励
        EventAdmin.reg(Task.EventType.getAward, this, (dataSource) => {
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                Task.setTaskProperty(Task.TaskClass.everyday, dataSource.name, Task.TaskProperty.get, -1);
                Gold.addGold(dataSource[Task.TaskProperty.rewardNum]);
                Task._TaskList.refresh();
            });
        })

        // 看广告领取金币
        EventAdmin.reg(Task.EventType.adsGetAward_Every, this, (dataSource) => {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'Adtask');

                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Gold.addGold(Task.getTaskProperty(Task.TaskClass.everyday, dataSource.name, Task.TaskProperty.rewardNum));
                    Task._TaskList.refresh();
                });
            })
        })

    }

    taskList_Update(cell: Laya.Box, index: number): void {
        let dataSource = cell.dataSource;
        let Name = cell.getChildByName('Name') as Laya.Label;
        Name.text = dataSource.name;

        let BtnGet = cell.getChildByName('BtnGet') as Laya.Image;

        if (dataSource.get === 0) {
            BtnGet.skin = 'UI/Task/jinxing.png';
        } else if (dataSource.get === 1) {
            BtnGet.skin = 'UI/Task/linqu.png';
        } else if (dataSource.get === -1) {
            BtnGet.skin = 'UI/Task/yilingqu.png';
        }

        let ProgressBar = cell.getChildByName('ProgressBar') as Laya.Image;
        ProgressBar.width = dataSource.resCondition / dataSource.condition * 169;

        let ProNum = cell.getChildByName('ProNum') as Laya.Label;
        ProNum.text = dataSource.resCondition + '/' + dataSource.condition;

        let AwardNum = cell.getChildByName('AwardNum') as Laya.Label;
        AwardNum.text = dataSource.rewardNum;

        if (index === 0) {
            ProgressBar.width = 169;
            ProNum.text = '1/1';
            BtnGet.skin = 'UI/Task/adslingqu.png';
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, this.btnBackUp);

    };

    btnBackUp(): void {
        this.self.close();
    }

    taskOnDisable(): void {
        Setting.setBtnAppear();
        GVariate._stageClick = true;
    }
}