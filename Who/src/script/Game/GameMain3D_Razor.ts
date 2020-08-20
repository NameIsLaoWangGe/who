import { lwg, Shop, EventAdmin } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import { lwg3D } from "../Lwg_Template/lwg3D";

export default class GameMain3D_Razor extends lwg3D.Scene3D {
    lwgOnEnable(): void {
        let Blade = this.self.getChildByName('Blade') as Laya.Sprite3D;
        Blade.addComponent(GameMain3D_Blade);
    }

    
}