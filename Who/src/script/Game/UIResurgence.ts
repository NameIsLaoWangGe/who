import { Admin, Click, EventAdmin, TimerAdmin, Share } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import { Game3D } from "./Game3D";

export default class UIResurgence extends Admin.Scene {

    lwgOnAwake(): void {
        Admin._gameSwitch = false;
        Admin._clickLock.switch = false;
    }

    lwgOnEnable(): void {
        console.log('打开复活界面！')
        ADManager.TAPoint(TaT.BtnShow, 'closeword_revive');
        ADManager.TAPoint(TaT.BtnShow, 'ADrevivebt_revive');

        TimerAdmin.frameLoop(60, this, () => {
            let Countdown = this.self['Countdown'] as Laya.FontClip;
            Countdown.value = (Number(Countdown.value) - 1).toString();
            if (Countdown.value == '-1') {
                Countdown.value = '0';
                Laya.timer.clearAll(this);
                Admin._openScene(Admin.SceneName.UIDefeated, this.self);
            }
        });
    }

    lwgAdaptive(): void {
        this.self['Bg'].x = Laya.stage.width;
        this.self['Bg'].y = Laya.stage.height;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnResurgence'], this, null, null, () => {
            // ADManager.ShowReward(() => {
            Admin._gameSwitch = true;
            ADManager.TAPoint(TaT.BtnClick, 'ADrevivebt_revive');
            EventAdmin.notify(EventAdmin.EventType.resurgence, this.self);
            // })
        });

        Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, () => {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_revive');
            Admin._openScene(Admin.SceneName.UIShare, this.self, () => { Share._fromWhich = Admin.SceneName.UIDefeated });
        });
    }

    lwgOnDisable(): void {
    }
}