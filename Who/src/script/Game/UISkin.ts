import { Admin, Dialog, Shop, SkinScene, Skin, PalyAudio, EventAdmin, Click } from "../Lwg_Template/lwg";
import UIShop from "./UIShop";
import ADManager, { TaT } from "../TJ/Admanager";
import { GEnum, GSene3D } from "../Lwg_Template/Global";
import { Game } from "../Lwg_Template/Game";

export default class UISkin extends SkinScene {
    skinOnAwake(): void {
        Dialog.createVoluntarilyDialogue(150, 334, Dialog.UseWhere.scene3, 0, 2000, this.self);

        let skinArr = Shop.getGoodsClassArr(Shop.GoodsClass.Skin);

        Skin._headSkinArr = [];
        Skin._eyeSkinArr = [];
        Skin._currentEye.name = null;
        Skin._currentHead.name = null;

        for (let index = 0; index < skinArr.length; index++) {
            const element = skinArr[index];
            if (element[Skin.SkinProperty.classify] === Skin.SkinClass.head) {
                Skin._headSkinArr.push(element);
            } else if (element[Skin.SkinProperty.classify] === Skin.SkinClass.eye) {
                Skin._eyeSkinArr.push(element);
            }
        }

        // 设置通过关卡获取的显示,目前就一个
        let condition = Shop.getGoodsProperty(Shop.GoodsClass.Skin, "xiaochoumao", Shop.GoodsProperty.condition);
        if (Game._gameLevel.value >= condition) {
            Shop.setGoodsProperty(Shop.GoodsClass.Skin, "xiaochoumao", Shop.GoodsProperty.have, true);
        } else {
            Shop.setGoodsProperty(Shop.GoodsClass.Skin, "xiaochoumao", Shop.GoodsProperty.resCondition, Game._gameLevel.value);
        }
    }


    skinEventReg(): void {
        EventAdmin.reg(Skin.EventType.select, this, (dataSource) => {
            if (dataSource[Shop.GoodsProperty.have]) {
                switch (Skin._SkinTap.selectedIndex) {
                    case 0:
                        Skin._currentEye.name = dataSource[Shop.GoodsProperty.name];
                        EventAdmin.notify(GEnum.EventType.changeEyeDecoration);
                        break;
                    case 1:
                        Skin._currentHead.name = dataSource[Shop.GoodsProperty.name];
                        EventAdmin.notify(GEnum.EventType.changeHeadDecoration);
                        if (GSene3D.HairParent) {
                            GSene3D.HairParent.active = false;
                        }
                        break;

                    default:
                        break;
                }

            } else {

                if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ads) {
                    ADManager.ShowReward(() => {
                        this.adsAcquisition(dataSource);
                    })
                } else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.adsXD) {
                    Dialog.createHint_Middle(Dialog.HintContent["请前往皮肤限定界面获取!"])

                } else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ineedwin) {
                    Dialog.createHint_Middle(Dialog.HintContent["通过相应的关卡数达到就可以得到了!"])

                } else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.gold) {
                    Dialog.createHint_Middle(Dialog.HintContent["请前往皮肤界面购买！"])
                }
            }
        });
        Skin._SkinList.refresh();
    }


    /**看广告获得*/
    adsAcquisition(dataSource): void {
        let claName = Shop.GoodsClass.Skin;
        let condition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.condition);
        let resCondition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition);
        Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition, resCondition + 1);
        if (condition <= resCondition + 1) {
            Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.have, true);
            switch (Skin._SkinTap.selectedIndex) {
                case 0:
                    Skin._currentEye.name = dataSource[Shop.GoodsProperty.name];
                    break;
                case 1:
                    Skin._currentHead.name = dataSource[Shop.GoodsProperty.name];
                    break;

                default:
                    break;
            }
        }
        Skin._SkinList.refresh();
    }

    skinTap_Select(index): void {
        PalyAudio.playSound();
        switch (index) {
            case 0:
                Skin._SkinList.array = Skin._eyeSkinArr;
                break;
            case 1:
                Skin._SkinList.array = Skin._headSkinArr;
                break;

            default:
                break;
        }
        Skin._SkinList.refresh();
    }

    skinList_Update(cell: Laya.Box, index: number): void {
        console.log(Skin._SkinList);
        let dataSource = cell.dataSource;
        let Select = cell.getChildByName('Select') as Laya.Sprite;
        Select.visible = false;
        let Pic = cell.getChildByName('Pic') as Laya.Image;
        Pic.skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
        switch (Skin._SkinTap.selectedIndex) {
            case 0:
                if (cell.dataSource['name'] == Skin._currentEye.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;
            case 1:
                if (cell.dataSource['name'] == Skin._currentHead.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;

            default:
                break;
        }

        // 如果没有获得，根据需求路径进行设置提示
        let NoHave = cell.getChildByName('NoHave') as Laya.Image;
        NoHave.visible = true;
        let Board = cell.getChildByName('Board') as Laya.Image;
        let Dec = NoHave.getChildByName('Dec') as Laya.Label;
        let Icon = NoHave.getChildByName('Icon') as Laya.Label;
        if (!cell.dataSource[Shop.GoodsProperty.have]) {
            switch (cell.dataSource[Shop.GoodsProperty.getway]) {
                case Shop.Getway.ads:
                    Dec.text = cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition];
                    Dec.x = 88;
                    Dec.fontSize = 30;
                    Icon.visible = true;

                    break;
                case Shop.Getway.adsXD:
                    Dec.text = '限定获取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;

                    break;
                case Shop.Getway.easterEgg:
                    Dec.text = '彩蛋获取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;

                    break;
                case Shop.Getway.ineedwin:
                    Dec.text = '过' + cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition] + '关';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;
                    break;
                case Shop.Getway.gold:
                    Dec.text = '金币抽取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;

                    break;
                default:
                    Icon.visible = false;
                    break;
            }
            Board.skin = 'UI/Common/kuang2.png';
        } else {
            NoHave.visible = false;
            Board.skin = 'UI/Common/kuang1.png';
        }
    }

    skinOnEnable(): void {
        Skin._SkinList.array = Skin._headSkinArr;
        Skin._SkinList.refresh();

        EventAdmin.notify(GEnum.EventType.cameraMove, [GEnum.TaskType.movePhotoLocation])
    }

    skinBtnClick(): void {

        Click.on(Click.Type.largen, this.self['BtnComplete'], this, null, null, this.btnCompleteUp, null);
    }

    btnCompleteUp(): void {
        Admin._openScene(Admin.SceneName.UIShare, null, this.self)
    }
}


