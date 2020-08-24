(function () {
    'use strict';

    class ADManager {
        static ShowBanner() {
            let p = new TJ.ADS.Param();
            p.place = TJ.ADS.Place.BOTTOM | TJ.ADS.Place.CENTER;
            TJ.ADS.Api.ShowBanner(p);
        }
        static CloseBanner() {
            let p = new TJ.ADS.Param();
            p.place = TJ.ADS.Place.BOTTOM | TJ.ADS.Place.CENTER;
            TJ.ADS.Api.RemoveBanner(p);
        }
        static ShowNormal() {
            TJ.API.AdService.ShowNormal(new TJ.API.AdService.Param());
        }
        static showNormal2() {
            TJ.API.AdService.ShowNormal(new TJ.API.AdService.Param());
        }
        static ShowReward(rewardAction, CDTime = 500) {
            if (Admin._platform === Admin._platformTpye.OPPO) {
                rewardAction();
                EventAdmin.notify(Task.EventType.adsTime);
                EventAdmin.notify(EasterEgg.EventType.easterEggAds);
                return;
            }
            if (ADManager.CanShowCD) {
                PalyAudio.stopMusic();
                console.log("?????");
                let p = new TJ.ADS.Param();
                p.extraAd = true;
                let getReward = false;
                p.cbi.Add(TJ.Define.Event.Reward, () => {
                    getReward = true;
                    PalyAudio.playMusic(PalyAudio.voiceUrl.bgm, 0, 1000);
                    if (rewardAction != null) {
                        rewardAction();
                        EventAdmin.notify(Task.EventType.adsTime);
                        EventAdmin.notify(EasterEgg.EventType.easterEggAds);
                    }
                });
                p.cbi.Add(TJ.Define.Event.Close, () => {
                    if (!getReward) {
                        PalyAudio.playMusic(PalyAudio.voiceUrl.bgm, 0, 1000);
                        console.log('观看完整广告才能获取奖励哦！');
                        Admin._openScene(Admin.SceneName.UIADSHint, null, () => {
                        });
                    }
                });
                p.cbi.Add(TJ.Define.Event.NoAds, () => {
                    PalyAudio.playMusic(PalyAudio.voiceUrl.bgm, 0, 1000);
                    Dialog.createHint_Middle(Dialog.HintContent["暂时没有广告，过会儿再试试吧！"]);
                });
                TJ.ADS.Api.ShowReward(p);
                ADManager.CanShowCD = false;
                setTimeout(() => {
                    ADManager.CanShowCD = true;
                }, CDTime);
            }
        }
        static Event(param, value) {
            console.log("Param:>" + param + "Value:>" + value);
            let p = new TJ.GSA.Param();
            if (value == null) {
                p.id = param;
            }
            else {
                p.id = param + value;
            }
            console.log(p.id);
            TJ.GSA.Api.Event(p);
        }
        static initShare() {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                this.wx.onShareAppMessage(() => {
                    return {
                        title: this.shareContent,
                        imageUrl: this.shareImgUrl,
                        query: ""
                    };
                });
                this.wx.showShareMenu({
                    withShareTicket: true,
                    success: null,
                    fail: null,
                    complete: null
                });
            }
        }
        static lureShare() {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                this.wx.shareAppMessage({
                    title: this.shareContent,
                    imageUrl: this.shareImgUrl,
                    query: ""
                });
            }
        }
        static VibrateShort() {
            TJ.API.Vibrate.Short();
        }
        static Vibratelong() {
            TJ.API.Vibrate.Long();
        }
        static TAPoint(type, name) {
            let p = new TJ.API.TA.Param();
            p.id = name;
            switch (type) {
                case TaT.BtnShow:
                    TJ.API.TA.Event_Button_Show(p);
                    break;
                case TaT.BtnClick:
                    TJ.API.TA.Event_Button_Click(p);
                    break;
                case TaT.PageShow:
                    TJ.API.TA.Event_Page_Show(p);
                    break;
                case TaT.PageEnter:
                    TJ.API.TA.Event_Page_Enter(p);
                    break;
                case TaT.PageLeave:
                    TJ.API.TA.Event_Page_Leave(p);
                    break;
                case TaT.LevelStart:
                    TJ.API.TA.Event_Level_Start(p);
                    console.log('本关开始打点');
                    break;
                case TaT.LevelFail:
                    TJ.API.TA.Event_Level_Fail(p);
                    console.log('本关失败打点');
                    break;
                case TaT.LevelFinish:
                    TJ.API.TA.Event_Level_Finish(p);
                    console.log('本关胜利打点');
                    break;
            }
        }
    }
    ADManager.CanShowCD = true;
    ADManager.wx = Laya.Browser.window.wx;
    ADManager.shareImgUrl = "http://image.tomatojoy.cn/6847506204006681a5d5fa0cd91ce408";
    ADManager.shareContent = "剃头大师！";
    var TaT;
    (function (TaT) {
        TaT[TaT["BtnShow"] = 0] = "BtnShow";
        TaT[TaT["BtnClick"] = 1] = "BtnClick";
        TaT[TaT["PageShow"] = 2] = "PageShow";
        TaT[TaT["PageEnter"] = 3] = "PageEnter";
        TaT[TaT["PageLeave"] = 4] = "PageLeave";
        TaT[TaT["LevelStart"] = 5] = "LevelStart";
        TaT[TaT["LevelFinish"] = 6] = "LevelFinish";
        TaT[TaT["LevelFail"] = 7] = "LevelFail";
    })(TaT || (TaT = {}));

    var lwg;
    (function (lwg) {
        let Pause;
        (function (Pause) {
            function _createBtnPause(parent) {
                let sp;
                Laya.loader.load('prefab/BtnPause.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 167);
                    sp.zOrder = 0;
                    Pause.BtnPauseNode = sp;
                    Pause.BtnPauseNode.name = 'BtnPauseNode';
                    Click.on(Click.Type.largen, sp, null, null, null, btnPauseUp, null);
                }));
            }
            Pause._createBtnPause = _createBtnPause;
            function btnPauseUp(event) {
                event.stopPropagation();
                event.currentTarget.scale(1, 1);
                lwg.Admin._openScene('UIPause', null, null, null);
            }
            Pause.btnPauseUp = btnPauseUp;
        })(Pause = lwg.Pause || (lwg.Pause = {}));
        let Elect;
        (function (Elect) {
            function _createP201_01(parent) {
                let sp;
                Laya.loader.load('prefab/P201.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('P201', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(80, 290);
                    sp.zOrder = 65;
                }));
            }
            Elect._createP201_01 = _createP201_01;
        })(Elect = lwg.Elect || (lwg.Elect = {}));
        let Dialog;
        (function (Dialog) {
            let HintContent;
            (function (HintContent) {
                HintContent[HintContent["\u91D1\u5E01\u4E0D\u591F\u4E86\uFF01"] = 0] = "\u91D1\u5E01\u4E0D\u591F\u4E86\uFF01";
                HintContent[HintContent["\u6CA1\u6709\u53EF\u4EE5\u8D2D\u4E70\u7684\u76AE\u80A4\u4E86\uFF01"] = 1] = "\u6CA1\u6709\u53EF\u4EE5\u8D2D\u4E70\u7684\u76AE\u80A4\u4E86\uFF01";
                HintContent[HintContent["\u6682\u65F6\u6CA1\u6709\u5E7F\u544A\uFF0C\u8FC7\u4F1A\u513F\u518D\u8BD5\u8BD5\u5427\uFF01"] = 2] = "\u6682\u65F6\u6CA1\u6709\u5E7F\u544A\uFF0C\u8FC7\u4F1A\u513F\u518D\u8BD5\u8BD5\u5427\uFF01";
                HintContent[HintContent["\u6682\u65E0\u76AE\u80A4!"] = 3] = "\u6682\u65E0\u76AE\u80A4!";
                HintContent[HintContent["\u6682\u65E0\u5206\u4EAB!"] = 4] = "\u6682\u65E0\u5206\u4EAB!";
                HintContent[HintContent["\u6682\u65E0\u63D0\u793A\u673A\u4F1A!"] = 5] = "\u6682\u65E0\u63D0\u793A\u673A\u4F1A!";
                HintContent[HintContent["\u89C2\u770B\u5B8C\u6574\u5E7F\u544A\u624D\u80FD\u83B7\u53D6\u5956\u52B1\u54E6\uFF01"] = 6] = "\u89C2\u770B\u5B8C\u6574\u5E7F\u544A\u624D\u80FD\u83B7\u53D6\u5956\u52B1\u54E6\uFF01";
                HintContent[HintContent["\u901A\u5173\u4E0A\u4E00\u5173\u624D\u80FD\u89E3\u9501\u672C\u5173\uFF01"] = 7] = "\u901A\u5173\u4E0A\u4E00\u5173\u624D\u80FD\u89E3\u9501\u672C\u5173\uFF01";
                HintContent[HintContent["\u5206\u4EAB\u6210\u529F\u540E\u624D\u80FD\u83B7\u53D6\u5956\u52B1\uFF01"] = 8] = "\u5206\u4EAB\u6210\u529F\u540E\u624D\u80FD\u83B7\u53D6\u5956\u52B1\uFF01";
                HintContent[HintContent["\u5206\u4EAB\u6210\u529F!"] = 9] = "\u5206\u4EAB\u6210\u529F!";
                HintContent[HintContent["\u6682\u65E0\u89C6\u9891\uFF0C\u73A9\u4E00\u5C40\u6E38\u620F\u4E4B\u540E\u5206\u4EAB\uFF01"] = 10] = "\u6682\u65E0\u89C6\u9891\uFF0C\u73A9\u4E00\u5C40\u6E38\u620F\u4E4B\u540E\u5206\u4EAB\uFF01";
                HintContent[HintContent["\u6D88\u80172\u70B9\u4F53\u529B\uFF01"] = 11] = "\u6D88\u80172\u70B9\u4F53\u529B\uFF01";
                HintContent[HintContent["\u4ECA\u65E5\u4F53\u529B\u798F\u5229\u5DF2\u9886\u53D6\uFF01"] = 12] = "\u4ECA\u65E5\u4F53\u529B\u798F\u5229\u5DF2\u9886\u53D6\uFF01";
                HintContent[HintContent["\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F97125\u91D1\u5E01\uFF01"] = 13] = "\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F97125\u91D1\u5E01\uFF01";
                HintContent[HintContent["\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F9750\u91D1\u5E01\uFF01"] = 14] = "\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F9750\u91D1\u5E01\uFF01";
                HintContent[HintContent["\u9650\u5B9A\u76AE\u80A4\u5DF2\u7ECF\u83B7\u5F97\uFF0C\u8BF7\u524D\u5F80\u76AE\u80A4\u754C\u9762\u67E5\u770B\u3002"] = 15] = "\u9650\u5B9A\u76AE\u80A4\u5DF2\u7ECF\u83B7\u5F97\uFF0C\u8BF7\u524D\u5F80\u76AE\u80A4\u754C\u9762\u67E5\u770B\u3002";
                HintContent[HintContent["\u5206\u4EAB\u5931\u8D25\uFF01"] = 16] = "\u5206\u4EAB\u5931\u8D25\uFF01";
                HintContent[HintContent["\u5151\u6362\u7801\u9519\u8BEF\uFF01"] = 17] = "\u5151\u6362\u7801\u9519\u8BEF\uFF01";
                HintContent[HintContent["\u5C1A\u672A\u83B7\u5F97\u8BE5\u5546\u54C1!"] = 18] = "\u5C1A\u672A\u83B7\u5F97\u8BE5\u5546\u54C1!";
                HintContent[HintContent["\u606D\u559C\u83B7\u5F97\u65B0\u76AE\u80A4!"] = 19] = "\u606D\u559C\u83B7\u5F97\u65B0\u76AE\u80A4!";
                HintContent[HintContent["\u8BF7\u524D\u5F80\u76AE\u80A4\u9650\u5B9A\u754C\u9762\u83B7\u53D6!"] = 20] = "\u8BF7\u524D\u5F80\u76AE\u80A4\u9650\u5B9A\u754C\u9762\u83B7\u53D6!";
                HintContent[HintContent["\u901A\u8FC7\u76F8\u5E94\u7684\u5173\u5361\u6570\u8FBE\u5230\u5C31\u53EF\u4EE5\u5F97\u5230\u4E86!"] = 21] = "\u901A\u8FC7\u76F8\u5E94\u7684\u5173\u5361\u6570\u8FBE\u5230\u5C31\u53EF\u4EE5\u5F97\u5230\u4E86!";
                HintContent[HintContent["\u70B9\u51FB\u91D1\u5E01\u62BD\u5956\u6309\u94AE\u8D2D\u4E70!"] = 22] = "\u70B9\u51FB\u91D1\u5E01\u62BD\u5956\u6309\u94AE\u8D2D\u4E70!";
                HintContent[HintContent["\u6CA1\u6709\u9886\u53D6\u6B21\u6570\u4E86\uFF01"] = 23] = "\u6CA1\u6709\u9886\u53D6\u6B21\u6570\u4E86\uFF01";
                HintContent[HintContent["\u589E\u52A0\u4E09\u6B21\u5F00\u542F\u5B9D\u7BB1\u6B21\u6570\uFF01"] = 24] = "\u589E\u52A0\u4E09\u6B21\u5F00\u542F\u5B9D\u7BB1\u6B21\u6570\uFF01";
                HintContent[HintContent["\u89C2\u770B\u5E7F\u544A\u53EF\u4EE5\u83B7\u5F97\u4E09\u6B21\u5F00\u5B9D\u7BB1\u6B21\u6570\uFF01"] = 25] = "\u89C2\u770B\u5E7F\u544A\u53EF\u4EE5\u83B7\u5F97\u4E09\u6B21\u5F00\u5B9D\u7BB1\u6B21\u6570\uFF01";
                HintContent[HintContent["\u6CA1\u6709\u5B9D\u7BB1\u9886\u53EF\u4EE5\u9886\u4E86\uFF01"] = 26] = "\u6CA1\u6709\u5B9D\u7BB1\u9886\u53EF\u4EE5\u9886\u4E86\uFF01";
                HintContent[HintContent["\u8BF7\u524D\u5F80\u76AE\u80A4\u754C\u9762\u8D2D\u4E70\uFF01"] = 27] = "\u8BF7\u524D\u5F80\u76AE\u80A4\u754C\u9762\u8D2D\u4E70\uFF01";
                HintContent[HintContent["\u4ECA\u5929\u5DF2\u7ECF\u7B7E\u5230\u8FC7\u4E86\uFF01"] = 28] = "\u4ECA\u5929\u5DF2\u7ECF\u7B7E\u5230\u8FC7\u4E86\uFF01";
            })(HintContent = Dialog.HintContent || (Dialog.HintContent = {}));
            let Skin;
            (function (Skin) {
                Skin["blackBord"] = "Frame/UI/ui_orthogon_black.png";
            })(Skin || (Skin = {}));
            function createHint_Middle(describe) {
                let Hint_M = Laya.Pool.getItemByClass('Hint_M', Laya.Sprite);
                Hint_M.name = 'Hint_M';
                Laya.stage.addChild(Hint_M);
                Hint_M.width = Laya.stage.width;
                Hint_M.height = 100;
                Hint_M.pivotY = Hint_M.height / 2;
                Hint_M.pivotX = Laya.stage.width / 2;
                Hint_M.x = Laya.stage.width / 2;
                Hint_M.y = Laya.stage.height / 2;
                Hint_M.zOrder = 100;
                let Pic = new Laya.Image();
                Hint_M.addChild(Pic);
                Pic.skin = Skin.blackBord;
                Pic.width = Laya.stage.width;
                Pic.pivotX = Laya.stage.width / 2;
                Pic.height = 100;
                Pic.pivotY = Pic.height / 2;
                Pic.y = Hint_M.height / 2;
                Pic.x = Laya.stage.width / 2;
                Pic.alpha = 0.6;
                let Dec = new Laya.Label();
                Hint_M.addChild(Dec);
                Dec.width = Laya.stage.width;
                Dec.text = HintContent[describe];
                Dec.pivotX = Laya.stage.width / 2;
                Dec.x = Laya.stage.width / 2;
                Dec.height = 100;
                Dec.pivotY = 50;
                Dec.y = Hint_M.height / 2;
                Dec.bold = true;
                Dec.fontSize = 35;
                Dec.color = '#ffffff';
                Dec.align = 'center';
                Dec.valign = 'middle';
                Dec.alpha = 0;
                Animation2D.scale_Alpha(Hint_M, 0, 1, 0, 1, 1, 1, 200, null, 0, f => {
                    Animation2D.fadeOut(Dec, 0, 1, 150, 0, f => {
                        Animation2D.fadeOut(Dec, 1, 0, 200, 800, f => {
                            Animation2D.scale_Alpha(Hint_M, 1, 1, 1, 1, 0, 0, 200, null, 0, f => {
                                Hint_M.removeSelf();
                            });
                        });
                    });
                });
            }
            Dialog.createHint_Middle = createHint_Middle;
            Dialog._dialogContent = {
                get Array() {
                    return Laya.loader.getRes("GameData/Dialog/Dialog.json")['RECORDS'] !== null ? Laya.loader.getRes("GameData/Dialog/Dialog.json")['RECORDS'] : [];
                },
            };
            function getDialogContent(useWhere, name) {
                let dia;
                for (let index = 0; index < Dialog._dialogContent.Array.length; index++) {
                    const element = Dialog._dialogContent.Array[index];
                    if (element['useWhere'] == useWhere && element['name'] == name) {
                        dia = element;
                        break;
                    }
                }
                let arr = [];
                for (const key in dia) {
                    if (dia.hasOwnProperty(key)) {
                        const value = dia[key];
                        if (key.substring(0, 7) == 'content' || value !== -1) {
                            arr.push(value);
                        }
                    }
                }
                return arr;
            }
            Dialog.getDialogContent = getDialogContent;
            function getDialogContent_Random(useWhere) {
                let contentArr = [];
                let whereArr = getUseWhere(useWhere);
                let index = Math.floor(Math.random() * whereArr.length);
                for (const key in whereArr[index]) {
                    if (whereArr[index].hasOwnProperty(key)) {
                        const value = whereArr[index][key];
                        if (key.substring(0, 7) == 'content' && value !== "-1") {
                            contentArr.push(value);
                        }
                    }
                }
                return contentArr;
            }
            Dialog.getDialogContent_Random = getDialogContent_Random;
            function getUseWhere(useWhere) {
                let arr = [];
                for (let index = 0; index < Dialog._dialogContent.Array.length; index++) {
                    const element = Dialog._dialogContent.Array[index];
                    if (element['useWhere'] == useWhere) {
                        arr.push(element);
                    }
                }
                return arr;
            }
            Dialog.getUseWhere = getUseWhere;
            let UseWhere;
            (function (UseWhere) {
                UseWhere["scene1"] = "scene1";
                UseWhere["scene2"] = "scene2";
                UseWhere["scene3"] = "scene3";
            })(UseWhere = Dialog.UseWhere || (Dialog.UseWhere = {}));
            let DialogProperty;
            (function (DialogProperty) {
                DialogProperty["name"] = "name";
                DialogProperty["useWhere"] = "useWhere";
                DialogProperty["content"] = "content";
                DialogProperty["max"] = "max";
            })(DialogProperty = Dialog.DialogProperty || (Dialog.DialogProperty = {}));
            let PlayMode;
            (function (PlayMode) {
                PlayMode["voluntarily"] = "voluntarily";
                PlayMode["manual"] = "manual";
                PlayMode["clickContent"] = "clickContent";
            })(PlayMode = Dialog.PlayMode || (Dialog.PlayMode = {}));
            function createVoluntarilyDialogue(x, y, useWhere, startDelayed, delayed, parent, content) {
                if (startDelayed == undefined) {
                    startDelayed = 0;
                }
                Laya.timer.once(startDelayed, this, () => {
                    let Pre_Dialogue;
                    Laya.loader.load('Prefab/Pre_Dialogue.json', Laya.Handler.create(this, function (prefab) {
                        let _prefab = new Laya.Prefab();
                        _prefab.json = prefab;
                        Pre_Dialogue = Laya.Pool.getItemByCreateFun('Pre_Dialogue', _prefab.create, _prefab);
                        if (parent) {
                            parent.addChild(Pre_Dialogue);
                        }
                        else {
                            Laya.stage.addChild(Pre_Dialogue);
                        }
                        Pre_Dialogue.x = x;
                        Pre_Dialogue.y = y;
                        let ContentLabel = Pre_Dialogue.getChildByName('Content');
                        let contentArr;
                        if (content !== undefined) {
                            ContentLabel.text = content[0];
                        }
                        else {
                            contentArr = getDialogContent_Random(useWhere);
                            ContentLabel.text = contentArr[0];
                        }
                        Pre_Dialogue.zOrder = 100;
                        if (delayed == undefined) {
                            delayed = 1000;
                        }
                        Animation2D.scale_Alpha(Pre_Dialogue, 0, 0, 0, 1, 1, 1, 150, null, 1000, () => {
                            for (let index = 0; index < contentArr.length; index++) {
                                Laya.timer.once(index * delayed, this, () => {
                                    ContentLabel.text = contentArr[index];
                                    if (index == contentArr.length - 1) {
                                        Laya.timer.once(delayed, this, () => {
                                            Animation2D.scale_Alpha(Pre_Dialogue, 1, 1, 1, 0, 0, 0, 150, null, 1000, () => {
                                                Pre_Dialogue.removeSelf();
                                            });
                                        });
                                    }
                                });
                            }
                        });
                        Dialog.DialogueNode = Pre_Dialogue;
                    }));
                });
            }
            Dialog.createVoluntarilyDialogue = createVoluntarilyDialogue;
            function createDialogHint() {
                Laya.loader.load('Prefab/Pre_Dialogue.json', Laya.Handler.create(this, function (prefab) {
                }));
            }
            Dialog.createDialogHint = createDialogHint;
        })(Dialog = lwg.Dialog || (lwg.Dialog = {}));
        let Execution;
        (function (Execution) {
            Execution._execution = {
                get value() {
                    return this.val = Laya.LocalStorage.getItem('_execution') ? Number(Laya.LocalStorage.getItem('_execution')) : 15;
                },
                set value(val) {
                    this.val = val;
                    Laya.LocalStorage.setItem('_execution', val.toString());
                }
            };
            function _createExecutionNum(parent) {
                let sp;
                Laya.loader.load('prefab/ExecutionNum.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    let num = sp.getChildByName('Num');
                    sp.pos(297, 90);
                    sp.zOrder = 50;
                    Execution.ExecutionNumNode = sp;
                    Execution.ExecutionNumNode.name = 'ExecutionNumNode';
                }));
            }
            Execution._createExecutionNum = _createExecutionNum;
            function _createAddExecution(x, y, func) {
                let sp;
                Laya.loader.load('prefab/execution.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    Laya.stage.addChild(sp);
                    sp.x = Laya.stage.width / 2;
                    sp.y = Laya.stage.height / 2;
                    sp.zOrder = 50;
                    if (Execution.ExecutionNumNode) {
                        Animation2D.move_Simple_01(sp, sp.x, sp.y, Execution.ExecutionNumNode.x, Execution.ExecutionNumNode.y, 800, null, 100, f => {
                            Animation2D.fadeOut(sp, 1, 0, 200, 0, f => {
                                lwg.Animation2D.upDwon_Shake(Execution.ExecutionNumNode, 10, 80, 0, null);
                                if (func) {
                                    func();
                                }
                            });
                        });
                    }
                }));
            }
            Execution._createAddExecution = _createAddExecution;
            function createConsumeEx(subEx) {
                let label = Laya.Pool.getItemByClass('label', Laya.Label);
                label.name = 'label';
                Laya.stage.addChild(label);
                label.text = '-2';
                label.fontSize = 40;
                label.bold = true;
                label.color = '#59245c';
                label.x = Execution.ExecutionNumNode.x + 100;
                label.y = Execution.ExecutionNumNode.y - label.height / 2 + 4;
                label.zOrder = 100;
                lwg.Animation2D.fadeOut(label, 0, 1, 200, 150, f => {
                    lwg.Animation2D.leftRight_Shake(Execution.ExecutionNumNode, 15, 60, 0, null);
                    lwg.Animation2D.fadeOut(label, 1, 0, 600, 400, f => {
                    });
                });
            }
            Execution.createConsumeEx = createConsumeEx;
        })(Execution = lwg.Execution || (lwg.Execution = {}));
        let Gold;
        (function (Gold_1) {
            Gold_1._goldNum = 0;
            function createGoldNode(parent) {
                if (Gold_1.GoldNode) {
                    return;
                }
                let sp;
                Laya.loader.load('Prefab/GoldNode.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('gold', _prefab.create, _prefab);
                    let num = sp.getChildByName('Num');
                    let goldNum = Laya.LocalStorage.getItem('_goldNum');
                    if (goldNum) {
                        Gold_1._goldNum = Number(goldNum);
                    }
                    else {
                        Laya.LocalStorage.setItem('_goldNum', '0');
                    }
                    num.text = Gold_1._goldNum.toString();
                    parent.addChild(sp);
                    let Pic = sp.getChildByName('Pic');
                    sp.pos(234, 100);
                    sp.zOrder = 50;
                    Gold_1.GoldNode = sp;
                }));
            }
            Gold_1.createGoldNode = createGoldNode;
            function goldAppear(delayed, x, y) {
                if (delayed) {
                    Animation2D.scale_Alpha(Gold_1.GoldNode, 0, 1, 1, 1, 1, 1, delayed, null, 0, f => {
                        Gold_1.GoldNode.visible = true;
                    });
                }
                else {
                    Gold_1.GoldNode.visible = true;
                }
                if (x) {
                    Gold_1.GoldNode.x = x;
                }
                if (y) {
                    Gold_1.GoldNode.y = y;
                }
            }
            Gold_1.goldAppear = goldAppear;
            function goldVinish(delayed) {
                if (delayed) {
                    Animation2D.scale_Alpha(Gold_1.GoldNode, 1, 1, 1, 1, 1, 0, delayed, null, 0, f => {
                        Gold_1.GoldNode.visible = false;
                    });
                }
                else {
                    Gold_1.GoldNode.visible = false;
                }
            }
            Gold_1.goldVinish = goldVinish;
            function addGold(number) {
                Gold_1._goldNum += number;
                let Num = Gold_1.GoldNode.getChildByName('Num');
                Num.text = Gold_1._goldNum.toString();
                Laya.LocalStorage.setItem('_goldNum', Gold_1._goldNum.toString());
            }
            Gold_1.addGold = addGold;
            function addGoldDisPlay(number) {
                let Num = Gold_1.GoldNode.getChildByName('Num');
                Num.value = (Number(Num.value) + number).toString();
            }
            Gold_1.addGoldDisPlay = addGoldDisPlay;
            function addGoldNoDisPlay(number) {
                Gold_1._goldNum += number;
                Laya.LocalStorage.setItem('_goldNum', Gold_1._goldNum.toString());
            }
            Gold_1.addGoldNoDisPlay = addGoldNoDisPlay;
            let SkinUrl;
            (function (SkinUrl) {
                SkinUrl[SkinUrl["Frame/Effects/icon_gold.png"] = 0] = "Frame/Effects/icon_gold.png";
            })(SkinUrl || (SkinUrl = {}));
            function createOneGold(width, height, url) {
                let Gold = Laya.Pool.getItemByClass('addGold', Laya.Image);
                Gold.name = 'addGold';
                Gold.alpha = 1;
                Gold.zOrder = 60;
                Gold.width = width;
                Gold.height = height;
                Gold.pivotX = width / 2;
                Gold.pivotY = height / 2;
                if (!url) {
                    Gold.skin = SkinUrl[0];
                }
                else {
                    Gold.skin = url;
                }
                return Gold;
            }
            Gold_1.createOneGold = createOneGold;
            function getGoldAni_Single(parent, number, width, height, url, firstPoint, targetPoint, func1, func2) {
                for (let index = 0; index < number; index++) {
                    Laya.timer.once(index * 30, this, () => {
                        let Gold = createOneGold(width, height, url);
                        parent.addChild(Gold);
                        Animation2D.move_Scale(Gold, 1, firstPoint.x, firstPoint.y, targetPoint.x, targetPoint.y, 1, 350, 0, null, () => {
                            if (index === number - 1) {
                                Laya.timer.once(200, this, () => {
                                    if (func2) {
                                        func2();
                                    }
                                });
                            }
                            else {
                                if (func1) {
                                    func1();
                                }
                            }
                            Gold.removeSelf();
                        });
                    });
                }
            }
            Gold_1.getGoldAni_Single = getGoldAni_Single;
            function getGoldAni_Heap(parent, number, width, height, url, firstPoint, targetPoint, func1, func2) {
                for (let index = 0; index < number; index++) {
                    let Gold = createOneGold(width, height, url);
                    parent.addChild(Gold);
                    if (!url) {
                        Gold.skin = SkinUrl[0];
                    }
                    else {
                        Gold.skin = url;
                    }
                    let x = Math.floor(Math.random() * 2) == 1 ? firstPoint.x + Math.random() * 100 : firstPoint.x - Math.random() * 100;
                    let y = Math.floor(Math.random() * 2) == 1 ? firstPoint.y + Math.random() * 100 : firstPoint.y - Math.random() * 100;
                    Animation2D.move_Scale(Gold, 0.5, firstPoint.x, firstPoint.y, x, y, 1, 300, Math.random() * 100 + 100, Laya.Ease.expoIn, () => {
                        Animation2D.move_Scale(Gold, 1, Gold.x, Gold.y, targetPoint.x, targetPoint.y, 1, 400, Math.random() * 200 + 100, Laya.Ease.cubicOut, () => {
                            if (index === number - 1) {
                                Laya.timer.once(200, this, () => {
                                    if (func2) {
                                        func2();
                                    }
                                });
                            }
                            else {
                                if (func1) {
                                    func1();
                                }
                            }
                            Gold.removeSelf();
                        });
                    });
                }
            }
            Gold_1.getGoldAni_Heap = getGoldAni_Heap;
            class GoldAniBase extends Laya.Script {
                onAwake() {
                    this.initProperty();
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.timer = 0;
                    this.lwgInit();
                    this.propertyAssign();
                }
                lwgInit() {
                }
                initProperty() {
                }
                propertyAssign() {
                    if (this.startAlpha) {
                        this.self.alpha = this.startAlpha;
                    }
                    if (this.startScale) {
                        this.self.scale(this.startScale, this.startScale);
                    }
                    if (this.startRotat) {
                        this.self.rotation = this.startRotat;
                    }
                }
                commonSpeedXYByAngle(angle, speed) {
                    this.self.x += Tools.point_speedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.point_speedXYByAngle(angle, speed + this.accelerated).y;
                }
                moveRules() {
                }
                onUpdate() {
                    this.moveRules();
                }
                onDisable() {
                    Laya.Pool.recover(this.self.name, this.self);
                    this.destroy();
                    Laya.Tween.clearAll(this);
                    Laya.timer.clearAll(this);
                }
            }
            Gold_1.GoldAniBase = GoldAniBase;
            class AddGold extends GoldAniBase {
                lwgInit() {
                    this.self.width = 115;
                    this.self.height = 111;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                }
                initProperty() {
                }
                moveRules() {
                    if (this.moveSwitch) {
                        this.timer++;
                        if (this.timer > 0) {
                            lwg.Animation2D.move_Scale(this.self, 1, this.self.x, this.self.y, this.targetX, this.targetY, 0.35, 250, 0, f => {
                                this.self.removeSelf();
                                if (this.func !== null) {
                                    this.func();
                                }
                            });
                            this.moveSwitch = false;
                        }
                    }
                }
            }
            Gold_1.AddGold = AddGold;
        })(Gold = lwg.Gold || (lwg.Gold = {}));
        let EventAdmin;
        (function (EventAdmin) {
            let EventType;
            (function (EventType) {
                EventType["taskReach"] = "taskReach";
                EventType["defeated"] = "defeated";
                EventType["scene3DRefresh"] = "Scene3DRefresh";
                EventType["scene3DResurgence"] = "scene3DResurgence";
                EventType["operationRefresh"] = "operationRefresh";
                EventType["resurgence"] = "resurgence";
                EventType["closeOperation"] = "closeOperation";
            })(EventType = EventAdmin.EventType || (EventAdmin.EventType = {}));
            EventAdmin.dispatcher = new Laya.EventDispatcher();
            function reg(type, caller, listener) {
                if (!caller) {
                    console.error("事件的执行域必须存在!");
                }
                EventAdmin.dispatcher.on(type.toString(), caller, listener);
            }
            EventAdmin.reg = reg;
            function regOnce(type, caller, listener) {
                if (!caller) {
                    console.error("事件的执行域必须存在!");
                }
                EventAdmin.dispatcher.once(type.toString(), caller, listener);
            }
            EventAdmin.regOnce = regOnce;
            function notify(type, args) {
                EventAdmin.dispatcher.event(type.toString(), args);
            }
            EventAdmin.notify = notify;
            function off(type, caller, listener) {
                this.dispatcher.off(type.toString(), caller, listener);
            }
            EventAdmin.off = off;
            function offAll(type) {
                EventAdmin.dispatcher.offAll(type.toString());
            }
            EventAdmin.offAll = offAll;
            function offCaller(caller) {
                EventAdmin.dispatcher.offAllCaller(caller);
            }
            EventAdmin.offCaller = offCaller;
        })(EventAdmin = lwg.EventAdmin || (lwg.EventAdmin = {}));
        let Admin;
        (function (Admin) {
            let _platformTpye;
            (function (_platformTpye) {
                _platformTpye["WeChat"] = "WeChat";
                _platformTpye["OPPO"] = "OPPO";
                _platformTpye["Bytedance"] = "Bytedance";
                _platformTpye["All"] = "All";
            })(_platformTpye = Admin._platformTpye || (Admin._platformTpye = {}));
            Admin._platform = _platformTpye.Bytedance;
            Admin._gameSwitch = false;
            Admin._gameLevel = {
                get value() {
                    return Laya.LocalStorage.getItem('_gameLevel') ? Number(Laya.LocalStorage.getItem('_gameLevel')) : 1;
                },
                set value(val) {
                    Laya.LocalStorage.setItem('_gameLevel', val.toString());
                }
            };
            Admin._practicalLevel = {
                get value() {
                    return Laya.LocalStorage.getItem('_practicalLevel') ? Number(Laya.LocalStorage.getItem('_practicalLevel')) : Admin._gameLevel.value;
                },
                set value(val) {
                    Laya.LocalStorage.setItem('_practicalLevel', val.toString());
                }
            };
            function _createLevel(parent, x, y) {
                let sp;
                Laya.loader.load('prefab/LevelNode.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(x, y);
                    sp.zOrder = 0;
                    let level = sp.getChildByName('level');
                    Admin.LevelNode = sp;
                }));
            }
            Admin._createLevel = _createLevel;
            Admin._pause = {
                get switch() {
                    return Admin._gameSwitch;
                },
                set switch(bool) {
                    this.bool = bool;
                    if (bool) {
                        Admin._gameSwitch = false;
                        Laya.timer.pause();
                    }
                    else {
                        Admin._gameSwitch = true;
                        Laya.timer.resume();
                    }
                }
            };
            Admin._sceneControl = {};
            let OpenAniType;
            (function (OpenAniType) {
                OpenAniType["fadeOut"] = "fadeOut";
                OpenAniType["leftMove"] = "fadeOut";
                OpenAniType["rightMove"] = "rightMove";
                OpenAniType["centerRotate"] = "centerRotate";
            })(OpenAniType = Admin.OpenAniType || (Admin.OpenAniType = {}));
            Admin._commonOpenAni = OpenAniType.fadeOut;
            let SceneName;
            (function (SceneName) {
                SceneName["UILoding"] = "UILoding";
                SceneName["UIStart"] = "UIStart";
                SceneName["UIMain"] = "UIMain";
                SceneName["GameMain3D"] = "GameMain3D";
                SceneName["UIVictory"] = "UIVictory";
                SceneName["UIDefeated"] = "UIDefeated";
                SceneName["UIExecutionHint"] = "UIExecutionHint";
                SceneName["UIPassHint"] = "UIPassHint";
                SceneName["UISet"] = "UISet";
                SceneName["UIPifu"] = "UIPifu";
                SceneName["UIPuase"] = "UIPuase";
                SceneName["UIShare"] = "UIShare";
                SceneName["UISmallHint"] = "UISmallHint";
                SceneName["UISkinXD"] = "UISkinXD";
                SceneName["UISkinTry"] = "UISkinTry";
                SceneName["UIRedeem"] = "UIRedeem";
                SceneName["UIAnchorXD"] = "UIAnchorXD";
                SceneName["UITurntable"] = "UITurntable";
                SceneName["UICaiDanQiang"] = "UICaiDanQiang";
                SceneName["UICaidanPifu"] = "UICaidanPifu";
                SceneName["UIOperation"] = "UIOperation";
                SceneName["UIShop"] = "UIShop";
                SceneName["UITask"] = "UITask";
                SceneName["UIVictoryBox"] = "UIVictoryBox";
                SceneName["UICheckIn"] = "UICheckIn";
                SceneName["UIResurgence"] = "UIResurgence";
                SceneName["UISkin"] = "UISkin";
                SceneName["UIEasterEgg"] = "UIEasterEgg";
                SceneName["UIADSHint"] = "UIADSHint";
                SceneName["LwgInit"] = "LwgInit";
            })(SceneName = Admin.SceneName || (Admin.SceneName = {}));
            let GameState;
            (function (GameState) {
                GameState["Start"] = "Start";
                GameState["Play"] = "Play";
                GameState["Pause"] = "pause";
                GameState["Victory"] = "victory";
                GameState["Defeated"] = "defeated";
            })(GameState = Admin.GameState || (Admin.GameState = {}));
            function _openScene(openName, cloesScene, func, zOder) {
                Laya.Scene.load('Scene/' + openName + '.json', Laya.Handler.create(this, function (scene) {
                    scene.width = Laya.stage.width;
                    scene.height = Laya.stage.height;
                    if (zOder) {
                        Laya.stage.addChildAt(scene, zOder);
                    }
                    else {
                        Laya.stage.addChild(scene);
                    }
                    scene.name = openName;
                    Admin._sceneControl[openName] = scene;
                    let background = scene.getChildByName('Background');
                    if (background) {
                        background.width = Laya.stage.width;
                        background.height = Laya.stage.height;
                    }
                    if (cloesScene) {
                        cloesScene.close();
                    }
                    if (func) {
                        func();
                    }
                }));
            }
            Admin._openScene = _openScene;
            class Scene extends Laya.Script {
                constructor() {
                    super();
                    this.aniTime = 100;
                    this.aniDelayde = 100;
                }
                onAwake() {
                    this.self = this.owner;
                    this.calssName = this['__proto__']['constructor'].name;
                    this.self[this.calssName] = this;
                    this.gameState(this.calssName);
                    this.lwgNodeDec();
                    this.moduleOnAwake();
                    this.lwgOnAwake();
                    this.lwgAdaptive();
                }
                lwgOnAwake() { }
                ;
                moduleOnAwake() { }
                onEnable() {
                    this.moduleEventReg();
                    this.lwgEventReg();
                    this.moduleOnEnable();
                    this.lwgOnEnable();
                    this.btnAndlwgOpenAni();
                }
                moduleOnEnable() { }
                lwgNodeDec() { }
                lwgEventReg() { }
                moduleEventReg() { }
                gameState(calssName) {
                    switch (calssName) {
                        case SceneName.UIStart:
                            Admin._gameState = GameState.Start;
                            break;
                        case SceneName.UIMain:
                            Admin._gameState = GameState.Play;
                            break;
                        case SceneName.UIDefeated:
                            Admin._gameState = GameState.Defeated;
                            break;
                        case SceneName.UIVictory:
                            Admin._gameState = GameState.Victory;
                            break;
                        default:
                            break;
                    }
                }
                lwgOnEnable() {
                }
                commonOpenAni() {
                    let time = 0;
                    let delay = 0;
                    switch (Admin._commonOpenAni) {
                        case OpenAniType.fadeOut:
                            time = 500;
                            delay = 400;
                            if (this.self['Background']) {
                                Animation2D.fadeOut(this.self, 0, 1, time / 2, delay);
                            }
                            Animation2D.fadeOut(this.self, 0, 1, time);
                            break;
                        case OpenAniType.leftMove:
                            break;
                        default:
                            break;
                    }
                    return time;
                }
                btnAndlwgOpenAni() {
                    let time = this.lwgOpenAni();
                    if (time == null) {
                        time = this.commonOpenAni();
                        if (time == null) {
                            time = 0;
                        }
                    }
                    Laya.timer.once(time, this, f => {
                        this.lwgBtnClick();
                    });
                }
                lwgBtnClick() { }
                lwgOpenAni() { return null; }
                lwgAdaptive() { }
                lwgVanishAni() { return 0; }
                onUpdate() { this.lwgOnUpdate(); }
                lwgOnUpdate() { }
                onDisable() {
                    this.lwgOnDisable();
                    Laya.timer.clearAll(this);
                    Laya.Tween.clearAll(this);
                    EventAdmin.offCaller(this);
                }
                lwgOnDisable() { }
            }
            Admin.Scene = Scene;
            class Person extends Laya.Script {
                constructor() {
                    super();
                }
                onAwake() {
                    this.lwgOnAwake();
                }
                lwgOnAwake() {
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    this.rig = this.self.getComponent(Laya.RigidBody);
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.lwgOnEnable();
                }
                lwgOnEnable() {
                    console.log('父类的初始化！');
                }
            }
            Admin.Person = Person;
            class Object extends Laya.Script {
                constructor() {
                    super();
                }
                onAwake() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.lwgNodeDec();
                }
                lwgNodeDec() {
                }
                onEnable() {
                    this.lwgOnEnable();
                    this.lwgBtnClick();
                    this.lwgEventReg();
                }
                lwgOnEnable() {
                }
                lwgBtnClick() {
                }
                lwgEventReg() {
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() {
                }
                onDisable() {
                    this.lwgOnDisable();
                    Laya.timer.clearAll(this);
                    EventAdmin.offCaller(this);
                }
                lwgOnDisable() {
                }
            }
            Admin.Object = Object;
        })(Admin = lwg.Admin || (lwg.Admin = {}));
        let Effects;
        (function (Effects) {
            let SkinUrl;
            (function (SkinUrl) {
                SkinUrl[SkinUrl["Frame/Effects/cir_white.png"] = 0] = "Frame/Effects/cir_white.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_black.png"] = 1] = "Frame/Effects/cir_black.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_blue.png"] = 2] = "Frame/Effects/cir_blue.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_bluish.png"] = 3] = "Frame/Effects/cir_bluish.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_cyan.png"] = 4] = "Frame/Effects/cir_cyan.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_grass.png"] = 5] = "Frame/Effects/cir_grass.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_green.png"] = 6] = "Frame/Effects/cir_green.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_orange.png"] = 7] = "Frame/Effects/cir_orange.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_pink.png"] = 8] = "Frame/Effects/cir_pink.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_purple.png"] = 9] = "Frame/Effects/cir_purple.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_red.png"] = 10] = "Frame/Effects/cir_red.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_yellow.png"] = 11] = "Frame/Effects/cir_yellow.png";
                SkinUrl[SkinUrl["Frame/Effects/star_black.png"] = 12] = "Frame/Effects/star_black.png";
                SkinUrl[SkinUrl["Frame/Effects/star_blue.png"] = 13] = "Frame/Effects/star_blue.png";
                SkinUrl[SkinUrl["Frame/Effects/star_bluish.png"] = 14] = "Frame/Effects/star_bluish.png";
                SkinUrl[SkinUrl["Frame/Effects/star_cyan.png"] = 15] = "Frame/Effects/star_cyan.png";
                SkinUrl[SkinUrl["Frame/Effects/star_grass.png"] = 16] = "Frame/Effects/star_grass.png";
                SkinUrl[SkinUrl["Frame/Effects/star_green.png"] = 17] = "Frame/Effects/star_green.png";
                SkinUrl[SkinUrl["Frame/Effects/star_orange.png"] = 18] = "Frame/Effects/star_orange.png";
                SkinUrl[SkinUrl["Frame/Effects/star_pink.png"] = 19] = "Frame/Effects/star_pink.png";
                SkinUrl[SkinUrl["Frame/Effects/star_purple.png"] = 20] = "Frame/Effects/star_purple.png";
                SkinUrl[SkinUrl["Frame/Effects/star_red.png"] = 21] = "Frame/Effects/star_red.png";
                SkinUrl[SkinUrl["Frame/Effects/star_white.png"] = 22] = "Frame/Effects/star_white.png";
                SkinUrl[SkinUrl["Frame/Effects/star_yellow.png"] = 23] = "Frame/Effects/star_yellow.png";
            })(SkinUrl = Effects.SkinUrl || (Effects.SkinUrl = {}));
            let SkinStyle;
            (function (SkinStyle) {
                SkinStyle["star"] = "star";
                SkinStyle["dot"] = "dot";
            })(SkinStyle = Effects.SkinStyle || (Effects.SkinStyle = {}));
            class EffectsBase extends Laya.Script {
                onAwake() {
                    this.initProperty();
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.timer = 0;
                    this.lwgInit();
                    this.propertyAssign();
                }
                lwgInit() {
                }
                initProperty() {
                }
                propertyAssign() {
                    if (this.startAlpha) {
                        this.self.alpha = this.startAlpha;
                    }
                    if (this.startScale) {
                        this.self.scale(this.startScale, this.startScale);
                    }
                    if (this.startRotat) {
                        this.self.rotation = this.startRotat;
                    }
                }
                commonSpeedXYByAngle(angle, speed) {
                    this.self.x += Tools.point_speedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.point_speedXYByAngle(angle, speed + this.accelerated).y;
                }
                moveRules() {
                }
                onUpdate() {
                    this.moveRules();
                }
                onDisable() {
                    Laya.Pool.recover(this.self.name, this.self);
                    this.destroy();
                    Laya.Tween.clearAll(this);
                    Laya.timer.clearAll(this);
                }
            }
            Effects.EffectsBase = EffectsBase;
            function createCommonExplosion(parent, quantity, x, y, style, speed, continueTime) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('ele', Laya.Image);
                    ele.name = 'ele';
                    let num;
                    if (style === 'star') {
                        num = 12 + Math.floor(Math.random() * 12);
                    }
                    else if (style === 'dot') {
                        num = Math.floor(Math.random() * 12);
                    }
                    ele.skin = SkinUrl[num];
                    ele.alpha = 1;
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.addComponent(commonExplosion);
                    scirpt.startSpeed = Math.random() * speed;
                    scirpt.continueTime = 2 * Math.random() + continueTime;
                }
            }
            Effects.createCommonExplosion = createCommonExplosion;
            class commonExplosion extends lwg.Effects.EffectsBase {
                lwgInit() {
                    this.self.width = 25;
                    this.self.height = 25;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                }
                initProperty() {
                    this.startAngle = 360 * Math.random();
                    this.startSpeed = 5 * Math.random() + 8;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 2;
                    this.continueTime = 8 + Math.random() * 10;
                    this.rotateDir = Math.floor(Math.random() * 2) === 1 ? 'left' : 'right';
                    this.rotateRan = Math.random() * 10;
                }
                moveRules() {
                    this.timer++;
                    if (this.rotateDir === 'left') {
                        this.self.rotation += this.rotateRan;
                    }
                    else {
                        this.self.rotation -= this.rotateRan;
                    }
                    if (this.timer >= this.continueTime / 2) {
                        this.self.alpha -= 0.04;
                        if (this.self.alpha <= 0.65) {
                            this.self.removeSelf();
                        }
                    }
                    this.commonSpeedXYByAngle(this.startAngle, this.startSpeed + this.accelerated);
                    this.accelerated += 0.2;
                }
            }
            Effects.commonExplosion = commonExplosion;
            function createExplosion_Rotate(parent, quantity, x, y, style, speed, rotate) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('ele', Laya.Image);
                    ele.name = 'ele';
                    let num;
                    if (style === SkinStyle.star) {
                        num = 12 + Math.floor(Math.random() * 12);
                    }
                    else if (style === SkinStyle.dot) {
                        num = Math.floor(Math.random() * 12);
                    }
                    ele.skin = SkinUrl[num];
                    ele.alpha = 1;
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.addComponent(Explosion_Rotate);
                    scirpt.startSpeed = 2 + Math.random() * speed;
                    scirpt.rotateRan = Math.random() * rotate;
                }
            }
            Effects.createExplosion_Rotate = createExplosion_Rotate;
            class Explosion_Rotate extends lwg.Effects.EffectsBase {
                lwgInit() {
                    this.self.width = 41;
                    this.self.height = 41;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                }
                initProperty() {
                    this.startAngle = 360 * Math.random();
                    this.startSpeed = 5 * Math.random() + 8;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0;
                    this.continueTime = 5 + Math.random() * 20;
                    this.rotateDir = Math.floor(Math.random() * 2) === 1 ? 'left' : 'right';
                    this.rotateRan = Math.random() * 15;
                }
                moveRules() {
                    if (this.rotateDir === 'left') {
                        this.self.rotation += this.rotateRan;
                    }
                    else {
                        this.self.rotation -= this.rotateRan;
                    }
                    if (this.startSpeed - this.accelerated <= 0.1) {
                        this.self.alpha -= 0.03;
                        if (this.self.alpha <= 0) {
                            this.self.removeSelf();
                        }
                    }
                    else {
                        this.accelerated += 0.2;
                    }
                    this.commonSpeedXYByAngle(this.startAngle, this.startSpeed - this.accelerated);
                }
            }
            Effects.Explosion_Rotate = Explosion_Rotate;
            function createFireworks(parent, quantity, x, y) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('fireworks', Laya.Image);
                    ele.name = 'fireworks';
                    let num = 12 + Math.floor(Math.random() * 11);
                    ele.alpha = 1;
                    ele.skin = SkinUrl[num];
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.getComponent(Fireworks);
                    if (!scirpt) {
                        ele.addComponent(Fireworks);
                    }
                }
            }
            Effects.createFireworks = createFireworks;
            class Fireworks extends lwg.Effects.EffectsBase {
                lwgInit() {
                    this.self.width = 41;
                    this.self.height = 41;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                }
                initProperty() {
                    this.startAngle = 360 * Math.random();
                    this.startSpeed = 5 * Math.random() + 5;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0.1;
                    this.continueTime = 200 + Math.random() * 10;
                }
                moveRules() {
                    this.timer++;
                    if (this.timer >= this.continueTime * 3 / 5) {
                        this.self.alpha -= 0.1;
                    }
                    if (this.timer >= this.continueTime) {
                        this.self.removeSelf();
                    }
                    else {
                        this.commonSpeedXYByAngle(this.startAngle, this.startSpeed);
                    }
                    if (this.self.scaleX < 0) {
                        this.self.scaleX += 0.01;
                    }
                    else if (this.self.scaleX >= this.startScale) {
                        this.self.scaleX -= 0.01;
                    }
                }
            }
            Effects.Fireworks = Fireworks;
            function createLeftOrRightJet(parent, direction, quantity, x, y) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('Jet', Laya.Image);
                    ele.name = 'Jet';
                    let num = 12 + Math.floor(Math.random() * 11);
                    ele.skin = SkinUrl[num];
                    ele.alpha = 1;
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.getComponent(leftOrRightJet);
                    if (!scirpt) {
                        ele.addComponent(leftOrRightJet);
                        let scirpt1 = ele.getComponent(leftOrRightJet);
                        scirpt1.direction = direction;
                        scirpt1.initProperty();
                    }
                    else {
                        scirpt.direction = direction;
                        scirpt.initProperty();
                    }
                }
            }
            Effects.createLeftOrRightJet = createLeftOrRightJet;
            class leftOrRightJet extends lwg.Effects.EffectsBase {
                lwgInit() {
                    this.self.width = 41;
                    this.self.height = 41;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                }
                initProperty() {
                    if (this.direction === 'left') {
                        this.startAngle = 100 * Math.random() - 90 + 45 - 10 - 20;
                    }
                    else if (this.direction === 'right') {
                        this.startAngle = 100 * Math.random() + 90 + 45 + 20;
                    }
                    this.startSpeed = 10 * Math.random() + 3;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0.1;
                    this.continueTime = 300 + Math.random() * 50;
                    this.randomRotate = 1 + Math.random() * 20;
                }
                moveRules() {
                    this.timer++;
                    if (this.timer >= this.continueTime * 3 / 5) {
                        this.self.alpha -= 0.1;
                    }
                    if (this.timer >= this.continueTime) {
                        this.self.removeSelf();
                    }
                    else {
                        this.commonSpeedXYByAngle(this.startAngle, this.startSpeed);
                    }
                    this.self.rotation += this.randomRotate;
                    if (this.self.scaleX < 0) {
                        this.self.scaleX += 0.01;
                    }
                    else if (this.self.scaleX >= this.startScale) {
                        this.self.scaleX -= 0.01;
                    }
                }
            }
            Effects.leftOrRightJet = leftOrRightJet;
        })(Effects = lwg.Effects || (lwg.Effects = {}));
        let Sk;
        (function (Sk) {
            function skLoding() {
            }
            Sk.skLoding = skLoding;
            function onCompelet(tem) {
                console.log(tem['_skBufferUrl'], '加载成功');
            }
            Sk.onCompelet = onCompelet;
            function onError(url) {
                console.log(url, '加载失败！');
            }
            Sk.onError = onError;
        })(Sk = lwg.Sk || (lwg.Sk = {}));
        let Click;
        (function (Click) {
            let Type;
            (function (Type) {
                Type["noEffect"] = "noEffect";
                Type["largen"] = "largen";
                Type["balloon"] = "balloon";
                Type["beetle"] = "beetle";
            })(Type = Click.Type || (Click.Type = {}));
            function on(effect, target, caller, down, move, up, out) {
                let btnEffect;
                switch (effect) {
                    case Type.noEffect:
                        btnEffect = new Btn_NoEffect();
                        break;
                    case Type.largen:
                        btnEffect = new Btn_LargenEffect();
                        break;
                    case Type.balloon:
                        btnEffect = new Btn_Balloon();
                        break;
                    case Type.balloon:
                        btnEffect = new Btn_Beetle();
                        break;
                    default:
                        btnEffect = new Btn_LargenEffect();
                        break;
                }
                target.on(Laya.Event.MOUSE_DOWN, caller, down);
                target.on(Laya.Event.MOUSE_MOVE, caller, move);
                target.on(Laya.Event.MOUSE_UP, caller, up);
                target.on(Laya.Event.MOUSE_OUT, caller, out);
                target.on(Laya.Event.MOUSE_DOWN, caller, btnEffect.down);
                target.on(Laya.Event.MOUSE_MOVE, caller, btnEffect.move);
                target.on(Laya.Event.MOUSE_UP, caller, btnEffect.up);
                target.on(Laya.Event.MOUSE_OUT, caller, btnEffect.out);
            }
            Click.on = on;
            function off(effect, target, caller, down, move, up, out) {
                let btnEffect;
                switch (effect) {
                    case Type.noEffect:
                        btnEffect = new Btn_NoEffect();
                        break;
                    case Type.largen:
                        btnEffect = new Btn_LargenEffect();
                        break;
                    case Type.balloon:
                        btnEffect = new Btn_Balloon();
                        break;
                    case Type.balloon:
                        btnEffect = new Btn_Beetle();
                        break;
                    default:
                        btnEffect = new Btn_LargenEffect();
                        break;
                }
                target.off(Laya.Event.MOUSE_DOWN, caller, down);
                target.off(Laya.Event.MOUSE_MOVE, caller, move);
                target.off(Laya.Event.MOUSE_UP, caller, up);
                target.off(Laya.Event.MOUSE_OUT, caller, out);
                target.off(Laya.Event.MOUSE_DOWN, caller, btnEffect.down);
                target.off(Laya.Event.MOUSE_MOVE, caller, btnEffect.move);
                target.off(Laya.Event.MOUSE_UP, caller, btnEffect.up);
                target.off(Laya.Event.MOUSE_OUT, caller, btnEffect.out);
            }
            Click.off = off;
        })(Click = lwg.Click || (lwg.Click = {}));
        class Btn_NoEffect {
            constructor() {
            }
            down(event) {
            }
            move(event) {
            }
            up(event) {
            }
            out(event) {
            }
        }
        lwg.Btn_NoEffect = Btn_NoEffect;
        class Btn_LargenEffect {
            constructor() {
            }
            down(event) {
                event.currentTarget.scale(1.1, 1.1);
                PalyAudio.playSound(Click.audioUrl);
            }
            move(event) {
            }
            up(event) {
                event.currentTarget.scale(1, 1);
            }
            out(event) {
                event.currentTarget.scale(1, 1);
            }
        }
        lwg.Btn_LargenEffect = Btn_LargenEffect;
        class Btn_Balloon {
            constructor() {
            }
            down(event) {
                event.currentTarget.scale(Click.balloonScale + 0.06, Click.balloonScale + 0.06);
                PalyAudio.playSound(Click.audioUrl);
            }
            up(event) {
                event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
            }
            move(event) {
                event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
            }
            out(event) {
                event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
            }
        }
        lwg.Btn_Balloon = Btn_Balloon;
        class Btn_Beetle {
            constructor() {
            }
            down(event) {
                event.currentTarget.scale(Click.beetleScale + 0.06, Click.beetleScale + 0.06);
                PalyAudio.playSound(Click.audioUrl);
            }
            up(event) {
                event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
            }
            move(event) {
                event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
            }
            out(event) {
                event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
            }
        }
        lwg.Btn_Beetle = Btn_Beetle;
        let Animation3D;
        (function (Animation3D) {
            Animation3D.tweenMap = {};
            Animation3D.frame = 1;
            function MoveTo(target, toPos, duration, caller, ease, complete, delay = 0, coverBefore = true, update, frame) {
                let position = target.transform.position.clone();
                if (duration == 0 || duration === undefined || duration === null) {
                    target.transform.position = toPos.clone();
                    complete && complete.apply(caller);
                    return;
                }
                if (frame <= 0 || frame === undefined || frame === null) {
                    frame = this.frame;
                }
                let updateRenderPos = function () {
                    if (target.transform) {
                        target.transform.position = position;
                    }
                    update && update();
                };
                Laya.timer.once(delay, target, function () {
                    Laya.timer.frameLoop(frame, target, updateRenderPos);
                });
                let endTween = function () {
                    if (target.transform) {
                        target.transform.position = toPos.clone();
                        Laya.timer.clear(target, updateRenderPos);
                    }
                    complete && complete.apply(caller);
                };
                let tween = Laya.Tween.to(position, { x: toPos.x, y: toPos.y, z: toPos.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
                if (!Animation3D.tweenMap[target.id]) {
                    Animation3D.tweenMap[target.id] = [];
                }
                Animation3D.tweenMap[target.id].push(tween);
            }
            Animation3D.MoveTo = MoveTo;
            function RotateTo(target, toRotation, duration, caller, ease, complete, delay, coverBefore, update, frame) {
                let rotation = target.transform.localRotationEuler.clone();
                if (duration == 0 || duration === undefined || duration === null) {
                    target.transform.localRotationEuler = toRotation.clone();
                    complete && complete.apply(caller);
                    return;
                }
                if (frame <= 0 || frame === undefined || frame === null) {
                    frame = this.frame;
                }
                let updateRenderRotation = function () {
                    if (target.transform) {
                        target.transform.localRotationEuler = rotation;
                    }
                    update && update();
                };
                Laya.timer.once(delay, target, function () {
                    Laya.timer.frameLoop(frame, target, updateRenderRotation);
                });
                let endTween = function () {
                    if (target.transform) {
                        target.transform.localRotationEuler = toRotation.clone();
                        Laya.timer.clear(target, updateRenderRotation);
                    }
                    complete && complete.apply(caller);
                };
                let tween = Laya.Tween.to(rotation, { x: toRotation.x, y: toRotation.y, z: toRotation.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
                if (!Animation3D.tweenMap[target.id]) {
                    Animation3D.tweenMap[target.id] = [];
                }
                Animation3D.tweenMap[target.id].push(tween);
            }
            Animation3D.RotateTo = RotateTo;
            function ScaleTo(target, toScale, duration, caller, ease, complete, delay, coverBefore, update, frame) {
                let localScale = target.transform.localScale.clone();
                if (duration == 0 || duration === undefined || duration === null) {
                    target.transform.localScale = toScale.clone();
                    complete && complete.apply(caller);
                    return;
                }
                if (frame <= 0 || frame === undefined || frame === null) {
                    frame = this.frame;
                }
                let updateRenderPos = function () {
                    target.transform.localScale = localScale.clone();
                    update && update();
                };
                Laya.timer.once(delay, this, function () {
                    Laya.timer.frameLoop(frame, target, updateRenderPos);
                });
                let endTween = function () {
                    target.transform.localScale = toScale.clone();
                    Laya.timer.clear(target, updateRenderPos);
                    complete && complete.apply(caller);
                };
                let tween = Laya.Tween.to(localScale, { x: toScale.x, y: toScale.y, z: toScale.z }, duration, ease, Laya.Handler.create(target, endTween), delay, coverBefore);
                if (!Animation3D.tweenMap[target.id]) {
                    Animation3D.tweenMap[target.id] = [];
                }
                Animation3D.tweenMap[target.id].push(tween);
            }
            Animation3D.ScaleTo = ScaleTo;
            function ClearTween(target) {
                let tweens = Animation3D.tweenMap[target.id];
                if (tweens && tweens.length) {
                    while (tweens.length > 0) {
                        let tween = tweens.pop();
                        tween.clear();
                    }
                }
                Laya.timer.clearAll(target);
            }
            Animation3D.ClearTween = ClearTween;
        })(Animation3D = lwg.Animation3D || (lwg.Animation3D = {}));
        let Animation2D;
        (function (Animation2D) {
            function simple_Rotate(node, Frotate, Erotate, time, delayed, func) {
                node.rotation = Frotate;
                if (!delayed) {
                    delayed = 0;
                }
                Laya.Tween.to(node, { rotation: Erotate }, time, null, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.simple_Rotate = simple_Rotate;
            function upDown_Overturn(node, time, func) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                                if (func !== null || func !== undefined) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), 0);
            }
            Animation2D.upDown_Overturn = upDown_Overturn;
            function leftRight_Overturn(node, time, func) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                            }), 0);
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }
            Animation2D.leftRight_Overturn = leftRight_Overturn;
            function leftRight_Shake(node, range, time, delayed, func) {
                Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }));
                    }));
                }), delayed);
            }
            Animation2D.leftRight_Shake = leftRight_Shake;
            function upDwon_Shake(node, range, time, delayed, func) {
                Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }));
                    }));
                }), delayed);
            }
            Animation2D.upDwon_Shake = upDwon_Shake;
            function fadeOut(node, alpha1, alpha2, time, delayed, func) {
                node.alpha = alpha1;
                if (!delayed) {
                    delayed = 0;
                }
                Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.fadeOut = fadeOut;
            function fadeOut_KickBack(node, alpha1, alpha2, time, delayed, func) {
                node.alpha = alpha1;
                Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.fadeOut_KickBack = fadeOut_KickBack;
            function move_FadeOut(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.alpha = 0;
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { alpha: 1, x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.move_FadeOut = move_FadeOut;
            function move_Fade_Out(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.alpha = 1;
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { alpha: 0, x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.move_Fade_Out = move_Fade_Out;
            function move_FadeOut_Scale_01(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.alpha = 0;
                node.targetX = 0;
                node.targetY = 0;
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { alpha: 1, x: targetX, y: targetY, scaleX: 1, scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.move_FadeOut_Scale_01 = move_FadeOut_Scale_01;
            function move_Scale(node, fScale, fX, fY, tX, tY, eScale, time, delayed, ease, func) {
                node.scaleX = fScale;
                node.scaleY = fScale;
                node.x = fX;
                node.y = fY;
                Laya.Tween.to(node, { x: tX, y: tY, scaleX: eScale, scaleY: eScale }, time, ease ? null : ease, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.move_Scale = move_Scale;
            function rotate_Scale(target, fRotate, fScaleX, fScaleY, eRotate, eScaleX, eScaleY, time, delayed, func) {
                target.scaleX = fScaleX;
                target.scaleY = fScaleY;
                target.rotation = fRotate;
                Laya.Tween.to(target, { rotation: eRotate, scaleX: eScaleX, scaleY: eScaleY }, time, null, Laya.Handler.create(this, () => {
                    if (func) {
                        func();
                    }
                    target.rotation = 0;
                }), delayed ? delayed : 0);
            }
            Animation2D.rotate_Scale = rotate_Scale;
            function drop_Simple(node, fY, tY, rotation, time, delayed, func) {
                node.y = fY;
                Laya.Tween.to(node, { y: tY, rotation: rotation }, time, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.drop_Simple = drop_Simple;
            function drop_KickBack(target, fAlpha, firstY, targetY, extendY, time1, delayed, func) {
                target.alpha = fAlpha;
                target.y = firstY;
                if (!delayed) {
                    delayed = 0;
                }
                Laya.Tween.to(target, { alpha: 1, y: targetY + extendY }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { y: targetY - extendY / 2 }, time1 / 2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { y: targetY }, time1 / 4, null, Laya.Handler.create(this, function () {
                            if (func) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.drop_KickBack = drop_KickBack;
            function drop_Excursion(node, targetY, targetX, rotation, time, delayed, func) {
                Laya.Tween.to(node, { x: node.x + targetX, y: node.y + targetY * 1 / 6 }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x + targetX + 50, y: targetY, rotation: rotation }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.drop_Excursion = drop_Excursion;
            function goUp_Simple(node, initialY, initialR, targetY, time, delayed, func) {
                node.y = initialY;
                node.rotation = initialR;
                Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.goUp_Simple = goUp_Simple;
            function cardRotateX_TowFace(node, arr, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            let child = node.getChildByName(arr[i]);
                            if (child !== null) {
                                child['alpha'] = 0;
                            }
                        }
                    }
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleX: 1 }, time * 0.9, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 0 }, time * 0.8, null, Laya.Handler.create(this, function () {
                            if (arr) {
                                for (let i = 0; i < arr.length; i++) {
                                    let child = node.getChildByName(arr[i]);
                                    if (child !== null) {
                                        child['alpha'] = 1;
                                    }
                                }
                            }
                            Laya.Tween.to(node, { scaleX: 1 }, time * 0.7, null, Laya.Handler.create(this, function () {
                                if (func2 !== null) {
                                    func2();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.cardRotateX_TowFace = cardRotateX_TowFace;
            function cardRotateX_OneFace(node, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        if (func2 !== null) {
                            func2();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.cardRotateX_OneFace = cardRotateX_OneFace;
            function cardRotateY_TowFace(node, arr, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            let child = node.getChildByName(arr[i]);
                            if (child !== null) {
                                child['alpha'] = 0;
                            }
                        }
                    }
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleY: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                                if (arr) {
                                    for (let i = 0; i < arr.length; i++) {
                                        let child = node.getChildByName(arr[i]);
                                        if (child !== null) {
                                            child['alpha'] = 1;
                                        }
                                    }
                                }
                                if (func2 !== null) {
                                    func2();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.cardRotateY_TowFace = cardRotateY_TowFace;
            function cardRotateY_OneFace(node, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        if (func2 !== null) {
                            func2();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.cardRotateY_OneFace = cardRotateY_OneFace;
            function move_changeRotate(node, targetX, targetY, per, rotation_pe, time, func) {
                let targetPerX = targetX * per + node.x * (1 - per);
                let targetPerY = targetY * per + node.y * (1 - per);
                Laya.Tween.to(node, { x: targetPerX, y: targetPerY, rotation: 45 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), 0);
            }
            Animation2D.move_changeRotate = move_changeRotate;
            function bombs_Appear(node, firstAlpha, firstScale, scale1, rotation, time1, time2, delayed, audioType, func) {
                node.scale(0, 0);
                node.alpha = firstAlpha;
                Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, rotation: rotation }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.2, scaleY: firstScale + (scale1 - firstScale) * 0.2, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                                if (func) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.bombs_Appear = bombs_Appear;
            function bombs_Vanish(node, scale, alpha, rotation, time, delayed, func) {
                Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alpha: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.bombs_Vanish = bombs_Vanish;
            function swell_shrink(node, firstScale, scale1, time, delayed, func) {
                if (!delayed) {
                    delayed = 0;
                }
                Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.5, scaleY: firstScale + (scale1 - firstScale) * 0.5, rotation: 0 }, time * 0.5, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.swell_shrink = swell_shrink;
            function move_Simple(node, fX, fY, targetX, targetY, time, delayed, ease, func) {
                node.x = fX;
                node.y = fY;
                if (!delayed) {
                    delayed = 0;
                }
                Laya.Tween.to(node, { x: targetX, y: targetY }, time, ease ? ease : null, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.move_Simple = move_Simple;
            function move_Simple_01(node, firstX, firstY, targetX, targetY, time, ease, delayed, func) {
                if (!delayed) {
                    delayed = 0;
                }
                if (!ease) {
                    ease = null;
                }
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { x: targetX, y: targetY }, time, ease, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.move_Simple_01 = move_Simple_01;
            function move_Deform_X(node, firstX, firstR, targetX, scaleX, scaleY, time, delayed, func) {
                node.alpha = 0;
                node.x = firstX;
                node.rotation = firstR;
                Laya.Tween.to(node, { x: targetX, scaleX: 1 + scaleX, scaleY: 1 + scaleY, rotation: firstR / 3, alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 1, scaleY: 1, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.move_Deform_X = move_Deform_X;
            function move_Deform_Y(target, firstY, firstR, targeY, scaleX, scaleY, time, delayed, func) {
                target.alpha = 0;
                if (firstY) {
                    target.y = firstY;
                }
                target.rotation = firstR;
                Laya.Tween.to(target, { y: targeY, scaleX: 1 + scaleX, scaleY: 1 + scaleY, rotation: firstR / 3, alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { scaleX: 1, scaleY: 1, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.move_Deform_Y = move_Deform_Y;
            function blink_FadeOut_v(target, minAlpha, maXalpha, time, delayed, func) {
                target.alpha = minAlpha;
                Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.blink_FadeOut_v = blink_FadeOut_v;
            function blink_FadeOut(target, minAlpha, maXalpha, time, delayed, func) {
                Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation2D.blink_FadeOut = blink_FadeOut;
            function shookHead_Simple(target, rotate, time, delayed, func) {
                let firstR = target.rotation;
                Laya.Tween.to(target, { rotation: firstR + rotate }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { rotation: firstR - rotate * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { rotation: firstR + rotate }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(target, { rotation: firstR }, time, null, Laya.Handler.create(this, function () {
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.shookHead_Simple = shookHead_Simple;
            function HintAni_01(target, upNum, time1, stopTime, downNum, time2, func) {
                target.alpha = 0;
                Laya.Tween.to(target, { alpha: 1, y: target.y - upNum }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { y: target.y - 15 }, stopTime, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { alpha: 0, y: target.y + upNum + downNum }, time2, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }
            Animation2D.HintAni_01 = HintAni_01;
            function scale_Alpha(target, fAlpha, fScaleX, fScaleY, eScaleX, eScaleY, eAlpha, time, ease, delayed, func) {
                if (!delayed) {
                    delayed = 0;
                }
                if (!delayed) {
                    ease = null;
                }
                target.alpha = fAlpha;
                target.scaleX = fScaleX;
                target.scaleY = fScaleY;
                Laya.Tween.to(target, { scaleX: eScaleX, scaleY: eScaleY, alpha: eAlpha }, time, ease, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed);
            }
            Animation2D.scale_Alpha = scale_Alpha;
            function rotate_Magnify_KickBack(node, eAngle, eScale, time1, time2, delayed1, delayed2, func) {
                node.alpha = 0;
                node.scaleX = 0;
                node.scaleY = 0;
                Laya.Tween.to(node, { alpha: 1, rotation: 360 + eAngle, scaleX: 1 + eScale, scaleY: 1 + eScale }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { rotation: 360 - eAngle / 2, scaleX: 1 + eScale / 2, scaleY: 1 + eScale / 2 }, time2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { rotation: 360 + eAngle / 3, scaleX: 1 + eScale / 5, scaleY: 1 + eScale / 5 }, time2, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { rotation: 360, scaleX: 1, scaleY: 1 }, time2, null, Laya.Handler.create(this, function () {
                                node.rotation = 0;
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), delayed2);
                    }), 0);
                }), delayed1);
            }
            Animation2D.rotate_Magnify_KickBack = rotate_Magnify_KickBack;
        })(Animation2D = lwg.Animation2D || (lwg.Animation2D = {}));
        let Setting;
        (function (Setting) {
            Setting._sound = {
                get switch() {
                    return Laya.LocalStorage.getItem('Setting_sound') == '0' ? false : true;
                },
                set switch(value) {
                    let val;
                    if (value) {
                        val = 1;
                    }
                    else {
                        val = 0;
                    }
                    Laya.LocalStorage.setItem('Setting_sound', val.toString());
                }
            };
            Setting._bgMusic = {
                get switch() {
                    return Laya.LocalStorage.getItem('Setting_bgMusic') == '0' ? false : true;
                },
                set switch(value) {
                    let val;
                    if (value) {
                        val = 1;
                        Laya.LocalStorage.setItem('Setting_bgMusic', val.toString());
                        PalyAudio.playMusic();
                    }
                    else {
                        val = 0;
                        Laya.LocalStorage.setItem('Setting_bgMusic', val.toString());
                        PalyAudio.stopMusic();
                    }
                }
            };
            Setting._shake = {
                get switch() {
                    return Laya.LocalStorage.getItem('Setting_shake') == '0' ? false : true;
                },
                set switch(value) {
                    let val;
                    if (value) {
                        val = 1;
                    }
                    else {
                        val = 0;
                    }
                    Laya.LocalStorage.setItem('Setting_shake', val.toString());
                }
            };
            function createSetBtn(x, y, width, height, url, parent) {
                let _url = 'Frame/UI/icon_set.png';
                let btn = new Laya.Image;
                if (width) {
                    btn.width = width;
                }
                else {
                    btn.width = 100;
                }
                if (height) {
                    btn.height = height;
                }
                else {
                    btn.height = 100;
                }
                if (url) {
                    btn.skin = url;
                }
                else {
                    btn.skin = _url;
                }
                if (parent) {
                    parent.addChild(btn);
                }
                else {
                    Laya.stage.addChild(btn);
                }
                btn.pivotX = btn.width / 2;
                btn.pivotY = btn.height / 2;
                btn.x = x;
                btn.y = y;
                btn.zOrder = 100;
                var btnSetUp = function (e) {
                    e.stopPropagation();
                    Admin._openScene(Admin.SceneName.UISet);
                };
                Click.on(Click.Type.largen, btn, null, null, null, btnSetUp, null);
                Setting.BtnSetNode = btn;
                Setting.BtnSetNode.name = 'BtnSetNode';
            }
            Setting.createSetBtn = createSetBtn;
            function setBtnAppear(delayed, x, y) {
                if (delayed) {
                    Animation2D.scale_Alpha(Setting.BtnSetNode, 0, 1, 1, 1, 1, 1, delayed, null, 0, f => {
                        Setting.BtnSetNode.visible = true;
                    });
                }
                else {
                    Setting.BtnSetNode.visible = true;
                }
                if (x) {
                    Setting.BtnSetNode.x = x;
                }
                if (y) {
                    Setting.BtnSetNode.y = y;
                }
            }
            Setting.setBtnAppear = setBtnAppear;
            function setBtnVinish(delayed) {
                if (delayed) {
                    Animation2D.scale_Alpha(Setting.BtnSetNode, 1, 1, 1, 1, 1, 0, delayed, null, 0, f => {
                        Setting.BtnSetNode.visible = false;
                    });
                }
                else {
                    Setting.BtnSetNode.visible = false;
                }
            }
            Setting.setBtnVinish = setBtnVinish;
        })(Setting = lwg.Setting || (lwg.Setting = {}));
        let PalyAudio;
        (function (PalyAudio) {
            let voiceUrl;
            (function (voiceUrl) {
                voiceUrl["btn"] = "Frame/Voice/btn.wav";
                voiceUrl["bgm"] = "Frame/Voice/bgm.mp3";
                voiceUrl["victory"] = "Frame/Voice/guoguan.wav";
                voiceUrl["defeated"] = "Frame/Voice/wancheng.wav";
            })(voiceUrl = PalyAudio.voiceUrl || (PalyAudio.voiceUrl = {}));
            function playSound(url, number, func) {
                if (!url) {
                    url = voiceUrl.btn;
                }
                if (!number) {
                    number = 1;
                }
                if (Setting._sound.switch) {
                    Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () {
                        if (func) {
                            func();
                        }
                    }));
                }
            }
            PalyAudio.playSound = playSound;
            function playDefeatedSound(url, number, func) {
                if (!url) {
                    url = voiceUrl.defeated;
                }
                if (!number) {
                    number = 1;
                }
                if (Setting._sound.switch) {
                    Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () {
                        if (func) {
                            func();
                        }
                    }));
                }
            }
            PalyAudio.playDefeatedSound = playDefeatedSound;
            function playVictorySound(url, number, func) {
                if (!url) {
                    url = voiceUrl.victory;
                }
                if (!number) {
                    number = 1;
                }
                if (Setting._sound.switch) {
                    Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () {
                        if (func) {
                            func();
                        }
                    }));
                }
            }
            PalyAudio.playVictorySound = playVictorySound;
            function playMusic(url, number, delayed) {
                if (!url) {
                    url = voiceUrl.bgm;
                }
                if (!number) {
                    number = 0;
                }
                if (!delayed) {
                    delayed = 0;
                }
                if (Setting._bgMusic.switch) {
                    Laya.SoundManager.playMusic(url, number, Laya.Handler.create(this, function () { }), delayed);
                }
            }
            PalyAudio.playMusic = playMusic;
            function stopMusic() {
                Laya.SoundManager.stopMusic();
            }
            PalyAudio.stopMusic = stopMusic;
        })(PalyAudio = lwg.PalyAudio || (lwg.PalyAudio = {}));
        let Tools;
        (function (Tools) {
            function randomNumber(section1, section2) {
                if (section2) {
                    return Math.floor(Math.random() * (section2 - section1)) + section1;
                }
                else {
                    return Math.floor(Math.random() * section1);
                }
            }
            Tools.randomNumber = randomNumber;
            function randomCountNumer(section1, section2, count, intSet) {
                let arr = [];
                if (!count) {
                    count = 1;
                }
                if (!intSet) {
                    intSet = true;
                }
                if (section2) {
                    while (count > arr.length) {
                        let num;
                        if (intSet) {
                            num = Math.floor(Math.random() * (section2 - section1)) + section1;
                        }
                        else {
                            num = Math.random() * (section2 - section1) + section1;
                        }
                        arr.push(num);
                        Tools.arrayUnique_01(arr);
                    }
                    return arr;
                }
                else {
                    while (count > arr.length) {
                        let num;
                        if (intSet) {
                            num = Math.floor(Math.random() * (section2 - section1)) + section1;
                        }
                        else {
                            num = Math.random() * (section2 - section1) + section1;
                        }
                        arr.push(num);
                        Tools.arrayUnique_01(arr);
                    }
                    return arr;
                }
            }
            Tools.randomCountNumer = randomCountNumer;
            function d3_rayScanning(camera, scene3D, point, filtrate) {
                let _ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
                let outs = new Array();
                camera.viewportPointToRay(point, _ray);
                scene3D.physicsSimulation.rayCastAll(_ray, outs);
                if (outs.length != 0 && filtrate) {
                    let outsChaild = null;
                    for (var i = 0; i < outs.length; i++) {
                        let hitResult = outs[i].collider.owner;
                        if (hitResult.name === filtrate) {
                            outsChaild = outs[i];
                        }
                    }
                    return outsChaild;
                }
                else {
                    return outs;
                }
            }
            Tools.d3_rayScanning = d3_rayScanning;
            function d2_dotRotateXY(x0, y0, x1, y1, angle) {
                let x2 = x0 + (x1 - x0) * Math.cos(angle * Math.PI / 180) - (y1 - y0) * Math.sin(angle * Math.PI / 180);
                let y2 = y0 + (x1 - x0) * Math.sin(angle * Math.PI / 180) + (y1 - y0) * Math.cos(angle * Math.PI / 180);
                return new Laya.Point(x2, y2);
            }
            Tools.d2_dotRotateXY = d2_dotRotateXY;
            function color_toHexString(r, g, b) {
                return '#' + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
            }
            Tools.color_toHexString = color_toHexString;
            function d3_twoObjectsLen(obj1, obj2) {
                let obj1V3 = obj1.transform.position;
                let obj2V3 = obj2.transform.position;
                let p = new Laya.Vector3();
                Laya.Vector3.subtract(obj1V3, obj2V3, p);
                let lenp = Laya.Vector3.scalarLength(p);
                return lenp;
            }
            Tools.d3_twoObjectsLen = d3_twoObjectsLen;
            function d3_twoPositionLen(v1, v2) {
                let p = d3_twoSubV3(v1, v2);
                let lenp = Laya.Vector3.scalarLength(p);
                return lenp;
            }
            Tools.d3_twoPositionLen = d3_twoPositionLen;
            function d2_twoObjectsLen(obj1, obj2) {
                let point = new Laya.Point(obj1.x, obj1.y);
                let len = point.distance(obj2.x, obj2.y);
                return len;
            }
            Tools.d2_twoObjectsLen = d2_twoObjectsLen;
            function d3_twoSubV3(V3_01, V3_02, normalizing) {
                let p = new Laya.Vector3();
                Laya.Vector3.subtract(V3_01, V3_02, p);
                if (normalizing) {
                    let p1 = new Laya.Vector3();
                    Laya.Vector3.normalize(p, p1);
                    return p1;
                }
                else {
                    return p;
                }
            }
            Tools.d3_twoSubV3 = d3_twoSubV3;
            function dAll_reverseVector(type, Vecoter1, Vecoter2, normalizing) {
                let p;
                if (type === '2d') {
                    p = new Laya.Point(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y);
                    if (normalizing) {
                        p.normalize();
                    }
                    return p;
                }
                else if (type === '3d') {
                    p = new Laya.Vector3(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y, Vecoter1.z - Vecoter2.z);
                    if (normalizing) {
                        let returnP = new Laya.Vector3();
                        Laya.Vector3.normalize(p, returnP);
                        return returnP;
                    }
                    else {
                        return p;
                    }
                }
            }
            Tools.dAll_reverseVector = dAll_reverseVector;
            function d2_Vector_Angle(x, y) {
                let radian = Math.atan2(x, y);
                let angle = 90 - radian * (180 / Math.PI);
                if (angle <= 0) {
                    angle = 270 + (90 + angle);
                }
                return angle - 90;
            }
            Tools.d2_Vector_Angle = d2_Vector_Angle;
            function d2_angle_Vector(angle) {
                angle -= 90;
                let radian = (90 - angle) / (180 / Math.PI);
                let p = new Laya.Point(Math.sin(radian), Math.cos(radian));
                p.normalize();
                return p;
            }
            Tools.d2_angle_Vector = d2_angle_Vector;
            function d3_maximumDistanceLimi(originV3, obj, length) {
                let subP = new Laya.Vector3();
                let objP = obj.transform.position;
                Laya.Vector3.subtract(objP, originV3, subP);
                let lenP = Laya.Vector3.scalarLength(subP);
                if (lenP >= length) {
                    let normalizP = new Laya.Vector3();
                    Laya.Vector3.normalize(subP, normalizP);
                    let x = originV3.x + normalizP.x * length;
                    let y = originV3.y + normalizP.y * length;
                    let z = originV3.z + normalizP.z * length;
                    let p = new Laya.Vector3(x, y, z);
                    obj.transform.position = p;
                    return p;
                }
            }
            Tools.d3_maximumDistanceLimi = d3_maximumDistanceLimi;
            function img_drawPieMask(parent, startAngle, endAngle) {
                parent.cacheAs = "bitmap";
                let drawPieSpt = new Laya.Sprite();
                drawPieSpt.blendMode = "destination-out";
                parent.addChild(drawPieSpt);
                let drawPie = drawPieSpt.graphics.drawPie(parent.width / 2, parent.height / 2, parent.width / 2 + 10, startAngle, endAngle, "#000000");
                return drawPie;
            }
            Tools.img_drawPieMask = img_drawPieMask;
            function d3_TransitionScreenPointfor(v3, camera) {
                let ScreenV3 = new Laya.Vector3();
                camera.viewport.project(v3, camera.projectionViewMatrix, ScreenV3);
                let point = new Laya.Vector2();
                point.x = ScreenV3.x;
                point.y = ScreenV3.y;
                return point;
            }
            Tools.d3_TransitionScreenPointfor = d3_TransitionScreenPointfor;
            function objArrPropertySort(array, property) {
                var compare = function (obj1, obj2) {
                    var val1 = obj1[property];
                    var val2 = obj2[property];
                    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                        val1 = Number(val1);
                        val2 = Number(val2);
                    }
                    if (val1 < val2) {
                        return -1;
                    }
                    else if (val1 > val2) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                };
                array.sort(compare);
                return array;
            }
            Tools.objArrPropertySort = objArrPropertySort;
            function objArrCompareDifferent(data1, data2, property) {
                var result = [];
                for (var i = 0; i < data1.length; i++) {
                    var obj1 = data1[i];
                    var obj1Name = obj1[property];
                    var isExist = false;
                    for (var j = 0; j < data2.length; j++) {
                        var obj2 = data2[j];
                        var obj2Name = obj2[property];
                        if (obj2Name == obj1Name) {
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        result.push(obj1);
                    }
                }
                return result;
            }
            Tools.objArrCompareDifferent = objArrCompareDifferent;
            function objArrComparEidentical(data1, data2, property) {
                var result = [];
                for (var i = 0; i < data1.length; i++) {
                    var obj1 = data1[i];
                    var obj1Name = obj1[property];
                    var isExist = false;
                    for (var j = 0; j < data2.length; j++) {
                        var obj2 = data2[j];
                        var obj2Name = obj2[property];
                        if (obj2Name == name) {
                            isExist = true;
                            break;
                        }
                    }
                    if (isExist) {
                        result.push(obj1);
                    }
                }
                return result;
            }
            Tools.objArrComparEidentical = objArrComparEidentical;
            function objArrUnique(arr, property) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    for (var j = i + 1, len = arr.length; j < len; j++) {
                        if (arr[i][property] === arr[j][property]) {
                            arr.splice(j, 1);
                            j--;
                            len--;
                        }
                    }
                }
                return arr;
            }
            Tools.objArrUnique = objArrUnique;
            function objArrGetValue(objArr, property) {
                let arr = [];
                for (let i = 0; i < objArr.length; i++) {
                    if (objArr[i][property]) {
                        arr.push(objArr[i][property]);
                    }
                }
                return arr;
            }
            Tools.objArrGetValue = objArrGetValue;
            function arrayAddToarray(data1, data2) {
                for (let index = 0; index < data2.length; index++) {
                    const element = data2[index];
                    data1.push(element);
                }
            }
            Tools.arrayAddToarray = arrayAddToarray;
            function arrayRandomGetOut(arr, num) {
                let arr0 = [];
                if (num > arr.length) {
                    return '数组长度小于取出的数！';
                }
                else {
                    for (let index = 0; index < num; index++) {
                        let ran = Math.floor(Math.random() * (arr.length - 1));
                        let a1 = arr[ran];
                        arr.splice(ran, 1);
                        arr0.push(a1);
                    }
                    return arr0;
                }
            }
            Tools.arrayRandomGetOut = arrayRandomGetOut;
            function array_Copy(arr1) {
                var arr = [];
                for (var i = 0; i < arr1.length; i++) {
                    arr.push(arr1[i]);
                }
                return arr;
            }
            Tools.array_Copy = array_Copy;
            function objArray_Copy(source) {
                var sourceCopy = source instanceof Array ? [] : {};
                for (var item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? obj_Copy(source[item]) : source[item];
                }
                return sourceCopy;
            }
            Tools.objArray_Copy = objArray_Copy;
            function obj_Copy(source) {
                var sourceCopy = {};
                for (var item in source)
                    sourceCopy[item] = typeof source[item] === 'object' ? obj_Copy(source[item]) : source[item];
                return sourceCopy;
            }
            Tools.obj_Copy = obj_Copy;
            function arrayUnique_01(arr) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    for (var j = i + 1, len = arr.length; j < len; j++) {
                        if (arr[i] === arr[j]) {
                            arr.splice(j, 1);
                            j--;
                            len--;
                        }
                    }
                }
                return arr;
            }
            Tools.arrayUnique_01 = arrayUnique_01;
            function arrayUnique_02(arr) {
                arr = arr.sort();
                var arr1 = [arr[0]];
                for (var i = 1, len = arr.length; i < len; i++) {
                    if (arr[i] !== arr[i - 1]) {
                        arr1.push(arr[i]);
                    }
                }
                return arr1;
            }
            Tools.arrayUnique_02 = arrayUnique_02;
            function arrayUnique_03(arr) {
                return Array.from(new Set(arr));
            }
            Tools.arrayUnique_03 = arrayUnique_03;
            function point_speedXYByAngle(angle, speed) {
                const speedXY = { x: 0, y: 0 };
                speedXY.x = speed * Math.cos(angle * Math.PI / 180);
                speedXY.y = speed * Math.sin(angle * Math.PI / 180);
                return new Laya.Point(speedXY.x, speedXY.y);
            }
            Tools.point_speedXYByAngle = point_speedXYByAngle;
            function point_GetRoundPos(angle, radius, centerPos) {
                var center = centerPos;
                var radius = radius;
                var hudu = (2 * Math.PI / 360) * angle;
                var X = center.x + Math.sin(hudu) * radius;
                var Y = center.y - Math.cos(hudu) * radius;
                return new Laya.Point(X, Y);
            }
            Tools.point_GetRoundPos = point_GetRoundPos;
            function Angle_GetRad(degree) {
                return degree / 180 * Math.PI;
            }
            Tools.Angle_GetRad = Angle_GetRad;
            function numberConverte(number) {
                if (typeof (number) !== "number") {
                    console.warn("要转化的数字并不为number");
                    return number;
                }
                let backNum;
                if (number < 1000) {
                    backNum = "" + number;
                }
                else if (number < 1000000) {
                    backNum = "" + (number / 1000).toFixed(1) + "k";
                }
                else if (number < 10e8) {
                    backNum = "" + (number / 1000000).toFixed(1) + "m";
                }
                else {
                    backNum = "" + number;
                }
                return backNum;
            }
            Tools.numberConverte = numberConverte;
            function jsonCompare(url, storageName, propertyName) {
                let dataArr;
                if (Laya.LocalStorage.getJSON(storageName)) {
                    dataArr = JSON.parse(Laya.LocalStorage.getJSON(storageName))[storageName];
                    console.log(storageName + '从本地缓存中获取到数据,将和文件夹的json文件进行对比');
                    try {
                        let dataArr_0 = Laya.loader.getRes(url)['RECORDS'];
                        if (dataArr_0.length >= dataArr.length) {
                            let diffArray = Tools.objArrCompareDifferent(dataArr_0, dataArr, propertyName);
                            console.log('两个数据的差值为：', diffArray);
                            Tools.arrayAddToarray(dataArr, diffArray);
                        }
                        else {
                            console.log(storageName + '数据表填写有误，长度不能小于之前的长度');
                        }
                    }
                    catch (error) {
                        console.log(storageName, '数据赋值失败！请检查数据表或者手动赋值！');
                    }
                }
                else {
                    try {
                        dataArr = Laya.loader.getRes(url)['RECORDS'];
                    }
                    catch (error) {
                        console.log(storageName + '数据赋值失败！请检查数据表或者手动赋值！');
                    }
                }
                let data = {};
                data[storageName] = dataArr;
                Laya.LocalStorage.setJSON(storageName, JSON.stringify(data));
                return dataArr;
            }
            Tools.jsonCompare = jsonCompare;
        })(Tools = lwg.Tools || (lwg.Tools = {}));
        let Task;
        (function (Task) {
            Task.TaskClassArr = [];
            Task.todayData = {
                get date() {
                    return Laya.LocalStorage.getItem('Task_todayData') ? Number(Laya.LocalStorage.getItem('Task_todayData')) : null;
                },
                set date(date) {
                    Laya.LocalStorage.setItem('Task_todayData', date.toString());
                }
            };
            function getProperty(ClassName, name, property) {
                let pro = null;
                let arr = getClassArr(ClassName);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element['name'] === name) {
                        pro = element[property];
                        break;
                    }
                }
                if (pro !== null) {
                    return pro;
                }
                else {
                    console.log(name + '找不到属性:' + property, pro);
                    return null;
                }
            }
            Task.getProperty = getProperty;
            function setProperty(ClassName, name, property, value) {
                let arr = getClassArr(ClassName);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element['name'] === name) {
                        element[property] = value;
                        break;
                    }
                }
                let data = {};
                data[ClassName] = arr;
                Laya.LocalStorage.setJSON(ClassName, JSON.stringify(data));
                if (Task._TaskList) {
                    Task._TaskList.refresh();
                }
            }
            Task.setProperty = setProperty;
            function getClassArr(ClassName) {
                let arr = [];
                switch (ClassName) {
                    case TaskClass.everyday:
                        arr = Task.everydayTask;
                        break;
                    case TaskClass.perpetual:
                        arr = Task.perpetualTask;
                        break;
                    default:
                        break;
                }
                return arr;
            }
            Task.getClassArr = getClassArr;
            function doDetection(calssName, name, number) {
                if (!number) {
                    number = 1;
                }
                let resCondition = Task.getProperty(calssName, name, Task.TaskProperty.resCondition);
                let condition = Task.getProperty(calssName, name, Task.TaskProperty.condition);
                if (Task.getProperty(calssName, name, Task.TaskProperty.get) !== -1) {
                    if (condition <= resCondition + number) {
                        Task.setProperty(calssName, name, Task.TaskProperty.resCondition, condition);
                        Task.setProperty(calssName, name, Task.TaskProperty.get, 1);
                        if (Task._TaskList) {
                            Task._TaskList.refresh();
                        }
                        return true;
                    }
                    else {
                        Task.setProperty(calssName, name, Task.TaskProperty.resCondition, resCondition + number);
                        if (Task._TaskList) {
                            Task._TaskList.refresh();
                        }
                        return false;
                    }
                }
                else {
                    return -1;
                }
            }
            Task.doDetection = doDetection;
            let TaskProperty;
            (function (TaskProperty) {
                TaskProperty["name"] = "name";
                TaskProperty["explain"] = "explain";
                TaskProperty["taskType"] = "taskType";
                TaskProperty["condition"] = "condition";
                TaskProperty["resCondition"] = "resCondition";
                TaskProperty["rewardType"] = "rewardType";
                TaskProperty["rewardNum"] = "rewardNum";
                TaskProperty["arrange"] = "arrange";
                TaskProperty["time"] = "time";
                TaskProperty["get"] = "get";
            })(TaskProperty = Task.TaskProperty || (Task.TaskProperty = {}));
            let TaskClass;
            (function (TaskClass) {
                TaskClass["everyday"] = "Task_Everyday";
                TaskClass["perpetual"] = "Task_Perpetual";
            })(TaskClass = Task.TaskClass || (Task.TaskClass = {}));
            let EventType;
            (function (EventType) {
                EventType["getAward"] = "getAward";
                EventType["adsGetAward_Every"] = "adsGetAward_Every";
                EventType["useSkins"] = "useSkins";
                EventType["victory"] = "victory";
                EventType["adsTime"] = "adsTime";
                EventType["victoryBox"] = "victoryBox";
            })(EventType = Task.EventType || (Task.EventType = {}));
            let TaskType;
            (function (TaskType) {
                TaskType["ads"] = "ads";
                TaskType["victory"] = "victory";
                TaskType["useSkins"] = "useSkins";
                TaskType["treasureBox"] = "treasureBox";
            })(TaskType = Task.TaskType || (Task.TaskType = {}));
            let TaskName;
            (function (TaskName) {
                TaskName["\u89C2\u770B\u5E7F\u544A\u83B7\u5F97\u91D1\u5E01"] = "\u89C2\u770B\u5E7F\u544A\u83B7\u5F97\u91D1\u5E01";
                TaskName["\u6BCF\u65E5\u670D\u52A110\u4F4D\u5BA2\u4EBA"] = "\u6BCF\u65E5\u670D\u52A110\u4F4D\u5BA2\u4EBA";
                TaskName["\u6BCF\u65E5\u89C2\u770B\u4E24\u4E2A\u5E7F\u544A"] = "\u6BCF\u65E5\u89C2\u770B\u4E24\u4E2A\u5E7F\u544A";
                TaskName["\u6BCF\u65E5\u4F7F\u75285\u79CD\u76AE\u80A4"] = "\u6BCF\u65E5\u4F7F\u75285\u79CD\u76AE\u80A4";
                TaskName["\u6BCF\u65E5\u5F00\u542F10\u4E2A\u5B9D\u7BB1"] = "\u6BCF\u65E5\u5F00\u542F10\u4E2A\u5B9D\u7BB1";
            })(TaskName = Task.TaskName || (Task.TaskName = {}));
            function initTask() {
                if (Task.todayData.date !== (new Date).getDate()) {
                    Task.everydayTask = Laya.loader.getRes('GameData/Task/everydayTask.json')['RECORDS'];
                    console.log('不是同一天，每日任务重制！');
                    Task.todayData.date = (new Date).getDate();
                }
                else {
                    Task.everydayTask = Tools.jsonCompare('GameData/Task/everydayTask.json', TaskClass.everyday, TaskProperty.name);
                    console.log('是同一天！，继续每日任务');
                }
            }
            Task.initTask = initTask;
            class TaskScene extends Admin.Scene {
                moduleOnAwake() {
                    Task._TaskTap = this.self['TaskTap'];
                    Task._TaskList = this.self['TaskList'];
                    Task.TaskClassArr = [Task.everydayTask];
                }
                moduleOnEnable() {
                    this.taskTap_Create();
                    this.taskList_Create();
                }
                taskTap_Create() {
                    Task._TaskList.selectHandler = new Laya.Handler(this, this.taskTap_Select);
                }
                taskTap_Select(index) { }
                taskList_Create() {
                    Task._TaskList.selectEnable = true;
                    Task._TaskList.vScrollBarSkin = "";
                    Task._TaskList.selectHandler = new Laya.Handler(this, this.taskList_Scelet);
                    Task._TaskList.renderHandler = new Laya.Handler(this, this.taskList_Update);
                    this.taskList_refresh();
                }
                taskList_Scelet(index) { }
                taskList_Update(cell, index) { }
                taskList_refresh() {
                    if (Task._TaskList && Task.TaskClassArr.length > 0) {
                        Task._TaskList.array = Task.TaskClassArr[0];
                        Task._TaskList.refresh();
                    }
                }
            }
            Task.TaskScene = TaskScene;
        })(Task = lwg.Task || (lwg.Task = {}));
        let Shop;
        (function (Shop) {
            Shop.goodsClassArr = [];
            Shop.classWarehouse = [];
            Shop._tryName = [];
            Shop.allSkin = [];
            Shop._currentSkin = {
                get name() {
                    return Laya.LocalStorage.getItem('Shop_currentSkin') ? Laya.LocalStorage.getItem('Shop_currentSkin') : null;
                },
                set name(name) {
                    Laya.LocalStorage.setItem('Shop_currentSkin', name);
                }
            };
            Shop.allProps = [];
            Shop._currentProp = {
                get name() {
                    return Laya.LocalStorage.getItem('Shop_currentProp') ? Laya.LocalStorage.getItem('Shop_currentProp') : null;
                },
                set name(name) {
                    Laya.LocalStorage.setItem('Shop_currentProp', name);
                }
            };
            Shop.allOther = [];
            Shop._currentOther = {
                get name() {
                    return Laya.LocalStorage.getItem('Shop_crrentOther') ? Laya.LocalStorage.getItem('Shop_crrentOther') : null;
                },
                set name(name) {
                    Laya.LocalStorage.setItem('Shop_crrentOther', name);
                }
            };
            Shop.useSkinType = [];
            function setUseSkinType() {
                let arr;
                if (Laya.LocalStorage.getJSON('Shop_useSkinType')) {
                    arr = JSON.parse(Laya.LocalStorage.getJSON('Shop_useSkinType'));
                }
                else {
                    return;
                }
                Shop.useSkinType = arr !== null ? arr['Shop_useSkinType'] : [];
                Shop.useSkinType.push(Shop._currentOther.name, Shop._currentProp.name, Shop._currentSkin.name);
                Shop.useSkinType = Tools.arrayUnique_03(Shop.useSkinType);
                let data = {
                    Shop_useSkinType: Shop.useSkinType,
                };
                Laya.LocalStorage.setJSON('Shop_useSkinType', JSON.stringify(data));
                return Shop.useSkinType.length;
            }
            Shop.setUseSkinType = setUseSkinType;
            function getProperty(goodsClass, name, property) {
                let pro = null;
                let arr = getClassArr(goodsClass);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element['name'] === name) {
                        pro = element[property];
                        break;
                    }
                }
                if (pro !== null) {
                    return pro;
                }
                else {
                    console.log(name + '找不到属性:' + property, pro);
                    return null;
                }
            }
            Shop.getProperty = getProperty;
            function setProperty(goodsClass, name, property, value) {
                let arr = getClassArr(goodsClass);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element['name'] === name) {
                        element[property] = value;
                        break;
                    }
                }
                let data = {};
                data[goodsClass] = arr;
                Laya.LocalStorage.setJSON(goodsClass, JSON.stringify(data));
                if (Shop._ShopList) {
                    Shop._ShopList.refresh();
                }
            }
            Shop.setProperty = setProperty;
            function getHaveArr(goodsClass) {
                let arr = getClassArr(goodsClass);
                let arrHave = [];
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element[GoodsProperty.have]) {
                        arrHave.push(element);
                    }
                }
                return arrHave;
            }
            Shop.getHaveArr = getHaveArr;
            function getwayGoldArr(goodsClass, have, excludeCurrent) {
                let arr = getClassArr(goodsClass);
                let arrNoHave = [];
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (have && have !== undefined) {
                        if (element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.gold) {
                            arrNoHave.push(element);
                        }
                    }
                    else if (!have && have !== undefined) {
                        if (!element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.gold) {
                            arrNoHave.push(element);
                        }
                    }
                    else if (have == undefined) {
                        if (element[GoodsProperty.getway] === Getway.gold) {
                            arrNoHave.push(element);
                        }
                    }
                }
                if (excludeCurrent && excludeCurrent !== undefined) {
                    for (let index = 0; index < arrNoHave.length; index++) {
                        const element = arrNoHave[index];
                        if (element[GoodsProperty.name] === get_Current(goodsClass)) {
                            arrNoHave.splice(index, 1);
                            break;
                        }
                    }
                }
                return arrNoHave;
            }
            Shop.getwayGoldArr = getwayGoldArr;
            function getwayIneedwinArr(goodsClass, have) {
                let arr = getClassArr(goodsClass);
                let arrIneedwin = [];
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (have && have !== undefined) {
                        if (element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.ineedwin) {
                            arrIneedwin.push(element);
                        }
                    }
                    else if (!have && have !== undefined) {
                        if (!element[GoodsProperty.have] && element[GoodsProperty.getway] === Getway.ineedwin) {
                            arrIneedwin.push(element);
                        }
                    }
                    else if (have == undefined) {
                        if (element[GoodsProperty.getway] === Getway.ineedwin) {
                            arrIneedwin.push(element);
                        }
                    }
                }
                return arrIneedwin;
            }
            Shop.getwayIneedwinArr = getwayIneedwinArr;
            function get_Current(goodsClass) {
                let _current = null;
                switch (goodsClass) {
                    case GoodsClass.Skin:
                        _current = Shop._currentSkin.name;
                        break;
                    case GoodsClass.Props:
                        _current = Shop._currentProp.name;
                        break;
                    case GoodsClass.Other:
                        _current = Shop._currentOther.name;
                        break;
                    default:
                        break;
                }
                return _current;
            }
            Shop.get_Current = get_Current;
            function getClassArr(goodsClass) {
                let arr = [];
                switch (goodsClass) {
                    case GoodsClass.Skin:
                        arr = Shop.allSkin;
                        break;
                    case GoodsClass.Props:
                        arr = Shop.allProps;
                        break;
                    case GoodsClass.Other:
                        arr = Shop.allOther;
                        break;
                    default:
                        break;
                }
                return arr;
            }
            Shop.getClassArr = getClassArr;
            function buyGoods(calssName, name, number) {
                if (!number) {
                    number = 1;
                }
                let resCondition = getProperty(calssName, name, GoodsProperty.resCondition);
                let condition = getProperty(calssName, name, GoodsProperty.condition);
                let have = getProperty(calssName, name, GoodsProperty.have);
                if (have !== true && have !== null) {
                    if (condition <= resCondition + number) {
                        setProperty(calssName, name, GoodsProperty.resCondition, condition);
                        setProperty(calssName, name, GoodsProperty.have, true);
                        if (Shop._ShopList) {
                            Shop._ShopList.refresh();
                        }
                        return true;
                    }
                    else {
                        setProperty(calssName, name, GoodsProperty.resCondition, resCondition + number);
                        if (Shop._ShopList) {
                            Shop._ShopList.refresh();
                        }
                        return false;
                    }
                }
                else {
                    return -1;
                }
            }
            Shop.buyGoods = buyGoods;
            function initShop() {
                Shop.allSkin = Tools.jsonCompare('GameData/Shop/Skin.json', GoodsClass.Skin, GoodsProperty.name);
                Shop.allProps = Tools.jsonCompare('GameData/Shop/Props.json', GoodsClass.Props, GoodsProperty.name);
                Shop.allOther = Tools.jsonCompare('GameData/Shop/Other.json', GoodsClass.Other, GoodsProperty.name);
            }
            Shop.initShop = initShop;
            let GoodsProperty;
            (function (GoodsProperty) {
                GoodsProperty["name"] = "name";
                GoodsProperty["getway"] = "getway";
                GoodsProperty["condition"] = "condition";
                GoodsProperty["resCondition"] = "resCondition";
                GoodsProperty["arrange"] = "arrange";
                GoodsProperty["getOder"] = "getOder";
                GoodsProperty["have"] = "have";
            })(GoodsProperty = Shop.GoodsProperty || (Shop.GoodsProperty = {}));
            let Getway;
            (function (Getway) {
                Getway["free"] = "free";
                Getway["ads"] = "ads";
                Getway["adsXD"] = "adsXD";
                Getway["ineedwin"] = "ineedwin";
                Getway["gold"] = "gold";
                Getway["diamond"] = "diamond";
                Getway["easterEgg"] = "easterEgg";
                Getway["other"] = "other";
            })(Getway = Shop.Getway || (Shop.Getway = {}));
            let GoodsClass;
            (function (GoodsClass) {
                GoodsClass["Skin"] = "Shop_Skin";
                GoodsClass["Props"] = "Shop_Props";
                GoodsClass["Other"] = "Shop_Other";
            })(GoodsClass = Shop.GoodsClass || (Shop.GoodsClass = {}));
            let EventType;
            (function (EventType) {
                EventType["select"] = "select";
            })(EventType = Shop.EventType || (Shop.EventType = {}));
            class ShopScene extends Admin.Scene {
                moduleOnAwake() {
                    Shop._ShopTap = this.self['MyTap'];
                    Shop._ShopList = this.self['MyList'];
                    if (!Shop.allSkin) {
                        Shop.allSkin = Tools.jsonCompare('GameData/Shop/Skin.json', GoodsClass.Skin, GoodsProperty.name);
                    }
                    if (!Shop.allProps) {
                        Shop.allProps = Tools.jsonCompare('GameData/Shop/Props.json', GoodsClass.Props, GoodsProperty.name);
                    }
                    if (!Shop.allOther) {
                        Shop.allOther = Tools.jsonCompare('GameData/Shop/Other.json', GoodsClass.Other, GoodsProperty.name);
                    }
                    Shop.goodsClassArr = [Shop.allSkin, Shop.allProps, Shop.allOther];
                    Shop.classWarehouse = [GoodsClass.Skin, GoodsClass.Props, GoodsClass.Skin];
                }
                moduleOnEnable() {
                    this.myList_Create();
                    this.myTap_Create();
                }
                myTap_Create() {
                    Shop._ShopTap.selectHandler = new Laya.Handler(this, this.myTap_Select);
                }
                myTap_Select(index) { }
                myList_Create() {
                    Shop._ShopList.selectEnable = true;
                    Shop._ShopList.selectHandler = new Laya.Handler(this, this.myList_Scelet);
                    Shop._ShopList.renderHandler = new Laya.Handler(this, this.myList_Update);
                    this.myList_refresh();
                }
                myList_Scelet(index) { }
                myList_Update(cell, index) { }
                myList_refresh() {
                    if (Shop._ShopList && Shop.goodsClassArr.length > 0) {
                        Shop._ShopList.array = Shop.goodsClassArr[0];
                        Shop._ShopList.refresh();
                    }
                }
            }
            Shop.ShopScene = ShopScene;
        })(Shop = lwg.Shop || (lwg.Shop = {}));
        let VictoryBox;
        (function (VictoryBox) {
            VictoryBox._BoxArray = [];
            VictoryBox._defaultOpenNum = 3;
            VictoryBox._alreadyOpenNum = 0;
            VictoryBox._adsMaxOpenNum = 6;
            VictoryBox._openVictoryBoxNum = 0;
            function getProperty(name, property) {
                let pro = null;
                for (let index = 0; index < VictoryBox._BoxArray.length; index++) {
                    const element = VictoryBox._BoxArray[index];
                    if (element['name'] === name) {
                        pro = element[property];
                        break;
                    }
                }
                if (pro !== null) {
                    return pro;
                }
                else {
                    console.log(name + '找不到属性:' + property, pro);
                    return null;
                }
            }
            VictoryBox.getProperty = getProperty;
            function setProperty(name, property, value) {
                for (let index = 0; index < VictoryBox._BoxArray.length; index++) {
                    const element = VictoryBox._BoxArray[index];
                    if (element['name'] === name) {
                        element[property] = value;
                        break;
                    }
                }
                if (VictoryBox._BoxList) {
                    VictoryBox._BoxList.refresh();
                }
            }
            VictoryBox.setProperty = setProperty;
            let BoxProperty;
            (function (BoxProperty) {
                BoxProperty["name"] = "name";
                BoxProperty["rewardType"] = "rewardType";
                BoxProperty["rewardNum"] = "rewardNum";
                BoxProperty["openState"] = "openState";
                BoxProperty["ads"] = "ads";
                BoxProperty["select"] = "select";
            })(BoxProperty = VictoryBox.BoxProperty || (VictoryBox.BoxProperty = {}));
            let EventType;
            (function (EventType) {
                EventType["openBox"] = "openBox";
            })(EventType = VictoryBox.EventType || (VictoryBox.EventType = {}));
            class VictoryBoxScene extends Admin.Scene {
                moduleOnAwake() {
                    VictoryBox._BoxList = this.self['BoxList'];
                    VictoryBox._BoxArray = Tools.objArray_Copy(Laya.loader.getRes("GameData/VictoryBox/VictoryBox.json")['RECORDS']);
                    VictoryBox._selectBox = null;
                    VictoryBox._defaultOpenNum = 3;
                    VictoryBox._openVictoryBoxNum++;
                    VictoryBox._adsMaxOpenNum = 6;
                    VictoryBox._alreadyOpenNum = 0;
                }
                moduleOnEnable() {
                    this.boxList_Create();
                }
                boxList_Create() {
                    VictoryBox._BoxList.selectEnable = true;
                    VictoryBox._BoxList.selectHandler = new Laya.Handler(this, this.boxList_Scelet);
                    VictoryBox._BoxList.renderHandler = new Laya.Handler(this, this.boxList_Update);
                    this.boxList_refresh();
                }
                boxList_Scelet(index) { }
                boxList_Update(cell, index) { }
                boxList_refresh() {
                    if (VictoryBox._BoxList) {
                        VictoryBox._BoxList.array = VictoryBox._BoxArray;
                        VictoryBox._BoxList.refresh();
                    }
                }
            }
            VictoryBox.VictoryBoxScene = VictoryBoxScene;
        })(VictoryBox = lwg.VictoryBox || (lwg.VictoryBox = {}));
        let CheckIn;
        (function (CheckIn) {
            CheckIn._lastCheckDate = {
                get date() {
                    return Laya.LocalStorage.getItem('Check_lastCheckDate') ? Number(Laya.LocalStorage.getItem('Check_lastCheckDate')) : -1;
                },
                set date(date) {
                    Laya.LocalStorage.setItem('Check_lastCheckDate', date.toString());
                }
            };
            CheckIn._checkInNum = {
                get number() {
                    return Laya.LocalStorage.getItem('Check_checkInNum') ? Number(Laya.LocalStorage.getItem('Check_checkInNum')) : 0;
                },
                set number(num) {
                    Laya.LocalStorage.setItem('Check_checkInNum', num.toString());
                }
            };
            function getProperty(name, property) {
                let pro = null;
                for (let index = 0; index < CheckIn._checkArray.length; index++) {
                    const element = CheckIn._checkArray[index];
                    if (element['name'] === name) {
                        pro = element[property];
                        break;
                    }
                }
                if (pro !== null) {
                    return pro;
                }
                else {
                    console.log(name + '找不到属性:' + property, pro);
                    return null;
                }
            }
            CheckIn.getProperty = getProperty;
            function setProperty(className, name, property, value) {
                for (let index = 0; index < CheckIn._checkArray.length; index++) {
                    const element = CheckIn._checkArray[index];
                    if (element['name'] === name) {
                        element[property] = value;
                        break;
                    }
                }
                let data = {};
                data[className] = CheckIn._checkArray;
                Laya.LocalStorage.setJSON(className, JSON.stringify(data));
                if (CheckIn._checkList) {
                    CheckIn._checkList.refresh();
                }
            }
            CheckIn.setProperty = setProperty;
            function openCheckIn() {
                let todayDate = (new Date).getDate();
                if (todayDate !== CheckIn._lastCheckDate.date) {
                    console.log('没有签到过，弹出签到页面！');
                    Admin._openScene(Admin.SceneName.UICheckIn);
                }
                else {
                    console.log('签到过了，今日不可以再签到');
                }
            }
            CheckIn.openCheckIn = openCheckIn;
            function todayCheckIn_7Days() {
                let todayDate = (new Date).getDate();
                CheckIn._lastCheckDate.date = todayDate;
                CheckIn._checkInNum.number++;
                setProperty(CheckClass.chek_7Days, 'day' + CheckIn._checkInNum.number, CheckProPerty.checkInState, true);
                let rewardNum = getProperty('day' + CheckIn._checkInNum.number, CheckProPerty.rewardNum);
                if (CheckIn._checkInNum.number === 7) {
                    CheckIn._checkInNum.number = 0;
                    Laya.LocalStorage.removeItem(CheckClass.chek_7Days);
                }
                return rewardNum;
            }
            CheckIn.todayCheckIn_7Days = todayCheckIn_7Days;
            let CheckClass;
            (function (CheckClass) {
                CheckClass["chek_7Days"] = "Chek_7Days";
                CheckClass["chek_15Days"] = "Chek_15Days";
                CheckClass["chek_30Days"] = "Chek_30Days";
            })(CheckClass = CheckIn.CheckClass || (CheckIn.CheckClass = {}));
            let CheckProPerty;
            (function (CheckProPerty) {
                CheckProPerty["name"] = "name";
                CheckProPerty["rewardType"] = "rewardType";
                CheckProPerty["rewardNum"] = "rewardNum";
                CheckProPerty["checkInState"] = "checkInState";
                CheckProPerty["arrange"] = "arrange";
            })(CheckProPerty = CheckIn.CheckProPerty || (CheckIn.CheckProPerty = {}));
            let EventType;
            (function (EventType) {
                EventType["removeCheckBtn"] = "removeCheckBtn";
            })(EventType = CheckIn.EventType || (CheckIn.EventType = {}));
            class CheckInScene extends Admin.Scene {
                moduleOnAwake() {
                    CheckIn._checkList = this.self['CheckList'];
                    CheckIn._checkArray = Tools.jsonCompare('GameData/CheckIn/CheckIn.json', CheckClass.chek_7Days, CheckProPerty.name);
                }
                moduleOnEnable() {
                    this.checkList_Create();
                }
                checkList_Create() {
                    CheckIn._checkList.selectEnable = true;
                    CheckIn._checkList.selectHandler = new Laya.Handler(this, this.checkList_Scelet);
                    CheckIn._checkList.renderHandler = new Laya.Handler(this, this.checkList_Update);
                    this.checkList_refresh();
                }
                checkList_Scelet(index) { }
                checkList_Update(cell, index) { }
                checkList_refresh() {
                    if (CheckIn._checkList) {
                        CheckIn._checkList.array = CheckIn._checkArray;
                        CheckIn._checkList.refresh();
                    }
                }
            }
            CheckIn.CheckInScene = CheckInScene;
        })(CheckIn = lwg.CheckIn || (lwg.CheckIn = {}));
        let SkinXD;
        (function (SkinXD) {
            SkinXD._adsNum = {
                get value() {
                    return Laya.LocalStorage.getItem('XDSKin_adsNum') ? Number(Laya.LocalStorage.getItem('XDSKin_adsNum')) : 0;
                },
                set value(value) {
                    Laya.LocalStorage.setItem('XDSKin_adsNum', value.toString());
                }
            };
            function openXDSkin(fromScene) {
                if (SkinXD._adsNum.value >= SkinXD._needAdsNum) {
                    return;
                }
                else {
                    Admin._openScene(Admin.SceneName.UISkinXD);
                    SkinXD._fromScene = fromScene;
                }
            }
            SkinXD.openXDSkin = openXDSkin;
            let EventType;
            (function (EventType) {
                EventType["acquisition"] = "acquisition";
            })(EventType = SkinXD.EventType || (SkinXD.EventType = {}));
            class SkinXDScene extends Admin.Scene {
                moduleOnEnable() {
                    SkinXD._needAdsNum = 3;
                }
            }
            SkinXD.SkinXDScene = SkinXDScene;
        })(SkinXD = lwg.SkinXD || (lwg.SkinXD = {}));
        let Skin;
        (function (Skin) {
            Skin._skinClassArr = [];
            Skin._headSkinArr = [];
            Skin._currentHead = {
                get name() {
                    return Laya.LocalStorage.getItem('Skin_currentHead') ? Laya.LocalStorage.getItem('Skin_currentHead') : null;
                },
                set name(name) {
                    Laya.LocalStorage.setItem('Skin_currentHead', name);
                }
            };
            Skin._eyeSkinArr = [];
            Skin._currentEye = {
                get name() {
                    return Laya.LocalStorage.getItem('Skin_currentEye') ? Laya.LocalStorage.getItem('Skin_currentEye') : null;
                },
                set name(name) {
                    Laya.LocalStorage.setItem('Skin_currentEye', name);
                }
            };
            let SkinClass;
            (function (SkinClass) {
                SkinClass["head"] = "head";
                SkinClass["eye"] = "eye";
                SkinClass["body"] = "body";
                SkinClass["upperBody"] = "upperBody";
                SkinClass["lowerBody"] = "lowerBody";
            })(SkinClass = Skin.SkinClass || (Skin.SkinClass = {}));
            let SkinProperty;
            (function (SkinProperty) {
                SkinProperty["name"] = "name";
                SkinProperty["getway"] = "getway";
                SkinProperty["condition"] = "condition";
                SkinProperty["resCondition"] = "resCondition";
                SkinProperty["arrange"] = "arrange";
                SkinProperty["getOder"] = "getOder";
                SkinProperty["classify"] = "classify";
                SkinProperty["have"] = "have";
            })(SkinProperty = Skin.SkinProperty || (Skin.SkinProperty = {}));
            let EventType;
            (function (EventType) {
                EventType["purchase"] = "purchase";
                EventType["select"] = "select";
            })(EventType = Skin.EventType || (Skin.EventType = {}));
            class SkinScene extends Admin.Scene {
                moduleOnAwake() {
                    Skin._SkinTap = this.self['SkinTap'];
                    Skin._SkinList = this.self['SkinList'];
                    Skin._skinClassArr = [Skin._eyeSkinArr, Skin._headSkinArr];
                }
                moduleOnEnable() {
                    this.skinList_Create();
                    this.skinTap_Create();
                }
                skinTap_Create() {
                    Skin._SkinTap.selectHandler = new Laya.Handler(this, this.skinTap_Select);
                }
                skinTap_Select(index) { }
                skinList_Create() {
                    Skin._SkinList.selectEnable = true;
                    Skin._SkinList.selectHandler = new Laya.Handler(this, this.skinList_Scelet);
                    Skin._SkinList.renderHandler = new Laya.Handler(this, this.skinList_Update);
                    this.skinList_refresh();
                }
                skinList_Scelet(index) { }
                skinList_Update(cell, index) { }
                skinList_refresh() {
                    if (Skin._SkinList && Skin._skinClassArr.length > 1) {
                        Skin._SkinList.array = Skin._skinClassArr[0];
                        Skin._SkinList.refresh();
                    }
                }
            }
            Skin.SkinScene = SkinScene;
        })(Skin = lwg.Skin || (lwg.Skin = {}));
        let EasterEgg;
        (function (EasterEgg) {
            EasterEgg._easterEgg_1Arr = [];
            EasterEgg._easterEgg_1 = {
                get value() {
                    if (!Laya.LocalStorage.getItem('_easterEgg_01')) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                set value(val) {
                    Laya.LocalStorage.setItem('_easterEgg_01', val.toString());
                }
            };
            function initEasterEgg() {
                EasterEgg._easterEgg_1Arr = Tools.jsonCompare("GameData/EasterEgg/EasterEgg.json", Classify.EasterEgg_01, Property.name);
                Laya.loader.getRes("GameData/EasterEgg/EasterEgg.json")['RECORDS'];
            }
            EasterEgg.initEasterEgg = initEasterEgg;
            function getProperty(classify, name, property) {
                let pro = null;
                let arr = getClassArr(classify);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element['name'] === name) {
                        pro = element[property];
                        break;
                    }
                }
                if (pro !== null) {
                    return pro;
                }
                else {
                    console.log(name + '找不到属性:' + property, pro);
                    return null;
                }
            }
            EasterEgg.getProperty = getProperty;
            function setProperty(classify, name, property, value) {
                let arr = getClassArr(classify);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    if (element['name'] === name) {
                        element[property] = value;
                        break;
                    }
                }
                let data = {};
                data[classify] = arr;
                Laya.LocalStorage.setJSON(classify, JSON.stringify(data));
            }
            EasterEgg.setProperty = setProperty;
            function getClassArr(classify) {
                let arr = [];
                switch (classify) {
                    case Classify.EasterEgg_01:
                        arr = EasterEgg._easterEgg_1Arr;
                        break;
                    default:
                        break;
                }
                return arr;
            }
            EasterEgg.getClassArr = getClassArr;
            function doDetection(classify, name, number) {
                if (!number) {
                    number = 0;
                }
                let resCondition = getProperty(classify, name, Property.resCondition);
                let condition = getProperty(classify, name, Property.condition);
                if (!getProperty(classify, name, Property.complete)) {
                    if (condition <= resCondition + number) {
                        setProperty(classify, name, Property.resCondition, condition);
                        setProperty(classify, name, Property.complete, true);
                        console.log(getProperty(classify, name, Property.complete));
                        return true;
                    }
                    else {
                        setProperty(classify, name, Property.resCondition, resCondition + number);
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
            EasterEgg.doDetection = doDetection;
            function detectAllTasks(classify) {
                let num = 1;
                let arr = getClassArr(classify);
                for (const key in arr) {
                    if (arr.hasOwnProperty(key)) {
                        const element = arr[key];
                        let resCondition = getProperty(classify, element.name, Property.resCondition);
                        let condition = getProperty(classify, element.name, Property.condition);
                        if (condition > resCondition) {
                            num = 0;
                        }
                    }
                }
                if (num == 1) {
                    console.log(classify, '完成了！');
                }
                else {
                    console.log(classify, '没有完成！');
                }
                return num;
            }
            EasterEgg.detectAllTasks = detectAllTasks;
            let rewardType;
            (function (rewardType) {
                rewardType["gold"] = "gold";
                rewardType["diamond"] = "diamond";
                rewardType["assembly"] = "assembly";
            })(rewardType = EasterEgg.rewardType || (EasterEgg.rewardType = {}));
            let Property;
            (function (Property) {
                Property["name"] = "name";
                Property["explain"] = "explain";
                Property["condition"] = "condition";
                Property["resCondition"] = "resCondition";
                Property["complete"] = "complete";
            })(Property = EasterEgg.Property || (EasterEgg.Property = {}));
            let Classify;
            (function (Classify) {
                Classify["EasterEgg_01"] = "EasterEgg_01";
            })(Classify = EasterEgg.Classify || (EasterEgg.Classify = {}));
            let Name;
            (function (Name) {
                Name["assembly_1"] = "assembly_1";
                Name["assembly_2"] = "assembly_2";
                Name["assembly_3"] = "assembly_3";
                Name["assembly_4"] = "assembly_4";
                Name["assembly_5"] = "assembly_5";
            })(Name = EasterEgg.Name || (EasterEgg.Name = {}));
            let EventType;
            (function (EventType) {
                EventType["trigger"] = "trigger";
                EventType["easterEggAds"] = "easterEggAds";
            })(EventType = EasterEgg.EventType || (EasterEgg.EventType = {}));
            class EasterEggScene extends Admin.Scene {
                moduleOnAwake() {
                }
                moduleOnEnable() {
                }
                moduleEventReg() {
                }
            }
            EasterEgg.EasterEggScene = EasterEggScene;
        })(EasterEgg = lwg.EasterEgg || (lwg.EasterEgg = {}));
        let Loding;
        (function (Loding) {
            Loding.list_3DScene = [];
            Loding.list_3DPrefab = [];
            Loding.list_3DMesh = [];
            Loding.lolist_3DBaseMaterial = [];
            Loding.list_3DTexture2D = [];
            Loding.list_2D = [];
            Loding.list_Json = [];
            Loding.sumProgress = 0;
            Loding.currentProgress = {
                val: 0,
                get value() {
                    return this.val;
                },
                set value(v) {
                    this.val = v;
                    if (this.val >= Loding.sumProgress) {
                        console.log('当前进度条进度为:', Loding.currentProgress.value / Loding.sumProgress);
                        console.log('进度条停止！');
                        console.log('所有资源加载完成！此时所有资源可通过例如 Laya.loader.getRes("Data/levelsData.json")获取');
                        EventAdmin.notify(Loding.LodingType.complete);
                    }
                    else {
                        let number = 0;
                        for (let index = 0; index <= Loding.loadOrderIndex; index++) {
                            number += Loding.loadOrder[index].length;
                        }
                        if (this.val === number) {
                            Loding.loadOrderIndex++;
                        }
                        EventAdmin.notify(Loding.LodingType.loding);
                    }
                },
            };
            let LodingType;
            (function (LodingType) {
                LodingType["complete"] = "complete";
                LodingType["loding"] = "loding";
                LodingType["progress"] = "progress";
            })(LodingType = Loding.LodingType || (Loding.LodingType = {}));
            class LodingScene extends Admin.Scene {
                moduleOnAwake() {
                }
                moduleEventReg() {
                    EventAdmin.reg(LodingType.loding, this, () => { this.lodingRule(); });
                    EventAdmin.reg(LodingType.complete, this, () => { this.lodingComplete(); PalyAudio.playMusic(); Admin._openScene(Admin.SceneName.LwgInit, this.self); });
                    EventAdmin.reg(LodingType.progress, this, (skip) => {
                        Loding.currentProgress.value++;
                        if (Loding.currentProgress.value < Loding.sumProgress) {
                            console.log('当前进度条进度为:', Loding.currentProgress.value / Loding.sumProgress);
                            this.lodingPhaseComplete();
                        }
                    });
                }
                moduleOnEnable() {
                    Loding.loadOrder = [Loding.list_2D, Loding.list_3DScene, Loding.list_3DPrefab, Loding.list_Json];
                    for (let index = 0; index < Loding.loadOrder.length; index++) {
                        Loding.sumProgress += Loding.loadOrder[index].length;
                        if (Loding.loadOrder[index].length <= 0) {
                            Loding.loadOrder.splice(index, 1);
                            index--;
                        }
                    }
                    Loding.loadOrderIndex = 0;
                    EventAdmin.notify(Loding.LodingType.loding);
                }
                lodingRule() {
                    if (Loding.loadOrder.length <= 0) {
                        console.log('没有加载项');
                        return;
                    }
                    let alreadyPro = 0;
                    for (let i = 0; i < Loding.loadOrderIndex; i++) {
                        alreadyPro += Loding.loadOrder[i].length;
                    }
                    let index = Loding.currentProgress.value - alreadyPro;
                    switch (Loding.loadOrder[Loding.loadOrderIndex]) {
                        case Loding.list_2D:
                            Laya.loader.load(Loding.list_2D[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX2D资源' + Loding.list_2D[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('2D资源' + Loding.list_2D[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.list_3DScene:
                            Laya.Scene3D.load(Loding.list_3DScene[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX3D场景' + Loding.list_3DScene[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('3D场景' + Loding.list_3DScene[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.list_3DPrefab:
                            Laya.Sprite3D.load(Loding.list_3DPrefab[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX3D预设体' + Loding.list_3DPrefab[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('3D场景' + Loding.list_3DPrefab[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.list_Json:
                            Laya.loader.load(Loding.list_Json[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX数据表' + Loding.list_Json[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('数据表' + Loding.list_Json[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }), null, Laya.Loader.JSON);
                            break;
                        default:
                            break;
                    }
                }
                lodingPhaseComplete() { }
                lodingComplete() { }
            }
            Loding.LodingScene = LodingScene;
        })(Loding = lwg.Loding || (lwg.Loding = {}));
        let Start;
        (function (Start) {
            class StartScene extends Admin.Scene {
                moduleOnAwake() {
                }
                moduleOnEnable() {
                }
                moduleEventReg() {
                }
            }
            Start.StartScene = StartScene;
        })(Start = lwg.Start || (lwg.Start = {}));
        let Tomato;
        (function (Tomato) {
            let scenePointType;
            (function (scenePointType) {
                scenePointType["open"] = "open";
                scenePointType["close"] = "close";
            })(scenePointType = Tomato.scenePointType || (Tomato.scenePointType = {}));
            function scenePrintPoint(sceneName, type) {
                switch (sceneName) {
                    case Admin.SceneName.UILoding:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'UIPreload');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'UIPreload');
                        }
                        break;
                    case Admin.SceneName.UIStart:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'mianpage');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'mianpage');
                        }
                        break;
                    case Admin.SceneName.UIVictory:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'successpage');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'successpage');
                        }
                        break;
                    case Admin.SceneName.UIDefeated:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'failpage');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'failpage');
                        }
                        break;
                    case Admin.SceneName.UIResurgence:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'revivepage');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'revivepage');
                        }
                        break;
                    case Admin.SceneName.UISkinXD:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'limmitpage');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'limmitpage');
                        }
                        break;
                    case Admin.SceneName.UIShare:
                        if (type === scenePointType.open) {
                            ADManager.TAPoint(TaT.PageEnter, 'sharepage');
                        }
                        else if (type === scenePointType.close) {
                            ADManager.TAPoint(TaT.PageLeave, 'sharepage');
                        }
                        break;
                    default:
                        break;
                }
            }
            Tomato.scenePrintPoint = scenePrintPoint;
            let btnPointType;
            (function (btnPointType) {
                btnPointType["show"] = "show";
                btnPointType["click"] = "click";
            })(btnPointType = Tomato.btnPointType || (Tomato.btnPointType = {}));
            function btnPrintPoint() {
            }
            Tomato.btnPrintPoint = btnPrintPoint;
        })(Tomato = lwg.Tomato || (lwg.Tomato = {}));
    })(lwg || (lwg = {}));
    let Admin = lwg.Admin;
    let EventAdmin = lwg.EventAdmin;
    let Pause = lwg.Pause;
    let Execution = lwg.Execution;
    let Gold = lwg.Gold;
    let Setting = lwg.Setting;
    let PalyAudio = lwg.PalyAudio;
    let Click = lwg.Click;
    let Effects = lwg.Effects;
    let Dialog = lwg.Dialog;
    let Animation2D = lwg.Animation2D;
    let Animation3D = lwg.Animation3D;
    let Tools = lwg.Tools;
    let Elect = lwg.Elect;
    let Loding = lwg.Loding;
    let LodeScene = lwg.Loding.LodingScene;
    let Shop = lwg.Shop;
    let ShopScene = lwg.Shop.ShopScene;
    let Task = lwg.Task;
    let TaskScene = lwg.Task.TaskScene;
    let VictoryBox = lwg.VictoryBox;
    let VictoryBoxScene = lwg.VictoryBox.VictoryBoxScene;
    let CheckIn = lwg.CheckIn;
    let CheckInScene = lwg.CheckIn.CheckInScene;
    let SkinXD = lwg.SkinXD;
    let SkinXDScene = lwg.SkinXD.SkinXDScene;
    let Skin = lwg.Skin;
    let SkinScene = lwg.Skin.SkinScene;
    let EasterEgg = lwg.EasterEgg;
    let Start = lwg.Start;
    let StartScene = lwg.Start.StartScene;
    let Tomato = lwg.Tomato;

    var lwg3D;
    (function (lwg3D) {
        class Scene3D extends Laya.Script3D {
            constructor() {
                super();
                this.mainCameraFpos = new Laya.Vector3();
            }
            onAwake() {
                this.self = this.owner;
                this.calssName = this['__proto__']['constructor'].name;
                this.MainCamera = this.self.getChildByName("Main Camera");
                if (this.MainCamera) {
                    this.mainCameraFpos.x = this.MainCamera.transform.localPositionX;
                    this.mainCameraFpos.y = this.MainCamera.transform.localPositionY;
                    this.mainCameraFpos.z = this.MainCamera.transform.localPositionZ;
                }
                this.lwgOnAwake();
                this.lwgNodeDec();
                this.lwgAdaptive();
            }
            lwgOnAwake() {
            }
            onEnable() {
                this.self[this.calssName] = this;
                this.lwgEventReg();
                this.lwgOnEnable();
                this.lwgBtnClick();
                this.lwgAdaptive();
                this.lwgOpenAni();
            }
            lwgNodeDec() {
            }
            lwgEventReg() {
            }
            lwgOnEnable() {
            }
            lwgBtnClick() {
            }
            lwgAdaptive() {
            }
            lwgOpenAni() {
            }
            lwgVanishAni() {
            }
            onUpdate() {
                this.lwgOnUpDate();
            }
            lwgOnUpDate() {
            }
            onDisable() {
                this.lwgOnDisable();
                Laya.timer.clearAll(this);
                Laya.Tween.clearAll(this);
                EventAdmin.offCaller(this);
            }
            lwgOnDisable() {
            }
        }
        lwg3D.Scene3D = Scene3D;
        class Object3D extends Laya.Script3D {
            constructor() {
                super();
            }
            onAwake() {
                this.self = this.owner;
                this.selfTransform = this.self.transform;
                this.selfScene = this.self.scene;
                let calssName = this['__proto__']['constructor'].name;
                this.self[calssName] = this;
                this.rig3D = this.self.getComponent(Laya.Rigidbody3D);
                this.BoxCol3D = this.self.getComponent(Laya.PhysicsCollider);
                this.lwgNodeDec();
            }
            lwgNodeDec() { }
            onEnable() {
                this.lwgEventReg();
                this.lwgOnEnable();
            }
            lwgOnEnable() { }
            lwgBtnClick() {
            }
            lwgEventReg() {
            }
            onUpdate() {
                this.lwgOnUpdate();
            }
            lwgOnUpdate() {
            }
            onDisable() {
                this.lwgOnDisable();
                Laya.Tween.clearAll(this);
                Laya.timer.clearAll(this);
                EventAdmin.offCaller(this);
            }
            lwgOnDisable() {
            }
        }
        lwg3D.Object3D = Object3D;
    })(lwg3D || (lwg3D = {}));

    var Game3D;
    (function (Game3D) {
        Game3D.myCardArr = [];
        Game3D.oppositeCardArr = [];
        Game3D.questionArr = [];
        function randomlyTakeOut(type) {
            let index16 = Tools.arrayRandomGetOut(Game3D.personData, 16);
            let startZ = 0.3;
            for (let index = 0; index < index16.length; index++) {
                const element = Game3D.AllCardTem.getChildByName(index16[index]['name']);
                if (type === WhichScard.MyCard) {
                    Game3D.myCardArr.push(index16[index]);
                    Game3D.MyCard.addChild(element);
                    if (index % 4 == 0) {
                        startZ -= 0.5;
                    }
                    element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                    element.transform.localRotationEulerX = 10;
                }
                else if (type === WhichScard.OppositeCard) {
                    Game3D.oppositeCardArr.push(index16[index]);
                    Game3D.OppositeCard.addChild(element);
                    if (index % 4 == 0) {
                        startZ += 0.5;
                    }
                    element.transform.localPosition = new Laya.Vector3(0.5 * (index % 4) - 0.5, 0, startZ);
                    element.transform.localRotationEulerX = -10;
                }
            }
        }
        Game3D.randomlyTakeOut = randomlyTakeOut;
        function randomTaskCard(type) {
            let contrastArr = [];
            for (let index = 0; index < Game3D.characteristicsData.length; index++) {
                let index1 = Game3D.characteristicsData[index][characteristicsProperty.index];
                contrastArr.push({
                    index: index1,
                    value: 0
                });
            }
            let whichArr;
            if (type === WhichScard.MyCard) {
                whichArr = Game3D.myCardArr;
            }
            else {
                whichArr = Game3D.oppositeCardArr;
            }
            for (let i = 0; i < Game3D.myCardArr.length; i++) {
                const characteristicsArr = Game3D.myCardArr[i][personProperty.characteristicsArr];
                for (let j = 0; j < characteristicsArr.length; j++) {
                    const characteristicsIndex = characteristicsArr[j];
                    contrastArr[characteristicsIndex - 1]['value']++;
                }
            }
            for (let index = 0; index < contrastArr.length; index++) {
                const element = contrastArr[index];
                if (element['value'] === 0) {
                    contrastArr.splice(index, 1);
                    index--;
                }
            }
            Tools.objArrPropertySort(contrastArr, 'value');
            Tools.objArrUnique(contrastArr, 'value');
            if (whichArr.length == 1) ;
            else if (whichArr.length == 2) ;
            else if (whichArr.length == 3) ;
            else if (whichArr.length >= 4) ;
        }
        Game3D.randomTaskCard = randomTaskCard;
        let WhichScard;
        (function (WhichScard) {
            WhichScard["OppositeCard"] = "OppositeCard";
            WhichScard["MyCard"] = "MyCard";
        })(WhichScard = Game3D.WhichScard || (Game3D.WhichScard = {}));
        Game3D.characteristicsData = [];
        let characteristicsProperty;
        (function (characteristicsProperty) {
            characteristicsProperty["index"] = "index";
            characteristicsProperty["describe"] = "describe";
            characteristicsProperty["question"] = "question";
        })(characteristicsProperty = Game3D.characteristicsProperty || (Game3D.characteristicsProperty = {}));
        Game3D.personData = [];
        let personProperty;
        (function (personProperty) {
            personProperty["characteristicsArr"] = "characteristicsArr";
            personProperty["ChName"] = "ChName";
            personProperty["name"] = "name";
        })(personProperty = Game3D.personProperty || (Game3D.personProperty = {}));
        function dataInit() {
            Game3D.characteristicsData = Laya.loader.getRes("GameData/Game/characteristics.json")['RECORDS'];
            Game3D.personData = Laya.loader.getRes("GameData/Game/Person.json")['RECORDS'];
        }
        Game3D.dataInit = dataInit;
        class MainScene extends lwg3D.Scene3D {
            lwgOnAwake() {
                Game3D.Scene3D = this.self;
                Game3D.MainCamera = Game3D.Scene3D.getChildByName('Main Camera');
                Game3D.MyCard = Game3D.Scene3D.getChildByName('MyCard');
                Game3D.OppositeCard = Game3D.Scene3D.getChildByName('OppositeCard');
                Game3D.AllCardTem = Game3D.Scene3D.getChildByName('AllCard');
            }
            lwgOnEnable() {
                randomlyTakeOut(WhichScard.MyCard);
                randomlyTakeOut(WhichScard.OppositeCard);
                randomTaskCard(WhichScard.MyCard);
            }
        }
        Game3D.MainScene = MainScene;
    })(Game3D || (Game3D = {}));

    class LwgInit extends Admin.Scene {
        lwgOnAwake() {
            console.log('开始游戏每个模块的初始化');
            this.admin();
            this.game3D();
            this.shop();
            this.skin();
            this.task();
            this.easterEgg();
        }
        admin() {
        }
        ;
        game3D() {
            Game3D.dataInit();
            Game3D.Scene3D = Laya.loader.getRes(Loding.list_3DScene[0]);
            Laya.stage.addChild(Game3D.Scene3D);
            Game3D.Scene3D.addComponent(Game3D.MainScene);
        }
        skin() {
        }
        ;
        shop() {
        }
        ;
        task() {
        }
        easterEgg() {
        }
        lwgOnEnable() {
            console.log('完成初始化');
            Admin._openScene(Admin.SceneName.UIStart, this.self);
        }
    }

    class UILoding extends Loding.LodingScene {
        lwgOnAwake() {
            Loding.list_2D = [
                "res/atlas/Frame/Effects.png",
                "res/atlas/Frame/UI.png",
            ];
            Loding.list_3DScene = [
                "3DScene/LayaScene_GameMain/Conventional/GameMain.ls"
            ];
            Loding.list_3DPrefab = [];
            Loding.list_Json = [
                "GameData/Game/characteristics.json",
                "GameData/Game/Person.json",
            ];
        }
        lwgOnEnable() {
        }
        lodingPhaseComplete() {
        }
        lodingComplete() {
        }
        lwgOnUpdate() {
        }
    }

    class UIStart extends Start.StartScene {
    }

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            this.newScene = Laya.stage.addChild(new Laya.Scene3D());
            var camera = this.newScene.addChild(new Laya.Camera(0, 0.1, 100));
            camera.transform.translate(new Laya.Vector3(0, 6, 9.5));
            camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
            var directionLight = new Laya.DirectionLight();
            this.newScene.addChild(directionLight);
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            var mat = directionLight.transform.worldMatrix;
            mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;
            var plane = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 10, 10)));
            var planeMat = new Laya.BlinnPhongMaterial();
            Laya.Texture2D.load("res/grass.png", Laya.Handler.create(this, function (tex) {
                planeMat.albedoTexture = tex;
            }));
            var tilingOffset = planeMat.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            planeMat.tilingOffset = tilingOffset;
            plane.meshRenderer.material = planeMat;
            var planeStaticCollider = plane.addComponent(Laya.PhysicsCollider);
            var planeShape = new Laya.BoxColliderShape(10, 0, 10);
            planeStaticCollider.colliderShape = planeShape;
            planeStaticCollider.friction = 2;
            planeStaticCollider.restitution = 0.3;
            this.mat1 = new Laya.BlinnPhongMaterial();
            Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, function (tex) {
                this.mat1.albedoTexture = tex;
                Laya.timer.once(100, this, function () {
                    this.addBox();
                });
            }));
        }
        addBox() {
            var box = this.newScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.75, 0.5, 0.5)));
            box.meshRenderer.material = this.mat1;
            var transform = box.transform;
            var pos = transform.position;
            pos.setValue(0, 10, 0);
            transform.position = pos;
            var rigidBody = box.addComponent(Laya.Rigidbody3D);
            var boxShape = new Laya.BoxColliderShape(0.75, 0.5, 0.5);
            rigidBody.colliderShape = boxShape;
            rigidBody.mass = 10;
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/Frame/LwgInit.ts", LwgInit);
            reg("script/Game/UILoding.ts", UILoding);
            reg("script/Game/UIStart.ts", UIStart);
            reg("script/GameUI.ts", GameUI);
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Scene/UILoding.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = true;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
