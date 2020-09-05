import UIPropTry from "../Game/UIPropTry";

// import ADManager, { TaT } from "../../TJ/Admanager";
/**综合模板*/
export module lwg {
    /**暂停模块，控制游戏的暂停和开启*/
    export module Pause {
        /**指代当前暂停游戏节点*/
        export let BtnPauseNode: Laya.Sprite;
        /**
         * 创建通用剩余体力数量prefab
         * @param parent 父节点
         */
        export function _createBtnPause(parent): void {
            let sp: Laya.Sprite;
            Laya.loader.load('prefab/BtnPause.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                parent.addChild(sp);
                sp.pos(645, 167);
                sp.zOrder = 0;
                BtnPauseNode = sp;
                BtnPauseNode.name = 'BtnPauseNode';
                Click.on(Click.Type.largen, sp, null, null, null, btnPauseUp, null);
            }));
        }
        export function btnPauseUp(event) {
            event.stopPropagation();
            event.currentTarget.scale(1, 1);
            lwg.Admin._openScene('UIPause', null, null, null);
        }
    }

    /**互推模块*/
    export module Elect {
        /**
         * 创建通用重来prefab
         * @param parent 父节点
         * @param y y位置
         */
        export function _createP201_01(parent): void {
            let sp: Laya.Sprite;
            Laya.loader.load('prefab/P201.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                sp = Laya.Pool.getItemByCreateFun('P201', _prefab.create, _prefab);
                parent.addChild(sp);
                sp.pos(80, 290);
                sp.zOrder = 65;
            }));
        }
    }

    /**提示模块*/
    export module Dialog {
        /**提示文字的类型描述*/
        export enum HintContent {
            '金币不够了！',
            '没有可以购买的皮肤了！',
            '暂时没有广告，过会儿再试试吧！',
            '暂无皮肤!',
            '暂无分享!',
            '暂无提示机会!',
            '观看完整广告才能获取奖励哦！',
            '通关上一关才能解锁本关！',
            '分享成功后才能获取奖励！',
            '分享成功!',
            '暂无视频，玩一局游戏之后分享！',
            '消耗2点体力！',
            '今日体力福利已领取！',
            '分享成功，获得125金币！',
            '分享成功，获得50金币！',
            '限定皮肤已经获得，请前往皮肤界面查看。',
            '分享失败！',
            '兑换码错误！',
            '尚未获得该商品!',
            '恭喜获得新皮肤!',
            '请前往皮肤限定界面获取!',
            '通过相应的关卡数达到就可以得到了!',
            '点击金币抽奖按钮购买!',
            '没有领取次数了！',
            '增加三次开启宝箱次数！',
            '观看广告可以获得三次开宝箱次数！',
            '没有宝箱领可以领了！',
            '请前往皮肤界面购买！',
            '今天已经签到过了！',
            '没有抽奖次数了，请通过观看广告获取！'
        }
        enum Skin {
            blackBord = 'Frame/UI/ui_orthogon_black.png'
        }

        /**
         * 动态创建，第一次创建比较卡，需要优化
         * @param describe 类型，也就是提示文字类型
         */
        export function createHint_Middle(describe: number): void {

            let Hint_M = Laya.Pool.getItemByClass('Hint_M', Laya.Sprite);
            Hint_M.name = 'Hint_M';//标识符和名称一样

            Laya.stage.addChild(Hint_M);
            Hint_M.width = Laya.stage.width;
            Hint_M.height = 100;
            Hint_M.pivotY = Hint_M.height / 2;
            Hint_M.pivotX = Laya.stage.width / 2;
            Hint_M.x = Laya.stage.width / 2;
            Hint_M.y = Laya.stage.height / 2;
            Hint_M.zOrder = 100;

            // 底图
            let Pic = new Laya.Image();
            Hint_M.addChild(Pic);
            Pic.skin = Skin.blackBord;
            Pic.width = Laya.stage.width;
            Pic.pivotX = Laya.stage.width / 2;
            Pic.height = 100;
            Pic.pivotY = Pic.height / 2;
            Pic.y = Hint_M.height / 2;
            Pic.x = Laya.stage.width / 2;
            Pic.alpha = 0.6;

            // 提示语
            let Dec = new Laya.Label();
            Hint_M.addChild(Dec);
            Dec.width = Laya.stage.width
            Dec.text = HintContent[describe];
            Dec.pivotX = Laya.stage.width / 2;
            Dec.x = Laya.stage.width / 2;
            Dec.height = 100;
            Dec.pivotY = 50;
            Dec.y = Hint_M.height / 2;
            Dec.bold = true;
            Dec.fontSize = 35;
            Dec.color = '#ffffff';
            Dec.align = 'center';
            Dec.valign = 'middle';

            // 动画
            Dec.alpha = 0;
            Animation2D.scale_Alpha(Hint_M, 0, 1, 0, 1, 1, 1, 200, 0, f => {
                Animation2D.fadeOut(Dec, 0, 1, 150, 0, f => {
                    Animation2D.fadeOut(Dec, 1, 0, 200, 800, f => {
                        Animation2D.scale_Alpha(Hint_M, 1, 1, 1, 1, 0, 0, 200, 0, f => {
                            Hint_M.removeSelf();
                        });
                    });
                });
            });
        }

        /**获取对话框内容，内容必须已经预加载*/
        export let _dialogContent = {
            get Array(): Array<any> {
                return Laya.loader.getRes("GameData/Dialog/Dialog.json")['RECORDS'] !== null ? Laya.loader.getRes("GameData/Dialog/Dialog.json")['RECORDS'] : [];
            },
        };

        /**
         * 获取对单个话框中指定的内容条目数组，通过适用场景和序号获取
         * @param useWhere 适用场景
         * @param name 对话的名称
         * */
        export function getDialogContent(useWhere: string, name: number): Array<string> {
            let dia;
            for (let index = 0; index < _dialogContent.Array.length; index++) {
                const element = _dialogContent.Array[index];
                if (element['useWhere'] == useWhere && element['name'] == name) {
                    dia = element;
                    break;
                }
            }
            let arr = [];
            for (const key in dia) {
                if (dia.hasOwnProperty(key)) {
                    const value = dia[key];
                    if (key.substring(0, 7) == 'content' || value !== -1) {
                        arr.push(value);
                    }
                }
            }
            return arr;
        }

        /**
          * 随机从列表中获取一个内容数组
          * @param useWhere 适用场景
          * */
        export function getDialogContent_Random(useWhere: string): Array<string> {
            let contentArr = [];
            let whereArr = getUseWhere(useWhere);
            let index = Math.floor(Math.random() * whereArr.length);
            for (const key in whereArr[index]) {
                if (whereArr[index].hasOwnProperty(key)) {
                    const value = whereArr[index][key];
                    if (key.substring(0, 7) == 'content' && value !== "-1") {
                        contentArr.push(value);
                    }
                }
            }
            return contentArr;
        }

        /**根据适用场景取出所有该场景下的数组*/
        export function getUseWhere(useWhere: string): Array<any> {
            let arr = [];
            for (let index = 0; index < _dialogContent.Array.length; index++) {
                const element = _dialogContent.Array[index];
                if (element['useWhere'] == useWhere) {
                    arr.push(element);
                }
            }
            return arr;
        }

        /**对话框中应用的场景类型*/
        export enum UseWhere {
            scene1 = 'scene1',
            scene2 = 'scene2',
            scene3 = 'scene3',
        }

        /**对话框中的属性*/
        export enum DialogProperty {
            /**名称，必须有*/
            name = 'name',
            /**试用场景*/
            useWhere = 'useWhere',
            /**内容条数，内容条数是content+数字，contentMax为最大条数*/
            content = 'content',
            /**语句的最大条目数，配合content属性查找*/
            max = 'max',
        }

        export enum PlayMode {
            /**自动播放，随即消失*/
            voluntarily = 'voluntarily',
            /**不点击屏幕则不会消失*/
            manual = 'manual',
            /**点击变换内容*/
            clickContent = 'clickContent',
        }

        export let DialogueNode;
        /**
         * 动态创建一个自动播放的对话框
         * @param x x位置
         * @param y y位置
         * @param useWhere 适用场景
         * @param parent 父节点
         * @param content 内容
         * @param startDelayed 起始延时时间
         * @param delayed 每段文字延迟时间，默认为2秒
         */
        export function createVoluntarilyDialogue(x: number, y: number, useWhere: string, startDelayed?: number, delayed?: number, parent?: Laya.Sprite, content?: Array<string>): void {
            if (startDelayed == undefined) {
                startDelayed = 0;
            }
            Laya.timer.once(startDelayed, this, () => {
                let Pre_Dialogue;
                Laya.loader.load('Prefab/Dialogue_Common.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    Pre_Dialogue = Laya.Pool.getItemByCreateFun('Pre_Dialogue', _prefab.create, _prefab);
                    if (parent) {
                        parent.addChild(Pre_Dialogue);
                    } else {
                        Laya.stage.addChild(Pre_Dialogue);
                    }
                    Pre_Dialogue.x = x;
                    Pre_Dialogue.y = y;
                    let ContentLabel = Pre_Dialogue.getChildByName('Content') as Laya.Label;
                    let contentArr;
                    if (content !== undefined) {
                        ContentLabel.text = content[0];
                    } else {
                        contentArr = getDialogContent_Random(useWhere);
                        ContentLabel.text = contentArr[0];
                    }
                    Pre_Dialogue.zOrder = 100;

                    if (delayed == undefined) {
                        delayed = 1000;
                    }
                    Animation2D.scale_Alpha(Pre_Dialogue, 0, 0, 0, 1, 1, 1, 150, 1000, () => {
                        for (let index = 0; index < contentArr.length; index++) {

                            Laya.timer.once(index * delayed, this, () => {
                                ContentLabel.text = contentArr[index];

                                if (index == contentArr.length - 1) {
                                    Laya.timer.once(delayed, this, () => {
                                        Animation2D.scale_Alpha(Pre_Dialogue, 1, 1, 1, 0, 0, 0, 150, 1000, () => {
                                            Pre_Dialogue.removeSelf();
                                        })
                                    })
                                }
                            })
                        }
                    });
                    DialogueNode = Pre_Dialogue;
                }));
            })
        }

        /**
         * 创建一个普通的对话框
         * @param parent 父节点
         * @param x x位置
         * @param y y位置
         * @param content 
         */
        export function createCommonDialog(parent, x, y, content: string): void {
            let Dialogue_Common;
            Laya.loader.load('Prefab/Dialogue_Common.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                Dialogue_Common = Laya.Pool.getItemByCreateFun('Dialogue_Common', _prefab.create, _prefab);
                parent.addChild(Dialogue_Common);
                Dialogue_Common.pos(x, y);
                let Content = Dialogue_Common.getChildByName('Dialogue_Common') as Laya.Label;
                Content.text = content;
            }))
        }
    }

    /**体力模块*/
    export module Execution {

        /**体力*/
        export let _execution = {
            get value(): number {
                return Laya.LocalStorage.getItem('_execution') ? Number(Laya.LocalStorage.getItem('_execution')) : 15;
            },
            set value(val) {
                Laya.LocalStorage.setItem('_execution', val.toString());
            }
        };


        /**指代当前剩余体力节点*/
        export let ExecutionNumNode: Laya.Sprite;
        /**
         * 创建通用剩余体力数量prefab
         * @param parent 父节点
         */
        export function _createExecutionNum(parent): void {
            let sp: Laya.Sprite;
            Laya.loader.load('prefab/ExecutionNum.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                parent.addChild(sp);
                let num = sp.getChildByName('Num') as Laya.FontClip;
                // num.value = Global._execution.toString();
                sp.pos(297, 90);
                sp.zOrder = 50;
                ExecutionNumNode = sp;
                ExecutionNumNode.name = 'ExecutionNumNode';
            }));
        }


        /**
         * 创建体力增加的prefab
         * @param x x位置
         * @param y y位置
         * @param func 回调函数
        */
        export function _createAddExecution(x, y, func): void {
            let sp: Laya.Sprite;
            Laya.loader.load('prefab/execution.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                Laya.stage.addChild(sp);
                sp.x = Laya.stage.width / 2;
                sp.y = Laya.stage.height / 2;
                sp.zOrder = 50;
                if (ExecutionNumNode) {
                    Animation2D.move_Simple_01(sp, sp.x, sp.y, ExecutionNumNode.x, ExecutionNumNode.y, 800, null, 100, f => {
                        Animation2D.fadeOut(sp, 1, 0, 200, 0, f => {
                            lwg.Animation2D.upDwon_Shake(ExecutionNumNode, 10, 80, 0, null);
                            if (func) {
                                func();
                            }
                        });
                    });
                }
            }));
        }

        /**
       * 创建体力消耗动画
       * @param  subEx 消耗多少体力值
      */
        export function createConsumeEx(subEx): void {
            let label = Laya.Pool.getItemByClass('label', Laya.Label) as Laya.Label;
            label.name = 'label';//标识符和名称一样
            Laya.stage.addChild(label);
            label.text = '-2';
            label.fontSize = 40;
            label.bold = true;
            label.color = '#59245c';
            label.x = ExecutionNumNode.x + 100;
            label.y = ExecutionNumNode.y - label.height / 2 + 4;
            label.zOrder = 100;
            lwg.Animation2D.fadeOut(label, 0, 1, 200, 150, f => {
                lwg.Animation2D.leftRight_Shake(ExecutionNumNode, 15, 60, 0, null);
                lwg.Animation2D.fadeOut(label, 1, 0, 600, 400, f => {
                });
            });
        }
    }

    /**金币模块*/
    export module Gold {
        /**金币数量*/
        export let _num = {
            get value(): number {
                return Laya.LocalStorage.getItem('_goldNum') ? Number(Laya.LocalStorage.getItem('_goldNum')) : 0;
            },
            set value(val: number) {
                Laya.LocalStorage.setItem('_goldNum', val.toString());
            }
        };
        /**指代当前全局的的金币资源节点*/
        export let GoldNode: Laya.Sprite;
        /**
         * 创建通用剩余金币资源数量prefab
         * @param x x位置
         * @param y y位置
         * @param parent 父节点，不传则是舞台
         */
        export function createGoldNode(x, y, parent?: Laya.Sprite): void {
            if (!parent) {
                parent = Laya.stage;
            }
            if (GoldNode) {
                GoldNode.removeSelf();
            }
            let sp: Laya.Sprite;
            Laya.loader.load('Prefab/PreGold.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                sp = Laya.Pool.getItemByCreateFun('gold', _prefab.create, _prefab);
                let Num = sp.getChildByName('Num') as Laya.Label;
                Num.text = _num.value.toString();
                parent.addChild(sp);
                let Pic = sp.getChildByName('Pic') as Laya.Image;
                sp.pos(x, y);
                sp.zOrder = 100;
                GoldNode = sp;
            }));
        }

        /**增加金币以并且在节点上也表现出来*/
        export function addGold(number: number) {
            _num.value += Number(number);
            let Num = GoldNode.getChildByName('Num') as Laya.Text;
            Num.text = _num.value.toString();
        }
        /**增加金币节点上的表现动画，并不会增加金币*/
        export function addGoldDisPlay(number) {
            let Num = GoldNode.getChildByName('Num') as Laya.FontClip;
            Num.value = (Number(Num.value) + Number(number)).toString();
        }
        /**增加金币，但是不表现出来*/
        export function addGoldNoDisPlay(number) {
            _num.value += Number(number);
        }

        /**
         * GoldNode出现动画
         * @param delayed 延时时间
         * @param x 允许改变一次X轴位置
         * @param y 允许改变一次Y轴位置
        */
        export function goldAppear(delayed?: number, x?: number, y?: number): void {
            if (!GoldNode) {
                return;
            }
            if (delayed) {
                Animation2D.scale_Alpha(GoldNode, 0, 1, 1, 1, 1, 1, delayed, 0, f => {
                    GoldNode.visible = true;
                });
            } else {
                GoldNode.visible = true;
            }

            if (x) {
                GoldNode.x = x;
            }

            if (y) {
                GoldNode.y = y;
            }
        }

        /**
         * GoldNode消失动画
         * @param delayed 延时时间
        */
        export function goldVinish(delayed?: number): void {
            if (!GoldNode) {
                return;
            }
            if (delayed) {
                Animation2D.scale_Alpha(GoldNode, 1, 1, 1, 1, 1, 0, delayed, 0, f => {
                    GoldNode.visible = false;
                });
            } else {
                GoldNode.visible = false;
            }
        }

        /**框架中的地址*/
        enum SkinUrl {
            "Frame/Effects/icon_gold.png"
        }

        /**创建单个金币*/
        export function createOneGold(width: number, height: number, url: string): Laya.Image {
            let Gold = Laya.Pool.getItemByClass('addGold', Laya.Image) as Laya.Image;
            Gold.name = 'addGold';//标识符和名称一样
            let num = Math.floor(Math.random() * 12);
            Gold.alpha = 1;
            Gold.zOrder = 60;
            Gold.width = width;
            Gold.height = height;
            Gold.pivotX = width / 2;
            Gold.pivotY = height / 2;
            if (!url) {
                Gold.skin = SkinUrl[0];
            } else {
                Gold.skin = url;
            }
            return Gold;
        }

        /**
        *  金币表现动画，陆续生成单个金币
        * @param parent 父节点
        * @param number 产生金币的数量
        * @param width 金币的宽度
        * @param height 金币的宽度
        * @param url 金币皮肤地址
        * @param firstPoint 初始位置
        * @param targetPoint 目标位置
        * @param func1 每一个金币移动完成后执行的回调
        * @param func2 金币全部创建完成后的回调
        */
        export function getGoldAni_Single(parent: Laya.Sprite, number: number, width: number, height: number, url: string, firstPoint: Laya.Point, targetPoint: Laya.Point, func1?: Function, func2?: Function): void {

            for (let index = 0; index < number; index++) {
                Laya.timer.once(index * 30, this, () => {

                    let Gold = createOneGold(width, height, url);
                    parent.addChild(Gold);

                    Animation2D.move_Scale(Gold, 1, firstPoint.x, firstPoint.y, targetPoint.x, targetPoint.y, 1, 350, 0, null, () => {
                        if (index === number - 1) {

                            Laya.timer.once(200, this, () => {
                                if (func2) {
                                    func2();
                                }
                            })

                        } else {
                            if (func1) {
                                func1();
                            }
                        }
                        Gold.removeSelf();
                    })
                })
            }
        }

        /**
         * 金币表现动画，生成一堆金币，然后分别移动到目标位置
         * @param parent 父节点
         * @param number 产生金币的数量
         * @param width 金币的宽度
         * @param height 金币的宽度
         * @param url 金币皮肤地址
         * @param firstPoint 初始位置
         * @param targetPoint 目标位置
         * @param func1 每一个金币移动完成后执行的回调
         * @param func2 金币全部创建完成后的回调
         */
        export function getGoldAni_Heap(parent: Laya.Sprite, number: number, width: number, height: number, url: string, firstPoint: Laya.Point, targetPoint: Laya.Point, func1?: Function, func2?: Function): void {
            for (let index = 0; index < number; index++) {
                let Gold = createOneGold(width, height, url);
                parent.addChild(Gold);
                if (!url) {
                    Gold.skin = SkinUrl[0];
                } else {
                    Gold.skin = url;
                }
                let x = Math.floor(Math.random() * 2) == 1 ? firstPoint.x + Math.random() * 100 : firstPoint.x - Math.random() * 100;
                let y = Math.floor(Math.random() * 2) == 1 ? firstPoint.y + Math.random() * 100 : firstPoint.y - Math.random() * 100;
                // Gold.rotation = Math.random() * 360;
                Animation2D.move_Scale(Gold, 0.5, firstPoint.x, firstPoint.y, x, y, 1, 300, Math.random() * 100 + 100, Laya.Ease.expoIn, () => {
                    Animation2D.move_Scale(Gold, 1, Gold.x, Gold.y, targetPoint.x, targetPoint.y, 1, 400, Math.random() * 200 + 100, Laya.Ease.cubicOut, () => {
                        if (index === number - 1) {

                            Laya.timer.once(200, this, () => {
                                if (func2) {
                                    func2();
                                }
                            })

                        } else {
                            if (func1) {
                                func1();
                            }
                        }
                        Gold.removeSelf();
                    })
                });
            }
        }

        /**类粒子特效的通用父类*/
        export class GoldAniBase extends Laya.Script {
            /**挂载当前脚本的节点*/
            self: Laya.Sprite;
            /**所在场景*/
            selfScene: Laya.Scene;
            /**移动开关*/
            moveSwitch: boolean;
            /**时间线*/
            timer: number;
            /**在组中的位置*/
            group: number;
            /**在行中的位置*/
            row: number;
            /**在列中的位置*/
            line: number;
            /**初始角度*/
            startAngle: number;
            /**基础速度*/
            startSpeed: number;
            /**加速度*/
            accelerated: number;

            /**随机大小*/
            startScale: number;
            /**随机起始透明度*/
            startAlpha: number;
            /**初始角度*/
            startRotat: number;

            /**随机旋转方向*/
            rotateDir: string;
            /**随机旋转角度*/
            rotateRan: number;
            /**随机消失时间*/
            continueTime: number;

            onAwake(): void {
                this.initProperty();
            }
            onEnable(): void {
                this.self = this.owner as Laya.Sprite;
                this.selfScene = this.self.scene;
                let calssName = this['__proto__']['constructor'].name;
                this.self[calssName] = this;
                // console.log(this.self.getBounds());
                this.timer = 0;
                this.lwgInit();
                this.propertyAssign();

            }
            /**初始化，在onEnable中执行，重写即可覆盖*/
            lwgInit(): void {
            }
            /**初始化特效单元的属性*/
            initProperty(): void {
            }
            /**一些节点上的初始属性赋值*/
            propertyAssign(): void {
                if (this.startAlpha) {
                    this.self.alpha = this.startAlpha;
                }
                if (this.startScale) {
                    this.self.scale(this.startScale, this.startScale);
                }
                if (this.startRotat) {
                    this.self.rotation = this.startRotat;
                }
            }
            /**
              * 通用按角度移动移动，按单一角度移动
              * @param angle 角度
              * @param basedSpeed 基础速度
              */
            commonSpeedXYByAngle(angle, speed) {
                this.self.x += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).x;
                this.self.y += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).y;
            }
            /**移动规则*/
            moveRules(): void {
            }
            onUpdate(): void {
                this.moveRules();
            }
            onDisable(): void {
                Laya.Pool.recover(this.self.name, this.self);
                this.destroy();//删除自己，下次重新添加
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
            }
        }

        /**炸开后再前往同一个地点，用于金币增加动画*/
        export class AddGold extends GoldAniBase {
            /**属于那一列*/
            line: number;
            /**目标位置X*/
            targetX: number;
            /**目标位置Y*/
            targetY: number;
            /**回调函数*/
            func: any
            lwgInit(): void {
                this.self.width = 115;
                this.self.height = 111;
                this.self.pivotX = this.self.width / 2;
                this.self.pivotY = this.self.height / 2;
            }
            initProperty(): void {
            }
            moveRules(): void {
                if (this.moveSwitch) {
                    this.timer++;
                    if (this.timer > 0) {
                        lwg.Animation2D.move_Scale(this.self, 1, this.self.x, this.self.y, this.targetX, this.targetY, 0.35, 250, 0, f => {
                            this.self.removeSelf();
                            if (this.func !== null) {
                                this.func();
                            }
                        });
                        this.moveSwitch = false;
                    }
                }
            }
        }
    }

    /**事件模块*/
    export module EventAdmin {
        /**常用事件枚举*/
        export enum EventType {
            /**完成任务*/
            taskReach = 'taskReach',
            /**开始游戏*/
            startGame = 'startGame',
            /**失败*/
            defeated = 'defeated',
            /**胜利*/
            victory = 'victory',
            /**刷新3D场景*/
            scene3DRefresh = 'Scene3DRefresh',
            /**刷新主游戏场景，不是3d场景*/
            gameSceneRefresh = 'gameSceneRefresh',
            /**下一关*/
            nextCustoms = 'nextCustoms',
            /**复活*/
            resurgence = 'resurgence',
        }

        /**以节点为单位，在节点内注册事件，节点移除或者关闭后，关闭事件监听；如果需要在节点外注册事件，this为EventAdmin，不要写在节点脚本中，否则每次打开一次就会注册一次*/
        export let dispatcher: Laya.EventDispatcher = new Laya.EventDispatcher();
        /**
         * 事件注册,总控制事件注册在当前类，每个游戏独有的事件不要注册在这里，防止每关重复注册
         * @param type 事件类型或者名称
         * @param caller 事件的执行域
         * @param listener 响应事件的回调函数,以下写法可以传递参数进来:()=>{}
         */
        export function reg(type: any, caller: any, listener: Function) {
            if (!caller) {
                console.error("事件的执行域必须存在!");
            }
            dispatcher.on(type.toString(), caller, listener);

        }
        /**
        * 注册一次事件，相应一次就消失
        * @param type 事件类型或者名称
        * @param caller 事件的执行域
        * @param listener 响应事件的回调函数,以下写法可以传递参数进来:()=>{}
        */
        export function regOnce(type: any, caller: any, listener: Function) {
            if (!caller) {
                console.error("事件的执行域必须存在!");
            }
            dispatcher.once(type.toString(), caller, listener);
        }
        /**
         * 通知事件
         * @param type 事件类型或者名称
         * @param args 注册事件中的回调函数中的参数
         */
        export function notify(type: any, args?: any) {
            dispatcher.event(type.toString(), args);
        }
        /**
         * 关闭某个事件
         * @param type 事件类型或者名称
         * @param caller 事件的执行域
         * @param listener 关闭后的回调函数
         * */
        export function off(type: any, caller: any, listener: Function) {
            this.dispatcher.off(type.toString(), caller, listener);
        }
        /**
         * 关闭所有执行域中的事件
         * @param type 事件类型或者名称
        */
        export function offAll(type: any) {
            dispatcher.offAll(type.toString());
        }

        /**
         * 移除某个caller上的所有事件
         * @param caller 执行域
        */
        export function offCaller(caller: any) {
            dispatcher.offAllCaller(caller);
        }
    }

    /**日期管理*/
    export module DateAdmin {
        export let _date = {
            /**年*/
            get year(): number {
                return (new Date()).getFullYear();
            },
            /**月*/
            get month(): number {
                return (new Date()).getMonth();
            },
            /**日*/
            get date(): number {
                return (new Date()).getDate();
            },
            /**周几*/
            get day(): number {
                return (new Date()).getDay();
            },
            /**小时*/
            get hours(): number {
                return (new Date()).getHours();
            },
            /**分钟*/
            get minutes(): number {
                return (new Date()).getMinutes();
            },
            /**秒*/
            get seconds(): number {
                return (new Date()).getSeconds();
            },
            /**毫秒*/
            get milliseconds(): number {
                return (new Date()).getMilliseconds();
            },
            /**全日期*/
            get toLocaleDateString(): string {
                return (new Date()).toLocaleDateString();
            },
            /**当前时间*/
            get toLocaleTimeString(): string {
                return (new Date()).toLocaleTimeString();
            }
        }

        /**玩家登陆游戏的天数,包括其中的年月日,星期几*/
        export let _loginDate = {
            get value(): Array<any> {
                let data = Laya.LocalStorage.getJSON('Date_loginDate');
                let dataArr: Array<Array<number>> = [];
                let d = new Date();
                let date1 = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getDay()];
                if (data) {
                    dataArr = JSON.parse(data);
                    // 如果两天一抹一样则不会增加
                    let equal = false;
                    for (let index = 0; index < dataArr.length; index++) {
                        if (dataArr[index].toString() == date1.toString()) {
                            equal = true;
                        }
                    }
                    if (!equal) {
                        dataArr.push(date1);
                    }
                }
                if (dataArr.length == 0) {
                    dataArr.push(date1);
                }
                Laya.LocalStorage.setJSON('Date_loginDate', JSON.stringify(dataArr));
                return dataArr;
            },
        }

        /**玩家玩游戏的次数*/
        export let _loginNumber = {
            get value(): number {
                return Laya.LocalStorage.getItem('_loginNumber') ? Number(Laya.LocalStorage.getItem('_loginNumber')) : 1;
            },
            set value(val: number) {
                Laya.LocalStorage.setItem('_loginNumber', val.toString());
            }
        }
    }

    /**
     * 时间管理
     * 计时器的封装
    */
    export module TimerAdmin {
        /**
         * 普通无限循环，基于帧
         * @param delay 间隔帧数
         * @param caller 执行域
         * @param method 方法回调
         * @param immediately 是否立即执行一次，默认为false
         * @param args 
         * @param coverBefore 
         */
        export function frameLoop(delay: number, caller: any, method: Function, immediately?: boolean, args?: any[], coverBefore?: boolean): void {
            if (immediately) {
                method();
            }
            Laya.timer.frameLoop(delay, caller, () => {
                method();
            }, args, coverBefore);
        }

        /**
         * 在两个时间区间内中随机时间点触发的无限循环，基于帧
         * @param delay1 间隔帧数区间1
         * @param delay2 间隔帧数区间2
         * @param caller 执行域
         * @param method 方法回调
         * @param immediately 是否立即执行一次，默认为false
         * @param args 
         * @param coverBefore 
         */
        export function frameRandomLoop(delay1: number, delay2: number, caller: any, method: Function, immediately?: boolean, args?: any[], coverBefore?: boolean): void {
            if (immediately) {
                method();
            }
            Laya.timer.frameLoop(delay1, caller, () => {
                let delay = Tools.randomNumber(delay1, delay2);
                Laya.timer.frameOnce(delay, this, () => {
                    method();
                })
            }, args, coverBefore);
        }


        /**
       * 普通无限循环，基于时间
       * @param delay 时间
       * @param caller 执行域
       * @param method 方法回调
       * @param immediately 是否立即执行一次，默认为false
       * @param args 
       * @param coverBefore 
       */
        export function loop(delay: number, caller: any, method: Function, count?: number, immediately?: boolean, args?: any[], coverBefore?: boolean): void {
            if (immediately) {
                method();
            }
            Laya.timer.loop(delay, caller, () => {
                method();
            }, args, coverBefore);
        }

        /**
         * 在两个时间区间内中随机时间点触发的无限循环，基于时间
         * @param delay1 时间区间1
         * @param delay2 时间区间2
         * @param caller 执行域
         * @param method 方法回调
         * @param immediately 是否立即执行一次，默认为false
         * @param args 
         * @param coverBefore 
         */
        export function randomLoop(delay1: number, delay2: number, caller: any, method: Function, immediately?: boolean, args?: any[], coverBefore?: boolean): void {
            if (immediately) {
                method();
            }
            Laya.timer.loop(delay1, caller, () => {
                let delay = Tools.randomNumber(delay1, delay2);
                Laya.timer.frameOnce(delay, this, () => {
                    method();
                })
            }, args, coverBefore);
        }



    }

    /**游戏整体控制*/
    export module Admin {
        /**渠道类型*/
        export enum _platformTpye {
            WeChat = 'WeChat',
            OPPO = 'OPPO',
            Bytedance = 'Bytedance',
            /**通用*/
            All = 'All',
        }
        /**平台，控制一些节点的变化,默认为字节*/
        export let _platform: string = _platformTpye.Bytedance;

        /**游戏控制开关*/
        export let _gameSwitch: boolean = false;


        /**等级*/
        export let _gameLevel = {
            get value(): number {
                return Laya.LocalStorage.getItem('_gameLevel') ? Number(Laya.LocalStorage.getItem('_gameLevel')) : 1;
            },
            set value(val) {
                Laya.LocalStorage.setItem('_gameLevel', val.toString());
            }
        }

        /**当前实际打开后者停留的关卡数，而非真实的关卡等级*/
        export let _practicalLevel = {
            get value(): number {
                return Laya.LocalStorage.getItem('_practicalLevel') ? Number(Laya.LocalStorage.getItem('_practicalLevel')) : _gameLevel.value;
            },
            set value(val) {
                Laya.LocalStorage.setItem('_practicalLevel', val.toString());
            }
        }

        /**等级的显示节点*/
        export let LevelNode: Laya.Sprite;
        /**
         * 创建一个等级的显示节点
         * @param parent 父节点
         * @param x x位置
         * @param y y位置
         */
        export function _createLevel(parent, x, y): void {
            let sp: Laya.Sprite;
            Laya.loader.load('prefab/LevelNode.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
                let _prefab = new Laya.Prefab();
                _prefab.json = prefab;
                sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                parent.addChild(sp);
                sp.pos(x, y);
                sp.zOrder = 0;
                let level = sp.getChildByName('level') as Laya.Label;
                LevelNode = sp;
            }));
        }

        /**暂停当前游戏*/
        export let _pause = {
            get switch(): boolean {
                return _gameSwitch;
            },
            set switch(bool: boolean) {
                this.bool = bool;
                if (bool) {
                    _gameSwitch = false;
                    Laya.timer.pause();
                } else {
                    _gameSwitch = true;
                    Laya.timer.resume();
                }
            }
        }

        /**整个stage内关闭点击事件*/
        export let _clickLock = {
            get switch(): boolean {
                return Laya.stage.getChildByName('__stageClickLock__') ? true : false;
            },
            set switch(bool: boolean) {
                if (bool) {
                    if (!Laya.stage.getChildByName('__stageClickLock__')) {
                        console.log('锁住点击！');
                        let __stageClickLock__ = new Laya.Sprite();
                        __stageClickLock__.name = '__stageClickLock__';
                        Laya.stage.addChild(__stageClickLock__);
                        __stageClickLock__.zOrder = 1000;
                        __stageClickLock__.width = Laya.stage.width;
                        __stageClickLock__.height = Laya.stage.height;
                        __stageClickLock__.pos(0, 0);
                        Click.on(Click.Type.noEffect, __stageClickLock__, this, null, null, (e: Laya.Event) => {
                            console.log('舞台点击被锁住了！请用admin._clickLock=false解锁');
                            e.stopPropagation();
                        });
                    } else {
                        // console.log('场景锁已存在！');
                    }
                } else {
                    if (Laya.stage.getChildByName('__stageClickLock__')) {
                        Laya.stage.getChildByName('__stageClickLock__').removeSelf();
                        // console.log('场景点击解锁！');
                    }
                }
            }
        }

        /**
        * 设置一个屏蔽场景内点击事件的的节点
        * @param scene 场景
       */
        export function _secneLockClick(scene: Laya.Scene): void {
            _unlockPreventClick(scene);
            let __lockClick__ = new Laya.Sprite();
            scene.addChild(__lockClick__);
            __lockClick__.zOrder = 1000;
            __lockClick__.name = '__lockClick__';
            __lockClick__.width = Laya.stage.width;
            __lockClick__.height = Laya.stage.height;
            __lockClick__.pos(0, 0);
            Click.on(Click.Type.noEffect, __lockClick__, this, null, null, (e: Laya.Event) => {
                console.log('场景点击被锁住了！请用admin._unlockPreventClick（）解锁');
                e.stopPropagation();
            });
        }

        /**解除该场景的不可点击效果*/
        export function _unlockPreventClick(scene: Laya.Scene): void {
            let __lockClick__ = scene.getChildByName('__lockClick__') as Laya.Sprite;
            if (__lockClick__) {
                __lockClick__.removeSelf();
            }
        }

        // /**预制体池，每次创建一个新的预制体后，将会被保存在预制体池当中*/
        // export let _prefabPool;
        // /**
        //  * 创建一个预制体，预制体必须在Prefab文件夹中
        //  * @param name 预制体名称
        // */
        // export function _createPrefab(name): void {
        //     let sp: Laya.Sprite;
        //     Laya.loader.load('Prefab/GoldNode.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
        //         let _prefab = new Laya.Prefab();
        //         _prefab.json = prefab;
        //         sp = Laya.Pool.getItemByCreateFun('gold', _prefab.create, _prefab);
        //         let num = sp.getChildByName('Num') as Laya.Label;
        //     }));
        // }

        /**场景控制,访问特定场景用_sceneControl[name]访问*/
        export let _sceneControl: any = {};

        /**场景动效类型*/
        export enum OpenAniType {
            fadeOut = 'fadeOut',
            leftMove = 'fadeOut',
            rightMove = 'rightMove',
            centerRotate = 'centerRotate',
        }
        /**为了统一，每个游戏只有一种通用动效，在初始化的时候设置，默认为渐隐渐出，如果场景内的openAni函数启用，则这个场景的通用场景动效将会被替代*/
        export let _commonOpenAni: string = OpenAniType.fadeOut;
        /**有时候我们并不需要离场动画*/
        export let _commonVanishAni: boolean = false;

        /**常用场景的名称，和脚本名称保持一致*/
        export enum SceneName {
            UILoding = 'UILoding',
            UIStart = 'UIStart',
            UISkin = 'UISkin',
            UIShop = 'UIShop',
            UITask = 'UITask',
            UISet = 'UISet',
            UIPifu = 'UIPifu',
            UIPuase = 'UIPuase',
            UIShare = 'UIShare',
            GameMain3D = 'GameMain3D',
            UIVictory = 'UIVictory',
            UIDefeated = 'UIDefeated',
            UIPassHint = 'UIPassHint',
            UISkinXD = 'UISkinXD',
            UISkinTry = 'UISkinTry',
            UIRedeem = 'UIRedeem',
            UIAnchorXD = 'UIAnchorXD',
            UITurntable = 'UITurntable',
            UICaiDanQiang = 'UICaiDanQiang',
            UICaidanPifu = 'UICaidanPifu',
            UIOperation = 'UIOperation',
            UIVictoryBox = 'UIVictoryBox',
            UICheckIn = 'UICheckIn',
            UIResurgence = 'UIResurgence',
            UIEasterEgg = 'UIEasterEgg',
            UIAdsHint = 'UIAdsHint',
            LwgInit = 'LwgInit',
            GameScene = 'GameScene',
            UISmallHint = 'UISmallHint',
            UIExecutionHint = 'UIExecutionHint',
            UIDrawCard = 'UIDrawCard',
            UIPropTry = 'UIPropTry',
        }

        /**
          * 打开场景
          * @param name 界面名称
          * @param cloesScene 需要关闭的场景，如果不需要关闭，传入null
          * @param func 回调函数
          * @param zOder 指定层级
         */
        export function _openScene(openName: string, cloesScene?: Laya.Scene, func?: Function, zOder?: number): void {
            Laya.Scene.load('Scene/' + openName + '.json', Laya.Handler.create(this, function (scene: Laya.Scene) {
                scene.width = Laya.stage.width;
                scene.height = Laya.stage.height;
                var openf = () => {
                    if (zOder) {
                        Laya.stage.addChildAt(scene, zOder);
                    } else {
                        Laya.stage.addChild(scene);
                    }
                }
                scene.name = openName;
                _sceneControl[openName] = scene;//装入场景容器，此容器内每个场景唯一
                // 背景图自适应并且居中
                let background = scene.getChildByName('Background') as Laya.Image;
                if (background) {
                    background.width = Laya.stage.width;
                    background.height = Laya.stage.height;
                }
                if (cloesScene) {
                    _closeScene(cloesScene, openf);
                } else {
                    openf();
                }
                if (func) {
                    func();
                }
            }));
        }

        /**
         * 关闭场景，使用此方法会先播放场景消失动画，但是必须是通过_openScene（）方法打开的场景且继承自Admin.Scene，场景消失动画和出场动画是统一的，无需设置
         * @param cloesScene 需要关闭的场景
         * @param func 关闭后的回调函数
         * */
        export function _closeScene(cloesScene?: Laya.Scene, func?: Function): void {
            /**传入的回调函数*/
            var closef = () => {
                _clickLock.switch = false;
                cloesScene.close();
                // 先关闭场景在打开场景，否则有些场景可能因为上个场景而初始化失败
                if (func) {
                    func();
                }
            }
            // 如果关闭了场景消失动画，则不会执行任何动画
            if (!_commonVanishAni) {
                closef();
                return;
            }
            /**消失动画*/
            var vanishAni = () => {
                let time = 0;
                let delay = 0;
                switch (_commonOpenAni) {
                    case OpenAniType.fadeOut:
                        time = 150;
                        delay = 50;
                        if (cloesScene['Background']) {
                            Animation2D.fadeOut(cloesScene, 1, 0, time / 2);
                        }
                        Animation2D.fadeOut(cloesScene, 1, 0, time, delay, () => {
                            closef();
                        })
                        break;
                    case OpenAniType.leftMove:

                        break;

                    default:
                        break;
                }
            }

            //如果内部场景消失动画被重写了，则执行内部场景消失动画，而不执行通用动画
            let cloesSceneScript = cloesScene[cloesScene.name];
            if (cloesSceneScript) {
                if (cloesSceneScript) {
                    _clickLock.switch = true;
                    let time0 = cloesSceneScript.lwgVanishAni();
                    if (time0 !== null) {
                        Laya.timer.once(time0, this, () => {
                            closef();
                            _clickLock.switch = false;
                        })
                    } else {
                        vanishAni();
                    }
                }
            } else {
                console.log('界面关闭失败，可能是脚本名称与场景名称不一样');
            }
        }

        /**游戏当前处于什么状态中，并非是当前打开的场景*/
        export let _gameState: string;
        /**游戏当前的状态*/
        export enum GameState {
            /**开始界面*/
            Start = 'Start',
            /**游戏中*/
            Play = 'Play',
            /**暂停中*/
            Pause = 'pause',
            /**胜利*/
            Victory = 'victory',
            /**失败*/
            Defeated = 'defeated',
        }
        /**游戏当前的状态,有些页面没有状态*/
        export function gameState(calssName): void {
            switch (calssName) {
                case SceneName.UIStart:
                    _gameState = GameState.Start;
                    break;
                case SceneName.GameScene:
                    _gameState = GameState.Play;
                    break;
                case SceneName.UIDefeated:
                    _gameState = GameState.Defeated;
                    break;
                case SceneName.UIVictory:
                    _gameState = GameState.Victory;
                    break;
                default:
                    break;
            }
        }
        /**通用场景进场动画*/
        export function commonOpenAni(scene: Laya.Scene): number {
            let time = 0;
            let delay = 0;
            switch (_commonOpenAni) {
                case OpenAniType.fadeOut:
                    time = 400;
                    delay = 300;
                    if (scene['Background']) {
                        Animation2D.fadeOut(scene, 0, 1, time / 2, delay);
                    }
                    Animation2D.fadeOut(scene, 0, 1, time);
                    break;
                case OpenAniType.leftMove:

                    break;

                default:
                    break;
            }
            return time;
        }

        /**2D场景通用父类*/
        export class Scene extends Laya.Script {
            /**挂载当前脚本的节点*/
            self: Laya.Scene;
            /**类名*/
            calssName: string;
            constructor() {
                super();
            }
            onAwake(): void {
                this.self = this.owner as Laya.Scene;
                // 类名
                this.calssName = this['__proto__']['constructor'].name;
                // 组件变为的self属性
                this.self[this.calssName] = this;
                gameState(this.calssName);
                this.lwgNodeDec();
                this.moduleOnAwake();
                this.lwgOnAwake();
                this.lwgAdaptive();
                // Tomato.scenePrintPoint(this.calssName, Tomato.scenePointType.open);
            }
            /**游戏开始前执行一次，重写覆盖*/
            lwgOnAwake(): void { };
            /**每个模块优先执行的页面开始前执行的函数，比lwgOnAwake更早执行*/
            moduleOnAwake(): void { }
            onEnable() {
                this.moduleEventReg();
                this.lwgEventReg();
                this.moduleOnEnable();
                this.lwgOnEnable();
                this.btnAndlwgOpenAni();
            }
            /**每个模块优先执行的初始化函数，比lwgOnEnable早执行*/
            moduleOnEnable(): void { };
            /**声明场景里的一些节点*/
            lwgNodeDec(): void { };
            /**场景中的一些事件，在lwgOnAwake和lwgOnEnable之间执行*/
            lwgEventReg(): void { };
            /**模块中的事件*/
            moduleEventReg(): void { };

            /**初始化，在onEnable中执行，重写即可覆盖*/
            lwgOnEnable(): void { }

            /**通过openni返回的时间来延时开启点击事件*/
            private btnAndlwgOpenAni(): void {
                let time = this.lwgOpenAni();
                if (!time) {
                    time = commonOpenAni(this.self);
                    time = 0;
                }
                Laya.timer.once(time, this, f => {
                    this.lwgBtnClick();
                });
            }
            /**开场或者离场动画单位时间,默认为100*/
            aniTime: number = 100;
            /**开场或者离场动画单位延迟时间,默认为100*/
            aniDelayde: number = 100;
            /**开场动画,返回的数字为时间倒计时，倒计时结束后开启点击事件*/
            lwgOpenAni(): number { return null };
            /**按钮点击事件注册*/
            lwgBtnClick(): void { };
            /**一些节点的自适应*/
            lwgAdaptive(): void { };
            onUpdate(): void { this.lwgOnUpdate() };
            /**每帧执行*/
            lwgOnUpdate(): void { };
            /**离场动画*/
            lwgVanishAni(): number { return null };
            onDisable(): void {
                Animation2D.fadeOut(this.self, 1, 0, 2000, 1);
                this.lwgOnDisable();
                Laya.timer.clearAll(this);
                Laya.Tween.clearAll(this);
                EventAdmin.offCaller(this);
                // Tomato.scenePrintPoint(this.calssName, Tomato.scenePointType.close);
            }
            /**离开时执行，子类不执行onDisable，只执行lwgDisable*/
            lwgOnDisable(): void { };
        }

        /**2D角色通用父类*/
        export class Person extends Laya.Script {
            /**挂载当前脚本的节点*/
            self: Laya.Sprite;
            /**所在场景*/
            selfScene: Laya.Scene;
            /**物理组件*/
            rig: Laya.RigidBody;
            constructor() {
                super();
            }
            onAwake(): void {
                this.lwgOnAwake();
            }
            lwgOnAwake(): void {
            }
            onEnable(): void {
                this.self = this.owner as Laya.Sprite;
                this.selfScene = this.self.scene;
                this.rig = this.self.getComponent(Laya.RigidBody);
                // 类名
                let calssName = this['__proto__']['constructor'].name;
                // 组件变为的self属性
                this.self[calssName] = this;
                this.lwgOnEnable();
            }
            /**初始化，在onEnable中执行，重写即可覆盖*/
            lwgOnEnable(): void {
                console.log('父类的初始化！');
            }
        }

        /**2D物件通用父类*/
        export class Object extends Laya.Script {
            /**挂载当前脚本的节点*/
            self: Laya.Sprite;
            /**所在场景*/
            selfScene: Laya.Scene;
            /**物理组件*/
            rig: Laya.RigidBody;
            constructor() {
                super();
            }
            onAwake(): void {
                this.self = this.owner as Laya.Sprite;
                this.selfScene = this.self.scene;
                // 类名
                let calssName = this['__proto__']['constructor'].name;
                // 组件变为的self属性
                this.self[calssName] = this;
                // this.rig = this.self.getComponent(Laya.RigidBody);
                this.lwgNodeDec();
                this.lwgOnAwake();
            }
            /**声明一些节点*/
            lwgNodeDec(): void { }
            lwgOnAwake(): void { }
            onEnable(): void {
                this.lwgBtnClick();
                this.lwgEventReg();
                this.lwgOnEnable();
            }
            /**初始化，在onEnable中执行，重写即可覆盖*/
            lwgOnEnable(): void { }
            /**点击事件注册*/
            lwgBtnClick(): void { }
            /**事件注册*/
            lwgEventReg(): void { }
            onUpdate(): void {
                this.lwgOnUpdate();
            }
            lwgOnUpdate(): void { }
            onDisable(): void {
                this.lwgOnDisable();
                Laya.timer.clearAll(this);
                EventAdmin.offCaller(this);
            }
            /**离开时执行，子类不执行onDisable，只执行lwgDisable*/
            lwgOnDisable(): void { }
        }
    }

    export module Effects {
        /**特效元素的图片地址，所有项目都可用*/
        export enum SkinUrl {
            'Frame/Effects/cir_white.png',
            "Frame/Effects/cir_black.png",
            "Frame/Effects/cir_blue.png",
            "Frame/Effects/cir_bluish.png",
            "Frame/Effects/cir_cyan.png",
            "Frame/Effects/cir_grass.png",
            "Frame/Effects/cir_green.png",
            "Frame/Effects/cir_orange.png",
            "Frame/Effects/cir_pink.png",
            "Frame/Effects/cir_purple.png",
            "Frame/Effects/cir_red.png",
            "Frame/Effects/cir_yellow.png",

            "Frame/Effects/star_black.png",
            "Frame/Effects/star_blue.png",
            "Frame/Effects/star_bluish.png",
            "Frame/Effects/star_cyan.png",
            "Frame/Effects/star_grass.png",
            "Frame/Effects/star_green.png",
            "Frame/Effects/star_orange.png",
            "Frame/Effects/star_pink.png",
            "Frame/Effects/star_purple.png",
            "Frame/Effects/star_red.png",
            "Frame/Effects/star_white.png",
            "Frame/Effects/star_yellow.png",
        }

        /**表示需要什么样的图片样式*/
        export enum SkinStyle {
            star = 'star',
            dot = 'dot',
        }

        /**类粒子特效的通用父类*/
        export class EffectsBase extends Laya.Script {
            /**挂载当前脚本的节点*/
            self: Laya.Sprite;
            /**所在场景*/
            selfScene: Laya.Scene;
            /**移动开关*/
            moveSwitch: boolean;
            /**时间线*/
            timer: number;
            /**在组中的位置*/
            group: number;
            /**在行中的位置*/
            row: number;
            /**在列中的位置*/
            line: number;
            /**初始角度*/
            startAngle: number;
            /**基础速度*/
            startSpeed: number;
            /**加速度*/
            accelerated: number;

            /**随机大小*/
            startScale: number;
            /**随机起始透明度*/
            startAlpha: number;
            /**初始角度*/
            startRotat: number;

            /**随机旋转方向*/
            rotateDir: string;
            /**随机旋转角度*/
            rotateRan: number;
            /**随机消失时间*/
            continueTime: number;

            onAwake(): void {
                this.initProperty();
            }
            onEnable(): void {
                this.self = this.owner as Laya.Sprite;
                this.selfScene = this.self.scene;
                let calssName = this['__proto__']['constructor'].name;
                this.self[calssName] = this;
                // console.log(this.self.getBounds());
                this.timer = 0;
                this.lwgInit();
                this.propertyAssign();

            }
            /**初始化，在onEnable中执行，重写即可覆盖*/
            lwgInit(): void {
            }
            /**初始化特效单元的属性*/
            initProperty(): void {
            }
            /**一些节点上的初始属性赋值*/
            propertyAssign(): void {
                if (this.startAlpha) {
                    this.self.alpha = this.startAlpha;
                }
                if (this.startScale) {
                    this.self.scale(this.startScale, this.startScale);
                }
                if (this.startRotat) {
                    this.self.rotation = this.startRotat;
                }
            }
            /**
              * 通用按角度移动移动，按单一角度移动
              * @param angle 角度
              * @param basedSpeed 基础速度
              */
            commonSpeedXYByAngle(angle, speed) {
                this.self.x += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).x;
                this.self.y += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).y;
            }
            /**移动规则*/
            moveRules(): void {
            }
            onUpdate(): void {
                this.moveRules();
            }
            onDisable(): void {
                Laya.Pool.recover(this.self.name, this.self);
                this.destroy();//删除自己，下次重新添加
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
            }
        }

        /**
         * 在一个点内的随机范围内，创建一个星星，闪烁后消失
         * @param parent 父节点
         * @param centerPos 中心点
         * @param radiusX X轴半径，默认问100
         * @param radiusY Y轴半径，默认为100
         * @param skinUrl 图片地址，默认为星星图片
         * @param width 图片宽度，默认为50;
         * @param height 图片宽度，默认为50;
         * @param rotationSpeed 角度变化速率,默认为正负5度
         */
        export function star_Blink(parent, centerPos: Laya.Point, radiusX?: number, radiusY?: number, skinUrl?: string, width?: number, height?: number, rotationSpeed?: number): void {
            if (!rotationSpeed) {
                rotationSpeed = Tools.randomOneHalf() == 0 ? -5 : 5;
            }
            let star = Laya.Pool.getItemByClass('star_Blink', Laya.Image) as Laya.Image;
            star.name = 'star_Blink';//标识符和名称一样
            let num;
            if (skinUrl == SkinStyle.star || !skinUrl) {
                num = 12 + Math.floor(Math.random() * 12);
                star.skin = SkinUrl[num];
            } else if (skinUrl == SkinStyle.dot) {
                num = Math.floor(Math.random() * 12);
                star.skin = SkinUrl[num];
            } else {
                star.skin = skinUrl;
            }
            star.alpha = 0;
            star.width = width;
            star.height = height;
            star.scaleX = 0;
            star.scaleY = 0;
            star.pivotX = star.width / 2;
            star.pivotY = star.height / 2;
            parent.addChild(star);
            let p = Tools.point_RandomPointByCenter(centerPos, radiusX, radiusY, 1);
            star.pos(p[0].x, p[0].y);

            // 最大放大大小
            let maxScale = Tools.randomCountNumer(0.8, 1.2)[0];

            let timer = 0;
            let caller = {};
            var ani = () => {
                timer++;
                if (timer > 0 && timer <= 15) {
                    star.alpha += 0.1;
                    star.rotation += rotationSpeed;
                    star.scaleX += 0.015;
                    star.scaleY += 0.015;
                } else if (timer > 15) {
                    if (!star['reduce']) {
                        if (star.scaleX > maxScale) {
                            star['reduce'] = true;
                        } else {
                            star.rotation += rotationSpeed;
                            star.scaleX += 0.02;
                            star.scaleY += 0.02;
                        }
                    } else {
                        star.rotation -= rotationSpeed;
                        star.alpha -= 0.015;
                        star.scaleX -= 0.01;
                        star.scaleY -= 0.01;
                        if (star.scaleX <= 0) {
                            star.removeSelf();
                            Laya.timer.clearAll(caller);
                        }
                    }
                }

            }
            Laya.timer.frameLoop(1, caller, ani);
        }

        /**
         * 创建普通爆炸动画，四周爆炸随机散开
         * @param parent 父节点
         * @param quantity 数量
         * @param speed 速度
         * @param x X轴位置
         * @param y Y轴位置
         * @param style 图片样式
         * @param speed 移动速度
         * @param continueTime 持续时间（按帧数计算）
         */
        export function createCommonExplosion(parent, quantity, x, y, style, speed, continueTime): void {
            for (let index = 0; index < quantity; index++) {
                let ele = Laya.Pool.getItemByClass('ele', Laya.Image) as Laya.Image;
                ele.name = 'ele';//标识符和名称一样
                let num
                if (style === SkinStyle.star) {
                    num = 12 + Math.floor(Math.random() * 12);
                } else if (style === SkinStyle.dot) {
                    num = Math.floor(Math.random() * 12);
                }
                ele.skin = SkinUrl[num];
                ele.alpha = 1;
                parent.addChild(ele);
                ele.pos(x, y);
                let scirpt = ele.addComponent(commonExplosion);
                scirpt.startSpeed = Math.random() * speed;
                scirpt.continueTime = 2 * Math.random() + continueTime;
            }
        }

        /**普通爆炸移动类*/
        export class commonExplosion extends lwg.Effects.EffectsBase {
            lwgInit(): void {
                this.self.width = 25;
                this.self.height = 25;
                this.self.pivotX = this.self.width / 2;
                this.self.pivotY = this.self.height / 2;
            }
            initProperty(): void {
                this.startAngle = 360 * Math.random();
                this.startSpeed = 5 * Math.random() + 8;
                this.startScale = 0.4 + Math.random() * 0.6;
                this.accelerated = 2;
                this.continueTime = 8 + Math.random() * 10;
                this.rotateDir = Math.floor(Math.random() * 2) === 1 ? 'left' : 'right';
                this.rotateRan = Math.random() * 10;
            }
            moveRules(): void {
                this.timer++;
                if (this.rotateDir === 'left') {
                    this.self.rotation += this.rotateRan;
                } else {
                    this.self.rotation -= this.rotateRan;
                }
                if (this.timer >= this.continueTime / 2) {
                    this.self.alpha -= 0.04;
                    if (this.self.alpha <= 0.65) {
                        this.self.removeSelf();
                    }
                }
                this.commonSpeedXYByAngle(this.startAngle, this.startSpeed + this.accelerated);
                this.accelerated += 0.2;
            }
        }

        /**
          * 创建爆炸旋转动画，爆炸后会在结尾处旋转几次
          * @param parent 父节点
          * @param quantity 数量
          * @param x X位置
          * @param Y Y位置
          * @param speed 速度
          * @param rotate 旋转最大值
          */
        export function createExplosion_Rotate(parent, quantity, x, y, style, speed, rotate): void {
            for (let index = 0; index < quantity; index++) {
                let ele = Laya.Pool.getItemByClass('ele', Laya.Image) as Laya.Image;
                ele.name = 'ele';//标识符和名称一样
                let num;
                if (style === SkinStyle.star) {
                    num = 12 + Math.floor(Math.random() * 12);
                } else if (style === SkinStyle.dot) {
                    num = Math.floor(Math.random() * 12);
                }
                ele.skin = SkinUrl[num];
                ele.alpha = 1;
                parent.addChild(ele);
                ele.pos(x, y);
                let scirpt = ele.addComponent(Explosion_Rotate);
                scirpt.startSpeed = 2 + Math.random() * speed;
                scirpt.rotateRan = Math.random() * rotate;
            }
        }

        /**
         * 创建爆炸旋转动画控制脚本
         * */
        export class Explosion_Rotate extends lwg.Effects.EffectsBase {
            lwgInit(): void {
                this.self.width = 41;
                this.self.height = 41;
                this.self.pivotX = this.self.width / 2;
                this.self.pivotY = this.self.height / 2;
            }
            initProperty(): void {
                this.startAngle = 360 * Math.random();
                this.startSpeed = 5 * Math.random() + 8;
                this.startScale = 0.4 + Math.random() * 0.6;
                this.accelerated = 0;
                this.continueTime = 5 + Math.random() * 20;
                this.rotateDir = Math.floor(Math.random() * 2) === 1 ? 'left' : 'right';
                this.rotateRan = Math.random() * 15;
            }
            moveRules(): void {

                if (this.rotateDir === 'left') {
                    this.self.rotation += this.rotateRan;
                } else {
                    this.self.rotation -= this.rotateRan;
                }
                if (this.startSpeed - this.accelerated <= 0.1) {
                    this.self.alpha -= 0.03;
                    if (this.self.alpha <= 0) {
                        this.self.removeSelf();
                    }
                } else {
                    this.accelerated += 0.2;
                }
                this.commonSpeedXYByAngle(this.startAngle, this.startSpeed - this.accelerated);
            }
        }


        /**
          * 创建类似于烟花爆炸动画，四周爆炸随机散开
          * @param parent 父节点
          * @param quantity 数量
          * @param x X轴位置
          * @param y Y轴位置
          */
        export function createFireworks(parent, quantity, x, y): void {
            for (let index = 0; index < quantity; index++) {
                let ele = Laya.Pool.getItemByClass('fireworks', Laya.Image) as Laya.Image;
                ele.name = 'fireworks';//标识符和名称一样
                let num = 12 + Math.floor(Math.random() * 11);
                ele.alpha = 1;
                ele.skin = SkinUrl[num];
                parent.addChild(ele);
                ele.pos(x, y);
                let scirpt = ele.getComponent(Fireworks);
                if (!scirpt) {
                    ele.addComponent(Fireworks);
                }
            }
        }

        /**类似烟花爆炸，速度逐渐减慢，并且有下降趋势*/
        export class Fireworks extends lwg.Effects.EffectsBase {
            lwgInit(): void {
                this.self.width = 41;
                this.self.height = 41;
                this.self.pivotX = this.self.width / 2;
                this.self.pivotY = this.self.height / 2;
            }

            initProperty(): void {
                this.startAngle = 360 * Math.random();
                this.startSpeed = 5 * Math.random() + 5;
                this.startScale = 0.4 + Math.random() * 0.6;
                this.accelerated = 0.1;
                this.continueTime = 200 + Math.random() * 10;
            }
            moveRules(): void {
                this.timer++;
                if (this.timer >= this.continueTime * 3 / 5) {
                    this.self.alpha -= 0.1;
                }
                if (this.timer >= this.continueTime) {
                    this.self.removeSelf();
                } else {
                    this.commonSpeedXYByAngle(this.startAngle, this.startSpeed);
                }
                if (this.self.scaleX < 0) {
                    this.self.scaleX += 0.01;
                } else if (this.self.scaleX >= this.startScale) {
                    this.self.scaleX -= 0.01;
                }
            }
        }

        /**
         * 创建左右喷彩带动画
         * @param parent 父节点
         * @param direction 方向
         * @param quantity 数量
         * @param x X轴位置
         * @param y Y轴位置
        */
        export function createLeftOrRightJet(parent, direction, quantity, x, y): void {
            for (let index = 0; index < quantity; index++) {
                let ele = Laya.Pool.getItemByClass('Jet', Laya.Image) as Laya.Image;
                ele.name = 'Jet';//标识符和名称一样
                let num = 12 + Math.floor(Math.random() * 11);
                ele.skin = SkinUrl[num];
                ele.alpha = 1;
                parent.addChild(ele);
                ele.pos(x, y);
                let scirpt = ele.getComponent(leftOrRightJet);
                if (!scirpt) {
                    ele.addComponent(leftOrRightJet);
                    let scirpt1 = ele.getComponent(leftOrRightJet);
                    scirpt1.direction = direction;
                    scirpt1.initProperty();
                } else {
                    scirpt.direction = direction;
                    scirpt.initProperty();
                }
            }
        }
        /**创建左右喷彩带动画类*/
        export class leftOrRightJet extends lwg.Effects.EffectsBase {
            direction: string;
            randomRotate: number;

            lwgInit(): void {
                this.self.width = 41;
                this.self.height = 41;
                this.self.pivotX = this.self.width / 2;
                this.self.pivotY = this.self.height / 2;
            }
            initProperty(): void {
                if (this.direction === 'left') {
                    this.startAngle = 100 * Math.random() - 90 + 45 - 10 - 20;
                } else if (this.direction === 'right') {
                    this.startAngle = 100 * Math.random() + 90 + 45 + 20;
                }
                this.startSpeed = 10 * Math.random() + 3;
                this.startScale = 0.4 + Math.random() * 0.6;
                this.accelerated = 0.1;
                this.continueTime = 300 + Math.random() * 50;
                this.randomRotate = 1 + Math.random() * 20;
            }
            moveRules(): void {
                this.timer++;
                if (this.timer >= this.continueTime * 3 / 5) {
                    this.self.alpha -= 0.1;
                }
                if (this.timer >= this.continueTime) {
                    this.self.removeSelf();
                } else {
                    this.commonSpeedXYByAngle(this.startAngle, this.startSpeed);
                    // this.self.y += this.accelerated * 10;
                }

                this.self.rotation += this.randomRotate;

                if (this.self.scaleX < 0) {
                    this.self.scaleX += 0.01;
                } else if (this.self.scaleX >= this.startScale) {
                    this.self.scaleX -= 0.01;
                }
            }
        }
    }


    /**加载一些骨骼动画，在loding界面出现的时候执行skLoding()方法*/
    export module Sk {
        export function skLoding(): void {
        }
        export function onCompelet(tem: Laya.Templet): void {
            console.log(tem['_skBufferUrl'], '加载成功');
        }
        export function onError(url): void {
            console.log(url, '加载失败！');
        }
    }
    /**
    * 1.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
    * 2.点击事件模块
    */
    export module Click {

        /**
         * 动态创建一个按钮
         */
        export function createButton(): void {
            let Btn = new Laya.Sprite();
            let img = new Laya.Image();
            let label = new Laya.Label();

        }

        /**点击事件类型*/
        export enum Type {
            /**无效果*/
            noEffect = 'noEffect',
            /**点击放大*/
            largen = 'largen',
            /**类似气球*/
            balloon = 'balloon',
            /**小虫子*/
            beetle = 'beetle',
        }

        /**按钮音效*/
        export let audioUrl: string;
        /**
         * 当前气球被缩放的比例
         * */
        export let balloonScale;
        /**
        * 当前小甲虫被缩放的比例
        * */
        export let beetleScale;
        /**b
         * 点击事件注册,可以用(e)=>{}简写传递的函数参数
         * @param effect 效果类型 1.'largen'
         * @param target 节点
         * @param caller 指向脚本（this）引用
         * @param down 按下函数
         * @param move 移动函数
         * @param up 抬起函数
         * @param out 出屏幕函数
         * 以上4个只是函数名，不可传递函数，如果没有特殊执行，那么就用此模块定义的4个函数，包括通用效果。
         */
        export function on(effect, target, caller, down?: Function, move?: Function, up?: Function, out?: Function): void {
            let btnEffect;
            switch (effect) {
                case Type.noEffect:
                    btnEffect = new Btn_NoEffect();
                    break;
                case Type.largen:
                    btnEffect = new Btn_LargenEffect();
                    break;
                case Type.balloon:
                    btnEffect = new Btn_Balloon();
                    break;
                case Type.balloon:
                    btnEffect = new Btn_Beetle();
                    break;
                default:
                    btnEffect = new Btn_LargenEffect();
                    break;
            }
            target.on(Laya.Event.MOUSE_DOWN, caller, down);
            target.on(Laya.Event.MOUSE_MOVE, caller, move);
            target.on(Laya.Event.MOUSE_UP, caller, up);
            target.on(Laya.Event.MOUSE_OUT, caller, out);

            target.on(Laya.Event.MOUSE_DOWN, caller, btnEffect.down);
            target.on(Laya.Event.MOUSE_MOVE, caller, btnEffect.move);
            target.on(Laya.Event.MOUSE_UP, caller, btnEffect.up);
            target.on(Laya.Event.MOUSE_OUT, caller, btnEffect.out);
        }

        /**
         * 点击事件的关闭
        * @param effect 效果类型 1.'largen'
         * @param target 节点
         * @param caller 指向脚本（this）引用
         * @param down 按下函数
         * @param move 移动函数
         * @param up 抬起函数
         * @param out 出屏幕函数
         * 以上4个只是函数名，不可传递函数，如果没有特殊执行，那么就用此模块定义的4个函数，包括通用效果。
         */
        export function off(effect, target, caller, down?: Function, move?: Function, up?: Function, out?: Function): void {
            let btnEffect;
            switch (effect) {
                case Type.noEffect:
                    btnEffect = new Btn_NoEffect();
                    break;
                case Type.largen:
                    btnEffect = new Btn_LargenEffect();
                    break;
                case Type.balloon:
                    btnEffect = new Btn_Balloon();
                    break;
                case Type.balloon:
                    btnEffect = new Btn_Beetle();
                    break;
                default:
                    btnEffect = new Btn_LargenEffect();
                    break;
            }

            target.off(Laya.Event.MOUSE_DOWN, caller, down);
            target.off(Laya.Event.MOUSE_MOVE, caller, move);
            target.off(Laya.Event.MOUSE_UP, caller, up);
            target.off(Laya.Event.MOUSE_OUT, caller, out);

            target.off(Laya.Event.MOUSE_DOWN, caller, btnEffect.down);
            target.off(Laya.Event.MOUSE_MOVE, caller, btnEffect.move);
            target.off(Laya.Event.MOUSE_UP, caller, btnEffect.up);
            target.off(Laya.Event.MOUSE_OUT, caller, btnEffect.out);
        }
    }

    /**
     * 没有效果的点击事件，有时候用于防止界面的事件穿透
     */
    export class Btn_NoEffect {
        constructor() {
        }
        /**按下*/
        down(event): void {
            // console.log('无点击效果的点击');
        }
        /**移动*/
        move(event): void {
        }
        /**抬起*/
        up(event): void {
        }
        /**出屏幕*/
        out(event): void {
        }
    }

    /**
     * 点击放大的按钮点击效果,每个类是一种效果，和点击的声音一一对应
     */
    export class Btn_LargenEffect {
        constructor() {
        }
        /**按下*/
        down(event): void {
            event.currentTarget.scale(1.1, 1.1);
            PalyAudio.playSound(Click.audioUrl);
        }
        /**移动*/
        move(event): void {
        }

        /**抬起*/
        up(event): void {
            event.currentTarget.scale(1, 1);
            // btnPrintPoint('on', event.currentTarget.name);
        }

        /**出屏幕*/
        out(event): void {
            event.currentTarget.scale(1, 1);
        }
    }

    /**
     * 气球的点击效果
     */
    export class Btn_Balloon {
        constructor() {
        }
        /**按下*/
        down(event): void {
            event.currentTarget.scale(Click.balloonScale + 0.06, Click.balloonScale + 0.06);
            PalyAudio.playSound(Click.audioUrl);
        }
        /**抬起*/
        up(event): void {
            event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
        }
        /**移动*/
        move(event): void {
            event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
        }
        /**出屏幕*/
        out(event): void {
            event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
        }
    }

    /**
     * 气球的点击效果
     */
    export class Btn_Beetle {
        constructor() {
        }
        /**按下*/
        down(event): void {
            event.currentTarget.scale(Click.beetleScale + 0.06, Click.beetleScale + 0.06);
            PalyAudio.playSound(Click.audioUrl);
        }
        /**抬起*/
        up(event): void {
            event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
        }
        /**移动*/
        move(event): void {
            event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
        }
        /**出屏幕*/
        out(event): void {
            event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
        }
    }

    /**3D缓动动画*/
    export module Animation3D {
        /**缓动集合，用于清除当前this上的所有缓动*/
        export let tweenMap: any = {};
        /**帧率*/
        export let frameRate: number = 1;
        /**
          * 移动物体
          * @param target 目标物体
          * @param toPos 要去的目的地
          * @param duration 间隔
          * @param caller 回调执行领域
          * @param ease 缓动函数
          * @param complete 播放完成回调 
          * @param delay 延迟
          * @param coverBefore 是否覆盖上一个缓动
          * @param update 更新函数
          * @param frame 帧数间隔
          */
        export function moveTo(target: Laya.Sprite3D, toPos: Laya.Vector3, duration: number, caller: any
            , ease?: Function, complete?: Function, delay: number = 0, coverBefore: boolean = true, update?: Function, frame?: number) {
            let position: Laya.Vector3 = target.transform.position.clone();
            // target["position"] = target.transform.position;
            if (duration == 0 || duration === undefined || duration === null) {
                target.transform.position = toPos.clone();
                complete && complete.apply(caller);
                return;
            }
            if (frame <= 0 || frame === undefined || frame === null) {
                frame = frameRate;
            }
            let updateRenderPos = function () {
                if (target.transform) {
                    target.transform.position = position;
                }
                update && update();
            };
            Laya.timer.once(delay, target, function () {
                Laya.timer.frameLoop(frame, target, updateRenderPos);
            });

            let endTween = function () {
                if (target.transform) {
                    target.transform.position = toPos.clone();
                    Laya.timer.clear(target, updateRenderPos);
                }
                complete && complete.apply(caller);
            }

            let tween = Laya.Tween.to(position, { x: toPos.x, y: toPos.y, z: toPos.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
            if (!tweenMap[target.id]) {
                tweenMap[target.id] = [];
            }
            tweenMap[target.id].push(tween);
        }

        /**
          * 旋转物体
          * @param target 目标物体
          * @param toPos 要去的目的地
          * @param duration 间隔
          * @param caller 回调执行领域
          * @param ease 缓动函数
          * @param complete 播放完成回调 
          * @param delay 延迟
          * @param coverBefore 是否覆盖上一个缓动
          * @param update 更新函数
          * @param frame 帧数间隔
          */
        export function rotateTo(target: Laya.Sprite3D, toRotation: Laya.Vector3, duration: number, caller: any
            , ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, update?: Function, frame?: number) {
            let rotation: Laya.Vector3 = target.transform.localRotationEuler.clone();
            if (duration == 0 || duration === undefined || duration === null) {
                target.transform.localRotationEuler = toRotation.clone();
                complete && complete.apply(caller);
                return;
            }
            if (frame <= 0 || frame === undefined || frame === null) {
                frame = frameRate;
            }
            let updateRenderRotation = function () {
                if (target.transform) {
                    target.transform.localRotationEuler = rotation;
                }
                update && update();
            };
            Laya.timer.once(delay, target, function () {
                Laya.timer.frameLoop(frame, target, updateRenderRotation);
            });

            let endTween = function () {
                if (target.transform) {
                    target.transform.localRotationEuler = toRotation.clone();
                    Laya.timer.clear(target, updateRenderRotation);
                }
                complete && complete.apply(caller);
            }

            let tween = Laya.Tween.to(rotation, { x: toRotation.x, y: toRotation.y, z: toRotation.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
            if (!tweenMap[target.id]) {
                tweenMap[target.id] = [];
            }
            tweenMap[target.id].push(tween)
        }

        /**
        * 缩放物体
        * @param target 目标物体
        * @param toPos 要去的目的地
        * @param duration 间隔
        * @param caller 回调执行领域
        * @param ease 缓动函数
        * @param complete 播放完成回调 
        * @param delay 延迟
        * @param coverBefore 是否覆盖上一个缓动
        * @param update 更新函数
        * @param frame 帧数间隔
        */
        export function scaleTo(target: Laya.Sprite3D, toScale: Laya.Vector3, duration: number, caller: any
            , ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, update?: Function, frame?: number) {
            let localScale = target.transform.localScale.clone();
            if (duration == 0 || duration === undefined || duration === null) {
                target.transform.localScale = toScale.clone();
                complete && complete.apply(caller);
                return;
            }
            if (frame <= 0 || frame === undefined || frame === null) {
                frame = frameRate;
            }
            let updateRenderPos = function () {
                target.transform.localScale = localScale.clone();
                update && update();
            };
            Laya.timer.once(delay, this, function () {
                Laya.timer.frameLoop(frame, target, updateRenderPos);
            });
            let endTween = function () {
                target.transform.localScale = toScale.clone();
                Laya.timer.clear(target, updateRenderPos);
                complete && complete.apply(caller);
            }
            let tween = Laya.Tween.to(localScale, { x: toScale.x, y: toScale.y, z: toScale.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
            if (!tweenMap[target.id]) {
                tweenMap[target.id] = [];
            }
            tweenMap[target.id].push(tween);
        }
        /**
         * 清除3d物体上的所有缓动动画
         * @param target 
         */
        export function ClearTween(target: Laya.Sprite3D) {
            let tweens = tweenMap[target.id] as Array<Laya.Tween>;
            if (tweens && tweens.length) {
                while (tweens.length > 0) {
                    let tween = tweens.pop();
                    tween.clear();
                }
            }
            Laya.timer.clearAll(target);
        }

        /**
         * 摇头动画，左右各摇摆一次，然后回到原来位置
         * @param target 目标
         * @param range 幅度
         * @param duration 时间
         * @param caller 回调执行域
         * @param func 回调函数
         * @param delayed 延时 
         * @param ease 缓动效果
         */
        export function rock(target: Laya.MeshSprite3D, range: Laya.Vector3, duration: number, caller: any, func?: Function, delayed?: number, ease?: Function): void {
            if (!delayed) {
                delayed = 0;
            }
            let v1: Laya.Vector3 = new Laya.Vector3(target.transform.localRotationEulerX + range.x, target.transform.localRotationEulerY + range.y, target.transform.localRotationEulerZ + range.z);

            rotateTo(target, v1, duration / 2, caller, ease, () => {

                let v2: Laya.Vector3 = new Laya.Vector3(target.transform.localRotationEulerX - range.x * 2, target.transform.localRotationEulerY - range.y * 2, target.transform.localRotationEulerZ - range.z * 2);

                rotateTo(target, v2, duration, caller, ease, () => {

                    let v3: Laya.Vector3 = new Laya.Vector3(target.transform.localRotationEulerX + range.x, target.transform.localRotationEulerY + range.y, target.transform.localRotationEulerZ + range.z);

                    rotateTo(target, v3, duration / 2, caller, ease, () => {
                        if (func) {
                            func();
                        }
                    });
                });
            }, delayed);
        }

        /**
           * 旋转并移动物体到另一个物体的角度和位置
           * @param Sp3d 要移动的物体
           * @param Target 目标物体
           * @param duration 间隔
           * @param caller 回调执行领域
           * @param ease 缓动函数
           * @param complete 播放完成回调 
           * @param delay 延迟
           * @param clickLock 场景按钮此时是否可以继续点击
           * @param coverBefore 是否覆盖上一个缓动
           * @param update 更新函数
           * @param frame 帧数间隔
           */
        export function moveRotateTo(Sp3d: Laya.MeshSprite3D, Target: Laya.MeshSprite3D, duration: number, caller: any
            , ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, update?: Function, frame?: number): void {
            moveTo(Sp3d, Target.transform.position, duration, caller, ease, complete, delay, coverBefore, update, frame)
            rotateTo(Sp3d, Target.transform.localRotationEuler, duration, caller, ease, null, delay, coverBefore, null, frame);
        }
    }

    /**动画模块*/
    export module Animation2D {
        /**
          * 按中心点旋转动画
          * @param node 节点
          * @param Frotate 初始角度
          * @param Erotate 最终角度
          * @param time 花费时间
          * @param delayed 延时时间
          * @param func 回调函数
        */
        export function simple_Rotate(node, Frotate, Erotate, time, delayed?: number, func?: Function): void {
            node.rotation = Frotate;
            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(node, { rotation: Erotate }, time, null, Laya.Handler.create(this, function () {
                if (func) {
                    func();
                }
            }), delayed);
        }

        /**
         * 上下翻转动画
         * @param node 节点
         * @param time 花费时间
         */
        export function upDown_Overturn(node, time, func?: Function): void {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null || func !== undefined) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), 0);
        }

        /**
         * 上下旋转动画
         * @param node 节点
         * @param time 花费时间
         * @param func 回调函数
         */
        export function leftRight_Overturn(node, time, func): void {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        }), 0);
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), 0);
            }), 0);
        }

        /**
         * 左右抖动
         * @param node 节点
         * @param range 幅度
         * @param time 花费时间
         * @param delayed 延时
         * @param func 回调函数
         * @param click 是否设置场景此时可点击,默认可以点击，为true
         */
        export function leftRight_Shake(node, range, time, delayed?: number, func?: Function, click?: boolean): void {
            if (!delayed) {
                delayed = 0;
            }
            if (!click) {
                Admin._clickLock.switch = true;
            }
            Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                // PalyAudio.playSound(Enum.AudioName.commonShake, 1);
                Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                    // PalyAudio.playSound(Enum.AudioName.commonShake, 1);
                    Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                        if (func) {
                            func();
                        }
                        if (!click) {
                            Admin._clickLock.switch = false;
                        }
                    }))
                }))
            }), delayed);
        }

        /**
         * 上下抖动
         * @param node 节点
         * @param range 幅度
         * @param time 花费时间
         * @param delayed 延迟时间
         * @param func 回调函数
         */
        export function upDwon_Shake(node, range, time, delayed, func): void {
            Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }))
                }))
            }), delayed)
        }

        /**
         * 渐隐渐出
         * @param node 节点
         * @param alpha1 最初的透明度
         * @param alpha2 渐隐到的透明度
         * @param time 花费时间
         * @param delayed 延时
         * @param func 回调函数
         * @param  场景可否点击
         */
        export function fadeOut(node, alpha1, alpha2, time, delayed?: number, func?: Function, stageClick?: boolean): void {
            node.alpha = alpha1;
            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
                if (func) {
                    func();
                }
            }), delayed)
        }

        /**
         * 渐出
         * @param node 节点
         * @param alpha1 最初的透明度
         * @param alpha2 渐隐到的透明度
         * @param time 花费时间
         * @param delayed 延时
         * @param func 回调函数
         */
        export function fadeOut_KickBack(node, alpha1, alpha2, time, delayed, func): void {
            node.alpha = alpha1;
            Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed)
        }

        /**
        * 渐出+移动，起始位置都是0，最终位置都是1
        * @param node 节点
        * @param firstX 初始x位置
        * @param firstY 初始y位置
        * @param targetX x轴移动位置
        * @param targetY y轴移动位置
        * @param time 花费时间
        * @param delayed 延时
        * @param func 回调函数
        */
        export function move_FadeOut(node, firstX, firstY, targetX, targetY, time, delayed, func): void {
            node.alpha = 0;
            node.x = firstX;
            node.y = firstY;
            Laya.Tween.to(node, { alpha: 1, x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed)
        }

        /**
         * 渐隐+移动，起始位置都是1，最终位置都是0
         * @param node 节点
         * @param firstX 初始x位置
         * @param firstY 初始y位置
         * @param targetX x轴目标位置
         * @param targetY y轴目标位置
         * @param time 花费时间
         * @param delayed 延时
         * @param func 回调函数
        */
        export function move_Fade_Out(node, firstX, firstY, targetX, targetY, time, delayed, func): void {
            node.alpha = 1;
            node.x = firstX;
            node.y = firstY;
            Laya.Tween.to(node, { alpha: 0, x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed)
        }

        /**
        * 渐出+移动+缩放，起始位置都是0，最终位置都是1
        * @param node 节点
        * @param firstX 初始x位置
        * @param firstY 初始y位置
        * @param targetX x轴移动位置
        * @param targetY y轴移动位置
        * @param time 花费时间
        * @param delayed 延时
        * @param func 回调函数
        */
        export function move_FadeOut_Scale_01(node, firstX, firstY, targetX, targetY, time, delayed, func): void {
            node.alpha = 0;
            node.targetX = 0;
            node.targetY = 0;
            node.x = firstX;
            node.y = firstY;
            Laya.Tween.to(node, { alpha: 1, x: targetX, y: targetY, scaleX: 1, scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed)
        }

        /**
         * 移动+缩放,等比缩放
         * @param node 节点
         * @param fScale 初始大小
         * @param fX 初始x位置
         * @param fY 初始y位置
         * @param tX x轴目标位置
         * @param tY y轴目标位置
         * @param eScale 最终大小
         * @param time 花费时间
         * @param delayed 延时
         * @param ease 效果函数
         * @param func 回调函数
         */
        export function move_Scale(node, fScale, fX, fY, tX, tY, eScale, time, delayed?: number, ease?: Function, func?: Function): void {
            node.scaleX = fScale;
            node.scaleY = fScale;
            node.x = fX;
            node.y = fY;
            Laya.Tween.to(node, { x: tX, y: tY, scaleX: eScale, scaleY: eScale }, time, ease ? null : ease, Laya.Handler.create(this, function () {
                if (func) {
                    func();
                }
            }), delayed ? delayed : 0);
        }

        /**
         *旋转+放大缩小 
         * @param target 目标节点
         * @param fRotate 初始角度
         * @param fScaleX 初始X缩放
         * @param fScaleY 初始Y缩放
         * @param eRotate 最终角度
         * @param eScaleX 最终X缩放
         * @param eScaleY 最终Y缩放
         * @param time 花费时间
         * @param delayed 延迟时间
         * @param func 回调函数
         */
        export function rotate_Scale(target: Laya.Sprite, fRotate, fScaleX, fScaleY, eRotate, eScaleX, eScaleY, time, delayed?: number, func?: Function): void {
            target.scaleX = fScaleX;
            target.scaleY = fScaleY;
            target.rotation = fRotate;
            Laya.Tween.to(target, { rotation: eRotate, scaleX: eScaleX, scaleY: eScaleY }, time, null, Laya.Handler.create(this, () => {
                if (func) {
                    func();
                }
                target.rotation = 0;
            }), delayed ? delayed : 0)
        }

        /**
         * 简单下落
         * @param node 节点
         * @param fY 初始Y位置
         * @param tY 目标Y位置
         * @param rotation 落地角度
         * @param time 花费时间
         * @param delayed 延时时间
         * @param func 回调函数
         */
        export function drop_Simple(node, fY, tY, rotation, time, delayed, func): void {
            node.y = fY;
            Laya.Tween.to(node, { y: tY, rotation: rotation }, time, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }

        /**
          * 下落回弹动画 ，类似于连丝蜘蛛下落，下落=》低于目标位置=》回到目标位置
          * @param target 目标
          * @param fAlpha 初始透明度
          * @param firstY 初始位置
          * @param targetY 目标位置
          * @param extendY 延伸长度
          * @param time1 花费时间
          * @param delayed 延时时间
          * @param func 结束回调函数
          * */
        export function drop_KickBack(target, fAlpha, firstY, targetY, extendY, time1, delayed?: number, func?: Function): void {

            target.alpha = fAlpha;
            target.y = firstY;

            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(target, { alpha: 1, y: targetY + extendY }, time1, null, Laya.Handler.create(this, function () {

                Laya.Tween.to(target, { y: targetY - extendY / 2 }, time1 / 2, null, Laya.Handler.create(this, function () {

                    Laya.Tween.to(target, { y: targetY }, time1 / 4, null, Laya.Handler.create(this, function () {
                        if (func) {
                            func();
                        }
                    }), 0);
                }), 0);
            }), delayed);
        }

        /**
         * 偏移下落,模仿抛物线
         * @param node 节点
         * @param targetY y目标位置
         * @param targetX x偏移量
         * @param rotation 落地角度
         * @param time 花费时间
         * @param delayed 延时时间
         * @param func 回调函数
         */
        export function drop_Excursion(node, targetY, targetX, rotation, time, delayed, func): void {
            // 第一阶段
            Laya.Tween.to(node, { x: node.x + targetX, y: node.y + targetY * 1 / 6 }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                Laya.Tween.to(node, { x: node.x + targetX + 50, y: targetY, rotation: rotation }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }), delayed);
        }

        /**
         * 上升
         * @param node 节点
         * @param initialY 初始y位置
         * @param initialR 初始角度
         * @param targetY 目标y位置
         * @param time 花费时间
         * @param delayed 延时时间
         * @param func 回调函数
         */
        export function goUp_Simple(node, initialY, initialR, targetY, time, delayed, func): void {
            node.y = initialY;
            node.rotation = initialR;
            Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func !== null) {
                    func();
                }
            }), delayed);
        }

        /**
         * 用于卡牌X轴方向的横向旋转
         * 两个面不一样的卡牌旋转动画，卡牌正面有内容，卡牌背面没有内容，这个内容是一个子节点
         * @param node 节点
         * @param time 每次旋转1/2次花费时间
         * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
         * @param delayed 延时时间
         * @param func2 结束时回调函数
         */
        export function cardRotateX_TowFace(node: Laya.Sprite, time: number, func1?: Function, delayed?: number, func2?: Function): void {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                // 所有子节点消失
                Tools.node_ChildrenVisible(node, false);
                if (func1) {
                    func1();
                }
                Laya.Tween.to(node, { scaleX: 1 }, time * 0.9, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0 }, time * 0.8, null, Laya.Handler.create(this, function () {

                        Tools.node_ChildrenVisible(node, true);

                        Laya.Tween.to(node, { scaleX: 1 }, time * 0.7, null, Laya.Handler.create(this, function () {
                            if (func2) {
                                func2();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }

        /**
        * 用于卡牌X轴方向的横向旋转
        * 两个面一样的卡牌旋转动画，正反面内容是一样的
        * @param node 节点
        * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
        * @param time 每次旋转1/2次花费时间
        * @param delayed 延时时间
        * @param func2 结束时回调函数
        */
        export function cardRotateX_OneFace(node: Laya.Sprite, func1: Function, time: number, delayed: number, func2: Function): void {
            Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func1 !== null) {
                    func1();
                }
                Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func2 !== null) {
                        func2();
                    }
                }), 0);
            }), delayed);
        }

        /**
        * 用于卡牌Y轴方向的纵向旋转
        * 两个面不一样的卡牌旋转动画，卡牌正面有内容，卡牌背面没有内容，这个内容是一个子节点
        * @param node 节点
        * @param time 每次旋转1/2次花费时间
        * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
        * @param delayed 延时时间
        * @param func2 结束时回调函数
        */
        export function cardRotateY_TowFace(node: Laya.Sprite, time: number, func1?: Function, delayed?: number, func2?: Function): void {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                // 所有子节点消失
                Tools.node_ChildrenVisible(node, false);
                if (func1) {
                    func1();
                }
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                            Tools.node_ChildrenVisible(node, true);
                            if (func2) {
                                func2();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }

        /**
        * 用于卡牌Y轴方向的纵向旋转
        * 两个面一样的卡牌旋转动画，正反面内容是一样的
        * @param node 节点
        * @param func1 中间回调，是否需要变化卡牌内容,也就是子节点内容
        * @param time 每次旋转1/2次花费时间
        * @param delayed 延时时间
        * @param func2 结束时回调函数
        */
        export function cardRotateY_OneFace(node: Laya.Sprite, func1: Function, time: number, delayed?: number, func2?: Function): void {
            Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                if (func1) {
                    func1();
                }
                Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func2) {
                        func2();
                    }
                }), 0);
            }), delayed ? delayed : 0);
        }

        /**
         * 移动中变化一次角度属性，分为两个阶段，第一个阶段是移动并且变化角度，第二个阶段是到达目标位置，并且角度回归为0
         * @param node 节点
         * @param targetX 目标x位置
         * @param targetY 目标y位置
         * @param per 中间位置的百分比
         * @param rotation_per 第一阶段变化到多少角度
         * @param time 花费时间
         * @param func
         */
        export function move_changeRotate(node, targetX, targetY, per, rotation_pe, time, func): void {

            let targetPerX = targetX * per + node.x * (1 - per);
            let targetPerY = targetY * per + node.y * (1 - per);

            Laya.Tween.to(node, { x: targetPerX, y: targetPerY, rotation: 45 }, time, null, Laya.Handler.create(this, function () {

                Laya.Tween.to(node, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func()
                    }
                }), 0);
            }), 0);
        }

        /**
         * 类似气球弹出并且回弹，第一个阶段弹到空中，这个阶段可以给个角度，第二阶段落下变为原始状态，第三阶段再次放大一次，这次放大小一点，第四阶段回到原始状态，三、四个阶段是回弹一次，根据第一个阶段参数进行调整
         * @param node 节点
         * @param firstAlpha 初始透明度
         * @param  firstScale 最终大小，因为有些节点可能初始Scale并不是1
         * @param scale1 第一阶段放大比例
         * @param rotation 第一阶段角度 
         * @param time1 第一阶段花费时间
         * @param time2 第二阶段花费时间
         * @param delayed 延时时间
         * @param audioType 音效类型
         * @param func 完成后的回调
         */
        export function bombs_Appear(node, firstAlpha, endScale, scale1, rotation1, time1, time2, delayed?: number, func?: Function, audioType?: String): void {
            node.scale(0, 0);
            node.alpha = firstAlpha;
            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, rotation: rotation1 }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                switch (audioType) {
                    case 'balloon':
                        // PalyAudio.playSound(Enum.AudioName.commonPopup, 1);
                        break;
                    case 'common':
                        // PalyAudio.playSound(Enum.AudioName.commonPopup, 1);
                        break;
                    default:
                        break;
                }
                Laya.Tween.to(node, { scaleX: endScale, scaleY: endScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: endScale + (scale1 - endScale) * 0.2, scaleY: endScale + (scale1 - endScale) * 0.2, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {

                        Laya.Tween.to(node, { scaleX: endScale, scaleY: endScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                            if (func) {
                                func()
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }

        /**
         * 类似气球弹出并且回弹，所有子节点按顺序弹出来
         * @param node 节点
         * @param firstAlpha 初始透明度
         * @param endScale 初始大小
         * @param rotation1 第一阶段角度
         * @param scale1 第一阶段放大比例
         * @param time1 第一阶段花费时间
         * @param time2 第二阶段花费时间
         * @param interval 每个子节点的时间间隔
         * @param func 完成回调
         * @param audioType 音效类型
         */
        export function bombs_AppearAllChild(node: Laya.Sprite, firstAlpha, endScale, scale1, rotation1, time1, time2, interval?: number, func?: Function, audioType?: String): void {
            let de1 = 0;
            if (!interval) {
                interval = 100;
            }
            for (let index = 0; index < node.numChildren; index++) {
                let Child = node.getChildAt(index) as Laya.Sprite;
                Child.alpha = 0;
                Laya.timer.once(de1, this, () => {
                    Child.alpha = 1;
                    if (index !== node.numChildren - 1) {
                        func == null;
                    }
                    bombs_Appear(Child, firstAlpha, endScale, scale1, rotation1, time1, time2, null, func, audioType);
                })
                de1 += interval;
            }
        }


        /**
         *  类似气球消失，所有子节点按顺序消失
          * @param node 节点
         * @param scale 收缩后的大小
         * @param alpha 收缩后的透明度
         * @param rotation 收缩后的角度 
         * @param time 每个子节点花费时间
         * @param interval 每个子节点时间间隔
         * @param func 完成后的回调
         */
        export function bombs_VanishAllChild(node, endScale, alpha, rotation, time, interval, func?: Function) {
            let de1 = 0;
            if (!interval) {
                interval = 100;
            }
            for (let index = 0; index < node.numChildren; index++) {
                let Child = node.getChildAt(index);
                Laya.timer.once(de1, this, () => {
                    if (index !== node.numChildren - 1) {
                        func == null;
                    }
                    bombs_Vanish(node, endScale, alpha, rotation, time, 0, func);
                })
                de1 += interval;
            }
        }

        /**
         * 类似气球收缩消失
         * @param node 节点
         * @param scale 收缩后的大小
         * @param alpha 收缩后的透明度
         * @param rotation 收缩后的角度 
         * @param time 花费时间
         * @param delayed 延时时间
         * @param func 完成后的回调
         */
        export function bombs_Vanish(node, scale, alpha, rotation, time, delayed?: number, func?: Function): void {
            Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alpha: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                if (func) {
                    func()
                }
            }), delayed ? delayed : 0);
        }

        /**
         * 类似于心脏跳动的回弹效果
         * @param node 节点
         * @param firstScale 初始大小,也就是原始大小
         * @param scale1 需要放大的大小,
         * @param time 花费时间
         * @param delayed 延时时间
         * @param func 完成后的回调
         */
        export function swell_shrink(node, firstScale, scale1, time, delayed?: number, func?: Function): void {
            // PalyAudio.playSound(Enum.AudioName.commonPopup, 1);
            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {

                Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {

                    Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.5, scaleY: firstScale + (scale1 - firstScale) * 0.5, rotation: 0 }, time * 0.5, null, Laya.Handler.create(this, function () {

                        Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                            if (func) {
                                func()
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed);
        }

        /**
         * 简单移动,初始位置可以为null
         * @param node 节点
         * @param fX 初始x位置
         * @param fY 初始y位置
         * @param targetX 目标x位置
         * @param targetY 目标y位置
         * @param time 花费时间
         * @param delayed 延时时间
         * @param ease 动画类型
         * @param func 完成后的回调
         */
        export function move_Simple(node, fX, fY, targetX, targetY, time, delayed?: number, func?: Function, ease?: Function, ): void {
            node.x = fX;
            node.y = fY;
            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(node, { x: targetX, y: targetY }, time, ease ? ease : null, Laya.Handler.create(this, function () {
                if (func) {
                    func()
                }
            }), delayed);
        }

        /**
         * expoIn简单移动,初始位置可以为null
         * @param node 节点
         * @param firstX 初始x位置
         * @param firstY 初始y位置
         * @param targetX 目标x位置
         * @param targetY 目标y位置
         * @param time 花费时间
         * @param ease 动画类型
         * @param delayed 延时时间
         * @param func 完成后的回调
         */
        export function move_Simple_01(node, firstX, firstY, targetX, targetY, time, ease?: Function, delayed?: number, func?: Function): void {
            if (!delayed) {
                delayed = 0;
            }
            if (!ease) {
                ease = null;
            }
            node.x = firstX;
            node.y = firstY;
            Laya.Tween.to(node, { x: targetX, y: targetY }, time, ease, Laya.Handler.create(this, function () {
                if (func) {
                    func()
                }
            }), delayed);
        }

        /**
        * X轴方向的移动伴随形变回弹效果，移动的过程中X轴会被挤压，然后回到原始状态
        * @param node 节点
        * @param firstX 初始x位置
        * @param firstR 初始角度
        * @param scaleX x轴方向的挤压增量
        * @param scaleY y轴方向的挤压增量
        * @param targetX 目标X位置
        * @param time 花费时间
        * @param delayed 延时时间
        * @param func 完成后的回调
        */
        export function move_Deform_X(node, firstX, firstR, targetX, scaleX, scaleY, time, delayed, func): void {
            node.alpha = 0;
            node.x = firstX;
            node.rotation = firstR;
            Laya.Tween.to(node, { x: targetX, scaleX: 1 + scaleX, scaleY: 1 + scaleY, rotation: firstR / 3, alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                // 原始状态
                Laya.Tween.to(node, { scaleX: 1, scaleY: 1, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func()
                    }
                }), 0);
            }), delayed);
        }


        /**
        * Y轴方向的移动伴随形变回弹效果，移动的过程中X轴会被挤压，然后回到原始状态
        * @param target 节点
        * @param firstY 初始Y位置
        * @param firstR 初始角度
        * @param scaleY y轴方向的挤压
        * @param scaleX x轴方向的挤压
        * @param targeY 目标Y位置
        * @param time 花费时间
        * @param delayed 延时时间
        * @param func 完成后的回调
        */
        export function move_Deform_Y(target, firstY, firstR, targeY, scaleX, scaleY, time, delayed, func): void {
            target.alpha = 0;
            if (firstY) {
                target.y = firstY;
            }
            target.rotation = firstR;
            Laya.Tween.to(target, { y: targeY, scaleX: 1 + scaleX, scaleY: 1 + scaleY, rotation: firstR / 3, alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                // 原始状态
                Laya.Tween.to(target, { scaleX: 1, scaleY: 1, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func()
                    }
                }), 0);
            }), delayed);
        }

        /**
        * 简单的透明度渐变闪烁动画,闪一下消失
        * @param target 节点
        * @param minAlpha 最低到多少透明度
        * @param maXalpha 最高透明度
        * @param time 花费时间
        * @param delayed 延迟时间
        * @param func 完成后的回调
        */
        export function blink_FadeOut_v(target, minAlpha, maXalpha, time, delayed, func): void {
            target.alpha = minAlpha;
            Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                // 原始状态
                Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func()
                    }
                }), 0);
            }), delayed);
        }

        /**
          * 简单的透明度渐变闪烁动画，闪烁后不消失
          * @param target 节点
          * @param minAlpha 最低到多少透明度
          * @param maXalpha 最高透明度
          * @param time 花费时间
          * @param delayed 延迟时间
          * @param func 完成后的回调
          */
        export function blink_FadeOut(target, minAlpha, maXalpha, time, delayed?: number, func?: Function): void {
            target.alpha = minAlpha;
            if (!delayed) {
                delayed = 0;
            }
            Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                // 原始状态
                Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                    if (func) {
                        func()
                    }
                }), 0);
            }), delayed);
        }

        /**
          * 根据节点的锚点进行摇头动画，类似于不倒翁动画
          * @param target 节点
          * @param rotate 摇摆的幅度
          * @param time 花费时间
          * @param delayed 延迟时间
          * @param func 完成后的回调
          */
        export function shookHead_Simple(target, rotate, time, delayed?: number, func?: Function): void {
            let firstR = target.rotation;
            Laya.Tween.to(target, { rotation: firstR + rotate }, time, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(target, { rotation: firstR - rotate * 2 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { rotation: firstR + rotate }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { rotation: firstR }, time, null, Laya.Handler.create(this, function () {
                            if (func ) {
                                func()
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }), delayed ? delayed : 0);
        }

        /**
         * 提示框动画1,从渐隐出现+上移=》停留=》到渐隐消失+向下
         * @param target 节点
         * @param upNum 向上上升高度
         * @param time1 向上上升的时间
         * @param stopTime 停留时间
         * @param downNum 向下消失距离
         * @param time2 向下消失时间
         * @param func 结束回调
         */
        export function HintAni_01(target, upNum, time1, stopTime, downNum, time2, func): void {
            target.alpha = 0;
            Laya.Tween.to(target, { alpha: 1, y: target.y - upNum }, time1, null, Laya.Handler.create(this, function () {
                Laya.Tween.to(target, { y: target.y - 15 }, stopTime, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: 0, y: target.y + upNum + downNum }, time2, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func()
                        }

                    }), 0);
                }), 0);
            }), 0);
        }


        /**
        * 放大缩小加上渐变
        * @param target 节点
        * @param fAlpha 初始透明度
        * @param fScaleX 初始X大小
        * @param fScaleY 初始Y大小
        * @param endScaleX 最终X大小
        * @param endScaleY 最终Y大小
        * @param eAlpha 最终透明度
        * @param time 花费时间
        * @param delayed 延迟时间
        * @param func 结束回调
        * @param ease 效果
        */
        export function scale_Alpha(target, fAlpha, fScaleX, fScaleY, eScaleX, eScaleY, eAlpha, time, delayed?: number, func?: Function, ease?: Function): void {
            if (!delayed) {
                delayed = 0;
            }
            if (!delayed) {
                ease = null;
            }
            target.alpha = fAlpha;
            target.scaleX = fScaleX;
            target.scaleY = fScaleY;
            Laya.Tween.to(target, { scaleX: eScaleX, scaleY: eScaleY, alpha: eAlpha }, time, ease, Laya.Handler.create(this, function () {
                if (func) {
                    func()
                }
            }), delayed);
        }

        /**
         * 旋转放大回弹动画，旋转放大角度增加=》原始大小和角度=，旋转放大角度增加=》原始大小和角度，有一个回来效果
         * @param target 目标
         * @param eAngle 延伸角度，就是回收前的多出的角度
         * @param eScale 延伸大小，就是回收前的放大的大小
         * @param time1 第一阶段花费时间
         * @param time2 第二阶段花费时间
         * @param delayed1 第一阶段延时时间
         * @param delayed2 第一阶段延时时间
         * @param func 结束回调函数
         * */
        export function rotate_Magnify_KickBack(node, eAngle, eScale, time1, time2, delayed1, delayed2, func): void {
            node.alpha = 0;
            node.scaleX = 0;
            node.scaleY = 0;
            Laya.Tween.to(node, { alpha: 1, rotation: 360 + eAngle, scaleX: 1 + eScale, scaleY: 1 + eScale }, time1, null, Laya.Handler.create(this, function () {

                Laya.Tween.to(node, { rotation: 360 - eAngle / 2, scaleX: 1 + eScale / 2, scaleY: 1 + eScale / 2 }, time2, null, Laya.Handler.create(this, function () {

                    Laya.Tween.to(node, { rotation: 360 + eAngle / 3, scaleX: 1 + eScale / 5, scaleY: 1 + eScale / 5 }, time2, null, Laya.Handler.create(this, function () {

                        Laya.Tween.to(node, { rotation: 360, scaleX: 1, scaleY: 1 }, time2, null, Laya.Handler.create(this, function () {
                            node.rotation = 0;
                            if (func !== null) {
                                func()
                            }
                        }), 0);
                    }), delayed2);
                }), 0);
            }), delayed1);
        }
    }

    /**设置模块*/
    export module Setting {
        /**音效设置*/
        export let _sound = {
            get switch(): boolean {
                return Laya.LocalStorage.getItem('Setting_sound') == '0' ? false : true;
            },
            /**次数写数字*/
            set switch(value: boolean) {
                let val;
                if (value) {
                    val = 1;
                } else {
                    val = 0;
                }
                Laya.LocalStorage.setItem('Setting_sound', val.toString());
            }
        };

        /**背景音乐开关*/
        export let _bgMusic = {
            get switch(): boolean {
                return Laya.LocalStorage.getItem('Setting_bgMusic') == '0' ? false : true;
            },
            /**开关*/
            set switch(value: boolean) {
                let val;
                if (value) {
                    val = 1;
                    Laya.LocalStorage.setItem('Setting_bgMusic', val.toString());
                    PalyAudio.playMusic();
                } else {
                    val = 0;
                    Laya.LocalStorage.setItem('Setting_bgMusic', val.toString());
                    PalyAudio.stopMusic();
                }
            }
        };

        /**震动开关*/
        export let _shake = {
            get switch(): boolean {
                return Laya.LocalStorage.getItem('Setting_shake') == '0' ? false : true;
            },
            /**次数写数字*/
            set switch(value: boolean) {
                let val;
                if (value) {
                    val = 1;
                } else {
                    val = 0;
                }
                Laya.LocalStorage.setItem('Setting_shake', val.toString());
            }
        };

        /**设置按钮节点*/
        export let BtnSetNode: Laya.Sprite;
        /**
         * 创建一个设置按钮
         * @param x X轴坐标
         * @param y Y轴坐标
         * @param width 宽度，不传则默认是100
         * @param height 高度，不传则默认是100
         * @param url 图片地址没有则是默认图片
         * @param parent 父节点，不传则就在舞台上
        */
        export function createSetBtn(x: number, y: number, width?: number, height?: number, url?: string, parent?: Laya.Sprite): void {
            let _url = 'Frame/UI/icon_set.png';
            let btn = new Laya.Image;
            if (width) {
                btn.width = width;
            } else {
                btn.width = 100;
            }
            if (height) {
                btn.height = height;
            } else {
                btn.height = 100;
            }
            if (url) {
                btn.skin = url;
            } else {
                btn.skin = _url;
            }
            if (parent) {
                parent.addChild(btn);
            } else {
                Laya.stage.addChild(btn);
            }

            btn.pivotX = btn.width / 2;
            btn.pivotY = btn.height / 2;

            btn.x = x;
            btn.y = y;

            btn.zOrder = 100;
            var btnSetUp = function (e: Laya.Event): void {
                e.stopPropagation();
                Admin._openScene(Admin.SceneName.UISet);
            }
            Click.on(Click.Type.largen, btn, null, null, null, btnSetUp, null);

            BtnSetNode = btn;
            BtnSetNode.name = 'BtnSetNode';

        }

        /**
         * 设置按钮的出现
         * @param delayed 延时时间
         * @param x 改变一次X轴位置
         * @param y 改变一次Y轴位置
        */
        export function setBtnAppear(delayed?: number, x?: number, y?: number): void {
            if (delayed) {
                Animation2D.scale_Alpha(BtnSetNode, 0, 1, 1, 1, 1, 1, delayed, 0, f => {
                    BtnSetNode.visible = true;
                });
            } else {
                BtnSetNode.visible = true;
            }
            if (x) {
                BtnSetNode.x = x;
            }
            if (y) {
                BtnSetNode.y = y;
            }
        }

        /**
         * 设置按钮的消失
         * @param delayed 延时时间
        */
        export function setBtnVinish(delayed?: number): void {
            if (delayed) {
                Animation2D.scale_Alpha(BtnSetNode, 1, 1, 1, 1, 1, 0, delayed, 0, f => {
                    BtnSetNode.visible = false;
                });
            } else {
                BtnSetNode.visible = false;
            }
        }
    }

    /**
     * number.这里导出的是模块不是类，没有this，所以此模块的回调函数要写成func=>{}这种箭头函数，箭头函数会把{}里面的this指向原来的this。
     * 2.音乐播放模块
     */
    export module PalyAudio {

        /**音效地址*/
        export enum voiceUrl {
            btn = 'Frame/Voice/btn.wav',
            bgm = 'Frame/Voice/bgm.mp3',
            victory = 'Frame/Voice/guoguan.wav',
            defeated = 'Frame/Voice/wancheng.wav',
        }

        /**通用音效播放
         * @param url 音效地址，不传则是默认音效
         * @param number 播放次数，默认1次
         * @param func 播放完毕回调
         */
        export function playSound(url?: string, number?: number, func?: Function) {
            if (!url) {
                url = voiceUrl.btn;
            }
            if (!number) {
                number = 1;
            }
            if (Setting._sound.switch) {
                Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }));
            }
        }

        /**通用失败音效播放
         * @param url 音效地址，不传则是默认音效
         * @param number 播放次数，默认1次
         * @param func 播放完毕回调
         */
        export function playDefeatedSound(url?: string, number?: number, func?: Function) {
            if (!url) {
                url = voiceUrl.defeated;
            }
            if (!number) {
                number = 1;
            }
            if (Setting._sound.switch) {
                Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }));
            }
        }

        /**通用胜利音效播放
          * @param url 音效地址，不传则是默认音效
          * @param number 播放次数，默认1次
          * @param func 播放完毕回调
          */
        export function playVictorySound(url?: string, number?: number, func?: Function) {
            if (!url) {
                url = voiceUrl.victory;
            }
            if (!number) {
                number = 1;
            }
            if (Setting._sound.switch) {
                Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }));
            }
        }

        /**通用背景音乐播放
        * @param url 音效地址，不传则是默认音效
        * @param number 循环次数，0表示无限循环
        * @param delayed 延时时间，默认0
        */
        export function playMusic(url?: string, number?: number, delayed?: number) {
            if (!url) {
                url = voiceUrl.bgm;
            }
            if (!number) {
                number = 0;
            }
            if (!delayed) {
                delayed = 0;
            }
            if (Setting._bgMusic.switch) {
                Laya.SoundManager.playMusic(url, number, Laya.Handler.create(this, function () { }), delayed);
            }
        }

        /**停止播放背景音乐*/
        export function stopMusic() {
            Laya.SoundManager.stopMusic();
        }
    }

    /**工具模块*/
    export module Tools {
        /**
       * 将数字格式化，例如1000 = 1k；
       * @param number 数字
       */
        export function format_FormatNumber(number: number): string {
            if (typeof (number) !== "number") {
                console.warn("要转化的数字并不为number");
                return number;
            }
            let backNum: string;
            if (number < 1000) {
                backNum = "" + number;
            } else if (number < 1000000) {
                backNum = "" + (number / 1000).toFixed(1) + "k";
            } else if (number < 10e8) {
                backNum = "" + (number / 1000000).toFixed(1) + "m";
            } else {
                backNum = "" + number;
            }
            return backNum;
        }

        /**
         * 字符串和数字相加返回字符串
         * */
        export function format_StrAddNum(str: string, num: number): string {
            return (Number(str) + num).toString();
        }
        /**
         * 数字和字符串相加返回数字
         * */
        export function format_NumAddStr(num: number, str: string): number {
            return Number(str) + num;
        }

        /**
         * 移除该节点的所有子节点，没有子节点则无操作
         * @param node 节点
         */
        export function node_RemoveAllChildren(node: Laya.Node): void {
            if (node.numChildren > 0) {
                node.removeChildren(0, node.numChildren - 1);
            }
        }

        /**
         * 切换隐藏或显示子节点，当输入的名称数组是隐藏时，其他子节点则是显示
         * @param node 节点
         * @param childNameArr 子节点名称数组
         * @param bool 隐藏还是显示，true为显示，flase为隐藏
         */
        export function node_ShowExcludedChild(node: Laya.Sprite, childNameArr: Array<string>, bool: boolean): void {
            for (let i = 0; i < node.numChildren; i++) {
                let Child = node.getChildAt(i) as Laya.Sprite;
                for (let j = 0; j < childNameArr.length; j++) {
                    if (Child.name == childNameArr[j]) {
                        if (bool) {
                            Child.visible = true;
                        } else {
                            Child.visible = false;
                        }
                    } else {
                        if (bool) {
                            Child.visible = false;
                        } else {
                            Child.visible = true;
                        }
                    }
                }
            }
        }

        /**
         * 隐藏或者打开所有子节点
         * @param node 节点
         * @param bool visible控制
        */
        export function node_ChildrenVisible(node: Laya.Sprite, bool: boolean): void {
            for (let index = 0; index < node.numChildren; index++) {
                const element = node.getChildAt(index) as Laya.Sprite;
                if (bool) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            }
        }

        /**3D递归向下查找子节点*/
        export function node_3dFindChild(parent: any, name: string): Laya.MeshSprite3D {
            var item: Laya.MeshSprite3D = null;
            //寻找自身一级目录下的子物体有没有该名字的子物体
            item = parent.getChildByName(name) as Laya.MeshSprite3D;
            //如果有，返回他
            if (item != null) return item;
            var go: Laya.MeshSprite3D = null;
            //如果没有，就吧该父物体所有一级子物体下所有的二级子物体找一遍(以此类推)
            for (var i = 0; i < parent.numChildren; i++) {
                go = node_3dFindChild(parent.getChildAt(i) as Laya.MeshSprite3D, name);
                if (go != null)
                    return go;
            }
            return null;
        }

        /**2D递归向下查找子节点*/
        export function node_2dFindChild(parent: any, name: string): Laya.Sprite {
            var item: Laya.Sprite = null;
            //寻找自身一级目录下的子物体有没有该名字的子物体
            item = parent.getChildByName(name) as Laya.Sprite;
            //如果有，返回他
            if (item != null) return item;
            var go: Laya.Sprite = null;
            //如果没有，就吧该父物体所有一级子物体下所有的二级子物体找一遍(以此类推)
            for (var i = 0; i < parent.numChildren; i++) {
                go = node_2dFindChild(parent.getChildAt(i) as Laya.Sprite, name);
                if (go != null)
                    return go;
            }
            return null;
        }

        /**
         * 返回0或者1，用随机二分之一概率,返回后0是false，true是1，所以Boolen和number都可以判断
         * */
        export function randomOneHalf(): number {
            let number;
            number = Math.floor(Math.random() * 2);
            return number;
        }

        /**
         * 在某个区间内取一个整数
         * @param section1 区间1
         * @param section2 区间2，不输入则是0~section1
         */
        export function randomNumber(section1, section2?: number): number {
            if (section2) {
                return Math.floor(Math.random() * (section2 - section1)) + section1;
            } else {
                return Math.floor(Math.random() * section1);
            }
        }

        /**
         * 返回一个数值区间内的数个随机数
         * @param section1 区间1
         * @param section2 区间2,不输入则是0~section1
         * @param count 数量默认是1
         * @param intSet 是否是整数,默认是整数，为true
         */
        export function randomCountNumer(section1: number, section2?: number, count?: number, intSet?: boolean): Array<number> {
            let arr = [];
            if (!count) {
                count = 1;
            }
            if (!intSet) {
                intSet = true;
            }
            if (section2) {
                while (count > arr.length) {
                    let num;
                    if (intSet) {
                        num = Math.floor(Math.random() * (section2 - section1)) + section1;
                    } else {
                        num = Math.random() * (section2 - section1) + section1;
                    }
                    arr.push(num);
                    Tools.arrayUnique_01(arr);
                };
                return arr;
            } else {
                while (count > arr.length) {
                    let num;
                    if (intSet) {
                        num = Math.floor(Math.random() * (section2 - section1)) + section1;
                    } else {
                        num = Math.random() * (section2 - section1) + section1;
                    }
                    arr.push(num);
                    Tools.arrayUnique_01(arr);
                }
                return arr;
            }
        }

        /**
          * RGB三个颜色值转换成16进制的字符串‘000000’，需要加上‘#’；
          * @param r 
          * @param g
          * @param b
          */
        export function color_ToHexString(r, g, b) {
            return '#' + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
        }

        /**
         * 给一张图片加入一个色滤镜,包括其子节点,也可以设置一个消失时间
         * @param node 节点
         * @param arr [R,G,B,A]
         * @param vanishtime 默认没有消失时间，一旦设置后，将会在这个时间延时后消失
         */
        export function color_Filter(node: Laya.Sprite, arr: Array<number>, vanishtime?: number): void {
            let cf = new Laya.ColorFilter();
            cf.color(255, 0, 0, 1);
            node.filters = [cf];
            if (vanishtime) {
                Laya.timer.once(vanishtime, this, () => {
                    for (let index = 0; index < node.filters.length; index++) {
                        if (node.filters[index] == cf) {
                            node.filters = [];
                            break;
                        }
                    }
                })
            }
        }

        /**
         * 二维坐标中一个点按照另一个点旋转一定的角度后，得到的点
         * @param x0 原点X
         * @param y0 原点Y
         * @param x1 旋转点X
         * @param y1 旋转点Y
         * @param angle 角度
         */
        export function d2_dotRotateXY(x0, y0, x1, y1, angle): Laya.Point {
            let x2 = x0 + (x1 - x0) * Math.cos(angle * Math.PI / 180) - (y1 - y0) * Math.sin(angle * Math.PI / 180);
            let y2 = y0 + (x1 - x0) * Math.sin(angle * Math.PI / 180) + (y1 - y0) * Math.cos(angle * Math.PI / 180);
            return new Laya.Point(x2, y2);
        }

        /**返回两个二维物体的距离*/
        export function d2_twoObjectsLen(obj1: Laya.Sprite, obj2: Laya.Sprite): number {
            let point = new Laya.Point(obj1.x, obj1.y);
            let len = point.distance(obj2.x, obj2.y);
            return len;
        }

        /**
          * 在Laya2维世界中
          * 求向量的夹角在坐标系中的角度
          * @param x 坐标x
          * @param y 坐标y
          * */
        export function d2_Vector_Angle(x, y): number {
            let radian: number = Math.atan2(x, y) //弧度  0.6435011087932844
            let angle: number = 90 - radian * (180 / Math.PI); //角度  36.86989764584402;
            if (angle <= 0) {
                angle = 270 + (90 + angle);
            }
            return angle - 90;
        };

        /**
         * 在Laya2维世界中
         * 通过一个角度，返回一个单位向量
         * @param x 坐标x
         * @param y 坐标y
         * */
        export function d2_angle_Vector(angle): Laya.Point {
            angle -= 90;
            let radian = (90 - angle) / (180 / Math.PI);
            let p = new Laya.Point(Math.sin(radian), Math.cos(radian));
            p.normalize();
            return p;
        };

        /**
         * 返回两个三维物体的世界空间的距离
         * @param obj1 物体1
         * @param obj2 物体2
         */
        export function d3_twoObjectsLen(obj1: Laya.MeshSprite3D, obj2: Laya.MeshSprite3D): number {
            let obj1V3: Laya.Vector3 = obj1.transform.position;
            let obj2V3: Laya.Vector3 = obj2.transform.position;
            let p = new Laya.Vector3();
            // 向量相减后计算长度
            Laya.Vector3.subtract(obj1V3, obj2V3, p);
            let lenp = Laya.Vector3.scalarLength(p);
            return lenp;
        }

        /**
         * 返回两个3维向量之间的距离
        * @param v1 物体1
        * @param v2 物体2
        */
        export function d3_twoPositionLen(v1: Laya.Vector3, v2: Laya.Vector3): number {
            let p = d3_twoSubV3(v1, v2);
            let lenp = Laya.Vector3.scalarLength(p);
            return lenp;
        }

        /**
          * 返回相同坐标系中两个三维向量的相减向量（obj1-obj2）
          * @param V3_01 向量1
          * @param V3_02 向量2
          * @param normalizing 是否是单位向量,默认为不是
          */
        export function d3_twoSubV3(V3_01: Laya.Vector3, V3_02: Laya.Vector3, normalizing?: boolean): Laya.Vector3 {
            let p = new Laya.Vector3();
            // 向量相减后计算长度
            Laya.Vector3.subtract(V3_01, V3_02, p);
            if (normalizing) {
                let p1: Laya.Vector3 = new Laya.Vector3();
                Laya.Vector3.normalize(p, p1);
                return p1;
            } else {
                return p;
            }
        }

        /**
          * 3D世界中，制约一个物体不会超过和另一个点的最长距离,如果超过或者等于则设置这个球面坐标，并且返回这个坐标
          * @param originV3 原点的位置
          * @param obj 物体
          * @param length 长度
         */
        export function d3_maximumDistanceLimi(originV3: Laya.Vector3, obj: Laya.Sprite3D, length: number): Laya.Vector3 {
            // 两个向量相减等于手臂到手的向量
            let subP = new Laya.Vector3();
            let objP = obj.transform.position;
            Laya.Vector3.subtract(objP, originV3, subP);
            // 向量的长度
            let lenP = Laya.Vector3.scalarLength(subP);
            if (lenP >= length) {
                // 归一化向量
                let normalizP = new Laya.Vector3();
                Laya.Vector3.normalize(subP, normalizP);
                // 坐标
                let x = originV3.x + normalizP.x * length;
                let y = originV3.y + normalizP.y * length;
                let z = originV3.z + normalizP.z * length;
                let p = new Laya.Vector3(x, y, z);
                obj.transform.position = p;
                return p;
            }
        }

        /**
         * 射线检测，返回射线扫描结果，可以筛选结果
         * @param camera 摄像机
         * @param scene3D 当前场景
         * @param vector2 触摸点
         * @param filtrateName 找出指定触摸的模型的信息，如果不传则返回全部信息数组；
         */
        export function d3_rayScanning(camera: Laya.Camera, scene3D: Laya.Scene3D, vector2: Laya.Vector2, filtrateName?: string): any {
            /**射线*/
            let _ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
            /**射线扫描结果*/
            let outs: Array<Laya.HitResult> = new Array<Laya.HitResult>();
            //产生射线
            //射线碰撞到挡屏，用来设置手的初始位置，挡屏的属性isTrigger 要勾上，这样只检测碰撞，不产生碰撞反应
            camera.viewportPointToRay(vector2, _ray);
            scene3D.physicsSimulation.rayCastAll(_ray, outs);
            //找到挡屏的位置，把手的位置放在投屏位置的上方，也就是触摸点的上方
            if (outs.length != 0 && filtrateName) {
                let outsChaild = null;
                for (var i = 0; i < outs.length; i++) {
                    //找到挡屏
                    let hitResult = outs[i].collider.owner;
                    if (hitResult.name === filtrateName) {
                        // 开启移动
                        outsChaild = outs[i];
                    }
                }
                return outsChaild;
            } else {
                return outs;
            }
        }

        /**
         * 将3D坐标转换成屏幕坐标
         * @param v3 3D世界的坐标
         * @param camera 摄像机
        */
        export function d3_TransitionScreenPointfor(v3: Laya.Vector3, camera: Laya.Camera): Laya.Vector2 {
            let ScreenV3 = new Laya.Vector3();
            camera.viewport.project(v3, camera.projectionViewMatrix, ScreenV3);
            let point: Laya.Vector2 = new Laya.Vector2();
            point.x = ScreenV3.x;
            point.y = ScreenV3.y;
            return point;
        }

        /**
          * 播放动画。
          * @param Sp3D 节点名称
          * @param name 如果为null则播放默认动画，否则按名字播放动画片段。
          * @param normalizedTime 归一化的播放起始时间。
          * @param layerIndex 层索引。
          */
        export function d3_animatorPlay(Sp3D: Laya.Sprite3D, aniName?: string, normalizedTime?: number, layerIndex?: number): Laya.Animator {
            let sp3DAni = Sp3D.getComponent(Laya.Animator) as Laya.Animator;
            if (!sp3DAni) {
                console.log(Sp3D.name, '没有动画组件');
                return;
            }
            if (!layerIndex) {
                layerIndex = 0;
            }
            sp3DAni.play(aniName, layerIndex, normalizedTime);
            return sp3DAni;
        }

        /**
         * 返回一个向量相对于一个点的反向向量，或者反向向量的单位向量，可用于一个物体被另一个物体击退
         * @param type 二维还是三维
         * @param Vecoter1 固定点
         * @param Vecoter2 反弹物体向量
         * @param normalizing 是否归一成单位向量
         */
        export function dAll_reverseVector(type: string, Vecoter1: any, Vecoter2: any, normalizing: boolean): Laya.Vector3 {
            let p;
            if (type === '2d') {
                p = new Laya.Point(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y);
                if (normalizing) {
                    p.normalize();
                }
                return p;

            } else if (type === '3d') {
                p = new Laya.Vector3(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y, Vecoter1.z - Vecoter2.z);
                if (normalizing) {
                    let returnP = new Laya.Vector3();
                    Laya.Vector3.normalize(p, returnP);
                    return returnP;
                } else {
                    return p;
                }
            }
        }

        export function sk_indexControl(sk: Laya.Skeleton, name: string): void {
            sk.play(name, true);//从初始位置开始继续播放
            sk.player.currentTime = 15 * 1000 / sk.player.cacheFrameRate;
        }

        /**
         * 为一个节点绘制一个扇形遮罩
         * 想要遮罩的形状发生变化，必须先将父节点的cacheAs改回“none”，接着改变其角度，再次将cacheAs改为“bitmap”，必须在同一帧内进行，因为是同一帧，所以在当前帧最后或者下一帧前表现出来，帧内时间不会表现任何状态，这是个思路，帧内做任何变化都不会显示，只要帧结尾改回来就行。
         * @param parent 被遮罩的节点，也是父节点
         * @param startAngle 扇形的初始角度
         * @param endAngle 扇形结束角度
        */
        export function draw_drawPieMask(parent, startAngle, endAngle): Laya.DrawPieCmd {
            // 父节点cacheAs模式必须为"bitmap"
            parent.cacheAs = "bitmap";
            //新建一个sprite作为绘制扇形节点
            let drawPieSpt = new Laya.Sprite();
            //设置叠加模式
            drawPieSpt.blendMode = "destination-out";
            // 加入父节点
            parent.addChild(drawPieSpt);
            // 绘制扇形，位置在中心位置，大小略大于父节点，保证完全遮住
            let drawPie = drawPieSpt.graphics.drawPie(parent.width / 2, parent.height / 2, parent.width / 2 + 10, startAngle, endAngle, "#000000");
            return drawPie;
        }

        /**
         * 在一个场景中，在一个节点图片上画线，线画在场景里，目前支持方形和圆形
         * @param Scene 场景
         * @param node 节点，如果输入为null，则是清除当前事件
         * @param nodeForm 图片是圆形还是方形,默认是圆形'r'，'s'为方形
         * @param radius 线段的半径
         * @param color 颜色
         */
        export function draw_LineInScene(Scene: Laya.Scene, node: Laya.Sprite, nodeForm: string, radius: number, color: string): number {
            let length;
            Click.on(Click.Type.noEffect, node, this,
                // 按下
                (e: Laya.Event) => {
                    if (!this.self.getChildByName('DrawSp')) {
                        length = 0;
                        let DrawSp = new Laya.Sprite();
                        Scene.addChild(DrawSp);
                        DrawSp.name = 'DrawSp';
                        DrawSp.pos(0, 0);
                        Scene['DrawSp'] = DrawSp;
                    }
                    Scene['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
                },
                // 移动
                (e: Laya.Event) => {
                    // 范围控制
                    if (nodeForm == '') {

                    }
                    let Img = node as Laya.Sprite;
                    let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));
                    if (new Laya.Point(e.stageX, e.stageY).distance(globalPos.x, globalPos.y) > Img.width / 2) {
                        Scene['DrawPosArr'] = null;
                        return;
                    }
                    // 画线
                    if (Scene['DrawPosArr']) {
                        Scene['DrawSp'].graphics.drawLine(Scene['DrawPosArr'].x, Scene['DrawPosArr'].y, e.stageX, e.stageY, color, radius * 2);

                        Scene['DrawSp'].graphics.drawCircle(e.stageX, e.stageY, radius, color);
                        length += (Scene['DrawPosArr'] as Laya.Point).distance(e.stageX, e.stageY);
                        Scene['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
                    }
                },
                // 抬起
                () => {
                    if (length > 3000) {
                        Scene.getChildByName('DrawSp').removeSelf();
                    }
                    Scene['DrawPosArr'] = null;
                },
                // 出图片
                () => {
                    Scene['DrawPosArr'] = null;
                });
            return length;
        }

        /**
         * 对象数组按照对象的某个属性排序
         * @param array 对象数组
         * @param property 对象中一个相同的属性名称
         */
        export function objArrPropertySort(array: Array<any>, property: string): Array<any> {
            var compare = function (obj1, obj2) {
                var val1 = obj1[property];
                var val2 = obj2[property];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
            array.sort(compare);
            return array;
        }

        /**
         * 对比两个对象数组中的某个对象属性，返回相对第一个数组中有的这个property属性，第二个数组中没有这个属性的对象数组，例如两张数据表，通过名字查找，objArr2有8个不同的名字，objArr1也有（也可以没有）这个8个名字，并且objArr1还多了其他两个名字，那么返回objArr1中这两个个名字
         * @param objArr1 对象数组1
         * @param objArr2 对象数组2
         * @param property 需要对比的属性名称
        */
        export function objArr2DifferentPropertyObjArr1(objArr1: Array<any>, objArr2: Array<any>, property: string): Array<any> {
            var result = [];
            for (var i = 0; i < objArr1.length; i++) {
                var obj1 = objArr1[i];
                var obj1Name = obj1[property];
                var isExist = false;

                for (var j = 0; j < objArr2.length; j++) {
                    var obj2 = objArr2[j];
                    var obj2Name = obj2[property];
                    if (obj2Name == obj1Name) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    result.push(obj1);
                }
            }
            return result;
        }

        /**
         * 返回两个数组对象中，有相同属性的对象集合
         * @param data1 对象数组1
         * @param data2 对象数组2
         * @param property 需要对比的属性名称
         */
        export function objArr1IdenticalPropertyObjArr2(data1: Array<any>, data2: Array<any>, property: string): Array<any> {
            var result = [];
            for (var i = 0; i < data1.length; i++) {
                var obj1 = data1[i];
                var obj1Name = obj1[property];
                var isExist = false;

                for (var j = 0; j < data2.length; j++) {
                    var obj2 = data2[j];
                    var obj2Name = obj2[property];
                    if (obj2Name == name) {
                        isExist = true;
                        break;
                    }
                }
                if (isExist) {
                    result.push(obj1);
                }
            }
            return result;
        }

        /**
         * 对象数组去重，根据对象的某个属性值去重
         * @param arr 数组
         * @param property 属性
         * */
        export function objArrUnique(arr, property): void {
            for (var i = 0, len = arr.length; i < len; i++) {
                for (var j = i + 1, len = arr.length; j < len; j++) {
                    if (arr[i][property] === arr[j][property]) {
                        arr.splice(j, 1);
                        j--;        // 每删除一个数j的值就减1
                        len--;      // j值减小时len也要相应减1（减少循环次数，节省性能）   
                    }
                }
            }
            return arr;
        }

        /**
         * 根据一个对像的属性，从对象数组中返回某个属性的值数组
         * @param arr 
         * @param property 
         */
        export function objArrGetValue(objArr, property): Array<any> {
            let arr = [];
            for (let i = 0; i < objArr.length; i++) {
                if (objArr[i][property]) {
                    arr.push(objArr[i][property]);
                }
            }
            return arr;
        }

        /**
         * 对象数组的拷贝
         * @param ObjArray 需要拷贝的对象数组 
         */
        export function objArray_Copy(ObjArray): any {
            var sourceCopy = ObjArray instanceof Array ? [] : {};
            for (var item in ObjArray) {
                sourceCopy[item] = typeof ObjArray[item] === 'object' ? obj_Copy(ObjArray[item]) : ObjArray[item];
            }
            return sourceCopy;
        }

        /**
         * 对象的拷贝
         * @param obj 需要拷贝的对象
         */
        export function obj_Copy(obj) {
            var objCopy = {};
            for (const item in obj) {
                if (obj.hasOwnProperty(item)) {
                    const element = obj[item];
                    if (typeof element === 'object') {
                        // 其中有一种情况是对某个对象值为数组的拷贝
                        if (Array.isArray(element)) {
                            let arr1 = array_Copy(element);
                            objCopy[item] = arr1;
                        } else {
                            obj_Copy(element);
                        }
                    } else {
                        objCopy[item] = element;
                    }
                }
            }
            return objCopy;
        }

        /**
         * 往第一个数组中陆续添加第二个数组中的元素
         * @param array1 
         * @param array2
         */
        export function arrayAddToarray(array1, array2): Array<any> {
            for (let index = 0; index < array2.length; index++) {
                const element = array2[index];
                array1.push(element);
            }
            return array1;
        }

        /**
         * 从一个数组中随机取出几个元素，如果刚好是数组长度，则等于是乱序
         * @param arr 数组
         * @param num 取出几个元素默认为1个
         */
        export function arrayRandomGetOut(arr: Array<any>, num?: number): any {
            if (!num) {
                num = 1;
            }
            let arr0 = [];
            if (num > arr.length) {
                return '数组长度小于取出的数！';
            } else {
                for (let index = 0; index < num; index++) {
                    let ran = Math.round(Math.random() * (arr.length - 1));
                    let a1 = arr[ran];
                    arr.splice(ran, 1);
                    arr0.push(a1);
                }
                return arr0;
            }
        }

        /**
         * 普通数组复制 
         * @param arr1 被复制的数组
         */
        export function array_Copy(arr1): Array<any> {
            var arr = [];
            for (var i = 0; i < arr1.length; i++) {
                arr.push(arr1[i]);
            }
            return arr;
        }

        /**
         * 数组去重
         * @param arr 数组
        */
        export function arrayUnique_01(arr): Array<any> {
            for (var i = 0, len = arr.length; i < len; i++) {
                for (var j = i + 1, len = arr.length; j < len; j++) {
                    if (arr[i] === arr[j]) {
                        arr.splice(j, 1);
                        j--;        // 每删除一个数j的值就减1
                        len--;      // j值减小时len也要相应减1（减少循环次数，节省性能）   
                    }
                }
            }
            return arr;
        }

        /**数组去重*/
        export function arrayUnique_02(arr): Array<any> {
            arr = arr.sort();
            var arr1 = [arr[0]];
            for (var i = 1, len = arr.length; i < len; i++) {
                if (arr[i] !== arr[i - 1]) {
                    arr1.push(arr[i]);
                }
            }
            return arr1;
        }

        /**ES6数组去重,返回的数组是新数组，需接收*/
        export function arrayUnique_03(arr): Array<any> {
            return Array.from(new Set(arr));
        }

        /**
         * 返回从第一个数组中排除第二个数组中的元素，也就是第二个数组中没有第一个数组中的这些元素，如果第一个数组包含第二个数组，那么刚好等于是第一个数组排除第二个数组的元素
         * @param arr1 
         * @param arr2 
         */
        export function array1ExcludeArray2(arr1, arr2): Array<any> {

            let arr1Capy = array_Copy(arr1);
            let arr2Capy = array_Copy(arr2);

            for (let i = 0; i < arr1Capy.length; i++) {
                for (let j = 0; j < arr2Capy.length; j++) {
                    if (arr1Capy[i] === arr2Capy[j]) {
                        arr1Capy.splice(i, 1);
                        i--;
                    }
                }
            }
            return arr1Capy;
        }

        /**
         * 根据不同的角度和速度计算坐标,从而产生位移
         * @param angle 角度
         * @param speed 移动速度
         * */
        export function point_SpeedXYByAngle(angle: number, speed: number): Laya.Point {
            if (angle % 90 === 0 || !angle) {
                //debugger
            }
            const speedXY = { x: 0, y: 0 };
            speedXY.x = speed * Math.cos(angle * Math.PI / 180);
            speedXY.y = speed * Math.sin(angle * Math.PI / 180);
            return new Laya.Point(speedXY.x, speedXY.y);
        }
        /**
        * 求圆上的点的坐标，可以根据角度和半径作出圆形位移
        * @param angle 角度
        * @param radius 半径
        * @param centerPos 原点
        */
        export function point_GetRoundPos(angle: number, radius: number, centerPos: any): Laya.Point {
            var center = centerPos; //圆心坐标
            var radius = radius; //半径
            var hudu = (2 * Math.PI / 360) * angle; //90度角的弧度

            var X = center.x + Math.sin(hudu) * radius; //求出90度角的x坐标
            var Y = center.y - Math.cos(hudu) * radius; //求出90度角的y坐标
            return new Laya.Point(X, Y);
        }

        /**
         * 返回在一个中心点周围的随机产生数个点的数组
         * @param centerPos 中心点坐标
         * @param radiusX X轴半径
         * @param radiusY Y轴半径
         * @param count 产生多少个随机点
         */
        export function point_RandomPointByCenter(centerPos: Laya.Point, radiusX: number, radiusY: number, count?: number): Array<Laya.Point> {
            if (!count) {
                count = 1;
            }
            let arr: Array<Laya.Point> = [];
            for (let index = 0; index < count; index++) {
                let x0 = Tools.randomCountNumer(0, radiusX, 1, false);
                let y0 = Tools.randomCountNumer(0, radiusY, 1, false);
                let diffX = Tools.randomOneHalf() == 0 ? x0[0] : -x0[0];
                let diffY = Tools.randomOneHalf() == 0 ? y0[0] : -y0[0];
                let p = new Laya.Point(centerPos.x + diffX, centerPos.y + diffY);
                arr.push(p);
            }
            return arr;
        }

        /**
         * 根据角度计算弧度
         * @param angle 角度
         */
        export function angle_GetRad(angle) {
            return angle / 180 * Math.PI;
        }

        /**
          * 获取本地存储数据并且和文件中数据表对比,对比后会上传
          * @param url 本地数据表地址
          * @param storageName 本地存储中的json名称
          * @param propertyName 数组中每个对象中同一个属性名，通过这个名称进行对比
          */
        export function jsonCompare(url: string, storageName: string, propertyName: string): Array<any> {
            // 第一步，先尝试从本地缓存获取数据，
            // 第二步，如果本地缓存有，那么需要和数据表中的数据进行对比，把缓存没有的新增对象复制进去
            // 第三步，如果本地缓存没有，那么直接从数据表获取
            let dataArr;
            if (Laya.LocalStorage.getJSON(storageName)) {
                dataArr = JSON.parse(Laya.LocalStorage.getJSON(storageName))[storageName];
                console.log(storageName + '从本地缓存中获取到数据,将和文件夹的json文件进行对比');
                try {
                    let dataArr_0: Array<any> = Laya.loader.getRes(url)['RECORDS'];
                    // 如果本地数据条数大于json条数，说明json减东西了，不会对比，json只能增加不能删减
                    if (dataArr_0.length >= dataArr.length) {
                        let diffArray = Tools.objArr2DifferentPropertyObjArr1(dataArr_0, dataArr, propertyName);
                        console.log('两个数据的差值为：', diffArray);
                        Tools.arrayAddToarray(dataArr, diffArray);
                    } else {
                        console.log(storageName + '数据表填写有误，长度不能小于之前的长度');
                    }
                } catch (error) {
                    console.log(storageName, '数据赋值失败！请检查数据表或者手动赋值！')
                }
            } else {
                try {
                    dataArr = Laya.loader.getRes(url)['RECORDS'];
                } catch (error) {
                    console.log(storageName + '数据赋值失败！请检查数据表或者手动赋值！')
                }
            }
            let data = {};
            data[storageName] = dataArr;
            Laya.LocalStorage.setJSON(storageName, JSON.stringify(data));
            return dataArr;
        }
    }

    /**任务模块*/
    export module Task {
        /**任务种类集合*/
        export let TaskClassArr = [];
        /**任种类切换页*/
        export let _TaskTap: Laya.Tab;
        /**假如还有一个任切换页_OtherTap*/
        export let _OtherTap: Laya.Tab;
        /**任务列表*/
        export let _TaskList: Laya.List;

        /**每日任务数据集合*/
        export let everydayTask: Array<any>;
        /**非每日任务集合*/
        export let perpetualTask: Array<any>;

        /**今日日期*/
        export let todayData = {
            /**获取存储的日期*/
            get date(): number {
                return Laya.LocalStorage.getItem('Task_todayData') ? Number(Laya.LocalStorage.getItem('Task_todayData')) : null;
            },
            /**设置存储的日期*/
            set date(date: number) {
                Laya.LocalStorage.setItem('Task_todayData', date.toString());
            }
        };
        0
        /**
        * 通过名称获取任务的一个属性值
        * @param ClassName 任务类型名称
        * @param name 任务名称
        * @param property 任务属性
        * */
        export function getProperty(ClassName: string, name: string, property: string): any {
            let pro = null;
            let arr = getClassArr(ClassName);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['name'] === name) {
                    pro = element[property];
                    break;
                }
            }
            if (pro !== null) {
                return pro;
            } else {
                console.log(name + '找不到属性:' + property, pro);
                return null;
            }
        }

        /**
         * 通过名称设置或者增加一个任务的一个属性值,并且刷新list列表
         * @param goodsClass 任务类型
         * @param ClassName 任务名称
         * @param property 设置或者增加任务属性名称
         * @param value 需要设置或者增加的属性值
         * */
        export function setProperty(ClassName: string, name: string, property: string, value: any): void {
            let arr = getClassArr(ClassName);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['name'] === name) {
                    element[property] = value;
                    break;
                }
            }
            let data = {};
            data[ClassName] = arr;
            Laya.LocalStorage.setJSON(ClassName, JSON.stringify(data));

            if (_TaskList) {
                _TaskList.refresh();
            }
        }

        /**根据任务类型返回任务数组*/
        export function getClassArr(ClassName: string): Array<any> {
            let arr = [];
            switch (ClassName) {
                case TaskClass.everyday:
                    arr = everydayTask;
                    break;
                case TaskClass.perpetual:
                    arr = perpetualTask;
                    break;
                default:
                    break;
            }
            return arr;
        }

        /**
         * 通过resCondition/condition，做任务并且完成了这次任务，然后检总进度是否完成,并且设置成完成状态,返回false表示任务没有完成，true代表刚好完成奖励未领取，-1代表任务完成了也领取了奖励
         * @param calssName 任务种类
         * @param name 任务名称
         * @param number 做几次任务，不传则默认为1次
         */
        export function doDetection(calssName: string, name: string, number?: number): any {
            if (!number) {
                number = 1;
            }
            let resCondition = Task.getProperty(calssName, name, Task.TaskProperty.resCondition);
            let condition = Task.getProperty(calssName, name, Task.TaskProperty.condition);
            if (Task.getProperty(calssName, name, Task.TaskProperty.get) !== -1) {
                if (condition <= resCondition + number) {
                    Task.setProperty(calssName, name, Task.TaskProperty.resCondition, condition);
                    Task.setProperty(calssName, name, Task.TaskProperty.get, 1);
                    if (_TaskList) {
                        _TaskList.refresh();
                    }
                    return true;
                } else {
                    Task.setProperty(calssName, name, Task.TaskProperty.resCondition, resCondition + number);
                    if (_TaskList) {
                        _TaskList.refresh();
                    }
                    return false;
                }
            } else {
                return -1;
            }
        }

        /**任务属性列表，数据表中的任务应该有哪些属性,name和have是必须有的属性,可以无限增加*/
        export enum TaskProperty {
            /**名称*/
            name = 'name',
            /**任务解释*/
            explain = 'explain',
            /**任务类型*/
            taskType = 'taskType',
            /**需要完成任务的总数*/
            condition = 'condition',
            /**根据获取途径，剩余需要条件的数量，会平凡改这个数量*/
            resCondition = 'resCondition',
            /**奖励类型*/
            rewardType = 'rewardType',
            /**奖励数量*/
            rewardNum = 'rewardNum',
            /**排列顺序*/
            arrange = 'arrange',
            /**剩余可完成次数,为零时将不可继续进行*/
            time = 'time',
            /**是否有可领取的奖励,有三种状态，1代表有奖励未领取，0表示任务没有完成，-1代表今天任务完成了也领取了奖励*/
            get = 'get',
        }

        /**任务中的任务大致类别,同时对应图片地址的文件夹*/
        export enum TaskClass {
            /**每日任务*/
            everyday = 'Task_Everyday',
            /**永久性任务*/
            perpetual = 'Task_Perpetual',
        }

        /**事件名称*/
        export enum EventType {
            /**领取奖励*/
            getAward = 'getAward',
            /**每次点击广告获得金币*/
            adsGetAward_Every = 'adsGetAward_Every',
            /**试用皮肤*/
            useSkins = 'useSkins',
            /**胜利*/
            victory = 'victory',
            /**看广告的次数*/
            adsTime = 'adsTime',
            /**看广告的次数*/
            victoryBox = 'victoryBox',
        }
        /**获得方式列举,方式可以添加*/
        export enum TaskType {
            /**看广告*/
            ads = 'ads',
            /**胜利次数*/
            victory = 'victory',
            /**使用皮肤次数*/
            useSkins = 'useSkins',
            /**开宝箱次数*/
            treasureBox = 'treasureBox',
        }

        /**任务类型名称*/
        export enum TaskName {
            "观看广告获得金币" = "观看广告获得金币",
            "每日服务10位客人" = "每日服务10位客人",
            "每日观看两个广告" = "每日观看两个广告",
            "每日使用5种皮肤" = "每日使用5种皮肤",
            "每日开启10个宝箱" = "每日开启10个宝箱"
        }

        /**在loding界面或者开始界面执行一次！*/
        export function initTask(): void {
            //如果上个日期等于今天的日期，那么从存储中获取，如果不相等则直接从数据表中获取
            if (todayData.date !== (new Date).getDate()) {
                Task.everydayTask = Laya.loader.getRes('GameData/Task/everydayTask.json')['RECORDS'];
                console.log('不是同一天，每日任务重制！');
                todayData.date = (new Date).getDate();
            } else {
                Task.everydayTask = Tools.jsonCompare('GameData/Task/everydayTask.json', TaskClass.everyday, TaskProperty.name);
                console.log('是同一天！，继续每日任务');
            }
        }

        /**对任务场景进行初始化*/
        export class TaskScene extends Admin.Scene {
            moduleOnAwake(): void {
                Task._TaskTap = this.self['TaskTap'];
                Task._TaskList = this.self['TaskList'];
                TaskClassArr = [Task.everydayTask];
            }
            moduleOnEnable(): void {
                this.taskTap_Create();
                this.taskList_Create();
            }
            /**Tap初始化*/
            taskTap_Create(): void {
                Task._TaskList.selectHandler = new Laya.Handler(this, this.taskTap_Select);
            }
            /**taskTap的触摸监听*/
            taskTap_Select(index: number): void { }
            /**初始化list*/
            taskList_Create(): void {
                Task._TaskList.selectEnable = true;
                Task._TaskList.vScrollBarSkin = "";
                // this._ShopList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
                // this._ShopList.scrollBar.elasticDistance = 500;//设置橡皮筋极限距离。
                Task._TaskList.selectHandler = new Laya.Handler(this, this.taskList_Scelet);
                Task._TaskList.renderHandler = new Laya.Handler(this, this.taskList_Update);
                this.taskList_refresh();
            }
            /**list选中监听*/
            taskList_Scelet(index: number): void { }
            /**list列表刷新*/
            taskList_Update(cell: Laya.Box, index: number): void { }
            /**刷新list数据,重写覆盖，默认为皮肤*/
            taskList_refresh(): void {
                if (Task._TaskList && TaskClassArr.length > 0) {
                    Task._TaskList.array = TaskClassArr[0];
                    Task._TaskList.refresh();
                }
            }
        }
    }

    /**商城模块,用于购买和穿戴，主要是购买和存储，次要是穿戴*/
    export module Shop {
        /**商品品类集合，重写则规定列表顺序*/
        export let goodsClassArr: Array<Array<any>> = [];
        /**商品图片对应的文件夹名称集合，顺序必须和商品品类顺序一样*/
        export let classWarehouse: Array<string> = [];
        /**商品种类切换页*/
        export let _ShopTap: Laya.Tab;
        /**假如还有一个商品切换页_OtherTap*/
        export let _OtherTap: Laya.Tab;
        /**商品列表*/
        export let _ShopList: Laya.List;

        /**试用商品名称记录，一般用于皮肤试用,包括试用类别名称和名字*/
        export let _tryName: Array<string> = [];

        //皮肤*****************************************************************************************************
        /**皮肤的总数据，存储对象依次为[{名称，获取方式，剩余数量或者次数}]*/
        export let allSkin = [];
        /**默认皮肤*/
        export let defaultSkin: string;
        /**当前穿戴的皮肤*/
        export let _currentSkin = {
            get name(): string {
                return Laya.LocalStorage.getItem('Shop_currentSkin') ? Laya.LocalStorage.getItem('Shop_currentSkin') : null;
            },
            set name(name: string) {
                Laya.LocalStorage.setItem('Shop_currentSkin', name);
            }
        };

        //默认道具**********************************************************************************************************
        /**所有道具*/
        export let allProps: Array<any> = [];
        /**当前道具*/
        export let defaultProp: string;
        /**当前道具*/
        export let _currentProp = {
            get name(): string {
                return Laya.LocalStorage.getItem('Shop_currentProp') ? Laya.LocalStorage.getItem('Shop_currentProp') : null;
            },
            set name(name: string) {
                Laya.LocalStorage.setItem('Shop_currentProp', name);
            }
        };

        //其他道具，第三种物品的统称***********************************************************************************
        /**所有其他道具集合*/
        export let allOther: Array<any> = [];
        /**默认穿戴的其他道具*/
        export let defaultOther: string;
        /**当前使用的其他物品*/
        export let _currentOther = {
            get name(): string {
                return Laya.LocalStorage.getItem('Shop_crrentOther') ? Laya.LocalStorage.getItem('Shop_crrentOther') : null;
            },
            set name(name: string) {
                Laya.LocalStorage.setItem('Shop_crrentOther', name);
            }
        };

        /**今日用了商品的种类，用在开始游戏界面，可能会有些任务需要用到*/
        export let useSkinType = [];
        /**
         * 用过的皮肤都放进useSkinType，会自动去重
         * @param skin 皮肤名称
         */
        export function setUseSkinType(): number {
            let arr;
            // 拉取
            if (Laya.LocalStorage.getJSON('Shop_useSkinType')) {
                arr = JSON.parse(Laya.LocalStorage.getJSON('Shop_useSkinType'));
            } else {
                return;
            }
            useSkinType = arr !== null ? arr['Shop_useSkinType'] : [];
            // 去重
            useSkinType.push(_currentOther.name, _currentProp.name, _currentSkin.name);
            useSkinType = Tools.arrayUnique_03(useSkinType);
            // 上传
            let data = {
                Shop_useSkinType: useSkinType,
            }
            Laya.LocalStorage.setJSON('Shop_useSkinType', JSON.stringify(data));
            return useSkinType.length;
        }

        /**
         * 通过名称获取商品的一个属性值
         * @param goodsClass 品类名称
         * @param name 商品名称
         * @param property 商品属性
         * */
        export function getProperty(goodsClass: string, name: string, property: string): any {
            let pro = null;
            let arr = getClassArr(goodsClass);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['name'] === name) {
                    pro = element[property];
                    break;
                }
            }
            if (pro !== null) {
                return pro;
            } else {
                console.log(name + '找不到属性:' + property, pro);
                return null;
            }
        }

        /**
         * 通过名称设置或者增加一个商品的一个属性值
         * @param goodsClass 品类名称
         * @param name 商品名称
         * @param property 设置或者增加商品属性名称
         * @param value 需要设置或者增加的属性值
         * */
        export function setProperty(goodsClass: string, name: string, property: string, value: any): void {
            let arr = getClassArr(goodsClass);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['name'] === name) {
                    element[property] = value;
                    break;
                }
            }
            let data = {};
            data[goodsClass] = arr;
            Laya.LocalStorage.setJSON(goodsClass, JSON.stringify(data));
            if (_ShopList) {
                _ShopList.refresh();
            }
        }

        /**
         * 返回当前品类中已经拥有的商品
         * @param   goodsClass 商品品类
        */
        export function getHaveArr(goodsClass: string): Array<any> {
            let arr = getClassArr(goodsClass);
            let arrHave = [];
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element[GoodsProperty.have]) {
                    arrHave.push(element);
                }
            }
            return arrHave;
        }

        /**
         * 返回当前只能用金币购买的商品数组
         * @param goodsClass 商品品类
         * @param have 是否显示获取到的，true为已获得，flase为没有获得，不传则是全部
         * @param excludeCurrent 假设当前的装扮的皮肤恰好是金币购买的，是否排除这个皮肤，默认为不排除
         * */
        export function getwayGoldArr(goodsClass: string, have?: boolean, excludeCurrent?: boolean) {
            let arr = getClassArr(goodsClass);
            let arrNoHave = [];
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (have && have !== undefined) {
                    if (element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.gold) {
                        arrNoHave.push(element);
                    }
                }
                else if (!have && have !== undefined) {
                    if (!element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.gold) {
                        arrNoHave.push(element);
                    }
                }
                else if (have == undefined) {
                    if (element[GoodsProperty.getway] === Getway.gold) {
                        arrNoHave.push(element);
                    }
                }
            }

            if (excludeCurrent && excludeCurrent !== undefined) {
                for (let index = 0; index < arrNoHave.length; index++) {
                    const element = arrNoHave[index];
                    if (element[GoodsProperty.name] === get_Current(goodsClass)) {
                        arrNoHave.splice(index, 1);
                        break;
                    }
                }
            }
            return arrNoHave;
        }

        /**
         * 返回当前只能通过关卡进度获取的商品品类
         * @param goodsClass 商品品类
         * @param have 是否显示获取到的，true为已获得，flase为没有获得，不传则是全部
         * */
        export function getwayIneedwinArr(goodsClass: string, have?: boolean) {
            let arr = getClassArr(goodsClass);
            let arrIneedwin = [];
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (have && have !== undefined) {
                    if (element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.ineedwin) {
                        arrIneedwin.push(element);
                    }
                } else if (!have && have !== undefined) {
                    if (!element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.ineedwin) {
                        arrIneedwin.push(element);
                    }
                } else if (have == undefined) {
                    if (element[GoodsProperty.getway] === Getway.ineedwin) {
                        arrIneedwin.push(element);
                    }
                }
            }
            return arrIneedwin;
        }

        /**根据品类返回当前使用的皮肤*/
        export function get_Current(goodsClass: string): string {
            let _current = null;
            switch (goodsClass) {
                case GoodsClass.Skin:
                    _current = _currentSkin.name;
                    break;
                case GoodsClass.Props:
                    _current = _currentProp.name;
                    break;
                case GoodsClass.Other:
                    _current = _currentOther.name;
                    break;
                default:
                    break;
            }
            return _current;
        }

        /**根据品类返回品类名称数组*/
        export function getClassArr(goodsClass: string): Array<any> {
            let arr = [];
            switch (goodsClass) {
                case GoodsClass.Skin:
                    arr = allSkin;
                    break;
                case GoodsClass.Props:
                    arr = allProps;
                    break;
                case GoodsClass.Other:
                    arr = allOther;
                    break;

                default:
                    break;
            }
            return arr;
        }

        /**
         * 通过resCondition/condition，购买商品，有些商品需要购买很多次，购买后，并且设置成购买状态，返回false表示没有购买完成，true刚好完成，-1已经拥有或者是没有改商品
         * @param calssName 商品种类
         * @param name 商品名称
         * @param number 购买几次，不传则默认为1次
         */
        export function buyGoods(calssName: string, name: string, number?: number): any {
            if (!number) {
                number = 1;
            }
            let resCondition = getProperty(calssName, name, GoodsProperty.resCondition);
            let condition = getProperty(calssName, name, GoodsProperty.condition);
            let have = getProperty(calssName, name, GoodsProperty.have);
            if (have !== true && have !== null) {
                if (condition <= resCondition + number) {
                    setProperty(calssName, name, GoodsProperty.resCondition, condition);
                    setProperty(calssName, name, GoodsProperty.have, true);
                    if (_ShopList) {
                        _ShopList.refresh();
                    }
                    return true;
                } else {
                    setProperty(calssName, name, GoodsProperty.resCondition, resCondition + number);
                    if (_ShopList) {
                        _ShopList.refresh();
                    }
                    return false;
                }
            } else {
                return -1;
            }
        }

        /**在loding界面或者开始界面执行一次！*/
        export function initShop(): void {
            //如果上个日期等于今天的日期，那么从存储中获取，如果不相等则直接从数据表中获取
            Shop.allSkin = Tools.jsonCompare('GameData/Shop/Skin.json', GoodsClass.Skin, GoodsProperty.name);
            Shop.allProps = Tools.jsonCompare('GameData/Shop/Props.json', GoodsClass.Props, GoodsProperty.name);
            Shop.allOther = Tools.jsonCompare('GameData/Shop/Other.json', GoodsClass.Other, GoodsProperty.name);
        }

        /**商品属性列表，数据表中的商品应该有哪些属性,name和have是必须有的属性,可以无限增加*/
        export enum GoodsProperty {
            /**名称*/
            name = 'name',
            /**获取途径*/
            getway = 'getway',
            /**根据获取途径，给予需要条件的总量*/
            condition = 'condition',
            /**根据获取途径，剩余需要条件的数量，会平凡改这个数量*/
            resCondition = 'resCondition',
            /**排列顺序*/
            arrange = 'arrange',
            /**获得顺序，我们可能会给予玩家固定的获得顺序*/
            getOder = 'getOder',
            /**是否已经拥有*/
            have = 'have',
        }

        /**获得方式列举,方式可以添加*/
        export enum Getway {
            /**免费获取*/
            free = 'free',
            /**看广告*/
            ads = 'ads',
            /**特殊页面看广告*/
            adsXD = 'adsXD',
            /**关卡中获得，或者是过了多少关获得*/
            ineedwin = 'ineedwin',
            /**金币购买*/
            gold = 'gold',
            /**钻石购买购买*/
            diamond = 'diamond',
            /**彩蛋获取*/
            easterEgg = 'easterEgg',
            /**其他方式*/
            other = 'other',
        }

        /**商店中的商品大致类别,同时对应图片地址的文件夹*/
        export enum GoodsClass {
            /**皮肤*/
            Skin = 'Shop_Skin',
            /**道具*/
            Props = 'Shop_Props',
            /**其他商品*/
            Other = 'Shop_Other',
        }
        /**事件名称*/
        export enum EventType {
            select = 'select',
        }

        export class ShopScene extends Admin.Scene {
            moduleOnAwake(): void {
                /**结构，如果没有则为null*/
                Shop._ShopTap = this.self['MyTap'];
                Shop._ShopList = this.self['MyList'];
                if (!Shop.allSkin) {
                    Shop.allSkin = Tools.jsonCompare('GameData/Shop/Skin.json', GoodsClass.Skin, GoodsProperty.name);
                }
                if (!Shop.allProps) {
                    Shop.allProps = Tools.jsonCompare('GameData/Shop/Props.json', GoodsClass.Props, GoodsProperty.name);
                }
                if (!Shop.allOther) {
                    Shop.allOther = Tools.jsonCompare('GameData/Shop/Other.json', GoodsClass.Other, GoodsProperty.name);
                }
                goodsClassArr = [Shop.allSkin, Shop.allProps, Shop.allOther];
                classWarehouse = [GoodsClass.Skin, GoodsClass.Props, GoodsClass.Skin];
            }
            moduleOnEnable(): void {
                this.myList_Create();
                this.myTap_Create();
            }
            /**Tap初始化*/
            myTap_Create(): void {
                Shop._ShopTap.selectHandler = new Laya.Handler(this, this.myTap_Select);
            }
            /**myTap的触摸监听*/
            myTap_Select(index: number): void { }
            /**初始化list*/
            myList_Create(): void {
                Shop._ShopList.selectEnable = true;
                // Shop._ShopList.vScrollBarSkin = "";
                // this._ShopList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
                // this._ShopList.scrollBar.elasticDistance = 500;//设置橡皮筋极限距离。
                Shop._ShopList.selectHandler = new Laya.Handler(this, this.myList_Scelet);
                Shop._ShopList.renderHandler = new Laya.Handler(this, this.myList_Update);
                this.myList_refresh();
            }
            /**list选中监听*/
            myList_Scelet(index: number): void { }
            /**list列表刷新*/
            myList_Update(cell, index: number): void { }
            /**刷新list数据,重写覆盖，默认为皮肤*/
            myList_refresh(): void {
                if (Shop._ShopList && goodsClassArr.length > 0) {
                    Shop._ShopList.array = goodsClassArr[0];
                    Shop._ShopList.refresh();
                }
            }
        }
    }

    /**胜利宝箱模块*/
    export module VictoryBox {
        /**宝箱列表组件*/
        export let _BoxList: Laya.List;
        /**宝箱数据集合*/
        export let _BoxArray = [];
        /**还可以打开宝箱的次数,初始默认为三次，重写覆盖*/
        export let _canOpenNum: number = 3;
        /**已经领取了几次奖励*/
        export let _alreadyOpenNum: number = 0;
        /**看宝箱可以领取的最大次数*/
        export let _adsMaxOpenNum: number = 6;
        /**第几次打开宝箱界面*/
        export let _openVictoryBoxNum: number = 0;
        /**当前被选中的那个宝箱是什么宝箱*/
        export let _selectBox: string;
        /**
         * 通过名称获取宝箱的一个属性值
         * @param name 宝箱名称
         * @param property 宝箱属性名称
         * */
        export function getProperty(name: string, property: string): any {
            let pro = null;
            for (let index = 0; index < _BoxArray.length; index++) {
                const element = _BoxArray[index];
                if (element['name'] === name) {
                    pro = element[property];
                    break;
                }
            }
            if (pro !== null) {
                return pro;
            } else {
                console.log(name + '找不到属性:' + property, pro);
                return null;
            }
        }

        /**
         * 通过名称设置或者增加一个宝箱的一个属性值
         * @param name 宝箱名称
         * @param property 宝箱属性名称
         * @param value 需要设置或者增加的属性值
         * */
        export function setProperty(name: string, property: string, value: any): void {
            for (let index = 0; index < _BoxArray.length; index++) {
                const element = _BoxArray[index];
                if (element['name'] === name) {
                    element[property] = value;
                    break;
                }
            }
            if (_BoxList) {
                _BoxList.refresh();
            }
        }

        /**宝箱属性*/
        export enum BoxProperty {
            /**奖励名称*/
            name = 'name',
            /**奖励类型*/
            rewardType = 'rewardType',
            /**奖励数量*/
            rewardNum = 'rewardNum',
            /**是否已经被打开*/
            openState = 'openState',
            /**是否需要看广告*/
            ads = 'ads',
            /**是否被选中*/
            select = 'select',
        }

        /**事件类型*/
        export enum EventType {
            /**开宝箱*/
            openBox = 'openBox',
        }
        /**胜利宝箱场景父类*/
        export class VictoryBoxScene extends Admin.Scene {
            moduleOnAwake(): void {
                /**结构，如果没有则为null*/
                VictoryBox._BoxList = this.self['MyList'];
                //注意这里要复制数组，不可以直接赋值
                _BoxArray = Tools.objArray_Copy(Laya.loader.getRes("GameData/VictoryBox/VictoryBox.json")['RECORDS']);
                _selectBox = null;
                _canOpenNum = 3;
                _openVictoryBoxNum++;
                _adsMaxOpenNum = 6;
                _alreadyOpenNum = 0;
            }
            moduleOnEnable(): void {
                this.boxList_Create();
            }
            /**初始化list*/
            boxList_Create(): void {
                VictoryBox._BoxList.selectEnable = true;
                // VictoryBox._BoxList.vScrollBarSkin = "";//不需要移动时，就不设置移动条
                // this._ShopList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
                // this._ShopList.scrollBar.elasticDistance = 500;//设置橡皮筋极限距离。
                VictoryBox._BoxList.selectHandler = new Laya.Handler(this, this.boxList_Scelet);
                VictoryBox._BoxList.renderHandler = new Laya.Handler(this, this.boxList_Update);
                this.boxList_refresh();
            }
            /**list选中监听*/
            boxList_Scelet(index: number): void { }
            /**list列表刷新*/
            boxList_Update(cell, index: number): void { }
            /**刷新list数据,重写覆盖，默认为皮肤*/
            boxList_refresh(): void {
                if (VictoryBox._BoxList) {
                    VictoryBox._BoxList.array = _BoxArray;
                    VictoryBox._BoxList.refresh();
                }
            }
        }
    }

    /**签到模块*/
    export module CheckIn {
        /**签到list列表*/
        export let _checkList: Laya.List;
        /**列表信息*/
        export let _checkArray: Array<any>;
        /**上次的签到日期，主要判断今日会不会弹出签到，不一样则弹出签到，一样则不弹出签到*/
        export let _lastCheckDate = {
            get date(): number {
                return Laya.LocalStorage.getItem('Check_lastCheckDate') ? Number(Laya.LocalStorage.getItem('Check_lastCheckDate')) : -1;
            },
            // 日期写数字
            set date(date: number) {
                Laya.LocalStorage.setItem('Check_lastCheckDate', date.toString());
            }
        }
        /**当前签到第几天了，7日签到为7天一个循环*/
        export let _checkInNum = {
            get number(): number {
                return Laya.LocalStorage.getItem('Check_checkInNum') ? Number(Laya.LocalStorage.getItem('Check_checkInNum')) : 0;
            },
            /**次数写数字*/
            set number(num: number) {
                Laya.LocalStorage.setItem('Check_checkInNum', num.toString());
            }
        }

        /**
         * 今天是否已经签到
         */
        export let _todayCheckIn = {
            get bool(): boolean {
                return _lastCheckDate.date == DateAdmin._date.date ? true : false;
            },
        }

        /**
         * 通过名称获取签到的一个属性值
         * @param name 签到名称
         * @param property 签到属性名称
         * */
        export function getProperty(name: string, property: string): any {
            let pro = null;
            for (let index = 0; index < _checkArray.length; index++) {
                const element = _checkArray[index];
                if (element['name'] === name) {
                    pro = element[property];
                    break;
                }
            }
            if (pro !== null) {
                return pro;
            } else {
                console.log(name + '找不到属性:' + property, pro);
                return null;
            }
        }

        /**
         * 通过名称设置或者增加一个签到的一个属性值
         * @param className 签到种类
         * @param name 签到类型
         * @param property 签到属性名称
         * @param value 需要设置或者增加的属性值
         * */
        export function setProperty(className, name: string, property: string, value: any): void {
            for (let index = 0; index < _checkArray.length; index++) {
                const element = _checkArray[index];
                if (element['name'] === name) {
                    element[property] = value;
                    break;
                }
            }
            let data = {};
            data[className] = _checkArray;
            Laya.LocalStorage.setJSON(className, JSON.stringify(data));
            if (_checkList) {
                _checkList.refresh();
            }
        }

        /**
         * 是否弹出签到页面
         */
        export function openCheckIn(): void {
            if (!_todayCheckIn.bool) {
                console.log('没有签到过，弹出签到页面！');
                Admin._openScene(Admin.SceneName.UICheckIn);
            } else {
                console.log('签到过了，今日不可以再签到');
            }
        }

        /**
         * 七日签到，签到一次并且返回今天的奖励
        */
        export function todayCheckIn_7Days(): number {
            _lastCheckDate.date = DateAdmin._date.date;
            _checkInNum.number++;
            setProperty(CheckClass.chek_7Days, 'day' + _checkInNum.number, CheckProPerty.checkInState, true);
            let rewardNum = getProperty('day' + _checkInNum.number, CheckProPerty.rewardNum);
            return rewardNum;
        }

        /**
         * 签到初始化
         * */
        export function init(): void {
            if (_checkInNum.number === 7 && !_todayCheckIn.bool) {
                _checkInNum.number = 0;
                Laya.LocalStorage.removeItem(CheckClass.chek_7Days);
            }
        }

        /**签到种类*/
        export enum CheckClass {
            chek_7Days = 'Chek_7Days',
            chek_15Days = 'Chek_15Days',
            chek_30Days = 'Chek_30Days',
        }

        /**签到中的属性*/
        export enum CheckProPerty {
            /**名称，第几天*/
            name = 'name',
            /**奖励类型*/
            rewardType = 'rewardType',
            /**签到奖励*/
            rewardNum = 'rewardNum',
            /**是否签到过了*/
            checkInState = 'checkInState',
            /**排列顺序*/
            arrange = 'arrange',
        }

        /**事件类型*/
        export enum EventType {
            /**移除签到按钮*/
            removeCheckBtn = 'removeCheckBtn',
        }

        export class CheckInScene extends Admin.Scene {
            moduleOnAwake(): void {
                /**结构，如果没有则为null*/
                CheckIn._checkList = this.self['CheckList'];
                //注意这里要复制数组，不可以直接赋值
                _checkArray = Tools.jsonCompare('GameData/CheckIn/CheckIn.json', CheckClass.chek_7Days, CheckProPerty.name);
            }
            moduleOnEnable(): void {
                this.checkList_Create();
            }
            moduleEventReg(): void {

            }
            /**初始化list*/
            checkList_Create(): void {
                CheckIn._checkList.selectEnable = true;
                // CheckIn._checkList.vScrollBarSkin = "";//不需要移动时，就不设置移动条
                // this._ShopList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
                // this._ShopList.scrollBar.elasticDistance = 500;//设置橡皮筋极限距离。
                CheckIn._checkList.selectHandler = new Laya.Handler(this, this.checkList_Scelet);
                CheckIn._checkList.renderHandler = new Laya.Handler(this, this.checkList_Update);
                this.checkList_refresh();
            }
            /**list选中监听*/
            checkList_Scelet(index: number): void { }
            /**list列表刷新*/
            checkList_Update(cell, index: number): void { }
            /**刷新list数据,重写覆盖，默认为皮肤*/
            checkList_refresh(): void {
                if (CheckIn._checkList) {
                    CheckIn._checkList.array = _checkArray;
                    CheckIn._checkList.refresh();
                }
            }
        }
    }

    /**限定皮肤模块*/
    export module SkinQualified {
        /**从哪个界面弹出了XDSkin*/
        export let _fromScene: string;
        /**需要看几次广告才可以获得限定皮肤,默认三次，重写覆盖*/
        export let _needAdsNum: number;
        /**已经几次看广告*/
        export let _adsNum = {
            get value(): number {
                return Laya.LocalStorage.getItem('XDSKin_adsNum') ? Number(Laya.LocalStorage.getItem('XDSKin_adsNum')) : 0;
            },
            /**次数写数字*/
            set value(value: number) {
                Laya.LocalStorage.setItem('XDSKin_adsNum', value.toString());
            }
        }

        /**
         * 是否弹出限定皮肤界面
         * @param fromScene 从哪个界面进来的
        */
        export function openXDSkin(fromScene): void {
            if (_adsNum.value >= _needAdsNum) {
                return;
            } else {
                Admin._openScene(Admin.SceneName.UISkinXD);
                _fromScene = fromScene;
            }
        }

        export enum EventType {
            /**获得限定皮肤*/
            acquisition = 'acquisition',
        }

        /**限定皮肤场景父类*/
        export class SkinQualifiedScene extends Admin.Scene {
            moduleOnEnable(): void {
                _needAdsNum = 3;
            }
        }
    }

    /**皮肤装扮界面*/
    export module Skin {
        /**皮肤list*/
        export let _SkinList: Laya.List;
        /**皮肤切换页*/
        export let _SkinTap: Laya.Tab;
        /**皮肤总数集合*/
        export let _skinClassArr = [];

        /**头部装饰数组*/
        export let _headSkinArr = [];
        /**当前眼部的装扮*/
        export let _currentHead = {
            get name(): string {
                return Laya.LocalStorage.getItem('Skin_currentHead') ? Laya.LocalStorage.getItem('Skin_currentHead') : null;
            },
            set name(name: string) {
                Laya.LocalStorage.setItem('Skin_currentHead', name);
            }

        };
        /**眼部装饰数组*/
        export let _eyeSkinArr = [];
        /**当前眼部的装扮*/
        export let _currentEye = {
            get name(): string {
                return Laya.LocalStorage.getItem('Skin_currentEye') ? Laya.LocalStorage.getItem('Skin_currentEye') : null;
            },
            set name(name: string) {
                Laya.LocalStorage.setItem('Skin_currentEye', name);
            }
        };

        /**装饰类别*/
        export enum SkinClass {
            head = 'head',
            eye = 'eye',
            body = 'body',
            upperBody = 'upperBody',
            lowerBody = 'lowerBody',
        }

        export enum SkinProperty {
            /**名称*/
            name = 'name',
            /**获取途径*/
            getway = 'getway',
            /**根据获取途径，给予需要条件的总量*/
            condition = 'condition',
            /**根据获取途径，剩余需要条件的数量，会平凡改这个数量*/
            resCondition = 'resCondition',
            /**排列顺序*/
            arrange = 'arrange',
            /**获得顺序，我们可能会给予玩家固定的获得顺序*/
            getOder = 'getOder',
            /**类别*/
            classify = 'classify',
            /**是否已经拥有*/
            have = 'have',
        }

        /**事件名称*/
        export enum EventType {
            /**购买*/
            purchase = 'purchase',
            /**选择*/
            select = 'select',
        }
        export class SkinScene extends Admin.Scene {
            moduleOnAwake(): void {
                /**结构，如果没有则为null*/
                Skin._SkinTap = this.self['SkinTap'];
                Skin._SkinList = this.self['SkinList'];

                _skinClassArr = [_eyeSkinArr, _headSkinArr];
            }
            moduleOnEnable(): void {
                this.skinList_Create();
                this.skinTap_Create();
            }
            /**Tap初始化*/
            skinTap_Create(): void {
                Skin._SkinTap.selectHandler = new Laya.Handler(this, this.skinTap_Select);
            }
            /**skinTap的触摸监听*/
            skinTap_Select(index: number): void { }
            /**初始化list*/
            skinList_Create(): void {
                Skin._SkinList.selectEnable = true;
                // Skin._SkinList.vScrollBarSkin = "";
                // this._ShopList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
                // this._ShopList.scrollBar.elasticDistance = 500;//设置橡皮筋极限距离。
                Skin._SkinList.selectHandler = new Laya.Handler(this, this.skinList_Scelet);
                Skin._SkinList.renderHandler = new Laya.Handler(this, this.skinList_Update);
                this.skinList_refresh();
            }
            /**list选中监听*/
            skinList_Scelet(index: number): void { }
            /**list列表刷新*/
            skinList_Update(cell: Laya.Box, index: number): void { }
            /**刷新list数据,重写覆盖，默认为皮肤*/
            skinList_refresh(): void {
                if (Skin._SkinList && _skinClassArr.length > 1) {
                    Skin._SkinList.array = _skinClassArr[0];
                    Skin._SkinList.refresh();
                }
            }
        }
    }
    /**对游戏总的一些彩蛋进行管理*/
    export module EasterEgg {
        /**彩蛋1任务集合*/
        export let _easterEgg_1Arr: Array<any> = [];

        /**彩蛋1是否已经被触发*/
        export let _easterEgg_1 = {
            get value(): boolean {
                if (!Laya.LocalStorage.getItem('_easterEgg_01')) {
                    return false;
                } else {
                    return true;
                }
            },
            set value(val: boolean) {
                Laya.LocalStorage.setItem('_easterEgg_01', val.toString());
            }
        };
        /**彩蛋1是否达成*/
        export let _easterEgg_1Complete: boolean;

        /**初始化彩蛋模块*/
        export function initEasterEgg(): void {
            _easterEgg_1Arr = Tools.jsonCompare("GameData/EasterEgg/EasterEgg.json", Classify.EasterEgg_01, Property.name);
            Laya.loader.getRes("GameData/EasterEgg/EasterEgg.json")['RECORDS'];
        }

        /**
         * 获取一个彩蛋中的某个属性信息
         * @param className 彩蛋种类
         * @param name 某个任务名称
         * @param property 属性名
         * */
        export function getProperty(classify: string, name: string, property: string): any {
            let pro = null;
            let arr = getClassArr(classify);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['name'] === name) {
                    pro = element[property];
                    break;
                }
            }
            if (pro !== null) {
                return pro;
            } else {
                console.log(name + '找不到属性:' + property, pro);
                return null;
            }
        }

        /**
         * 设置某个彩蛋的某个属性，并且返回这个值
         * @param classify 彩蛋种类
         * @param name 彩蛋中某个任务名称
         * @param property 彩蛋属性
         * @param value 属性值
        */
        export function setProperty(classify: string, name: string, property: string, value: any): void {
            let arr = getClassArr(classify);
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element['name'] === name) {
                    element[property] = value;
                    break;
                }
            }
            let data = {};
            data[classify] = arr;
            Laya.LocalStorage.setJSON(classify, JSON.stringify(data));
        }

        /**根据彩蛋类型返回一个彩蛋的所有任务*/
        export function getClassArr(classify: string): Array<any> {
            let arr = [];
            switch (classify) {
                case Classify.EasterEgg_01:
                    arr = _easterEgg_1Arr;
                    break;
                default:
                    break;
            }
            return arr;
        }

        /** 
         * 通过resCondition/condition，做任务并且完成了这次任务，然后检总进度是否完成,返回是否完成
        * @param classify 任务种类
        * @param name 任务名称
        * @param number 做几次任务，不传则默认为0次，不传则是检测完成状况
        */
        export function doDetection(classify: string, name: string, number?: number): any {
            if (!number) {
                number = 0;
            }
            let resCondition = getProperty(classify, name, Property.resCondition);
            let condition = getProperty(classify, name, Property.condition);
            if (!getProperty(classify, name, Property.complete)) {
                if (condition <= resCondition + number) {
                    setProperty(classify, name, Property.resCondition, condition);
                    setProperty(classify, name, Property.complete, true);
                    console.log(getProperty(classify, name, Property.complete));
                    return true;
                } else {
                    setProperty(classify, name, Property.resCondition, resCondition + number);

                    return false;
                }
            } else {
                return true;
            }
        }

        /**
         * 检测所有彩蛋任务是否完成,完成则返回1，没有完成则返回0
         * @param classify 哪一个彩蛋
         * */
        export function detectAllTasks(classify: string): number {
            let num = 1;
            let arr = getClassArr(classify);
            for (const key in arr) {
                if (arr.hasOwnProperty(key)) {
                    const element = arr[key];
                    let resCondition = getProperty(classify, element.name, Property.resCondition);
                    let condition = getProperty(classify, element.name, Property.condition);
                    if (condition > resCondition) {
                        num = 0;
                    }
                }
            }
            if (num == 1) {
                console.log(classify, '完成了！');
            } else {
                console.log(classify, '没有完成！');
            }
            return num;
        }

        /**奖励类型*/
        export enum rewardType {
            gold = 'gold',
            diamond = 'diamond',
            /**部件*/
            assembly = 'assembly',
        }

        /**
         * 彩蛋中通用属性
         */
        export enum Property {
            /**名称*/
            name = 'name',
            /**彩蛋描述*/
            explain = 'explain',
            /**需要完成任务的总数*/
            condition = 'condition',
            /**根据获取途径，剩余需要条件的数量，会平凡改这个数量*/
            resCondition = 'resCondition',
            /**是否完成*/
            complete = 'complete',
        }

        /**彩蛋列表种类*/
        export enum Classify {
            EasterEgg_01 = 'EasterEgg_01',
        }

        /**彩蛋中的任务名称*/
        export enum Name {
            assembly_1 = 'assembly_1',
            assembly_2 = 'assembly_2',
            assembly_3 = 'assembly_3',
            assembly_4 = 'assembly_4',
            assembly_5 = 'assembly_5',
        }

        /**彩蛋模块事件类型*/
        export enum EventType {
            /**触发彩蛋*/
            trigger = 'trigger',
            /**看广告完成任务*/
            easterEggAds = 'easterEggAds',
        }

        /**彩蛋场景继承类*/
        export class EasterEggScene extends Admin.Scene {
            moduleOnAwake(): void {
            }
            /**初始化json数据*/
            moduleOnEnable(): void {

            }
            moduleEventReg(): void {

            }
        }
    }

    /**胜利模块*/
    export module Victory {
        export class VictoryScene extends Admin.Scene {
            moduleOnAwake(): void {

            };
            moduleEventReg(): void {

            };
            moduleOnEnable(): void {

            };
        }
    }
    /**失败模块*/
    export module Defeated {
        export class DefeatedScene extends Admin.Scene {
            moduleOnAwake(): void {

            };
            moduleEventReg(): void {

            };
            moduleOnEnable(): void {

            };
        }
    }

    /**抽卡模块*/
    export module DrawCard {

        /**
         * 当前免费抽奖看广告次数
         * */
        export let _freeAds = {
            get num(): number {
                return Laya.LocalStorage.getItem('DrawCard_freeAdsNum') ? Number(Laya.LocalStorage.getItem('DrawCard_freeAdsNum')) : 0;
            },
            set num(val) {
                Laya.LocalStorage.setItem('DrawCard_freeAdsNum', val.toString());
            }
        }

        /**
         * 剩余抽奖次数,初始化为2次
         */
        export let _residueDraw = {
            get num(): number {
                return Laya.LocalStorage.getItem('DrawCard_residueDraw') ? Number(Laya.LocalStorage.getItem('DrawCard_residueDraw')) : 2;
            },
            set num(val) {
                Laya.LocalStorage.setItem('DrawCard_residueDraw', val.toString());
            }
        };

        /**抽奖场景*/
        export class DrawCardScene extends Admin.Scene {
            moduleOnAwake(): void {

            };
            moduleEventReg(): void {

            };
            moduleOnEnable(): void {

            };
        }
    }

    /**
     * 分享模块
     */
    export module Share {

        /**从哪个界面弹出的分享*/
        export let _fromWhich: string = Admin.SceneName.UIVictory;

        export class ShareScene extends Admin.Scene {
            moduleOnAwake(): void {

            };
            moduleEventReg(): void {

            };
            moduleOnEnable(): void {

            };
        }
    }

    /**道具试用模块*/
    export module PropTry {
        export class PropTryScene extends Admin.Scene {
            moduleOnAwake(): void {

            };
            moduleEventReg(): void {

            };
            moduleOnEnable(): void {

            };
        }
    }

    /**背包系统*/
    export module Backpack {
        /**特殊道具1*/
        export let _prop1 = {
            get num(): number {
                return Laya.LocalStorage.getItem('Backpack_prop1') ? Number(Laya.LocalStorage.getItem('Backpack_prop1')) : 1;
            },
            set num(val) {
                Laya.LocalStorage.setItem('Backpack_prop1', val.toString());
            }
        }
        /**特殊道具2*/
        export let _prop2 = {
            get num(): number {
                return Laya.LocalStorage.getItem('Backpack_prop2') ? Number(Laya.LocalStorage.getItem('Backpack_prop2')) : 1;
            },
            set num(val) {
                Laya.LocalStorage.setItem('Backpack_prop2', val.toString());
            }
        }
        /**
         * 道具数组,对象数组的数组
         * */
        export let _backpackArray: Array<Array<{}>> = [];

        export class BackpackScene extends Admin.Scene {
            moduleOnAwake(): void {

            };
            moduleEventReg(): void {

            };
            moduleOnEnable(): void {

            };
        }

    }

    export module Loding {
        /**3D场景的加载，其他3D物体，贴图，Mesh详见：  https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-1   */
        export let list_3DScene: Array<any> = [];
        /**3D预设的加载，其他3D物体，贴图，Mesh详见：  https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-1   */
        export let list_3DPrefab: Array<any> = [];
        /**模型网格详见：  https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-1   */
        export let list_3DMesh: Array<any> = [];
        /**材质详见：  https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-1   */
        export let lolist_3DBaseMaterial: Array<any> = [];
        /**纹理加载详见：  https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-1   */
        export let list_3DTexture2D: Array<any> = [];

        /**需要加载的图片资源列表,一般是界面的图片*/
        export let list_2DPic: Array<any> = [];
        /**2D场景*/
        export let list_2DScene: Array<any> = [];
        /**2D预制体*/
        export let list_2DPrefab: Array<any> = [];

        /**数据表、场景和预制体的加载，在框架中，json数据表为必须加载的项目*/
        export let list_JsonData: Array<any> = [];

        /**进度条总长度,长度为以上三个加载资源类型的数组总长度*/
        export let sumProgress: number = 0;
        /**加载顺序依次为3d,2d,数据表，可修改*/
        export let loadOrder: Array<any>[];
        /**当前加载到哪个分类数组*/
        export let loadOrderIndex: number;

        /**当前进度条进度,起始位0，每加载成功1个资源，则加1,currentProgress.value / sumProgress为进度百分比*/
        export let currentProgress = {
            p: 0,
            /**获取进度条的数量值，currentProgress.value / sumProgress为进度百分比*/
            get value(): number {
                return this.p;
            },
            /**设置进度条的值*/
            set value(v: number) {
                this.p = v;
                if (this.p >= sumProgress) {
                    console.log('当前进度条进度为:', currentProgress.value / sumProgress);
                    console.log('进度条停止！');
                    console.log('所有资源加载完成！此时所有资源可通过例如 Laya.loader.getRes("Data/levelsData.json")获取')
                    EventAdmin.notify(Loding.LodingType.complete);
                } else {
                    // 当前进度达到当前长度节点时,去到下一个数组加载
                    let number = 0;
                    for (let index = 0; index <= loadOrderIndex; index++) {
                        number += loadOrder[index].length;
                    }
                    if (this.p === number) {
                        loadOrderIndex++;
                    }
                    EventAdmin.notify(Loding.LodingType.loding);
                }
            },
        };

        /**加载事件类型*/
        export enum LodingType {
            complete = 'complete',
            loding = 'loding',
            progress = 'progress',
        }

        export class LodingScene extends Admin.Scene {
            moduleOnAwake(): void {
                DateAdmin._loginNumber.value++;
                console.log('玩家登陆的天数为：', DateAdmin._loginDate.value.length, '天');
            }
            moduleEventReg(): void {
                EventAdmin.reg(LodingType.loding, this, () => { this.lodingRule() });

                EventAdmin.reg(LodingType.complete, this, () => {
                    let time = this.lodingComplete();
                    PalyAudio.playMusic();
                    Laya.timer.once(time, this, () => { Admin._openScene(Admin.SceneName.LwgInit, this.self) })
                });

                EventAdmin.reg(LodingType.progress, this, (skip) => {
                    currentProgress.value++;
                    if (currentProgress.value < sumProgress) {
                        console.log('当前进度条进度为:', currentProgress.value / sumProgress);
                        this.lodingPhaseComplete();
                    }
                });
            }
            moduleOnEnable(): void {
                loadOrder = [list_2DPic, list_2DScene, list_2DPrefab, list_3DScene, list_3DPrefab, list_JsonData];
                for (let index = 0; index < loadOrder.length; index++) {
                    sumProgress += loadOrder[index].length;
                    if (loadOrder[index].length <= 0) {
                        loadOrder.splice(index, 1);

                        index--;
                    }
                }
                loadOrderIndex = 0;
                let time = this.lwgOpenAni();
                if (time == null) {
                    time = 0;
                }
                Laya.timer.once(time, this, () => {
                    EventAdmin.notify(Loding.LodingType.loding);
                })
            }

            /**根据加载顺序依次加载,第一次加载将会在openAni动画结束之后*/
            private lodingRule(): void {
                if (loadOrder.length <= 0) {
                    console.log('没有加载项');
                    return;
                }
                // 已经加载过的分类数组的长度
                let alreadyPro: number = 0;
                for (let i = 0; i < loadOrderIndex; i++) {
                    alreadyPro += loadOrder[i].length;
                }
                //获取到当前分类加载数组的下标 
                let index = currentProgress.value - alreadyPro;

                switch (loadOrder[loadOrderIndex]) {
                    case list_2DPic:

                        Laya.loader.load(list_2DPic[index], Laya.Handler.create(this, (any) => {
                            if (any == null) {
                                console.log('XXXXXXXXXXX2D资源' + list_2DPic[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                            } else {
                                console.log('2D图片' + list_2DPic[index] + '加载完成！', '数组下标为：', index);
                            }
                            EventAdmin.notify(LodingType.progress);
                        }));
                        break;

                    case list_2DScene:
                        Laya.loader.load(list_2DScene[index], Laya.Handler.create(this, (any) => {
                            if (any == null) {
                                console.log('XXXXXXXXXXX数据表' + list_2DScene[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                            } else {
                                console.log('2D场景' + list_2DScene[index] + '加载完成！', '数组下标为：', index);
                            }
                            EventAdmin.notify(LodingType.progress);

                        }), null, Laya.Loader.JSON);
                        break;

                    case list_2DPrefab:
                        Laya.loader.load(list_2DPrefab[index], Laya.Handler.create(this, (any) => {
                            if (any == null) {
                                console.log('XXXXXXXXXXX数据表' + list_2DPrefab[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                            } else {
                                console.log('2D预制体' + list_2DPrefab[index] + '加载完成！', '数组下标为：', index);
                            }
                            EventAdmin.notify(LodingType.progress);

                        }), null, Laya.Loader.JSON);
                        break;

                    case list_3DScene:
                        Laya.Scene3D.load(list_3DScene[index], Laya.Handler.create(this, (any) => {
                            if (any == null) {
                                console.log('XXXXXXXXXXX3D场景' + list_3DScene[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                            } else {
                                console.log('3D场景' + list_3DScene[index] + '加载完成！', '数组下标为：', index);
                            }
                            EventAdmin.notify(LodingType.progress);

                        }));
                        break;
                    case list_3DPrefab:
                        Laya.Sprite3D.load(list_3DPrefab[index], Laya.Handler.create(this, (any) => {
                            if (any == null) {
                                console.log('XXXXXXXXXXX3D预设体' + list_3DPrefab[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                            } else {
                                console.log('3D预制体' + list_3DPrefab[index] + '加载完成！', '数组下标为：', index);
                            }
                            EventAdmin.notify(LodingType.progress);

                        }));
                        break;
                    case list_JsonData:
                        Laya.loader.load(list_JsonData[index], Laya.Handler.create(this, (any) => {
                            if (any == null) {
                                console.log('XXXXXXXXXXX数据表' + list_JsonData[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                            } else {
                                console.log('数据表' + list_JsonData[index] + '加载完成！', '数组下标为：', index);
                            }
                            EventAdmin.notify(LodingType.progress);

                        }), null, Laya.Loader.JSON);
                        break;

                    default:
                        break;
                }
            }
            /**每个资源加载成功后，进度条每次增加后的回调，第一次加载将会在openAni动画结束之后*/
            lodingPhaseComplete(): void { }
            /**资源全部加载完成回调,每个游戏不一样,此方法执行后，自动进入UIStrat界面，可以延时进入*/
            lodingComplete(): number { return 0 };
        }
    }

    /**开始游戏模块*/
    export module Start {
        export class StartScene extends Admin.Scene {
            moduleOnAwake(): void {

            }
            moduleOnEnable(): void {

            }
            moduleEventReg(): void {
            }
        }
    }

    export module Tomato {
        /**场景打点类型*/
        export enum scenePointType {
            open = 'open',
            close = 'close',
        }
        /**
        * 场景打点,记录玩家进场景和出场景的次数
        * @param type 两种类型，一种是离开打点，一种是进入打点
        * @param sceneName 场景名称
        */
        export function scenePrintPoint(sceneName: string, type: string): void {
            // switch (sceneName) {
            //     case Admin.SceneName.UILoding:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'UIPreload');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'UIPreload');
            //         }
            //         break;
            //     case Admin.SceneName.UIStart:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'mianpage');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'mianpage');
            //         }
            //         break;
            //     case Admin.SceneName.UIVictory:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'successpage');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'successpage');
            //         }
            //         break;

            //     case Admin.SceneName.UIDefeated:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'failpage');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'failpage');
            //         }
            //         break;

            //     case Admin.SceneName.UIResurgence:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'revivepage');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'revivepage');
            //         }
            //         break;
            //     case Admin.SceneName.UISkinXD:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'limmitpage');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'limmitpage');
            //         }
            //         break;
            //     case Admin.SceneName.UIShare:
            //         if (type === scenePointType.open) {
            //             ADManager.TAPoint(TaT.PageEnter, 'sharepage');
            //         } else if (type === scenePointType.close) {
            //             ADManager.TAPoint(TaT.PageLeave, 'sharepage');
            //         }
            //         break;
            //     default:

            //         break;
            // }
        }
        /**按钮打点类型*/
        export enum btnPointType {
            show = 'show',
            click = 'click',
        }
        /**按钮打点*/
        export function btnPrintPoint(): void {

        }
    }
}

export default lwg;
// 全局控制
export let Admin = lwg.Admin;
export let EventAdmin = lwg.EventAdmin;
export let DateAdmin = lwg.DateAdmin;
export let TimerAdmin = lwg.TimerAdmin;
export let Pause = lwg.Pause;
export let Execution = lwg.Execution;
export let Gold = lwg.Gold;
export let Setting = lwg.Setting;
export let PalyAudio = lwg.PalyAudio;
export let Click = lwg.Click;
export let Effects = lwg.Effects;
export let Dialog = lwg.Dialog;
export let Animation2D = lwg.Animation2D;
export let Animation3D = lwg.Animation3D;
export let Tools = lwg.Tools;
export let Elect = lwg.Elect;
//场景相关 
export let Loding = lwg.Loding;
export let LodeScene = lwg.Loding.LodingScene;
export let Shop = lwg.Shop;
export let ShopScene = lwg.Shop.ShopScene;
export let Task = lwg.Task;
export let TaskScene = lwg.Task.TaskScene;
export let VictoryBox = lwg.VictoryBox;
export let VictoryBoxScene = lwg.VictoryBox.VictoryBoxScene;
export let CheckIn = lwg.CheckIn;
export let CheckInScene = lwg.CheckIn.CheckInScene;
export let SkinQualified = lwg.SkinQualified;
export let SkinXDScene = lwg.SkinQualified.SkinQualifiedScene;
export let Skin = lwg.Skin;
export let SkinScene = lwg.Skin.SkinScene;
export let EasterEgg = lwg.EasterEgg;
export let Start = lwg.Start;
export let StartScene = lwg.Start.StartScene;
export let Victory = lwg.Victory;
export let VictoryScene = lwg.Victory.VictoryScene;
export let Defeated = lwg.Defeated;
export let DefeatedScene = lwg.Defeated.DefeatedScene;
export let DrawCard = lwg.DrawCard;
export let DrawCardScene = lwg.DrawCard.DrawCardScene;
export let Share = lwg.Share;
export let ShareScene = lwg.Share.ShareScene;
export let PropTry = lwg.PropTry;
export let PropTryScene = lwg.PropTry.PropTryScene;
export let Backpack = lwg.Backpack;
export let BackpackScene = lwg.Backpack.BackpackScene;
// 其他
export let Tomato = lwg.Tomato;


