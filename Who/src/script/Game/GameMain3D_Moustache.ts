import { lwg, Admin } from "../Lwg_Template/lwg";

export default class GameMain3D_Moustache extends lwg.Admin.Object3D {

    timer: number;
    moveSwitch: boolean = false;
    lwgOnEnable(): void {
        this.timer = 0;
        this.moveSwitch = false;
    }
    lwgOnUpdate(): void {
        if (this.moveSwitch) {
            this.timer++;
            this.self.transform.localPositionY += 0.1;
            if (this.timer > 100) {
                if (this.self.parent.numChildren === 1) {
                    Admin._gameStart = false;
                }
                this.self.removeSelf();
            }
        }
    }
}