import { Loding, Admin, Gold, Setting, PalyAudio } from "../Frame/lwg";
import { Game3D } from "./Game3D";
export default class UILoding extends Loding.LodingScene {
    lwgOnAwake(): void {
        Loding.list_2DPic = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
        ];
        Loding.list_2DScene = [
            "Scene/LwgInit.json",
            // "Scene/UICheckIn.json",
            // "Scene/UIEasterEgg.json",
            // "Scene/UIOperation.json",
            // "Scene/UISet.json",
            // "Scene/UIShop.json",
            // "Scene/UISkinXD.json",
            // "Scene/UITask.json",
        ];
        Loding.list_2DPrefab = [
            // "Prefab/PreOption.json",
            // "Prefab/PreGuessCard.json",
        ];
        Loding.list_3DScene = [
            "3DScene/LayaScene_GameMain/Conventional/GameMain.ls"
        ];
        Loding.list_3DPrefab = [
            // "3DPrefab/LayaScene_GameMain/Conventional/LevelParent.lh"
        ];
        Loding.list_JsonData = [
            // "GameData/Shop/Other.json",
            // "GameData/Shop/Props.json",
            // "GameData/Shop/Skin.json",
            // 'GameData/Task/everydayTask.json',
            // "GameData/VictoryBox/VictoryBox.json",
            // "GameData/CheckIn/CheckIn.json",
            // "GameData/Dialog/Dialog.json",
            "GameData/Game/characteristics.json",
            "GameData/Game/Card.json",
            // "GameData/EasterEgg/EasterEgg.json",
        ];
    }
    lwgOnEnable(): void { }
    lwgOpenAni(): number { return 0; }
    lodingPhaseComplete(): void {
        this.self['Progress'].mask.x = -477 + 477 * Loding.currentProgress.value / Loding.sumProgress;
    }
    lodingComplete(): number {
        this.self['Progress'].mask.x = 0;
        return 200;
    }
}

