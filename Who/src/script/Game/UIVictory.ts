import { lwg, Click, Admin, EventAdmin, Gold, Dialog, Animation2D, Shop, Task, Setting, PalyAudio } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate, GSene3D } from "../Lwg_Template/Global";
import ADManager, { TaT } from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";
import RecordManager from "../TJ/RecordManager";

export default class UIVictory extends lwg.Admin.Scene {


    GlodNum: Laya.Sprite;
    /**本关应该给予多少金币*/
    getGoldNum: number;
    lwgNodeDec(): void {
        this.GlodNum = this.self['GlodNum'];

        ADManager.TAPoint(TaT.BtnShow, 'ADrewardbt_success');
        ADManager.TAPoint(TaT.BtnShow, 'closeword_success');

    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.LevelFinish, 'level' + Game._gameLevel.value);

        this.getGoldNum = 50;
        Gold.goldAppear();
        Setting.setBtnAppear();
        Game._gameLevel.value++;
        PalyAudio.playVictorySound();

        lwg.Effects.createFireworks(Laya.stage, 40, 430, 200);
        lwg.Effects.createFireworks(Laya.stage, 40, 109, 200);

        lwg.Effects.createLeftOrRightJet(Laya.stage, 'right', 40, 720, 300);
        lwg.Effects.createLeftOrRightJet(Laya.stage, 'left', 40, 0, 300);

        EventAdmin.notify(Task.TaskType.victory);

        switch (Game._platform) {
            case Game._platformTpye.OPPO:
                this.self['OPPO'].visible = true;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = false;
                this.self['P202'].removeSelf();
                this.getGoldDisPlay(1);
                break;

            case Game._platformTpye.WeChat:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = true;
                this.self['Bytedance'].visible = false;
                this.self['BtnAdv_WeChat'].visible = true;
                this.self['BtnNormal_WeChat'].visible = false;
                this.self['Dot_WeChat'].visible = true;
                this.self['P202'].removeSelf();
                this.getGoldDisPlay(10);
                break;

            case Game._platformTpye.Bytedance:
                this.self['OPPO'].visible = false;
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = true;
                this.self['Dot_Bytedance'].visible = true;
                this.getGoldDisPlay(10);

                break;

            default:
                break;
        }
    }

    lwgOpenAni(): number {
        if (Game._platform == Game._platformTpye.OPPO) {
            this.self['Multiply10'].alpha = 0;
            return;
        }
        this.self['Multiply10'].alpha = 0;
        this.self['GlodNum'].alpha = 0;
        this.self['BtnAdv_WeChat'].alpha = 0;
        this.self['Select'].alpha = 0;
        Animation2D.move_Simple(this.self['Logo'], this.self['Logo'].x, this.self['Logo'].y - 500, this.self['Logo'].x, this.self['Logo'].y, this.aniTime * 5, this.aniDelayde * 0, Laya.Ease.cubicOut, () => {
            Animation2D.scale_Alpha(this.self['Multiply10'], 0, 0, 0, 1, 1, 1, this.aniTime * 3);

            Animation2D.bombs_Appear(this.self['GlodNum'], 0, 1, 1.2, 0, this.aniTime * 2, this.aniTime * 1, this.aniDelayde * 3);
            Animation2D.bombs_Appear(this.self['BtnAdv_WeChat'], 0, 1, 1.2, 0, this.aniTime * 2, this.aniTime * 1, this.aniDelayde * 5);
            Animation2D.fadeOut(this.self['Select'], 0, 1, this.aniTime * 2, this.aniDelayde * 7);
        });

        return 0;
    }

    /**本关获得金币显示*/
    getGoldDisPlay(number): void {
        let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
        Num.text = (this.getGoldNum * number).toString();
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, this.self['BtnSelect_Wechat'], this, null, null, this.btnSelectUp);
        Click.on(Click.Type.largen, this.self['BtnAdv_WeChat'], this, null, null, this.btnAdvUp);
        Click.on(Click.Type.largen, this.self['BtnNormal_WeChat'], this, null, null, this.btnNormalUp);

        Click.on(Click.Type.largen, this.self['BtnAdv_OPPO'], this, null, null, this.btnAdvUp);
        Click.on(Click.Type.largen, this.self['BtnNormal_OPPO'], this, null, null, this.btnNormalUp);

        Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNext_BytedanceUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
    }

    offClick(): void {
        Click.off(Click.Type.noEffect, this.self['BtnSelect_Wechat'], this, null, null, this.btnSelectUp);
        Click.off(Click.Type.largen, this.self['BtnAdv_WeChat'], this, null, null, this.btnAdvUp);
        Click.off(Click.Type.largen, this.self['BtnNormal_WeChat'], this, null, null, this.btnNormalUp);

        Click.off(Click.Type.largen, this.self['BtnAdv_OPPO'], this, null, null, this.btnAdvUp);
        Click.off(Click.Type.largen, this.self['BtnNormal_OPPO'], this, null, null, this.btnNormalUp);

        Click.off(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNext_BytedanceUp);
        Click.off(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
    }

    btnNext_BytedanceUp(): void {
        if (this.self['Dot_Bytedance'].visible) {
            this.btnAdvUp();
        } else {
            this.btnNormalUp();
        }
    }

    addOrSub: string = 'add';
    btnSelectUp(): void {

        let Dot;
        switch (Game._platform) {
            case Game._platformTpye.Bytedance:
                Dot = this.self['Dot_Bytedance'];
                break;
            case Game._platformTpye.WeChat:
                Dot = this.self['Dot_WeChat'];
                break;

            default:
                break;
        }
        if (Dot.visible) {
            // 按钮格式
            Dot.visible = false;
            this.self['BtnAdv_WeChat'].visible = false;
            this.self['BtnNormal_WeChat'].visible = true;
            this.addOrSub = 'sub';

            // 图片消失动画
            let Multiply10 = this.self['Multiply10'] as Laya.Image;
            Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 0, 0, 0, 100)
            // 金币下降动画
            let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
            Laya.timer.loop(30, this, () => {

                if (this.addOrSub == 'sub') {
                    if (Number(Num.text) < this.getGoldNum) {
                        Num.text = (this.getGoldNum).toString();
                        this.addOrSub = null;
                    } else {
                        Num.text = (Number(Num.text) - 30).toString();
                    }
                }
            })

        } else {
            // 按钮格式
            Dot.visible = true;
            this.self['BtnAdv_WeChat'].visible = true;
            this.self['BtnNormal_WeChat'].visible = false;
            this.addOrSub = 'add';

            // 图片出现动画
            let Multiply10 = this.self['Multiply10'] as Laya.Image;
            Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 1, 1, 1, 100)
            // 金币上涨动画
            let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
            Laya.timer.loop(30, this, () => {
                if (this.addOrSub == 'add') {
                    if (Number(Num.text) > this.getGoldNum * 10) {
                        Num.text = (this.getGoldNum * 10).toString();
                        this.addOrSub = null;
                    } else {
                        Num.text = (Number(Num.text) + 30).toString();
                    }
                }
            })
        }
    }

    btnNormalUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_success');
        this.offClick();
        Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
            this.advFunc(1);
        });
    }

    btnAdvUp(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_success');
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                this.advFunc(10);
            });
        })
    }

    /**
     * 奖励
     * @param number 倍数
     */
    advFunc(number: number): void {
        Gold.addGold(this.getGoldNum * number);
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        Admin._openScene(Admin.SceneName.UIStart, null, this.self);
    }

    lwgOnDisable(): void {
        // Setting.setBtnVinish();
        EventAdmin.notify(GEnum.EventType.goBack);
    }
}