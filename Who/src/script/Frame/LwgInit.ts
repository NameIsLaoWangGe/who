import { Skin, Shop, Task, Admin, EventAdmin, EasterEgg, Loding, Setting, Gold, CheckIn, TimerAdmin, Backpack, DrawCard } from "./lwg";
import { Game3D } from "../Game/Game3D";
import { Guide } from "./Guide";
import UIDrawCard from "../Game/UIDrawCard";
import ZJADMgr from "../../TJ/ZJADMgr";

export module LwgInit {
    export class LwgInitScene extends Admin.Scene {
        moduleOnAwake(): void {
            //如果加载时间过长，可以复制loding页面的内容到init界面
            this.admin();
            this.game3D();
            this.checkIn();
            this.shop();
            this.skin();
            this.task();
            this.easterEgg();
            Setting.createSetBtn(64, 96, 82, 82, 'UI/UIStart/shezhi.png');
        }
        moduleOnEnable(): void {
        }
        moduleEventReg(): void {
        }

        /**基础参数初始化*/
        admin(): void {
            Admin._commonVanishAni = true;
            Admin._platform = Admin._platformTpye.Bytedance;
        }
        /**3D模块初始化*/
        game3D(): void {
            Game3D.dataInit();
            Game3D.Scene3D = Laya.loader.getRes(Loding.list_3DScene[0]);
            Laya.stage.addChild(Game3D.Scene3D);
            Game3D.Scene3D.addComponent(Game3D.MainScene);
        }
        /**签到初始化*/
        checkIn(): void {
            CheckIn.init();
        }
        /**皮肤初始化*/
        skin(): void {
        }
        /**商店初始化*/
        shop(): void {
        }
        /**任务始化*/
        task(): void {
        }
        /**彩蛋始化*/
        easterEgg(): void {
        }
    }
}
export default class UILwgInit extends LwgInit.LwgInitScene {
    lwgOnEnable(): void {
        new ZJADMgr();
        console.log('完成初始化');
        console.log('是否进行过新手引导：', Guide._complete.bool);
        if (Guide._complete.bool) {
            Admin._openScene(Admin.SceneName.UIStart, this.self);
        } else {
            Backpack._haveCardArray.arr = [];
            DrawCard._drawCount.num = 0;
            DrawCard._residueDraw.num = 2;
            Admin._openScene(Admin.SceneName.UIDrawCard, this.self, () => {
                let caller = {};
                TimerAdmin.frameLoop(1, caller, () => {
                    if (Laya.stage.getChildByName('UIDrawCard')) {
                        Laya.timer.clearAll(caller);
                        Admin._openScene(Admin.SceneName.UIGuide);
                    }
                })
            });
        }
    }
}