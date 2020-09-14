import { Admin, Click, EventAdmin, Backpack, Dialog } from "../Frame/lwg";
import { Game3D } from "./Game3D";
import ADManager from "../../TJ/Admanager";
export default class UICard extends Admin.Scene {

    lwgAdaptive(): void {
        this.self['BtnGold'].y = this.self['BtnAds'].y = Laya.stage.height - 156;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            Admin._openScene(Admin.SceneName.UIStart, this.self);
            EventAdmin.notify(Game3D.EventType.closeUICard);
        });
        var buy = (type) => {
            let arr = Game3D.getQualityObjArrByNameArr(Backpack._noHaveCard.arr, Game3D.Quality.R);
            if (arr.length > 0) {
                if (type == 'ads') {
                    ADManager.ShowReward(() => {
                        EventAdmin.notify(Game3D.EventType.UICardBuy, [arr]);
                    })
                } else if (type == 'gold') {
                    EventAdmin.notify(Game3D.EventType.UICardBuy, [arr]);
                }
            } else {
                Dialog.createHint_Middle(Dialog.HintContent["没有可以购买的卡牌了！"]);
            }
        }
        Click.on(Click.Type.largen, this.self['BtnAds'], this, null, null, () => {
            buy('ads');
        });
        Click.on(Click.Type.largen, this.self['BtnGold'], this, null, null, () => {
            buy('gold');
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