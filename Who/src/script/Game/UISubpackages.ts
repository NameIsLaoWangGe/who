import { Admin } from "../Lwg_Template/lwg";
import { SubpackController } from "./SubpackController";
import { Game } from "../Lwg_Template/Game";

let isInit = false;
TJ.Common.PriorityInit.Add(100, () => {
    isInit = true;
});
export default class UISubpackages extends Laya.Script {
    onAwake(): void {
        Game._platform == Game._platformTpye.Bytedance;
        if (Game._platform !== Game._platformTpye.WeChat) {
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