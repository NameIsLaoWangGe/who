import { Admin, Setting, Click, EventAdmin } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UISet extends Admin.Scene {
    lwgOnAwake(): void {
        Setting.setBtnVinish();
        ADManager.TAPoint(TaT.BtnClick, 'setbt_main');
    }

    lwgOnEnable(): void {
        EventAdmin.notify('soundOnOff');
        EventAdmin.notify('bgMusicOnOff');
        EventAdmin.notify('shakeOnOff');
    }

    lwgEventReg(): void {
        let onX = 102;
        let offX = 0;
        let onUrl = 'Game/UI/UISet/di2.png';
        let offUrl = 'Game/UI/UISet/di1.png';

        EventAdmin.reg('soundOnOff', this, () => {
            if (Setting._sound.switch) {
                this.self['SoundOff'].x = onX;
                this.self['BtnSound'].skin = onUrl;
            } else {
                this.self['SoundOff'].x = offX;
                this.self['BtnSound'].skin = offUrl;
            }
        })

        EventAdmin.reg('bgMusicOnOff', this, () => {
            if (Setting._bgMusic.switch) {
                this.self['BgMusicOff'].x = onX;
                this.self['BtnBgMusic'].skin = onUrl;
            } else {
                this.self['BgMusicOff'].x = offX;
                this.self['BtnBgMusic'].skin = offUrl;
            }
        })
        EventAdmin.reg('shakeOnOff', this, () => {
            if (Setting._shake.switch) {
                this.self['ShakeOff'].x = onX;
                this.self['BtnShake'].skin = onUrl;
            } else {
                this.self['ShakeOff'].x = offX;
                this.self['BtnShake'].skin = offUrl;
            }
        })
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnSound'], this, null, null, () => {
            if (Setting._sound.switch) {
                Setting._sound.switch = false;
            } else {
                Setting._sound.switch = true;
            }
            EventAdmin.notify('soundOnOff');
        });
        Click.on(Click.Type.largen, this.self['BtnBgMusic'], this, null, null, () => {
            if (Setting._bgMusic.switch) {
                Setting._bgMusic.switch = false;
            } else {
                Setting._bgMusic.switch = true;
            }
            EventAdmin.notify('bgMusicOnOff');
        });
        Click.on(Click.Type.largen, this.self['BtnShake'], this, null, null, () => {
            if (Setting._shake.switch) {
                Setting._shake.switch = false;
            } else {
                Setting._shake.switch = true;
            }
            EventAdmin.notify('shakeOnOff');
        });
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, () => {
            Admin._closeScene(this.self);
        });
    }

    lwgOnDisable(): void {
        Setting.setBtnAppear();
    }
}