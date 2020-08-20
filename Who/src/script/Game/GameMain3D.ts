import { lwg, EventAdmin, Admin, Animation3D, Shop, Skin } from "../Lwg_Template/lwg";
import GameMain3D_Razor from "./GameMain3D_Razor";
import GameMain3D_Moustache from "./GameMain3D_Moustache";
import GameMain3D_Floor from "./GameMain3D_Floor";
import { Global, GVariate, GEnum, GSene3D } from "../Lwg_Template/Global";
import GameMain3D_knife from "./GameMain3D_knife";
import { Game } from "../Lwg_Template/Game";
import { lwg3D } from "../Lwg_Template/lwg3D";
import GameMain3D_Dianjupian from "./GameMain3D_Dianjupian";
export default class GameMain3D extends lwg3D.Scene3D {

    constructor() { super(); }

    lwgOnAwake(): void {
        GSene3D.GameMain3D = this.self;
        GSene3D.MainCamera = this.MainCamera;
        GSene3D.PhotoCameraMark = this.self.getChildByName('PhotoCameraMark') as Laya.MeshSprite3D;
        GSene3D.LevelParent_Mark = this.self.getChildByName('LevelParent_Mark') as Laya.MeshSprite3D;
        // 获取关卡prefab
        GSene3D.LevelParent = Laya.loader.getRes("3DPrefab/LayaScene_SampleScene/Conventional/LevelParent.lh") as Laya.MeshSprite3D;


        this.self.addChild(GSene3D.LevelParent);
        GSene3D.LevelParent.transform.position = GSene3D.LevelParent_Mark.transform.position;

        for (let index = 0; index < GSene3D.LevelParent.numChildren; index++) {
            const element = GSene3D.LevelParent.getChildAt(index);
            element.active = false;
        }

        GSene3D.Landmark_Side = this.self.getChildByName('Landmark_Side') as Laya.MeshSprite3D;
        GSene3D.Landmark_Right = this.self.getChildByName('Landmark_Right') as Laya.MeshSprite3D;
        GSene3D.Landmark_Middle = this.self.getChildByName('Landmark_Middle') as Laya.MeshSprite3D;
        GSene3D.Landmark_Left = this.self.getChildByName('Landmark_Left') as Laya.MeshSprite3D;
        GSene3D.Landmark_UpRight = this.self.getChildByName('Landmark_UpRight') as Laya.MeshSprite3D;
        GSene3D.Landmark_UpLeft = this.self.getChildByName('Landmark_UpLeft') as Laya.MeshSprite3D;

        GSene3D.LeftSignknife = this.self.getChildByName('LeftSignknife') as Laya.MeshSprite3D;
        GSene3D.MiddleSignknife = this.self.getChildByName('MiddleSignknife') as Laya.MeshSprite3D;
        GSene3D.RightSignknife = this.self.getChildByName('RightSignknife') as Laya.MeshSprite3D;
        GSene3D.UpRightKnife = this.self.getChildByName('UpRightKnife') as Laya.MeshSprite3D;
        GSene3D.UpLeftKnife = this.self.getChildByName('UpLeftKnife') as Laya.MeshSprite3D;
        GSene3D.Floor = this.self.getChildByName('Floor') as Laya.MeshSprite3D;
        GSene3D.Razor = this.self.getChildByName('Razor') as Laya.MeshSprite3D;
        GSene3D.razorFPos.x = GSene3D.Razor.transform.position.x;
        GSene3D.razorFPos.y = GSene3D.Razor.transform.position.y;
        GSene3D.razorFPos.z = GSene3D.Razor.transform.position.z;

        GSene3D.knifeParent = this.self.getChildByName('knifeParent') as Laya.MeshSprite3D;
        GSene3D.knife = GSene3D.knifeParent.getChildByName('tixudao') as Laya.MeshSprite3D;

        GSene3D.Role = this.self.getChildByName('Role') as Laya.MeshSprite3D;

        GSene3D.TouchScreen = this.self.getChildByName('TouchScreen') as Laya.MeshSprite3D;

        GSene3D.Headcollision = GSene3D.Role.getChildByName('Headcollision') as Laya.MeshSprite3D;
        let TouchHeadRig = GSene3D.Headcollision.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        TouchHeadRig.restitution = 0;

        GSene3D.HeadSimulate = GSene3D.Role.getChildByName('HeadSimulate') as Laya.MeshSprite3D;

        GSene3D.HingeMiddle = GSene3D.Headcollision.getChildByName('HingeMiddle') as Laya.MeshSprite3D;
        GSene3D.HingeUp = GSene3D.Headcollision.getChildByName('HingeUp') as Laya.MeshSprite3D;
        GSene3D.HingeDown = GSene3D.Headcollision.getChildByName('HingeDown') as Laya.MeshSprite3D;

        GSene3D.HeadDecoration = this.self.getChildByName('HeadDecoration') as Laya.MeshSprite3D;
        GSene3D.EyeDecoration = this.self.getChildByName('EyeDecoration') as Laya.MeshSprite3D;

        GSene3D.DressUpMark = this.self.getChildByName('DressUpMark') as Laya.MeshSprite3D;
    }

    lwgEventReg(): void {
        // 重来
        EventAdmin.reg(EventAdmin.EventType.scene3DRefresh, this, () => {
            this.getLevelContent();
        })
        //摄像机的移动,参数为方向
        EventAdmin.reg(GEnum.EventType.cameraMove, this, (direction: string) => {
            this.cameraMove(direction);
        })
        //复活
        EventAdmin.reg(EventAdmin.EventType.scene3DResurgence, this, () => {
            GSene3D.Razor.transform.position = GSene3D.razorFPos;
        })

        // 换眼部装饰
        EventAdmin.reg(GEnum.EventType.changeEyeDecoration, this, () => {
            console.log('换眼部装饰');
            for (let index = 0; index < GSene3D.EyeDecoration.numChildren; index++) {
                const element = GSene3D.EyeDecoration.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Skin._currentEye.name) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        });

        // 更换剃刀
        EventAdmin.reg(GEnum.EventType.changeProp, this, () => {
            console.log('换理发刀');
            let name;
            for (let index = 0; index < GSene3D.Razor.numChildren; index++) {
                const element = GSene3D.Razor.getChildAt(index);
                if (element.name !== 'Blade') {
                    if (element.name !== Shop._currentProp.name) {
                        element.active = false;
                    } else {
                        name = element.name;
                        element.active = true;
                        if (!element.getComponent(GameMain3D_Dianjupian)) {
                            element.addComponent(GameMain3D_Dianjupian);
                        }
                    }
                }
            }
            if (!name) {
                GSene3D.Razor.getChildByName('jiandao').active = true;
            }
        });

        //换剃须刀
        EventAdmin.reg(GEnum.EventType.changeOther, this, () => {

            for (let index = 0; index < GSene3D.knifeParent.numChildren; index++) {
                const element = GSene3D.knifeParent.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Shop._currentOther.name) {
                    element.active = true;
                    GSene3D.knife = element;
                    let script = GSene3D.knife.getComponent(GameMain3D_knife);
                    if (!script) {
                        GSene3D.knife.addComponent(GameMain3D_knife);
                    }
                } else {
                    element.active = false;
                }
            }
            GSene3D.knife.active = false;
        });

        // 换头饰
        EventAdmin.reg(GEnum.EventType.changeHeadDecoration, this, () => {

            for (let index = 0; index < GSene3D.HeadDecoration.numChildren; index++) {
                const element = GSene3D.HeadDecoration.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Skin._currentHead.name) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        });

        // 换眼部装饰
        EventAdmin.reg(GEnum.EventType.changeEyeDecoration, this, () => {
            console.log('换眼部装饰');
            for (let index = 0; index < GSene3D.EyeDecoration.numChildren; index++) {
                const element = GSene3D.EyeDecoration.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Skin._currentEye.name) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        });

        // 皮肤试用
        EventAdmin.reg(GEnum.EventType.changeTrySkin, this, (skinClass, skinName) => {
            console.log(skinClass, skinName);
            let cla;
            if (skinClass == Shop.GoodsClass.Other) {
                cla = GSene3D.knifeParent;
            } else if (skinClass == Shop.GoodsClass.Props) {
                cla = GSene3D.Razor;
            }
            cla.active = true;
            for (let index = 0; index < cla.numChildren; index++) {
                const element = cla.getChildAt(index);
                if (element.name == skinName) {
                    element.active = true;
                    if (skinClass == Shop.GoodsClass.Other) {
                        GSene3D.knife = element;
                    } else if (skinClass == Shop.GoodsClass.Props) {
                        cla = GSene3D.Razor;
                    }
                } else {
                    if (element.name !== 'Blade') {
                        element.active = false;
                    }
                }
            }
        });

        //回到原位
        EventAdmin.reg(GEnum.EventType.goBack, this, () => {
            GSene3D.MainCamera.transform.position = GSene3D.Landmark_Middle.transform.position;
            GSene3D.MainCamera.transform.localRotationEuler = GSene3D.Landmark_Middle.transform.localRotationEuler;
            GSene3D.TouchScreen.transform.localRotationEuler = GSene3D.Landmark_Middle.transform.localRotationEuler;
        });

        //脸红 
        EventAdmin.reg(GEnum.EventType.lianHong, this, () => {
            Admin._gameStart = false;
            let RoleObj = GSene3D.Level.getChildByName('RoleObj') as Laya.MeshSprite3D;
            let ani = RoleObj.getComponent(Laya.Animator) as Laya.Animator;
            if (ani) {
                ani.play("touHongclip");
            }
        })
    };

    lwgOnEnable(): void {
        GSene3D.Floor.addComponent(GameMain3D_Floor);
        GSene3D.Razor.addComponent(GameMain3D_Razor);
        EventAdmin.notify(GEnum.EventType.changeProp);
        EventAdmin.notify(GEnum.EventType.changeOther);
        this.getLevelContent();
    }

    /**获取当前关卡并且设置当前关卡的内容*/
    getLevelContent(): void {
        if (GSene3D.Level) {
            GSene3D.Level.removeSelf();
        }
        GSene3D.LevelParent.active = true;
        let LevelParent0 = GSene3D.LevelParent.clone();
        this.self.addChild(LevelParent0);
        GSene3D.LevelParent.active = false;

        console.log(Game._gameLevel.value);
        let index;
        if (Game._gameLevel.value > 10) {
            index = Game._gameLevel.value % 10 + 1;
        } else {
            index = Game._gameLevel.value;
        }
        GSene3D.Level = LevelParent0.getChildByName('Level' + index) as Laya.MeshSprite3D;

        if (!GSene3D.Level) {
            console.log('本关卡不存在');
        } else {
            GSene3D.Level.active = true;
            GVariate._taskArr = [];
            for (let index = 0; index < GSene3D.Level.numChildren; index++) {
                const element = GSene3D.Level.getChildAt(index);
                if (element.name !== 'CutHairParent' && element.name !== 'StandardParent' && element.name !== 'RoleObj') {
                    GVariate._taskArr.push(element.name);
                }
            }
            GSene3D.HairParent = GSene3D.Level.getChildByName('HairParent') as Laya.MeshSprite3D;
            GSene3D.LeftBeard = GSene3D.Level.getChildByName('LeftBeard') as Laya.MeshSprite3D;
            GSene3D.RightBeard = GSene3D.Level.getChildByName('RightBeard') as Laya.MeshSprite3D;
            GSene3D.MiddleBeard = GSene3D.Level.getChildByName('MiddleBeard') as Laya.MeshSprite3D;
            GSene3D.UpRightBeard = GSene3D.Level.getChildByName('UpRightBeard') as Laya.MeshSprite3D;
            GSene3D.UpLeftBeard = GSene3D.Level.getChildByName('UpLeftBeard') as Laya.MeshSprite3D;
            GSene3D.StandardParent = GSene3D.Level.getChildByName('StandardParent') as Laya.MeshSprite3D;

            GSene3D.Razor.transform.position = GSene3D.razorFPos;
            this.knifeTimeDisplay();
        }
    }

    /**
     * 不同剃毛状态下剃刀和刮刀的显示设置
     * @param name 不传则是全部隐藏
    */
    knifeTimeDisplay(name?: string): void {
        if (name === 'k') {
            GSene3D.knife.active = true;
            if (GSene3D.StandardParent) {
                GSene3D.StandardParent.active = false;
            }
            GSene3D.Razor.active = false;

        } else if (name === 'r') {
            GSene3D.knife.active = false;
            if (GSene3D.StandardParent) {
                GSene3D.StandardParent.active = true;
            }
            GSene3D.Razor.active = true;
            console.log('剃刀出现');

        } else if (!name) {
            GSene3D.knife.active = false;
            if (GSene3D.StandardParent) {
                GSene3D.StandardParent.active = false;
            }
            GSene3D.Razor.active = false;
        }
    }

    /**摄像机移动速度*/
    moveSpeed: number = 1000;
    /**摄像机的移动规则*/
    cameraMove(direction): void {
        console.log('移动方向！', direction);
        switch (direction) {
            case GEnum.TaskType.HairParent:

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Side.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay('r');
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Side.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Side.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.RightBeard:

                GSene3D.knife.transform.position = GSene3D.RightSignknife.transform.position;
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0))

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay('k');
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);


                break;

            case GEnum.TaskType.LeftBeard:

                GSene3D.knife.transform.position = GSene3D.LeftSignknife.transform.position
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0))

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay('k');
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.MiddleBeard:

                GSene3D.knife.transform.position = GSene3D.MiddleSignknife.transform.position
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z)
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0))

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Middle.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay('k');
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Middle.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Middle.transform.localRotationEuler, this.moveSpeed, this);


                break;
            case GEnum.TaskType.UpLeftBeard:

                GSene3D.knife.transform.position = GSene3D.UpLeftKnife.transform.position;
                GSene3D.knife.transform.lookAt(GSene3D.HingeUp.transform.position, new Laya.Vector3(0, 1, 0));
                let Model2 = GSene3D.knife.getChildAt(0) as Laya.MeshSprite3D;

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_UpLeft.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay('k');
                });
                let euler1 = new Laya.Vector3(GSene3D.Landmark_UpLeft.transform.localRotationEuler.x, GSene3D.Landmark_UpLeft.transform.localRotationEuler.y, GSene3D.Landmark_UpLeft.transform.localRotationEuler.z);
                Animation3D.RotateTo(GSene3D.MainCamera, euler1, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, euler1, this.moveSpeed, this);


                break;

            case GEnum.TaskType.UpRightBeard:
                GSene3D.knife.transform.position = GSene3D.UpRightKnife.transform.position;
                GSene3D.knife.transform.lookAt(GSene3D.HingeUp.transform.position, new Laya.Vector3(0, 1, 0));
                let Model1 = GSene3D.knife.getChildAt(0) as Laya.MeshSprite3D;

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_UpRight.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay('k');

                });

                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_UpRight.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_UpRight.transform.localRotationEuler, this.moveSpeed, this);


                break;

            case GEnum.TaskType.movePhotoLocation:
                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.DressUpMark.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                    this.knifeTimeDisplay();
                });

                let euler2 = new Laya.Vector3(GSene3D.DressUpMark.transform.localRotationEuler.x, GSene3D.DressUpMark.transform.localRotationEuler.y, GSene3D.DressUpMark.transform.localRotationEuler.z);

                Animation3D.RotateTo(GSene3D.MainCamera, euler2, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, euler2, this.moveSpeed, this);

                break;

            default:
                break;
        }
    }


}