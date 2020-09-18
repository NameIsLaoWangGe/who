
import { VictoryBox, Gold, Tools, Admin, EventAdmin, Dialog, EasterEgg, Effects, Task, Click, TimerAdmin } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UIVictoryBox extends VictoryBox.VictoryBoxScene {
    constructor() { super(); }

    lwgOnAwake(): void {

        ADManager.TAPoint(TaT.BtnShow, 'UIVictoryBox_BtnAgain_Bytedance');
        ADManager.TAPoint(TaT.BtnShow, 'UIVictoryBox_Ads');
        Gold.createGoldNode(629, 174);

        // ADManager.TAPoint(TaT.BtnShow, 'ADrewardbt_box');
        if (VictoryBox._openVictoryBoxNum > 1) {
            let arr = Tools.arrayRandomGetOut([0, 1, 2, 3, 4, 5, 6, 7, 8], 3);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                VictoryBox.setProperty('box' + arr[index], VictoryBox.BoxProperty.ads, true);
            }
        }
        Tools.node_2DShowExcludedChild(this.var('Platform'), [Admin._platform]);
    }

    lwgOnEnable(): void {
        // 如果是随机金币，初始则设置好
        for (let index = 0; index < VictoryBox._BoxArray.length; index++) {
            let name = VictoryBox._BoxArray[index][VictoryBox.BoxProperty.name];
            let arr = VictoryBox.getProperty(name, VictoryBox.BoxProperty.rewardNum);
            let num = Tools.randomCountNumer(arr[0], arr[1], 1);
            VictoryBox.setProperty(name, VictoryBox.BoxProperty.rewardNum, num);
        }

        this.self['BtnClose'].visible = false;
        Laya.timer.once(2000, this, () => {
            this.self['BtnClose'].visible = true;
        })
        // 星星闪烁动画左边
        TimerAdmin.frameRandomLoop(30, 50, this, () => {
            let x = this.self['SceneContent'].width / 2 - 160;
            Effects.blink_Star(this.self['SceneContent'], new Laya.Point(x, this.self['TopPic'].height / 2 + 80), 90, 70, 'Game/UI/UIVictoryBox/xingxing.png', 53, 52);
        }, true)
        // 星星闪烁动画右边
        TimerAdmin.frameRandomLoop(30, 50, this, () => {
            let x = this.self['SceneContent'].width / 2 + 160;
            Effects.blink_Star(this.self['SceneContent'], new Laya.Point(x, this.self['TopPic'].height / 2 + 80), 90, 70, 'Game/UI/UIVictoryBox/xingxing.png', 53, 52);
        }, true)

    }

    lwgEventReg(): void {
        EventAdmin.reg(VictoryBox.EventType.openBox, this, (dataSource) => {
            console.log(dataSource, VictoryBox._canOpenNum);
            if (VictoryBox._canOpenNum > 0) {
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
        // if (VictoryBox._alreadyOpenNum === 9 && !EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_4, EasterEgg.Property.complete)) {
        //     EasterEgg.doDetection(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_4, 1);
        //     let cell = VictoryBox._BoxList.getCell(dataSource.arrange - 1);
        //     let Automan = cell.getChildByName('Automan') as Laya.Sprite;
        //     Automan.visible = true;
        //     automan = true;
        // }

        VictoryBox._canOpenNum--;
        VictoryBox._selectBox = dataSource[VictoryBox.BoxProperty.name];
        // 特效位置
        let diffX = dataSource.arrange % 3;
        if (diffX == 0) {
            diffX = 3;
        }
        let diffY = Math.floor(dataSource.arrange / 3 + 0.5);
        let x = VictoryBox._BoxList.x + VictoryBox._BoxList.width / 3 * diffX - 45;
        let y = VictoryBox._BoxList.y + VictoryBox._BoxList.height / 3 * diffY + 92;
        Effects.createExplosion_Rotate(this.self, 25, x, y, 'star', 10, 15);

        VictoryBox.setProperty(dataSource[VictoryBox.BoxProperty.name], VictoryBox.BoxProperty.openState, true);

        if (!automan) {
            Laya.timer.frameOnce(20, this, f => {
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    let rewardNum = VictoryBox.getProperty(dataSource.name, VictoryBox.BoxProperty.rewardNum);
                    Gold.addGold(rewardNum);
                });
            })
        }
        EventAdmin.notify(Task.EventType.victoryBox);
    }

    /**信息刷新，只用listData里面的信息进行赋值，不用其他信息进行赋值*/
    boxList_Update(cell: Laya.Box, index: number): void {
        let dataSource = cell.dataSource;

        // let Select = cell.getChildByName('Select') as Laya.Image;
        // if (VictoryBox._selectBox === dataSource[VictoryBox.BoxProperty.name]) {
        //     Select.visible = true;
        // } else {
        //     Select.visible = false;
        // }

        let Num = cell.getChildByName('Num') as Laya.Label;
        let Pic_Gold = cell.getChildByName('Pic_Gold') as Laya.Image;
        let Pic_Box = cell.getChildByName('Pic_Box') as Laya.Image;
        let BordPic = cell.getChildByName('BordPic') as Laya.Image;

        if (!dataSource[VictoryBox.BoxProperty.openState]) {
            if (dataSource[VictoryBox.BoxProperty.ads]) {
                Pic_Box.skin = 'Game/UI/UIVictoryBox/baoxiang_adv.png';
            } else {
                Pic_Box.skin = 'Game/UI/UIVictoryBox/baoxiang2.png';
            }
            Pic_Box.visible = true;
            Pic_Gold.visible = false;
            Num.visible = false;
            // BordPic.skin = 'UI/Common/kuang2.png';
        } else {
            Pic_Box.visible = false;
            Pic_Gold.visible = true;
            Num.visible = true;
            Num.text = dataSource[VictoryBox.BoxProperty.rewardNum];
            // BordPic.skin = 'UI/Common/kuang1.png';
        }
    }

    lwgBtnClick(): void {
        let Dot: Laya.Sprite;
        if (Admin._platform = Admin._platformTpye.Bytedance) {
            Dot = this.var('Bytedance_Dot');
        } else if (Admin._platform = Admin._platformTpye.WeChat) {
            Dot = this.var('WeChat_Dot');
        }
        var no = () => {
            Admin._openScene(Admin.SceneName.UIVictory, this.self);
        }
        // /**看广告获取的最大次数为6次*/
        var again = (e: Laya.Event) => {
            e.stopPropagation();
            ADManager.TAPoint(TaT.BtnClick, 'UIVictoryBox_BtnAgain_Bytedance');

            if (VictoryBox._alreadyOpenNum < 9 && VictoryBox._adsMaxOpenNum > 0) {
                ADManager.ShowReward(() => {
                    Dialog.createHint_Middle(Dialog.HintContent["增加三次开启宝箱次数！"]);
                    VictoryBox._canOpenNum += 3;
                    VictoryBox._adsMaxOpenNum -= 3;
                })
            } else {
                Dialog.createHint_Middle(Dialog.HintContent["没有宝箱领可以领了！"]);
            }
        }
        Click.on(Click.Type.largen, this.self['OPPO_BtnNo'], this, null, null, no);
        Click.on(Click.Type.largen, this.self['OPPO_BtnAgain'], this, null, null, again);

        Click.on(Click.Type.largen, this.self['Bytedance_BtnNo'], this, null, null, no);
        Click.on(Click.Type.largen, this.self['Bytedance_BtnAgain'], this, null, null, again);
        Click.on(Click.Type.noEffect, this.self['Bytedance_BtnSelect'], this, null, null, () => {
            if (Dot.visible) {
                Dot.visible = false;
                this.self['Bytedance_BtnAgain'].visible = false;
            } else {
                Dot.visible = true;
                this.self['Bytedance_BtnAgain'].visible = true;
            }
        });
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, no);
    }
    lwgOnUpdate(): void {
        if (VictoryBox._canOpenNum > 0) {
            this.var('Platform').visible = false;
        } else {
            this.var('Platform').visible = true;
        }
    }
    lwgOnDisable(): void {
        Gold.GoldNode.removeSelf();
    }
}