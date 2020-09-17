import { Admin, Click, EventAdmin, TimerAdmin, Share } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import { Game3D } from "./Game3D";
import RecordManager from "../../TJ/RecordManager";

export default class UIResurgence extends Admin.Scene {

    lwgOnAwake(): void {
        Admin._gameSwitch = false;
        Admin._clickLock.switch = false;
        this['CounDownSwitch'] = true;
    }

    lwgOnEnable(): void {
        console.log('打开复活界面！')
        ADManager.TAPoint(TaT.BtnShow, 'UIResurgence_BtnResurgence');

        TimerAdmin.frameLoop(60, this, () => {
            if (this['CounDownSwitch']) {
                let Countdown = this.self['Countdown'] as Laya.FontClip;
                Countdown.value = (Number(Countdown.value) - 1).toString();
                if (Countdown.value == '-1') {
                    Countdown.value = '0';
                    Laya.timer.clearAll(this);
                 
                    Admin._openScene(Admin.SceneName.UIDefeated, this.self);
                }
            }
        });
    }

    lwgAdaptive(): void {
        this.self['Bg'].x = Laya.stage.width;
        this.self['Bg'].y = Laya.stage.height;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnResurgence'], this, null, null, () => {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'UIResurgence_BtnResurgence');
                this['CounDownSwitch'] = false;
                Admin._gameSwitch = true;
                Admin._closeScene(this.self, () => {
                    EventAdmin.notify(EventAdmin.EventType.resurgence);
                });
            })
        });

        Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, () => {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_revive');
            this['CounDownSwitch'] = false;
            RecordManager.stopAutoRecord();
            Admin._openScene(Admin.SceneName.UIShare, this.self, () => { Share._fromWhich = Admin.SceneName.UIDefeated });
        });
    }


}