import { lwg, Gold, EventAdmin, Click, Admin, Shop, Tools } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIShop_Goods extends Admin.Object {
    /**选中框*/
    Select: Laya.Image;
    lwgOnEnable(): void {
        this.Select = this.self.getChildByName('Select') as Laya.Image;
    }
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self, this, null, null, this.up, null);
    }
    up(): void {
        EventAdmin.notify(Shop.EventType.select, [this.self['_dataSource']])
    }
}