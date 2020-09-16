import { Admin, Tools } from "../Frame/lwg";

export default class UISkinTry extends Admin.Scene {

    lwgOnAwake(): void {
        this.randomNoHave();
        Tools.node_2DShowExcludedChild(this.self['Platform'], [Admin._platformTpye.Bytedance], true);
        Tools.node_2DShowExcludedChild(this.self[Admin._platformTpye.Bytedance], [ZJADMgr.ins.shieldLevel], true);
        console.log(ZJADMgr.ins.shieldLevel);
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

    /**随机剪刀道具*/
    randomProp(): void {
        let ele;
        let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
        ele = arrProp[Math.floor(Math.random() * arrProp.length)];
        this.self['SkinPic'].skin = 'UI/Shop/Props/' + ele.name + '.png';
        this.beforeTryPropName = Shop._currentProp.name;
        Shop._currentProp.name = ele.name;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, this.self['Bytedance_Low_Select'], this, null, null, this.bytedanceSelectUp);
        Click.on(Click.Type.largen, this.self['Bytedance_Low_BtnGet'], this, null, null, this.bytedanceGetUp);

        Click.on(Click.Type.noEffect, this.self['Bytedance_Mid_Select'], this, null, null, this.bytedanceSelectUp);
        Click.on(Click.Type.largen, this.self['Bytedance_Mid_BtnGet'], this, null, null, this.bytedanceGetUp);

        Click.on(Click.Type.noEffect, this.self['ClickBg'], this, null, null, this.clickBgtUp);
        Click.on(Click.Type.largen, this.self['Bytedance_High_BtnGet'], this, null, null, this.btnGetUp);
        Click.on(Click.Type.largen, this.self['Bytedance_High_BtnNo'], this, null, null, this.btnNoUp);

        Click.on(Click.Type.largen, this.self['OPPO_BtnNo'], this, null, null, this.btnNoUp);
        Click.on(Click.Type.largen, this.self['OPPO_BtnGet'], this, null, null, this.btnGetUp);

        // Click.on(Click.Type.largen, this.self['WeChat_BtnNo'], this, null, null, this.btnNoUp);
        // Click.on(Click.Type.largen, this.self['WeChat_BtnGet'], this, null, null, this.btnGetUp);
    }

    clickBgtUp(): void {
        let Dot;
        if (this.self['Low'].visible) {
            Dot = this.self['Bytedance_Low_Dot'];
        } else if (this.self['Mid'].visible) {
            Dot = this.self['Bytedance_Mid_Dot'];
        }
        if (!Dot) {
            return;
        }
        if (Dot.visible) {
            this.advFunc();
        } else {
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
    }

    bytedanceGetUp(e: Laya.Event): void {
        e.stopPropagation();
        this.advFunc();
    }

    bytedanceSelectUp(e: Laya.Event): void {
        e.stopPropagation();
        if (this.self['Low'].visible) {
            if (!this.self['Low']['count']) {
                this.self['Low']['count'] = 0;
            }
            this.self['Low']['count']++;
            if (this.self['Low']['count'] >= 4) {
                if (this.self['Bytedance_Low_Dot'].visible) {
                    this.self['Bytedance_Low_Dot'].visible = false;
                } else {
                    this.self['Bytedance_Low_Dot'].visible = true;
                }
            }
            if (ZJADMgr.ins.CheckPlayVideo()) {
                ADManager.ShowReward(null);
            }
        } else if (this.self['Mid'].visible) {
            if (!this.self['Mid']['count']) {
                this.self['Mid']['count'] = 0;
            }
            this.self['Mid']['count']++;
            if (this.self['Mid']['count'] >= 4) {
                if (this.self['Bytedance_Mid_Dot'].visible) {
                    this.self['Bytedance_Mid_Dot'].visible = false;
                } else {
                    this.self['Bytedance_Mid_Dot'].visible = true;
                }
            }
        }
    }

    advFunc(): void {
        ADManager.ShowReward(() => {
            Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
            EventAdmin.notify(GEnum.EventType.changeOther);
            EventAdmin.notify(GEnum.EventType.changeProp);
        })
    }

    btnGetUp(e: Laya.Event): void {
        e.stopPropagation();
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