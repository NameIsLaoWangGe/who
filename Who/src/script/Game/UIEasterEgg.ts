import { Click, Admin, Setting, Gold, Shop, EventAdmin, Task, EasterEgg } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";

export default class UIEasterEgg extends EasterEgg.EasterEggScene {

    easterEggOnAwake(): void {
        ADManager.TAPoint(TaT.BtnShow, 'power');
        ADManager.TAPoint(TaT.BtnShow, 'Adtips');

        Setting.setBtnVinish();
        Gold.goldVinish();
        this.initDisplay();
        EasterEgg._easterEgg_1.value = true;
    }

    /**初始化,显示任务完成状况*/
    initDisplay(): void {
        for (let index = 0; index < EasterEgg._easterEgg_1Arr.length; index++) {
            const element = EasterEgg._easterEgg_1Arr[index];

            //显示是否完成 
            let name = 'Complete' + (index + 1);
            let complete = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.complete);
            if (complete) {
                this.self[name].skin = 'UI/EasterEgg_Aotoman/Task/wancheng.png';
            } else {
                this.self[name].skin = 'UI/EasterEgg_Aotoman/Task/wancheng2.png';
            }

            // 显示需要展示的进度
            let assemblyName = 'Assembly' + (index + 1);
            let Num = this.self[assemblyName].getChildByName('Num') as Laya.Label;
            if (Num) {
                let condetion = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.condition);
                let resCondetion = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.resCondition);
                Num.text = resCondetion + '/' + condetion;
            }

            switch (index) {
                case 0:
                    if (complete !== 1) {
                        Click.on(Click.Type.largen, this.self['BtnGoUp'], this, null, null, () => {
                            Admin._openScene(Admin.SceneName.UISkinXD, null, this.self);
                        });
                    }
                    break;

                case 3:
                    break;
                case 4:
                    if (complete !== 1) {
                        Click.on(Click.Type.largen, this.self['BtnHint'], this, null, null, () => {
                            ADManager.ShowReward(() => {
                                this.self['DialogHint'].x = 0;
                            })
                        });

                        Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, () => {
                            this.self['DialogHint'].x = -800;
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }


    easterEggBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            this.self.close();
        });
        Click.on(Click.Type.largen, this.self['BtnAotuman'], this, null, null, () => {
            this.clickNum++;
            this.clickSwitch = true;
        });
        Click.on(Click.Type.largen, this.self['BtnInject'], this, null, null, () => {

            ADManager.TAPoint(TaT.BtnClick, 'power');
        });
        Click.on(Click.Type.largen, this.self['BtnAssembly4No'], this, null, null, () => {
            this.self['DialogAssembly4'].x = 800;
        });
        Click.on(Click.Type.largen, this.self['BtnAssembly4Yes'], this, null, null, () => {
            ADManager.ShowReward(() => {

                this.self['DialogAssembly4'].x = 0;
            })
        });

        Click.on(Click.Type.largen, this.self['BtnHint'], this, null, null, () => {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'Adtips');

                this.self['DialogHint'].x = 0;
            })
        });

        Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, () => {
            this.self['DialogHint'].x = -800;
        });
    };


    /**连续点击5次的彩蛋记录*/
    clickNum: number = 0;
    clickSwitch: boolean = false;
    clickTime: number = 0;
    /**连续点五次彩蛋*/
    clickStraight(): void {
        if (this.clickSwitch) {
            this.clickTime++;
            if (this.clickTime >= 60) {
                this.clickSwitch = false;
                this.clickNum = 0;
            } else {
                if (this.clickNum >= 5) {
                    this.self['DialogAssembly4'].x = 0;
                    this.clickSwitch = false;
                    this.clickNum = 0;
                }
            }
        } else {
            this.clickTime = 0;
        }
    }

    easterEggOnUpdate(): void {
        this.clickStraight();
    }

    easterEggOnDisable(): void {
        Setting.setBtnAppear();
        Gold.goldAppear();
        EventAdmin.notify(EasterEgg.EventType.trigger);
    }

}