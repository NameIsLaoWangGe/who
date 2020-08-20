import { Skin, Shop, Task, Admin, EventAdmin, EasterEgg } from "./lwg";
import { Game } from "./Game";

export default class Init extends Admin.Scene {
    lwgOnAwake(): void {
        console.log('开始初始化');
        this.gameInit();
        this.shopInit();
        this.skinInit();
        this.taskInit();
        this.easterEggInit();
    }
    gameInit(): void {
        Game._platform = Game._platformTpye.Bytedance;
    };
    skinInit(): void {
        Skin._currentEye.name = null;
        Skin._currentHead.name = null;
    };
    /**商店初始化*/
    shopInit(): void {
        Shop.initShop();
        if (!Shop._currentOther.name) {
            Shop._currentOther.name = 'tixudao';
        }
        if (!Shop._currentProp.name) {
            Shop._currentProp.name = 'jiandao';
        }
        if (!Shop._currentSkin.name) {
            Shop._currentSkin.name = 'anquanmao';
        }
    };
    /**任务始化*/
    taskInit(): void {
        Task.initTask();
        EventAdmin.reg(Task.EventType.useSkins, Task, () => {
            let num = Shop.setUseSkinType();
            let name = Task.TaskName.每日使用5种皮肤;
            let num1 = Task.getTaskProperty(Task.TaskClass.everyday, name, Task.TaskProperty.resCondition);
            if (num > num1) {
                Task.doDetectionTask(Task.TaskClass.everyday, name, num - num1);
            }
        });
        EventAdmin.reg(Task.EventType.victory, Task, () => {
            let name = Task.TaskName.每日服务10位客人;
            Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
        })
        EventAdmin.reg(Task.EventType.adsTime, Task, () => {
            let name = Task.TaskName.每日观看两个广告;
            Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
        })
        EventAdmin.reg(Task.EventType.victoryBox, Task, () => {
            let name = Task.TaskName.每日开启10个宝箱;
            Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
        })
    }
    /**彩蛋始化*/
    easterEggInit(): void {
        EasterEgg.initEasterEgg();
        EventAdmin.reg(EasterEgg.EventType.easterEggAds, Task, () => {
            EasterEgg.doDetection(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_3, 1);
        })
    }
}