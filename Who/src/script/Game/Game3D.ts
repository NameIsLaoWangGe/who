import { lwg3D } from "../Frame/lwg3D";
import { Tools } from "../Frame/lwg";

export module Game3D {
    /**场景节点枚举*/
    export let Scene3D: Laya.Scene3D;
    export let MainCamera: Laya.Camera;
    export let MyCard: Laya.MeshSprite3D;
    export let OppositeCard: Laya.MeshSprite3D;
    export let AllCardTem: Laya.MeshSprite3D;

    /**本局我方卡牌数组*/
    export let MyCardArr: Array<string> = [];
    /**本局對方卡牌数组*/
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
                MyCardArr.push(index16[index]);
                MyCard.addChild(element);

                if (index % 4 == 0) {
                    startZ -= 0.5;
                }
                element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                element.transform.localRotationEulerX = 10;
            } else if (type === WhoScard.OppositeCard) {
                OppositeCardArr.push(index16[index]);
                OppositeCard.addChild(element);

                if (index % 4 == 0) {
                    startZ += 0.5;
                }
                element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                element.transform.localRotationEulerX = -10;
            }
        }
    }
    /**
     * 随机出一张需要猜的牌，规则是:
     * 1.初始化一个和characteristicsData长度相等的数组arr[{}]，每个元素开始都为{name，0}，
     * 2.循环出每个角色的属性名，如果这个属性存在，那么在arr中对应索引值的元素+1，
     * 3.循环结束后，凡是有的属性，在arr中的对象中的值会递增，
     * 4.排除0的属性，然后排序，那么在中间的位置，则是我们需要找到的属性
     * @param type 是我的卡牌还是对应的卡牌
     * */
    export function randomTaskCard(type): void {
        let contrastArr = [];
        
        for (let index = 0; index < characteristicsData.length; index++) {
            let index1 = characteristicsData[index][characteristicsProperty.index];
            contrastArr.push({
                index: index1,
                value: 0
            });
        }
        for (let i = 0; i < MyCardArr.length; i++) {
            const characteristicsArr = MyCardArr[i][personProperty.characteristicsArr];
            for (let j = 0; j < characteristicsArr.length; j++) {
                const characteristicsIndex = characteristicsArr[j];
                contrastArr[characteristicsIndex - 1]['value']++;
            }
        }
        for (let index = 0; index < contrastArr.length; index++) {
            const element = contrastArr[index];
            if (element['value'] === 0) {
                contrastArr.splice(index, 1);
                index--;
            }
        }
        Tools.objPropertySort(contrastArr, 'value');
    }

    /**谁的卡牌*/
    export enum WhoScard {
        OppositeCard = 'OppositeCard',
        MyCard = 'MyCard',
    }
    
    /**特征总表*/
    export let characteristicsData = [];
    /**特征表中的属性*/
    export enum characteristicsProperty {
        /**属性表中的序号*/
        index = 'index',
        /**属性描述*/
        describe = 'describe',
        /**针对这个属性需要提出的问题*/
        question = 'question',
    }
    /**角色表*/
    export let personData = [];
    /**角色表中的属性*/
    export enum personProperty {
        characteristicsArr = 'characteristicsArr',
        ChName = 'ChName',
        name = 'name',
    }
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
            randomTaskCard(WhoScard.MyCard);

        }
    }
}
export default Game3D;

