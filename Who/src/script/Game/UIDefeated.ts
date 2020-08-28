import RecordManager from "../TJ/RecordManager";
import { Admin, Setting, PalyAudio, Click, EventAdmin, Defeated, Gold } from "../Frame/lwg";
import ADManager, { TaT } from "../TJ/Admanager";

export default class UIDefeated extends Defeated.DefeatedScene {

    lwgOnAwake(): void {
        ADManager.TAPoint(TaT.LevelFail, 'level' + Admin._gameLevel.value);
        ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
        ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');

        switch (Admin._platform) {
            case Admin._platformTpye.OPPO:
                this.self['OPPO'].visible = true;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = false;
                this.self['P202'].removeSelf();
                break;
            case Admin._platformTpye.WeChat:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = true;
                this.self['Bytedance'].visible = false;
                this.self['P202'].removeSelf();
                break;
            case Admin._platformTpye.Bytedance:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = true;

            default:
                break;
        }
    }

    lwgOnEnable(): void {
        PalyAudio.playDefeatedSound();
        Gold.GoldNode = this.self['GoldNode'];
        let Num2 = this.self['GoldNode'].getChildByName('Num') as Laya.Label;
        Num2.text = Gold._num.value.toString();
    }

    lwgBtnClick(): void {
        // Click.on(Click.Type.largen, this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
        // Click.on(Click.Type.largen, this.self['BtnNext_WeChat'], this, null, null, this.btnNextUp);
        // Click.on(Click.Type.largen, this.self['BtnSelect_WeChat'], this, null, null, this.btnSelectUp);

        // Click.on(Click.Type.largen, this.self['BtnAgain_OPPO'], this, null, null, this.btnAgainUp);
        // Click.on(Click.Type.largen, this.self['BtnNext_OPPO'], this, null, null, this.btnNextUp);

        Click.on(Click.Type.largen, this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNextUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
    }

    btnSelectUp(): void {
        let Dot;
        switch (Admin._platform) {
            case Admin._platformTpye.WeChat:
                Dot = this.self['Dot_WeChat'];
                break;
            case Admin._platformTpye.Bytedance:
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
        Admin._openScene(Admin.SceneName.UIStart, this.self);
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
    }

    btnNextUp(): void {

        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'ADnextbt_fail');

            Admin._gameLevel.value += 1;
            Admin._openScene(Admin.SceneName.UIStart, this.self);
            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        })
    }

    lwgOnDisable(): void {
    }
}