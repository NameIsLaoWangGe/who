import { Admin } from "../Frame/lwg";
import { SubpackController } from "../../TJ/SubpackController";

let isInit = false;
TJ.Common.PriorityInit.Add(100, () => {
    isInit = true;
});
export default class UISubpackages extends Laya.Script {
    onAwake(): void {
        Admin._platform == Admin._platformTpye.Bytedance;
        if (Admin._platform !== Admin._platformTpye.WeChat) {
            Admin._openScene('UILoding');
            return;
        }
        let act = () => {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                let gameContrl = new SubpackController();
                gameContrl.init(() => {
                    Admin._openScene('UILoding');
                })

            } else {
                Admin._openScene('UILoding');
            }
        };
        if (isInit) {
            act();
        }
        else {
            TJ.Common.PriorityInit.Add(100, act);
        }
    }
}