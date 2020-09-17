import { CheckIn, Admin, Setting, Click, Animation2D, Effects, Gold, EventAdmin, TimerAdmin, SkinQualified } from "../Frame/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UICheckIn extends CheckIn.CheckInScene {

    lwgOnAwake(): void {
        if (CheckIn._lastCheckDate.date == (new Date).getDate()) {
            this.self['WeChat'].visible = false;
            this.self['OPPO'].visible = false;
        } else {
            switch (Admin._platform) {
                case Admin._platformTpye.OPPO:
                    this.self['OPPO'].visible = true;
                    this.self['WeChat'].visible = false;
                    break;
                case Admin._platformTpye.WeChat:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    break;
                case Admin._platformTpye.Bytedance:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    break;

                default:
                    break;
            }
        }
        Setting.setBtnVinish();
        Gold.goldVinish();
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
        Click.on('largen', this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
        Click.on('largen', this.self['BtnThreeGet_WeChat'], this, null, null, this.btnThreeGetUp);
        Click.on(Click.Type.noEffect, this.self['Select_WeChat'], this, null, null, this.btnSelectUp);

        Click.on(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
        Click.on(Click.Type.largen, this.self['BtnThreeGet_OPPO'], this, null, null, this.btnThreeGetUp);

        Click.on('largen', this.self['BtnBack'], this, null, null, this.btnBackUp);
    }
    btnBackUp(): void {
        Admin._closeScene(this.self, () => {
            if (CheckIn._fromWhich == Admin.SceneName.UILoding) {
                if (SkinQualified._adsNum.value < 7) {
                    Admin._openScene(Admin.SceneName.UISkinQualified);
                }
            }
        });
    }
    btnThreeGetUp(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'UICheckIn_BtnThreeGet_WeChat');
            this.btnGetUpFunc(3);
        })
    }

    btnGetUp(): void {
        if (Admin._platform === Admin._platformTpye.Bytedance) {
            if (this.self['Dot'].visible) {
                ADManager.ShowReward(() => {

                    ADManager.TAPoint(TaT.BtnClick, 'UICheckIn_BtnThreeGet_WeChat');
                    this.btnGetUpFunc(3);
                })
            } else {
                this.btnGetUpFunc(1);
            }
        } else {
            this.btnGetUpFunc(1);
        }
    }

    /**
     * 
     * @param number 几倍领取
     */
    btnGetUpFunc(number): void {
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
                    this.btnBackUp();
                })
            });
        });
    }

    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            this.self['Dot'].visible = false;
        } else {
            this.self['Dot'].visible = true;
        }
    }

    lwgOnUpdate(): void {
        if (!CheckIn._todayCheckIn.bool) {
            switch (Admin._platform) {
                case Admin._platformTpye.WeChat:
                    if (this.self['Dot'].visible) {
                        this.self['BtnGet_WeChat'].visible = false;
                        this.self['BtnThreeGet_WeChat'].visible = true;
                    } else {
                        this.self['BtnGet_WeChat'].visible = true;
                        this.self['BtnThreeGet_WeChat'].visible = false;
                    }
                    break;

                case Admin._platformTpye.Bytedance:
                    this.self['BtnGet_WeChat'].visible = true;
                    this.self['BtnThreeGet_WeChat'].visible = false;
                    break;
                default:
                    break;
            }
        }
    }
    lwgOnDisable(): void {
        Setting.setBtnAppear();
        Gold.createGoldNode(629, 174);
        Admin._clickLock.switch = false;
    }
}