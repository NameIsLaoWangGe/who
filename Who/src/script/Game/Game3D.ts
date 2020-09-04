import { lwg3D } from "../Frame/lwg3D";
import { Tools, EventAdmin, Animation3D, Admin } from "../Frame/lwg";
export module Game3D {
    /**场景节点枚举*/
    export let Scene3D: Laya.Scene3D;
    /**摄像机*/
    export let MainCamera: Laya.MeshSprite3D;

    /**角色父节点*/
    export let OppositeRoleParent: Laya.MeshSprite3D;
    /**对面的角色*/
    export let OppositeRole: Laya.MeshSprite3D;

    /**我方手上所有的牌的父节点*/
    export let MyCardParent: Laya.MeshSprite3D;
    /**对方手上所有的牌的父节点*/
    export let OppositeCardParent: Laya.MeshSprite3D;
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

    /**我方视角位置*/
    export let PerspectiveMe: Laya.MeshSprite3D;
    /**对方视角*/
    export let PerspectiveOPPosite: Laya.MeshSprite3D;

    /**特征总表*/
    export let featureData = [];
    /**角色表*/
    export let CardData = [];

    /**谁的卡牌父节点*/
    export enum WhichScard {
        OppositeCardParent = 'OppositeCardParent',
        MyCardParent = 'MyCardParent',
    }

    /**特征表中的属性*/
    export enum featureProperty {
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
        featureArr = 'featureArr',
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
    }

    /**事件*/
    export enum EventType {
        /**检验答题是否正确*/
        judgeMeAnswer = 'judgeMeAnswer',
        /**检验答题是否正确*/
        judgeOppositeAnswer = 'judgeOppositeAnswer',
        /**检测卡牌的点击是否正确*/
        judgeMeClickCard = 'judgeMeClickCard',
        /**下一回合*/
        nextRound = 'nextRound',
        /**我方提问*/
        meAnswer = 'meAnswer',
        /**对方提问*/
        oppositeAnswer = 'oppositeAnswer',
        /**判断输赢*/
        winOrLose = 'winOrLose',
        /**开局*/
        opening = 'opening',
        /**隐藏选项卡*/
        hideOption = 'hideOption',
        /**隐藏对方猜牌*/
        hideGuessCard = 'hideGuessCard',
        /**干得漂亮提示*/
        doWell = 'doWell',
    }

    /**角色名称*/
    export enum RoleName {
        Girl = 'Girl',
    }

    /**角色动画*/
    export enum RoleAniName {
        chaofeng = 'chaofeng',
        daiji = 'daiji',
        fouren = 'fouren',
        qupai = 'qupai',
        tiwen = 'tiwen',
        zhuhe = 'zhuhe',
        queding = 'queding',
        zhuhetingliu = 'zhuhetingliu'
    }
    /**卡牌动画*/
    export enum CardAni {
        standMe = 'standMe',
        fallMe = 'fallMe',
        standOpposite = 'standOpposite',
        fallOpposite = 'fallOpposite',
        blinkMe = 'blinkMe',
        blinkOpposite = 'blinkOpposite',
        clickMe = 'clickMe',
    }

    /**
     * 开局，随机取出16张卡牌，放在合适的位置,并且各随机出一张，作为本局双方需要猜的牌
     * @param type 我方还是对方
     * */
    export function set16InitialCards(type): void {
        /**复制对象数组，否则会修改原数组*/
        let CardData1 = Tools.objArray_Copy(CardData);
        let cardData16 = Tools.arrayRandomGetOut(CardData1, 16);
        if (type == WhichScard.MyCardParent) {
            oppositeHandName = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1)[0][CardProperty.name];
        }
        else if (type == WhichScard.OppositeCardParent) {
            myHandName = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1)[0][CardProperty.name];
        }

        let AllCardParent = AllCardTem.clone() as Laya.MeshSprite3D;
        let startX = 0.204;
        let spacingX = 0.3055;
        let startZ = -0.26;
        for (let index = 0; index < cardData16.length; index++) {
            const Card = AllCardParent.getChildByName(cardData16[index][CardProperty.name]) as Laya.MeshSprite3D;
            if (type == WhichScard.MyCardParent) {
                MyCardParent.addChild(Card);
                if (index % 4 == 0) {
                    startZ -= 0.45;//和startZ一起调整
                }
                Card.transform.localPosition = new Laya.Vector3(spacingX * (index % 4) - startX, -0.1210217, startZ);

                Tools.d3_animatorPlay(Card, CardAni.standMe);

            } else if (type == WhichScard.OppositeCardParent) {
                OppositeCardParent.addChild(Card);
                if (index % 4 == 0) {
                    startZ += 0.45;
                }
                Card.transform.localPosition = new Laya.Vector3(spacingX * (index % 4) - startX, -0.1210217, startZ + 0.145);

                Tools.d3_animatorPlay(Card, CardAni.standOpposite);
            }
            /**给每个卡牌赋值属性*/
            Card[CardProperty.featureArr] = cardData16[index][CardProperty.featureArr];
            Card[CardProperty.fall] = false;
            // Card.transform.localRotationEulerZ = 180;
        }
    }

    /**
     * 获取剩余属性的权重值,对所有没有倒下的卡牌的属性数量排序
     * @param CardParent 是我的卡牌还是对方的卡牌
     * */
    export function getFeatureWeights(CardParent: Laya.MeshSprite3D): Array<any> {
        // 空白属性表格
        let weightArr = [];
        for (let i = 0; i < featureData.length; i++) {
            let index = featureData[i][featureProperty.index];
            weightArr.push({
                index: index,
                value: 0
            });
        }
        // 剩余可选择的卡牌数量，排除已经倒下的卡牌，已经对剩余卡牌进行数量标记
        let residueNum: number = 0;
        for (let i = 0; i < CardParent.numChildren; i++) {
            let Card = CardParent.getChildAt(i);
            if (!Card[CardProperty.fall]) {
                residueNum++;
                const featureArr = Card[CardProperty.featureArr];
                for (let j = 0; j < featureArr.length; j++) {
                    const featureIndex = featureArr[j];
                    weightArr[featureIndex - 1]['value']++;
                }
            }
        }
        // 去零
        for (let i = 0; i < weightArr.length; i++) {
            const element = weightArr[i];
            if (element['value'] == 0) {
                weightArr.splice(i, 1);
                i--;
            }
        }
        // 对属性进行排序
        Tools.objArrPropertySort(weightArr, 'value');
        return weightArr;
    }

    /**
     * 设置我方回答问题
    */
    export function setAnswerForMe(): Array<string> {
        let weightArr = getFeatureWeights(MyCardParent);
        let residueNum = getNotFallCardNameForMe().length;

        let arr = [];
        if (residueNum == 1) {
            return ['是谁？'];
        } else if (residueNum == 2) {
            return ['是谁？'];
        } else {
            let indexArr = [];
            let medianIndex = Math.floor(weightArr.length / 2);
            let index1 = weightArr[medianIndex]['index'];
            let index2 = weightArr[medianIndex + 1]['index'];
            let index3 = weightArr[medianIndex - 1]['index'];
            let randIndex = Tools.randomOneHalf() ? -2 : 2;
            let index4 = weightArr[medianIndex + randIndex]['index'];
            indexArr.push(index1, index2, index3, index4);
            for (let i = 0; i < featureData.length; i++) {
                for (let j = 0; j < indexArr.length; j++) {
                    if (featureData[i][featureProperty.index] == indexArr[j]) {
                        arr.push(featureData[i][featureProperty.question])
                    }
                }
            }
            return arr;
        }
    }

    /**
     * 设置对方回答问题
     * 对方提出问题时，我方必然会回答，也就是说，问题和答案我已经知道，而且不可以乱点
     * 所以返回一个数组[question，yesOrNo]问题和答案在一起。
     */
    export function setAnswerForOpposite(): Array<any> {
        let arr = [];
        let question;
        let weightArr = getFeatureWeights(OppositeCardParent);
        let residueArr = getNotFallCardNameOpposite();
        let medianIndex = Math.floor(weightArr.length / 2);

        if (residueArr.length == 1) {
            question = '是' + getChNameByName(residueArr[0]) + '吗?';
            arr = [question, true];
        } else if (residueArr.length == 2) {
            let redio = Tools.randomOneHalf();
            let name = getChNameByName(residueArr[redio]);
            question = '是' + name + '吗?';
            arr = [question, residueArr[redio] == myHandName ? true : false];
        } else {
            let featureIndex0: number;
            // 如果这个属性问题其余的卡牌全都有，则重新随机问题
            for (let i = 0; i < featureData.length; i++) {
                if (featureData[i][featureProperty.index] == weightArr[medianIndex]['index']) {
                    question = featureData[i][featureProperty.question];
                    featureIndex0 = i;
                    arr = [question, checkAnswerForHand(question, OppositeCardParent)];
                    break;
                }
            }
            // 如果这个属性所有卡牌都有，则随机抽出两张卡牌，找出一个他们不同的属性，这样无论如何都会消除卡牌，不会陷入僵局
            let cardArr0 = getCardHaveFeature(OppositeCardParent, featureIndex0, true);
            // console.log('所有卡牌数量和有这个属性卡牌的比例：', residueArr.length, cardArr0.length);
            if (residueArr.length == cardArr0.length + 1) {
                let indexArr = getTowCardNotFeatureArr(cardArr0[0], cardArr0[1]);
                let index0 = Tools.arrayRandomGetOut(indexArr, 1)[0];
                let question0 = getQuestionByIndex(index0);

                // console.log('随机到了所有卡牌都有的属性！从', cardArr0[0].name, cardArr0[1].name, '中随机获取一条不同属性', question0);
            }
        }
        // console.log(medianIndex, residueArr, weightArr, myHandName, arr);
        return arr;
    }

    /**
     * 对比两张卡牌， 获取两个卡牌中相互没有的属性索引值
     * 例如[1,3,5],[2,3,5],返回[1,2]
     * */
    export function getTowCardNotFeatureArr(Card1: Laya.MeshSprite3D, Card2: Laya.MeshSprite3D): Array<number> {
        let arr1 = Tools.array1ExcludeArray2(Card1[CardProperty.featureArr], Card2[CardProperty.featureArr]);
        let arr2 = Tools.array1ExcludeArray2(Card2[CardProperty.featureArr], Card1[CardProperty.featureArr]);
        let featureArr: Array<number> = Tools.arrayAddToarray(arr1, arr2);
        return featureArr;
    }

    /**
     * 获取当前没有倒下的卡牌节点
     * @param CardParent 卡牌父节点
     */
    export function getNotFallCard(CardParent: Laya.MeshSprite3D): Array<Laya.MeshSprite3D> {
        let CardArr: Array<Laya.MeshSprite3D> = [];
        for (let index = 0; index < CardParent.numChildren; index++) {
            let Card = MyCardParent.getChildAt(index) as Laya.MeshSprite3D;
            if (!Card[CardProperty.fall]) {
                CardArr.push(Card);
            }
        }
        return CardArr;
    }

    /**
     * 返回我方没有倒下的卡牌名称
     * */
    export function getNotFallCardNameForMe(): Array<string> {
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
     * 返回对方没有倒下的卡牌名称
     * */
    export function getNotFallCardNameOpposite(): Array<string> {
        let arr = [];
        for (let i = 0; i < OppositeCardParent.numChildren; i++) {
            let Card = OppositeCardParent.getChildAt(i);
            if (!Card[CardProperty.fall]) {
                arr.push(Card.name);
            }
        }
        return arr;
    }

    /**通过卡牌英文名查找卡牌中文名*/
    export function getChNameByName(name): string {
        let chName: string;
        for (let i = 0; i < CardData.length; i++) {
            if (name == CardData[i][CardProperty.name]) {
                chName = CardData[i][CardProperty.ChName];
                break;
            }
        }
        return chName;
    }

    /**通过卡牌英文名查找卡牌中文名*/
    export function getNameByChName(ChName): string {
        let name: string;
        for (let i = 0; i < CardData.length; i++) {
            if (ChName == CardData[i][CardProperty.ChName]) {
                name = CardData[i][CardProperty.name];
                break;
            }
        }
        return name;
    }

    /**通过卡牌名称查找特征数组*/
    export function getFeatureArrByName(name): Array<string> {
        let featureArr: Array<string>;
        for (let i = 0; i < CardData.length; i++) {
            if (name == CardData[i][CardProperty.name]) {
                featureArr = CardData[i][CardProperty.ChName];
                break;
            }
        }
        return featureArr;
    }

    /**通过问题查找所有有这个属性的人数组*/
    export function getNameArrByQuestion(question): Array<string> {
        let fIndex;
        for (let i = 0; i < featureData.length; i++) {
            if (question == featureData[i][featureProperty.question]) {
                fIndex = featureData[i][featureProperty.index];
                break;
            }
        }
        let nameArr = [];
        for (let i = 0; i < CardData.length; i++) {
            const Card = CardData[i];
            for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                if (fIndex == Card[CardProperty.featureArr][j]) {
                    nameArr.push(Card[CardProperty.name]);
                    break;
                }
            }
        }
        return nameArr;
    }

    /**通过属性名查找所有有这个属性的卡牌的数组*/
    export function getNameArrByFeature(feature: string): Array<string> {
        let fIndex;
        for (let index = 0; index < featureData.length; index++) {
            if (feature = featureData[index]) {
                fIndex = featureData[index][featureProperty.index];
                break;
            }
        }
        let nameArr = [];
        for (let i = 0; i < CardData.length; i++) {
            const Card = CardData[i];
            for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                if (fIndex == Card[CardProperty.featureArr][j]) {
                    nameArr.push(Card[CardProperty.name]);
                    break;
                }
            }
        }
        return nameArr;
    }

    /**
     * 通过属性名获取属性在表中的索引值
     * @param feature
     * */
    export function getIndexByFeature(feature: string): number {
        let index0: number;
        for (let index = 0; index < featureData.length; index++) {
            if (feature === featureData[index][featureProperty.describe]) {
                index0 = index;
                return index0;
            }
        }
    }

    /**通过属性索引值查找问题*/
    export function getQuestionByIndex(featureIndex: number): string {
        let question0: string;
        for (let index = 0; index < featureData.length; index++) {
            if (featureIndex === featureData[index][featureProperty.index]) {
                question0 = featureData[index][featureProperty.question];
                return question0;
            }
        }
    }

    /**
     * 获取没有倒下卡牌中有这个属性属性索引值的所有卡牌
     * @param CardParent 卡牌父节点
     * @param feature 属性
     * @param excludeHandName 是否排除相互手上的答案
     */
    export function getCardHaveFeature(CardParent: Laya.MeshSprite3D, featureIndex: number, excludeHandName?: boolean): Array<Laya.MeshSprite3D> {
        let notfallArr: Array<Laya.MeshSprite3D>;
        notfallArr = getNotFallCard(CardParent);

        let haveArr = [];
        for (let i = 0; i < notfallArr.length; i++) {
            const Card = notfallArr[i];
            for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                if (excludeHandName) {
                    if (Card.name == myHandName || Card.name == oppositeHandName) {
                        console.log('排除手上的答案');
                        break;
                    } else {
                        if (featureIndex == Card[CardProperty.featureArr][j]) {
                            haveArr.push(notfallArr[i]);
                            break;
                        }
                    }
                }
            }
        }
        return haveArr;
    }

    /**
     * 获取没有倒下卡牌中,没有这个属性索引值的所有卡牌接节点
     * @param CardParent 卡牌父节点
     * @param feature 属性
     * @param excludeHandName 是否排除相互手上的正确答案
     */
    export function getCardNotHaveFeature(CardParent: Laya.MeshSprite3D, featureIndex: number, excludeHandName?: boolean): Array<Laya.MeshSprite3D> {
        let notfallArr: Array<Laya.MeshSprite3D>;
        notfallArr = getNotFallCard(CardParent);
        let haveArr: Array<Laya.MeshSprite3D> = [];
        for (let i = 0; i < notfallArr.length; i++) {
            const Card = notfallArr[i];
            let bool;
            for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                if (excludeHandName) {
                    if (Card.name == myHandName || Card.name == oppositeHandName) {
                        // console.log('排除手上的答案');
                        break;
                    } else {
                        if (featureIndex == Card[CardProperty.featureArr][j]) {
                            bool = true;
                        }
                    }
                }
            }
            if (bool) {
                haveArr.push(notfallArr[i]);
            }
        }
        return haveArr;
    }

    /**
    * 通过问题对特征进行判断，判断所有还没有倒下的中有没有这个特征,并且返回所有有和没有这个特征的两个卡牌数组
    * [0]为有这个特征的，[1]为没有这个特征的
    * @param question 问题
    * @param CardParent 父节点
    */
    export function checkQuestion(question: string, CardParent: Laya.MeshSprite3D): Array<Array<string>> {
        // 在特征表中的索引值
        let ChaIndex;
        for (let i = 0; i < featureData.length; i++) {
            if (question == featureData[i][featureProperty.question]) {
                ChaIndex = featureData[i][featureProperty.index];
            }
        }
        // 查找节点中有这个特征的数组
        let haveCardArr = [];
        let nohaveCardArr = [];
        for (let i = 0; i < CardParent.numChildren; i++) {
            let Card = CardParent.getChildAt(i);
            let have;
            if (!Card[CardProperty.fall]) {
                for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                    if (ChaIndex == Card[CardProperty.featureArr][j]) {
                        haveCardArr.push(Card.name);
                        have = true;
                        break;
                    }
                }
                if (!have) {
                    nohaveCardArr.push(Card.name);
                }
            }
        }
        return [haveCardArr, nohaveCardArr];
    }

    /**
     * 通过选择的回答和手上卡牌的特征对比，判断是否正确
     * @param question 问题
     * @param CardParent 谁的回答
    */
    export function checkAnswerForHand(question: string, CardParent: Laya.MeshSprite3D): boolean {
        let bool = false;
        let cardArr = checkQuestion(question, CardParent);
        let haveCardArr = cardArr[0];
        let handName;
        if (CardParent == MyCardParent) {
            handName = oppositeHandName;
        } else if (CardParent == OppositeCardParent) {
            handName = myHandName;
        }
        // 对比对方手上的牌，如果特征匹配，则删掉不匹配的牌，如果特征不匹配，则也删掉不匹配的牌
        for (let index = 0; index < haveCardArr.length; index++) {
            if (haveCardArr[index] == handName) {
                bool = true;
            }
        }
        return bool;
    }

    /**角色属性数据初始化*/
    export function dataInit(): void {
        featureData = Laya.loader.getRes("GameData/Game/Feature.json")['RECORDS'];
        CardData = Laya.loader.getRes("GameData/Game/Card.json")['RECORDS'];
    }

    export class MainScene extends lwg3D.Scene3D {
        lwgOnAwake(): void {
            Scene3D = this.self;
            MainCamera = this.self.getChildByName('MainCamera') as Laya.MeshSprite3D;
            OppositeRoleParent = this.self.getChildByName('OppositeRoleParent') as Laya.MeshSprite3D;
            MyCardParent = this.self.getChildByName('MyCardParent') as Laya.MeshSprite3D;
            OppositeCardParent = this.self.getChildByName('OppositeCardParent') as Laya.MeshSprite3D;
            AllCardTem = this.self.getChildByName('AllCard') as Laya.MeshSprite3D;
            PerspectiveMe = this.self.getChildByName('PerspectiveMe') as Laya.MeshSprite3D;
            PerspectiveOPPosite = this.self.getChildByName('PerspectiveOPPosite') as Laya.MeshSprite3D;
        }

        lwgEventReg(): void {


            //开局
            EventAdmin.reg(EventType.opening, this, () => {
                Admin._gameSwitch = true;
                this.roundChange();
                EventAdmin.notify(EventType.nextRound);
            })

            let time = 500;
            //下一回合
            EventAdmin.reg(EventType.nextRound, this, () => {
                if (whichBout == WhichBoutType.me) {
                    Animation3D.moveRotateTo(MainCamera, PerspectiveMe, time, this, null, () => {
                        EventAdmin.notify(EventType.meAnswer, [setAnswerForMe()]);
                    });
                } else if (whichBout == WhichBoutType.opposite) {
                    Animation3D.moveRotateTo(MainCamera, PerspectiveOPPosite, time, this, null, () => {
                        EventAdmin.notify(EventType.oppositeAnswer, [setAnswerForOpposite(), getChNameByName(myHandName)]);
                    });
                }
            })

            // 检测我的回答是否正确
            EventAdmin.reg(EventType.judgeMeAnswer, this, (question) => {
                if (whichBout !== WhichBoutType.me) {
                    return;
                }
                this.roundChange();
                let matching = checkAnswerForHand(question, MyCardParent);
                let cardArr = checkQuestion(question, MyCardParent);

                Animation3D.moveRotateTo(MainCamera, PerspectiveOPPosite, time, this, null, () => {
                    if (matching) {
                        console.log('我回答正确');
                        Tools.d3_animatorPlay(OppositeRole, RoleAniName.queding);
                        Laya.timer.once(time * 4, this, () => {
                            Animation3D.moveRotateTo(MainCamera, PerspectiveMe, time, this, null, () => {

                                Laya.timer.once(time * 1.5, this, () => {
                                    this.carFallAni(cardArr[1], MyCardParent);
                                    Laya.timer.once(time * 4, this, () => {
                                        EventAdmin.notify(EventType.nextRound);
                                    })
                                })

                            })
                        })
                    } else {
                        console.log('我回答错误');
                        Tools.d3_animatorPlay(OppositeRole, RoleAniName.fouren);
                        Laya.timer.once(time * 4, this, () => {
                            Animation3D.moveRotateTo(MainCamera, PerspectiveMe, time, this, null, () => {
                                Laya.timer.once(time * 1.5, this, () => {
                                    this.carFallAni(cardArr[0], MyCardParent);
                                    Laya.timer.once(time * 4, this, () => {
                                        EventAdmin.notify(EventType.nextRound);
                                    })
                                })
                            })
                        })
                    }
                });
            })

            // 检测我点击是否正确
            EventAdmin.reg(EventType.judgeMeClickCard, this, (Card: Laya.MeshSprite3D) => {
                // console.log(whichBout);
                if (Card[CardProperty.fall]) {
                    return;
                }
                if (whichBout !== WhichBoutType.me) {
                    return;
                }
                if (Card.parent == MyCardParent) {
                    Tools.d3_animatorPlay(Card, CardAni.clickMe);
                    this.roundChange();
                    if (Card.name == oppositeHandName) {
                        Animation3D.moveRotateTo(MainCamera, PerspectiveOPPosite, time, this, null, () => {
                            console.log('我方赢了！');
                            let ani = Tools.d3_animatorPlay(OppositeRole, RoleAniName.zhuhetingliu);
                            Laya.timer.once(time * 3, this, () => {
                                this.carFallAni([oppositeHandName], MyCardParent, true);
                                Laya.timer.once(time * 4, this, () => {
                                    EventAdmin.notify(EventAdmin.EventType.victory);
                                })
                            })
                        })
                    } else {

                        Animation3D.moveRotateTo(MainCamera, PerspectiveOPPosite, time, this, null, () => {
                            console.log('我选错了！');
                            Tools.d3_animatorPlay(OppositeRole, RoleAniName.fouren);
                            Laya.timer.once(time * 4, this, () => {
                                Animation3D.moveRotateTo(MainCamera, PerspectiveMe, time, this, null, () => {
                                    Tools.d3_animatorPlay(OppositeRole, RoleAniName.daiji);
                                    Laya.timer.once(time * 1.5, this, () => {
                                        this.carFallAni([Card.name], MyCardParent);
                                        Laya.timer.once(time * 4, this, () => {
                                            EventAdmin.notify(EventType.nextRound);
                                        })
                                    })
                                })
                            })
                        })
                    }
                }
            })

            //检测对方的回答是否正确 
            EventAdmin.reg(EventType.judgeOppositeAnswer, this, (question: string, bool) => {
                if (whichBout !== WhichBoutType.opposite) {
                    return;
                }
                this.roundChange();
                let cardArr = checkQuestion(question, OppositeCardParent);
                let notFallLen = getNotFallCardNameOpposite().length;
                if (bool) {
                    console.log('对方回答正确');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(5, 0, 0), time, this, () => {
                        EventAdmin.notify(Game3D.EventType.hideGuessCard);
                        Laya.timer.once(time * 2.5, this, () => {
                            // 只剩两张牌的时候，问题是人名，而不是问题，所以需要单独判断
                            if (notFallLen == 2) {
                                console.log('对方只剩下2张牌，并且回答正确了，我方输了~！');
                                Tools.d3_animatorPlay(OppositeRole, RoleAniName.chaofeng);
                                let name = getNameByChName(question.substring(1, question.length - 2));
                                console.log('即将倒下的牌是排除', name);
                                Laya.timer.once(time * 3, this, () => {
                                    this.carFallAni([name], OppositeCardParent, true);
                                    Laya.timer.once(time * 3, this, () => {
                                        EventAdmin.notify(EventAdmin.EventType.defeated);
                                    })
                                })
                            } else if (notFallLen == 1) {
                                // 我方失败
                                Tools.d3_animatorPlay(OppositeRole, RoleAniName.chaofeng);
                                Laya.timer.once(time * 3, this, () => {
                                    EventAdmin.notify(EventAdmin.EventType.defeated);
                                })
                            } else {
                                Tools.d3_animatorPlay(OppositeRole, RoleAniName.qupai);
                                Laya.timer.once(time * 3, this, () => {
                                    this.carFallAni(cardArr[1], OppositeCardParent);
                                    Laya.timer.once(time * 3, this, () => {
                                        EventAdmin.notify(EventType.nextRound);
                                    })
                                })
                            }
                        })
                    });
                } else {
                    console.log('对方回答错误');
                    Animation3D.rock(MainCamera as any, new Laya.Vector3(0, 5, 0), time, this, () => {
                        EventAdmin.notify(Game3D.EventType.hideGuessCard, [() => {
                            Tools.d3_animatorPlay(OppositeRole, RoleAniName.qupai)
                        }]);
                        Laya.timer.once(time * 3, this, () => {
                            console.log('对方回答错误，倒下的牌将会是：', cardArr[0]);
                            // 只剩两张牌的时候，是人名，而不是问题，所以需要单独判断
                            if (notFallLen == 2) {
                                console.log('对方只剩下2张牌了，但是回答错了，我们还有一次机会~！');
                                let name = getNameByChName(question.substring(1, question.length - 2));
                                console.log('即将倒下的牌是', name);
                                Laya.timer.once(time * 1, this, () => {
                                    this.carFallAni([name], OppositeCardParent);
                                    Laya.timer.once(time * 3, this, () => {
                                        EventAdmin.notify(EventType.nextRound);
                                    })
                                })
                            } else {
                                Laya.timer.once(time * 1, this, () => {
                                    this.carFallAni(cardArr[0], OppositeCardParent);
                                    Laya.timer.once(time * 3, this, () => {
                                        EventAdmin.notify(EventType.nextRound);
                                    })
                                })
                            }
                        })
                    });
                }
            })
            // 下一关
            EventAdmin.reg(EventAdmin.EventType.nextCustoms, this, () => {
                this.init();
            })
            // 复活
            EventAdmin.reg(EventAdmin.EventType.resurgence, this, () => {
                Admin._gameSwitch = true;
                this.init();
            })
            // 刷新
            EventAdmin.reg(EventAdmin.EventType.scene3DRefresh, this, () => {
                Admin._gameSwitch = true;
                this.init();
            })
        }

        /**回合以及状态切换*/
        roundChange(): void {
            switch (whichBout) {
                case WhichBoutType.stop:
                    whichBout = WhichBoutType.me;
                    break;
                case WhichBoutType.me:
                    EventAdmin.notify(Game3D.EventType.hideOption);
                    whichBout = WhichBoutType.opposite;
                    break;
                case WhichBoutType.opposite:
                    whichBout = WhichBoutType.me;
                    break;
                default:
                    break;
            }
            // console.log('状态切换一次！切换后的状态为：', whichBout);
        }

        /**
         * 没有倒下的卡牌倒下动画
         * @param arrName 名称数组，哪些卡牌需要倒下
         * @param exclude 是否是反向排除这些卡牌，默认是不排除为false
         */
        carFallAni(arrName: Array<string>, CardParent: Laya.MeshSprite3D, exclude?: boolean): void {
            let fallNum = 0;
            var playAni = (Card: Laya.MeshSprite3D) => {
                if (CardParent == MyCardParent) {
                    Tools.d3_animatorPlay(Card, CardAni.blinkMe);
                    Laya.timer.once(600, this, () => {
                        Tools.d3_animatorPlay(Card, CardAni.fallMe);
                    })
                } else {
                    Tools.d3_animatorPlay(Card, CardAni.blinkOpposite);
                    Laya.timer.once(600, this, () => {
                        Tools.d3_animatorPlay(Card, CardAni.fallOpposite);
                    })
                }
            }
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
                    fallNum++;
                    let Card = CardParent.getChildByName(arr[k]) as Laya.MeshSprite3D;
                    Card[CardProperty.fall] = true;
                    playAni(Card);
                }
            } else {
                for (let i = 0; i < arrName.length; i++) {
                    let Card = CardParent.getChildByName(arrName[i]) as Laya.MeshSprite3D;
                    if (!Card[CardProperty.fall]) {
                        fallNum++;
                        Card[CardProperty.fall] = true;
                        playAni(Card);
                    }
                }
            }

            Laya.timer.once(400, this, () => {
                if (fallNum >= 2) {
                    if (CardParent == MyCardParent) {
                        EventAdmin.notify(EventType.doWell);
                    } else {

                    }
                }
            })
        }

        lwgOnEnable(): void {
            this.init();
        }

        /**开局*/
        init(): void {
            whichBout = WhichBoutType.stop;
            Tools.node_RemoveAllChildren(MyCardParent);
            Tools.node_RemoveAllChildren(OppositeCardParent);
            set16InitialCards(WhichScard.MyCardParent);
            set16InitialCards(WhichScard.OppositeCardParent);
            this.changeOpppsiteRole();
            Tools.d3_animatorPlay(OppositeRole, RoleAniName.daiji);
        }

        /**变换角色和手上的牌*/
        changeOpppsiteRole(): void {
            OppositeRole = OppositeRoleParent.getChildByName('Girl') as Laya.MeshSprite3D;
            let CardMarked: Laya.MeshSprite3D = Tools.node_3dFindChild(OppositeRole, 'CardMarked');
            let Card = MyCardParent.getChildByName(oppositeHandName) as Laya.MeshSprite3D;
            let mt = Card.meshRenderer.material;
            CardMarked.meshRenderer.material = mt;
        }
    }

}
export default Game3D;

