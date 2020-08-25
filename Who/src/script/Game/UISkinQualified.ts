import UIStart from "./UIStart";
import ADManager, { TaT } from "../TJ/Admanager";
import { SkinQualified, Gold, Setting, Shop, Click, Dialog, EventAdmin, Animation2D } from "../Frame/lwg";

export default class UISkinQualified extends SkinQualified.SkinQualifiedScene {

    skinXDOnAwake(): void {
        ADManager.TAPoint(TaT.BtnShow, 'Adlimmitget');

        Gold.goldVinish();
        Setting.setBtnVinish();
    }

    skinXDOnEnable(): void {
        this.progressDisplay();
    }

    skinXDAdaptive(): void {
        this.self['SceneContent'].y = Laya.stage.height / 2;
    }
    /**进度条显示*/
    progressDisplay(): void {
        let resCondition = Shop.getProperty(Shop.GoodsClass.Props, 'xiandanren', Shop.GoodsProperty.resCondition);
        if (resCondition > 0) {
            for (let index = 0; index < resCondition; index++) {
                let name = 'Bar' + (index + 1);
                this.self[name].skin = 'UI/XDSkin/tiao1.png';
            }
        }
    }

    skinXDBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnGet'], this, null, null, this.btnGetUp);
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, this.btnBackUp);
    }

    btnGetUp(): void {
        ADManager.ShowReward(() => {
            this.btnGetFunc();
        })
    }

    btnBackUp(): void {
        this.self.close();
    }
    /**看完广告的返回函数*/
    btnGetFunc(): void {
        ADManager.TAPoint(TaT.BtnClick, 'Adlimmitget');
        let have = Shop.buyGoods(Shop.GoodsClass.Props, 'xiandanren', 1);
        if (have) {
            this.progressDisplay();
            Dialog.createHint_Middle(Dialog.HintContent["限定皮肤已经获得，请前往皮肤界面查看。"]);
            Shop._currentProp.name = 'xiandanren';
            EventAdmin.notify(SkinQualified.EventType.acquisition);
            Animation2D.fadeOut(this.self, 1, 0, 500, 500, () => {
                this.self.close();
            });
        } else {
            this.progressDisplay();
        }
    }

    skinXDOnDisable(): void {
        Setting.setBtnAppear();
        Gold.goldAppear();
    }
}