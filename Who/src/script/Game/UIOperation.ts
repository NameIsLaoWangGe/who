import { lwg, Click, Animation2D, Animation3D, Tools, EventAdmin, Admin, Task, Dialog } from "../Lwg_Template/lwg";
import { GVariate, GEnum, GSene3D } from "../Lwg_Template/Global";
import { Game } from "../Lwg_Template/Game";
import ADManager, { TaT } from "../TJ/Admanager";
import RecordManager from "../TJ/RecordManager";

export default class UIOperation extends lwg.Admin.Scene {
    /** @prop {name:TaskProgress, tips:"每个任务的进度条", type:Prefab}*/
    public TaskProgress: Laya.Prefab;
    /**摇杆*/
    Rocker: Laya.Sprite;
    /**任务进度条父节点*/
    TaskBar: Laya.Sprite;
    /**下一个任务按钮*/
    BtnLast: Laya.Sprite;
    /**任务所需修剪的毛发数量对象顺序*/
    _numZoder: Array<any> = [];

    /**可以剩余毛发数量*/
    residueNum: number = 10;
    /**侧面所需理发的数量*/
    _HairParentNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                // console.log('剩余需要修理的头发', this.value);

                let residue = [10, 10, 10, 10, 20, 10, 20, 10, 26, 28];
                let index;
                if (Game._gameLevel.value > 10) {
                    index = Game._gameLevel.value % 10 + 1 - 1;
                } else {
                    index = Game._gameLevel.value - 1;
                }
                if (!residue[index]) {
                    index = 0;
                }
                if (this.value <= residue[index]) {
                    this.switch = false;
                    console.log('任务完成了！');
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    };

    /**左侧胡子的数量*/
    _leftBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                // console.log('剩余左侧胡须', this.value);
                if (this.value <= 10) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**右侧胡子的数量*/
    _rightBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                // console.log('剩余剩余右侧胡须', this.value);
                if (this.value <= 10) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**中间胡子的数量*/
    _middleBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                // console.log('剩余中间胡子', this.value);
                if (this.value <= 10) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**右上角毛发*/
    _upRightBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                // console.log('剩余右上角', this.value);
                if (this.value <= 10) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**左上角毛发*/
    _upLeftBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                // console.log('剩余左上角', this.value);
                if (this.value <= 10) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    lwgNodeDec() {
        this.Rocker = this.self['Rocker'];
        this.TaskBar = this.self['TaskBar'];
        this.BtnLast = this.self['BtnLast'];
    }

    lwgOnAwake(): void {
        GVariate._taskNum = 0;
        Admin._gameStart = true;
        this.createProgress();
        EventAdmin.notify(Task.TaskType.useSkins);
        RecordManager.startAutoRecord();

        ADManager.TAPoint(TaT.LevelStart, 'level' + Game._gameLevel.value);
    }

    lwgOnEnable(): void {
        this.BtnLast.visible = false;
        this.createTaskContent();
        this.mainCameraMove();
        Dialog.createVoluntarilyDialogue(150, 334, Dialog.UseWhere.scene2, 0, 2000, this.self);
    }

    lwgEventReg(): void {
        // 胜利
        EventAdmin.reg(EventAdmin.EventType.closeOperation, this, () => {
            this.self.close();
        })

        // 胜利
        EventAdmin.reg(EventAdmin.EventType.taskReach, this, () => {
            if (Admin._gameStart) {
                this.BtnLast.visible = true;
            }
        })

        // 失败
        EventAdmin.reg(EventAdmin.EventType.defeated, this, () => {
            if (Admin._gameStart) {
                Admin._openScene(Admin.SceneName.UIDefeated);
                Admin._gameStart = false;
            }
        })

        // 复活
        EventAdmin.reg(EventAdmin.EventType.resurgence, this, () => {
            Admin._openScene(Admin.SceneName.UIResurgence);
        })

        // 左侧胡子修剪
        EventAdmin.reg(GEnum.EventType.LeftBeard, this, () => {
            this._leftBeardNum.setValue = this._leftBeardNum.value - 1;
        })

        // 右侧胡子修剪
        EventAdmin.reg(GEnum.EventType.RightBeard, this, () => {
            this._rightBeardNum.setValue = this._rightBeardNum.value - 1;
        })

        // 中间的胡子修剪
        EventAdmin.reg(GEnum.EventType.MiddleBeard, this, () => {
            this._middleBeardNum.setValue = this._middleBeardNum.value - 1;
        })

        // 右上角胡子修剪
        EventAdmin.reg(GEnum.EventType.UpRightBeard, this, () => {
            this._upRightBeardNum.setValue = this._upRightBeardNum.value - 1;
        })

        // 左上角胡子修剪
        EventAdmin.reg(GEnum.EventType.UpLeftBeard, this, () => {
            this._upLeftBeardNum.setValue = this._upLeftBeardNum.value - 1;
        })

        // 进度条的变化
        EventAdmin.reg(GEnum.EventType.taskProgress, this, () => {
            /**进度条*/
            let TaskBar0 = this.TaskBar.getChildAt(GVariate._taskNum) as Laya.Sprite;
            let Bar = TaskBar0.getChildByName('Bar') as Laya.Image;
            let sum;
            let value;
            switch (GVariate._taskArr[GVariate._taskNum]) {
                case GEnum.TaskType.HairParent:
                    value = this._HairParentNum.value;
                    sum = this._HairParentNum.sum;
                    break;
                case GEnum.TaskType.LeftBeard:
                    value = this._leftBeardNum.value;
                    sum = this._leftBeardNum.sum;

                    break;
                case GEnum.TaskType.RightBeard:
                    value = this._rightBeardNum.value;
                    sum = this._rightBeardNum.sum;

                    break;
                case GEnum.TaskType.MiddleBeard:
                    value = this._middleBeardNum.value;
                    sum = this._middleBeardNum.sum;

                    break;
                case GEnum.TaskType.UpRightBeard:
                    value = this._upRightBeardNum.value;
                    sum = this._upRightBeardNum.sum;

                    break;
                case GEnum.TaskType.UpLeftBeard:
                    value = this._upLeftBeardNum.value;
                    sum = this._upLeftBeardNum.sum;

                    break;
                default:
                    break;
            }
            Bar.mask.x = (sum - value) * Bar.width / sum - Bar.mask.width;
            // 不超过最大值
            if (Bar.mask.x > 0) {
                Bar.mask.x = 0;
            }
        })
    }

    /**
     * 创建任务进度条,并且居中
     */
    createProgress(): void {
        this.TaskBar.removeChildren(0, this.TaskBar.numChildren);
        let spacing = 100;
        for (let index = 0; index < GVariate._taskArr.length; index++) {
            const TaskPro = Laya.Pool.getItemByCreateFun('TaskPro', this.TaskProgress.create, this.TaskProgress) as Laya.Sprite;
            this.TaskBar.addChild(TaskPro);
            TaskPro.pos(index * spacing, 0);
            let Bar = TaskPro.getChildByName('Bar') as Laya.Image;
            Bar.width = 80;
            let Mask = new Laya.Sprite();
            Mask.loadImage('Frame/UI/ui_orthogon_black.png');
            Mask['renderType'] = 'mask';
            Bar.mask = Mask;
            Mask.width = Bar.width + 20;
            Mask.x = -(Bar.width + 20);
            Mask.height = 25;
        }
        this.TaskBar.width = GVariate._taskArr.length * spacing;
        this.TaskBar.pivotX = this.TaskBar.width / 2;
        this.TaskBar.x = Laya.stage.width / 2;
    }

    /**
     * 创建每个任务需要的修剪内容,一般是毛发的数量
     * */
    createTaskContent(): void {
        for (let index = 0; index < GVariate._taskArr.length; index++) {
            switch (GVariate._taskArr[index]) {
                case GEnum.TaskType.HairParent:

                    this._HairParentNum.setValue = GSene3D.HairParent.numChildren;
                    this._HairParentNum.sum = GSene3D.HairParent.numChildren;
                    this._HairParentNum.index = index;
                    this.monitorHiarLen();
                    this._numZoder.push(this._HairParentNum);

                    break;
                case GEnum.TaskType.LeftBeard:

                    this._leftBeardNum.setValue = GSene3D.LeftBeard.numChildren;
                    this._leftBeardNum.sum = GSene3D.LeftBeard.numChildren;
                    this._leftBeardNum.index = index;
                    this._numZoder.push(this._leftBeardNum);

                    break;
                case GEnum.TaskType.RightBeard:

                    this._rightBeardNum.setValue = GSene3D.RightBeard.numChildren;
                    this._rightBeardNum.sum = GSene3D.RightBeard.numChildren;
                    this._rightBeardNum.index = index;
                    this._numZoder.push(this._rightBeardNum);

                    break;
                case GEnum.TaskType.MiddleBeard:

                    this._middleBeardNum.setValue = GSene3D.MiddleBeard.numChildren;
                    this._middleBeardNum.sum = GSene3D.MiddleBeard.numChildren;
                    this._middleBeardNum.index = index;
                    this._numZoder.push(this._middleBeardNum);

                    break;

                case GEnum.TaskType.UpRightBeard:

                    this._upRightBeardNum.setValue = GSene3D.UpRightBeard.numChildren;
                    this._upRightBeardNum.sum = GSene3D.UpRightBeard.numChildren;
                    this._upRightBeardNum.index = index;
                    this._numZoder.push(this._upRightBeardNum);

                    break;

                case GEnum.TaskType.UpLeftBeard:

                    this._upLeftBeardNum.setValue = GSene3D.UpLeftBeard.numChildren;
                    this._upLeftBeardNum.sum = GSene3D.UpLeftBeard.numChildren;
                    this._upLeftBeardNum.index = index;
                    this._numZoder.push(this._upLeftBeardNum);

                    break;
                default:
                    break;
            }
        }
        // console.log(this._numZoder);
    }

    /**监听每根头发的长度*/
    monitorHiarLen(): void {
        let _HairParentNum = this._HairParentNum;
        for (let index = 0; index < GSene3D.HairParent.numChildren; index++) {
            const element = GSene3D.HairParent.getChildAt(index) as Laya.MeshSprite3D;
            let len = element.transform.localPositionY;
            element['HairLen'] = {
                detection: true,
                value: len,
                get getValue(): number {
                    return this.value
                },
                set setValue(v: number) {
                    if (this.detection) {
                        if (v < 0.19) {
                            // console.log('这根头发理完了！');
                            this.detection = false;
                            _HairParentNum.setValue = _HairParentNum.value - 1;
                        }
                        this.value = v;
                        // console.log('当前头发长度', this.value);
                    } else {
                        // console.log('抱歉!,这根头发已经检测过了');
                    }
                }
            }
        }
    }

    /**
     * 摄像机的移动规则
     * */
    mainCameraMove(): void {
        if (GVariate._taskNum > GVariate._taskArr.length) {
            return;
        }
        EventAdmin.notify(GEnum.EventType.cameraMove, GVariate._taskArr[GVariate._taskNum]);
    }

    lwgBtnClick(): void {
        lwg.Click.on(Click.Type.largen, this.BtnLast, this, null, null, this.btnLastUp, null);
    }

    btnLastUp(e: Laya.Event): void {
        this.BtnLast.visible = false;
        this.moveSwitch = false;
        e.stopPropagation();
        if (GVariate._taskNum >= GVariate._taskArr.length - 1) {
            Admin._openScene(Admin.SceneName.UISkin, null, this.self);
        } else {
            GVariate._taskNum++;
            this.mainCameraMove();
            EventAdmin.notify(GEnum.EventType.taskProgress);
            if (this._numZoder[GVariate._taskNum].value <= 10) {
                EventAdmin.notify(EventAdmin.EventType.taskReach);
            }
        }
    }

    /**触摸位置*/
    touchPosX: number = null;
    touchPosY: number = null;
    moveSwitch: boolean = false;
    onStageMouseDown(e: Laya.Event): void {
        this.moveSwitch = true;
        this.touchPosX = e.stageX;
        this.touchPosY = e.stageY;

        let Camera = GSene3D.MainCamera.getChildByName('MainCamera') as Laya.Camera;

        let hitResult_Touch = Tools.rayScanning(Camera, GSene3D.GameMain3D, new Laya.Vector2(this.touchPosX, this.touchPosY), GSene3D.TouchScreen.name) as Laya.HitResult;

        if (hitResult_Touch) {
            let x = GSene3D.Headcollision.transform.position.x - GSene3D.knife.transform.position.x + hitResult_Touch.point.x;
            let y = GSene3D.Headcollision.transform.position.y - GSene3D.knife.transform.position.y + hitResult_Touch.point.y;
            let z = GSene3D.Headcollision.transform.position.z - GSene3D.knife.transform.position.z + hitResult_Touch.point.z;
            GSene3D.HeadSimulate.transform.position = new Laya.Vector3(x, y, z);
        }
    }

    onStageMouseMove(e: Laya.Event) {
        if (!Admin._gameStart) {
            return;
        }
        if (this.moveSwitch) {
            // 当前任务类型
            switch (GVariate._taskArr[GVariate._taskNum]) {

                case GEnum.TaskType.HairParent:
                    this.razorMove(e);
                    break;

                case GEnum.TaskType.LeftBeard:
                    this.knifeMove(e);
                    break;

                case GEnum.TaskType.RightBeard:
                    this.knifeMove(e);
                    break;

                case GEnum.TaskType.MiddleBeard:
                    this.knifeMove(e);

                    break;
                case GEnum.TaskType.UpRightBeard:
                    this.knifeMove(e);

                    break;

                case GEnum.TaskType.UpLeftBeard:
                    this.knifeMove(e);
                    break;
                default:
                    break;
            }
        }
    }

    /**剃刀在头上运动规则*/
    razorMove(e): void {
        let diffX = e.stageX - this.touchPosX;
        let diffY = e.stageY - this.touchPosY;

        this.Rocker.x += diffX;
        this.Rocker.y += diffY;
        this.touchPosX = e.stageX;
        this.touchPosY = e.stageY;

        GSene3D.Razor.transform.localPositionX -= diffX * 0.01;
        GSene3D.Razor.transform.localPositionY -= diffY * 0.01;
        Tools.maximumDistanceLimi_3D(GSene3D.razorFPos, GSene3D.Razor, 1.5);
    }

    /**刮刀在脸上的移动规则*/
    knifeMove(e): void {
        this.touchPosX = e.stageX;
        this.touchPosY = e.stageY;

        let hitResult = Tools.rayScanning(GSene3D.MainCamera.getChildByName('MainCamera') as Laya.Camera, GSene3D.GameMain3D, new Laya.Vector2(this.touchPosX, this.touchPosY), GSene3D.HeadSimulate.name) as Laya.HitResult;
        // console.log(hitResult);
        if (hitResult) {

            let x = GSene3D.Headcollision.transform.position.x - (GSene3D.HeadSimulate.transform.position.x - hitResult.point.x);
            let y = GSene3D.Headcollision.transform.position.y - (GSene3D.HeadSimulate.transform.position.y - hitResult.point.y);
            let z = GSene3D.Headcollision.transform.position.z - (GSene3D.HeadSimulate.transform.position.z - hitResult.point.z);
            GSene3D.knife.transform.position = new Laya.Vector3(x, y, z);

            // 设置旋转的角度
            if (GSene3D.knife.transform.position.y >= GSene3D.HingeUp.transform.position.y) {

                GSene3D.knife.transform.lookAt(GSene3D.HingeUp.transform.position, new Laya.Vector3(0, 1, 0));

            } else if (GSene3D.knife.transform.position.y <= GSene3D.HingeDown.transform.position.y) {

                GSene3D.knife.transform.lookAt(GSene3D.HingeDown.transform.position, new Laya.Vector3(0, 1, 0));

            } else {
                // 中间脚链的跟随和最大值范围
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0));
            }
        }
    }
    onStageMouseUp(e: Laya.Event) {
        this.touchPosX = null;
        this.touchPosY = null;
        this.moveSwitch = false;
    }

    lwgOnDisable(): void {
    }
}