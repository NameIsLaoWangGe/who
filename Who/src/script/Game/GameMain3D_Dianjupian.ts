import { lwg3D } from "../Lwg_Template/lwg3D";

export default class GameMain3D_Dianjupian extends lwg3D.Object3D {
    lwgOnUpdate(): void {
        if (this.self.name === 'dianjupian') {
            this.self.transform.localRotationEulerZ -= 7;
        }
    }
}