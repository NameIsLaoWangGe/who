import { Admin, Click, VictoryBox, Animation2D, Dialog, EventAdmin } from "../Frame/lwg";

export default class UIVictoryBox_Cell extends Admin.Object {
    constructor() { super(); }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, this.self, this, null, null, this.up, null);
    }
    btnoff(): void {
        Click.off(Click.Type.noEffect, this.self, this, null, null, this.up, null);
    }

    up(e: Laya.Event): void {
        if (this.self['_dataSource'][VictoryBox.BoxProperty.openState]) {
            return;
        } else {
            if (VictoryBox._canOpenNum > 0) {
                let Pic_Box = this.self.getChildByName('Pic_Box') as Laya.Image;
                if (!this.self['_dataSource'][VictoryBox.BoxProperty.ads]) {
                    Pic_Box.skin = 'Game/UI/UIVictoryBox/baoxiang3.png';
                }
                this.btnoff();
                Animation2D.shookHead_Simple(Pic_Box, 10, 100, 0, f => {
                    EventAdmin.notify(VictoryBox.EventType.openBox, [this.self['_dataSource']]);
                    this.lwgBtnClick();
                })
            } else {
                Dialog.createHint_Middle(Dialog.HintContent["观看广告可以获得三次开宝箱次数！"]);
            }
        }


    }
    lwgDisable(): void {

    }
}