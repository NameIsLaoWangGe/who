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
    /**对方手上我的牌的父节点*/
    export let OppositeHandDispaly: Laya.MeshSprite3D;
    /**我手上的对面的卡牌父节点*/
    export let MyHandDispaly: Laya.MeshSprite3D;
    /**所有牌集合*/
    export let AllCardTem: Laya.MeshSprite3D;

    /**本局我方手上对方的卡牌*/
    export let myHandName: any;
    /**本局对方手上我方的卡牌名称*/
    export let oppositeHandName: string;
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
        /**检验答题是否正确*/
        judgeQuestion = 'judgeQuestion',
        /**检测卡牌的点击是否正确*/
        judgeClickCard = 'judgeClickCard',
        /**下一回合*/
        nextRound = 'nextRound',
        /**我方提问*/
        meAnswer = 'meAnswer',
        /**对方提问*/
        oppositeAnswer = 'oppositeAnswer',
        /**判断输赢*/
        winOrLose = 'winOrLose',
        /**开局*/
        opening = 'opening'
    }

    /**摄像机动画类型*/
    export enum CameraMoveType {
        nod = 'nod',
        shake = 'shake',
    }

    /**
     * 开局，随机取出16张卡牌，放在合适的位置,并且各随机出一张，作为本局双方需要猜的牌
     * @param type 我方还是对方
     * */
    export function randomlyTakeOut(type): void {
        /**复制对象数组，否则会修改原数组*/
        let CardData1 = Tools.objArray_Copy(CardData);
        let cardData16 = Tools.arrayRandomGetOut(CardData1, 16);

        if (type === WhichScard.MyCardParent) {
            oppositeHandName = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1)[0][CardProperty.name];
        }
        else if (type === WhichScard.OppositeCardParent) {
            myHandName = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1)[0][CardProperty.name];
        }

        let AllCardParent = AllCardTem.clone() as Laya.MeshSprite3D;
        let startZ = 0.3;
        for (let index = 0; index < cardData16.length; index++) {
            const Card = AllCardParent.getChildByName(cardData16[index][CardProperty.name]) as Laya.MeshSprite3D;
            if (type === WhichScard.MyCardParent) {
                if (Card.name === oppositeHandName) {
                    let HandCard = Card.clone() as Laya.MeshSprite3D;
                    OppositeHandDispaly.addChild(HandCard);
                    HandCard.transform.localPosition = new Laya.Vector3(0, 0, 0);
                }
                MyCardParent.addChild(Card);
                if (index % 4 == 0) {
                    startZ -= 0.5;
                }
                Card.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                Card.transform.localRotationEulerX = 10;

            } else if (type === WhichScard.OppositeCardParent) {
                if (Card.name === myHandName) {
                    let HandCard = Card.clone() as Laya.MeshSprite3D;
                    MyHandDispaly.addChild(HandCard);
                    HandCard.transform.localPosition = new Laya.Vector3(0, 0, 0);
                }

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
     * 从剩余卡牌中随机出一张需要猜的属性，规则是:
     * 1.初始化一个和characteristicsData长度相等的数组arr[{}]，每个元素开始都为{index：index，value：0}，
     * 2.循环出每个角色的属性索引值，匹配arr数组的索引值，如果匹配到，那么在arr中对应索引值的value+1，
     * 3.循环结束后，凡是有的属性，在arr中的对象中的值会递增，
     * 4.排除0的属性，然后排序，那么在中间的位置，则是我们需要找到的属性,然后对此提问
     * @param type 是我的卡牌还是对方的卡牌
     * */
    export function randomTaskCard(type): Array<any> {
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
        // 剩余可选择的卡牌数量，排除已经倒下的卡牌，已经对剩余卡牌进行数量标记
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
        return contrastArr;
    }

    /**
     * 我方回答问题规则
    */
    export function answerForMe(): Array<string> {
        let contrastArr = randomTaskCard(WhichScard.MyCardParent);
        let residueNum = noFallCardForMe().length;
        let indexArr = [];
        let medianIndex = Math.floor(contrastArr.length / 2);
        let index1 = contrastArr[medianIndex]['index'];
        let index2 = contrastArr[medianIndex + 1]['index'];
        let index3 = contrastArr[medianIndex - 1]['index'];
        let randIndex = Tools.randomOneHalf() ? -2 : 2;
        let index4 = contrastArr[medianIndex + randIndex]['index'];
        indexArr.push(index1, index2, index3, index4);

        let arr = [];
        for (let i = 0; i < characteristicsData.length; i++) {
            for (let j = 0; j < indexArr.length; j++) {
                if (characteristicsData[i][CharacteristicsProperty.index] == indexArr[j]) {
                    arr.push(characteristicsData[i][CharacteristicsProperty.question])
                }
            }
        }
        if (residueNum == 1) {
            return ['是谁？'];
        } else if (residueNum == 2) {
            return ['是谁？'];
        } else {
            return arr;
        }
    }

    /**
     * 对方回答问题
     * 对方提出问题时，我方必然会回答，也就是说，问题和答案我已经知道，而且不可以乱点
     * 所以返回一个数组[question，yesOrNo]问题和答案在一起。
     */
    export function answerForOpposite(): Array<any> {
        let arr = [];
        let question;
        let contrastArr = randomTaskCard(WhichScard.MyCardParent);

        let residueArr = noFallCardOpposite();
        let medianIndex = Math.floor(contrastArr.length / 2);
        if (residueArr.length === 1) {

            question = '是' + chNameForName(residueArr[0]) + '吗?';
            arr = [question, true];
        } else if (residueArr.length === 2) {

            let name = chNameForName(residueArr[Tools.randomOneHalf()]);
            question = '是' + chNameForName(residueArr[Tools.randomOneHalf()]) + '吗?';

            arr = [question, name === myHandName ? true : false];
        } else {
            for (let i = 0; i < characteristicsData.length; i++) {
                if (characteristicsData[i][CharacteristicsProperty.index] == medianIndex) {
                    question = characteristicsData[i][CharacteristicsProperty.question];
                    arr = [question, judgeQuestion(question, OppositeCardParent)];
                    break;
                }
            }
        }
        return arr;
    }

    /**
     * 返回我方没有倒下的卡牌
     * */
    export function noFallCardForMe(): Array<string> {
        let arr = [];
        for (let i = 0; i < MyCardParent.numChildren; i++) {
            let Card = MyCardParent.getChildAt(i);
            if (!Card[CardProperty.fall]) {
                arr.push(Card.name);
            }
        }
        return arr;
    }

    /**
     * 返回对方没有倒下的卡牌
     * */
    export function noFallCardOpposite(): Array<string> {
        let arr = [];
        for (let i = 0; i < OppositeCardParent.numChildren; i++) {
            let Card = OppositeCardParent.getChildAt(i);
            if (!Card[CardProperty.fall]) {
                arr.push(Card.name);
            }
        }
        return arr;
    }

    /**通过英文名查找中文名*/
    export function chNameForName(name): string {
        let chName: string;
        for (let i = 0; i < CardData.length; i++) {
            if (name == CardData[i][CardProperty.name]) {
                chName = CardData[i][CardProperty.ChName];
                break;
            }
        }
        return chName;
    }

    /**通过卡牌名称查找特征数组*/
    export function characteristicsForName(name): Array<string> {
        let characteristics: Array<string>;
        for (let i = 0; i < CardData.length; i++) {
            if (name == CardData[i][CardProperty.name]) {
                characteristics = CardData[i][CardProperty.ChName];
                break;
            }
        }
        return characteristics;
    }

    /**
    * 通过问题对特征进行判断，判断所有卡牌有没有这个特征,并且返回所有有和没有这个特征的两个卡牌数组
    * [0]为有这个特征的，[1]为没有这个特征的
    * @param question 问题
    * @param CardParent 父节点
    */
    export function checkForQuestion(question: string, CardParent: Laya.MeshSprite3D): Array<Array<string>> {
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
        for (let i = 0; i < CardParent.numChildren; i++) {
            let Card = CardParent.getChildAt(i);
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
        return [haveCardArr, nohaveCardArr];
    }

    /**
     * 通过选择的回答和手上卡牌的特征对比，判断是否正确
     * @param question 问题
    */
    export function judgeQuestion(question: string, CardParent: Laya.MeshSprite3D): boolean {
        let bool = false;
        let cardArr = checkForQuestion(question, CardParent);
        let haveCardArr = cardArr[0];
        let nohaveCardArr = cardArr[1];
        // 对比对方手上的牌，如果特征匹配，则删掉不匹配的牌，如果特征不匹配，则也删掉不匹配的牌
        for (let index = 0; index < haveCardArr.length; index++) {
            if (haveCardArr[index] == oppositeHandName) {
                bool = true;
            }
        }
        return bool;
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
            OppositeHandDispaly = Scene3D.getChildByName('OppositeHandDispaly') as Laya.MeshSprite3D;
            MyHandDispaly = Scene3D.getChildByName('MyHandDispaly') as Laya.MeshSprite3D;
            AllCardTem = Scene3D.getChildByName('AllCard') as Laya.MeshSprite3D;
        }

        lwgEventReg(): void {

            //开局
            EventAdmin.reg(EventType.opening, this, () => {
                whichBout = WhichBoutType.me;
                EventAdmin.notify(EventType.meAnswer, [answerForMe()]);
            })

            //下一回合
            EventAdmin.reg(EventType.nextRound, this, () => {
                if (whichBout == WhichBoutType.me) {

                    EventAdmin.notify(EventType.meAnswer, [answerForMe()]);
                } else if (whichBout == WhichBoutType.opposite) {

                    EventAdmin.notify(EventType.oppositeAnswer, [answerForOpposite()]);
                }
            })

            // 检测我的回答是否正确
            EventAdmin.reg(EventType.judgeQuestion, this, (question) => {
                let matching = judgeQuestion(question, MyCardParent);
                if (matching) {
                    console.log('特征正确！');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(1, 0, 0), 500, this, () => {
                        let cardArr = checkForQuestion(question, MyCardParent);
                        this.carFallAni(cardArr[1], MyCardParent);
                    });
                } else {
                    console.log('特征错误！');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(0, 3, 0), 500, this, () => {
                        let cardArr = checkForQuestion(question, MyCardParent);
                        this.carFallAni(cardArr[0], MyCardParent);
                    });
                }
            })

            // 检测我的点击是否正确
            EventAdmin.reg(EventType.judgeQuestion, this, (question) => {
                let matching = judgeQuestion(question, MyCardParent);
                if (matching) {
                    console.log('特征正确！');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(1, 0, 0), 500, this, () => {
                        let cardArr = checkForQuestion(question, MyCardParent);
                        this.carFallAni(cardArr[1], MyCardParent);
                    });
                } else {
                    console.log('特征错误！');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(0, 3, 0), 500, this, () => {
                        let cardArr = checkForQuestion(question, MyCardParent);
                        this.carFallAni(cardArr[0], MyCardParent);
                    });
                }
            })

            // 胜利
            EventAdmin.reg(EventAdmin.EventType.victory, this, () => {

            })

            // 下一关
            EventAdmin.reg(EventAdmin.EventType.nextCustoms, this, () => {
                this.init();
            })
        }

        /**回合切换器*/
        roundChange(): void {
            if (whichBout === WhichBoutType.me) {
                whichBout = WhichBoutType.opposite;
            } else if (whichBout === WhichBoutType.opposite) {
                whichBout = WhichBoutType.me;
            }
        }

        /**
         * 卡牌倒下动画
         * @param arrName 名称数组，那些卡牌需要倒下
         * @param exclude 是否是反向排除这些卡牌，默认是不排除为false
         */
        carFallAni(arrName: Array<string>, CardParent: Laya.MeshSprite3D, exclude?: boolean): void {
            if (exclude) {
                let nofallArr = [];
                for (let i = 0; i < CardParent.numChildren; i++) {
                    const Card = CardParent.getChildAt(i) as Laya.MeshSprite3D;
                    if (!Card[CardProperty.fall]) {
                        nofallArr.push(Card.name);
                    }
                }
                let arr = Tools.array1ExcludeArray2(nofallArr, arrName);
                for (let k = 0; k < arr.length; k++) {
                    let Card = CardParent.getChildByName(arr[k]) as Laya.MeshSprite3D;
                    Card[CardProperty.fall] = true;
                    Card.transform.localRotationEulerX = -90;
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
            // EventAdmin.notify(EventType.nextRound);
        }

        lwgOnEnable(): void {
            this.init();
        }

        /**开局*/
        init(): void {
            Tools.node_RemoveAllChildren(MyCardParent);
            Tools.node_RemoveAllChildren(OppositeCardParent);
            Tools.node_RemoveAllChildren(OppositeHandDispaly);
            randomlyTakeOut(WhichScard.MyCardParent);
            randomlyTakeOut(WhichScard.OppositeCardParent);
        }
    }
}
export default Game3D;

