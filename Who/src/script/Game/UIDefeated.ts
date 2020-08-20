import { lwg, Click, EventAdmin, Dialog, Admin, PalyAudio, Setting } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import ADManager, { TaT } from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";
import RecordManager from "../TJ/RecordManager";

export default class UIDefeated extends lwg.Admin.Scene {

    lwgOnAwake(): void {
        Admin._gameStart = false;
    }

    lwgNodeDec(): void {
        this.self['BtnSelect_WeChat'].visible = true;
        this.self['BtnAgain_WeChat'].visible = false;
        this.self['Dot_WeChat'].visible = true;
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.LevelFail, 'level' + Game._gameLevel.value);

        ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
        ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');

        Setting.setBtnAppear();
        PalyAudio.playDefeatedSound();

        switch (Game._platform) {
            case Game._platformTpye.OPPO:
                this.self['OPPO'].visible = true;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = false;
                this.self['P202'].removeSelf();
                break;
            case Game._platformTpye.WeChat:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = true;
                this.self['Bytedance'].visible = false;
                this.self['P202'].removeSelf();
                break;
            case Game._platformTpye.Bytedance:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = true;

            default:
                break;
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_WeChat'], this, null, null, this.btnNextUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_WeChat'], this, null, null, this.btnSelectUp);

        Click.on(Click.Type.largen, this.self['BtnAgain_OPPO'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_OPPO'], this, null, null, this.btnNextUp);

        Click.on(Click.Type.largen, this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNextUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
    }

    btnSelectUp(): void {
        let Dot;
        switch (Game._platform) {
            case Game._platformTpye.WeChat:
                Dot = this.self['Dot_WeChat'];
                break;
            case Game._platformTpye.Bytedance:
                Dot = this.self['Dot_Bytedance'];
                break;

            default:
                break;
        }

        if (Dot.visible) {
            Dot.visible = false;
            this.self['BtnNext_WeChat'].visible = false;
            this.self['BtnAgain_WeChat'].visible = true;

            this.self['BtnNext_Bytedance'].visible = false;
            this.self['BtnAgain_Bytedance'].visible = true;
        } else {
            Dot.visible = true;
            this.self['BtnNext_WeChat'].visible = true;
            this.self['BtnAgain_WeChat'].visible = false;

            this.self['BtnNext_Bytedance'].visible = true;
            this.self['BtnAgain_Bytedance'].visible = false;
        }
    }

    btnAgainUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'returnword_fail');

        console.log('重新开始！');
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        Admin._openScene(Admin.SceneName.UIStart, null, this.self);
    }

    btnNextUp(): void {

        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'ADnextbt_fail');

            Game._gameLevel.value += 1;
            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
            Admin._openScene(Admin.SceneName.UIStart, null, this.self);
        })
    }

    lwgOnDisable(): void {
        EventAdmin.notify(GEnum.EventType.goBack);
    }
}