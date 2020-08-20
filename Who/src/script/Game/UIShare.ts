import { lwg, Click, Admin, EventAdmin, Gold, Dialog, Animation2D, Effects } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate, GSene3D } from "../Lwg_Template/Global";
import RecordManager from "../TJ/RecordManager";
import { Game } from "../Lwg_Template/Game";
import ADManager, { TaT } from "../TJ/Admanager";

export default class UIShare extends lwg.Admin.Scene {
    lwgOnAwake(): void {
        Admin._gameStart = false;
        // 不同渠道显示不同内容
        if (Game._platform !== Game._platformTpye.Bytedance) {
            this.self['BtnClose'].visible = false;
            Laya.timer.once(2000, this, () => {
                this.self['BtnClose'].visible = true;
            })
            this.self['WeChat'].visible = true;
            this.self['Bytedance'].visible = false;
        } else {
            this.self['WeChat'].visible = false;
            this.self['Bytedance'].visible = true;

            this.self['BtnClose_Bytedance'].visible = false;
            Laya.timer.frameOnce(180, this, () => {
                this.self['BtnClose_Bytedance'].visible = true;
            })
        }
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.BtnShow, 'closeword_share');
        ADManager.TAPoint(TaT.BtnShow, 'sharebt_share');

        this.endPhoto();

        // 小照片
        let index;
        if (Game._gameLevel.value > 10) {
            index = Game._gameLevel.value % 10 + 1;
        } else {
            index = Game._gameLevel.value;
        }
        let url = 'UI/Share/Photo/' + index + '.png';
        this.self['SmallPhoto'].skin = url;
    }

    lwgOpenAni(): number {
        this.aniTime = 100;
        this.aniDelayde = 100;

        this.self['SmallFram'].x -= 500;
        this.self['Logo'].y -= 500;
        this.self['BtnShare_Bytedance'].alpha = 0;
        Animation2D.rotate_Scale(this.self['BigFrame'], 45, 0, 0, 600, 1, 1, this.aniTime * 4.5, this.aniDelayde * 1, () => {
            Animation2D.move_Simple_01(this.self['SmallFram'], this.self['SmallFram'].x, this.self['SmallFram'].y, this.self['SmallFram'].x += 500, this.self['SmallFram'].y, this.aniTime * 2, Laya.Ease.cubicOut, this.aniDelayde);

            Animation2D.move_Simple_01(this.self['Logo'], this.self['Logo'].x, this.self['Logo'].y, this.self['Logo'].x, this.self['Logo'].y += 500, this.aniTime * 2, Laya.Ease.cubicOut, this.aniDelayde * 2);

            Animation2D.bombs_Appear(this.self['BtnShare_Bytedance'], 0, 1, 1.2, 0, this.aniTime * 2, this.aniTime * 1, this.aniDelayde * 4, null, () => {
                RecordManager.stopAutoRecord();
            });


            let hotAddNum = Math.floor(Math.random() * 100 + 900);
            Laya.timer.frameLoop(1, this, () => {
                if (Number(this.self['HotNum'].text) < hotAddNum) {
                    this.self['HotNum'].text = Number(this.self['HotNum'].text) + 6;
                }
            });

            Laya.timer.once(this.aniDelayde * 7, this, () => { this.self['Icon_hand'].skin = 'UI/Share/tubiao_1-2.png'; })
            Animation2D.rotate_Scale(this.self['Icon_hand'], -10, 2, 2, 0, 1, 1, this.aniTime * 4, this.aniDelayde * 7);

        })

        // this.self['BtnNoShare_Bytedance'].alpha = 0;
        // Animation2D.fadeOut(this.self['BtnNoShare_Bytedance'], 0, 1, this.aniTime, this.aniDelayde * 20);

        Effects.createExplosion_Rotate(this.self['SceneContent'], 40, this.self['SceneContent'].width / 2, this.self['SceneContent'].height / 2 - 100, Effects.SkinStyle.star, 20, 15);

        return this.aniTime * 5;
    }

    EndCamera: Laya.Sprite3D;
    /**渲染到大照片上*/
    endPhoto(): void {
        this.EndCamera = GSene3D.MainCamera.clone() as Laya.Sprite3D;
        GSene3D.GameMain3D.addChild(this.EndCamera);
        this.EndCamera.transform.position = GSene3D.PhotoCameraMark.transform.position;
        this.EndCamera.transform.localRotationEuler = GSene3D.PhotoCameraMark.transform.localRotationEuler;
        //渲染到纹理的相机
        let renderTargetCamera: Laya.Camera = this.EndCamera.getChildAt(0) as Laya.Camera;
        //选择渲染目标为纹理
        renderTargetCamera.renderTarget = new Laya.RenderTexture(this.self['BigPhoto'].width, this.self['BigPhoto'].height);
        //渲染顺序
        renderTargetCamera.renderingOrder = -1;
        //清除标记
        renderTargetCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        var rtex = new Laya.Texture(((<Laya.Texture2D>(renderTargetCamera.renderTarget as any))), Laya.Texture.DEF_UV);
        var sp1 = new Laya.Sprite();
        this.self['BigPhoto'].addChild(sp1);
        sp1.graphics.drawTexture(rtex);

        // let mt = new Laya.BlinnPhongMaterial();
        // GSene3D.TouchScreen.meshRenderer.material = mt;
        // mt.albedoTexture = renderTargetCamera.renderTarget;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, this.self['SmallFram'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.noEffect, this.self['BigFrame'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.noEffect, this.self['Background'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.noEffect, this.self['Click1'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.noEffect, this.self['Click2'], this, null, null, this.btnShareUp);

        Click.on(Click.Type.largen, this.self['BtnComplete'], this, null, null, () => {
            this.shareFunc();
        });
        Click.on(Click.Type.largen, this.self['BtnShare_Bytedance'], this, null, null, this.btnShareUp);
        Click.on(Click.Type.largen, this.self['BtnClose_Bytedance'], this, null, null, this.btnNoShareUp);
        // Click.on(Click.Type.largen, this.self['BtnNoShare_Bytedance'], this, null, null, this.btnNoShareUp);
    }

    btnShareUp(): void {
        console.log('分享！')
        RecordManager._share('award', () => {
            this.shareFunc();
            Dialog.createHint_Middle(Dialog.HintContent["分享成功，获得50金币！"]);
            Gold.addGold(50);
            ADManager.TAPoint(TaT.BtnClick, 'sharebt_share');
        })
    }

    btnNoShareUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'closeword_share');
        this.shareFunc();
    }

    shareFunc(): void {
        Admin._openScene(Admin.SceneName.UIVictoryBox, null, this.self);
    }

    lwgOnDisable(): void {
        this.EndCamera.removeSelf();

    }

}