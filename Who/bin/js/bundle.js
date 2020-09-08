(function () {
    'use strict';

    class PromoOpen extends Laya.Script {
        constructor() {
            super(...arguments);
            this.target = null;
        }
        onClick() {
            this.target.active = this.target.visible = true;
        }
    }

    class ButtonScale extends Laya.Script {
        constructor() {
            super(...arguments);
            this.time = .1;
            this.ratio = 1.04;
            this.startScaleX = 1;
            this.startScaleY = 1;
            this.scaled = false;
        }
        onAwake() {
            this.owner.on(Laya.Event.MOUSE_DOWN, null, () => { this.ScaleBig(); });
            this.owner.on(Laya.Event.MOUSE_UP, null, () => { this.ScaleSmall(); });
            this.owner.on(Laya.Event.MOUSE_OUT, null, () => { this.ScaleSmall(); });
        }
        ScaleBig() {
            if (this.scaled)
                return;
            this.scaled = true;
            Laya.Tween.to(this.owner, { scaleX: this.startScaleX * this.ratio, scaleY: this.startScaleY * this.ratio }, this.time * 1000);
        }
        ScaleSmall() {
            if (!this.scaled)
                return;
            this.scaled = false;
            Laya.Tween.to(this.owner, { scaleX: this.startScaleX, scaleY: this.startScaleY }, this.time * 1000);
        }
    }

    class PromoItem extends Laya.Script {
        constructor() {
            super(...arguments);
            this.bgImage = null;
            this.iconImage = null;
            this.nameText = null;
            this.infoText = null;
            this.flag1 = null;
            this.flag2 = null;
            this.flag3 = null;
        }
        onAwake() {
            this.bgImage = this.owner.getChildByName("bg");
            this.iconImage = this.owner.getChildByName("icon");
            if (this.iconImage != null) {
                this.flag1 = this.iconImage.getChildByName("flag1");
                this.flag2 = this.iconImage.getChildByName("flag2");
                this.flag3 = this.iconImage.getChildByName("flag3");
            }
            this.nameText = this.owner.getChildByName("name");
            this.infoText = this.owner.getChildByName("info");
        }
        DoLoad() {
            if (this.data == null)
                return;
            if (this.iconImage != null)
                this.iconImage.skin = this.data.icon;
            if (this.nameText != null)
                this.nameText.text = this.data.title;
            this.SetFlag();
        }
        SetFlag() {
            if (this.flag1 != null)
                this.flag1.active = this.flag1.visible = false;
            if (this.flag2 != null)
                this.flag2.active = this.flag2.visible = false;
            if (this.flag3 != null)
                this.flag3.active = this.flag3.visible = false;
            switch (this.data.tag) {
                case 1:
                    if (this.flag1 != null)
                        this.flag1.active = this.flag1.visible = true;
                    break;
                case 2:
                    if (this.flag2 != null)
                        this.flag2.active = this.flag2.visible = true;
                    break;
                case 3:
                    if (this.flag3 != null)
                        this.flag3.active = this.flag3.visible = true;
                    break;
            }
        }
        OnShow() {
            this.data.ReportShow();
        }
        OnClick() {
            this.data.Click();
            if (this.onClick_ != null) {
                this.onClick_(this);
            }
        }
        onClick() {
            this.OnClick();
        }
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class Behaviour extends Laya.Script {
        constructor() {
            super(...arguments);
            this.isAwake = false;
            this.isStart = false;
            this.isEnable = false;
            this.isDestroy = false;
        }
        OnAwake() { }
        OnStart() { }
        OnUpdate() { }
        OnEnable() { }
        OnDisable() { }
        OnDestroy() { }
        DoAwake() {
            if (!this.active)
                return;
            if (!this.isAwake) {
                this.isAwake = true;
                this.OnAwake();
            }
        }
        DoStart() {
            if (!this.active)
                return;
            if (!this.isStart) {
                this.isStart = true;
                this.OnStart();
            }
        }
        DoUpdate() {
            if (!this.active)
                return;
            if (this.isStart) {
                this.OnUpdate();
            }
        }
        DoEnable() {
            if (!this.active)
                return;
            if (!this.isEnable) {
                this.isEnable = true;
                this.OnEnable();
            }
        }
        DoDisable() {
            if (this.isEnable) {
                this.isEnable = false;
                this.OnDisable();
            }
        }
        DoDestroy() {
            if (!this.isDestroy) {
                this.isDestroy = true;
                this.OnDestroy();
            }
        }
        onAwake() {
            this.DoAwake();
        }
        onStart() {
            this.DoAwake();
            this.DoStart();
        }
        onUpdate() {
            this.DoAwake();
            this.DoEnable();
            this.DoStart();
            this.DoUpdate();
        }
        onEnable() {
            this.DoAwake();
            this.DoEnable();
            this.DoStart();
        }
        onDisable() {
            this.DoDisable();
        }
        onDestroy() {
            this.DoDestroy();
        }
        static SetActive(node, value) {
            if (node == null)
                return;
            node.active = value;
            if (node instanceof Laya.Box) {
                node.visible = value;
            }
        }
        static GetActive(node) {
            if (node == null)
                return false;
            if (!node.active)
                return false;
            if (node instanceof Laya.Box) {
                if (!node.visible)
                    return false;
            }
            return true;
        }
        get active() {
            return Behaviour.GetActive(this.owner);
        }
        set active(value) {
            Behaviour.SetActive(this.owner, value);
            if (value) {
                this.DoEnable();
            }
            else {
                this.DoDisable();
            }
        }
    }

    class P201 extends Behaviour {
        constructor() {
            super(...arguments);
            this.promoItem = null;
            this.shake = false;
            this.animTime = 0;
            this.refrTime = 0;
        }
        OnAwake() {
            return __awaiter(this, void 0, void 0, function* () {
                this.promoItem = this.owner.getComponent(PromoItem);
                TJ.Develop.Yun.Promo.Data.ReportAwake(P201.style);
                this.promoItem.style = P201.style;
                this.active = false;
                if (Laya.Browser.onIOS && TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                    return;
                }
                if (P201.promoList == null) {
                    let list = yield TJ.Develop.Yun.Promo.List.Get(P201.style);
                    if (P201.promoList == null)
                        P201.promoList = list;
                }
                if (P201.promoList.count > 0) {
                    TJ.Develop.Yun.Promo.Data.ReportStart(P201.style);
                    this.active = true;
                }
                else {
                    this.owner.destroy();
                }
            });
        }
        OnEnable() {
            this.LoadAndShowIcon();
        }
        OnDisable() {
            if (P201.promoList != null) {
                P201.promoList.Unload(this.promoItem.data);
            }
        }
        OnUpdate() {
            let deltaTime = Laya.timer.delta / 1000;
            this.refrTime += deltaTime;
            if (this.refrTime > 5) {
                this.refrTime -= 5;
                this.LoadAndShowIcon();
            }
            if (!this.shake)
                return;
            this.animTime += deltaTime;
            this.animTime %= 2.5;
            if (this.animTime <= .75) {
                this.promoItem.owner.rotation = Math.sin(this.animTime * 6 * Math.PI) * 25 * (1 - this.animTime / .75);
            }
            else {
                this.promoItem.owner.rotation = 0;
            }
        }
        LoadIcon() {
            let data = P201.promoList.Load();
            if (data != null) {
                P201.promoList.Unload(this.promoItem.data);
                this.promoItem.data = data;
                this.promoItem.onClick_ = () => { this.LoadAndShowIcon(); };
                this.promoItem.DoLoad();
            }
            return data;
        }
        LoadAndShowIcon() {
            if (this.LoadIcon() != null) {
                this.promoItem.OnShow();
            }
            else {
                if (this.promoItem.data == null) {
                    this.owner.destroy();
                }
            }
        }
    }
    P201.style = "P201";
    P201.promoList = null;

    class P202 extends Behaviour {
        constructor() {
            super(...arguments);
            this.promoList = null;
            this.itemList = [];
            this.scroll = null;
            this.layout = null;
            this.prefab = null;
            this.paddingTop = 10;
            this.paddingBottom = 10;
            this.line = 0;
            this.column = 0;
            this.toTop = false;
            this.showing = [];
        }
        OnAwake() {
            return __awaiter(this, void 0, void 0, function* () {
                this.scroll = this.owner.getChildByName("scroll");
                this.layout = this.scroll.getChildByName("layout");
                this.prefab = this.layout.getCell(0);
                let w = this.owner.width - this.paddingTop - this.paddingBottom;
                while (w >= this.prefab.width) {
                    w = w - this.prefab.width - this.layout.spaceX;
                    this.column++;
                }
                TJ.Develop.Yun.Promo.Data.ReportAwake(P202.style);
                this.active = false;
                if (Laya.Browser.onIOS && TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                    return;
                }
                this.promoList = yield TJ.Develop.Yun.Promo.List.Get(P202.style);
                if (this.promoList.count > 0) {
                    TJ.Develop.Yun.Promo.Data.ReportStart(P202.style);
                    this.line = Math.ceil(this.promoList.count / this.column);
                    this.layout.repeatX = this.column;
                    this.layout.repeatY = this.line;
                    for (let i = 0; i < this.layout.cells.length; i++) {
                        let node = this.layout.getCell(i);
                        if (i < this.promoList.count) {
                            let item = node.getComponent(PromoItem);
                            if (item != null) {
                                this.itemList.push(item);
                                item.style = P202.style;
                            }
                            Behaviour.SetActive(node, true);
                        }
                        else {
                            Behaviour.SetActive(node, false);
                        }
                    }
                    this.line = Math.ceil(this.itemList.length / this.column);
                    let h = this.paddingTop + this.paddingBottom;
                    h += this.prefab.height * this.line + this.layout.spaceY * (this.line - 1);
                    this.layout.height = h;
                    if (this.scroll.height < this.layout.height) {
                        this.scroll.vScrollBarSkin = "";
                        this.scroll.vScrollBar.rollRatio = 0;
                    }
                    for (let item of this.itemList) {
                        this.LoadIcon(item);
                    }
                    this.active = true;
                }
                else {
                    this.owner.destroy();
                }
            });
        }
        OnDisable() {
            return __awaiter(this, void 0, void 0, function* () {
                this.promoList = yield TJ.Develop.Yun.Promo.List.Get(P202.style);
                for (let item of this.itemList) {
                    this.LoadIcon(item);
                }
            });
        }
        get maxTop() {
            return 0;
        }
        get maxBottom() {
            let y = this.paddingTop + this.paddingBottom;
            y += this.prefab.height * this.line + this.layout.spaceY * (this.line - 1) - this.scroll.height;
            return y;
        }
        get scrollValue() {
            if (this.scroll.vScrollBar != null) {
                return this.scroll.vScrollBar.value;
            }
            return 0;
        }
        set scrollValue(v) {
            if (this.scroll.vScrollBar != null) {
                this.scroll.vScrollBar.value = v;
            }
        }
        OnUpdate() {
            let deltaTime = Laya.timer.delta / 1000;
            if (this.scroll.height < this.layout.height) {
                if (this.scrollValue <= this.maxTop) {
                    this.toTop = false;
                }
                else if (this.scrollValue >= this.maxBottom) {
                    this.toTop = true;
                }
                if (this.toTop) {
                    this.scrollValue -= 50 * deltaTime;
                }
                else {
                    this.scrollValue += 50 * deltaTime;
                }
            }
            else {
                this.scrollValue = this.maxTop;
            }
            this.CheckShow();
        }
        LoadIcon(promoItem) {
            let data = this.promoList.Load();
            if (data != null) {
                this.promoList.Unload(promoItem.data);
                promoItem.data = data;
                promoItem.onClick_ = (item) => { this.LoadAndShowIcon(item); };
                promoItem.DoLoad();
                promoItem.infoText.text = 1 + Math.floor(Math.random() * 40) / 10 + "w人在玩";
            }
            return data;
        }
        LoadAndShowIcon(promoItem) {
            if (this.LoadIcon(promoItem) != null) {
                promoItem.OnShow();
            }
        }
        CheckShow() {
            for (let item of this.itemList) {
                let i = this.showing.indexOf(item);
                let node = item.owner;
                let d = Math.abs(-node.y - this.paddingTop - this.prefab.height / 2 + this.scrollValue + this.scroll.height / 2);
                if (d < this.scroll.height / 2) {
                    if (i < 0) {
                        this.showing.push(item);
                        item.OnShow();
                    }
                }
                else {
                    if (i >= 0) {
                        this.showing.splice(i, 1);
                    }
                }
            }
        }
    }
    P202.style = "P202";

    class P204 extends Behaviour {
        constructor() {
            super(...arguments);
            this.promoList = null;
            this.itemList = [];
            this.scroll = null;
            this.layout = null;
            this.prefab = null;
            this.paddingLeft = 20;
            this.paddingRight = 20;
            this.toLeft = false;
            this.showing = [];
        }
        OnAwake() {
            return __awaiter(this, void 0, void 0, function* () {
                this.scroll = this.owner.getChildByName("scroll");
                this.layout = this.scroll.getChildByName("layout");
                this.prefab = this.layout.getCell(0);
                TJ.Develop.Yun.Promo.Data.ReportAwake(P204.style);
                this.active = false;
                if (Laya.Browser.onIOS && TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                    return;
                }
                let list = yield TJ.Develop.Yun.Promo.List.Get(P204.style);
                if (this.promoList == null)
                    this.promoList = list;
                if (this.promoList.count > 0) {
                    TJ.Develop.Yun.Promo.Data.ReportStart(P204.style);
                    this.layout.repeatX = this.promoList.count;
                    for (let i = 0; i < this.layout.cells.length; i++) {
                        let node = this.layout.getCell(i);
                        if (i < this.promoList.count) {
                            let item = node.getComponent(PromoItem);
                            if (item != null) {
                                this.itemList.push(item);
                                item.style = P204.style;
                            }
                            node.active = node.visible = true;
                        }
                        else {
                            node.active = node.visible = false;
                        }
                    }
                    let w = this.paddingLeft + this.paddingRight;
                    w += this.prefab.width * this.itemList.length + this.layout.spaceX * (this.itemList.length - 1);
                    this.layout.width = w;
                    if (this.scroll.width < this.layout.width) {
                        this.scroll.hScrollBarSkin = "";
                        this.scroll.hScrollBar.rollRatio = 0;
                    }
                    this.layout.width = w;
                    for (let item of this.itemList) {
                        this.LoadIcon(item);
                    }
                    this.active = true;
                }
                else {
                    this.owner.destroy();
                }
            });
        }
        get maxLeft() {
            let x = 0;
            return x;
        }
        get maxRight() {
            let x = this.scroll.hScrollBar.max;
            return x;
        }
        get scrollValue() {
            if (this.scroll.hScrollBar != null) {
                return this.scroll.hScrollBar.value;
            }
            return 0;
        }
        set scrollValue(v) {
            if (this.scroll.hScrollBar != null) {
                this.scroll.hScrollBar.value = v;
            }
        }
        OnUpdate() {
            let deltaTime = Laya.timer.delta / 1000;
            if (this.scroll.width < this.layout.width) {
                if (this.scrollValue >= this.maxRight) {
                    this.toLeft = true;
                }
                else if (this.scrollValue <= this.maxLeft) {
                    this.toLeft = false;
                }
                if (this.toLeft) {
                    this.scrollValue -= 50 * deltaTime;
                }
                else {
                    this.scrollValue += 50 * deltaTime;
                }
            }
            else {
                this.layout.x = this.maxLeft;
            }
            this.CheckShow();
        }
        LoadIcon(promoItem) {
            let data = this.promoList.Load();
            if (data != null) {
                this.promoList.Unload(promoItem.data);
                promoItem.data = data;
                promoItem.onClick_ = (item) => { this.LoadIcon(item); };
                promoItem.DoLoad();
                let i = this.showing.indexOf(promoItem);
                if (i >= 0) {
                    this.showing.splice(i, 1);
                }
            }
            return data;
        }
        CheckShow() {
            for (let item of this.itemList) {
                let node = item.owner;
                let d = Math.abs(node.x - this.scrollValue - this.scroll.width / 2 + node.width / 2 + this.layout.spaceX);
                let i = this.showing.indexOf(item);
                if (d < this.scroll.width / 2) {
                    if (i < 0) {
                        this.showing.push(item);
                        item.OnShow();
                    }
                }
                else {
                    if (i >= 0) {
                        this.showing.splice(i, 1);
                    }
                }
            }
        }
    }
    P204.style = "P204";

    class P205 extends Behaviour {
        constructor() {
            super(...arguments);
            this.promoList = null;
            this.itemList = [];
            this.scroll = null;
            this.layout = null;
            this.prefab = null;
            this.paddingTop = 10;
            this.paddingBottom = 10;
            this.move = null;
            this.show = null;
            this.hide = null;
            this.maxX = 620;
            this.line = 0;
            this.column = 0;
            this.targetX = 0;
            this.showing = [];
        }
        OnAwake() {
            return __awaiter(this, void 0, void 0, function* () {
                this.move = this.owner.getChildByName("move");
                let button = this.move.getChildByName("button");
                this.show = button.getChildByName("show");
                this.hide = button.getChildByName("hide");
                let board = this.move.getChildByName("board");
                this.scroll = board.getChildByName("scroll");
                this.layout = this.scroll.getChildByName("layout");
                this.prefab = this.layout.getCell(0);
                this.show.clickHandler = new Laya.Handler(null, () => { this.Show(); });
                this.hide.clickHandler = new Laya.Handler(null, () => { this.Hide(); });
                let w = this.scroll.width - this.paddingTop - this.paddingBottom;
                while (w >= this.prefab.width) {
                    w = w - this.prefab.width - this.layout.spaceX;
                    this.column++;
                }
                TJ.Develop.Yun.Promo.Data.ReportAwake(P205.style);
                if (this.show.parent.scaleX < 0)
                    this.maxX = -this.maxX;
                if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                    if (Laya.Browser.onIOS && TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                        this.active = false;
                        return;
                    }
                    return;
                }
                this.promoList = yield TJ.Develop.Yun.Promo.List.Get(P205.style);
                if (this.promoList.count > 0) {
                    TJ.Develop.Yun.Promo.Data.ReportStart(P205.style);
                    this.line = Math.ceil(this.promoList.count / this.column);
                    this.layout.repeatX = this.column;
                    this.layout.repeatY = this.line;
                    for (let i = 0; i < this.layout.cells.length; i++) {
                        let node = this.layout.getCell(i);
                        if (i < this.promoList.count) {
                            let item = node.getComponent(PromoItem);
                            if (item != null) {
                                this.itemList.push(item);
                                item.style = P205.style;
                            }
                            node.active = node.visible = true;
                        }
                        else {
                            node.active = node.visible = false;
                        }
                    }
                    this.line = Math.ceil(this.itemList.length / this.column);
                    let h = this.paddingTop + this.paddingBottom;
                    h += this.prefab.height * this.line + this.layout.spaceY * (this.line - 1);
                    this.layout.height = h;
                    if (this.scroll.height < this.layout.height) {
                        this.scroll.vScrollBarSkin = "";
                        this.scroll.vScrollBar.rollRatio = 0;
                    }
                    for (let item of this.itemList) {
                        this.LoadIcon(item);
                    }
                    this.active = true;
                }
                else {
                    this.owner.destroy();
                }
            });
        }
        get scrollValue() {
            if (this.scroll.vScrollBar != null) {
                return this.scroll.vScrollBar.value;
            }
            return 0;
        }
        set scrollValue(v) {
            if (this.scroll.vScrollBar != null) {
                this.scroll.vScrollBar.value = v;
            }
        }
        LoadIcon(promoItem) {
            let data = this.promoList.Load();
            if (data != null) {
                this.promoList.Unload(promoItem.data);
                promoItem.data = data;
                promoItem.onClick_ = (item) => { this.LoadAndShowIcon(item); };
                promoItem.DoLoad();
            }
            return data;
        }
        LoadAndShowIcon(promoItem) {
            if (this.LoadIcon(promoItem) != null) {
                promoItem.OnShow();
            }
        }
        Show() {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                let param = new TJ.API.Promo.Param();
                param.extraData = { "TJ_App": TJ.API.AppInfo.AppGuid() };
                TJ.API.Promo.Pop(param);
                return;
            }
            this.targetX = this.maxX;
            this.show.active = this.show.visible = false;
            this.hide.active = this.hide.visible = true;
            this.scrollValue = 0;
        }
        Hide() {
            this.targetX = 0;
            this.showing = [];
        }
        OnUpdate() {
            let deltaTime = Laya.timer.delta / 1000;
            if (this.move.centerX != this.targetX) {
                let d = this.targetX - this.move.centerX;
                let s = 3000 * deltaTime;
                if (d > 0) {
                    d = Math.min(this.move.centerX + s, this.targetX);
                }
                else {
                    d = Math.max(this.move.centerX - s, this.targetX);
                }
                this.move.centerX = d;
                if (this.move.centerX == 0) {
                    this.show.active = this.show.visible = true;
                    this.hide.active = this.hide.visible = false;
                    window.setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        this.promoList = yield TJ.Develop.Yun.Promo.List.Get(P205.style);
                        for (let item of this.itemList) {
                            this.LoadIcon(item);
                        }
                    }), 0);
                }
            }
            else {
                if (this.move.centerX == this.maxX) {
                    this.CheckShow();
                }
            }
        }
        CheckShow() {
            for (let item of this.itemList) {
                let i = this.showing.indexOf(item);
                let node = item.owner;
                let d = Math.abs(-node.y - this.paddingTop - this.prefab.height / 2 + this.scrollValue + this.scroll.height / 2);
                if (d < this.scroll.height / 2) {
                    if (i < 0) {
                        this.showing.push(item);
                        item.OnShow();
                    }
                }
                else {
                    if (i >= 0) {
                        this.showing.splice(i, 1);
                    }
                }
            }
        }
    }
    P205.style = "P205";

    class P106 extends Behaviour {
        constructor() {
            super(...arguments);
            this.promoList = null;
            this.itemList = [];
            this.layout = null;
            this.showing = [];
        }
        OnAwake() {
            return __awaiter(this, void 0, void 0, function* () {
                this.scrollView = this.owner.getChildByName("scroll");
                this.layout = this.scrollView.getChildByName("layout");
                this.scrollView.vScrollBarSkin = "";
                let close = this.owner.getChildByName("close");
                close.clickHandler = new Laya.Handler(null, () => { this.OnClose(); });
                TJ.Develop.Yun.Promo.Data.ReportAwake(P106.style);
                this.active = false;
                if (Laya.Browser.onIOS && TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                    return;
                }
                let list = yield TJ.Develop.Yun.Promo.List.Get(P106.style);
                if (this.promoList == null)
                    this.promoList = list;
                if (this.promoList.count > 0) {
                    TJ.Develop.Yun.Promo.Data.ReportStart(P106.style);
                    this.layout.repeatY = this.promoList.count;
                    let h = 0;
                    for (let i = 0; i < this.layout.cells.length; i++) {
                        let node = this.layout.getCell(i);
                        if (i < this.promoList.count) {
                            let item = node.getComponent(PromoItem);
                            if (item != null) {
                                this.itemList.push(item);
                                item.style = P106.style;
                            }
                            Behaviour.SetActive(node, true);
                        }
                        else {
                            Behaviour.SetActive(node, false);
                        }
                        if (i > 0) {
                            h += this.layout.spaceY;
                        }
                        h += node.height;
                    }
                    this.layout.height = h;
                    for (let item of this.itemList) {
                        this.LoadIcon(item);
                    }
                    this.active = true;
                }
                else {
                    this.owner.destroy();
                }
            });
        }
        OnEnable() {
            this.scrollValue = 0;
        }
        OnDisable() {
            return __awaiter(this, void 0, void 0, function* () {
                this.promoList = yield TJ.Develop.Yun.Promo.List.Get(P106.style);
                for (let item of this.itemList) {
                    this.LoadIcon(item);
                }
            });
        }
        OnUpdate() {
            this.CheckShow();
        }
        LoadIcon(promoItem) {
            let data = this.promoList.Load();
            if (data != null) {
                this.promoList.Unload(promoItem.data);
                promoItem.data = data;
                promoItem.onClick_ = (item) => { this.LoadIcon(item); };
                promoItem.DoLoad();
                let i = this.showing.indexOf(promoItem);
                if (i >= 0) {
                    this.showing.splice(i, 1);
                }
            }
            return data;
        }
        get scrollValue() {
            if (this.scrollView.vScrollBar != null) {
                return this.scrollView.vScrollBar.value;
            }
            return 0;
        }
        set scrollValue(v) {
            if (this.scrollView.vScrollBar != null) {
                this.scrollView.vScrollBar.value = v;
            }
        }
        CheckShow() {
            for (let item of this.itemList) {
                let node = item.owner;
                let d = Math.abs(node.y - this.scrollValue - this.scrollView.height / 2 + node.height / 2 + this.layout.spaceY);
                let i = this.showing.indexOf(item);
                if (d < this.scrollView.height / 2) {
                    if (i < 0) {
                        this.showing.push(item);
                        item.OnShow();
                    }
                }
                else {
                    if (i >= 0) {
                        this.showing.splice(i, 1);
                    }
                }
            }
        }
        OnClose() {
            let node = this.owner;
            node.active = node.visible = false;
        }
    }
    P106.style = "P106";

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
                HintContent[HintContent["\u6CA1\u6709\u62BD\u5956\u6B21\u6570\u4E86\uFF0C\u8BF7\u901A\u8FC7\u89C2\u770B\u5E7F\u544A\u83B7\u53D6\uFF01"] = 29] = "\u6CA1\u6709\u62BD\u5956\u6B21\u6570\u4E86\uFF0C\u8BF7\u901A\u8FC7\u89C2\u770B\u5E7F\u544A\u83B7\u53D6\uFF01";
                HintContent[HintContent["\u6CA1\u6709\u5E93\u5B58\u4E86\uFF01"] = 30] = "\u6CA1\u6709\u5E93\u5B58\u4E86\uFF01";
                HintContent[HintContent["\u724C\u6570\u592A\u5C11\uFF0C\u65E0\u6CD5\u4F7F\u7528\u9053\u5177\uFF01"] = 31] = "\u724C\u6570\u592A\u5C11\uFF0C\u65E0\u6CD5\u4F7F\u7528\u9053\u5177\uFF01";
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
                Animation2D.scale_Alpha(Hint_M, 0, 1, 0, 1, 1, 1, 200, 0, f => {
                    Animation2D.fadeOut(Dec, 0, 1, 150, 0, f => {
                        Animation2D.fadeOut(Dec, 1, 0, 200, 800, f => {
                            Animation2D.scale_Alpha(Hint_M, 1, 1, 1, 1, 0, 0, 200, 0, f => {
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
                    Laya.loader.load('Prefab/Dialogue_Common.json', Laya.Handler.create(this, function (prefab) {
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
                        Animation2D.scale_Alpha(Pre_Dialogue, 0, 0, 0, 1, 1, 1, 150, 1000, () => {
                            for (let index = 0; index < contentArr.length; index++) {
                                Laya.timer.once(index * delayed, this, () => {
                                    ContentLabel.text = contentArr[index];
                                    if (index == contentArr.length - 1) {
                                        Laya.timer.once(delayed, this, () => {
                                            Animation2D.scale_Alpha(Pre_Dialogue, 1, 1, 1, 0, 0, 0, 150, 1000, () => {
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
            function createCommonDialog(parent, x, y, content) {
                let Dialogue_Common;
                Laya.loader.load('Prefab/Dialogue_Common.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    Dialogue_Common = Laya.Pool.getItemByCreateFun('Dialogue_Common', _prefab.create, _prefab);
                    parent.addChild(Dialogue_Common);
                    Dialogue_Common.pos(x, y);
                    let Content = Dialogue_Common.getChildByName('Dialogue_Common');
                    Content.text = content;
                }));
            }
            Dialog.createCommonDialog = createCommonDialog;
        })(Dialog = lwg.Dialog || (lwg.Dialog = {}));
        let Execution;
        (function (Execution) {
            Execution._execution = {
                get value() {
                    return Laya.LocalStorage.getItem('_execution') ? Number(Laya.LocalStorage.getItem('_execution')) : 15;
                },
                set value(val) {
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
            Gold_1._num = {
                get value() {
                    return Laya.LocalStorage.getItem('_goldNum') ? Number(Laya.LocalStorage.getItem('_goldNum')) : 0;
                },
                set value(val) {
                    Laya.LocalStorage.setItem('_goldNum', val.toString());
                }
            };
            function createGoldNode(x, y, parent) {
                if (!parent) {
                    parent = Laya.stage;
                }
                if (Gold_1.GoldNode) {
                    Gold_1.GoldNode.removeSelf();
                }
                let sp;
                Laya.loader.load('Prefab/PreGold.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('gold', _prefab.create, _prefab);
                    let Num = sp.getChildByName('Num');
                    Num.text = Gold_1._num.value.toString();
                    parent.addChild(sp);
                    let Pic = sp.getChildByName('Pic');
                    sp.pos(x, y);
                    sp.zOrder = 100;
                    Gold_1.GoldNode = sp;
                }));
            }
            Gold_1.createGoldNode = createGoldNode;
            function addGold(number) {
                Gold_1._num.value += Number(number);
                let Num = Gold_1.GoldNode.getChildByName('Num');
                Num.text = Gold_1._num.value.toString();
            }
            Gold_1.addGold = addGold;
            function addGoldDisPlay(number) {
                let Num = Gold_1.GoldNode.getChildByName('Num');
                Num.value = (Number(Num.value) + Number(number)).toString();
            }
            Gold_1.addGoldDisPlay = addGoldDisPlay;
            function addGoldNoDisPlay(number) {
                Gold_1._num.value += Number(number);
            }
            Gold_1.addGoldNoDisPlay = addGoldNoDisPlay;
            function goldAppear(delayed, x, y) {
                if (!Gold_1.GoldNode) {
                    return;
                }
                if (delayed) {
                    Animation2D.scale_Alpha(Gold_1.GoldNode, 0, 1, 1, 1, 1, 1, delayed, 0, f => {
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
                if (!Gold_1.GoldNode) {
                    return;
                }
                if (delayed) {
                    Animation2D.scale_Alpha(Gold_1.GoldNode, 1, 1, 1, 1, 1, 0, delayed, 0, f => {
                        Gold_1.GoldNode.visible = false;
                    });
                }
                else {
                    Gold_1.GoldNode.visible = false;
                }
            }
            Gold_1.goldVinish = goldVinish;
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
                    this.self.x += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).y;
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
                EventType["startGame"] = "startGame";
                EventType["defeated"] = "defeated";
                EventType["victory"] = "victory";
                EventType["scene3DRefresh"] = "Scene3DRefresh";
                EventType["gameSceneRefresh"] = "gameSceneRefresh";
                EventType["nextCustoms"] = "nextCustoms";
                EventType["resurgence"] = "resurgence";
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
        let DateAdmin;
        (function (DateAdmin) {
            DateAdmin._date = {
                get year() {
                    return (new Date()).getFullYear();
                },
                get month() {
                    return (new Date()).getMonth();
                },
                get date() {
                    return (new Date()).getDate();
                },
                get day() {
                    return (new Date()).getDay();
                },
                get hours() {
                    return (new Date()).getHours();
                },
                get minutes() {
                    return (new Date()).getMinutes();
                },
                get seconds() {
                    return (new Date()).getSeconds();
                },
                get milliseconds() {
                    return (new Date()).getMilliseconds();
                },
                get toLocaleDateString() {
                    return (new Date()).toLocaleDateString();
                },
                get toLocaleTimeString() {
                    return (new Date()).toLocaleTimeString();
                }
            };
            DateAdmin._loginDate = {
                get value() {
                    let data = Laya.LocalStorage.getJSON('Date_loginDate');
                    let dataArr = [];
                    let d = new Date();
                    let date1 = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getDay()];
                    if (data) {
                        dataArr = JSON.parse(data);
                        let equal = false;
                        for (let index = 0; index < dataArr.length; index++) {
                            if (dataArr[index].toString() == date1.toString()) {
                                equal = true;
                            }
                        }
                        if (!equal) {
                            dataArr.push(date1);
                        }
                    }
                    if (dataArr.length == 0) {
                        dataArr.push(date1);
                    }
                    Laya.LocalStorage.setJSON('Date_loginDate', JSON.stringify(dataArr));
                    return dataArr;
                },
            };
            DateAdmin._loginNumber = {
                get value() {
                    return Laya.LocalStorage.getItem('_loginNumber') ? Number(Laya.LocalStorage.getItem('_loginNumber')) : 1;
                },
                set value(val) {
                    Laya.LocalStorage.setItem('_loginNumber', val.toString());
                }
            };
        })(DateAdmin = lwg.DateAdmin || (lwg.DateAdmin = {}));
        let TimerAdmin;
        (function (TimerAdmin) {
            function frameLoop(delay, caller, method, immediately, args, coverBefore) {
                if (immediately) {
                    method();
                }
                Laya.timer.frameLoop(delay, caller, () => {
                    method();
                }, args, coverBefore);
            }
            TimerAdmin.frameLoop = frameLoop;
            function frameRandomLoop(delay1, delay2, caller, method, immediately, args, coverBefore) {
                if (immediately) {
                    method();
                }
                Laya.timer.frameLoop(delay1, caller, () => {
                    let delay = Tools.randomNumber(delay1, delay2);
                    Laya.timer.frameOnce(delay, this, () => {
                        method();
                    });
                }, args, coverBefore);
            }
            TimerAdmin.frameRandomLoop = frameRandomLoop;
            function loop(delay, caller, method, immediately, args, coverBefore) {
                if (immediately) {
                    method();
                }
                Laya.timer.loop(delay, caller, () => {
                    method();
                }, args, coverBefore);
            }
            TimerAdmin.loop = loop;
            function randomLoop(delay1, delay2, caller, method, immediately, args, coverBefore) {
                if (immediately) {
                    method();
                }
                Laya.timer.loop(delay1, caller, () => {
                    let delay = Tools.randomNumber(delay1, delay2);
                    Laya.timer.frameOnce(delay, this, () => {
                        method();
                    });
                }, args, coverBefore);
            }
            TimerAdmin.randomLoop = randomLoop;
        })(TimerAdmin = lwg.TimerAdmin || (lwg.TimerAdmin = {}));
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
            Admin._clickLock = {
                get switch() {
                    return Laya.stage.getChildByName('__stageClickLock__') ? true : false;
                },
                set switch(bool) {
                    if (bool) {
                        if (!Laya.stage.getChildByName('__stageClickLock__')) {
                            console.log('锁住点击！');
                            let __stageClickLock__ = new Laya.Sprite();
                            __stageClickLock__.name = '__stageClickLock__';
                            Laya.stage.addChild(__stageClickLock__);
                            __stageClickLock__.zOrder = 1000;
                            __stageClickLock__.width = Laya.stage.width;
                            __stageClickLock__.height = Laya.stage.height;
                            __stageClickLock__.pos(0, 0);
                            Click.on(Click.Type.noEffect, __stageClickLock__, this, null, null, (e) => {
                                console.log('舞台点击被锁住了！请用admin._clickLock=false解锁');
                                e.stopPropagation();
                            });
                        }
                    }
                    else {
                        if (Laya.stage.getChildByName('__stageClickLock__')) {
                            Laya.stage.getChildByName('__stageClickLock__').removeSelf();
                        }
                    }
                }
            };
            function _secneLockClick(scene) {
                _unlockPreventClick(scene);
                let __lockClick__ = new Laya.Sprite();
                scene.addChild(__lockClick__);
                __lockClick__.zOrder = 1000;
                __lockClick__.name = '__lockClick__';
                __lockClick__.width = Laya.stage.width;
                __lockClick__.height = Laya.stage.height;
                __lockClick__.pos(0, 0);
                Click.on(Click.Type.noEffect, __lockClick__, this, null, null, (e) => {
                    console.log('场景点击被锁住了！请用admin._unlockPreventClick（）解锁');
                    e.stopPropagation();
                });
            }
            Admin._secneLockClick = _secneLockClick;
            function _unlockPreventClick(scene) {
                let __lockClick__ = scene.getChildByName('__lockClick__');
                if (__lockClick__) {
                    __lockClick__.removeSelf();
                }
            }
            Admin._unlockPreventClick = _unlockPreventClick;
            Admin._sceneControl = {};
            let OpenAniType;
            (function (OpenAniType) {
                OpenAniType["fadeOut"] = "fadeOut";
                OpenAniType["leftMove"] = "fadeOut";
                OpenAniType["rightMove"] = "rightMove";
                OpenAniType["centerRotate"] = "centerRotate";
            })(OpenAniType = Admin.OpenAniType || (Admin.OpenAniType = {}));
            Admin._commonOpenAni = OpenAniType.fadeOut;
            Admin._commonVanishAni = false;
            let SceneName;
            (function (SceneName) {
                SceneName["UILoding"] = "UILoding";
                SceneName["UIStart"] = "UIStart";
                SceneName["UISkin"] = "UISkin";
                SceneName["UIShop"] = "UIShop";
                SceneName["UITask"] = "UITask";
                SceneName["UISet"] = "UISet";
                SceneName["UIPifu"] = "UIPifu";
                SceneName["UIPuase"] = "UIPuase";
                SceneName["UIShare"] = "UIShare";
                SceneName["GameMain3D"] = "GameMain3D";
                SceneName["UIVictory"] = "UIVictory";
                SceneName["UIDefeated"] = "UIDefeated";
                SceneName["UIPassHint"] = "UIPassHint";
                SceneName["UISkinXD"] = "UISkinXD";
                SceneName["UISkinTry"] = "UISkinTry";
                SceneName["UIRedeem"] = "UIRedeem";
                SceneName["UIAnchorXD"] = "UIAnchorXD";
                SceneName["UITurntable"] = "UITurntable";
                SceneName["UICaiDanQiang"] = "UICaiDanQiang";
                SceneName["UICaidanPifu"] = "UICaidanPifu";
                SceneName["UIOperation"] = "UIOperation";
                SceneName["UIVictoryBox"] = "UIVictoryBox";
                SceneName["UICheckIn"] = "UICheckIn";
                SceneName["UIResurgence"] = "UIResurgence";
                SceneName["UIEasterEgg"] = "UIEasterEgg";
                SceneName["UIAdsHint"] = "UIAdsHint";
                SceneName["LwgInit"] = "LwgInit";
                SceneName["GameScene"] = "GameScene";
                SceneName["UISmallHint"] = "UISmallHint";
                SceneName["UIExecutionHint"] = "UIExecutionHint";
                SceneName["UIDrawCard"] = "UIDrawCard";
                SceneName["UIPropTry"] = "UIPropTry";
            })(SceneName = Admin.SceneName || (Admin.SceneName = {}));
            function _openScene(openName, cloesScene, func, zOder) {
                Laya.Scene.load('Scene/' + openName + '.json', Laya.Handler.create(this, function (scene) {
                    scene.width = Laya.stage.width;
                    scene.height = Laya.stage.height;
                    var openf = () => {
                        if (zOder) {
                            Laya.stage.addChildAt(scene, zOder);
                        }
                        else {
                            Laya.stage.addChild(scene);
                        }
                    };
                    scene.name = openName;
                    Admin._sceneControl[openName] = scene;
                    let background = scene.getChildByName('Background');
                    if (background) {
                        background.width = Laya.stage.width;
                        background.height = Laya.stage.height;
                    }
                    if (cloesScene) {
                        _closeScene(cloesScene, openf);
                    }
                    else {
                        openf();
                    }
                    if (func) {
                        func();
                    }
                }));
            }
            Admin._openScene = _openScene;
            function _closeScene(cloesScene, func) {
                var closef = () => {
                    Admin._clickLock.switch = false;
                    cloesScene.close();
                    if (func) {
                        func();
                    }
                };
                if (!Admin._commonVanishAni) {
                    closef();
                    return;
                }
                var vanishAni = () => {
                    let time = 0;
                    let delay = 0;
                    switch (Admin._commonOpenAni) {
                        case OpenAniType.fadeOut:
                            time = 150;
                            delay = 50;
                            if (cloesScene['Background']) {
                                Animation2D.fadeOut(cloesScene, 1, 0, time / 2);
                            }
                            Animation2D.fadeOut(cloesScene, 1, 0, time, delay, () => {
                                closef();
                            });
                            break;
                        case OpenAniType.leftMove:
                            break;
                        default:
                            break;
                    }
                };
                let cloesSceneScript = cloesScene[cloesScene.name];
                if (cloesSceneScript) {
                    if (cloesSceneScript) {
                        Admin._clickLock.switch = true;
                        let time0 = cloesSceneScript.lwgVanishAni();
                        if (time0 !== null) {
                            Laya.timer.once(time0, this, () => {
                                closef();
                                Admin._clickLock.switch = false;
                            });
                        }
                        else {
                            vanishAni();
                        }
                    }
                }
                else {
                    console.log('界面关闭失败，可能是脚本名称与场景名称不一样');
                }
            }
            Admin._closeScene = _closeScene;
            let GameState;
            (function (GameState) {
                GameState["Start"] = "Start";
                GameState["Play"] = "Play";
                GameState["Pause"] = "pause";
                GameState["Victory"] = "victory";
                GameState["Defeated"] = "defeated";
            })(GameState = Admin.GameState || (Admin.GameState = {}));
            function gameState(calssName) {
                switch (calssName) {
                    case SceneName.UIStart:
                        Admin._gameState = GameState.Start;
                        break;
                    case SceneName.GameScene:
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
            Admin.gameState = gameState;
            function commonOpenAni(scene) {
                let time = 0;
                let delay = 0;
                switch (Admin._commonOpenAni) {
                    case OpenAniType.fadeOut:
                        time = 400;
                        delay = 300;
                        if (scene['Background']) {
                            Animation2D.fadeOut(scene, 0, 1, time / 2, delay);
                        }
                        Animation2D.fadeOut(scene, 0, 1, time);
                        break;
                    case OpenAniType.leftMove:
                        break;
                    default:
                        break;
                }
                return time;
            }
            Admin.commonOpenAni = commonOpenAni;
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
                    gameState(this.calssName);
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
                ;
                lwgNodeDec() { }
                ;
                lwgEventReg() { }
                ;
                moduleEventReg() { }
                ;
                lwgOnEnable() { }
                btnAndlwgOpenAni() {
                    let time = this.lwgOpenAni();
                    if (!time) {
                        time = commonOpenAni(this.self);
                        time = 0;
                    }
                    Laya.timer.once(time, this, f => {
                        this.lwgBtnClick();
                    });
                }
                lwgOpenAni() { return null; }
                ;
                lwgBtnClick() { }
                ;
                lwgAdaptive() { }
                ;
                onUpdate() { this.lwgOnUpdate(); }
                ;
                lwgOnUpdate() { }
                ;
                lwgVanishAni() { return null; }
                ;
                onDisable() {
                    Animation2D.fadeOut(this.self, 1, 0, 2000, 1);
                    this.lwgOnDisable();
                    Laya.timer.clearAll(this);
                    Laya.Tween.clearAll(this);
                    EventAdmin.offCaller(this);
                }
                lwgOnDisable() { }
                ;
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
                    this.lwgOnAwake();
                }
                lwgNodeDec() { }
                lwgOnAwake() { }
                onEnable() {
                    this.lwgBtnClick();
                    this.lwgEventReg();
                    this.lwgOnEnable();
                }
                lwgOnEnable() { }
                lwgBtnClick() { }
                lwgEventReg() { }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() { }
                onDisable() {
                    this.lwgOnDisable();
                    Laya.timer.clearAll(this);
                    EventAdmin.offCaller(this);
                }
                lwgOnDisable() { }
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
                SkinUrl[SkinUrl["Frame/Effects/ui_Circular_l_yellow.png"] = 24] = "Frame/Effects/ui_Circular_l_yellow.png";
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
                    this.self.x += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.point_SpeedXYByAngle(angle, speed + this.accelerated).y;
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
            function light_Infinite(parent, caller, x, y, width, height, zOder, url, speed, count) {
                let img = new Laya.Image();
                parent.addChild(img);
                img.pos(x, y);
                img.width = width;
                img.height = height;
                img.pivotX = width / 2;
                img.pivotY = height / 2;
                url ? img.skin = url : img.skin = SkinUrl[24];
                img.alpha = 0;
                img.zOrder = zOder;
                let add = true;
                let count0 = 0;
                let func = () => {
                    if (count && count0 > count && img.alpha <= 0.01) {
                        img.removeSelf();
                        Laya.timer.clear(caller, func);
                        return;
                    }
                    if (!add) {
                        img.alpha -= speed ? speed : 0.01;
                        if (img.alpha <= 0) {
                            add = true;
                            count0 += 0.5;
                        }
                    }
                    else {
                        img.alpha += speed ? speed * 2 : 0.01 * 2;
                        if (img.alpha >= 1) {
                            add = false;
                            count0 += 0.5;
                        }
                    }
                };
                Laya.timer.frameLoop(1, caller, func);
            }
            Effects.light_Infinite = light_Infinite;
            function star_Blink(parent, centerPos, radiusX, radiusY, skinUrl, width, height, rotationSpeed) {
                if (!rotationSpeed) {
                    rotationSpeed = Tools.randomOneHalf() == 0 ? -5 : 5;
                }
                let star = Laya.Pool.getItemByClass('star_Blink', Laya.Image);
                star.name = 'star_Blink';
                let num;
                if (skinUrl == SkinStyle.star || !skinUrl) {
                    num = 12 + Math.floor(Math.random() * 12);
                    star.skin = SkinUrl[num];
                }
                else if (skinUrl == SkinStyle.dot) {
                    num = Math.floor(Math.random() * 12);
                    star.skin = SkinUrl[num];
                }
                else {
                    star.skin = skinUrl;
                }
                star.alpha = 0;
                star.width = width;
                star.height = height;
                star.scaleX = 0;
                star.scaleY = 0;
                star.pivotX = star.width / 2;
                star.pivotY = star.height / 2;
                parent.addChild(star);
                let p = Tools.point_RandomPointByCenter(centerPos, radiusX, radiusY, 1);
                star.pos(p[0].x, p[0].y);
                let maxScale = Tools.randomCountNumer(0.8, 1.2)[0];
                let timer = 0;
                let caller = {};
                var ani = () => {
                    timer++;
                    if (timer > 0 && timer <= 15) {
                        star.alpha += 0.1;
                        star.rotation += rotationSpeed;
                        star.scaleX += 0.015;
                        star.scaleY += 0.015;
                    }
                    else if (timer > 15) {
                        if (!star['reduce']) {
                            if (star.scaleX > maxScale) {
                                star['reduce'] = true;
                            }
                            else {
                                star.rotation += rotationSpeed;
                                star.scaleX += 0.02;
                                star.scaleY += 0.02;
                            }
                        }
                        else {
                            star.rotation -= rotationSpeed;
                            star.alpha -= 0.015;
                            star.scaleX -= 0.01;
                            star.scaleY -= 0.01;
                            if (star.scaleX <= 0) {
                                star.removeSelf();
                                Laya.timer.clearAll(caller);
                            }
                        }
                    }
                };
                Laya.timer.frameLoop(1, caller, ani);
            }
            Effects.star_Blink = star_Blink;
            function createCommonExplosion(parent, quantity, x, y, style, speed, continueTime) {
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
            function createButton() {
                let Btn = new Laya.Sprite();
                let img = new Laya.Image();
                let label = new Laya.Label();
            }
            Click.createButton = createButton;
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
            Animation3D.frameRate = 1;
            function moveTo(target, toPos, duration, caller, ease, complete, delay = 0, coverBefore = true, update, frame) {
                let position = target.transform.position.clone();
                if (duration == 0 || duration === undefined || duration === null) {
                    target.transform.position = toPos.clone();
                    complete && complete.apply(caller);
                    return;
                }
                if (frame <= 0 || frame === undefined || frame === null) {
                    frame = Animation3D.frameRate;
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
            Animation3D.moveTo = moveTo;
            function rotateTo(target, toRotation, duration, caller, ease, complete, delay, coverBefore, update, frame) {
                let rotation = target.transform.localRotationEuler.clone();
                if (duration == 0 || duration === undefined || duration === null) {
                    target.transform.localRotationEuler = toRotation.clone();
                    complete && complete.apply(caller);
                    return;
                }
                if (frame <= 0 || frame === undefined || frame === null) {
                    frame = Animation3D.frameRate;
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
            Animation3D.rotateTo = rotateTo;
            function scaleTo(target, toScale, duration, caller, ease, complete, delay, coverBefore, update, frame) {
                let localScale = target.transform.localScale.clone();
                if (duration == 0 || duration === undefined || duration === null) {
                    target.transform.localScale = toScale.clone();
                    complete && complete.apply(caller);
                    return;
                }
                if (frame <= 0 || frame === undefined || frame === null) {
                    frame = Animation3D.frameRate;
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
            Animation3D.scaleTo = scaleTo;
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
            function rock(target, range, duration, caller, func, delayed, ease) {
                if (!delayed) {
                    delayed = 0;
                }
                let v1 = new Laya.Vector3(target.transform.localRotationEulerX + range.x, target.transform.localRotationEulerY + range.y, target.transform.localRotationEulerZ + range.z);
                rotateTo(target, v1, duration / 2, caller, ease, () => {
                    let v2 = new Laya.Vector3(target.transform.localRotationEulerX - range.x * 2, target.transform.localRotationEulerY - range.y * 2, target.transform.localRotationEulerZ - range.z * 2);
                    rotateTo(target, v2, duration, caller, ease, () => {
                        let v3 = new Laya.Vector3(target.transform.localRotationEulerX + range.x, target.transform.localRotationEulerY + range.y, target.transform.localRotationEulerZ + range.z);
                        rotateTo(target, v3, duration / 2, caller, ease, () => {
                            if (func) {
                                func();
                            }
                        });
                    });
                }, delayed);
            }
            Animation3D.rock = rock;
            function moveRotateTo(Sp3d, Target, duration, caller, ease, complete, delay, coverBefore, update, frame) {
                moveTo(Sp3d, Target.transform.position, duration, caller, ease, complete, delay, coverBefore, update, frame);
                rotateTo(Sp3d, Target.transform.localRotationEuler, duration, caller, ease, null, delay, coverBefore, null, frame);
            }
            Animation3D.moveRotateTo = moveRotateTo;
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
            function leftRight_Shake(node, range, time, delayed, func, click) {
                if (!delayed) {
                    delayed = 0;
                }
                if (!click) {
                    Admin._clickLock.switch = true;
                }
                Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                            if (func) {
                                func();
                            }
                            if (!click) {
                                Admin._clickLock.switch = false;
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
            function fadeOut(node, alpha1, alpha2, time, delayed, func, stageClick) {
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
                }), delayed ? delayed : 0);
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
            function cardRotateX_TowFace(node, time, func1, delayed, func2) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    Tools.node_2DChildrenVisible(node, false);
                    if (func1) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleX: 1 }, time * 0.9, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 0 }, time * 0.8, null, Laya.Handler.create(this, function () {
                            Tools.node_2DChildrenVisible(node, true);
                            Laya.Tween.to(node, { scaleX: 1 }, time * 0.7, null, Laya.Handler.create(this, function () {
                                if (func2) {
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
            function cardRotateY_TowFace(node, time, func1, delayed, func2) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    Tools.node_2DChildrenVisible(node, false);
                    if (func1) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleY: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                                Tools.node_2DChildrenVisible(node, true);
                                if (func2) {
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
                    if (func1) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        if (func2) {
                            func2();
                        }
                    }), 0);
                }), delayed ? delayed : 0);
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
            function bomb_LeftRight(node, MaxScale, time, func, delayed) {
                Laya.Tween.to(node, { scaleX: MaxScale }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 0.85 }, time * 0.5, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: MaxScale * 0.9 }, time * 0.55, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: 0.95 }, time * 0.6, null, Laya.Handler.create(this, function () {
                                Laya.Tween.to(node, { scaleX: 1 }, time * 0.65, null, Laya.Handler.create(this, function () {
                                    if (func)
                                        func();
                                }), 0);
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.bomb_LeftRight = bomb_LeftRight;
            function bombs_Appear(node, firstAlpha, endScale, scale1, rotation1, time1, time2, delayed, func) {
                node.scale(0, 0);
                node.alpha = firstAlpha;
                Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, rotation: rotation1 }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: endScale, scaleY: endScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: endScale + (scale1 - endScale) * 0.2, scaleY: endScale + (scale1 - endScale) * 0.2, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: endScale, scaleY: endScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                                if (func) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed ? delayed : 0);
            }
            Animation2D.bombs_Appear = bombs_Appear;
            function bombs_AppearAllChild(node, firstAlpha, endScale, scale1, rotation1, time1, time2, interval, func, audioType) {
                let de1 = 0;
                if (!interval) {
                    interval = 100;
                }
                for (let index = 0; index < node.numChildren; index++) {
                    let Child = node.getChildAt(index);
                    Child.alpha = 0;
                    Laya.timer.once(de1, this, () => {
                        Child.alpha = 1;
                        if (index !== node.numChildren - 1) ;
                        bombs_Appear(Child, firstAlpha, endScale, scale1, rotation1, time1, time2, null, func);
                    });
                    de1 += interval;
                }
            }
            Animation2D.bombs_AppearAllChild = bombs_AppearAllChild;
            function bombs_VanishAllChild(node, endScale, alpha, rotation, time, interval, func) {
                let de1 = 0;
                if (!interval) {
                    interval = 100;
                }
                for (let index = 0; index < node.numChildren; index++) {
                    let Child = node.getChildAt(index);
                    Laya.timer.once(de1, this, () => {
                        if (index !== node.numChildren - 1) ;
                        bombs_Vanish(node, endScale, alpha, rotation, time, 0, func);
                    });
                    de1 += interval;
                }
            }
            Animation2D.bombs_VanishAllChild = bombs_VanishAllChild;
            function bombs_Vanish(node, scale, alpha, rotation, time, delayed, func) {
                Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alpha: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    if (func) {
                        func();
                    }
                }), delayed ? delayed : 0);
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
                                if (func) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation2D.swell_shrink = swell_shrink;
            function move_Simple(node, fX, fY, targetX, targetY, time, delayed, func, ease) {
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
                target.alpha = minAlpha;
                if (!delayed) {
                    delayed = 0;
                }
                Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                        if (func) {
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
                                if (func) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed ? delayed : 0);
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
            function scale_Alpha(target, fAlpha, fScaleX, fScaleY, eScaleX, eScaleY, eAlpha, time, delayed, func, ease) {
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
                    Animation2D.scale_Alpha(Setting.BtnSetNode, 0, 1, 1, 1, 1, 1, delayed, 0, f => {
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
                    Animation2D.scale_Alpha(Setting.BtnSetNode, 1, 1, 1, 1, 1, 0, delayed, 0, f => {
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
            function format_FormatNumber(number) {
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
            Tools.format_FormatNumber = format_FormatNumber;
            function format_StrAddNum(str, num) {
                return (Number(str) + num).toString();
            }
            Tools.format_StrAddNum = format_StrAddNum;
            function format_NumAddStr(num, str) {
                return Number(str) + num;
            }
            Tools.format_NumAddStr = format_NumAddStr;
            function node_RandomChildren(node, num) {
                let childArr = [];
                let indexArr = [];
                for (let i = 0; i < node.numChildren; i++) {
                    indexArr.push(i);
                }
                let randomIndex = Tools.arrayRandomGetOut(indexArr, num);
                for (let j = 0; j < randomIndex.length; j++) {
                    childArr.push(node.getChildAt(randomIndex[j]));
                }
                return childArr;
            }
            Tools.node_RandomChildren = node_RandomChildren;
            function node_RemoveAllChildren(node) {
                if (node.numChildren > 0) {
                    node.removeChildren(0, node.numChildren - 1);
                }
            }
            Tools.node_RemoveAllChildren = node_RemoveAllChildren;
            function node_2DShowExcludedChild(node, childNameArr, bool) {
                for (let i = 0; i < node.numChildren; i++) {
                    let Child = node.getChildAt(i);
                    for (let j = 0; j < childNameArr.length; j++) {
                        if (Child.name == childNameArr[j]) {
                            if (bool) {
                                Child.visible = true;
                            }
                            else {
                                Child.visible = false;
                            }
                        }
                        else {
                            if (bool) {
                                Child.visible = false;
                            }
                            else {
                                Child.visible = true;
                            }
                        }
                    }
                }
            }
            Tools.node_2DShowExcludedChild = node_2DShowExcludedChild;
            function node_3DShowExcludedChild(node, childNameArr, bool) {
                for (let i = 0; i < node.numChildren; i++) {
                    let Child = node.getChildAt(i);
                    for (let j = 0; j < childNameArr.length; j++) {
                        if (Child.name == childNameArr[j]) {
                            if (bool) {
                                Child.active = true;
                            }
                            else {
                                Child.active = false;
                            }
                        }
                        else {
                            if (bool) {
                                Child.active = false;
                            }
                            else {
                                Child.active = true;
                            }
                        }
                    }
                }
            }
            Tools.node_3DShowExcludedChild = node_3DShowExcludedChild;
            function node_2DChildrenVisible(node, bool) {
                for (let index = 0; index < node.numChildren; index++) {
                    const element = node.getChildAt(index);
                    if (bool) {
                        element.visible = true;
                    }
                    else {
                        element.visible = false;
                    }
                }
            }
            Tools.node_2DChildrenVisible = node_2DChildrenVisible;
            function node_3DChildrenVisible(node, bool) {
                for (let index = 0; index < node.numChildren; index++) {
                    const element = node.getChildAt(index);
                    if (bool) {
                        element.active = true;
                    }
                    else {
                        element.active = false;
                    }
                }
            }
            Tools.node_3DChildrenVisible = node_3DChildrenVisible;
            function node_3dFindChild(parent, name) {
                var item = null;
                item = parent.getChildByName(name);
                if (item != null)
                    return item;
                var go = null;
                for (var i = 0; i < parent.numChildren; i++) {
                    go = node_3dFindChild(parent.getChildAt(i), name);
                    if (go != null)
                        return go;
                }
                return null;
            }
            Tools.node_3dFindChild = node_3dFindChild;
            function node_2dFindChild(parent, name) {
                var item = null;
                item = parent.getChildByName(name);
                if (item != null)
                    return item;
                var go = null;
                for (var i = 0; i < parent.numChildren; i++) {
                    go = node_2dFindChild(parent.getChildAt(i), name);
                    if (go != null)
                        return go;
                }
                return null;
            }
            Tools.node_2dFindChild = node_2dFindChild;
            function randomOneHalf() {
                let number;
                number = Math.floor(Math.random() * 2);
                return number;
            }
            Tools.randomOneHalf = randomOneHalf;
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
            function color_ToHexString(r, g, b) {
                return '#' + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
            }
            Tools.color_ToHexString = color_ToHexString;
            function color_Filter(node, arr, vanishtime) {
                let cf = new Laya.ColorFilter();
                cf.color(255, 0, 0, 1);
                node.filters = [cf];
                if (vanishtime) {
                    Laya.timer.once(vanishtime, this, () => {
                        for (let index = 0; index < node.filters.length; index++) {
                            if (node.filters[index] == cf) {
                                node.filters = [];
                                break;
                            }
                        }
                    });
                }
            }
            Tools.color_Filter = color_Filter;
            function d2_dotRotateXY(x0, y0, x1, y1, angle) {
                let x2 = x0 + (x1 - x0) * Math.cos(angle * Math.PI / 180) - (y1 - y0) * Math.sin(angle * Math.PI / 180);
                let y2 = y0 + (x1 - x0) * Math.sin(angle * Math.PI / 180) + (y1 - y0) * Math.cos(angle * Math.PI / 180);
                return new Laya.Point(x2, y2);
            }
            Tools.d2_dotRotateXY = d2_dotRotateXY;
            function d2_twoObjectsLen(obj1, obj2) {
                let point = new Laya.Point(obj1.x, obj1.y);
                let len = point.distance(obj2.x, obj2.y);
                return len;
            }
            Tools.d2_twoObjectsLen = d2_twoObjectsLen;
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
            function d3_rayScanning(camera, scene3D, vector2, filtrateName) {
                let _ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
                let outs = new Array();
                camera.viewportPointToRay(vector2, _ray);
                scene3D.physicsSimulation.rayCastAll(_ray, outs);
                if (outs.length != 0 && filtrateName) {
                    let outsChaild = null;
                    for (var i = 0; i < outs.length; i++) {
                        let hitResult = outs[i].collider.owner;
                        if (hitResult.name === filtrateName) {
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
            function d3_TransitionScreenPointfor(v3, camera) {
                let ScreenV3 = new Laya.Vector3();
                camera.viewport.project(v3, camera.projectionViewMatrix, ScreenV3);
                let point = new Laya.Vector2();
                point.x = ScreenV3.x;
                point.y = ScreenV3.y;
                return point;
            }
            Tools.d3_TransitionScreenPointfor = d3_TransitionScreenPointfor;
            function d3_animatorPlay(Sp3D, aniName, normalizedTime, layerIndex) {
                let sp3DAni = Sp3D.getComponent(Laya.Animator);
                if (!sp3DAni) {
                    console.log(Sp3D.name, '没有动画组件');
                    return;
                }
                if (!layerIndex) {
                    layerIndex = 0;
                }
                sp3DAni.play(aniName, layerIndex, normalizedTime);
                return sp3DAni;
            }
            Tools.d3_animatorPlay = d3_animatorPlay;
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
            function sk_indexControl(sk, name) {
                sk.play(name, true);
                sk.player.currentTime = 15 * 1000 / sk.player.cacheFrameRate;
            }
            Tools.sk_indexControl = sk_indexControl;
            function draw_drawPieMask(parent, startAngle, endAngle) {
                parent.cacheAs = "bitmap";
                let drawPieSpt = new Laya.Sprite();
                drawPieSpt.blendMode = "destination-out";
                parent.addChild(drawPieSpt);
                let drawPie = drawPieSpt.graphics.drawPie(parent.width / 2, parent.height / 2, parent.width / 2 + 10, startAngle, endAngle, "#000000");
                return drawPie;
            }
            Tools.draw_drawPieMask = draw_drawPieMask;
            function draw_LineInScene(Scene, node, nodeForm, radius, color) {
                let length;
                Click.on(Click.Type.noEffect, node, this, (e) => {
                    if (!this.self.getChildByName('DrawSp')) {
                        length = 0;
                        let DrawSp = new Laya.Sprite();
                        Scene.addChild(DrawSp);
                        DrawSp.name = 'DrawSp';
                        DrawSp.pos(0, 0);
                        Scene['DrawSp'] = DrawSp;
                    }
                    Scene['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
                }, (e) => {
                    let Img = node;
                    let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));
                    if (new Laya.Point(e.stageX, e.stageY).distance(globalPos.x, globalPos.y) > Img.width / 2) {
                        Scene['DrawPosArr'] = null;
                        return;
                    }
                    if (Scene['DrawPosArr']) {
                        Scene['DrawSp'].graphics.drawLine(Scene['DrawPosArr'].x, Scene['DrawPosArr'].y, e.stageX, e.stageY, color, radius * 2);
                        Scene['DrawSp'].graphics.drawCircle(e.stageX, e.stageY, radius, color);
                        length += Scene['DrawPosArr'].distance(e.stageX, e.stageY);
                        Scene['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
                    }
                }, () => {
                    if (length > 3000) {
                        Scene.getChildByName('DrawSp').removeSelf();
                    }
                    Scene['DrawPosArr'] = null;
                }, () => {
                    Scene['DrawPosArr'] = null;
                });
                return length;
            }
            Tools.draw_LineInScene = draw_LineInScene;
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
            function objArr2DifferentPropertyObjArr1(objArr1, objArr2, property) {
                var result = [];
                for (var i = 0; i < objArr1.length; i++) {
                    var obj1 = objArr1[i];
                    var obj1Name = obj1[property];
                    var isExist = false;
                    for (var j = 0; j < objArr2.length; j++) {
                        var obj2 = objArr2[j];
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
            Tools.objArr2DifferentPropertyObjArr1 = objArr2DifferentPropertyObjArr1;
            function objArr1IdenticalPropertyObjArr2(data1, data2, property) {
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
            Tools.objArr1IdenticalPropertyObjArr2 = objArr1IdenticalPropertyObjArr2;
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
            function objArray_Copy(ObjArray) {
                var sourceCopy = ObjArray instanceof Array ? [] : {};
                for (var item in ObjArray) {
                    sourceCopy[item] = typeof ObjArray[item] === 'object' ? obj_Copy(ObjArray[item]) : ObjArray[item];
                }
                return sourceCopy;
            }
            Tools.objArray_Copy = objArray_Copy;
            function obj_Copy(obj) {
                var objCopy = {};
                for (const item in obj) {
                    if (obj.hasOwnProperty(item)) {
                        const element = obj[item];
                        if (typeof element === 'object') {
                            if (Array.isArray(element)) {
                                let arr1 = array_Copy(element);
                                objCopy[item] = arr1;
                            }
                            else {
                                obj_Copy(element);
                            }
                        }
                        else {
                            objCopy[item] = element;
                        }
                    }
                }
                return objCopy;
            }
            Tools.obj_Copy = obj_Copy;
            function arrayAddToarray(array1, array2) {
                for (let index = 0; index < array2.length; index++) {
                    const element = array2[index];
                    array1.push(element);
                }
                return array1;
            }
            Tools.arrayAddToarray = arrayAddToarray;
            function arrayRandomGetOut(arr, num) {
                if (!num) {
                    num = 1;
                }
                let arrCopy = Tools.array_Copy(arr);
                let arr0 = [];
                if (num > arrCopy.length) {
                    return '数组长度小于取出的数！';
                }
                else {
                    for (let index = 0; index < num; index++) {
                        let ran = Math.round(Math.random() * (arrCopy.length - 1));
                        let a1 = arrCopy[ran];
                        arrCopy.splice(ran, 1);
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
            function array1ExcludeArray2(arr1, arr2) {
                let arr1Capy = array_Copy(arr1);
                let arr2Capy = array_Copy(arr2);
                for (let i = 0; i < arr1Capy.length; i++) {
                    for (let j = 0; j < arr2Capy.length; j++) {
                        if (arr1Capy[i] === arr2Capy[j]) {
                            arr1Capy.splice(i, 1);
                            i--;
                        }
                    }
                }
                return arr1Capy;
            }
            Tools.array1ExcludeArray2 = array1ExcludeArray2;
            function array_ExcludeArrays(arrays, exclude) {
                let arr0 = [];
                for (let i = 0; i < arrays.length; i++) {
                    for (let j = 0; j < arrays[i].length; j++) {
                        arr0.push(arrays[i][j]);
                    }
                }
                let arr1 = Tools.array_Copy(arr0);
                let arr2 = Tools.arrayUnique_01(arr1);
                let arrNum = [];
                for (let k = 0; k < arr2.length; k++) {
                    arrNum.push({
                        index: arr2[k],
                        num: 0,
                    });
                }
                for (let l = 0; l < arr0.length; l++) {
                    for (let m = 0; m < arrNum.length; m++) {
                        if (arr0[l] == arrNum[m]['index']) {
                            arrNum[m]['num']++;
                        }
                    }
                }
                let arrAllHave = [];
                let arrDiffHave = [];
                for (let n = 0; n < arrNum.length; n++) {
                    if (arrNum[n]['num'] == 4) {
                        arrAllHave.push(arrNum[n]['index']);
                    }
                    else {
                        arrDiffHave.push(arrNum[n]['index']);
                    }
                }
                if (!exclude) {
                    return arrAllHave;
                }
                else {
                    return arrDiffHave;
                }
            }
            Tools.array_ExcludeArrays = array_ExcludeArrays;
            function point_SpeedXYByAngle(angle, speed) {
                const speedXY = { x: 0, y: 0 };
                speedXY.x = speed * Math.cos(angle * Math.PI / 180);
                speedXY.y = speed * Math.sin(angle * Math.PI / 180);
                return new Laya.Point(speedXY.x, speedXY.y);
            }
            Tools.point_SpeedXYByAngle = point_SpeedXYByAngle;
            function point_GetRoundPos(angle, radius, centerPos) {
                var center = centerPos;
                var radius = radius;
                var hudu = (2 * Math.PI / 360) * angle;
                var X = center.x + Math.sin(hudu) * radius;
                var Y = center.y - Math.cos(hudu) * radius;
                return new Laya.Point(X, Y);
            }
            Tools.point_GetRoundPos = point_GetRoundPos;
            function point_RandomPointByCenter(centerPos, radiusX, radiusY, count) {
                if (!count) {
                    count = 1;
                }
                let arr = [];
                for (let index = 0; index < count; index++) {
                    let x0 = Tools.randomCountNumer(0, radiusX, 1, false);
                    let y0 = Tools.randomCountNumer(0, radiusY, 1, false);
                    let diffX = Tools.randomOneHalf() == 0 ? x0[0] : -x0[0];
                    let diffY = Tools.randomOneHalf() == 0 ? y0[0] : -y0[0];
                    let p = new Laya.Point(centerPos.x + diffX, centerPos.y + diffY);
                    arr.push(p);
                }
                return arr;
            }
            Tools.point_RandomPointByCenter = point_RandomPointByCenter;
            function angle_GetRad(angle) {
                return angle / 180 * Math.PI;
            }
            Tools.angle_GetRad = angle_GetRad;
            function jsonCompare(url, storageName, propertyName) {
                let dataArr;
                if (Laya.LocalStorage.getJSON(storageName)) {
                    dataArr = JSON.parse(Laya.LocalStorage.getJSON(storageName))[storageName];
                    console.log(storageName + '从本地缓存中获取到数据,将和文件夹的json文件进行对比');
                    try {
                        let dataArr_0 = Laya.loader.getRes(url)['RECORDS'];
                        if (dataArr_0.length >= dataArr.length) {
                            let diffArray = Tools.objArr2DifferentPropertyObjArr1(dataArr_0, dataArr, propertyName);
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
            VictoryBox._canOpenNum = 3;
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
                    VictoryBox._BoxList = this.self['MyList'];
                    VictoryBox._BoxArray = Tools.objArray_Copy(Laya.loader.getRes("GameData/VictoryBox/VictoryBox.json")['RECORDS']);
                    VictoryBox._selectBox = null;
                    VictoryBox._canOpenNum = 3;
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
            CheckIn._todayCheckIn = {
                get bool() {
                    return CheckIn._lastCheckDate.date == DateAdmin._date.date ? true : false;
                },
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
                if (!CheckIn._todayCheckIn.bool) {
                    console.log('没有签到过，弹出签到页面！');
                    Admin._openScene(Admin.SceneName.UICheckIn);
                }
                else {
                    console.log('签到过了，今日不可以再签到');
                }
            }
            CheckIn.openCheckIn = openCheckIn;
            function todayCheckIn_7Days() {
                CheckIn._lastCheckDate.date = DateAdmin._date.date;
                CheckIn._checkInNum.number++;
                setProperty(CheckClass.chek_7Days, 'day' + CheckIn._checkInNum.number, CheckProPerty.checkInState, true);
                let rewardNum = getProperty('day' + CheckIn._checkInNum.number, CheckProPerty.rewardNum);
                return rewardNum;
            }
            CheckIn.todayCheckIn_7Days = todayCheckIn_7Days;
            function init() {
                if (CheckIn._checkInNum.number === 7 && !CheckIn._todayCheckIn.bool) {
                    CheckIn._checkInNum.number = 0;
                    Laya.LocalStorage.removeItem(CheckClass.chek_7Days);
                }
            }
            CheckIn.init = init;
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
                moduleEventReg() {
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
        let SkinQualified;
        (function (SkinQualified) {
            SkinQualified._adsNum = {
                get value() {
                    return Laya.LocalStorage.getItem('XDSKin_adsNum') ? Number(Laya.LocalStorage.getItem('XDSKin_adsNum')) : 0;
                },
                set value(value) {
                    Laya.LocalStorage.setItem('XDSKin_adsNum', value.toString());
                }
            };
            function openXDSkin(fromScene) {
                if (SkinQualified._adsNum.value >= SkinQualified._needAdsNum) {
                    return;
                }
                else {
                    Admin._openScene(Admin.SceneName.UISkinXD);
                    SkinQualified._fromScene = fromScene;
                }
            }
            SkinQualified.openXDSkin = openXDSkin;
            let EventType;
            (function (EventType) {
                EventType["acquisition"] = "acquisition";
            })(EventType = SkinQualified.EventType || (SkinQualified.EventType = {}));
            class SkinQualifiedScene extends Admin.Scene {
                moduleOnEnable() {
                    SkinQualified._needAdsNum = 3;
                }
            }
            SkinQualified.SkinQualifiedScene = SkinQualifiedScene;
        })(SkinQualified = lwg.SkinQualified || (lwg.SkinQualified = {}));
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
        let Victory;
        (function (Victory) {
            class VictoryScene extends Admin.Scene {
                moduleOnAwake() {
                }
                ;
                moduleEventReg() {
                }
                ;
                moduleOnEnable() {
                }
                ;
            }
            Victory.VictoryScene = VictoryScene;
        })(Victory = lwg.Victory || (lwg.Victory = {}));
        let Defeated;
        (function (Defeated) {
            class DefeatedScene extends Admin.Scene {
                moduleOnAwake() {
                }
                ;
                moduleEventReg() {
                }
                ;
                moduleOnEnable() {
                }
                ;
            }
            Defeated.DefeatedScene = DefeatedScene;
        })(Defeated = lwg.Defeated || (lwg.Defeated = {}));
        let DrawCard;
        (function (DrawCard) {
            DrawCard._freeAds = {
                get num() {
                    return Laya.LocalStorage.getItem('DrawCard_freeAdsNum') ? Number(Laya.LocalStorage.getItem('DrawCard_freeAdsNum')) : 0;
                },
                set num(val) {
                    Laya.LocalStorage.setItem('DrawCard_freeAdsNum', val.toString());
                }
            };
            DrawCard._residueDraw = {
                get num() {
                    return Laya.LocalStorage.getItem('DrawCard_residueDraw') ? Number(Laya.LocalStorage.getItem('DrawCard_residueDraw')) : 2;
                },
                set num(val) {
                    Laya.LocalStorage.setItem('DrawCard_residueDraw', val.toString());
                }
            };
            class DrawCardScene extends Admin.Scene {
                moduleOnAwake() {
                }
                ;
                moduleEventReg() {
                }
                ;
                moduleOnEnable() {
                }
                ;
            }
            DrawCard.DrawCardScene = DrawCardScene;
        })(DrawCard = lwg.DrawCard || (lwg.DrawCard = {}));
        let Share;
        (function (Share) {
            Share._fromWhich = Admin.SceneName.UIVictory;
            class ShareScene extends Admin.Scene {
                moduleOnAwake() {
                }
                ;
                moduleEventReg() {
                }
                ;
                moduleOnEnable() {
                }
                ;
            }
            Share.ShareScene = ShareScene;
        })(Share = lwg.Share || (lwg.Share = {}));
        let PropTry;
        (function (PropTry) {
            class PropTryScene extends Admin.Scene {
                moduleOnAwake() {
                }
                ;
                moduleEventReg() {
                }
                ;
                moduleOnEnable() {
                }
                ;
            }
            PropTry.PropTryScene = PropTryScene;
        })(PropTry = lwg.PropTry || (lwg.PropTry = {}));
        let Backpack;
        (function (Backpack) {
            Backpack._prop1 = {
                get num() {
                    return Laya.LocalStorage.getItem('Backpack_prop1') ? Number(Laya.LocalStorage.getItem('Backpack_prop1')) : 1;
                },
                set num(val) {
                    Laya.LocalStorage.setItem('Backpack_prop1', val.toString());
                }
            };
            Backpack._prop2 = {
                get num() {
                    return Laya.LocalStorage.getItem('Backpack_prop2') ? Number(Laya.LocalStorage.getItem('Backpack_prop2')) : 1;
                },
                set num(val) {
                    Laya.LocalStorage.setItem('Backpack_prop2', val.toString());
                }
            };
            Backpack._haveCardArray = {
                get arr() {
                    return Laya.LocalStorage.getJSON('Backpack_haveCardArray') ? JSON.parse(Laya.LocalStorage.getJSON('Backpack_haveCardArray')) : [];
                },
                set arr(array) {
                    Laya.LocalStorage.setJSON('Backpack_haveCardArray', JSON.stringify(array));
                },
                add(arr1) {
                    let arr0 = Backpack._haveCardArray.arr;
                    for (let index = 0; index < arr1.length; index++) {
                        arr0.push(arr1[index]);
                    }
                    let arr00 = Tools.arrayUnique_01(arr0);
                    Laya.LocalStorage.setJSON('Backpack_haveCardArray', JSON.stringify(arr00));
                    return arr00;
                },
                sub(arr1) {
                    let arr0 = Backpack._haveCardArray.arr;
                    for (let i = 0; i < arr0.length; i++) {
                        for (let j = 0; j < arr1.length; j++) {
                            if (arr0[i] == arr1[j]) {
                                arr0.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    Laya.LocalStorage.setJSON('Backpack_haveCardArray', JSON.stringify(arr0));
                    return arr0;
                }
            };
            Backpack._backpackArray = [];
            class BackpackScene extends Admin.Scene {
                moduleOnAwake() {
                }
                ;
                moduleEventReg() {
                }
                ;
                moduleOnEnable() {
                }
                ;
            }
            Backpack.BackpackScene = BackpackScene;
        })(Backpack = lwg.Backpack || (lwg.Backpack = {}));
        let Loding;
        (function (Loding) {
            Loding.list_3DScene = [];
            Loding.list_3DPrefab = [];
            Loding.list_3DMesh = [];
            Loding.lolist_3DBaseMaterial = [];
            Loding.list_3DTexture2D = [];
            Loding.list_2DPic = [];
            Loding.list_2DScene = [];
            Loding.list_2DPrefab = [];
            Loding.list_JsonData = [];
            Loding.sumProgress = 0;
            Loding.currentProgress = {
                p: 0,
                get value() {
                    return this.p;
                },
                set value(v) {
                    this.p = v;
                    if (this.p >= Loding.sumProgress) {
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
                        if (this.p === number) {
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
                    DateAdmin._loginNumber.value++;
                    console.log('玩家登陆的天数为：', DateAdmin._loginDate.value.length, '天');
                }
                moduleEventReg() {
                    EventAdmin.reg(LodingType.loding, this, () => { this.lodingRule(); });
                    EventAdmin.reg(LodingType.complete, this, () => {
                        let time = this.lodingComplete();
                        PalyAudio.playMusic();
                        Laya.timer.once(time, this, () => { Admin._openScene(Admin.SceneName.LwgInit, this.self); });
                    });
                    EventAdmin.reg(LodingType.progress, this, (skip) => {
                        Loding.currentProgress.value++;
                        if (Loding.currentProgress.value < Loding.sumProgress) {
                            console.log('当前进度条进度为:', Loding.currentProgress.value / Loding.sumProgress);
                            this.lodingPhaseComplete();
                        }
                    });
                }
                moduleOnEnable() {
                    Loding.loadOrder = [Loding.list_2DPic, Loding.list_2DScene, Loding.list_2DPrefab, Loding.list_3DScene, Loding.list_3DPrefab, Loding.list_JsonData];
                    for (let index = 0; index < Loding.loadOrder.length; index++) {
                        Loding.sumProgress += Loding.loadOrder[index].length;
                        if (Loding.loadOrder[index].length <= 0) {
                            Loding.loadOrder.splice(index, 1);
                            index--;
                        }
                    }
                    Loding.loadOrderIndex = 0;
                    let time = this.lwgOpenAni();
                    if (time == null) {
                        time = 0;
                    }
                    Laya.timer.once(time, this, () => {
                        EventAdmin.notify(Loding.LodingType.loding);
                    });
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
                        case Loding.list_2DPic:
                            Laya.loader.load(Loding.list_2DPic[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX2D资源' + Loding.list_2DPic[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('2D图片' + Loding.list_2DPic[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.list_2DScene:
                            Laya.loader.load(Loding.list_2DScene[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX数据表' + Loding.list_2DScene[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('2D场景' + Loding.list_2DScene[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }), null, Laya.Loader.JSON);
                            break;
                        case Loding.list_2DPrefab:
                            Laya.loader.load(Loding.list_2DPrefab[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX数据表' + Loding.list_2DPrefab[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('2D预制体' + Loding.list_2DPrefab[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }), null, Laya.Loader.JSON);
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
                                    console.log('3D预制体' + Loding.list_3DPrefab[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.list_JsonData:
                            Laya.loader.load(Loding.list_JsonData[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX数据表' + Loding.list_JsonData[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('数据表' + Loding.list_JsonData[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }), null, Laya.Loader.JSON);
                            break;
                        default:
                            break;
                    }
                }
                lodingPhaseComplete() { }
                lodingComplete() { return 0; }
                ;
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
    let DateAdmin = lwg.DateAdmin;
    let TimerAdmin = lwg.TimerAdmin;
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
    let SkinQualified = lwg.SkinQualified;
    let SkinXDScene = lwg.SkinQualified.SkinQualifiedScene;
    let Skin = lwg.Skin;
    let SkinScene = lwg.Skin.SkinScene;
    let EasterEgg = lwg.EasterEgg;
    let Start = lwg.Start;
    let StartScene = lwg.Start.StartScene;
    let Victory = lwg.Victory;
    let VictoryScene = lwg.Victory.VictoryScene;
    let Defeated = lwg.Defeated;
    let DefeatedScene = lwg.Defeated.DefeatedScene;
    let DrawCard = lwg.DrawCard;
    let DrawCardScene = lwg.DrawCard.DrawCardScene;
    let Share = lwg.Share;
    let ShareScene = lwg.Share.ShareScene;
    let PropTry = lwg.PropTry;
    let PropTryScene = lwg.PropTry.PropTryScene;
    let Backpack = lwg.Backpack;
    let BackpackScene = lwg.Backpack.BackpackScene;
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
        Game3D.questionArr = [];
        Game3D.featureData = [];
        Game3D.CardData = [];
        let WhichScard;
        (function (WhichScard) {
            WhichScard["OppositeCardParent"] = "OppositeCardParent";
            WhichScard["MyCardParent"] = "MyCardParent";
        })(WhichScard = Game3D.WhichScard || (Game3D.WhichScard = {}));
        let featureProperty;
        (function (featureProperty) {
            featureProperty["index"] = "index";
            featureProperty["describe"] = "describe";
            featureProperty["question"] = "question";
        })(featureProperty = Game3D.featureProperty || (Game3D.featureProperty = {}));
        let CardProperty;
        (function (CardProperty) {
            CardProperty["featureArr"] = "featureArr";
            CardProperty["ChName"] = "ChName";
            CardProperty["name"] = "name";
            CardProperty["fall"] = "fall";
        })(CardProperty = Game3D.CardProperty || (Game3D.CardProperty = {}));
        let WhichBoutType;
        (function (WhichBoutType) {
            WhichBoutType["me"] = "me";
            WhichBoutType["opposite"] = "opposite";
            WhichBoutType["stop"] = "stop";
        })(WhichBoutType = Game3D.WhichBoutType || (Game3D.WhichBoutType = {}));
        let EventType;
        (function (EventType) {
            EventType["judgeMeAnswer"] = "judgeMeAnswer";
            EventType["judgeOppositeAnswer"] = "judgeOppositeAnswer";
            EventType["judgeMeClickCard"] = "judgeMeClickCard";
            EventType["nextRound"] = "nextRound";
            EventType["meAnswer"] = "meAnswer";
            EventType["oppositeAnswer"] = "oppositeAnswer";
            EventType["winOrLose"] = "winOrLose";
            EventType["opening"] = "opening";
            EventType["hideOption"] = "hideOption";
            EventType["hideGuessCard"] = "hideGuessCard";
            EventType["doWell"] = "doWell";
            EventType["BtnSC"] = "BtnSC";
            EventType["BtnSX"] = "BtnSX";
        })(EventType = Game3D.EventType || (Game3D.EventType = {}));
        let RoleName;
        (function (RoleName) {
            RoleName["Girl"] = "Girl";
        })(RoleName = Game3D.RoleName || (Game3D.RoleName = {}));
        let RoleAniName;
        (function (RoleAniName) {
            RoleAniName["chaofeng"] = "chaofeng";
            RoleAniName["daiji"] = "daiji";
            RoleAniName["fouren"] = "fouren";
            RoleAniName["qupai"] = "qupai";
            RoleAniName["tiwen"] = "tiwen";
            RoleAniName["zhuhe"] = "zhuhe";
            RoleAniName["queding"] = "queding";
            RoleAniName["zhuhetingliu"] = "zhuhetingliu";
        })(RoleAniName = Game3D.RoleAniName || (Game3D.RoleAniName = {}));
        let CardAni;
        (function (CardAni) {
            CardAni["standMe"] = "standMe";
            CardAni["fallMe"] = "fallMe";
            CardAni["standOpposite"] = "standOpposite";
            CardAni["fallOpposite"] = "fallOpposite";
            CardAni["blinkMe"] = "blinkMe";
            CardAni["blinkOpposite"] = "blinkOpposite";
            CardAni["clickMe"] = "clickMe";
        })(CardAni = Game3D.CardAni || (Game3D.CardAni = {}));
        function getAllCardName() {
            let cardNameArr = [];
            for (let i = 0; i < Game3D.CardData.length; i++) {
                const element = Game3D.CardData[i];
                cardNameArr.push(element[CardProperty.name]);
            }
            return cardNameArr;
        }
        Game3D.getAllCardName = getAllCardName;
        function set16InitialCards(type) {
            let CardData1 = Tools.objArray_Copy(Game3D.CardData);
            let cardData16 = Tools.arrayRandomGetOut(CardData1, 16);
            if (type == WhichScard.MyCardParent) {
                Game3D.oppositeHandName = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1)[0][CardProperty.name];
            }
            else if (type == WhichScard.OppositeCardParent) {
                Game3D.myHandName = Tools.arrayRandomGetOut(Tools.objArray_Copy(cardData16), 1)[0][CardProperty.name];
            }
            let AllCardParent = Game3D.AllCardTem.clone();
            let startX = 0.204;
            let spacingX = 0.3055;
            let startZ = -0.26;
            for (let index = 0; index < cardData16.length; index++) {
                const Card = AllCardParent.getChildByName(cardData16[index][CardProperty.name]);
                if (type == WhichScard.MyCardParent) {
                    Game3D.MyCardParent.addChild(Card);
                    if (index % 4 == 0) {
                        startZ -= 0.45;
                    }
                    Card.transform.localPosition = new Laya.Vector3(spacingX * (index % 4) - startX, -0.1210217, startZ);
                    Tools.d3_animatorPlay(Card, CardAni.standMe);
                }
                else if (type == WhichScard.OppositeCardParent) {
                    Game3D.OppositeCardParent.addChild(Card);
                    if (index % 4 == 0) {
                        startZ += 0.45;
                    }
                    Card.transform.localPosition = new Laya.Vector3(spacingX * (index % 4) - startX, -0.1210217, startZ + 0.2);
                    Tools.d3_animatorPlay(Card, CardAni.standOpposite);
                }
                Card[CardProperty.featureArr] = cardData16[index][CardProperty.featureArr];
                Card[CardProperty.fall] = false;
            }
        }
        Game3D.set16InitialCards = set16InitialCards;
        function getFeatureWeights(CardParent) {
            let weightArr = [];
            for (let i = 0; i < Game3D.featureData.length; i++) {
                let index = Game3D.featureData[i][featureProperty.index];
                weightArr.push({
                    index: index,
                    value: 0,
                });
            }
            for (let i = 0; i < CardParent.numChildren; i++) {
                let Card = CardParent.getChildAt(i);
                if (!Card[CardProperty.fall]) {
                    const featureArr = Card[CardProperty.featureArr];
                    for (let j = 0; j < featureArr.length; j++) {
                        const featureIndex = featureArr[j];
                        weightArr[featureIndex - 1]['value']++;
                    }
                }
            }
            for (let i = 0; i < weightArr.length; i++) {
                const element = weightArr[i];
                if (element['value'] == 0) {
                    weightArr.splice(i, 1);
                    i--;
                }
            }
            Tools.objArrPropertySort(weightArr, 'value');
            return weightArr;
        }
        Game3D.getFeatureWeights = getFeatureWeights;
        function setAnswerForMe() {
            let weightArr = getFeatureWeights(Game3D.MyCardParent);
            let residueNum = getNotFallCardNameForMe().length;
            let arr = [];
            if (residueNum == 1) {
                return ['是谁？'];
            }
            else if (residueNum == 2) {
                return ['是谁？'];
            }
            else {
                let indexArr = [];
                let medianIndex = Math.floor(weightArr.length / 2);
                let index1 = weightArr[medianIndex]['index'];
                let index2 = weightArr[medianIndex + 1]['index'];
                let index3 = weightArr[medianIndex - 1]['index'];
                let randIndex = Tools.randomOneHalf() ? -2 : 2;
                let index4 = weightArr[medianIndex + randIndex]['index'];
                indexArr.push(index1, index2, index3, index4);
                for (let i = 0; i < Game3D.featureData.length; i++) {
                    for (let j = 0; j < indexArr.length; j++) {
                        if (Game3D.featureData[i][featureProperty.index] == indexArr[j]) {
                            arr.push(Game3D.featureData[i][featureProperty.question]);
                        }
                    }
                }
                return arr;
            }
        }
        Game3D.setAnswerForMe = setAnswerForMe;
        function setRefrashAnswerForMe() {
            let cardArr = getNotFallCard(Game3D.MyCardParent);
            let arr = [];
            if (cardArr.length == 1) {
                return ['是谁？'];
            }
            else if (cardArr.length == 2) {
                return ['是谁？'];
            }
            else {
                let cardArr0 = Tools.arrayRandomGetOut(cardArr, 4);
                let diffIndexArr = Tools.array_ExcludeArrays([cardArr0[0][CardProperty.featureArr], cardArr0[1][CardProperty.featureArr], cardArr0[2][CardProperty.featureArr], cardArr0[3][CardProperty.featureArr]], true);
                let diffIndexArr0 = Tools.arrayRandomGetOut(diffIndexArr, diffIndexArr.length);
                let indexArr = [diffIndexArr0[0], diffIndexArr0[1], diffIndexArr0[2], diffIndexArr0[3]];
                for (let i = 0; i < Game3D.featureData.length; i++) {
                    for (let j = 0; j < indexArr.length; j++) {
                        if (Game3D.featureData[i][featureProperty.index] == indexArr[j]) {
                            arr.push(Game3D.featureData[i][featureProperty.question]);
                        }
                    }
                }
                return arr;
            }
        }
        Game3D.setRefrashAnswerForMe = setRefrashAnswerForMe;
        function setAnswerForOpposite() {
            let arr = [];
            let question;
            let weightArr = getFeatureWeights(Game3D.OppositeCardParent);
            let residueArr = getNotFallCardNameOpposite();
            let medianIndex = Math.floor(weightArr.length / 2);
            if (residueArr.length == 1) {
                question = '是' + getChNameByName(residueArr[0]) + '吗?';
                arr = [question, true];
            }
            else if (residueArr.length == 2) {
                let redio = Tools.randomOneHalf();
                let name = getChNameByName(residueArr[redio]);
                question = '是' + name + '吗?';
                arr = [question, residueArr[redio] == Game3D.myHandName ? true : false];
            }
            else {
                let featureIndex0;
                for (let i = 0; i < Game3D.featureData.length; i++) {
                    if (Game3D.featureData[i][featureProperty.index] == weightArr[medianIndex]['index']) {
                        question = Game3D.featureData[i][featureProperty.question];
                        featureIndex0 = i;
                        arr = [question, checkAnswerForHand(question, Game3D.OppositeCardParent)];
                        break;
                    }
                }
                let cardArr0 = getCardHaveFeature(Game3D.OppositeCardParent, featureIndex0, true);
                if (residueArr.length == cardArr0.length + 1) {
                    let indexArr = getTowCardNotFeatureArr(cardArr0[0], cardArr0[1]);
                    let index0 = Tools.arrayRandomGetOut(indexArr, 1)[0];
                    let question0 = getQuestionByIndex(index0);
                    arr = [question0, checkAnswerForHand(question0, Game3D.OppositeCardParent)];
                }
            }
            return arr;
        }
        Game3D.setAnswerForOpposite = setAnswerForOpposite;
        function getTowCardNotFeatureArr(Card1, Card2) {
            let arr1 = Tools.array1ExcludeArray2(Card1[CardProperty.featureArr], Card2[CardProperty.featureArr]);
            let arr2 = Tools.array1ExcludeArray2(Card2[CardProperty.featureArr], Card1[CardProperty.featureArr]);
            let featureArr = Tools.arrayAddToarray(arr1, arr2);
            return featureArr;
        }
        Game3D.getTowCardNotFeatureArr = getTowCardNotFeatureArr;
        function getNotFallCard(CardParent) {
            let CardArr = [];
            for (let index = 0; index < CardParent.numChildren; index++) {
                let Card = Game3D.MyCardParent.getChildAt(index);
                if (!Card[CardProperty.fall]) {
                    CardArr.push(Card);
                }
            }
            return CardArr;
        }
        Game3D.getNotFallCard = getNotFallCard;
        function getNotFallCardNameForMe() {
            let arr = [];
            for (let i = 0; i < Game3D.MyCardParent.numChildren; i++) {
                let Card = Game3D.MyCardParent.getChildAt(i);
                if (!Card[CardProperty.fall]) {
                    arr.push(Card.name);
                }
            }
            return arr;
        }
        Game3D.getNotFallCardNameForMe = getNotFallCardNameForMe;
        function getNotFallCardNameOpposite() {
            let arr = [];
            for (let i = 0; i < Game3D.OppositeCardParent.numChildren; i++) {
                let Card = Game3D.OppositeCardParent.getChildAt(i);
                if (!Card[CardProperty.fall]) {
                    arr.push(Card.name);
                }
            }
            return arr;
        }
        Game3D.getNotFallCardNameOpposite = getNotFallCardNameOpposite;
        function getChNameByName(name) {
            let chName;
            for (let i = 0; i < Game3D.CardData.length; i++) {
                if (name == Game3D.CardData[i][CardProperty.name]) {
                    chName = Game3D.CardData[i][CardProperty.ChName];
                    break;
                }
            }
            return chName;
        }
        Game3D.getChNameByName = getChNameByName;
        function getNameByChName(ChName) {
            let name;
            for (let i = 0; i < Game3D.CardData.length; i++) {
                if (ChName == Game3D.CardData[i][CardProperty.ChName]) {
                    name = Game3D.CardData[i][CardProperty.name];
                    break;
                }
            }
            return name;
        }
        Game3D.getNameByChName = getNameByChName;
        function getFeatureArrByName(name) {
            let featureArr;
            for (let i = 0; i < Game3D.CardData.length; i++) {
                if (name == Game3D.CardData[i][CardProperty.name]) {
                    featureArr = Game3D.CardData[i][CardProperty.ChName];
                    break;
                }
            }
            return featureArr;
        }
        Game3D.getFeatureArrByName = getFeatureArrByName;
        function getNameArrByQuestion(question) {
            let fIndex;
            for (let i = 0; i < Game3D.featureData.length; i++) {
                if (question == Game3D.featureData[i][featureProperty.question]) {
                    fIndex = Game3D.featureData[i][featureProperty.index];
                    break;
                }
            }
            let nameArr = [];
            for (let i = 0; i < Game3D.CardData.length; i++) {
                const Card = Game3D.CardData[i];
                for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                    if (fIndex == Card[CardProperty.featureArr][j]) {
                        nameArr.push(Card[CardProperty.name]);
                        break;
                    }
                }
            }
            return nameArr;
        }
        Game3D.getNameArrByQuestion = getNameArrByQuestion;
        function getNameArrByFeature(feature) {
            let fIndex;
            for (let index = 0; index < Game3D.featureData.length; index++) {
                if (feature = Game3D.featureData[index]) {
                    fIndex = Game3D.featureData[index][featureProperty.index];
                    break;
                }
            }
            let nameArr = [];
            for (let i = 0; i < Game3D.CardData.length; i++) {
                const Card = Game3D.CardData[i];
                for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                    if (fIndex == Card[CardProperty.featureArr][j]) {
                        nameArr.push(Card[CardProperty.name]);
                        break;
                    }
                }
            }
            return nameArr;
        }
        Game3D.getNameArrByFeature = getNameArrByFeature;
        function getIndexByFeature(feature) {
            let index0;
            for (let index = 0; index < Game3D.featureData.length; index++) {
                if (feature === Game3D.featureData[index][featureProperty.describe]) {
                    index0 = index;
                    return index0;
                }
            }
        }
        Game3D.getIndexByFeature = getIndexByFeature;
        function getQuestionByIndex(featureIndex) {
            let question0;
            for (let index = 0; index < Game3D.featureData.length; index++) {
                if (featureIndex === Game3D.featureData[index][featureProperty.index]) {
                    question0 = Game3D.featureData[index][featureProperty.question];
                    return question0;
                }
            }
        }
        Game3D.getQuestionByIndex = getQuestionByIndex;
        function getCardHaveFeature(CardParent, featureIndex, excludeHandName) {
            let notfallArr;
            notfallArr = getNotFallCard(CardParent);
            let haveArr = [];
            for (let i = 0; i < notfallArr.length; i++) {
                const Card = notfallArr[i];
                for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                    if (excludeHandName) {
                        if (Card.name == Game3D.myHandName || Card.name == Game3D.oppositeHandName) {
                            console.log('排除手上的答案');
                            break;
                        }
                        else {
                            if (featureIndex == Card[CardProperty.featureArr][j]) {
                                haveArr.push(notfallArr[i]);
                                break;
                            }
                        }
                    }
                }
            }
            return haveArr;
        }
        Game3D.getCardHaveFeature = getCardHaveFeature;
        function getCardNotHaveFeature(CardParent, featureIndex, excludeHandName) {
            let notfallArr;
            notfallArr = getNotFallCard(CardParent);
            let haveArr = [];
            for (let i = 0; i < notfallArr.length; i++) {
                const Card = notfallArr[i];
                let bool;
                for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                    if (excludeHandName) {
                        if (Card.name == Game3D.myHandName || Card.name == Game3D.oppositeHandName) {
                            break;
                        }
                        else {
                            if (featureIndex == Card[CardProperty.featureArr][j]) {
                                bool = true;
                            }
                        }
                    }
                }
                if (bool) {
                    haveArr.push(notfallArr[i]);
                }
            }
            return haveArr;
        }
        Game3D.getCardNotHaveFeature = getCardNotHaveFeature;
        function checkQuestion(question, CardParent) {
            let ChaIndex;
            for (let i = 0; i < Game3D.featureData.length; i++) {
                if (question == Game3D.featureData[i][featureProperty.question]) {
                    ChaIndex = Game3D.featureData[i][featureProperty.index];
                }
            }
            let haveCardArr = [];
            let nohaveCardArr = [];
            for (let i = 0; i < CardParent.numChildren; i++) {
                let Card = CardParent.getChildAt(i);
                let have;
                if (!Card[CardProperty.fall]) {
                    for (let j = 0; j < Card[CardProperty.featureArr].length; j++) {
                        if (ChaIndex == Card[CardProperty.featureArr][j]) {
                            haveCardArr.push(Card.name);
                            have = true;
                            break;
                        }
                    }
                    if (!have) {
                        nohaveCardArr.push(Card.name);
                    }
                }
            }
            return [haveCardArr, nohaveCardArr];
        }
        Game3D.checkQuestion = checkQuestion;
        function checkAnswerForHand(question, CardParent) {
            let bool = false;
            let cardArr = checkQuestion(question, CardParent);
            let haveCardArr = cardArr[0];
            let handName;
            if (CardParent == Game3D.MyCardParent) {
                handName = Game3D.oppositeHandName;
            }
            else if (CardParent == Game3D.OppositeCardParent) {
                handName = Game3D.myHandName;
            }
            for (let index = 0; index < haveCardArr.length; index++) {
                if (haveCardArr[index] == handName) {
                    bool = true;
                }
            }
            return bool;
        }
        Game3D.checkAnswerForHand = checkAnswerForHand;
        function dataInit() {
            Game3D.featureData = Laya.loader.getRes("GameData/Game/Feature.json")['RECORDS'];
            Game3D.CardData = Laya.loader.getRes("GameData/Game/Card.json")['RECORDS'];
        }
        Game3D.dataInit = dataInit;
        class MainScene extends lwg3D.Scene3D {
            lwgOnAwake() {
                Game3D.Scene3D = this.self;
                Game3D.MainCamera = this.self.getChildByName('MainCamera');
                Game3D.OppositeRoleParent = this.self.getChildByName('OppositeRoleParent');
                Game3D.MyCardParent = this.self.getChildByName('MyCardParent');
                Game3D.OppositeCardParent = this.self.getChildByName('OppositeCardParent');
                Game3D.AllCardTem = this.self.getChildByName('AllCard');
                Game3D.PerspectiveMe = this.self.getChildByName('PerspectiveMe');
                Game3D.PerspectiveOPPosite = this.self.getChildByName('PerspectiveOPPosite');
                Game3D.PerspectiveAwait = this.self.getChildByName('PerspectiveAwait');
            }
            lwgOnEnable() {
                this.init();
            }
            lwgEventReg() {
                EventAdmin.reg(EventType.opening, this, () => {
                    Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveOPPosite, time * 3, this, null, () => {
                        Laya.timer.once(time * 2, this, () => {
                            Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.chaofeng);
                            Laya.timer.once(time * 4, this, () => {
                                Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
                                this.roundChange();
                                EventAdmin.notify(EventType.nextRound);
                            });
                        });
                    });
                });
                let time = 500;
                EventAdmin.reg(EventType.nextRound, this, () => {
                    if (Game3D.whichBout == WhichBoutType.me) {
                        Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveMe, time, this, null, () => {
                            EventAdmin.notify(EventType.meAnswer, [setAnswerForMe()]);
                        });
                    }
                    else if (Game3D.whichBout == WhichBoutType.opposite) {
                        Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveOPPosite, time, this, null, () => {
                            EventAdmin.notify(EventType.oppositeAnswer, [setAnswerForOpposite(), getChNameByName(Game3D.myHandName)]);
                        });
                    }
                });
                EventAdmin.reg(EventType.judgeMeAnswer, this, (question) => {
                    if (Game3D.whichBout !== WhichBoutType.me) {
                        return;
                    }
                    this.roundChange();
                    let matching = checkAnswerForHand(question, Game3D.MyCardParent);
                    let cardArr = checkQuestion(question, Game3D.MyCardParent);
                    Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveOPPosite, time, this, null, () => {
                        if (matching) {
                            console.log('我回答正确');
                            Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.queding);
                            Laya.timer.once(time * 4, this, () => {
                                Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
                                Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveMe, time, this, null, () => {
                                    Laya.timer.once(time * 1.5, this, () => {
                                        this.carFallAni(cardArr[1], Game3D.MyCardParent);
                                        Laya.timer.once(time * 4, this, () => {
                                            EventAdmin.notify(EventType.nextRound);
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            console.log('我回答错误');
                            Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.fouren);
                            Laya.timer.once(time * 4, this, () => {
                                Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
                                Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveMe, time, this, null, () => {
                                    Laya.timer.once(time * 1.5, this, () => {
                                        this.carFallAni(cardArr[0], Game3D.MyCardParent);
                                        Laya.timer.once(time * 4, this, () => {
                                            EventAdmin.notify(EventType.nextRound);
                                        });
                                    });
                                });
                            });
                        }
                    });
                });
                EventAdmin.reg(EventType.judgeMeClickCard, this, (Card) => {
                    if (Card[CardProperty.fall]) {
                        return;
                    }
                    if (Game3D.whichBout !== WhichBoutType.me) {
                        return;
                    }
                    if (Card.parent == Game3D.MyCardParent) {
                        Tools.d3_animatorPlay(Card, CardAni.clickMe);
                        this.roundChange();
                        if (Card.name == Game3D.oppositeHandName) {
                            Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveOPPosite, time, this, null, () => {
                                console.log('我方赢了！');
                                let ani = Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.zhuhetingliu);
                                Laya.timer.once(time * 3, this, () => {
                                    this.carFallAni([Game3D.oppositeHandName], Game3D.MyCardParent, true);
                                    Laya.timer.once(time * 4, this, () => {
                                        EventAdmin.notify(EventAdmin.EventType.victory);
                                    });
                                });
                            });
                        }
                        else {
                            Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveOPPosite, time, this, null, () => {
                                console.log('我选错了！');
                                Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.fouren);
                                Laya.timer.once(time * 4, this, () => {
                                    Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveMe, time, this, null, () => {
                                        Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
                                        Laya.timer.once(time * 1.5, this, () => {
                                            this.carFallAni([Card.name], Game3D.MyCardParent);
                                            Laya.timer.once(time * 4, this, () => {
                                                EventAdmin.notify(EventType.nextRound);
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    }
                });
                EventAdmin.reg(EventType.judgeOppositeAnswer, this, (question, bool) => {
                    if (Game3D.whichBout !== WhichBoutType.opposite) {
                        return;
                    }
                    this.roundChange();
                    let cardArr = checkQuestion(question, Game3D.OppositeCardParent);
                    let notFallLen = getNotFallCardNameOpposite().length;
                    if (bool) {
                        console.log('对方回答正确');
                        Animation3D.rock(Game3D.MainCamera, new Laya.Vector3(5, 0, 0), time, this, () => {
                            EventAdmin.notify(Game3D.EventType.hideGuessCard);
                            Laya.timer.once(time * 2.5, this, () => {
                                if (notFallLen == 2) {
                                    console.log('对方只剩下2张牌，并且回答正确了，我方输了~！');
                                    Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.chaofeng);
                                    let name = getNameByChName(question.substring(1, question.length - 2));
                                    console.log('即将倒下的牌是排除', name);
                                    Laya.timer.once(time * 3, this, () => {
                                        this.carFallAni([name], Game3D.OppositeCardParent, true);
                                        Laya.timer.once(time * 3, this, () => {
                                            EventAdmin.notify(EventAdmin.EventType.defeated);
                                        });
                                    });
                                }
                                else if (notFallLen == 1) {
                                    Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.chaofeng);
                                    Laya.timer.once(time * 3, this, () => {
                                        Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
                                        EventAdmin.notify(EventAdmin.EventType.defeated);
                                    });
                                }
                                else {
                                    Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.qupai);
                                    Laya.timer.once(time * 3, this, () => {
                                        Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
                                        this.carFallAni(cardArr[1], Game3D.OppositeCardParent);
                                        Laya.timer.once(time * 3, this, () => {
                                            EventAdmin.notify(EventType.nextRound);
                                        });
                                    });
                                }
                            });
                        });
                    }
                    else {
                        console.log('对方回答错误');
                        Animation3D.rock(Game3D.MainCamera, new Laya.Vector3(0, 5, 0), time, this, () => {
                            EventAdmin.notify(Game3D.EventType.hideGuessCard, [() => {
                                    Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.qupai);
                                }]);
                            Laya.timer.once(time * 3, this, () => {
                                console.log('对方回答错误，倒下的牌将会是：', cardArr[0]);
                                if (notFallLen == 2) {
                                    console.log('对方只剩下2张牌了，但是回答错了，我们还有一次机会~！');
                                    let name = getNameByChName(question.substring(1, question.length - 2));
                                    console.log('即将倒下的牌是', name);
                                    Laya.timer.once(time * 1, this, () => {
                                        this.carFallAni([name], Game3D.OppositeCardParent);
                                        Laya.timer.once(time * 3, this, () => {
                                            EventAdmin.notify(EventType.nextRound);
                                        });
                                    });
                                }
                                else {
                                    Laya.timer.once(time * 1, this, () => {
                                        this.carFallAni(cardArr[0], Game3D.OppositeCardParent);
                                        Laya.timer.once(time * 3, this, () => {
                                            EventAdmin.notify(EventType.nextRound);
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
                EventAdmin.reg(EventType.BtnSC, this, (question) => {
                    let matching = checkAnswerForHand(question, Game3D.MyCardParent);
                    let cardArr = checkQuestion(question, Game3D.MyCardParent);
                    if (matching) {
                        console.log('我回答正确');
                        Laya.timer.once(time * 2, this, () => {
                            this.carFallAni(cardArr[1], Game3D.MyCardParent);
                        });
                    }
                    else {
                        console.log('我回答错误');
                        Laya.timer.once(time * 2, this, () => {
                            this.carFallAni(cardArr[0], Game3D.MyCardParent);
                        });
                    }
                });
                EventAdmin.reg(EventAdmin.EventType.nextCustoms, this, () => {
                    Animation3D.moveRotateTo(Game3D.MainCamera, Game3D.PerspectiveAwait, 1500, this);
                    this.init();
                });
                EventAdmin.reg(EventAdmin.EventType.resurgence, this, () => {
                    this.init();
                });
            }
            roundChange() {
                switch (Game3D.whichBout) {
                    case WhichBoutType.stop:
                        Game3D.whichBout = WhichBoutType.me;
                        break;
                    case WhichBoutType.me:
                        EventAdmin.notify(Game3D.EventType.hideOption);
                        Game3D.whichBout = WhichBoutType.opposite;
                        break;
                    case WhichBoutType.opposite:
                        Game3D.whichBout = WhichBoutType.me;
                        break;
                    default:
                        break;
                }
            }
            carFallAni(arrName, CardParent, exclude) {
                let fallNum = 0;
                var playAni = (Card) => {
                    if (CardParent == Game3D.MyCardParent) {
                        Tools.d3_animatorPlay(Card, CardAni.blinkMe);
                        Laya.timer.once(600, this, () => {
                            Tools.d3_animatorPlay(Card, CardAni.fallMe);
                        });
                    }
                    else {
                        Tools.d3_animatorPlay(Card, CardAni.blinkOpposite);
                        Laya.timer.once(600, this, () => {
                            Tools.d3_animatorPlay(Card, CardAni.fallOpposite);
                        });
                    }
                };
                if (exclude) {
                    let nofallArr = [];
                    for (let i = 0; i < CardParent.numChildren; i++) {
                        const Card = CardParent.getChildAt(i);
                        if (!Card[CardProperty.fall]) {
                            nofallArr.push(Card.name);
                        }
                    }
                    let arr = Tools.array1ExcludeArray2(nofallArr, arrName);
                    for (let k = 0; k < arr.length; k++) {
                        fallNum++;
                        let Card = CardParent.getChildByName(arr[k]);
                        Card[CardProperty.fall] = true;
                        playAni(Card);
                    }
                }
                else {
                    for (let i = 0; i < arrName.length; i++) {
                        let Card = CardParent.getChildByName(arrName[i]);
                        if (!Card[CardProperty.fall]) {
                            fallNum++;
                            Card[CardProperty.fall] = true;
                            playAni(Card);
                        }
                    }
                }
                Laya.timer.once(400, this, () => {
                    if (fallNum >= 2) {
                        if (CardParent == Game3D.MyCardParent) {
                            EventAdmin.notify(EventType.doWell);
                        }
                    }
                });
            }
            init() {
                Admin._gameSwitch = true;
                Game3D.whichBout = WhichBoutType.stop;
                Tools.node_RemoveAllChildren(Game3D.MyCardParent);
                Tools.node_RemoveAllChildren(Game3D.OppositeCardParent);
                set16InitialCards(WhichScard.MyCardParent);
                set16InitialCards(WhichScard.OppositeCardParent);
                this.changeOpppsiteRole();
                Tools.d3_animatorPlay(Game3D.OppositeRole, RoleAniName.daiji);
            }
            changeOpppsiteRole() {
                Game3D.OppositeRole = Game3D.OppositeRoleParent.getChildByName('Girl');
                let CardMarked = Tools.node_3dFindChild(Game3D.OppositeRole, 'CardMarked');
                let Card = Game3D.MyCardParent.getChildByName(Game3D.oppositeHandName);
                let mt = Card.meshRenderer.material;
                CardMarked.meshRenderer.material = mt;
            }
        }
        Game3D.MainScene = MainScene;
    })(Game3D || (Game3D = {}));

    class GameScene extends Admin.Scene {
        lwgOnAwake() {
            Gold.goldAppear();
        }
        lwgAdaptive() {
            this.self['SceneContent'].y = Laya.stage.height * 0.792;
        }
        lwgOnEnable() {
            EventAdmin.notify(Game3D.EventType.opening);
            this.self['BtnSCNum'].text = Backpack._prop1.num;
            this.self['BtnSXNum'].text = Backpack._prop2.num;
            this.self['SceneContent'].alpha = 0;
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
                Admin._openScene(Admin.SceneName.UIStart, this.self);
                EventAdmin.notify(EventAdmin.EventType.nextCustoms);
            });
            var refreshQuestion = () => {
                Animation2D.fadeOut(this.self['OptionParent'], 1, 0, 300, 0, () => {
                    this.createQuestion(Game3D.setRefrashAnswerForMe());
                    Animation2D.fadeOut(this.self['OptionParent'], 0, 1, 300, 0);
                });
            };
            Click.on(Click.Type.largen, this.self['BtnSC'], this, null, null, () => {
                if (Backpack._prop1.num <= 0) {
                    Dialog.createHint_Middle(Dialog.HintContent["没有库存了！"]);
                    return;
                }
                let numArr = Game3D.getNotFallCard(Game3D.MyCardParent);
                if (numArr.length <= 2) {
                    Dialog.createHint_Middle(Dialog.HintContent["牌数太少，无法使用道具！"]);
                    return;
                }
                Backpack._prop1.num--;
                this.self['BtnSCNum'].text = Tools.format_StrAddNum(this.self['BtnSCNum'].text, -1);
                let arr = Tools.node_RandomChildren(this.self['OptionParent']);
                let question = arr[0].getChildByName('Content').text;
                EventAdmin.notify(Game3D.EventType.BtnSC, [question]);
                Laya.timer.once(3000, this, () => {
                    refreshQuestion();
                });
            });
            Click.on(Click.Type.largen, this.self['BtnSX'], this, null, null, () => {
                if (Backpack._prop2.num <= 0) {
                    Dialog.createHint_Middle(Dialog.HintContent["没有库存了！"]);
                    return;
                }
                let numArr = Game3D.getNotFallCard(Game3D.MyCardParent);
                if (numArr.length <= 2) {
                    Dialog.createHint_Middle(Dialog.HintContent["牌数太少，无法使用道具！"]);
                    return;
                }
                Backpack._prop2.num--;
                this.self['BtnSXNum'].text = Tools.format_StrAddNum(this.self['BtnSXNum'].text, -1);
                refreshQuestion();
            });
        }
        lwgEventReg() {
            EventAdmin.reg(Game3D.EventType.oppositeAnswer, this, (questionAndYesOrNo, cardName) => {
                Animation2D.fadeOut(this.self['SceneContent'], this.self['SceneContent'].alpha, 0, 300, 0, () => {
                    this.createOppositeQuestion(questionAndYesOrNo, cardName);
                });
            });
            EventAdmin.reg(Game3D.EventType.meAnswer, this, (questionArr) => {
                this.createQuestion(questionArr);
                Animation2D.fadeOut(this.self['SceneContent'], 0, 1, 300, 0);
            });
            EventAdmin.reg(EventAdmin.EventType.victory, this, () => {
                Admin._openScene(Admin.SceneName.UIShare, this.self, () => { Share._fromWhich = Admin.SceneName.UIVictory; });
            });
            EventAdmin.reg(EventAdmin.EventType.defeated, this, () => {
                Admin._openScene(Admin.SceneName.UIResurgence);
            });
            EventAdmin.reg(EventAdmin.EventType.resurgence, this, () => {
                Animation2D.fadeOut(this.self['SceneContent'], 1, 0.5, 500, 100);
            });
            EventAdmin.reg(Game3D.EventType.hideOption, this, () => {
                Animation2D.fadeOut(this.self['SceneContent'], 1, 0.5, 500, 100);
            });
            EventAdmin.reg(Game3D.EventType.doWell, this, () => {
                let DoWell = Laya.Pool.getItemByCreateFun('DoWell', this.DoWell.create, this.DoWell);
                Laya.stage.addChild(DoWell);
                DoWell.pos(Laya.stage.width / 2, Laya.stage.height / 2 - 150);
                Animation2D.bombs_AppearAllChild(DoWell, 0, 1, 1.1, Tools.randomOneHalf() == 0 ? 15 : -15, 200, 100, 200);
                for (let index = 0; index < 5; index++) {
                    let pointAarr = Tools.point_RandomPointByCenter(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2 - 150), 200, 100);
                    Laya.timer.once(300 * index, this, () => {
                        Effects.createExplosion_Rotate(this.self, 25, pointAarr[0].x, pointAarr[0].y, 'star', 10, 10);
                    });
                }
                Laya.timer.once(1500, this, () => {
                    Animation2D.bombs_Vanish(DoWell, 0, 1, 1.1, Tools.randomOneHalf() == 0 ? 15 : -15, 200);
                });
            });
        }
        createQuestion(questionArr) {
            Tools.node_RemoveAllChildren(this.self['OptionParent']);
            if (questionArr.length < 3) {
                this.createOption(this.self['OptionParent'], this.self['OptionParent'].width / 2, this.self['OptionParent'].height / 2, questionArr[0], false);
            }
            else {
                for (let index = 0; index < questionArr.length; index++) {
                    let x, y;
                    switch (index) {
                        case 0:
                            x = this.self['OptionParent'].width * 0.25;
                            y = this.self['OptionParent'].height * 0.25;
                            break;
                        case 1:
                            x = this.self['OptionParent'].width * 0.75;
                            y = this.self['OptionParent'].height * 0.25;
                            break;
                        case 2:
                            x = this.self['OptionParent'].width * 0.25;
                            y = this.self['OptionParent'].height * 0.75;
                            break;
                        case 3:
                            x = this.self['OptionParent'].width * 0.75;
                            y = this.self['OptionParent'].height * 0.75;
                            break;
                        default:
                            break;
                    }
                    this.createOption(this.self['OptionParent'], x, y, questionArr[index], true);
                }
            }
        }
        createOption(parent, x, y, question, click) {
            Admin._clickLock.switch = false;
            let Option = Laya.Pool.getItemByCreateFun('Option', this.Option.create, this.Option);
            let Content = Option.getChildByName('Content');
            Content.text = question;
            parent.addChild(Option);
            Option.pos(x, y);
            if (Content.text.length >= 10) {
                Content.fontSize = 22;
            }
            else if (Content.text.length >= 8 && Content.text.length < 10) {
                Content.fontSize = 25;
            }
            else if (Content.text.length >= 6 && Content.text.length < 8) {
                Content.fontSize = 28;
            }
            else if (Content.text.length < 6) {
                Content.fontSize = 30;
            }
            if (click) {
                Click.on(Click.Type.largen, Option, this, null, null, () => {
                    Admin._clickLock.switch = true;
                    EventAdmin.notify(Game3D.EventType.judgeMeAnswer, question);
                });
            }
            return Option;
        }
        createOppositeQuestion(questionAndYesOrNo, cardName) {
            Admin._clickLock.switch = false;
            let GuessCard = Laya.Pool.getItemByCreateFun('GuessCard', this.GuessCard.create, this.GuessCard);
            this.self.addChild(GuessCard);
            GuessCard.pos(0, 0);
            let Bg = GuessCard.getChildByName('Bg');
            Bg.alpha = 0;
            Bg.height = Laya.stage.height;
            Bg.width = Laya.stage.width;
            Animation2D.fadeOut(Bg, 0, 0.3, 200, 300);
            let QuestionBaord = GuessCard.getChildByName('QuestionBaord');
            let Question = QuestionBaord.getChildByName('Question');
            Question.text = questionAndYesOrNo[0];
            Animation2D.bombs_Appear(QuestionBaord, 0, 1, 1.1, 0, 150, 50, 600);
            let Card = GuessCard.getChildByName('Card');
            let CardName = Card.getChildByName('CardName');
            CardName.text = cardName;
            Card.y = Laya.stage.height * 0.483;
            Animation2D.cardRotateX_TowFace(Card, 180);
            Animation2D.move_Simple(Card, -800, Card.y, Laya.stage.width / 2, Card.y, 500);
            let BtnYes = GuessCard.getChildByName('BtnYes');
            var btnYesUp = () => {
                if (questionAndYesOrNo[1]) {
                    Admin._clickLock.switch = true;
                    EventAdmin.notify(Game3D.EventType.judgeOppositeAnswer, [questionAndYesOrNo[0], true]);
                }
                else {
                    Tools.color_Filter(Card, [255, 0, 0, 1], 100);
                    Animation2D.swell_shrink(Card, 1, 1.05, 80);
                    Animation2D.leftRight_Shake(Card, 30, 50, 0, () => {
                        console.log('回答错误！');
                    }, false);
                }
            };
            Click.on(Click.Type.largen, BtnYes, this, null, null, btnYesUp);
            let BtnNo = GuessCard.getChildByName('BtnNo');
            var btnNoUp = () => {
                if (!questionAndYesOrNo[1]) {
                    Admin._clickLock.switch = true;
                    EventAdmin.notify(Game3D.EventType.judgeOppositeAnswer, [questionAndYesOrNo[0], false]);
                }
                else {
                    Tools.color_Filter(Card, [255, 0, 0, 1], 100);
                    Animation2D.swell_shrink(Card, 1, 1.05, 80);
                    Animation2D.leftRight_Shake(Card, 30, 50, 0, () => {
                        console.log('回答错误！');
                    }, false);
                }
            };
            Click.on(Click.Type.largen, BtnNo, this, null, null, btnNoUp);
            BtnYes.y = Laya.stage.height * 0.874;
            BtnNo.y = Laya.stage.height * 0.874;
            Animation2D.scale_Alpha(BtnNo, 0, 0, 0, 1, 1, 1, 150, 600);
            Animation2D.scale_Alpha(BtnYes, 0, 0, 0, 1, 1, 1, 150, 600);
            EventAdmin.reg(Game3D.EventType.hideGuessCard, this, (func) => {
                Animation2D.fadeOut(Bg, 0.3, 0, 200);
                Animation2D.bombs_Vanish(QuestionBaord, 0, 0, 0, 150, 500);
                Animation2D.move_Simple(Card, Card.x, Card.y, 1200, Card.y, 500, 150);
                Animation2D.cardRotateX_TowFace(Card, 180, null, 200);
                Animation2D.scale_Alpha(BtnNo, 1, 1, 1, 0, 0, 0, 150, 400);
                Animation2D.scale_Alpha(BtnYes, 1, 1, 1, 0, 0, 0, 150, 400, () => {
                    GuessCard.removeSelf();
                    if (func) {
                        func();
                    }
                });
            });
        }
        onStageMouseDown(e) {
            let MainCamera = Game3D.MainCamera.getChildAt(0);
            let hitResult = Tools.d3_rayScanning(MainCamera, Game3D.Scene3D, new Laya.Vector2(e.stageX, e.stageY))[0];
            let Sp3D;
            if (hitResult) {
                Sp3D = hitResult.collider.owner;
                EventAdmin.notify(Game3D.EventType.judgeMeClickCard, Sp3D);
            }
        }
    }

    class LwgInit extends Admin.Scene {
        lwgOnAwake() {
            this.admin();
            this.game3D();
            this.checkIn();
            this.shop();
            this.skin();
            this.task();
            this.easterEgg();
            Setting.createSetBtn(64, 96, 82, 82, 'UI/UIStart/shezhi.png');
        }
        admin() {
            Admin._commonVanishAni = true;
            Admin._platform = Admin._platformTpye.Bytedance;
        }
        game3D() {
            Game3D.dataInit();
            Game3D.Scene3D = Laya.loader.getRes(Loding.list_3DScene[0]);
            Laya.stage.addChild(Game3D.Scene3D);
            Game3D.Scene3D.addComponent(Game3D.MainScene);
        }
        checkIn() {
            CheckIn.init();
        }
        skin() {
        }
        shop() {
        }
        task() {
        }
        easterEgg() {
        }
        lwgOnEnable() {
            console.log('完成初始化');
            Admin._openScene(Admin.SceneName.UIStart, this.self);
        }
    }

    class UIAdsHint extends Admin.Scene {
        setCallBack(_adAction) {
            this.adAction = _adAction;
        }
        lwgOnEnable() {
            this.self.x = 0;
            this.self.y = 0;
            this.self['BtnClose'].visible = false;
            Laya.timer.frameOnce(120, this, () => {
                this.self['BtnClose'].visible = true;
            });
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp);
            Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, this.btnConfirmUp);
        }
        btnCloseUp() {
            this.self.close();
        }
        btnConfirmUp() {
            ADManager.ShowReward(this.adAction, null);
            this.self.close();
        }
        lwgOnDisable() {
            console.log('退出');
        }
    }

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
                        Admin._openScene(Admin.SceneName.UIAdsHint, null, () => {
                            Admin._sceneControl['UIAdsHint'].getComponent(UIAdsHint).setCallBack(rewardAction);
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

    class UIAdsHint$1 extends Admin.Scene {
        setCallBack(_adAction) {
            this.adAction = _adAction;
        }
        lwgOnEnable() {
            this.self.x = 0;
            this.self.y = 0;
            this.self['BtnClose'].visible = false;
            Laya.timer.frameOnce(120, this, () => {
                this.self['BtnClose'].visible = true;
            });
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp);
            Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, this.btnConfirmUp);
        }
        btnCloseUp() {
            this.self.close();
        }
        btnConfirmUp() {
            ADManager.ShowReward(this.adAction, null);
            this.self.close();
        }
        lwgOnDisable() {
            console.log('退出');
        }
    }

    class UICheckIn extends CheckIn.CheckInScene {
        lwgOnAwake() {
            if (CheckIn._lastCheckDate.date == (new Date).getDate()) {
                this.self['WeChat'].visible = false;
                this.self['OPPO'].visible = false;
            }
            else {
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
        lwgEventReg() {
            EventAdmin.reg('seven', this, () => {
                let ChinkTip = this.self['Seven'].getChildByName('ChinkTip');
                let Num = this.self['Seven'].getChildByName('Num');
                let Pic_Gold = this.self['Seven'].getChildByName('Pic_Gold');
                if (CheckIn._checkInNum.number === 7) {
                    ChinkTip.visible = true;
                    Num.visible = false;
                    Pic_Gold.visible = false;
                }
                else {
                    ChinkTip.visible = false;
                }
            });
        }
        lwgOnEnable() {
            ADManager.TAPoint(TaT.BtnShow, 'AD3award');
            EventAdmin.notify('seven');
            Gold.GoldNode = this.self['GoldNode'];
            let Num2 = this.self['GoldNode'].getChildByName('Num');
            Num2.text = Gold._num.value.toString();
        }
        checkList_Update(cell, index) {
            let dataSource = cell.dataSource;
            let Pic_Board = cell.getChildByName('Pic_Board');
            let Pic_Gold = cell.getChildByName('Pic_Gold');
            let Num = cell.getChildByName('Num');
            let ChinkTip = cell.getChildByName('ChinkTip');
            let DayNum = cell.getChildByName('DayNum');
            if (dataSource[CheckIn.CheckProPerty.checkInState]) {
                Pic_Gold.visible = false;
                Num.visible = false;
                ChinkTip.visible = true;
            }
            else {
                Pic_Gold.visible = true;
                Num.visible = true;
                Num.text = dataSource[CheckIn.CheckProPerty.rewardNum];
                ChinkTip.visible = false;
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
        lwgBtnClick() {
            Click.on('largen', this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
            Click.on('largen', this.self['BtnThreeGet_WeChat'], this, null, null, this.btnThreeGetUp);
            Click.on(Click.Type.noEffect, this.self['Select_WeChat'], this, null, null, this.btnSelectUp);
            Click.on(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
            Click.on(Click.Type.largen, this.self['BtnThreeGet_OPPO'], this, null, null, this.btnThreeGetUp);
            Click.on('largen', this.self['BtnBack'], this, null, null, this.btnBackUp);
        }
        btnBackUp() {
            Admin._closeScene(this.self);
        }
        btnThreeGetUp() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'AD3award');
                this.btnGetUpFunc(3);
            });
        }
        btnGetUp() {
            if (Admin._platform === Admin._platformTpye.Bytedance) {
                if (this.self['Dot'].visible) {
                    ADManager.ShowReward(() => {
                        ADManager.TAPoint(TaT.BtnClick, 'AD3award');
                        this.btnGetUpFunc(3);
                    });
                }
                else {
                    this.btnGetUpFunc(1);
                }
            }
            else {
                this.btnGetUpFunc(1);
            }
        }
        btnGetUpFunc(number) {
            Admin._clickLock.switch = true;
            let index = CheckIn._checkInNum.number;
            let target;
            if (index < 6) {
                target = CheckIn._checkList.getCell(index);
            }
            else {
                target = this.self['Seven'];
            }
            Animation2D.swell_shrink(target, 1, 1.1, 100, 0, () => {
                let arr = [[111, 191], [296, 191], [486, 191], [111, 394], [296, 394], [486, 394], [306, 597
                    ]];
                Effects.createExplosion_Rotate(this.self['SceneContent'], 25, arr[index][0], arr[index][1], 'star', 10, 15);
                let rewardNum = CheckIn.todayCheckIn_7Days();
                EventAdmin.notify('seven');
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Gold.addGold(rewardNum * number);
                    Laya.timer.once(500, this, () => {
                        Admin._closeScene(this.self);
                    });
                });
            });
        }
        btnSelectUp() {
            if (this.self['Dot'].visible) {
                this.self['Dot'].visible = false;
            }
            else {
                this.self['Dot'].visible = true;
            }
        }
        lwgOnUpdate() {
            if (!CheckIn._todayCheckIn.bool) {
                switch (Admin._platform) {
                    case Admin._platformTpye.WeChat:
                        if (this.self['Dot'].visible) {
                            this.self['BtnGet_WeChat'].visible = false;
                            this.self['BtnThreeGet_WeChat'].visible = true;
                        }
                        else {
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
        lwgOnDisable() {
            Setting.setBtnAppear();
            Gold.goldAppear();
            Admin._clickLock.switch = false;
        }
    }

    class UIDefeated extends Defeated.DefeatedScene {
        lwgOnAwake() {
            ADManager.TAPoint(TaT.LevelFail, 'level' + Admin._gameLevel.value);
            ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
            ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');
            switch (Admin._platform) {
                case Admin._platformTpye.OPPO:
                    this.self['OPPO'].visible = true;
                    this.self['WeChat'].visible = false;
                    this.self['Bytedance'].visible = false;
                    this.self['P202'].removeSelf();
                    break;
                case Admin._platformTpye.WeChat:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    this.self['Bytedance'].visible = false;
                    this.self['P202'].removeSelf();
                    break;
                case Admin._platformTpye.Bytedance:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = false;
                    this.self['Bytedance'].visible = true;
                default:
                    break;
            }
        }
        lwgOnEnable() {
            PalyAudio.playDefeatedSound();
            Gold.GoldNode = this.self['GoldNode'];
            let Num2 = this.self['GoldNode'].getChildByName('Num');
            Num2.text = Gold._num.value.toString();
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
            Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNextUp);
            Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
        }
        btnSelectUp() {
            let Dot;
            switch (Admin._platform) {
                case Admin._platformTpye.WeChat:
                    Dot = this.self['Dot_WeChat'];
                    break;
                case Admin._platformTpye.Bytedance:
                    Dot = this.self['Dot_Bytedance'];
                    break;
                default:
                    break;
            }
            if (Dot.visible) {
                Dot.visible = false;
                this.self['BtnNext_WeChat'].visible = false;
                this.self['BtnAgain_WeChat'].visible = true;
                this.self['BtnNext_Bytedance'].visible = false;
                this.self['BtnAgain_Bytedance'].visible = true;
            }
            else {
                Dot.visible = true;
                this.self['BtnNext_WeChat'].visible = true;
                this.self['BtnAgain_WeChat'].visible = false;
                this.self['BtnNext_Bytedance'].visible = true;
                this.self['BtnAgain_Bytedance'].visible = false;
            }
        }
        btnAgainUp() {
            ADManager.TAPoint(TaT.BtnClick, 'returnword_fail');
            console.log('重新开始！');
            Admin._openScene(Admin.SceneName.UIStart, this.self);
            EventAdmin.notify(EventAdmin.EventType.nextCustoms);
        }
        btnNextUp() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'ADnextbt_fail');
                Admin._gameLevel.value += 1;
                Admin._openScene(Admin.SceneName.UIStart, this.self);
                EventAdmin.notify(EventAdmin.EventType.nextCustoms);
            });
        }
        lwgOnDisable() {
        }
    }

    class UIDrawCard extends DrawCard.DrawCardScene {
        lwgOnAwake() {
            Gold.goldAppear();
            Setting.setBtnVinish();
        }
        lwgOnEnable() {
            this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
            this.self['FreeAds'].value = (DrawCard._freeAds.num % 3).toString();
            TimerAdmin.frameLoop(320, this, () => {
                Animation2D.move_Simple(this.self['ReflectMask'], -263, -271, 399, 71, 800, 0, () => {
                    Animation2D.fadeOut(this.self['Reflect2'], 0, 1, 200, 0, () => {
                        Animation2D.fadeOut(this.self['Reflect2'], 1, 0, 300, 0, () => {
                            Effects.light_Infinite(this.self['Mirror'], this, 360, 318, 800, 800, 0, null, 0.01, 1);
                        });
                    });
                }, Laya.Ease.cubicInOut);
            }, true);
        }
        lwgEventReg() {
            let Img = this.self['Surface'];
            let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));
            EventAdmin.reg('drawCardEvent', this, () => {
                if (DrawCard._residueDraw.num <= 0) {
                    Dialog.createHint_Middle(Dialog.HintContent["没有抽奖次数了，请通过观看广告获取！"]);
                    return;
                }
                else {
                    DrawCard._residueDraw.num--;
                    this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
                }
                this.self['DrawDisPlay'].x = 0;
                this.self['BtnTake'].visible = false;
                for (let index = 0; index < 10; index++) {
                    Laya.timer.once(index * 100, this, () => {
                        let Card = Laya.Pool.getItemByCreateFun('Card', this.Card.create, this.Card);
                        this.self['CardParent'].addChild(Card);
                        let spcing = (Laya.stage.width - 5 * Card.width) / 6;
                        Card.pos(globalPos.x, globalPos.y);
                        Card.scale(0, 0);
                        Card.name = 'Card' + index;
                        let Pic = Card.getChildByName('Pic');
                        Pic.visible = false;
                        let x, y;
                        if (index <= 4) {
                            x = (spcing + Card.width / 2) + (Card.width + spcing) * index;
                            y = globalPos.y - 150;
                        }
                        else {
                            x = (spcing + Card.width / 2) + (Card.width + spcing) * (index - 5);
                            y = globalPos.y + 150;
                        }
                        Animation2D.move_Scale(Card, 0, globalPos.x, globalPos.y, x, y, 1, 200);
                        if (index == 8) {
                            Animation2D.fadeOut(this.self['DrawDisPlayBg'], 0, 0.5, 300);
                        }
                        else if (index == 9) {
                            EventAdmin.notify('flop');
                        }
                    });
                }
            });
            EventAdmin.reg('flop', this, () => {
                if (!this.self['cardIndex']) {
                    this.self['cardIndex'] = 0;
                }
                let Card = this.self['CardParent'].getChildByName('Card' + this.self['cardIndex']);
                if (!Card) {
                    this.self['cardIndex'] = null;
                    Laya.timer.once(500, this, () => {
                        Admin._openScene(Admin.SceneName.UIShare, null, () => { Share._fromWhich = Admin.SceneName.UIDrawCard; });
                    });
                    return;
                }
                var func = () => {
                    this.self['cardIndex']++;
                    EventAdmin.notify('flop');
                };
                Animation2D.cardRotateX_OneFace(Card, () => {
                    let Pic = Card.getChildByName('Pic');
                    Pic.visible = true;
                }, 100, 50, () => {
                    if (this.self['cardIndex'] == 4 || this.self['cardIndex'] == 8) {
                        Card.zOrder = 4 * 10;
                        let x = Card.x;
                        let y = Card.y;
                        Animation2D.leftRight_Shake(Card, 20, 100, 200, () => {
                            Animation2D.rotate_Scale(Card, 0, 1, 1, 720, 3, 3, 400, 200, () => {
                                for (let index = 0; index < 5; index++) {
                                    let pointAarr = Tools.point_RandomPointByCenter(new Laya.Point(globalPos.x, globalPos.y), 200, 100);
                                    Laya.timer.once(300 * index, this, () => {
                                        Effects.createExplosion_Rotate(this.self['CardParent'], 25, pointAarr[0].x, pointAarr[0].y, 'star', 10, 10);
                                    });
                                }
                                Animation2D.move_Scale(Card, 3, Card.x, Card.y, x, y, 1, 200, 2000, null, () => {
                                    func();
                                });
                            });
                            Animation2D.move_Simple(Card, x, y, globalPos.x, globalPos.y, 250, 100);
                        });
                    }
                    else {
                        func();
                    }
                });
            });
            EventAdmin.reg(Admin.SceneName.UIShare + Admin.SceneName.UIDrawCard, this, () => {
                this.self['BtnTake'].visible = true;
            });
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnFree'], this, null, null, () => {
                DrawCard._freeAds.num++;
                if (DrawCard._freeAds.num % 3 == 0 && DrawCard._freeAds.num !== 0) {
                    DrawCard._freeAds.num = 0;
                    DrawCard._residueDraw.num++;
                    this.self['ResidueNum'].text = DrawCard._residueDraw.num.toString();
                }
                this.self['FreeAds'].value = (DrawCard._freeAds.num % 3).toString();
            });
            Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
                Admin._closeScene(this.self);
            });
            Click.on(Click.Type.noEffect, this.self['DrawDisPlay'], this, (e) => {
                e.stopPropagation();
            }, null, null);
            Click.on(Click.Type.noEffect, this.self['BtnTake'], this, (e) => {
                this.self['DrawDisPlay'].x = -800;
                Tools.node_RemoveAllChildren(this.self['CardParent']);
            }, null, null);
            Click.on(Click.Type.noEffect, this.self['BtnTake'], this, (e) => {
                this.self['DrawDisPlay'].x = -800;
                Tools.node_RemoveAllChildren(this.self['CardParent']);
            }, null, null);
            Click.on(Click.Type.noEffect, this.self['Surface'], this, (e) => {
                if (!this.self.getChildByName('DrawSp')) {
                    this.self['Drawlength'] = 0;
                    let DrawSp = new Laya.Sprite();
                    this.self.addChild(DrawSp);
                    DrawSp.name = 'DrawSp';
                    DrawSp.pos(0, 0);
                    this.self['DrawSp'] = DrawSp;
                }
                this.self['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
            }, (e) => {
                let Img = this.self['Surface'];
                let globalPos = Img.localToGlobal(new Laya.Point(Img.width / 2, Img.height / 2));
                if (new Laya.Point(e.stageX, e.stageY).distance(globalPos.x, globalPos.y) > Img.width / 2) {
                    this.self['DrawPosArr'] = null;
                    return;
                }
                if (this.self['DrawPosArr']) {
                    this.self['DrawSp'].graphics.drawLine(this.self['DrawPosArr'].x, this.self['DrawPosArr'].y, e.stageX, e.stageY, "#000000", 8);
                    this.self['DrawSp'].graphics.drawCircle(e.stageX, e.stageY, 4, "#000000");
                    this.self['Drawlength'] += this.self['DrawPosArr'].distance(e.stageX, e.stageY);
                    this.self['DrawPosArr'] = new Laya.Point(e.stageX, e.stageY);
                }
            }, () => {
                this.self.getChildByName('DrawSp').removeSelf();
                EventAdmin.notify('drawCardEvent');
                this.self['DrawPosArr'] = null;
            }, () => {
                this.self['DrawPosArr'] = null;
            });
        }
        lwgOnDisable() {
            Setting.setBtnAppear();
        }
    }

    class UILoding extends Loding.LodingScene {
        lwgOnAwake() {
            Loding.list_2DPic = [
                "res/atlas/Frame/Effects.png",
                "res/atlas/Frame/UI.png",
            ];
            Loding.list_2DScene = [
                "Scene/LwgInit.json",
                "Scene/UICheckIn.json",
            ];
            Loding.list_2DPrefab = [];
            Loding.list_3DScene = [
                "3DScene/LayaScene_GameMain/Conventional/GameMain.ls"
            ];
            Loding.list_3DPrefab = [];
            Loding.list_JsonData = [
                "GameData/VictoryBox/VictoryBox.json",
                "GameData/CheckIn/CheckIn.json",
                "GameData/Game/Feature.json",
                "GameData/Game/Card.json",
            ];
        }
        lwgAdaptive() {
            this.self['Tag'].y = Laya.stage.height - 100;
            this.self['ProgressBoard'].y = Laya.stage.height * 0.824;
            this.self['Pic'].y = Laya.stage.height * 0.505;
            this.self['Logo'].y = Laya.stage.height * 0.191;
        }
        lwgOnEnable() {
        }
        lwgOpenAni() { return 0; }
        lodingPhaseComplete() {
            this.self['Progress'].mask.x = -425 + 425 * Loding.currentProgress.value / Loding.sumProgress;
        }
        lodingComplete() {
            this.self['Progress'].mask.x = 0;
            return 200;
        }
    }

    class UIPropTry extends PropTry.PropTryScene {
        lwgOnAwake() {
            Tools.node_2DShowExcludedChild(this.self['Platform'], [Admin._platform], true);
        }
        lwgOnEnable() {
            this.self['BtnClose'].visible = false;
            Laya.timer.once(2000, this, () => {
                this.self['BtnClose'].visible = true;
            });
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, () => {
                Admin._openScene(Admin.SceneName.GameScene, this.self);
            });
            Click.on(Click.Type.noEffect, this.self['Bytedance_Low_Select'], this, null, null, () => {
                this.self['Bytedance_Low_BtnGet'].visible = this.self['Bytedance_Low_Dot'].visible = this.self['Bytedance_Low_Dot'].visible ? false : true;
            });
            Click.on(Click.Type.largen, this.self['Bytedance_Low_BtnGet'], this, null, null, () => {
                ADManager.ShowReward(() => {
                    Backpack._prop1.num++;
                    Backpack._prop2.num++;
                    Admin._openScene(Admin.SceneName.GameScene, this.self);
                });
            });
        }
    }

    class UIResurgence extends Admin.Scene {
        lwgOnAwake() {
            Admin._gameSwitch = false;
            Admin._clickLock.switch = false;
        }
        lwgOnEnable() {
            console.log('打开复活界面！');
            ADManager.TAPoint(TaT.BtnShow, 'closeword_revive');
            ADManager.TAPoint(TaT.BtnShow, 'ADrevivebt_revive');
            TimerAdmin.frameLoop(60, this, () => {
                let Countdown = this.self['Countdown'];
                Countdown.value = (Number(Countdown.value) - 1).toString();
                if (Countdown.value == '-1') {
                    Countdown.value = '0';
                    Laya.timer.clearAll(this);
                    Admin._openScene(Admin.SceneName.UIDefeated, this.self);
                }
            });
        }
        lwgAdaptive() {
            this.self['Bg'].x = Laya.stage.width;
            this.self['Bg'].y = Laya.stage.height;
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnResurgence'], this, null, null, () => {
                ADManager.ShowReward(() => {
                    ADManager.TAPoint(TaT.BtnClick, 'ADrevivebt_revive');
                    EventAdmin.notify(EventAdmin.EventType.resurgence, this.self);
                });
            });
            Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, () => {
                ADManager.TAPoint(TaT.BtnClick, 'closeword_revive');
                Admin._openScene(Admin.SceneName.UIShare, this.self, () => { Share._fromWhich = Admin.SceneName.UIDefeated; });
            });
        }
        lwgOnDisable() {
            Admin._gameSwitch = true;
        }
    }

    class UISet extends Admin.Scene {
        lwgOnAwake() {
            Setting.setBtnVinish();
            this.audioOnOff();
            this.bgmOnOff();
            ADManager.TAPoint(TaT.BtnClick, 'setbt_main');
        }
        audioOnOff() {
            if (Setting._sound.switch) {
                this.self['AudioOff'].visible = false;
            }
            else {
                this.self['AudioOff'].visible = true;
            }
        }
        bgmOnOff() {
            if (Setting._bgMusic.switch) {
                this.self['BgmOff'].visible = false;
            }
            else {
                this.self['BgmOff'].visible = true;
            }
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnAudio'], this, null, null, this.btnAudioUp, null);
            Click.on(Click.Type.largen, this.self['BtnBgm'], this, null, null, this.btnBgmUp, null);
            Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp, null);
        }
        btnAudioUp() {
            if (Setting._sound.switch) {
                Setting._sound.switch = false;
            }
            else {
                Setting._sound.switch = true;
            }
            this.audioOnOff();
        }
        btnBgmUp() {
            if (Setting._bgMusic.switch) {
                Setting._bgMusic.switch = false;
            }
            else {
                Setting._bgMusic.switch = true;
            }
            this.bgmOnOff();
        }
        btnCloseUp() {
            this.self.close();
        }
        lwgOnDisable() {
            Setting.setBtnAppear();
        }
    }

    class RecordManager {
        constructor() {
            this.GRV = null;
            this.isRecordVideoing = false;
            this.isVideoRecord = false;
            this.videoRecordTimer = 0;
            this.isHasVideoRecord = false;
        }
        static Init() {
            RecordManager.grv = new TJ.Platform.AppRt.DevKit.TT.GameRecorderVideo();
        }
        static startAutoRecord() {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            if (RecordManager.grv == null)
                RecordManager.Init();
            if (RecordManager.recording)
                return;
            RecordManager.autoRecording = true;
            console.log("******************开始录屏");
            RecordManager._start();
            RecordManager.lastRecordTime = Date.now();
        }
        static stopAutoRecord() {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            if (!RecordManager.autoRecording) {
                console.log("RecordManager.autoRecording", RecordManager.autoRecording);
                return false;
            }
            RecordManager.autoRecording = false;
            RecordManager._end(false);
            if (Date.now() - RecordManager.lastRecordTime > 6000) {
                return true;
            }
            if (Date.now() - RecordManager.lastRecordTime < 3000) {
                console.log("小于3秒");
                return false;
            }
            return true;
        }
        static startRecord() {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            if (RecordManager.autoRecording) {
                this.stopAutoRecord();
            }
            RecordManager.recording = true;
            RecordManager._start();
            RecordManager.lastRecordTime = Date.now();
        }
        static stopRecord() {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            console.log("time:" + (Date.now() - RecordManager.lastRecordTime));
            if (Date.now() - RecordManager.lastRecordTime <= 3000) {
                return false;
            }
            RecordManager.recording = false;
            RecordManager._end(true);
            return true;
        }
        static _start() {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            console.log("******************180s  ？？？？？");
            RecordManager.grv.Start(180);
        }
        static _end(share) {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            console.log("******************180结束 ？？？？？");
            RecordManager.grv.Stop(share);
        }
        static _share(type, successedAc, completedAc = null, failAc = null) {
            if (TJ.API.AppInfo.Channel() != TJ.Define.Channel.AppRt.ZJTD_AppRt)
                return;
            console.log("******************吊起分享 ？？？？？", RecordManager.grv, RecordManager.grv.videoPath);
            if (RecordManager.grv.videoPath) {
                let p = new TJ.Platform.AppRt.Extern.TT.ShareAppMessageParam();
                p.extra.videoTopics = ["剃头大师", "番茄小游戏", "抖音小游戏"];
                p.channel = "video";
                p.success = () => {
                    Dialog.createHint_Middle(Dialog.HintContent["分享成功!"]);
                    successedAc();
                };
                p.fail = () => {
                    if (type === 'noAward') {
                        Dialog.createHint_Middle(Dialog.HintContent["分享成功后才能获取奖励！"]);
                    }
                    else {
                        Dialog.createHint_Middle(Dialog.HintContent["分享失败！"]);
                    }
                    failAc();
                };
                RecordManager.grv.Share(p);
            }
            else {
                Dialog.createHint_Middle(Dialog.HintContent["暂无视频，玩一局游戏之后分享！"]);
            }
        }
    }
    RecordManager.recording = false;
    RecordManager.autoRecording = false;

    class UIShare extends Share.ShareScene {
        lwgOnAwake() {
            Gold.goldAppear();
        }
        lwgOnEnable() {
            ADManager.TAPoint(TaT.BtnShow, 'closeword_share');
            ADManager.TAPoint(TaT.BtnShow, 'sharebt_share');
        }
        lwgBtnClick() {
            Click.on(Click.Type.noEffect, this.self['BtnShare'], this, null, null, this.btnShareUp);
            Click.on(Click.Type.noEffect, this.self['Background'], this, null, null, this.btnShareUp);
            Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnNoShareUp);
            Click.on(Click.Type.largen, this.self['BtnSkip'], this, null, null, this.btnNoShareUp);
        }
        btnShareUp() {
            console.log('分享！');
            RecordManager._share('award', () => {
                ADManager.TAPoint(TaT.BtnClick, 'sharebt_share');
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Gold.addGold(150);
                    this.shareFunc();
                });
            });
        }
        shareFunc() {
            if (Share._fromWhich == Admin.SceneName.UIDrawCard) {
                Admin._closeScene(this.self);
                EventAdmin.notify(Admin.SceneName.UIShare + Admin.SceneName.UIDrawCard);
            }
            else if (Share._fromWhich == Admin.SceneName.UIVictory) {
                Admin._openScene(Admin.SceneName.UIVictoryBox, this.self);
            }
            else if (Share._fromWhich == Admin.SceneName.UIDefeated) {
                Admin._openScene(Admin.SceneName.UIDefeated, this.self);
            }
        }
        btnNoShareUp(e) {
            e.stopPropagation();
            this.shareFunc();
        }
    }

    class UISkinTry extends Admin.Scene {
        lwgOnAwake() {
            this.randomNoHave();
            if (Admin._platform == Admin._platformTpye.OPPO) {
                this.self['BtnGet_OPPO'].visible = true;
                this.self['BtnGet_WeChat'].visible = false;
            }
            else {
                this.self['BtnGet_OPPO'].visible = false;
                this.self['BtnGet_WeChat'].visible = true;
            }
        }
        randomNoHave() {
            let arrOther = Shop.getwayGoldArr(Shop.GoodsClass.Other, undefined, true);
            let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
        }
        randomOther() {
            let ele;
            let arrOther = Shop.getwayGoldArr(Shop.GoodsClass.Other, undefined, true);
            ele = arrOther[Math.floor(Math.random() * arrOther.length)];
            this.self['SkinPic'].skin = 'UI/Shop/Other/' + ele.name + '.png';
            this.beforeTryOtherName = Shop._currentOther.name;
            Shop._currentOther.name = ele.name;
        }
        randomProp() {
            let ele;
            let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
            ele = arrProp[Math.floor(Math.random() * arrProp.length)];
            this.self['SkinPic'].skin = 'UI/Shop/Props/' + ele.name + '.png';
            this.beforeTryPropName = Shop._currentProp.name;
            Shop._currentProp.name = ele.name;
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp);
            Click.on(Click.Type.largen, this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
            Click.on(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
        }
        btnGetUp(event) {
        }
        btnNoUp(event) {
            if (this.beforeTryOtherName) {
                Shop._currentOther.name = this.beforeTryOtherName;
            }
            if (this.beforeTryPropName) {
                Shop._currentProp.name = this.beforeTryPropName;
            }
        }
        lwgOnDisable() {
            if (this.beforeTryOtherName) {
                Shop._currentOther.name = this.beforeTryOtherName;
            }
            if (this.beforeTryPropName) {
                Shop._currentProp.name = this.beforeTryPropName;
            }
        }
    }

    class UIStart extends Start.StartScene {
        lwgOnAwake() {
            Setting.setBtnAppear();
            Gold.createGoldNode(629, 174);
            Laya.timer.once(200, this, () => {
                CheckIn.openCheckIn();
            });
        }
        lwgAdaptive() {
            this.self['BtnStart'].y = Laya.stage.height * 0.779;
        }
        lwgOnEnable() {
            for (let i = 0; i < this.self['LevelStyle'].numChildren; i++) {
                let ele = this.self['LevelStyle'].getChildAt(i);
                let index = Number(ele.name.substring(9, ele.name.length));
                if (Admin._gameLevel.value % 4 !== 0) {
                    if (index <= Admin._gameLevel.value % 4) {
                        ele.gray = false;
                        if (index == Admin._gameLevel.value % 4) {
                            TimerAdmin.frameLoop(100, this, () => {
                                Animation2D.swell_shrink(ele.getChildAt(1), 1, 1.1, 200);
                            });
                        }
                    }
                    else {
                        ele.gray = true;
                    }
                }
                else {
                    TimerAdmin.frameLoop(100, this, () => {
                        this.self['LvIcon4'].zOrder = 1000;
                        Animation2D.shookHead_Simple(this.self['LvIcon4'], 15, 200);
                        Effects.createExplosion_Rotate(this.self['LvIcon4'].parent, 10, this.self['LvIcon4'].x, this.self['LvIcon4'].y, 'star', 1, 15);
                    });
                    break;
                }
            }
            if (Admin._gameLevel.value % 4 == 0) {
                this.self['ProgressBar'].mask.x = 0;
                this.self['Percent'].text = '100 %';
            }
            else {
                this.self['ProgressBar'].mask.x = -460 + Admin._gameLevel.value % 4 * (460 / 4);
                this.self['Percent'].text = Admin._gameLevel.value % 4 * 25 + '%';
            }
            TimerAdmin.loop(2000, this, () => {
                Animation2D.bomb_LeftRight(this.self['BtnStart'], 1.22, 250);
            }, true);
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnStart'], this, null, null, () => {
                Admin._openScene(Admin.SceneName.UIPropTry, this.self);
            });
            Click.on(Click.Type.largen, this.self['BtnDrawCard'], this, null, null, () => {
                Admin._openScene(Admin.SceneName.UIDrawCard);
            });
            Click.on(Click.Type.largen, this.self['BtnChickIn'], this, null, null, () => {
                Admin._openScene(Admin.SceneName.UICheckIn);
            });
        }
        lwgOnDisable() {
            Setting.setBtnVinish();
            Gold.goldVinish();
        }
    }

    class UIVictory extends VictoryScene {
        lwgOnAwake() {
            switch (Admin._platform) {
                case Admin._platformTpye.OPPO:
                    this.self['OPPO'].visible = true;
                    this.self['WeChat'].visible = false;
                    this.self['Bytedance'].visible = false;
                    break;
                case Admin._platformTpye.WeChat:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    this.self['Bytedance'].visible = false;
                    break;
                case Admin._platformTpye.Bytedance:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = false;
                    this.self['Bytedance'].visible = true;
                    break;
                default:
                    break;
            }
            Admin._gameLevel.value++;
        }
        lwgOnEnable() {
            PalyAudio.playVictorySound();
            Effects.createFireworks(Laya.stage, 40, 430, 200);
            Effects.createFireworks(Laya.stage, 40, 109, 200);
            Effects.createLeftOrRightJet(Laya.stage, 'right', 40, 720, 300);
            Effects.createLeftOrRightJet(Laya.stage, 'left', 40, 0, 300);
            let Num1 = this.self['GlodNum'].getChildByName('Num');
            Num1.text = '+' + 100;
            Gold.GoldNode = this.self['GoldNode'];
            let Num2 = this.self['GoldNode'].getChildByName('Num');
            Num2.text = Gold._num.value.toString();
            let time = 0;
            Laya.timer.frameLoop(8, this, () => {
                time++;
                if (time % 2 == 0) {
                    this.self['Tag'].skin = 'Game/UI/UIVictory/dajia.png';
                }
                else {
                    this.self['Tag'].skin = 'Game/UI/UIVictory/qipao.png';
                }
            });
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, () => {
                if (this.self['Dot_Bytedance'].visible) {
                    ADManager.ShowReward(() => {
                        ADManager.TAPoint(TaT.BtnClick, 'closeword_success');
                        this.getGold(300);
                    });
                }
                else {
                    this.getGold(100);
                }
            });
            Click.on(Click.Type.largen, this.self['BtnShare'], this, null, null, () => {
                RecordManager._share('noAward', () => {
                    Dialog.createHint_Middle(Dialog.HintContent["分享成功!"]);
                });
            });
            Click.on(Click.Type.noEffect, this.self['BtnSelect_Bytedance'], this, null, null, () => {
                if (this.self['Dot_Bytedance'].visible) {
                    this.self['Dot_Bytedance'].visible = false;
                }
                else {
                    this.self['Dot_Bytedance'].visible = true;
                }
            });
        }
        getGold(number) {
            Admin._clickLock.switch = true;
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                Gold.addGold(number);
                Admin._openScene(Admin.SceneName.UIStart, this.self);
                Admin._clickLock.switch = false;
            });
        }
        lwgOnDisable() {
            EventAdmin.notify(EventAdmin.EventType.nextCustoms);
        }
    }

    class UIVictoryBox_Cell extends Admin.Object {
        constructor() { super(); }
        lwgBtnClick() {
            Click.on(Click.Type.noEffect, this.self, this, null, null, this.up, null);
        }
        btnoff() {
            Click.off(Click.Type.noEffect, this.self, this, null, null, this.up, null);
        }
        up(e) {
            if (this.self['_dataSource'][VictoryBox.BoxProperty.openState]) {
                return;
            }
            else {
                if (VictoryBox._canOpenNum > 0) {
                    let Pic_Box = this.self.getChildByName('Pic_Box');
                    if (!this.self['_dataSource'][VictoryBox.BoxProperty.ads]) {
                        Pic_Box.skin = 'Game/UI/UIVictoryBox/baoxiang3.png';
                    }
                    this.btnoff();
                    Animation2D.shookHead_Simple(Pic_Box, 10, 100, 0, f => {
                        EventAdmin.notify(VictoryBox.EventType.openBox, [this.self['_dataSource']]);
                        this.lwgBtnClick();
                    });
                }
                else {
                    Dialog.createHint_Middle(Dialog.HintContent["观看广告可以获得三次开宝箱次数！"]);
                }
            }
        }
        lwgDisable() {
        }
    }

    class UIVictoryBox extends VictoryBox.VictoryBoxScene {
        constructor() { super(); }
        lwgOnAwake() {
            ADManager.TAPoint(TaT.BtnShow, 'Adboxvideo');
            ADManager.TAPoint(TaT.BtnShow, 'Adboxagain');
            Gold.createGoldNode(629, 174);
            if (VictoryBox._openVictoryBoxNum > 1) {
                let arr = Tools.arrayRandomGetOut([0, 1, 2, 3, 4, 5, 6, 7, 8], 3);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    VictoryBox.setProperty('box' + arr[index], VictoryBox.BoxProperty.ads, true);
                }
            }
            switch (Admin._platform) {
                case Admin._platformTpye.WeChat:
                    this.self['Bytedance'].visible = false;
                    this.self['WeChat'].visible = true;
                    this.self['BtnAgain_WeChat'].visible = false;
                    this.self['BtnNo_WeChat'].visible = false;
                    break;
                case Admin._platformTpye.Bytedance:
                    this.self['Bytedance'].visible = true;
                    this.self['WeChat'].visible = false;
                    this.self['BtnAgain_Bytedance'].visible = false;
                    this.self['BtnNo_Bytedance'].visible = false;
                    this.self['Select_Bytedance'].visible = false;
                    break;
                default:
                    break;
            }
            for (let index = 0; index < VictoryBox._BoxArray.length; index++) {
                let name = VictoryBox._BoxArray[index][VictoryBox.BoxProperty.name];
                let arr = VictoryBox.getProperty(name, VictoryBox.BoxProperty.rewardNum);
                let num = Tools.randomCountNumer(arr[0], arr[1], 1);
                VictoryBox.setProperty(name, VictoryBox.BoxProperty.rewardNum, num);
            }
            this.self['BtnClose'].visible = false;
            Laya.timer.once(2000, this, () => {
                this.self['BtnClose'].visible = true;
            });
            TimerAdmin.frameRandomLoop(30, 50, this, () => {
                let x = this.self['SceneContent'].width / 2 - 160;
                Effects.star_Blink(this.self['SceneContent'], new Laya.Point(x, this.self['TopPic'].height / 2 + 80), 90, 70, 'Game/UI/UIVictoryBox/xingxing.png', 53, 52);
            }, true);
            TimerAdmin.frameRandomLoop(30, 50, this, () => {
                let x = this.self['SceneContent'].width / 2 + 160;
                Effects.star_Blink(this.self['SceneContent'], new Laya.Point(x, this.self['TopPic'].height / 2 + 80), 90, 70, 'Game/UI/UIVictoryBox/xingxing.png', 53, 52);
            }, true);
        }
        lwgEventReg() {
            EventAdmin.reg(VictoryBox.EventType.openBox, this, (dataSource) => {
                console.log(dataSource, VictoryBox._canOpenNum);
                if (VictoryBox._canOpenNum > 0) {
                    if (dataSource[VictoryBox.BoxProperty.ads]) {
                        ADManager.ShowReward(() => {
                            ADManager.TAPoint(TaT.BtnClick, 'Adboxvideo');
                            this.getRewardFunc(dataSource);
                        });
                    }
                    else {
                        this.getRewardFunc(dataSource);
                    }
                }
                else {
                    Dialog.createHint_Middle(Dialog.HintContent["观看广告可以获得三次开宝箱次数！"]);
                }
            });
        }
        getRewardFunc(dataSource) {
            VictoryBox._alreadyOpenNum++;
            VictoryBox._canOpenNum--;
            if (VictoryBox._canOpenNum == 0) {
                this.self['BtnAgain_Bytedance'].visible = true;
                this.self['BtnNo_Bytedance'].visible = true;
                this.self['Select_Bytedance'].visible = true;
            }
            VictoryBox._selectBox = dataSource[VictoryBox.BoxProperty.name];
            let diffX = dataSource.arrange % 3;
            if (diffX == 0) {
                diffX = 3;
            }
            let diffY = Math.floor(dataSource.arrange / 3 + 0.5);
            let x = VictoryBox._BoxList.x + VictoryBox._BoxList.width / 3 * diffX - 45;
            let y = VictoryBox._BoxList.y + VictoryBox._BoxList.height / 3 * diffY + 92;
            Effects.createExplosion_Rotate(this.self, 25, x, y, 'star', 10, 15);
            VictoryBox.setProperty(dataSource[VictoryBox.BoxProperty.name], VictoryBox.BoxProperty.openState, true);
            {
                Laya.timer.frameOnce(20, this, f => {
                    Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'Game/UI/Common/jinbi.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                        let rewardNum = VictoryBox.getProperty(dataSource.name, VictoryBox.BoxProperty.rewardNum);
                        Gold.addGold(rewardNum);
                    });
                });
            }
            EventAdmin.notify(Task.EventType.victoryBox);
        }
        boxList_Update(cell, index) {
            let dataSource = cell.dataSource;
            let Num = cell.getChildByName('Num');
            let Pic_Gold = cell.getChildByName('Pic_Gold');
            let Pic_Box = cell.getChildByName('Pic_Box');
            let BordPic = cell.getChildByName('BordPic');
            if (!dataSource[VictoryBox.BoxProperty.openState]) {
                if (dataSource[VictoryBox.BoxProperty.ads]) {
                    Pic_Box.skin = 'Game/UI/UIVictoryBox/baoxiang_adv.png';
                }
                else {
                    Pic_Box.skin = 'Game/UI/UIVictoryBox/baoxiang2.png';
                }
                Pic_Box.visible = true;
                Pic_Gold.visible = false;
                Num.visible = false;
            }
            else {
                Pic_Box.visible = false;
                Pic_Gold.visible = true;
                Num.visible = true;
                Num.text = dataSource[VictoryBox.BoxProperty.rewardNum];
            }
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnNoUp);
            Click.on(Click.Type.largen, this.self['BtnNo_WeChat'], this, null, null, this.btnNoUp);
            Click.on(Click.Type.largen, this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
            Click.on(Click.Type.largen, this.self['BtnNo_Bytedance'], this, null, null, this.btnNoUp);
            Click.on(Click.Type.largen, this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
            Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelect_BytedanceUp);
        }
        btnSelect_BytedanceUp() {
            if (this.self['Dot_Bytedance'].visible) {
                this.self['Dot_Bytedance'].visible = false;
                this.self['BtnNo_Bytedance'].visible = true;
                this.self['BtnAgain_Bytedance'].visible = false;
            }
            else {
                this.self['Dot_Bytedance'].visible = true;
                this.self['BtnNo_Bytedance'].visible = false;
                this.self['BtnAgain_Bytedance'].visible = true;
            }
        }
        btnNoUp(event) {
            Admin._openScene(Admin.SceneName.UIVictory, this.self);
        }
        btnAgainUp(event) {
            ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_box');
            ADManager.TAPoint(TaT.BtnClick, 'Adboxagain');
            if (VictoryBox._alreadyOpenNum < 9 && VictoryBox._adsMaxOpenNum > 0) {
                ADManager.ShowReward(() => {
                    Dialog.createHint_Middle(Dialog.HintContent["增加三次开启宝箱次数！"]);
                    VictoryBox._canOpenNum += 3;
                    VictoryBox._adsMaxOpenNum -= 3;
                    this.self['BtnAgain_Bytedance'].visible = false;
                    this.self['BtnNo_Bytedance'].visible = false;
                    this.self['Select_Bytedance'].visible = false;
                });
            }
            else {
                Dialog.createHint_Middle(Dialog.HintContent["没有宝箱领可以领了！"]);
            }
        }
        lwgOnUpdate() {
            if (VictoryBox._canOpenNum > 0) {
                this.self['BtnAgain_WeChat'].visible = false;
                this.self['BtnNo_WeChat'].visible = false;
            }
            else {
                this.self['BtnAgain_WeChat'].visible = true;
                this.self['BtnNo_WeChat'].visible = true;
            }
        }
        lwgOnDisable() {
            Gold.GoldNode.removeSelf();
        }
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
            reg("TJ/Promo/script/PromoOpen.ts", PromoOpen);
            reg("TJ/Promo/script/ButtonScale.ts", ButtonScale);
            reg("TJ/Promo/script/PromoItem.ts", PromoItem);
            reg("TJ/Promo/script/P201.ts", P201);
            reg("TJ/Promo/script/P202.ts", P202);
            reg("TJ/Promo/script/P204.ts", P204);
            reg("TJ/Promo/script/P205.ts", P205);
            reg("TJ/Promo/script/P106.ts", P106);
            reg("script/Game/GameScene.ts", GameScene);
            reg("script/Frame/LwgInit.ts", LwgInit);
            reg("script/Game/UIAdsHint.ts", UIAdsHint$1);
            reg("script/Game/UICheckIn.ts", UICheckIn);
            reg("script/Game/UIDefeated.ts", UIDefeated);
            reg("script/Game/UIDrawCard.ts", UIDrawCard);
            reg("script/Game/UILoding.ts", UILoding);
            reg("script/Game/UIPropTry.ts", UIPropTry);
            reg("script/Game/UIResurgence.ts", UIResurgence);
            reg("script/Game/UISet.ts", UISet);
            reg("script/Game/UIShare.ts", UIShare);
            reg("script/Game/UISkinTry.ts", UISkinTry);
            reg("script/Game/UIStart.ts", UIStart);
            reg("script/Game/UIVictory.ts", UIVictory);
            reg("script/Game/UIVictoryBox_Cell.ts", UIVictoryBox_Cell);
            reg("script/Game/UIVictoryBox.ts", UIVictoryBox);
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
