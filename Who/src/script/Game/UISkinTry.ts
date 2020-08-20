import { lwg, Admin, Shop, Click, Setting, EventAdmin } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import { Game } from "../Lwg_Template/Game";

export default class UISkinTry extends Admin.Scene {

    lwgOnAwake(): void {
        this.randomNoHave();

        if (Game._platform == Game._platformTpye.OPPO) {
            this.self['BtnGet_OPPO'].visible = true;
            this.self['BtnGet_WeChat'].visible = false;
        } else {
            this.self['BtnGet_OPPO'].visible = false;
            this.self['BtnGet_WeChat'].visible = true;
        }
    }

    beforeTryOtherName: string;
    beforeTryPropName: string;
    /**随机出一个和当前皮肤不一样的皮肤放在加载位置*/
    randomNoHave(): void {
        let arrOther = Shop.getwayGoldArr(Shop.GoodsClass.Other, undefined, true);
        let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
        let ele;
        let hair;
        let beard;
        // 查看当前关卡状况
        for (let index = 0; index < GVariate._taskArr.length; index++) {
            const element = GVariate._taskArr[index];
            if (element === GEnum.TaskType.HairParent) {
                hair = true;
            } else if (element === GEnum.TaskType.LeftBeard || element === GEnum.TaskType.RightBeard || element === GEnum.TaskType.UpLeftBeard || element === GEnum.TaskType.UpRightBeard || element === GEnum.TaskType.MiddleBeard) {
                beard = true;
            }
        }

        if (hair) {
            console.log('本关有剃头任务！');
        }
        if (beard) {
            console.log('本关剃胡须任务！');
        }

        if (hair && beard) {
            if (Math.floor(Math.random() * 2) === 1) {
                this.randomProp();
            } else {
                this.randomOther();
            }
        } else if (hair && !beard) {
            this.randomProp();
        } else if (!hair && beard) {
            this.randomOther();
        }
    }

    /**随机剃头道具*/
    randomOther(): void {
        let ele;
        let arrOther = Shop.getwayGoldArr(Shop.GoodsClass.Other, undefined, true);
        ele = arrOther[Math.floor(Math.random() * arrOther.length)];
        this.self['SkinPic'].skin = 'UI/Shop/Other/' + ele.name + '.png';
        this.beforeTryOtherName = Shop._currentOther.name;
        Shop._currentOther.name = ele.name;
    }

    /**随机剃头道具*/
    randomProp(): void {
        let ele;
        let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
        ele = arrProp[Math.floor(Math.random() * arrProp.length)];
        this.self['SkinPic'].skin = 'UI/Shop/Props/' + ele.name + '.png';
        this.beforeTryPropName = Shop._currentProp.name;
        Shop._currentProp.name = ele.name;
    }

    lwgBtnClick(): void {
        Click.on(lwg.Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp);
        Click.on(lwg.Click.Type.largen, this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
        Click.on(lwg.Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);

    }

    btnGetUp(event): void {
        if (Game._platform == Game._platformTpye.OPPO) {
            Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
            EventAdmin.notify(GEnum.EventType.changeOther);
            EventAdmin.notify(GEnum.EventType.changeProp);
        } else {
            ADManager.ShowReward(() => {
                Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
                EventAdmin.notify(GEnum.EventType.changeOther);
                EventAdmin.notify(GEnum.EventType.changeProp);
            })
        }
    }

    btnNoUp(event): void {
        if (this.beforeTryOtherName) {
            Shop._currentOther.name = this.beforeTryOtherName;
        }
        if (this.beforeTryPropName) {
            Shop._currentProp.name = this.beforeTryPropName;
        }
        Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
        EventAdmin.notify(GEnum.EventType.changeOther);
        EventAdmin.notify(GEnum.EventType.changeProp);
    }

    lwgOnDisable(): void {
        if (this.beforeTryOtherName) {
            Shop._currentOther.name = this.beforeTryOtherName;
        }
        if (this.beforeTryPropName) {
            Shop._currentProp.name = this.beforeTryPropName;
        }
    }
}