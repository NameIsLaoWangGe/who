import { lwg, Gold, EventAdmin, Click, Admin, Shop, Tools, Skin } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UISKin_Goods extends Admin.Object {

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self, this, null, null, this.up, null);
    }
    up(): void {
        EventAdmin.notify(Skin.EventType.select, [this.self['_dataSource']])
    }
}