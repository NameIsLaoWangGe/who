import { Loding, Admin, Gold, Setting, PalyAudio, DateAdmin } from "../Frame/lwg";
import { Game3D } from "./Game3D";
export default class UILoding extends Loding.LodingScene {
    lwgOnAwake(): void {
        Loding.list_2DPic = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
            "res/atlas/Game/UI/UISkinQualified.png",
            "res/atlas/Game/UI/UIDrawCard/Card.png",
        ];
        Loding.list_2DScene = [
            "Scene/LwgInit.json",
            "Scene/UICheckIn.json",
            // "Scene/UIEasterEgg.json",
            // "Scene/UIOperation.json",
            "Scene/UISet.json",
            // "Scene/UIShop.json",
            // "Scene/UISkinXD.json",
            // "Scene/UITask.json",
            "Scene/UISkinQualified.json",
            "Scene/UIDrawCard.json",
        ];
        Loding.list_2DPrefab = [
            // "Prefab/PreOption.json",
            // "Prefab/PreGuessCard.json",
        ];
        Loding.list_3DScene = [
            "3DScene/LayaScene_GameMain/Conventional/GameMain.ls"
        ];
        Loding.list_3DPrefab = [
            "3DPrefab/LayaScene_GameMain/Conventional/CardContainer.lh"
        ];
        Loding.list_JsonData = [
            // "GameData/Shop/Other.json",
            // "GameData/Shop/Props.json",
            // "GameData/Shop/Skin.json",
            // 'GameData/Task/everydayTask.json',
            "GameData/VictoryBox/VictoryBox.json",
            "GameData/CheckIn/CheckIn.json",
            // "GameData/Dialog/Dialog.json",
            "GameData/Game/Feature.json",
            "GameData/Game/Card.json",
            // "GameData/EasterEgg/EasterEgg.json",
        ];
    }
    lwgAdaptive(): void {
        this.self['Tag'].y = Laya.stage.height - 100;
        this.self['ProgressBoard'].y = Laya.stage.height * 0.824;
        this.self['Pic'].y = Laya.stage.height * 0.505;
        this.self['Logo'].y = Laya.stage.height * 0.191;

    }
    lwgOnEnable(): void {
    }
    lwgOpenAni(): number { return 0; }
    lodingPhaseComplete(): void {
        this.self['Progress'].mask.x = -425 + 425 * Loding.currentProgress.value / Loding.sumProgress;
    }
    lodingComplete(): number {
        this.self['Progress'].mask.x = 0;
        return 200;
    }
}

