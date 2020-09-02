import ADManager, { TaT } from "../../TJ/Admanager";
import { Admin, Click, Dialog, Gold, Share, EventAdmin } from "../Frame/lwg";
import RecordManager from "../../TJ/RecordManager";

export default class UIShare extends Share.ShareScene {

    lwgOnAwake(): void {
        console.log('打开分享界面！');
        Gold.goldAppear();
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.BtnShow, 'closeword_share');
        ADManager.TAPoint(TaT.BtnShow, 'sharebt_share');
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, this.self['BtnShare'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.noEffect, this.self['Background'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnNoShareUp);
        Click.on(Click.Type.largen, this.self['BtnSkip'], this, null, null, this.btnNoShareUp);
    }

    btnShareUp(): void {
        console.log('分享！');
        RecordManager._share('award', () => {
            ADManager.TAPoint(TaT.BtnClick, 'sharebt_share');
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                Gold.addGold(150);
                this.shareFunc();
            });
        })
    }

    shareFunc(): void {
        if (Share._fromWhich == Admin.SceneName.UIDrawCard) {
            Admin._closeScene(this.self);
            EventAdmin.notify(Admin.SceneName.UIShare + Admin.SceneName.UIDrawCard);
        } else if (Share._fromWhich == Admin.SceneName.UIVictory) {
            Admin._openScene(Admin.SceneName.UIVictoryBox, this.self);
        } else if (Share._fromWhich == Admin.SceneName.UIDefeated) {
            Admin._openScene(Admin.SceneName.UIDefeated, this.self);
        }
    }

    btnNoShareUp(e: Laya.Event): void {
        e.stopPropagation();
        this.shareFunc();
    }
}