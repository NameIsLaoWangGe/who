import { lwg3D } from "../Frame/lwg3D";
import { Tools, EventAdmin, Animation3D, Admin } from "../Frame/lwg";
export module Game3D {
    /**场景节点枚举*/
    export let Scene3D: Laya.Scene3D;
    /**摄像机*/
    export let MainCamera: Laya.Camera;
    /**我方手上所有的牌的父节点*/
    export let MyCardParent: Laya.MeshSprite3D;
    /**对方手上所有的牌的父节点*/
    export let OppositeCardParent: Laya.MeshSprite3D;
    /**对方受伤我的牌的父节点*/
    export let OppositeHandParent: Laya.MeshSprite3D;
    /**所有牌集合*/
    export let AllCardTem: Laya.MeshSprite3D;

    /**本局我方手上对方的卡牌*/
    export let myHandCard: any;
    /**本局对方手上我方的卡牌*/
    export let oppositeHandCard: any;
    /**本回合需我方需要提问的特征*/
    export let questionArr: Array<string> = [];
    /**当前轮到谁猜了*/
    export let whichBout: string;

    /**特征总表*/
    export let characteristicsData = [];
    /**角色表*/
    export let CardData = [];

    /**谁的卡牌父节点*/
    export enum WhichScard {
        OppositeCardParent = 'OppositeCardParent',
        MyCardParent = 'MyCardParent',
    }

    /**特征表中的属性*/
    export enum CharacteristicsProperty {
        /**属性表中的序号*/
        index = 'index',
        /**属性描述*/
        describe = 'describe',
        /**针对这个属性需要提出的问题*/
        question = 'question',
    }

    /**卡牌表和需要付给卡牌的属性*/
    export enum CardProperty {
        /**属性数组*/
        characteristicsArr = 'characteristicsArr',
        /**中文名*/
        ChName = 'ChName',
        /**英文名*/
        name = 'name',
        /**是否被选过了，数据表中没有这个属性，需要我们赋值*/
        fall = 'fall'
    }

    /**轮到谁了*/
    export enum WhichBoutType {
        me = 'me',
        opposite = 'opposite',
        stop = 'stop',
        victory = 'victory',
        defeated = 'defeted',
    }

    /**事件*/
    export enum EventType {
        /**检验答题*/
        judgeQuestion = 'judgeQuestion',
        /**检测卡牌的点击*/
        judgeClickCard = 'judgeClickCard',
        /**下一回合*/
        nextRound = 'nextRound',
    }

    /**摄像机动画类型*/
    export enum CameraMoveType {
        nod = 'nod',
        shake = 'shake',
    }

    /**
     * 随机取出16张卡牌，放在合适的位置
     * @param type 我方还是对方
     * */
    export function randomlyTakeOut(type): void {
        /**复制对象数组，否则会修改原数组*/
        let CardData1 = Tools.objArray_Copy(CardData);
        let cardData16 = Tools.arrayRandomGetOut(CardData1, 16);

        if (type === WhichScard.MyCardParent) {
            oppositeHandCard = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1);
        }
        else if (type === WhichScard.OppositeCardParent) {
            myHandCard = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1);
        }

        let AllCardParent = AllCardTem.clone() as Laya.MeshSprite3D;
        let startZ = 0.3;
        for (let index = 0; index < cardData16.length; index++) {
            const Card = AllCardParent.getChildByName(cardData16[index][CardProperty.name]) as Laya.MeshSprite3D;
            if (type === WhichScard.MyCardParent) {
                if (Card.name === oppositeHandCard[0][CardProperty.name]) {
                    let HandCard = Card.clone() as Laya.MeshSprite3D;
                    OppositeHandParent.addChild(HandCard);
                    HandCard.transform.localPosition = new Laya.Vector3(0, 0, 0);
                }
                MyCardParent.addChild(Card);
                if (index % 4 == 0) {
                    startZ -= 0.5;
                }
                Card.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                Card.transform.localRotationEulerX = 10;
            } else if (type === WhichScard.OppositeCardParent) {
                OppositeCardParent.addChild(Card);

                if (index % 4 == 0) {
                    startZ += 0.5;
                }
                Card.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                Card.transform.localRotationEulerX = -10;
            }
            /**给每个卡牌赋值属性*/
            Card[CardProperty.characteristicsArr] = cardData16[index][CardProperty.characteristicsArr];
            Card[CardProperty.fall] = false;
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
        for (let i = 0; i < characteristicsData.length; i++) {
            let index = characteristicsData[i][CharacteristicsProperty.index];
            contrastArr.push({
                index: index,
                value: 0
            });
        }

        // 在空白表格上对特征数量进行数量标记
        let whichArr;
        if (type === WhichScard.MyCardParent) {
            whichArr = MyCardParent;
        } else {
            whichArr = OppositeCardParent;
        }

        // 剩余卡牌数量，已经对剩余卡牌进行数量标记
        let residueNum: number = 0;
        for (let i = 0; i < whichArr.numChildren; i++) {
            let Card = whichArr.getChildAt(i);
            if (!Card[CardProperty.fall]) {
                residueNum++;
                const characteristicsArr = Card[CardProperty.characteristicsArr];
                for (let j = 0; j < characteristicsArr.length; j++) {
                    const characteristicsIndex = characteristicsArr[j];
                    contrastArr[characteristicsIndex - 1]['value']++;
                }
            }
        }
        // 去零
        for (let i = 0; i < contrastArr.length; i++) {
            const element = contrastArr[i];
            if (element['value'] === 0) {
                contrastArr.splice(i, 1);
                i--;
            }
        }
        // 对属性进行排序
        Tools.objArrPropertySort(contrastArr, 'value');
        if (residueNum == 1) {
            questionArr = ['是谁？'];
        } else if (residueNum == 2) {
            questionArr = ['是谁？'];
        } else if (residueNum == 3) {
            questionArr = questionForindex(contrastArr);
        } else if (residueNum >= 4) {
            questionArr = questionForindex(contrastArr);
        }
        // console.log(contrastArr, questionArr);
    }

    /**
     * 根据所有卡牌属性的总值设置找出需要提问的属性
     * @param contrastArr 属性计数数组，只有属性序号和属性的数量
    */
    export function questionForindex(contrastArr): Array<any> {
        let indexArr = [];
        let medianIndex = Math.floor(contrastArr.length / 2);
        let content1 = contrastArr[medianIndex]['index'];
        let content2 = contrastArr[medianIndex + 1]['index'];
        let content3 = contrastArr[medianIndex - 1]['index'];
        let randIndex = Math.floor(Math.random() * 2) === 1 ? -2 : 2;
        let content4 = contrastArr[medianIndex + randIndex]['index'];
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

    /**角色属性数据初始化*/
    export function dataInit(): void {
        characteristicsData = Laya.loader.getRes("GameData/Game/characteristics.json")['RECORDS'];
        CardData = Laya.loader.getRes("GameData/Game/Card.json")['RECORDS'];
    }

    export class MainScene extends lwg3D.Scene3D {
        lwgOnAwake(): void {
            Scene3D = this.self;
            MainCamera = Scene3D.getChildByName('Main Camera') as Laya.Camera;
            MyCardParent = Scene3D.getChildByName('MyCardParent') as Laya.MeshSprite3D;
            OppositeCardParent = Scene3D.getChildByName('OppositeCardParent') as Laya.MeshSprite3D;
            OppositeHandParent = Scene3D.getChildByName('OppositeHandParent') as Laya.MeshSprite3D;
            AllCardTem = Scene3D.getChildByName('AllCard') as Laya.MeshSprite3D;
        }

        lwgEventReg(): void {
            EventAdmin.reg(EventType.judgeQuestion, this, (question) => {
                // 在特征表中的索引值
                let ChaIndex;
                for (let i = 0; i < characteristicsData.length; i++) {
                    if (question === characteristicsData[i][CharacteristicsProperty.question]) {
                        ChaIndex = characteristicsData[i][CharacteristicsProperty.index];
                    }
                }
                // 查找节点中有这个特征的数组
                let haveCardArr = [];
                let nohaveCardArr = [];
                let CardArr: Laya.MeshSprite3D;
                if (whichBout == WhichBoutType.me) {
                    CardArr = MyCardParent;
                } else if (WhichBoutType.opposite) {
                    CardArr = OppositeCardParent;
                }
                for (let i = 0; i < CardArr.numChildren; i++) {
                    let Card = CardArr.getChildAt(i);
                    let have;
                    for (let j = 0; j < Card[CardProperty.characteristicsArr].length; j++) {
                        if (ChaIndex === Card[CardProperty.characteristicsArr][j] && !Card[CardProperty.fall]) {
                            haveCardArr.push(Card.name);
                            have = true;
                            break;
                        }
                    }
                    if (!have) {
                        nohaveCardArr.push(Card.name);
                    }
                }
                // console.log(haveCardArr);
                // console.log(nohaveCardArr);
                // console.log(oppositeHandCard[0][CardProperty.name]);
                // 对比对方手上的牌，如果特征匹配，则删掉不匹配的牌，如果特征不匹配，则也删掉不匹配的牌
                let matching;
                for (let index = 0; index < haveCardArr.length; index++) {
                    if (haveCardArr[index] == oppositeHandCard[0][CardProperty.name]) {
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

            EventAdmin.reg(EventType.judgeClickCard, this, (MeshSprite3D: Laya.MeshSprite3D) => {
                if (MeshSprite3D[CardProperty.fall]) {
                    return;
                }
                if (whichBout == WhichBoutType.me) {
                    if (MeshSprite3D.parent === MyCardParent) {
                        if (MeshSprite3D.name == oppositeHandCard[0][CardProperty.name]) {
                            console.log('我方赢了！');
                            this.carFallAni([MeshSprite3D.name], true);
                            EventAdmin.notify(EventAdmin.EventType.victory);
                            // whichBout = WhichBoutType.victory;
                        } else {
                            console.log('选错了！');
                            this.carFallAni([MeshSprite3D.name]);
                        }
                    }
                } else if (whichBout == WhichBoutType.opposite) {
                    if (MeshSprite3D.parent !== OppositeCardParent) {
                        if (MeshSprite3D.name == myHandCard[0][CardProperty.name]) {
                            console.log('对方赢了！');
                            this.carFallAni([MeshSprite3D.name], true);
                            // whichBout = WhichBoutType.defeated;
                        }
                    }
                }
            })

            // 胜利
            EventAdmin.reg(EventAdmin.EventType.victory, this, () => {

            })
            // 下一关
            EventAdmin.reg(EventAdmin.EventType.nextCustoms, this, () => {
                this.opening();
            })

            //下一回合
            EventAdmin.reg(EventType.nextRound, this, () => {
                if (whichBout == WhichBoutType.victory) {

                } else if (whichBout == WhichBoutType.defeated) {

                } else {
                    randomTaskCard(WhichScard.MyCardParent);
                }
            })
        }

        /**
         * 卡牌倒下动画
         * @param arrName 名称数组，那些卡牌需要倒下
         * @param exclude 是否是反向排除这些卡牌，默认是不排除为false
         */
        carFallAni(arrName: Array<string>, exclude?: boolean): void {
            let CardParent: Laya.MeshSprite3D;
            if (whichBout == WhichBoutType.me) {
                CardParent = MyCardParent;
            } else if (WhichBoutType.opposite) {
                CardParent = OppositeCardParent;
            } else {
                return;
            }
            if (exclude) {
                for (let i = 0; i < CardParent.numChildren; i++) {
                    const Card = CardParent.getChildAt(i) as Laya.MeshSprite3D;
                    for (let j = 0; j < arrName.length; j++) {
                        if (Card.name !== arrName[j] && !Card[CardProperty.fall]) {
                            Card[CardProperty.fall] = true;
                            Card.transform.localRotationEulerX = -90;
                        }
                    }
                }
            } else {
                for (let i = 0; i < arrName.length; i++) {
                    let Card = CardParent.getChildByName(arrName[i]) as Laya.MeshSprite3D;
                    if (!Card[CardProperty.fall]) {
                        Card[CardProperty.fall] = true;
                        Card.transform.localRotationEulerX = -90;
                    }
                }
            }
            EventAdmin.notify(EventType.nextRound);
        }

        lwgOnEnable(): void {
            this.opening();
        }

        /**开局*/
        opening(): void {
            whichBout = WhichBoutType.me;
            if (MyCardParent.numChildren > 0) {
                MyCardParent.removeChildren(0, MyCardParent.numChildren - 1);
            }
            if (OppositeCardParent.numChildren > 0) {
                OppositeCardParent.removeChildren(0, OppositeCardParent.numChildren - 1);
            }
            randomlyTakeOut(WhichScard.MyCardParent);
            // randomlyTakeOut(WhichScard.OppositeCardParent);
            randomTaskCard(WhichScard.MyCardParent);
            // randomTaskCard(WhichScard.OppositeCardParent);
        }
    }
}
export default Game3D;

