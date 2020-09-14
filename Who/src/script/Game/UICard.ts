import { Admin, Click, EventAdmin } from "../Frame/lwg";
import { Game3D } from "./Game3D";
import ADManager from "../../TJ/Admanager";
export default class UICard extends Admin.Scene {

    lwgOnAwake(): void {

    }

    lwgAdaptive(): void {
        this.self['BtnGold'].y = this.self['BtnAds'].y = Laya.stage.height - 156;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIStart, this.self);
            EventAdmin.notify(Game3D.EventType.closeUICard);
        });

        var buy = () => {
            EventAdmin.notify(Game3D.EventType.UICardBuy);
        }
        Click.on(Click.Type.largen, this.self['BtnAds'], this, null, null, () => {
            // ADManager.ShowReward(() => {
            buy();
            // })
        });
        Click.on(Click.Type.largen, this.self['BtnGold'], this, null, null, () => {
            buy();
        });
    }

    onStageMouseDown(e: Laya.Event): void {
        if (!this['firstPos']) {
            this['firstPos'] = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseX);
        }
    }
    onStageMouseMove(e: Laya.Event): void {
        if (this['firstPos']) {
            let diffX = this['firstPos'].x - Laya.stage.mouseX;
            if (diffX > 0) {
                EventAdmin.notify(Game3D.EventType.UICardMove, ['add']);
            } else {
                EventAdmin.notify(Game3D.EventType.UICardMove, ['sub']);
            }
        }
    }
    onStageMouseUp(e: Laya.Event): void {
        if (this['firstPos']) {
            this['firstPos'] = null;
        }
    }

}