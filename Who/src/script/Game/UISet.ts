import { lwg, Click, Setting } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";

export default class UISet extends lwg.Admin.Scene {
    lwgOnAwake(): void {
        Setting.setBtnVinish();
        this.audioOnOff();
        this.bgmOnOff();

        ADManager.TAPoint(TaT.BtnClick, 'setbt_main');
    }

    /**音效*/
    audioOnOff(): void {
        if (Setting._sound.switch) {
            this.self['AudioOff'].visible = false;
        } else {
            this.self['AudioOff'].visible = true;
        }
    }

    /**背景音乐*/
    bgmOnOff(): void {
        if (Setting._bgMusic.switch) {
            this.self['BgmOff'].visible = false;
        } else {
            this.self['BgmOff'].visible = true;
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnAudio'], this, null, null, this.btnAudioUp, null);
        Click.on(Click.Type.largen, this.self['BtnBgm'], this, null, null, this.btnBgmUp, null);
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp, null);
    }

    btnAudioUp(): void {
        if (Setting._sound.switch) {
            Setting._sound.switch = false;
        } else {
            Setting._sound.switch = true;
        }
        this.audioOnOff();
    }
    btnBgmUp(): void {
        if (Setting._bgMusic.switch) {
            Setting._bgMusic.switch = false;
        } else {
            Setting._bgMusic.switch = true;
        }
        this.bgmOnOff();
    }

    btnCloseUp(): void {
        this.self.close();
    }
    lwgOnDisable(): void {
        Setting.setBtnAppear();
    }
}