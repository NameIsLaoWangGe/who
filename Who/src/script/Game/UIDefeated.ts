import { Admin, Setting, PalyAudio, Click, EventAdmin, Defeated, Gold, Tools } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import { Game3D } from "./Game3D";

export default class UIDefeated extends Defeated.DefeatedScene {

    lwgOnAwake(): void {
        ADManager.TAPoint(TaT.LevelFail, 'level' + Admin._gameLevel.value);
        ADManager.TAPoint(TaT.BtnShow, 'UIDefeated_BtnNext');
        EventAdmin.notify(Game3D.EventType.closeGameScene);
        Admin._gameLevel.value = 0;
        Admin._gameSwitch = false;
        Tools.node_2DShowExcludedChild(this.self['Platform'], [Admin._platform]);
    }

    lwgOnEnable(): void {
        // PalyAudio.playDefeatedSound();
        Gold.GoldNode = this.self['GoldNode'];
        let Num2 = this.self['GoldNode'].getChildByName('Num') as Laya.Label;
        Num2.text = Gold._num.value.toString();
        Admin._clickLock.switch = true;
    }

    lwgBtnClick(): void {
        let Dot: Laya.Sprite;
        if (Admin._platform = Admin._platformTpye.Bytedance) {
            Dot = this.var('Bytedance_Dot');
        } else if (Admin._platform = Admin._platformTpye.WeChat) {
            Dot = this.var('WeChat_Dot');
        }
        var skip = () => {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'UIDefeated_BtnNext');
                Admin._gameLevel.value += 1;
                again();
            })
        }
        var again = () => {
            ADManager.TAPoint(TaT.BtnClick, 'returnword_fail');
            Admin._openScene(Admin.SceneName.UIStart, this.self);
            EventAdmin.notify(EventAdmin.EventType.nextCustoms);
        }
        Click.on(Click.Type.largen, this.var('WeChat_BtnAgain'), this, null, null, again);
        Click.on(Click.Type.largen, this.self['WeChat_BtnSkip'], this, null, null, skip);
        Click.on(Click.Type.largen, this.self['WeChat_BtnSelect'], this, null, null, () => {
            if (Dot.visible) {
                this.var('WeChat_BtnAgain').visible = false;
                this.var('WeChat_BtnSkip').visible = true;
                Dot.visible = false;
            } else {
                this.var('WeChat_BtnAgain').visible = true;
                this.var('WeChat_BtnSkip').visible = false;
                Dot.visible = true;
            }
        });

        Click.on(Click.Type.largen, this.self['OPPO_BtnAgain'], this, null, null, again);
        Click.on(Click.Type.largen, this.self['OPPO_BtnSkip'], this, null, null, skip);

        Click.on(Click.Type.largen, this.self['Bytedance_BtnAgain'], this, null, null, again);
        Click.on(Click.Type.largen, this.self['Bytedance_BtnSkip'], this, null, null, () => {
            if (Dot.visible) {
                skip();
            } else {
                again();
            }
        });
        Click.on(Click.Type.largen, this.self['Bytedance_BtnSelect'], this, null, null, () => {
            if (Dot.visible) { Dot.visible = false; } else { Dot.visible = true; }
        });
    }
}