import { lwg3D } from "../Frame/lwg3D";
import { Tools, EventAdmin, Animation3D } from "../Frame/lwg";

export module Game3D {
    /**场景节点枚举*/
    export let Scene3D: Laya.Scene3D;
    /**摄像机*/
    export let MainCamera: Laya.Camera;
    /**我方手上所有的牌的父节点*/
    export let MyCard: Laya.MeshSprite3D;
    /**对方手上所有的牌的父节点*/
    export let OppositeCard: Laya.MeshSprite3D;
    /**对方受伤我的牌的父节点*/
    export let OppositeHandParent: Laya.MeshSprite3D;
    /**所有牌集合*/
    export let AllCardTem: Laya.MeshSprite3D;

    /**本局我方手上对方的卡牌*/
    export let myHandCard: any;
    /**本局对方手上我方的卡牌*/
    export let oppositeHandCard: any;
    /**本局我方卡牌名称数组*/
    export let myCardArr: Array<string> = [];
    /**本局對方卡牌名称数组*/
    export let oppositeCardArr: Array<string> = [];
    /**本回合需我方需要提问的特征*/
    export let questionArr: Array<string> = [];
    /**当前轮到谁猜了*/
    export let whichBout: string;

    /**
     * 随机取出16张卡牌，放在合适的位置
     * @param type 我方还是对方
     * */
    export function randomlyTakeOut(type): void {
        let index16 = Tools.arrayRandomGetOut(CardData, 16);
        if (type === WhichScard.MyCard) {
            oppositeHandCard = Tools.arrayRandomGetOut(Tools.array_Copy(index16), 1);
        }
        else if (type === WhichScard.OppositeCard) {
            myHandCard = Tools.arrayRandomGetOut(Tools.array_Copy(index16), 1);
        }

        let startZ = 0.3;
        for (let index = 0; index < index16.length; index++) {
            const element = AllCardTem.getChildByName(index16[index][CardProperty.name]) as Laya.MeshSprite3D;
            if (type === WhichScard.MyCard) {
                if (element.name === oppositeHandCard[0][CardProperty.name]) {
                    let HandCard = element.clone() as Laya.MeshSprite3D;
                    OppositeHandParent.addChild(HandCard);
                    HandCard.transform.localPosition = new Laya.Vector3(0, 0, 0);
                }
                myCardArr.push(index16[index]);
                MyCard.addChild(element);
                if (index % 4 == 0) {
                    startZ -= 0.5;
                }
                element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                element.transform.localRotationEulerX = 10;
            } else if (type === WhichScard.OppositeCard) {
                oppositeCardArr.push(index16[index]);
                OppositeCard.addChild(element);

                if (index % 4 == 0) {
                    startZ += 0.5;
                }
                element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                element.transform.localRotationEulerX = -10;
            }
            /**给每个节点赋值特征索引值数组*/
            element[CardProperty.characteristicsArr] = index16[index][CardProperty.characteristicsArr];
        }
    }

    /**
     * 从剩余卡牌中随机出一张需要猜的牌，规则是:
     * 1.初始化一个和characteristicsData长度相等的数组arr[{}]，每个元素开始都为{index：index，value：0}，
     * 2.循环出每个角色的属性索引值，匹配arr数组的索引值，如果匹配到，那么在arr中对应索引值的value+1，
     * 3.循环结束后，凡是有的属性，在arr中的对象中的值会递增，
     * 4.排除0的属性，然后排序，那么在中间的位置，则是我们需要找到的属性,然后对此提问
     * @param type 是我的卡牌还是对方的卡牌
     * */
    export function randomTaskCard(type): void {
        // 空白属性表格
        let contrastArr = [];
        for (let index = 0; index < characteristicsData.length; index++) {
            let index1 = characteristicsData[index][CharacteristicsProperty.index];
            contrastArr.push({
                index: index1,
                value: 0
            });
        }

        // 在空白表格上对属性数量进行数量标记
        let whichArr;
        if (type === WhichScard.MyCard) {
            whichArr = MyCard;
        } else {
            whichArr = OppositeCard;
        }

        for (let i = 0; i < myCardArr.length; i++) {
            const characteristicsArr = myCardArr[i][CardProperty.characteristicsArr];
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

        console.log('提问前：', contrastArr);
        // 对属性进行排序
        Tools.objArrPropertySort(contrastArr, 'value');
        if (whichArr.numChildren == 1) {
            questionArr = ['是谁？'];
        } else if (whichArr.numChildren == 2) {
            questionArr = ['是谁？'];
        } else if (whichArr.numChildren == 3) {
            questionArr = questionForindex(contrastArr);
        } else if (whichArr.numChildren >= 4) {
            questionArr = questionForindex(contrastArr);
        }

        console.log(contrastArr, questionArr);
    }

    /**
     * 根据所有卡牌属性的总值设置提出需要提问的属性
     * @param contrastArr 属性计数数组，只有属性需要和属性的数量
    */
    export function questionForindex(contrastArr): Array<any> {
        let indexArr = [];
        // let medianIndex = Math.floor(contrastArr.length / 2);
        // let content1 = contrastArr[medianIndex]['index'];
        // let content2 = contrastArr[medianIndex + 1]['index'];
        // let content3 = contrastArr[medianIndex - 1]['index'];
        // let randIndex = Math.floor(Math.random() * 2) === 1 ? -2 : 2;
        // let content4 = contrastArr[medianIndex + randIndex]['index'];
        let content1 = contrastArr[0]['index'];
        let content2 = contrastArr[1]['index'];
        let content3 = contrastArr[2]['index'];
        let content4 = contrastArr[3]['index'];
        indexArr.push(content1, content2, content3, content4);

        let arr = [];
        for (let i = 0; i < characteristicsData.length; i++) {
            for (let j = 0; j < indexArr.length; j++) {
                if (characteristicsData[i][CharacteristicsProperty.index] == indexArr[j]) {
                    arr.push(characteristicsData[i][CharacteristicsProperty.question])
                }
            }
        }
        return arr;
    }

    /**通过卡牌名称拿到改卡牌的特征数组*/
    export function getCharacteristicsOfName(name): any {
        let arr;
        for (let index = 0; index < characteristicsData.length; index++) {
            const element = characteristicsData[index];
            if (characteristicsData[index][CardProperty.name] === name) {
                arr = characteristicsData[index][CardProperty.characteristicsArr];
                break;
            }
        }
        return arr;
    }


    /**谁的卡牌*/
    export enum WhichScard {
        OppositeCard = 'OppositeCard',
        MyCard = 'MyCard',
    }

    /**特征总表*/
    export let characteristicsData = [];

    /**特征表中的属性*/
    export enum CharacteristicsProperty {
        /**属性表中的序号*/
        index = 'index',
        /**属性描述*/
        describe = 'describe',
        /**针对这个属性需要提出的问题*/
        question = 'question',
    }
    /**角色表*/
    export let CardData = [];
    /**角色表中的属性*/
    export enum CardProperty {
        characteristicsArr = 'characteristicsArr',
        ChName = 'ChName',
        name = 'name',
    }

    /**轮到谁了*/
    export enum WhichBoutType {
        me = 'me',
        opposite = 'opposite'
    }

    /**事件*/
    export enum EventType {
        /**检验答题*/
        judgeQuestion = 'judgeQuestion',
        /**检测点击*/
        cardClick = 'cardClick'
    }

    /**摄像机动画类型*/
    export enum CameraMoveType {
        nod = 'nod',
        shake = 'shake',
    }

    /**角色属性数据初始化*/
    export function dataInit(): void {
        characteristicsData = Laya.loader.getRes("GameData/Game/characteristics.json")['RECORDS'];
        CardData = Laya.loader.getRes("GameData/Game/Card.json")['RECORDS'];
    }

    export class MainScene extends lwg3D.Scene3D {
        lwgOnAwake(): void {
            Scene3D = this.self;
            MainCamera = Scene3D.getChildByName('Main Camera') as Laya.Camera;
            MyCard = Scene3D.getChildByName('MyCard') as Laya.MeshSprite3D;
            OppositeCard = Scene3D.getChildByName('OppositeCard') as Laya.MeshSprite3D;
            OppositeHandParent = Scene3D.getChildByName('OppositeHandParent') as Laya.MeshSprite3D;
            AllCardTem = Scene3D.getChildByName('AllCard') as Laya.MeshSprite3D;

        }

        lwgEventReg(): void {
            EventAdmin.reg(EventType.judgeQuestion, this, (question) => {
                let ChaIndex;
                for (let i = 0; i < characteristicsData.length; i++) {
                    if (question === characteristicsData[i][CharacteristicsProperty.question]) {
                        ChaIndex = characteristicsData[i][CharacteristicsProperty.index];
                    }
                }
                let CardArr: Laya.MeshSprite3D;
                if (whichBout == WhichBoutType.me) {
                    CardArr = MyCard;
                } else if (WhichBoutType.opposite) {
                    CardArr = OppositeCard;
                }
                let haveCardArr = [];
                let nohaveCardArr = [];
                for (let i = 0; i < CardArr.numChildren; i++) {
                    let element = CardArr.getChildAt(i);
                    let have;
                    for (let j = 0; j < element[CardProperty.characteristicsArr].length; j++) {
                        if (ChaIndex === element[CardProperty.characteristicsArr][j]) {
                            haveCardArr.push(element.name);
                            have = true;
                            break;
                        }
                    }
                    if (!have) {
                        nohaveCardArr.push(element.name);
                    }
                }
                console.log(haveCardArr);
                console.log(nohaveCardArr);
                console.log(oppositeHandCard[0]['name']);
                // 对比对方手上的牌，如果特征匹配，则删掉不匹配的牌，如果特征不匹配，则删掉不匹配的牌
                let matching;
                for (let index = 0; index < haveCardArr.length; index++) {
                    if (haveCardArr[index] == oppositeHandCard[0]['name']) {
                        matching = true;
                    }
                }
                if (matching) {
                    console.log('特征正确！');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(1, 0, 0), 500, this, () => {
                        this.carFallAni(nohaveCardArr);

                    });
                } else {
                    console.log('特征错误！');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(0, 3, 0), 500, this, () => {
                        this.carFallAni(haveCardArr);
                    });
                }
            })
        }

        /**删除节点*/

        /**卡牌倒下动画*/
        carFallAni(arr): void {
            let CardArr: Laya.MeshSprite3D;
            if (whichBout == WhichBoutType.me) {
                CardArr = MyCard;
            } else if (WhichBoutType.opposite) {
                CardArr = OppositeCard;
            }
            for (let i = 0; i < CardArr.numChildren; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j] == CardArr.getChildAt(i).name) {
                        CardArr.getChildAt(i).removeSelf();
                        myCardArr.splice(i, 1);
                        i;
                    }
                }
            }

            this.nextRound();
        }

        /**
         * 摄像机点头或者摇头动画
         * @param type 移动类型
        */
        cameraNodOrShaking(type): void {
            if (type === CameraMoveType.nod) {
                Animation3D.rock(MainCamera as any, new Laya.Vector3(3, 0, 0), 500, this, () => {
                    console.log('点头完成');
                });
            } else {
                Animation3D.rock(MainCamera as any, new Laya.Vector3(0, 3, 0), 500, this, () => {
                    console.log('摇头完成！');
                });
            }
        }

        /**下一回合*/
        nextRound(): void {

            randomTaskCard(WhichScard.MyCard);
            EventAdmin.notify('nextRound');
        }

        lwgOnEnable(): void {
            this.opening();
        }

        /**开局*/
        opening(): void {
            whichBout = WhichBoutType.me;
            if (MyCard.numChildren > 0) {
                MyCard.removeChildren(0, MyCard.numChildren - 1);
            }
            if (OppositeCard.numChildren > 0) {
                OppositeCard.removeChildren(0, OppositeCard.numChildren - 1);
            }
            randomlyTakeOut(WhichScard.MyCard);
            // randomlyTakeOut(WhichScard.OppositeCard);
            randomTaskCard(WhichScard.MyCard);
            // randomTaskCard(WhichScard.OppositeCard);
        }

    }
}
export default Game3D;

