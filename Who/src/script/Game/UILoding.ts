import { lwg, Animation2D, PalyAudio, EventAdmin, Admin, Loding, Task, Shop, Skin, Gold, Setting } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GSene3D } from "../Lwg_Template/Global";
import Init from "../Lwg_Template/Init";
export default class UILoding extends Loding.LodeScene {
    lodingResList(): void {
        Loding.lodingList_2D = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
            "res/atlas/UI/GameStart.png",
            "res/atlas/UI/Common.png",
            "res/atlas/UI/Shop/Skin.png",
            "res/atlas/UI/Shop/Props.png",
            "res/atlas/UI/Shop/Other.png",
            "res/atlas/UI/Shop.png",
            "res/atlas/UI/Skin.png",

            "res/atlas/UI/EasterEgg_Aotoman/Congratulation.png",
            "res/atlas/UI/EasterEgg_Aotoman/GameStart.png",
            "res/atlas/UI/EasterEgg_Aotoman/Hint.png",
            "res/atlas/UI/EasterEgg_Aotoman/Unworthy.png",
            "res/atlas/UI/EasterEgg_Aotoman/Task.png",

            "res/atlas/UI/XDSkin.png",

            "res/atlas/UI/Set.png",

            "res/atlas/UI/Task.png",

            "res/atlas/UI/Register.png",

            "res/atlas/UI/Common.png",

        ];
        Loding.lodingList_3DScene = [
            "3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls"
        ];
        Loding.lodingList_3DPrefab = [
            "3DPrefab/LayaScene_SampleScene/Conventional/LevelParent.lh"
        ]
        Loding.lodingList_Json = [
            "GameData/Shop/Other.json",
            "GameData/Shop/Props.json",
            "GameData/Shop/Skin.json",
            'GameData/Task/everydayTask.json',
            "GameData/VictoryBox/VictoryBox.json",
            "GameData/CheckIn/CheckIn.json",
            "GameData/Dialog/Dialog.json",
            "GameData/Game/GameLevel.json",
            "GameData/EasterEgg/EasterEgg.json",
            "Scene/UICheckIn.json",
            "Scene/UIEasterEgg.json",
            "Scene/UIOperation.json",
            "Scene/UISet.json",
            "Scene/UIShop.json",
            "Scene/UISkinXD.json",
            "Scene/UITask.json",
            "Scene/UIADSHint.json",
        ];

        this.shearAni(); 
    }

    lodingPhaseComplete(): void {
        // console.log(Loding.currentProgress.value);
    }

    lodingComplete(): void {
        this.self['Mask'].x = 0;
        this.self['Shear'].x = this.self['Mask'].width;
        this.self['Per'].text = 100 + '%';
        this.maskMoveSwitch = false;
        // 获取场景
        let Scene3D = Laya.loader.getRes("3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls") as Laya.Scene3D;
        Laya.stage.addChildAt(Scene3D, 0);
        Admin._sceneControl[Admin.SceneName.GameMain3D] = Scene3D;
        Scene3D.addComponent(GameMain3D);

        Laya.timer.once(500, this, () => {
            Gold.createGoldNode(Laya.stage);
            Setting.createSetBtn(65, 104, 47, 54, 'UI/GameStart/shezhi.png', Laya.stage);
            lwg.Admin._openScene(lwg.Admin.SceneName.UIStart, null, this.self);
        })
    }

    lwgInterior(): void {
        this.self.addComponent(Init);//误删
    }

    lwgAdaptive(): void {
        this.self['Bg'].y = Laya.stage.height / 2;
        this.self['Logo'].y = Laya.stage.height * 0.174;
        this.self['Progress'].y = Laya.stage.height * 0.827;
        this.self['FCM'].y = Laya.stage.height * 0.910;
    }

    /**剪刀动画*/
    shearAni(): void {
        Laya.timer.loop(20, this, () => {
            if (this.self['Shear_02'].rotation > 15) {
                this.self['Shear_02']['dir'] = 'up';
            } else if (this.self['Shear_02'].rotation <= 0) {
                this.self['Shear_02']['dir'] = 'down';
            }
            if (this.self['Shear_02']['dir'] === 'up') {
                this.self['Shear_02'].rotation -= this.shearSpeed;
                this.self['Shear_01'].rotation += this.shearSpeed;
            } else if (this.self['Shear_02']['dir'] === 'down') {
                this.self['Shear_02'].rotation += this.shearSpeed;
                this.self['Shear_01'].rotation -= this.shearSpeed;
            }
        });
    }

    /**进度条动画开关*/
    maskMoveSwitch: boolean = true;
    /**剪刀修剪速度*/
    shearSpeed: number = 5;
    /**剪刀修剪开关*/
    shearSwitch: boolean = true;

    lwgOnUpdate(): void {
        // 模拟加载进度,非真实进度，最后为1时为真实进度
        if (this.maskMoveSwitch) {
            if (this.self['Mask'].x < -20) {
                this.self['Mask'].x += 3;
                this.self['Shear'].x += 3;
                // 百分比数字
                let str: string = ((- this.self['Mask'].width - this.self['Mask'].x) / - this.self['Mask'].width * 100).toString().substring(0, 2);
                this.self['Per'].text = str + '%';
            }
        }
    }

    lwgOnDisable(): void {
        lwg.PalyAudio.playMusic();
    }
}

