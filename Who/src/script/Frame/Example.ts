import { Admin } from "./lwg";

/**测试模块,每个模块分开，默认导出一个类，这个类是默认挂载的脚本类，如果有多个脚本，
 * 那么在这个默认类中进行添加，或者在其他地方动态添加*/
export module Example {

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

    /**本地存储变量格式*/
    export let variable = {
        get value(): number | any {
            return Laya.LocalStorage.getItem('Example_variable') ? Number(Laya.LocalStorage.getItem('Example_variable')) : null;
        },
        set value(date: number | any) {
            Laya.LocalStorage.setItem('Example_variable', date.toString());
        }
    }

    /**
      * 数组存储
      */
    export let _arrayData = {
        get arr(): Array<string> {
            return Laya.LocalStorage.getJSON('Example__array') ? JSON.parse(Laya.LocalStorage.getJSON('Example__array')) : [];
        },

        set arr(array: Array<string>) {
            Laya.LocalStorage.setJSON('Example__array', JSON.stringify(array));
        },
    }

    /**普通变量必须初始化*/
    export let anyVariable: any;

    /**事件类型，必须枚举,因为有可能在全局使用,命名必须使用模块名称+事件名称*/
    export enum EventType {
        event1 = 'Example_Event1',
        event2 = 'Example_Event2',
    }

    /**全模块中的临时变量可能在其他地方使用，所以在必要的时候枚举*/
    export enum AnyVariableEnum {
        thisVariable1 = 'thisVariable1',
        thisVariable2 = 'thisVariable2',
    }

    /**通用类，进行通用初始化，可在每个游戏中重复使用重复*/
    export class ExampleScene extends Admin.Scene {
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
export default class UIExample extends Example.ExampleScene {
    lwgOnAwake(): void {
        // 模块中临时变量赋值方法,这种赋值必须只用在当前脚本，否则必须枚举
        Example['name'] = '大王哥';
        console.log(Example, parent, Example['name']);
        // 类中
        this['name'] = '老王哥';
        console.log(this, this['name']);
        // 数据表
        Example.data.getFunc2('any');
        Example.data.setFunc2('测试设置');
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

