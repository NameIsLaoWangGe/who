import { lwg, EventAdmin } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import { lwg3D } from "../Lwg_Template/lwg3D";
var notify;
export default class GameMain3D_knife extends lwg3D.Scene3D {
    onTriggerEnter(other: Laya.Rigidbody3D): void {
        let owner = other.owner as Laya.MeshSprite3D;
        let ownerParent = owner.parent as Laya.MeshSprite3D;
        switch (owner.name.substring(0, 5)) {
            case 'Beard':
                // 随机给予一个属性，退出时把这个属性变为true，防止二次碰撞！
                if (owner['already']) {
                    return;
                } else {
                    owner['already'] = true;
                }
                if (ownerParent.name === 'RightBeard') {
                    EventAdmin.notify(GEnum.EventType.RightBeard)

                } else if (ownerParent.name === 'LeftBeard') {
                    EventAdmin.notify(GEnum.EventType.LeftBeard)

                } else if (ownerParent.name === 'MiddleBeard') {
                    EventAdmin.notify(GEnum.EventType.MiddleBeard)
                }
                else if (ownerParent.name === 'UpRightBeard') {
                    EventAdmin.notify(GEnum.EventType.UpRightBeard)
                }
                else if (ownerParent.name === 'UpLeftBeard') {
                    EventAdmin.notify(GEnum.EventType.UpLeftBeard)
                }

                other.isKinematic = false;
                other.isTrigger = false;
                other.linearVelocity = new Laya.Vector3(0, -3, 0);
                break;
            default:
                break;
        }
    }
}