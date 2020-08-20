import { lwg, Admin, Dialog, VictoryBox, EventAdmin, Animation2D, Effects, Gold, Click, Task, Tools, EasterEgg } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";

export default class UIVictoryBox extends VictoryBox.VictoryBoxScene {
    constructor() { super(); }

    victoryBoxOnAwake(): void {

        ADManager.TAPoint(TaT.BtnShow, 'Adboxvideo');
        ADManager.TAPoint(TaT.BtnShow, 'Adboxagain');
        Gold.goldAppear();

        // ADManager.TAPoint(TaT.BtnShow, 'ADrewardbt_box');

        if (VictoryBox._openVictoryBoxNum > 1) {
            let arr = Tools.randomNumOfArray([0, 1, 2, 3, 4, 5, 6, 7, 8], 3);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                VictoryBox.setBoxProperty('box' + arr[index], VictoryBox.BoxProperty.ads, true);
            }
        }

        switch (Game._platform) {
            case Game._platformTpye.WeChat:
                this.self['Bytedance'].visible = false;
                this.self['WeChat'].visible = true;
                this.self['BtnAgain_WeChat'].visible = false;
                this.self['BtnNo_WeChat'].visible = false;
                break;
            case Game._platformTpye.Bytedance:
                this.self['Bytedance'].visible = true;
                this.self['WeChat'].visible = false;
                this.self['BtnAgain_Bytedance'].visible = false;
                this.self['BtnNo_Bytedance'].visible = false;
                this.self['Select_Bytedance'].visible = false;

                break;
            default:
                break;
        }
    }

    victoryBoxEventReg(): void {
        EventAdmin.reg(VictoryBox.EventType.openBox, this, (dataSource) => {
            console.log(dataSource, VictoryBox._defaultOpenNum);
            if (VictoryBox._defaultOpenNum > 0) {
                if (dataSource[VictoryBox.BoxProperty.ads]) {
                    ADManager.ShowReward(() => {
                        ADManager.TAPoint(TaT.BtnClick, 'Adboxvideo');
                        this.getRewardFunc(dataSource);
                    })
                } else {
                    this.getRewardFunc(dataSource);
                }
            } else {
                Dialog.createHint_Middle(Dialog.HintContent["观看广告可以获得三次开宝箱次数！"])
            }
        })
    }

    /**领取奖励动画*/
    getRewardFunc(dataSource): void {
        VictoryBox._alreadyOpenNum++;
        let automan = false;
        if (VictoryBox._alreadyOpenNum === 9 && !EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_4, EasterEgg.Property.complete)) {
            EasterEgg.doDetection(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_4, 1);
            let cell = VictoryBox._BoxList.getCell(dataSource.arrange - 1);
            let Automan = cell.getChildByName('Automan') as Laya.Sprite;
            Automan.visible = true;
            automan = true;
        }

        VictoryBox._defaultOpenNum--;
        if (VictoryBox._defaultOpenNum == 0) {
            this.self['BtnAgain_Bytedance'].visible = true;
            this.self['BtnNo_Bytedance'].visible = true;
            this.self['Select_Bytedance'].visible = true;

        }
        VictoryBox._selectBox = dataSource[VictoryBox.BoxProperty.name];
        // 特效
        let diffX = dataSource.arrange % 3;
        if (diffX == 0) {
            diffX = 3;
        }
        let diffY = Math.floor(dataSource.arrange / 3 + 0.5);
        let x = VictoryBox._BoxList.x + VictoryBox._BoxList.width / 3 * diffX - 45;
        let y = VictoryBox._BoxList.y + VictoryBox._BoxList.height / 3 * diffY + 92;
        Effects.createExplosion_Rotate(this.self, 25, x, y, 'star', 10, 15);

        VictoryBox.setBoxProperty(dataSource[VictoryBox.BoxProperty.name], VictoryBox.BoxProperty.openState, true);

        if (!automan) {
            Laya.timer.frameOnce(20, this, f => {
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Gold.addGold(VictoryBox.getBoxProperty(dataSource.name, VictoryBox.BoxProperty.rewardNum));
                });
            })
        }

        EventAdmin.notify(Task.EventType.victoryBox);
    }

    /**信息刷新，只用listData里面的信息进行赋值，不用其他信息进行赋值*/
    boxList_Update(cell: Laya.Box, index: number): void {
        let dataSource = cell.dataSource;

        let Select = cell.getChildByName('Select') as Laya.Image;
        if (VictoryBox._selectBox === dataSource[VictoryBox.BoxProperty.name]) {
            Select.visible = true;
        } else {
            Select.visible = false;
        }

        let Num = cell.getChildByName('Num') as Laya.Label;
        let Pic_Gold = cell.getChildByName('Pic_Gold') as Laya.Image;
        let Pic_Box = cell.getChildByName('Pic_Box') as Laya.Image;
        let BordPic = cell.getChildByName('BordPic') as Laya.Image;

        if (!dataSource[VictoryBox.BoxProperty.openState]) {
            if (dataSource[VictoryBox.BoxProperty.ads]) {
                Pic_Box.skin = 'UI/VictoryBox/baoxian_adv.png';
            } else {
                Pic_Box.skin = 'UI/VictoryBox/baoxian2.png';
            }

            Pic_Box.visible = true;
            Pic_Gold.visible = false;
            Num.visible = false;
            BordPic.skin = 'UI/Common/kuang2.png';
        } else {
            Pic_Box.visible = false;
            Pic_Gold.visible = true;
            Num.visible = true;
            Num.text = dataSource[VictoryBox.BoxProperty.rewardNum];
            BordPic.skin = 'UI/Common/kuang1.png';
        }
    }

    victoryBoxBtnClick(): void {
        Click.on('largen', this.self['BtnNo_WeChat'], this, null, null, this.btnNoUp);
        Click.on('largen', this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);

        Click.on('largen', this.self['BtnNo_Bytedance'], this, null, null, this.btnNoUp);
        Click.on('largen', this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
        Click.on('largen', this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelect_BytedanceUp);

    }
    btnOffClick(): void {
        Click.off('largen', this.self['BtnNo_WeChat'], this, null, null, this.btnNoUp);
        Click.off('largen', this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
    }

    btnSelect_BytedanceUp(): void {
        if (this.self['Dot_Bytedance'].visible) {
            this.self['Dot_Bytedance'].visible = false;
            this.self['BtnNo_Bytedance'].visible = true;
            this.self['BtnAgain_Bytedance'].visible = false;
        } else {
            this.self['Dot_Bytedance'].visible = true;
            this.self['BtnNo_Bytedance'].visible = false;
            this.self['BtnAgain_Bytedance'].visible = true;
        }
    }

    btnNoUp(event): void {
        lwg.Admin._openScene(lwg.Admin.SceneName.UIVictory, null, null, null);
        this.self.close();
    }

    // /**看广告获取的最大次数为6次*/
    btnAgainUp(event): void {
        ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_box');
        ADManager.TAPoint(TaT.BtnClick, 'Adboxagain');

        if (VictoryBox._alreadyOpenNum < 9 && VictoryBox._adsMaxOpenNum > 0) {
            ADManager.ShowReward(() => {
                Dialog.createHint_Middle(Dialog.HintContent["增加三次开启宝箱次数！"]);
                VictoryBox._defaultOpenNum += 3;
                VictoryBox._adsMaxOpenNum -= 3;
                this.self['BtnAgain_Bytedance'].visible = false;
                this.self['BtnNo_Bytedance'].visible = false;
                this.self['Select_Bytedance'].visible = false;
            })
        } else {
            Dialog.createHint_Middle(Dialog.HintContent["没有宝箱领可以领了！"]);
        }
    }

    victoryOnUpdate(): void {
        if (VictoryBox._defaultOpenNum > 0) {
            this.self['BtnAgain_WeChat'].visible = false;
            this.self['BtnNo_WeChat'].visible = false;

        } else {
            this.self['BtnAgain_WeChat'].visible = true;
            this.self['BtnNo_WeChat'].visible = true;

        }
    }
}