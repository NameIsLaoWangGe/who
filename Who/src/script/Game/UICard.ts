import { Admin, Click, EventAdmin, Backpack, Dialog, Animation2D, Gold } from "../Frame/lwg";
import { Game3D } from "./Game3D";
import ADManager, { TaT } from "../../TJ/Admanager";
import { Guide } from "../Frame/Guide";
export default class UICard extends Admin.Scene {

    lwgOnAwake(): void {
        Gold.goldAppear();
    }
    lwgOnEnable(): void {

        ADManager.TAPoint(TaT.BtnShow, 'UICard_BtnGold');
        ADManager.TAPoint(TaT.BtnClick, 'UICard_BtnGold');
        
        this.self['BtnBack'].alhpa = 0;
        this.self['BtnBack'].visible = false;
        Laya.timer.once(4500, this, () => {
            Animation2D.fadeOut(this.self['BtnBack'], 0, 1, 200, 0, () => {
                this.self['BtnBack'].visible = true;
                EventAdmin.notify(Guide.EventType.onStep);
            });
        })
    }
    lwgAdaptive(): void {
        this.self['BtnGold'].y = this.self['BtnAds'].y = Laya.stage.height - 156;
    }
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            EventAdmin.notify(Game3D.EventType.closeUICard);
            if (Guide._whichStepNum == 7) {
                EventAdmin.notify(Guide.EventType.stepComplete);
                Admin._openScene(Admin.SceneName.UIStart, this.self, null, Laya.stage.numChildren - 4);
            } else {
                Admin._openScene(Admin.SceneName.UIStart, this.self);
            }
        });
        var buy = (type) => {
            if (!Guide._complete.bool) {
                return;
            }
            let arr = Game3D.getQualityObjArrByNameArr(Backpack._noHaveCard.arr, Game3D.Quality.R);
            if (arr.length > 0) {
                if (type == 'ads') {
                    ADManager.ShowReward(() => {
                        EventAdmin.notify(Game3D.EventType.UICardBuy, [arr]);
                    })
                } else if (type == 'gold') {
                    ADManager.TAPoint(TaT.BtnClick, 'UICard_BtnGold');
                    if (Gold._num.value >= 300) {
                        EventAdmin.notify(Game3D.EventType.UICardBuy, [arr]);
                        Gold.addGold(-300);
                    } else {
                        Dialog.createHint_Middle(Dialog.HintContent["金币不够了！"]);
                    }
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