import { lwg3D } from "../Frame/lwg3D";
import { Tools } from "../Frame/lwg";

export module Game3D {
    /**场景节点枚举*/
    export let Scene3D: Laya.Scene3D;
    export let MainCamera: Laya.Camera;
    export let MyCard: Laya.MeshSprite3D;
    export let OppositeCard: Laya.MeshSprite3D;
    export let AllCardTem: Laya.MeshSprite3D;

    /**本局我方卡牌名称数组*/
    export let MyCardArr: Array<string> = [];
    /**本局對方卡牌名称数组*/
    export let OppositeCardArr: Array<string> = [];

    /**
     * 随机取出16张卡牌
     * @param type 取出到我方还是对方
     * */
    export function randomlyTakeOut(type): void {
        let index16 = Tools.randomNumOfArray(personData, 16);

        let startZ = 0.3;
        for (let index = 0; index < index16.length; index++) {
            const element = AllCardTem.getChildByName(index16[index]['name']) as Laya.MeshSprite3D;
            if (type === WhoScard.MyCard) {
                MyCardArr.push(index16[index]['name']);
                MyCard.addChild(element);

                if (index % 4 == 0) {
                    startZ -= 0.5;
                }
                element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                element.transform.localRotationEulerX = 10;
            } else if (type === WhoScard.OppositeCard) {
                OppositeCardArr.push(index16[index]['name']);
                OppositeCard.addChild(element);

                if (index % 4 == 0) {
                    startZ += 0.5;
                }
                element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                element.transform.localRotationEulerX = -10;
            }
        }
    }

    /**随机出一张需要猜的牌，规则是中心位置*/
     

    /**谁的卡牌*/
    export enum WhoScard {
        OppositeCard = 'OppositeCard',
        MyCard = 'MyCard',
    }

    /**特征总表*/
    export let characteristicsData = [];
    /**角色表*/
    export let personData = [];
    /**角色属性数据初始化*/
    export function dataInit(): void {
        characteristicsData = Laya.loader.getRes("GameData/Game/characteristics.json")['RECORDS'];
        personData = Laya.loader.getRes("GameData/Game/Person.json")['RECORDS'];
    }

    export class MainScene extends lwg3D.Scene3D {
        lwgOnAwake(): void {
            Scene3D = this.self;
            MainCamera = Scene3D.getChildByName('Main Camera') as Laya.Camera;
            MyCard = Scene3D.getChildByName('MyCard') as Laya.MeshSprite3D;
            OppositeCard = Scene3D.getChildByName('OppositeCard') as Laya.MeshSprite3D;
            AllCardTem = Scene3D.getChildByName('AllCard') as Laya.MeshSprite3D;
        }

        lwgOnEnable(): void {
            randomlyTakeOut(WhoScard.MyCard);
            randomlyTakeOut(WhoScard.OppositeCard);

        }
    }
}
export default Game3D;

