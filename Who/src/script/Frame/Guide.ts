import { Admin, Click, EventAdmin, Tools, Animation2D, TimerAdmin } from "./lwg";
/**测试模块,每个模块分开，默认导出一个类，这个类是默认挂载的脚本类，如果有多个脚本，
 * 那么在这个默认类中进行添加，或者在其他地方动态添加*/
export module Guide {

    /**是否完成了新手引导*/
    export let _complete = {
        get bool(): number | any {
            if (Laya.LocalStorage.getItem('Guide_complete')) {
                if (Number(Laya.LocalStorage.getItem('Guide_complete')) == 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false
            }
        },
        set bool(bol: number | any) {
            if (bol == true) {
                bol = 1;
            }
            Laya.LocalStorage.setItem('Guide_complete', bol.toString());
        }
    }

    /**新手引导进行到哪一步了*/
    // export let _whichStep = {
    //     get num(): number {
    //         return Laya.LocalStorage.getItem('Guide_whichStep') ? Number(Laya.LocalStorage.getItem('Guide_whichStep')) : 1;
    //     },
    //     set num(num0: number) {
    //         Laya.LocalStorage.setItem('Guide_whichStep', num0.toString());
    //     }
    // };
    /**新手引导进行到哪一步了*/
    export let _whichStepNum: number = 1;


    /**事件类型，必须枚举,因为有可能在全局使用,命名必须使用模块名称+事件名称*/
    export enum EventType {
        /**下一步*/
        next = 'Guide_next',
        /**隐藏*/
        hint = 'Guide_hint',
        /**出现*/
        appear = 'Guide_appear',
        /**开始引导*/
        start = 'Guide_start',
        /**关闭引导界面*/
        close = 'Guide_close',
    }
    /**通用类，进行通用初始化，可在每个游戏中重复使用重复*/
    export class GuideScene extends Admin.Scene {
        // moduleOnAwake(): void {
        // }
        // moduleOnEnable(): void {
        // }
        // moduleEventReg(): void {
        // }
    }
}
/**可以手动挂在脚本中的类，全脚本唯一的默认导出，也可动态添加，动态添加写在模块内更方便*/
export default class UIGuide extends Guide.GuideScene {

    lwgOnEnable(): void {
        this.self['Background'].alpha = 0;
        this.self['Hand'].alpha = 0;
        EventAdmin.notify(Guide.EventType.next);
    }
    lwgEventReg(): void {
        /**第一次十连抽*/
        var step1 = () => {
            TimerAdmin.loop(10, this, () => {
                if (!this['timeCount']) {
                    let DrawCanvas = new Laya.Sprite();
                    DrawCanvas.name = 'DrawCanvas';
                    this.self['Hand'].addChild(DrawCanvas);
                    this['timeCount'] = 1;
                } else {
                    let DrawCanvas = this.self['Hand'].getChildByName('DrawCanvas');
                    this['timeCount']++;
                    if (this['timeCount'] >= 260) {
                        this['timeCount'] = false;
                        this['drawLinePos'] = false;
                        DrawCanvas.removeSelf();
                    } else {
                        if (!this['drawLinePos']) {
                            this['drawLinePos'] = new Laya.Point(this.self['Handpic'].x, this.self['Handpic'].y);
                        } else {
                            DrawCanvas.graphics.drawLine(this['drawLinePos'].x, this['drawLinePos'].y, this.self['Handpic'].x, this.self['Handpic'].y, "#000000", 8);
                            DrawCanvas.graphics.drawCircle(this.self['Handpic'].x, this.self['Handpic'].y, 4, "#000000");
                            this['drawLinePos'] = new Laya.Point(this.self['Handpic'].x, this.self['Handpic'].y);
                        }
                    }
                }
            })
            EventAdmin.notify(Guide.EventType.appear);
            this.self['Hand'].pos(175, 500);
            this.self["Draw"].play(0, true);
            Tools.Draw.reverseRoundMask(this.self['Background'], 360, 598, 350, true);
        }
        /**第一次收取卡牌*/
        var step2 = () => {
            EventAdmin.notify(Guide.EventType.appear);
            this.self['Hand'].pos(360, 1161);
            this.self["Click"].play(0, true);
            Tools.Draw.reverseRoundrectMask(this.self['Background'], 360, 1161, 320, 150, 40, true);
        }
        /**第二次十连抽*/
        var step3 = () => {
            step1();
        }
        /**第二次收取卡牌*/
        var step4 = () => {
            step2();
        }
        /**关闭当前场景*/
        var step5 = () => {
            Guide._complete.bool = true;
            EventAdmin.notify(Guide.EventType.appear);
            this.self['Hand'].pos(68, 102);
            this.self["Click"].play(0, true);
            Tools.Draw.reverseRoundMask(this.self['Background'], 68, 102, 60);
        }
        // 点击卡牌展示界面
        var step6 = () => {

        }
        // 点击签到
        var step7 = () => {

        }
        // 点击开始游戏
        var step7 = () => {

        }
        EventAdmin.reg(Guide.EventType.next, this, () => {
            Laya.timer.once(500, this, () => {
                console.log('新手引导到了第：', Guide._whichStepNum + '步了');
                switch (Guide._whichStepNum) {
                    case 1:
                        step1();
                        break;
                    case 2:
                        step2()
                        break;
                    case 3:
                        step3();
                        break;
                    case 4:
                        step4();
                        break;
                    case 5:
                        step5();
                        break;
                    default:
                        break;
                }
                Guide._whichStepNum++;
            })
        })
        EventAdmin.reg(Guide.EventType.appear, this, () => {
            Animation2D.fadeOut(this.self['Hand'], 0, 1, 300);
            Animation2D.fadeOut(this.self['Background'], 0, 0.5, 300);
        })
        EventAdmin.reg(Guide.EventType.hint, this, () => {
            Animation2D.fadeOut(this.self['Hand'], 1, 0, 300);
            Animation2D.fadeOut(this.self['Background'], 0.5, 0, 300, 0, () => {
                (this.self["Draw"] as Laya.Animation).stop();
                (this.self["Click"] as Laya.Animation).stop();
            });
        })
        EventAdmin.reg(Guide.EventType.close, this, () => {
            Admin._closeScene(this.self);
            console.log('关闭引导场景！');
        })
    }


}

