import { Admin, EventAdmin, TimerAdmin } from "./lwg";

/**测试模块,每个模块分开，默认导出一个类，这个类是默认挂载的脚本类，如果有多个脚本，
 * 那么在这个默认类中进行添加，或者在其他地方动态添加*/
export module Guide {

    /**数据表和其中的数据增删改查*/
    export let data = {
        da: 'data',
        /**对表格整体取值*/
        get array(): Array<any> {
            return [];
        },
        /**对表格整体修改替换*/
        set array(arr: Array<any>) {

        },
        // 获取方法
        getFunc1: (): any => {
            return '测试1';
        },
        getFunc2: (any): any => {
            return;
        },
        // 设置方法
        setFunc1: () => {
        },
        setFunc2: (any) => {
            console.log(any);
        },
        // 检查方法
        checkFunc1: (bool): boolean => {
            return bool;
        },
        checkFunc2: (bool): boolean => {
            return bool;
        },
        // 临时属性赋值方法
        getTemporaryVariable: (): any => {
            if (!data['name']) {
                data['name'] = '王大哥';
            } else {
                return data['name'];
            }
        }
    }

    /**是否完成了新手引导*/
    export let _complete = {
        get bool(): number | any {
            return Laya.LocalStorage.getItem('Guide_complete') ? Number(Laya.LocalStorage.getItem('Guide_complete')) : 0;
        },
        set bool(date: number | any) {
            Laya.LocalStorage.setItem('Guide_complete', date.toString());
        }
    }

    /**普通变量必须初始化*/
    export let anyVariable: any;

    /**事件类型，必须枚举,因为有可能在全局使用,命名必须使用模块名称+事件名称*/
    export enum EventType {
        event1 = 'Example_Event1',
        event2 = 'Example_Event2',
    }

    export enum AnyVariableEnum {
        thisVariable1 = 'thisVariable1',
        thisVariable2 = 'thisVariable2',
    }

    /**通用类，进行通用初始化，可在每个游戏中重复使用重复*/
    export class GuideScene extends Admin.Scene {
        moduleOnAwake(): void {
        }
        moduleOnEnable(): void {
        }
        moduleEventReg(): void {
        }
    }
    /**其他类*/
    export class Singleton {

    }

}
/**可以手动挂在脚本中的类，全脚本唯一的默认导出，也可动态添加，动态添加写在模块内更方便*/
export default class UIGuide extends Guide.GuideScene {
    lwgOnAwake(): void {
        // let tl = (new Laya.Animation()).loadAnimation("Mirror.ui");
        console.log(this.self);
        // this.self('Mirror');
        // TimerAdmin.frameLoop(10, this, () => {
        //     console.log(this.self["Mirror"]);
        // })
        (this.self["Mirror"] as Laya.Animation).play(0, true);
    }
    lwgNodeDec(): void { }
    lwgOnEnable(): void { }
    lwgEventReg(): void { }
    lwgAdaptive(): void { }
    lwgOpenAni(): number { return 100; }
    lwgBtnClick(): void { }
    lwgVanishAni(): number { return 100; }
    lwgOnUpdate(): void { }
    lwgOnDisable(): void { }
}

