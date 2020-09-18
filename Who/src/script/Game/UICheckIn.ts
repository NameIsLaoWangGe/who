import { CheckIn, Admin, Setting, Click, Animation2D, Effects, Gold, EventAdmin, TimerAdmin, SkinQualified, Tools, Backpack } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UICheckIn extends CheckIn.CheckInScene {

    lwgOnAwake(): void {
        if (CheckIn._todayCheckIn.bool) {
            Tools.node_RemoveAllChildren(this.self['Platform']);
        } else {
            Tools.node_2DShowExcludedChild(this.self['Platform'], [Admin._platform]);
        }
        Setting.setBtnVinish();
        Gold.goldVinish();

        // this.var('Platform')
    }

    lwgEventReg(): void {
        EventAdmin.reg('seven', this, () => {
            let ChinkTip = this.self['Seven'].getChildByName('ChinkTip') as Laya.Image;
            let Num = this.self['Seven'].getChildByName('Num') as Laya.Image;
            let Pic_Gold = this.self['Seven'].getChildByName('Pic_Gold') as Laya.Image;
            if (CheckIn._checkInNum.number === 7) {
                ChinkTip.visible = true;
                Num.visible = false;
                Pic_Gold.visible = false;
                // this.self['Seven'].skin = 'UI/Common/kuang1.png';
            } else {
                ChinkTip.visible = false;
            }
        })
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.BtnShow, 'UICheckIn_BtnThreeGet_WeChat');
        EventAdmin.notify('seven');

        Gold.GoldNode = this.self['GoldNode'];
        let Num2 = this.self['GoldNode'].getChildByName('Num') as Laya.Label;
        Num2.text = Gold._num.value.toString();
    }

    checkList_Update(cell: Laya.Box, index: number): void {
        let dataSource = cell.dataSource;

        let Pic_Board = cell.getChildByName('Pic_Board') as Laya.Image;
        let Pic_Gold = cell.getChildByName('Pic_Gold') as Laya.Image;
        let Num = cell.getChildByName('Num') as Laya.Label;
        let ChinkTip = cell.getChildByName('ChinkTip') as Laya.Label;
        let DayNum = cell.getChildByName('DayNum') as Laya.Label;

        if (dataSource[CheckIn.CheckProPerty.checkInState]) {
            Pic_Gold.visible = false;
            Num.visible = false;
            ChinkTip.visible = true;
            // Pic_Board.skin = 'UI/Common/kuang1.png'
        } else {
            Pic_Gold.visible = true;
            Num.visible = true;
            Num.text = dataSource[CheckIn.CheckProPerty.rewardNum];
            ChinkTip.visible = false;
            // Pic_Board.skin = 'UI/Common/kuang2.png'
        }

        switch (dataSource[CheckIn.CheckProPerty.name]) {
            case 'day1':
                DayNum.text = '第一天';
                break;
            case 'day2':
                DayNum.text = '第二天';

                break;
            case 'day3':
                DayNum.text = '第三天';

                break;
            case 'day4':
                DayNum.text = '第四天';

                break;
            case 'day5':
                DayNum.text = '第五天';

                break;
            case 'day6':
                DayNum.text = '第六天';

                break;
            case 'day7':
                DayNum.text = '第七天';

                break;
            default:
                break;
        }
    }

    lwgBtnClick(): void {
        let Dot;
        if (Admin._platform = Admin._platformTpye.Bytedance) {
            Dot = this.self['Bytedance_Dot'];
        } else if (Admin._platform = Admin._platformTpye.WeChat) {
            Dot = this.self['WeChat_Dot'];
        }
        var btnSelectUp = () => {
            if (Dot.visible) {
                Dot.visible = false;
            } else {
                Dot.visible = true;
            }
        }
        var btnGetUp = () => {
            if (Dot.visible) {
                ADManager.ShowReward(() => {
                    btnGetUpFunc(3);
                })
            } else {
                btnGetUpFunc(1);
            }
        }
        var btnGetUpFunc = (number) => {
            Admin._clickLock.switch = true;
            let index = CheckIn._checkInNum.number;
            let target;
            if (index < 6) {
                target = CheckIn._checkList.getCell(index)
            } else {
                target = this.self['Seven'];
            }
            Animation2D.swell_shrink(target, 1, 1.1, 100, 0, () => {
                // 特效
                let arr = [[111, 191], [296, 191], [486, 191], [111, 394], [296, 394], [486, 394], [306, 597
                ]];
                Effects.createExplosion_Rotate(this.self['SceneContent'], 25, arr[index][0], arr[index][1], 'star', 10, 15);
                let rewardNum = CheckIn.todayCheckIn_7Days();
                EventAdmin.notify('seven');
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Gold.addGold(rewardNum * number);
                    Laya.timer.once(500, this, () => {
                        btnBackUp();
                    })
                });
            });
        }
        var btnBackUp = () => {
            Admin._closeScene(this.self, () => {
                if (CheckIn._fromWhich == Admin.SceneName.UILoding) {
                    if (SkinQualified._adsNum.value < 7) {
                        Admin._openScene(Admin.SceneName.UISkinQualified);
                    }
                }
            });
        }
        Click.on(Click.Type.largen, this.self['WeChat_BtnGet'], this, null, null, btnGetUp);
        Click.on(Click.Type.largen, this.self['WeChat_BtnThreeGet'], this, null, null, btnGetUp);
        Click.on(Click.Type.noEffect, this.self['WeChat_BtnSelect'], this, null, null, btnSelectUp);

        Click.on(Click.Type.largen, this.self['Bytedance_BtnGet'], this, null, null, btnGetUp);
        Click.on(Click.Type.noEffect, this.self['Bytedance_BtnSelect'], this, null, null, btnSelectUp);

        Click.on(Click.Type.largen, this.self['OPPO_BtnGet'], this, null, null, () => {
            btnGetUpFunc(1);
        });
        Click.on(Click.Type.largen, this.self['OPPO_BtnThreeGet'], this, null, null, () => {
            ADManager.ShowReward(() => {
                
                btnGetUpFunc(3);
            })
        });
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            btnBackUp();
        });
    }
    lwgOnDisable(): void {
        Setting.setBtnAppear();
        Gold.createGoldNode(629, 174);
    }
}