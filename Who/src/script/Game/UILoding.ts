import { Loding, Admin, Gold, Setting, PalyAudio } from "../Frame/lwg";
import GameMain3D from "./GameMain3D";

export default class UILoding extends Loding.LodingScene {
    lwgOnAwake(): void {
        Loding.list_2D = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
        ];
        Loding.list_3DScene = [
            "3DScene/LayaScene_GameMain/Conventional/GameMain.ls"
        ];
        Loding.list_3DPrefab = [
            // "3DPrefab/LayaScene_GameMain/Conventional/LevelParent.lh"
        ]
        Loding.list_Json = [
            // "GameData/Shop/Other.json",
            // "GameData/Shop/Props.json",
            // "GameData/Shop/Skin.json",
            // 'GameData/Task/everydayTask.json',
            // "GameData/VictoryBox/VictoryBox.json",
            // "GameData/CheckIn/CheckIn.json",
            // "GameData/Dialog/Dialog.json",
            // "GameData/Game/GameLevel.json",
            // "GameData/EasterEgg/EasterEgg.json",
            // "Scene/UICheckIn.json",
            // "Scene/UIEasterEgg.json",
            // "Scene/UIOperation.json",
            // "Scene/UISet.json",
            // "Scene/UIShop.json",
            // "Scene/UISkinXD.json",
            // "Scene/UITask.json",
            // "Scene/UIADSHint.json",
        ];
    }

    lwgOnEnable(): void {
    }
    lodingPhaseComplete(): void {
    }
    lodingComplete(): void {
        let Scene3D = Laya.loader.getRes(Loding.list_3DScene[0]);
        Laya.stage.addChild(Scene3D);
    }
    lwgOnUpdate(): void {

    }
}

