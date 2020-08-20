import { Admin } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
export module Tomato {
    export module TAPoint {
        /**场景打点次数*/
        let printPointNum: number = 0;
        /**
        * 场景打点,记录玩家进场景和出场景的次数
        * @param type 两种类型，一种是离开打点，一种是进入打点
        */
        export function printPoint(type, name: string): void {
            switch (name) {
                case Admin.SceneName.UILoding:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'UIPreload');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'UIPreload');
                    }
                    break;
                case Admin.SceneName.UIStart:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'mianpage');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'mianpage');
                    }
                    break;
                case Admin.SceneName.UIVictory:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'successpage');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'successpage');
                    }
                    break;

                case Admin.SceneName.UIDefeated:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'failpage');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'failpage');
                    }
                    break;

                case Admin.SceneName.UIExecutionHint:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'noticketpage');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'noticketpage');
                    }
                    break;
                case Admin.SceneName.UIPassHint:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'freegiftpage');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'freegiftpage');
                    }
                    break;
                case Admin.SceneName.UIPuase:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.PageEnter, 'pausepage');
                    } else if (type === 'dis') {
                        ADManager.TAPoint(TaT.PageLeave, 'pausepage');
                    }
                    break;
                default:

                    break;
            }
            printPointNum++;
            console.log('场景打点', printPointNum);
        }
    }

}

export default Tomato;