import ADManager, { TaT } from "../TJ/Admanager";
import { Task, lwg, Animation2D, CheckIn, Gold, Click, Effects, EventAdmin, Setting, Dialog } from "../Lwg_Template/lwg";
import { Game } from "../Lwg_Template/Game";

export default class UICheckIn extends CheckIn.CheckInScene {

    checkInNodeDec(): void {
        if (CheckIn._lastCheckDate.date == (new Date).getDate()) {
            this.self['WeChat'].visible = false;
            this.self['OPPO'].visible = false;
        } else {
            switch (Game._platform) {
                case Game._platformTpye.OPPO:
                    this.self['OPPO'].visible = true;
                    this.self['WeChat'].visible = false;
                    break;
                case Game._platformTpye.WeChat:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    break;
                case Game._platformTpye.Bytedance:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    break;

                default:
                    break;
            }
        }
    }

    checkInOnEnable(): void {

        ADManager.TAPoint(TaT.BtnShow, 'AD3award');

        Setting.setBtnVinish();
        let ChinkTip = this.self['BtnSeven'].getChildByName('ChinkTip') as Laya.Image;
        ChinkTip.visible = false;
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
            Pic_Board.skin = 'UI/Common/kuang1.png'
        } else {
            Pic_Gold.visible = true;
            Num.visible = true;
            Num.text = dataSource[CheckIn.CheckProPerty.rewardNum];
            ChinkTip.visible = false;
            Pic_Board.skin = 'UI/Common/kuang2.png'
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

    checkInBtnClick(): void {
        lwg.Click.on('largen', this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
        lwg.Click.on('largen', this.self['BtnThreeGet_WeChat'], this, null, null, this.btnThreeGetUp);
        lwg.Click.on(Click.Type.noEffect, this.self['Select_WeChat'], this, null, null, this.btnSelectUp);

        lwg.Click.on(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
        lwg.Click.on(Click.Type.largen, this.self['BtnThreeGet_OPPO'], this, null, null, this.btnThreeGetUp);

        lwg.Click.on('largen', this.self['BtnBack'], this, null, null, this.btnBackUp);
    }
    btnOffClick(): void {
        lwg.Click.off('largen', this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
        lwg.Click.off('largen', this.self['BtnThreeGet_WeChat'], this, null, null, this.btnThreeGetUp);
        lwg.Click.off(Click.Type.noEffect, this.self['Select_WeChat'], this, null, null, this.btnSelectUp);

        lwg.Click.off(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
        lwg.Click.off(Click.Type.largen, this.self['BtnThreeGet_OPPO'], this, null, null, this.btnThreeGetUp);

        lwg.Click.off('largen', this.self['BtnBack'], this, null, null, this.btnBackUp);
    }
    btnBackUp(): void {
        this.self.close();
    }
    btnThreeGetUp(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'AD3award');
            this.btnGetUpFunc(3);
        })
    }

    btnGetUp(): void {
        if (Game._platform === Game._platformTpye.Bytedance) {
            if (this.self['Dot'].visible) {
                ADManager.ShowReward(() => {
                    ADManager.TAPoint(TaT.BtnClick, 'AD3award');
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

        this.btnOffClick();
        let index = CheckIn._checkInNum.number;
        let target;
        if (index < 6) {
            target = CheckIn._checkList.getCell(index)
        } else {
            target = this.self['BtnSeven'];
        }
        Animation2D.swell_shrink(target, 1, 1.1, 100, 0, () => {
            // 特效
            let arr = [[111, 191], [296, 191], [486, 191], [111, 394], [296, 394], [486, 394], [306, 597
            ]];
            Effects.createExplosion_Rotate(this.self['SceneContent'], 25, arr[index][0], arr[index][1], 'star', 10, 15);
            let rewardNum = CheckIn.todayCheckIn_7Days();
            if (CheckIn._checkInNum.number === 7) {
                let ChinkTip = this.self['BtnSeven'].getChildByName('ChinkTip') as Laya.Image;
                ChinkTip.visible = true;
                let Num = this.self['BtnSeven'].getChildByName('Num') as Laya.Image;
                Num.visible = false;
                let Pic_Gold = this.self['BtnSeven'].getChildByName('Pic_Gold') as Laya.Image;
                Pic_Gold.visible = false;
                this.self['BtnSeven'].skin = 'UI/Common/kuang1.png';
            }
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                Gold.addGold(rewardNum * number);
                this.self.close();
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

    checkInOnUpdate(): void {
        if (CheckIn._lastCheckDate.date !== (new Date).getDate()) {
            switch (Game._platform) {
                case Game._platformTpye.WeChat:
                    if (this.self['Dot'].visible) {
                        this.self['BtnGet_WeChat'].visible = false;
                        this.self['BtnThreeGet_WeChat'].visible = true;
                    } else {
                        this.self['BtnGet_WeChat'].visible = true;
                        this.self['BtnThreeGet_WeChat'].visible = false;
                    }
                    break;

                case Game._platformTpye.Bytedance:
                    this.self['BtnGet_WeChat'].visible = true;
                    this.self['BtnThreeGet_WeChat'].visible = false;
                    break;
                default:
                    break;
            }
        }
    }

    checkInOnDisable(): void {
        Setting.setBtnAppear();
    }
}