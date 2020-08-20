import { Loding, Admin, Gold, Setting, PalyAudio } from "../Frame/lwg";
import GameMain3D from "./GameMain3D";

export default class UILoding extends Loding.LodingScene {
    lwgOnAwake(): void {
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
    }
    lwgOnEnable(): void {
    }
    lodingPhaseComplete(): void {
    }
    lodingComplete(): void {
    }
    lwgAdaptive(): void {
    }
    /**进度条动画开关*/
    maskMoveSwitch: boolean = true;
    /**剪刀修剪速度*/
    shearSpeed: number = 5;
    /**剪刀修剪开关*/
    shearSwitch: boolean = true;

    lwgOnUpdate(): void {
    }

    lwgOnDisable(): void {
        PalyAudio.playMusic();
    }
}

