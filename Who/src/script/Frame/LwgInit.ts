import { Skin, Shop, Task, Admin, EventAdmin, EasterEgg } from "./lwg";
export default class LwgInit extends Admin.Scene {
    lwgOnAwake(): void {
        console.log('开始游戏每个模块的初始化');
        this.gameInit();
        this.shopInit();
        this.skinInit();
        this.taskInit();
        this.easterEggInit();
    }
    /**基础参数初始化*/
    gameInit(): void {

    };
    /**皮肤初始化*/
    skinInit(): void {

    };
    /**商店初始化*/
    shopInit(): void {

    };
    /**任务始化*/
    taskInit(): void {

    }
    /**彩蛋始化*/
    easterEggInit(): void {

    }
    lwgOnEnable(): void {
        console.log('完成初始化');
        Admin._openScene(Admin.SceneName.UIStart, this.self);
    }
}