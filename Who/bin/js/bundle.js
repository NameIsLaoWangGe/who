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

    var GameControl;
    (function (GameControl) {
        let _platformTpye;
        (function (_platformTpye) {
            _platformTpye["WeChat"] = "WeChat";
            _platformTpye["OPPO"] = "OPPO";
            _platformTpye["Bytedance"] = "Bytedance";
            _platformTpye["All"] = "All";
        })(_platformTpye = GameControl._platformTpye || (GameControl._platformTpye = {}));
        GameControl._platform = _platformTpye.Bytedance;
        GameControl._gameSwitch = false;
        GameControl._gameLevel = {
            get value() {
                return Laya.LocalStorage.getItem('_gameLevel') ? Number(Laya.LocalStorage.getItem('_gameLevel')) : 1;
            },
            set value(val) {
                Laya.LocalStorage.setItem('_gameLevel', val.toString());
            }
        };
        GameControl._practicalLevel = {
            get value() {
                return Laya.LocalStorage.getItem('_practicalLevel') ? Number(Laya.LocalStorage.getItem('_practicalLevel')) : GameControl._gameLevel.value;
            },
            set value(val) {
                Laya.LocalStorage.setItem('_practicalLevel', val.toString());
            }
        };
        function getLevelData(levelNum) {
            let dataArr = Laya.loader.getRes("GameData/Game/GameLevel.json")['RECORDS'];
            let level;
            let num;
            if (levelNum) {
                num = levelNum;
            }
            else {
                num = GameControl._gameLevel.value;
            }
            for (let index = 0; index < dataArr.length; index++) {
                const element = dataArr[index];
                if (element['name'] === 'level' + num) {
                    level = element;
                    break;
                }
            }
            if (level) {
                return level;
            }
            else {
                return dataArr[num - 1];
            }
        }
        GameControl.getLevelData = getLevelData;
        function getLevelData_Condition(levelNum) {
            let level = getLevelData(levelNum ? levelNum : GameControl._gameLevel.value);
            let arr0;
            for (const key in level) {
                if (level.hasOwnProperty(key)) {
                    if (key === 'condition') {
                        arr0 = level[key];
                    }
                }
            }
            if (arr0) {
                return arr0;
            }
            else {
                console.log('获取关卡描述失败');
            }
        }
        GameControl.getLevelData_Condition = getLevelData_Condition;
        let gameProperty;
        (function (gameProperty) {
            gameProperty["name"] = "name";
            gameProperty["condition"] = "condition";
            gameProperty["resCondition"] = "resCondition";
            gameProperty["rewardType"] = "rewardType";
            gameProperty["rewardNum"] = "rewardNum";
        })(gameProperty = GameControl.gameProperty || (GameControl.gameProperty = {}));
        let rewardType;
        (function (rewardType) {
            rewardType["gold"] = "gold";
            rewardType["diamond"] = "diamond";
        })(rewardType = GameControl.rewardType || (GameControl.rewardType = {}));
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
                GameControl.LevelNode = sp;
            }));
        }
        GameControl._createLevel = _createLevel;
        GameControl._execution = {
            get value() {
                return this.val = Laya.LocalStorage.getItem('_execution') ? Number(Laya.LocalStorage.getItem('_execution')) : 15;
            },
            set value(val) {
                this.val = val;
                Laya.LocalStorage.setItem('_execution', val.toString());
            }
        };
    })(GameControl || (GameControl = {}));
    let Game = GameControl;

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
            if (Game._platform === Game._platformTpye.OPPO) {
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
                        Admin._openScene(Admin.SceneName.UIADSHint, null, null, () => {
                            Admin._sceneControl['UIADSHint'].getComponent(UIADSHint).setCallBack(rewardAction);
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
        let Global;
        (function (Global) {
            function _createKeyNum(parent, x, y) {
                let sp;
                Laya.loader.load('prefab/KeyNum.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(x, y);
                    sp.zOrder = 0;
                    let num = sp.getChildByName('Num');
                    Global.KeyNumNode = sp;
                }));
            }
            Global._createKeyNum = _createKeyNum;
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
                    Global.ExecutionNumNode = sp;
                    Global.ExecutionNumNode.name = 'ExecutionNumNode';
                }));
            }
            Global._createExecutionNum = _createExecutionNum;
            function _addExecution(number) {
            }
            Global._addExecution = _addExecution;
            function _createBtnPause(parent) {
                let sp;
                Laya.loader.load('prefab/BtnPause.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 167);
                    sp.zOrder = 0;
                    Global.BtnPauseNode = sp;
                    Global.BtnPauseNode.name = 'BtnPauseNode';
                    Click.on(Click.Type.largen, sp, null, null, null, btnPauseUp, null);
                }));
            }
            Global._createBtnPause = _createBtnPause;
            function btnPauseUp(event) {
                event.stopPropagation();
                event.currentTarget.scale(1, 1);
                lwg.Admin._openScene('UIPause', null, null, null);
            }
            Global.btnPauseUp = btnPauseUp;
            function _createBtnHint(parent) {
                let sp;
                Laya.loader.load('prefab/BtnHint.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 293);
                    sp.zOrder = 0;
                    Global.BtnHintNode = sp;
                    Global.BtnHintNode.name = 'BtnHintNode';
                    Click.on(Click.Type.largen, sp, null, null, null, btnHintUp, null);
                }));
            }
            Global._createBtnHint = _createBtnHint;
            function btnHintUp(event) {
                event.currentTarget.scale(1, 1);
                event.stopPropagation();
                Admin._openScene(Admin.SceneName.UISmallHint, null, null, f => { });
            }
            Global.btnHintUp = btnHintUp;
            function _createBtnAgain(parent) {
                let sp;
                Laya.loader.load('prefab/BtnAgain.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 409);
                    sp.zOrder = 0;
                    Click.on(Click.Type.largen, sp, null, btnAgainUp, null, null, null);
                    Global.BtnAgainNode = sp;
                }));
            }
            Global._createBtnAgain = _createBtnAgain;
            function btnAgainUp(event) {
                event.stopPropagation();
                event.currentTarget.scale(1, 1);
                Global.refreshNum++;
            }
            Global.btnAgainUp = btnAgainUp;
            function _createP201_01(parent) {
                let sp;
                Laya.loader.load('prefab/P201.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('P201', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(80, 290);
                    sp.zOrder = 65;
                    Global.P201_01Node = sp;
                }));
            }
            Global._createP201_01 = _createP201_01;
            function _createStimulateDec(parent) {
                let sp;
                Laya.loader.load('prefab/StimulateDec.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('StimulateDec', _prefab.create, _prefab);
                    let dec = sp.getChildByName('Dec');
                    parent.addChild(sp);
                    sp.pos(35, 150);
                    sp.zOrder = 65;
                    Global.StimulateDecNode = sp;
                }));
            }
            Global._createStimulateDec = _createStimulateDec;
            function _createHint_InPut(input) {
                let sp;
                Laya.loader.load('prefab/HintPre_01.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    Laya.stage.addChild(sp);
                    sp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                    let dec = sp.getChildByName('dec');
                    dec.text = input;
                    sp.zOrder = 100;
                    dec.alpha = 0;
                    Animation2D.scale_Alpha(sp, 0, 1, 0, 1, 1, 1, 200, null, 0, f => {
                        Animation2D.fadeOut(dec, 0, 1, 150, 0, f => {
                            Animation2D.fadeOut(dec, 1, 0, 200, 1500, f => {
                                Animation2D.scale_Alpha(sp, 1, 1, 1, 1, 0, 0, 200, null, 0, f => {
                                    sp.removeSelf();
                                });
                            });
                        });
                    });
                }));
            }
            Global._createHint_InPut = _createHint_InPut;
            function createConsumeEx(subEx) {
                let label = Laya.Pool.getItemByClass('label', Laya.Label);
                label.name = 'label';
                Laya.stage.addChild(label);
                label.text = '-2';
                label.fontSize = 40;
                label.bold = true;
                label.color = '#59245c';
                label.x = Global.ExecutionNumNode.x + 100;
                label.y = Global.ExecutionNumNode.y - label.height / 2 + 4;
                label.zOrder = 100;
                lwg.Animation2D.fadeOut(label, 0, 1, 200, 150, f => {
                    lwg.Animation2D.leftRight_Shake(Global.ExecutionNumNode, 15, 60, 0, null);
                    lwg.Animation2D.fadeOut(label, 1, 0, 600, 400, f => {
                    });
                });
            }
            Global.createConsumeEx = createConsumeEx;
            function _createGold(type, parent, x, y) {
                let sp;
                Laya.loader.load('prefab/GolPre.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(x, y);
                }));
            }
            Global._createGold = _createGold;
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
                    if (Global.ExecutionNumNode) {
                        Animation2D.move_Simple_01(sp, sp.x, sp.y, Global.ExecutionNumNode.x, Global.ExecutionNumNode.y, 800, null, 100, f => {
                            Animation2D.fadeOut(sp, 1, 0, 200, 0, f => {
                                lwg.Animation2D.upDwon_Shake(Global.ExecutionNumNode, 10, 80, 0, null);
                                if (func) {
                                    func();
                                }
                            });
                        });
                    }
                }));
            }
            Global._createAddExecution = _createAddExecution;
        })(Global = lwg.Global || (lwg.Global = {}));
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
                    this.self.x += Tools.speedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.speedXYByAngle(angle, speed + this.accelerated).y;
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
        let Admin;
        (function (Admin) {
            Admin._sceneControl = {};
            Admin._gameStart = false;
            let JsonProperty;
            (function (JsonProperty) {
                JsonProperty["RECORDS"] = "RECORDS";
            })(JsonProperty = Admin.JsonProperty || (Admin.JsonProperty = {}));
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
            })(SceneName = Admin.SceneName || (Admin.SceneName = {}));
            let GameState;
            (function (GameState) {
                GameState["GameStart"] = "GameStart";
                GameState["Play"] = "Play";
                GameState["Pause"] = "pause";
                GameState["Victory"] = "victory";
                GameState["Defeated"] = "defeated";
            })(GameState = Admin.GameState || (Admin.GameState = {}));
            function _openScene(openName, zOder, cloesScene, func) {
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
                    this.lwgOnAwake();
                    this.lwgVariateInit();
                    this.lwgAdaptive();
                    Tomato.scenePrintPoint(this.calssName, Tomato.scenePointType.open);
                }
                lwgOnAwake() { }
                ;
                lwgModuleOnAwake() {
                }
                onEnable() {
                    this.lwgEventReg();
                    this.lwgOnEnable();
                    this.btnAndlwgOpenAni();
                }
                lwgNodeDec() {
                }
                lwgEventReg() {
                }
                lwgVariateInit() {
                }
                gameState(calssName) {
                    switch (calssName) {
                        case SceneName.UIStart:
                            Admin._gameState = GameState.GameStart;
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
                btnAndlwgOpenAni() {
                    let time = this.lwgOpenAni();
                    if (time) {
                        Laya.timer.once(time, this, f => {
                            this.lwgBtnClick();
                        });
                    }
                    else {
                        this.lwgBtnClick();
                    }
                }
                lwgBtnClick() {
                }
                lwgOpenAni() {
                    return this.aniTime;
                }
                lwgAdaptive() {
                }
                lwgVanishAni() {
                    return 0;
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() {
                }
                onDisable() {
                    this.lwgOnDisable();
                    Laya.timer.clearAll(this);
                    Laya.Tween.clearAll(this);
                    EventAdmin.offCaller(this);
                    Tomato.scenePrintPoint(this.calssName, Tomato.scenePointType.close);
                }
                lwgOnDisable() { }
            }
            Admin.Scene = Scene;
            class Person extends Laya.Script {
                constructor() {
                    super();
                }
                onAwake() {
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
                    this.self.x += Tools.speedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.speedXYByAngle(angle, speed + this.accelerated).y;
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
                voiceUrl["btn"] = "res/Voice/btn.wav";
                voiceUrl["bgm"] = "res/Voice/bgm.mp3";
                voiceUrl["victory"] = "res/Voice/guoguan.wav";
                voiceUrl["defeated"] = "res/Voice/wancheng.wav";
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
            function randomNumOfArray(arr, num) {
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
            Tools.randomNumOfArray = randomNumOfArray;
            function rayScanning(camera, scene3D, point, filtrate) {
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
            Tools.rayScanning = rayScanning;
            function dotRotateXY(x0, y0, x1, y1, angle) {
                let x2 = x0 + (x1 - x0) * Math.cos(angle * Math.PI / 180) - (y1 - y0) * Math.sin(angle * Math.PI / 180);
                let y2 = y0 + (x1 - x0) * Math.sin(angle * Math.PI / 180) + (y1 - y0) * Math.cos(angle * Math.PI / 180);
                return new Laya.Point(x2, y2);
            }
            Tools.dotRotateXY = dotRotateXY;
            function toHexString(r, g, b) {
                return '#' + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
            }
            Tools.toHexString = toHexString;
            function twoObjectsLen_3D(obj1, obj2) {
                let obj1V3 = obj1.transform.position;
                let obj2V3 = obj2.transform.position;
                let p = new Laya.Vector3();
                Laya.Vector3.subtract(obj1V3, obj2V3, p);
                let lenp = Laya.Vector3.scalarLength(p);
                return lenp;
            }
            Tools.twoObjectsLen_3D = twoObjectsLen_3D;
            function twoPositionLen_3D(v1, v2) {
                let p = twoSubV3_3D(v1, v2);
                let lenp = Laya.Vector3.scalarLength(p);
                return lenp;
            }
            Tools.twoPositionLen_3D = twoPositionLen_3D;
            function twoObjectsLen_2D(obj1, obj2) {
                let point = new Laya.Point(obj1.x, obj1.y);
                let len = point.distance(obj2.x, obj2.y);
                return len;
            }
            Tools.twoObjectsLen_2D = twoObjectsLen_2D;
            function twoSubV3_3D(V3_01, V3_02, normalizing) {
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
            Tools.twoSubV3_3D = twoSubV3_3D;
            function reverseVector(type, Vecoter1, Vecoter2, normalizing) {
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
            Tools.reverseVector = reverseVector;
            function vector_Angle(x, y) {
                let radian = Math.atan2(x, y);
                let angle = 90 - radian * (180 / Math.PI);
                if (angle <= 0) {
                    angle = 270 + (90 + angle);
                }
                return angle - 90;
            }
            Tools.vector_Angle = vector_Angle;
            function angle_Vector(angle) {
                angle -= 90;
                let radian = (90 - angle) / (180 / Math.PI);
                let p = new Laya.Point(Math.sin(radian), Math.cos(radian));
                p.normalize();
                return p;
            }
            Tools.angle_Vector = angle_Vector;
            function maximumDistanceLimi_3D(originV3, obj, length) {
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
            Tools.maximumDistanceLimi_3D = maximumDistanceLimi_3D;
            function drawPieMask(parent, startAngle, endAngle) {
                parent.cacheAs = "bitmap";
                let drawPieSpt = new Laya.Sprite();
                drawPieSpt.blendMode = "destination-out";
                parent.addChild(drawPieSpt);
                let drawPie = drawPieSpt.graphics.drawPie(parent.width / 2, parent.height / 2, parent.width / 2 + 10, startAngle, endAngle, "#000000");
                return drawPie;
            }
            Tools.drawPieMask = drawPieMask;
            function transitionScreenPointfor3D(v3, camera) {
                let ScreenV3 = new Laya.Vector3();
                camera.viewport.project(v3, camera.projectionViewMatrix, ScreenV3);
                let point = new Laya.Vector2();
                point.x = ScreenV3.x;
                point.y = ScreenV3.y;
                return point;
            }
            Tools.transitionScreenPointfor3D = transitionScreenPointfor3D;
            function objPropertySort(array, property) {
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
            Tools.objPropertySort = objPropertySort;
            function dataCompareDifferent(data1, data2, property) {
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
            Tools.dataCompareDifferent = dataCompareDifferent;
            function dataComparEidentical(data1, data2, property) {
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
            Tools.dataComparEidentical = dataComparEidentical;
            function data1AddToData2(data1, data2) {
                for (let index = 0; index < data2.length; index++) {
                    const element = data2[index];
                    data1.push(element);
                }
            }
            Tools.data1AddToData2 = data1AddToData2;
            function random(range1, range2) {
                range1 = range1 || 10;
                const c = range1 - range2 + 1;
                return Math.floor(Math.random() * c + range1);
            }
            Tools.random = random;
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
                    sourceCopy[item] = typeof source[item] === 'object' ? obj_DeepCopy(source[item]) : source[item];
                }
                return sourceCopy;
            }
            Tools.objArray_Copy = objArray_Copy;
            function obj_DeepCopy(source) {
                var sourceCopy = {};
                for (var item in source)
                    sourceCopy[item] = typeof source[item] === 'object' ? obj_DeepCopy(source[item]) : source[item];
                return sourceCopy;
            }
            Tools.obj_DeepCopy = obj_DeepCopy;
            function speedByAngle(angle, XY) {
                if (angle % 90 === 0 || !angle) {
                    console.error("计算的角度异常,需要查看：", angle);
                    return;
                }
                let speedXY = { x: 0, y: 0 };
                speedXY.y = XY.y;
                speedXY.x = speedXY.y / Math.tan(angle * Math.PI / 180);
                return speedXY;
            }
            Tools.speedByAngle = speedByAngle;
            function speedXYByAngle(angle, speed) {
                const speedXY = { x: 0, y: 0 };
                speedXY.x = speed * Math.cos(angle * Math.PI / 180);
                speedXY.y = speed * Math.sin(angle * Math.PI / 180);
                return speedXY;
            }
            Tools.speedXYByAngle = speedXYByAngle;
            function getRad(degree) {
                return degree / 180 * Math.PI;
            }
            Tools.getRad = getRad;
            function getRoundPos(angle, radius, centerPos) {
                var center = centerPos;
                var radius = radius;
                var hudu = (2 * Math.PI / 360) * angle;
                var X = center.x + Math.sin(hudu) * radius;
                var Y = center.y - Math.cos(hudu) * radius;
                return { x: X, y: Y };
            }
            Tools.getRoundPos = getRoundPos;
            function converteNum(number) {
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
            Tools.converteNum = converteNum;
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
            function dataCompare(url, storageName, propertyName) {
                let dataArr;
                if (Laya.LocalStorage.getJSON(storageName)) {
                    dataArr = JSON.parse(Laya.LocalStorage.getJSON(storageName))[storageName];
                    console.log(storageName + '从本地缓存中获取到数据,将和文件夹的json文件进行对比');
                    try {
                        let dataArr_0 = Laya.loader.getRes(url)['RECORDS'];
                        if (dataArr_0.length >= dataArr.length) {
                            let diffArray = Tools.dataCompareDifferent(dataArr_0, dataArr, propertyName);
                            console.log('两个数据的差值为：', diffArray);
                            Tools.data1AddToData2(dataArr, diffArray);
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
            Tools.dataCompare = dataCompare;
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
            function getTaskProperty(ClassName, name, property) {
                let pro = null;
                let arr = getTaskClassArr(ClassName);
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
            Task.getTaskProperty = getTaskProperty;
            function setTaskProperty(ClassName, name, property, value) {
                let arr = getTaskClassArr(ClassName);
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
            Task.setTaskProperty = setTaskProperty;
            function getTaskClassArr(ClassName) {
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
            Task.getTaskClassArr = getTaskClassArr;
            function doDetectionTask(calssName, name, number) {
                if (!number) {
                    number = 1;
                }
                let resCondition = Task.getTaskProperty(calssName, name, Task.TaskProperty.resCondition);
                let condition = Task.getTaskProperty(calssName, name, Task.TaskProperty.condition);
                if (Task.getTaskProperty(calssName, name, Task.TaskProperty.get) !== -1) {
                    if (condition <= resCondition + number) {
                        Task.setTaskProperty(calssName, name, Task.TaskProperty.resCondition, condition);
                        Task.setTaskProperty(calssName, name, Task.TaskProperty.get, 1);
                        if (Task._TaskList) {
                            Task._TaskList.refresh();
                        }
                        return 1;
                    }
                    else {
                        Task.setTaskProperty(calssName, name, Task.TaskProperty.resCondition, resCondition + number);
                        if (Task._TaskList) {
                            Task._TaskList.refresh();
                        }
                        return 0;
                    }
                }
                else {
                    return -1;
                }
            }
            Task.doDetectionTask = doDetectionTask;
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
                    Task.everydayTask = Tools.dataCompare('GameData/Task/everydayTask.json', TaskClass.everyday, TaskProperty.name);
                    console.log('是同一天！，继续每日任务');
                }
            }
            Task.initTask = initTask;
            class TaskScene extends Admin.Scene {
                lwgOnAwake() {
                    this.initData();
                    this.taskOnAwake();
                }
                initData() {
                    Task._TaskTap = this.self['TaskTap'];
                    Task._TaskList = this.self['TaskList'];
                    Task.TaskClassArr = [Task.everydayTask];
                }
                lwgEventReg() {
                    this.taskEventReg();
                }
                taskEventReg() { }
                taskOnAwake() { }
                lwgNodeDec() {
                    this.taskNodeDec();
                }
                taskNodeDec() { }
                lwgOnEnable() {
                    this.taskTap_Create();
                    this.taskList_Create();
                    this.taskOnEnable();
                }
                taskOnEnable() {
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
                lwgOnDisable() {
                    this.taskOnDisable();
                }
                taskOnDisable() {
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
            function getGoodsProperty(goodsClass, name, property) {
                let pro = null;
                let arr = getGoodsClassArr(goodsClass);
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
            Shop.getGoodsProperty = getGoodsProperty;
            function setGoodsProperty(goodsClass, name, property, value) {
                let arr = getGoodsClassArr(goodsClass);
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
            Shop.setGoodsProperty = setGoodsProperty;
            function getHaveArr(goodsClass) {
                let arr = getGoodsClassArr(goodsClass);
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
                let arr = getGoodsClassArr(goodsClass);
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
                let arr = getGoodsClassArr(goodsClass);
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
            function getGoodsClassArr(goodsClass) {
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
            Shop.getGoodsClassArr = getGoodsClassArr;
            function buyGoods(calssName, name, number) {
                if (!number) {
                    number = 1;
                }
                let resCondition = getGoodsProperty(calssName, name, GoodsProperty.resCondition);
                let condition = getGoodsProperty(calssName, name, GoodsProperty.condition);
                let have = getGoodsProperty(calssName, name, GoodsProperty.have);
                if (have !== true && have !== null) {
                    if (condition <= resCondition + number) {
                        setGoodsProperty(calssName, name, GoodsProperty.resCondition, condition);
                        setGoodsProperty(calssName, name, GoodsProperty.have, true);
                        if (Shop._ShopList) {
                            Shop._ShopList.refresh();
                        }
                        return 1;
                    }
                    else {
                        setGoodsProperty(calssName, name, GoodsProperty.resCondition, resCondition + number);
                        if (Shop._ShopList) {
                            Shop._ShopList.refresh();
                        }
                        return 0;
                    }
                }
                else {
                    return -1;
                }
            }
            Shop.buyGoods = buyGoods;
            function initShop() {
                Shop.allSkin = Tools.dataCompare('GameData/Shop/Skin.json', GoodsClass.Skin, GoodsProperty.name);
                Shop.allProps = Tools.dataCompare('GameData/Shop/Props.json', GoodsClass.Props, GoodsProperty.name);
                Shop.allOther = Tools.dataCompare('GameData/Shop/Other.json', GoodsClass.Other, GoodsProperty.name);
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
                lwgOnAwake() {
                    this.initData();
                    this.shopOnAwake();
                }
                initData() {
                    Shop._ShopTap = this.self['MyTap'];
                    Shop._ShopList = this.self['MyList'];
                    if (!Shop.allSkin) {
                        Shop.allSkin = Tools.dataCompare('GameData/Shop/Skin.json', GoodsClass.Skin, GoodsProperty.name);
                    }
                    if (!Shop.allProps) {
                        Shop.allProps = Tools.dataCompare('GameData/Shop/Props.json', GoodsClass.Props, GoodsProperty.name);
                    }
                    if (!Shop.allOther) {
                        Shop.allOther = Tools.dataCompare('GameData/Shop/Other.json', GoodsClass.Other, GoodsProperty.name);
                    }
                    Shop.goodsClassArr = [Shop.allSkin, Shop.allProps, Shop.allOther];
                    Shop.classWarehouse = [GoodsClass.Skin, GoodsClass.Props, GoodsClass.Skin];
                }
                lwgEventReg() {
                    this.shopEventReg();
                }
                shopEventReg() { }
                shopOnAwake() { }
                lwgNodeDec() {
                    this.shopNodeDec();
                }
                shopNodeDec() { }
                lwgOnEnable() {
                    this.myList_Create();
                    this.myTap_Create();
                    this.shopOnEnable();
                }
                shopOnEnable() { }
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
                lwgOnDisable() {
                    this.shopOnDisable();
                }
                shopOnDisable() {
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
            function getBoxProperty(name, property) {
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
            VictoryBox.getBoxProperty = getBoxProperty;
            function setBoxProperty(name, property, value) {
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
            VictoryBox.setBoxProperty = setBoxProperty;
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
                lwgOnAwake() {
                    this.initData();
                    this.victoryBoxOnAwake();
                }
                initData() {
                    VictoryBox._BoxList = this.self['BoxList'];
                    VictoryBox._BoxArray = Tools.objArray_Copy(Laya.loader.getRes("GameData/VictoryBox/VictoryBox.json")['RECORDS']);
                    VictoryBox._selectBox = null;
                    VictoryBox._defaultOpenNum = 3;
                    VictoryBox._openVictoryBoxNum++;
                    VictoryBox._adsMaxOpenNum = 6;
                    VictoryBox._alreadyOpenNum = 0;
                }
                victoryBoxOnAwake() { }
                lwgOnEnable() {
                    this.boxList_Create();
                    this.victoryBoxOnEnable();
                }
                victoryBoxOnEnable() { }
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
                lwgNodeDec() {
                    this.victoryBoxNodeDec();
                }
                victoryBoxNodeDec() { }
                lwgBtnClick() {
                    this.victoryBoxBtnClick();
                }
                victoryBoxBtnClick() { }
                lwgEventReg() {
                    this.victoryBoxEventReg();
                }
                victoryBoxEventReg() { }
                lwgOnDisable() {
                    this.victoryBoxOnDisable();
                }
                victoryBoxOnDisable() { }
                lwgOnUpdate() {
                    this.victoryOnUpdate();
                }
                victoryOnUpdate() { }
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
            function getCheckProperty(name, property) {
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
            CheckIn.getCheckProperty = getCheckProperty;
            function setCheckProperty(className, name, property, value) {
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
            CheckIn.setCheckProperty = setCheckProperty;
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
                setCheckProperty(CheckClass.chek_7Days, 'day' + CheckIn._checkInNum.number, CheckProPerty.checkInState, true);
                let rewardNum = getCheckProperty('day' + CheckIn._checkInNum.number, CheckProPerty.rewardNum);
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
                lwgOnAwake() {
                    this.initData();
                    this.checkInOnAwake();
                }
                initData() {
                    CheckIn._checkList = this.self['CheckList'];
                    CheckIn._checkArray = Tools.dataCompare('GameData/CheckIn/CheckIn.json', CheckClass.chek_7Days, CheckProPerty.name);
                }
                checkInOnAwake() { }
                lwgOnEnable() {
                    this.checkList_Create();
                    this.checkInOnEnable();
                }
                checkInOnEnable() { }
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
                lwgNodeDec() {
                    this.checkInNodeDec();
                }
                checkInNodeDec() { }
                lwgBtnClick() {
                    this.checkInBtnClick();
                }
                checkInBtnClick() { }
                lwgEventReg() {
                    this.checkInEventReg();
                }
                checkInEventReg() { }
                lwgOnDisable() {
                    this.checkInOnDisable();
                }
                checkInOnDisable() { }
                lwgOnUpdate() {
                    this.checkInOnUpdate();
                }
                checkInOnUpdate() { }
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
                lwgOnAwake() {
                    this.initData();
                    this.skinXDOnAwake();
                }
                initData() {
                    SkinXD._needAdsNum = 3;
                }
                skinXDOnAwake() { }
                lwgAdaptive() {
                    this.skinXDAdaptive();
                }
                skinXDAdaptive() { }
                ;
                lwgOnEnable() {
                    this.skinXDOnEnable();
                }
                skinXDOnEnable() { }
                lwgNodeDec() {
                    this.skinXDNodeDec();
                }
                skinXDNodeDec() { }
                lwgBtnClick() {
                    this.skinXDBtnClick();
                }
                skinXDBtnClick() { }
                lwgEventReg() {
                    this.skinXDEventReg();
                }
                skinXDEventReg() { }
                lwgOnDisable() {
                    this.skinXDOnDisable();
                }
                skinXDOnDisable() { }
                lwgOnUpdate() {
                    this.skinXDOnUpdate();
                }
                skinXDOnUpdate() { }
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
                lwgOnAwake() {
                    this.initData();
                    this.skinOnAwake();
                }
                initData() {
                    Skin._SkinTap = this.self['SkinTap'];
                    Skin._SkinList = this.self['SkinList'];
                    Skin._skinClassArr = [Skin._eyeSkinArr, Skin._headSkinArr];
                }
                lwgEventReg() {
                    this.skinEventReg();
                }
                skinEventReg() { }
                skinOnAwake() { }
                lwgNodeDec() {
                    this.skinNodeDec();
                }
                skinNodeDec() { }
                lwgOnEnable() {
                    this.skinList_Create();
                    this.skinTap_Create();
                    this.skinOnEnable();
                }
                skinOnEnable() { }
                lwgOpenAni() { return this.skinOpenAin(); }
                skinOpenAin() { return 0; }
                lwgBtnClick() { this.skinBtnClick(); }
                skinBtnClick() { }
                ;
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
                lwgOnDisable() {
                    this.skinOnDisable();
                }
                skinOnDisable() {
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
                EasterEgg._easterEgg_1Arr = Tools.dataCompare("GameData/EasterEgg/EasterEgg.json", Classify.EasterEgg_01, Property.name);
                Laya.loader.getRes("GameData/EasterEgg/EasterEgg.json")['RECORDS'];
            }
            EasterEgg.initEasterEgg = initEasterEgg;
            function getProperty(classify, name, property) {
                let pro = null;
                let arr = getClassify(classify);
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
                let arr = getClassify(classify);
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
            function getTaskProperty(classify, name, property) {
                let pro = null;
                let arr = getClassify(classify);
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
            EasterEgg.getTaskProperty = getTaskProperty;
            function getClassify(classify) {
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
            EasterEgg.getClassify = getClassify;
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
                        return 1;
                    }
                    else {
                        setProperty(classify, name, Property.resCondition, resCondition + number);
                        return 0;
                    }
                }
                else {
                    return 1;
                }
            }
            EasterEgg.doDetection = doDetection;
            function detectAllTasks(classify) {
                let num = 1;
                let arr = getClassify(classify);
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
                lwgOnAwake() {
                    this.easterEggInitData();
                    this.easterEggOnAwake();
                }
                easterEggInitData() { }
                lwgEventReg() { this.easterEggEventReg(); }
                easterEggEventReg() { }
                easterEggOnAwake() { }
                lwgNodeDec() { this.easterEggNodeDec(); }
                easterEggNodeDec() { }
                lwgOnEnable() { this.easterEggOnEnable(); }
                easterEggOnEnable() { }
                lwgOpenAni() { return this.easterEggOpenAin(); }
                easterEggOpenAin() { return 0; }
                lwgBtnClick() { this.easterEggBtnClick(); }
                easterEggBtnClick() { }
                ;
                lwgOnUpdate() { this.easterEggOnUpdate(); }
                easterEggOnUpdate() { }
                lwgOnDisable() { this.easterEggOnDisable(); }
                easterEggOnDisable() { }
            }
            EasterEgg.EasterEggScene = EasterEggScene;
        })(EasterEgg = lwg.EasterEgg || (lwg.EasterEgg = {}));
        let Loding;
        (function (Loding) {
            Loding.lodingList_3DScene = [];
            Loding.lodingList_3DPrefab = [];
            Loding.lodingList_3DMesh = [];
            Loding.lodingList_3DBaseMaterial = [];
            Loding.lodingList_3DTexture2D = [];
            Loding.lodingList_2D = [];
            Loding.lodingList_Json = [];
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
            class LodeScene extends Admin.Scene {
                lwgOnAwake() {
                    this.lodingResList();
                }
                lodingResList() { }
                lwgEventReg() {
                    EventAdmin.reg(LodingType.loding, this, () => { this.lodingRule(); });
                    EventAdmin.reg(LodingType.complete, this, () => { this.lodingComplete(); this.lwgInterior(); this.lodingTaskEventReg(); });
                    EventAdmin.reg(LodingType.progress, this, (skip) => {
                        Loding.currentProgress.value++;
                        if (Loding.currentProgress.value < Loding.sumProgress) {
                            console.log('当前进度条进度为:', Loding.currentProgress.value / Loding.sumProgress);
                            this.lodingPhaseComplete();
                        }
                    });
                }
                lwgOnEnable() {
                    Loding.loadOrder = [Loding.lodingList_2D, Loding.lodingList_3DScene, Loding.lodingList_3DPrefab, Loding.lodingList_Json];
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
                        case Loding.lodingList_2D:
                            Laya.loader.load(Loding.lodingList_2D[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX2D资源' + Loding.lodingList_2D[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('2D资源' + Loding.lodingList_2D[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.lodingList_3DScene:
                            Laya.Scene3D.load(Loding.lodingList_3DScene[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX3D场景' + Loding.lodingList_3DScene[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('3D场景' + Loding.lodingList_3DScene[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.lodingList_3DPrefab:
                            Laya.Sprite3D.load(Loding.lodingList_3DPrefab[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX3D预设体' + Loding.lodingList_3DPrefab[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('3D场景' + Loding.lodingList_3DPrefab[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }));
                            break;
                        case Loding.lodingList_Json:
                            Laya.loader.load(Loding.lodingList_Json[index], Laya.Handler.create(this, (any) => {
                                if (any == null) {
                                    console.log('XXXXXXXXXXX数据表' + Loding.lodingList_Json[index] + '加载失败！不会停止加载进程！', '数组下标为：', index, 'XXXXXXXXXXX');
                                }
                                else {
                                    console.log('数据表' + Loding.lodingList_Json[index] + '加载完成！', '数组下标为：', index);
                                }
                                EventAdmin.notify(LodingType.progress);
                            }), null, Laya.Loader.JSON);
                            break;
                        default:
                            break;
                    }
                }
                lodingPhaseComplete() { }
                lwgInterior() {
                }
                lodingTaskEventReg() {
                }
                lodingComplete() { }
            }
            Loding.LodeScene = LodeScene;
        })(Loding = lwg.Loding || (lwg.Loding = {}));
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
    let Gold = lwg.Gold;
    let Click = lwg.Click;
    let EventAdmin = lwg.EventAdmin;
    let Tools = lwg.Tools;
    let Effects = lwg.Effects;
    let PalyAudio = lwg.PalyAudio;
    let Setting = lwg.Setting;
    let Dialog = lwg.Dialog;
    let Animation2D = lwg.Animation2D;
    let Animation3D = lwg.Animation3D;
    let Loding = lwg.Loding;
    let LodeScene = lwg.Loding.LodeScene;
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
    let Tomato = lwg.Tomato;

    class UIADSHint extends Admin.Scene {
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
        checkInNodeDec() {
            if (CheckIn._lastCheckDate.date == (new Date).getDate()) {
                this.self['WeChat'].visible = false;
                this.self['OPPO'].visible = false;
            }
            else {
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
        checkInOnEnable() {
            ADManager.TAPoint(TaT.BtnShow, 'AD3award');
            Setting.setBtnVinish();
            let ChinkTip = this.self['BtnSeven'].getChildByName('ChinkTip');
            ChinkTip.visible = false;
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
                Pic_Board.skin = 'UI/Common/kuang1.png';
            }
            else {
                Pic_Gold.visible = true;
                Num.visible = true;
                Num.text = dataSource[CheckIn.CheckProPerty.rewardNum];
                ChinkTip.visible = false;
                Pic_Board.skin = 'UI/Common/kuang2.png';
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
        checkInBtnClick() {
            lwg.Click.on('largen', this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
            lwg.Click.on('largen', this.self['BtnThreeGet_WeChat'], this, null, null, this.btnThreeGetUp);
            lwg.Click.on(Click.Type.noEffect, this.self['Select_WeChat'], this, null, null, this.btnSelectUp);
            lwg.Click.on(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
            lwg.Click.on(Click.Type.largen, this.self['BtnThreeGet_OPPO'], this, null, null, this.btnThreeGetUp);
            lwg.Click.on('largen', this.self['BtnBack'], this, null, null, this.btnBackUp);
        }
        btnOffClick() {
            lwg.Click.off('largen', this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
            lwg.Click.off('largen', this.self['BtnThreeGet_WeChat'], this, null, null, this.btnThreeGetUp);
            lwg.Click.off(Click.Type.noEffect, this.self['Select_WeChat'], this, null, null, this.btnSelectUp);
            lwg.Click.off(Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
            lwg.Click.off(Click.Type.largen, this.self['BtnThreeGet_OPPO'], this, null, null, this.btnThreeGetUp);
            lwg.Click.off('largen', this.self['BtnBack'], this, null, null, this.btnBackUp);
        }
        btnBackUp() {
            this.self.close();
        }
        btnThreeGetUp() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'AD3award');
                this.btnGetUpFunc(3);
            });
        }
        btnGetUp() {
            if (Game._platform === Game._platformTpye.Bytedance) {
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
            this.btnOffClick();
            let index = CheckIn._checkInNum.number;
            let target;
            if (index < 6) {
                target = CheckIn._checkList.getCell(index);
            }
            else {
                target = this.self['BtnSeven'];
            }
            Animation2D.swell_shrink(target, 1, 1.1, 100, 0, () => {
                let arr = [[111, 191], [296, 191], [486, 191], [111, 394], [296, 394], [486, 394], [306, 597
                    ]];
                Effects.createExplosion_Rotate(this.self['SceneContent'], 25, arr[index][0], arr[index][1], 'star', 10, 15);
                let rewardNum = CheckIn.todayCheckIn_7Days();
                if (CheckIn._checkInNum.number === 7) {
                    let ChinkTip = this.self['BtnSeven'].getChildByName('ChinkTip');
                    ChinkTip.visible = true;
                    let Num = this.self['BtnSeven'].getChildByName('Num');
                    Num.visible = false;
                    let Pic_Gold = this.self['BtnSeven'].getChildByName('Pic_Gold');
                    Pic_Gold.visible = false;
                    this.self['BtnSeven'].skin = 'UI/Common/kuang1.png';
                }
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Gold.addGold(rewardNum * number);
                    this.self.close();
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
        checkInOnUpdate() {
            if (CheckIn._lastCheckDate.date !== (new Date).getDate()) {
                switch (Game._platform) {
                    case Game._platformTpye.WeChat:
                        if (this.self['Dot'].visible) {
                            this.self['BtnGet_WeChat'].visible = false;
                            this.self['BtnThreeGet_WeChat'].visible = true;
                        }
                        else {
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
        checkInOnDisable() {
            Setting.setBtnAppear();
        }
    }

    var Global;
    (function (Global) {
        let GEnum;
        (function (GEnum) {
            let TaskType;
            (function (TaskType) {
                TaskType["HairParent"] = "HairParent";
                TaskType["LeftBeard"] = "LeftBeard";
                TaskType["RightBeard"] = "RightBeard";
                TaskType["MiddleBeard"] = "MiddleBeard";
                TaskType["UpLeftBeard"] = "UpLeftBeard";
                TaskType["UpRightBeard"] = "UpRightBeard";
                TaskType["movePhotoLocation"] = "movePhotoLocation";
            })(TaskType = GEnum.TaskType || (GEnum.TaskType = {}));
            let RazorState;
            (function (RazorState) {
                RazorState["move"] = "move";
            })(RazorState = GEnum.RazorState || (GEnum.RazorState = {}));
            let EventType;
            (function (EventType) {
                EventType["HairParent"] = "HairParent";
                EventType["LeftBeard"] = "LeftBeard";
                EventType["RightBeard"] = "RightBeard";
                EventType["MiddleBeard"] = "MiddleBeard";
                EventType["UpLeftBeard"] = "UpLeftBeard";
                EventType["UpRightBeard"] = "UpRightBeard";
                EventType["taskProgress"] = "taskProgress";
                EventType["cameraMove"] = "cameraMove";
                EventType["changeProp"] = "changeProp";
                EventType["changeOther"] = "changeOther";
                EventType["changeHeadDecoration"] = " changeHeadDecoration";
                EventType["changeEyeDecoration"] = " changeEyeDecoration";
                EventType["changeTrySkin"] = "changeTrySkin";
                EventType["goBack"] = "goBack";
                EventType["lianHong"] = "lianHong";
            })(EventType = GEnum.EventType || (GEnum.EventType = {}));
        })(GEnum = Global.GEnum || (Global.GEnum = {}));
        let GVariate;
        (function (GVariate) {
            GVariate._firstTask = null;
            GVariate._stageClick = false;
            GVariate._taskArr = [];
            GVariate._taskNum = 0;
        })(GVariate = Global.GVariate || (Global.GVariate = {}));
        let GSene3D;
        (function (GSene3D) {
            GSene3D.LevelFpos = new Laya.Vector3();
            GSene3D.razorFPos = new Laya.Vector3();
            GSene3D.knifeParentFPos = new Laya.Vector3();
            GSene3D.headFPos = new Laya.Vector3();
        })(GSene3D = Global.GSene3D || (Global.GSene3D = {}));
    })(Global || (Global = {}));
    let GVariate = Global.GVariate;
    let GEnum = Global.GEnum;
    let GSene3D = Global.GSene3D;

    class UIDefeated extends lwg.Admin.Scene {
        lwgOnAwake() {
            Admin._gameStart = false;
        }
        lwgNodeDec() {
            this.self['BtnSelect_WeChat'].visible = true;
            this.self['BtnAgain_WeChat'].visible = false;
            this.self['Dot_WeChat'].visible = true;
        }
        lwgOnEnable() {
            ADManager.TAPoint(TaT.LevelFail, 'level' + Game._gameLevel.value);
            ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
            ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');
            Setting.setBtnAppear();
            PalyAudio.playDefeatedSound();
            switch (Game._platform) {
                case Game._platformTpye.OPPO:
                    this.self['OPPO'].visible = true;
                    this.self['WeChat'].visible = false;
                    this.self['Bytedance'].visible = false;
                    this.self['P202'].removeSelf();
                    break;
                case Game._platformTpye.WeChat:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = true;
                    this.self['Bytedance'].visible = false;
                    this.self['P202'].removeSelf();
                    break;
                case Game._platformTpye.Bytedance:
                    this.self['OPPO'].visible = false;
                    this.self['WeChat'].visible = false;
                    this.self['Bytedance'].visible = true;
                default:
                    break;
            }
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
            Click.on(Click.Type.largen, this.self['BtnNext_WeChat'], this, null, null, this.btnNextUp);
            Click.on(Click.Type.largen, this.self['BtnSelect_WeChat'], this, null, null, this.btnSelectUp);
            Click.on(Click.Type.largen, this.self['BtnAgain_OPPO'], this, null, null, this.btnAgainUp);
            Click.on(Click.Type.largen, this.self['BtnNext_OPPO'], this, null, null, this.btnNextUp);
            Click.on(Click.Type.largen, this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
            Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNextUp);
            Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
        }
        btnSelectUp() {
            let Dot;
            switch (Game._platform) {
                case Game._platformTpye.WeChat:
                    Dot = this.self['Dot_WeChat'];
                    break;
                case Game._platformTpye.Bytedance:
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
            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
            Admin._openScene(Admin.SceneName.UIStart, null, this.self);
        }
        btnNextUp() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'ADnextbt_fail');
                Game._gameLevel.value += 1;
                EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
                Admin._openScene(Admin.SceneName.UIStart, null, this.self);
            });
        }
        lwgOnDisable() {
            EventAdmin.notify(GEnum.EventType.goBack);
        }
    }

    class UIEasterEgg extends EasterEgg.EasterEggScene {
        constructor() {
            super(...arguments);
            this.clickNum = 0;
            this.clickSwitch = false;
            this.clickTime = 0;
        }
        easterEggOnAwake() {
            ADManager.TAPoint(TaT.BtnShow, 'power');
            ADManager.TAPoint(TaT.BtnShow, 'Adtips');
            Setting.setBtnVinish();
            Gold.goldVinish();
            this.initDisplay();
            EasterEgg._easterEgg_1.value = true;
        }
        initDisplay() {
            for (let index = 0; index < EasterEgg._easterEgg_1Arr.length; index++) {
                const element = EasterEgg._easterEgg_1Arr[index];
                let name = 'Complete' + (index + 1);
                let complete = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.complete);
                if (complete) {
                    this.self[name].skin = 'UI/EasterEgg_Aotoman/Task/wancheng.png';
                }
                else {
                    this.self[name].skin = 'UI/EasterEgg_Aotoman/Task/wancheng2.png';
                }
                let assemblyName = 'Assembly' + (index + 1);
                let Num = this.self[assemblyName].getChildByName('Num');
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
                                });
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
        easterEggBtnClick() {
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
                });
            });
            Click.on(Click.Type.largen, this.self['BtnHint'], this, null, null, () => {
                ADManager.ShowReward(() => {
                    ADManager.TAPoint(TaT.BtnClick, 'Adtips');
                    this.self['DialogHint'].x = 0;
                });
            });
            Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, () => {
                this.self['DialogHint'].x = -800;
            });
        }
        ;
        clickStraight() {
            if (this.clickSwitch) {
                this.clickTime++;
                if (this.clickTime >= 60) {
                    this.clickSwitch = false;
                    this.clickNum = 0;
                }
                else {
                    if (this.clickNum >= 5) {
                        this.self['DialogAssembly4'].x = 0;
                        this.clickSwitch = false;
                        this.clickNum = 0;
                    }
                }
            }
            else {
                this.clickTime = 0;
            }
        }
        easterEggOnUpdate() {
            this.clickStraight();
        }
        easterEggOnDisable() {
            Setting.setBtnAppear();
            Gold.goldAppear();
            EventAdmin.notify(EasterEgg.EventType.trigger);
        }
    }

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

    class GameMain3D_Blade extends lwg3D.Object3D {
        lwgOnEnable() {
        }
        onTriggerEnter(other) {
            if (!lwg.Admin._gameStart) {
                return;
            }
            let otherOwner = other.owner;
            let otherOwnerParent = otherOwner.parent;
            switch (otherOwner.name) {
                case 'Hairline':
                    let length = otherOwnerParent.transform.localScaleY * 2 * otherOwner.transform.localScaleY;
                    let HairlineH = lwg.Tools.dotRotateXY(otherOwnerParent.transform.position.x, otherOwnerParent.transform.position.y, otherOwnerParent.transform.position.x, otherOwnerParent.transform.position.y + length, otherOwnerParent.transform.localRotationEulerZ).y - otherOwnerParent.transform.position.y;
                    let diffY = Math.abs((this.selfTransform.position.y - this.self.transform.localScaleY / 2) - otherOwnerParent.transform.position.y);
                    let cutH = HairlineH - diffY;
                    let cutRatio = cutH / HairlineH;
                    otherOwnerParent.transform.localScaleY -= otherOwnerParent.transform.localScaleY * cutRatio;
                    if (otherOwnerParent['HairLen']) {
                        otherOwnerParent['HairLen'].setValue = otherOwnerParent.transform.localScaleY;
                    }
                    if (Math.floor(Math.random() * 4) === 1) {
                        if (cutH >= 0.01) {
                            let cutHair = otherOwnerParent.clone();
                            cutHair.transform.localScaleY = cutHair.transform.localScaleY * cutRatio;
                            let CutHairParent = GSene3D.Level.getChildByName('CutHairParent');
                            cutHair.name = 'cutHair';
                            CutHairParent.addChild(cutHair);
                            cutHair.transform.position = this.self.transform.position;
                            let cutHairline = cutHair.getChildAt(0);
                            cutHairline.name = 'cutHairline';
                            let rig3D = cutHairline.getComponent(Laya.Rigidbody3D);
                            rig3D.isKinematic = false;
                            rig3D.isTrigger = true;
                            rig3D.gravity = (new Laya.Vector3(0, -20, 0));
                            rig3D.rollingFriction = 0;
                            rig3D.restitution = 0;
                            Laya.timer.once(3000, this, f => { cutHair.removeSelf(); });
                        }
                    }
                    break;
                case 'standard':
                    console.log('碰到线了，游戏失败！');
                    EventAdmin.notify(GEnum.EventType.lianHong);
                    Laya.timer.frameOnce(90, this, () => {
                        EventAdmin.notify(EventAdmin.EventType.resurgence);
                    });
                    break;
                default:
                    break;
            }
        }
        lwgOnUpdate() {
            if (this.self.name === 'dianjupian') {
                this.self.transform.localRotationEulerZ += 3;
            }
        }
    }

    class GameMain3D_Razor extends lwg3D.Scene3D {
        lwgOnEnable() {
            let Blade = this.self.getChildByName('Blade');
            Blade.addComponent(GameMain3D_Blade);
        }
    }

    class GameMain3D_Floor extends lwg3D.Object3D {
        lwgOnEnable() {
            this.rig3D.restitution = 0;
        }
        onTriggerEnter(other) {
            let owner = other.owner;
            switch (owner.name) {
                case 'Beard':
                    break;
                case 'cutHairline':
                    owner.parent.removeSelf();
                    break;
                default:
                    break;
            }
        }
    }

    class GameMain3D_knife extends lwg3D.Scene3D {
        onTriggerEnter(other) {
            let owner = other.owner;
            let ownerParent = owner.parent;
            switch (owner.name.substring(0, 5)) {
                case 'Beard':
                    if (owner['already']) {
                        return;
                    }
                    else {
                        owner['already'] = true;
                    }
                    if (ownerParent.name === 'RightBeard') {
                        EventAdmin.notify(GEnum.EventType.RightBeard);
                    }
                    else if (ownerParent.name === 'LeftBeard') {
                        EventAdmin.notify(GEnum.EventType.LeftBeard);
                    }
                    else if (ownerParent.name === 'MiddleBeard') {
                        EventAdmin.notify(GEnum.EventType.MiddleBeard);
                    }
                    else if (ownerParent.name === 'UpRightBeard') {
                        EventAdmin.notify(GEnum.EventType.UpRightBeard);
                    }
                    else if (ownerParent.name === 'UpLeftBeard') {
                        EventAdmin.notify(GEnum.EventType.UpLeftBeard);
                    }
                    other.isKinematic = false;
                    other.isTrigger = false;
                    other.linearVelocity = new Laya.Vector3(0, -3, 0);
                    break;
                default:
                    break;
            }
        }
    }

    class GameMain3D_Dianjupian extends lwg3D.Object3D {
        lwgOnUpdate() {
            if (this.self.name === 'dianjupian') {
                this.self.transform.localRotationEulerZ -= 7;
            }
        }
    }

    class GameMain3D extends lwg3D.Scene3D {
        constructor() {
            super();
            this.moveSpeed = 1000;
        }
        lwgOnAwake() {
            GSene3D.GameMain3D = this.self;
            GSene3D.MainCamera = this.MainCamera;
            GSene3D.PhotoCameraMark = this.self.getChildByName('PhotoCameraMark');
            GSene3D.LevelParent_Mark = this.self.getChildByName('LevelParent_Mark');
            GSene3D.LevelParent = Laya.loader.getRes("3DPrefab/LayaScene_SampleScene/Conventional/LevelParent.lh");
            this.self.addChild(GSene3D.LevelParent);
            GSene3D.LevelParent.transform.position = GSene3D.LevelParent_Mark.transform.position;
            for (let index = 0; index < GSene3D.LevelParent.numChildren; index++) {
                const element = GSene3D.LevelParent.getChildAt(index);
                element.active = false;
            }
            GSene3D.Landmark_Side = this.self.getChildByName('Landmark_Side');
            GSene3D.Landmark_Right = this.self.getChildByName('Landmark_Right');
            GSene3D.Landmark_Middle = this.self.getChildByName('Landmark_Middle');
            GSene3D.Landmark_Left = this.self.getChildByName('Landmark_Left');
            GSene3D.Landmark_UpRight = this.self.getChildByName('Landmark_UpRight');
            GSene3D.Landmark_UpLeft = this.self.getChildByName('Landmark_UpLeft');
            GSene3D.LeftSignknife = this.self.getChildByName('LeftSignknife');
            GSene3D.MiddleSignknife = this.self.getChildByName('MiddleSignknife');
            GSene3D.RightSignknife = this.self.getChildByName('RightSignknife');
            GSene3D.UpRightKnife = this.self.getChildByName('UpRightKnife');
            GSene3D.UpLeftKnife = this.self.getChildByName('UpLeftKnife');
            GSene3D.Floor = this.self.getChildByName('Floor');
            GSene3D.Razor = this.self.getChildByName('Razor');
            GSene3D.razorFPos.x = GSene3D.Razor.transform.position.x;
            GSene3D.razorFPos.y = GSene3D.Razor.transform.position.y;
            GSene3D.razorFPos.z = GSene3D.Razor.transform.position.z;
            GSene3D.knifeParent = this.self.getChildByName('knifeParent');
            GSene3D.knife = GSene3D.knifeParent.getChildByName('tixudao');
            GSene3D.Role = this.self.getChildByName('Role');
            GSene3D.TouchScreen = this.self.getChildByName('TouchScreen');
            GSene3D.Headcollision = GSene3D.Role.getChildByName('Headcollision');
            let TouchHeadRig = GSene3D.Headcollision.getComponent(Laya.Rigidbody3D);
            TouchHeadRig.restitution = 0;
            GSene3D.HeadSimulate = GSene3D.Role.getChildByName('HeadSimulate');
            GSene3D.HingeMiddle = GSene3D.Headcollision.getChildByName('HingeMiddle');
            GSene3D.HingeUp = GSene3D.Headcollision.getChildByName('HingeUp');
            GSene3D.HingeDown = GSene3D.Headcollision.getChildByName('HingeDown');
            GSene3D.HeadDecoration = this.self.getChildByName('HeadDecoration');
            GSene3D.EyeDecoration = this.self.getChildByName('EyeDecoration');
            GSene3D.DressUpMark = this.self.getChildByName('DressUpMark');
        }
        lwgEventReg() {
            EventAdmin.reg(EventAdmin.EventType.scene3DRefresh, this, () => {
                this.getLevelContent();
            });
            EventAdmin.reg(GEnum.EventType.cameraMove, this, (direction) => {
                this.cameraMove(direction);
            });
            EventAdmin.reg(EventAdmin.EventType.scene3DResurgence, this, () => {
                GSene3D.Razor.transform.position = GSene3D.razorFPos;
            });
            EventAdmin.reg(GEnum.EventType.changeEyeDecoration, this, () => {
                console.log('换眼部装饰');
                for (let index = 0; index < GSene3D.EyeDecoration.numChildren; index++) {
                    const element = GSene3D.EyeDecoration.getChildAt(index);
                    if (element.name == Skin._currentEye.name) {
                        element.active = true;
                    }
                    else {
                        element.active = false;
                    }
                }
            });
            EventAdmin.reg(GEnum.EventType.changeProp, this, () => {
                console.log('换理发刀');
                let name;
                for (let index = 0; index < GSene3D.Razor.numChildren; index++) {
                    const element = GSene3D.Razor.getChildAt(index);
                    if (element.name !== 'Blade') {
                        if (element.name !== Shop._currentProp.name) {
                            element.active = false;
                        }
                        else {
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
            EventAdmin.reg(GEnum.EventType.changeOther, this, () => {
                for (let index = 0; index < GSene3D.knifeParent.numChildren; index++) {
                    const element = GSene3D.knifeParent.getChildAt(index);
                    if (element.name == Shop._currentOther.name) {
                        element.active = true;
                        GSene3D.knife = element;
                        let script = GSene3D.knife.getComponent(GameMain3D_knife);
                        if (!script) {
                            GSene3D.knife.addComponent(GameMain3D_knife);
                        }
                    }
                    else {
                        element.active = false;
                    }
                }
                GSene3D.knife.active = false;
            });
            EventAdmin.reg(GEnum.EventType.changeHeadDecoration, this, () => {
                for (let index = 0; index < GSene3D.HeadDecoration.numChildren; index++) {
                    const element = GSene3D.HeadDecoration.getChildAt(index);
                    if (element.name == Skin._currentHead.name) {
                        element.active = true;
                    }
                    else {
                        element.active = false;
                    }
                }
            });
            EventAdmin.reg(GEnum.EventType.changeEyeDecoration, this, () => {
                console.log('换眼部装饰');
                for (let index = 0; index < GSene3D.EyeDecoration.numChildren; index++) {
                    const element = GSene3D.EyeDecoration.getChildAt(index);
                    if (element.name == Skin._currentEye.name) {
                        element.active = true;
                    }
                    else {
                        element.active = false;
                    }
                }
            });
            EventAdmin.reg(GEnum.EventType.changeTrySkin, this, (skinClass, skinName) => {
                console.log(skinClass, skinName);
                let cla;
                if (skinClass == Shop.GoodsClass.Other) {
                    cla = GSene3D.knifeParent;
                }
                else if (skinClass == Shop.GoodsClass.Props) {
                    cla = GSene3D.Razor;
                }
                cla.active = true;
                for (let index = 0; index < cla.numChildren; index++) {
                    const element = cla.getChildAt(index);
                    if (element.name == skinName) {
                        element.active = true;
                        if (skinClass == Shop.GoodsClass.Other) {
                            GSene3D.knife = element;
                        }
                        else if (skinClass == Shop.GoodsClass.Props) {
                            cla = GSene3D.Razor;
                        }
                    }
                    else {
                        if (element.name !== 'Blade') {
                            element.active = false;
                        }
                    }
                }
            });
            EventAdmin.reg(GEnum.EventType.goBack, this, () => {
                GSene3D.MainCamera.transform.position = GSene3D.Landmark_Middle.transform.position;
                GSene3D.MainCamera.transform.localRotationEuler = GSene3D.Landmark_Middle.transform.localRotationEuler;
                GSene3D.TouchScreen.transform.localRotationEuler = GSene3D.Landmark_Middle.transform.localRotationEuler;
            });
            EventAdmin.reg(GEnum.EventType.lianHong, this, () => {
                Admin._gameStart = false;
                let RoleObj = GSene3D.Level.getChildByName('RoleObj');
                let ani = RoleObj.getComponent(Laya.Animator);
                if (ani) {
                    ani.play("touHongclip");
                }
            });
        }
        ;
        lwgOnEnable() {
            GSene3D.Floor.addComponent(GameMain3D_Floor);
            GSene3D.Razor.addComponent(GameMain3D_Razor);
            EventAdmin.notify(GEnum.EventType.changeProp);
            EventAdmin.notify(GEnum.EventType.changeOther);
            this.getLevelContent();
        }
        getLevelContent() {
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
            }
            else {
                index = Game._gameLevel.value;
            }
            GSene3D.Level = LevelParent0.getChildByName('Level' + index);
            if (!GSene3D.Level) {
                console.log('本关卡不存在');
            }
            else {
                GSene3D.Level.active = true;
                GVariate._taskArr = [];
                for (let index = 0; index < GSene3D.Level.numChildren; index++) {
                    const element = GSene3D.Level.getChildAt(index);
                    if (element.name !== 'CutHairParent' && element.name !== 'StandardParent' && element.name !== 'RoleObj') {
                        GVariate._taskArr.push(element.name);
                    }
                }
                GSene3D.HairParent = GSene3D.Level.getChildByName('HairParent');
                GSene3D.LeftBeard = GSene3D.Level.getChildByName('LeftBeard');
                GSene3D.RightBeard = GSene3D.Level.getChildByName('RightBeard');
                GSene3D.MiddleBeard = GSene3D.Level.getChildByName('MiddleBeard');
                GSene3D.UpRightBeard = GSene3D.Level.getChildByName('UpRightBeard');
                GSene3D.UpLeftBeard = GSene3D.Level.getChildByName('UpLeftBeard');
                GSene3D.StandardParent = GSene3D.Level.getChildByName('StandardParent');
                GSene3D.Razor.transform.position = GSene3D.razorFPos;
                this.knifeTimeDisplay();
            }
        }
        knifeTimeDisplay(name) {
            if (name === 'k') {
                GSene3D.knife.active = true;
                if (GSene3D.StandardParent) {
                    GSene3D.StandardParent.active = false;
                }
                GSene3D.Razor.active = false;
            }
            else if (name === 'r') {
                GSene3D.knife.active = false;
                if (GSene3D.StandardParent) {
                    GSene3D.StandardParent.active = true;
                }
                GSene3D.Razor.active = true;
                console.log('剃刀出现');
            }
            else if (!name) {
                GSene3D.knife.active = false;
                if (GSene3D.StandardParent) {
                    GSene3D.StandardParent.active = false;
                }
                GSene3D.Razor.active = false;
            }
        }
        cameraMove(direction) {
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
                    GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0));
                    Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.position, this.moveSpeed, this, null, () => {
                        Admin._gameStart = true;
                        this.knifeTimeDisplay('k');
                    });
                    Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);
                    Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);
                    break;
                case GEnum.TaskType.LeftBeard:
                    GSene3D.knife.transform.position = GSene3D.LeftSignknife.transform.position;
                    GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                    GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0));
                    Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.position, this.moveSpeed, this, null, () => {
                        Admin._gameStart = true;
                        this.knifeTimeDisplay('k');
                    });
                    Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);
                    Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);
                    break;
                case GEnum.TaskType.MiddleBeard:
                    GSene3D.knife.transform.position = GSene3D.MiddleSignknife.transform.position;
                    GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                    GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0));
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
                    let Model2 = GSene3D.knife.getChildAt(0);
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
                    let Model1 = GSene3D.knife.getChildAt(0);
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

    class Init extends Admin.Scene {
        lwgOnAwake() {
            console.log('开始初始化');
            this.gameInit();
            this.shopInit();
            this.skinInit();
            this.taskInit();
            this.easterEggInit();
        }
        gameInit() {
            Game._platform = Game._platformTpye.Bytedance;
        }
        ;
        skinInit() {
            Skin._currentEye.name = null;
            Skin._currentHead.name = null;
        }
        ;
        shopInit() {
            Shop.initShop();
            if (!Shop._currentOther.name) {
                Shop._currentOther.name = 'tixudao';
            }
            if (!Shop._currentProp.name) {
                Shop._currentProp.name = 'jiandao';
            }
            if (!Shop._currentSkin.name) {
                Shop._currentSkin.name = 'anquanmao';
            }
        }
        ;
        taskInit() {
            Task.initTask();
            EventAdmin.reg(Task.EventType.useSkins, Task, () => {
                let num = Shop.setUseSkinType();
                let name = Task.TaskName.每日使用5种皮肤;
                let num1 = Task.getTaskProperty(Task.TaskClass.everyday, name, Task.TaskProperty.resCondition);
                if (num > num1) {
                    Task.doDetectionTask(Task.TaskClass.everyday, name, num - num1);
                }
            });
            EventAdmin.reg(Task.EventType.victory, Task, () => {
                let name = Task.TaskName.每日服务10位客人;
                Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
            });
            EventAdmin.reg(Task.EventType.adsTime, Task, () => {
                let name = Task.TaskName.每日观看两个广告;
                Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
            });
            EventAdmin.reg(Task.EventType.victoryBox, Task, () => {
                let name = Task.TaskName.每日开启10个宝箱;
                Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
            });
        }
        easterEggInit() {
            EasterEgg.initEasterEgg();
            EventAdmin.reg(EasterEgg.EventType.easterEggAds, Task, () => {
                EasterEgg.doDetection(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_3, 1);
            });
        }
    }

    class UILoding extends Loding.LodeScene {
        constructor() {
            super(...arguments);
            this.maskMoveSwitch = true;
            this.shearSpeed = 5;
            this.shearSwitch = true;
        }
        lodingResList() {
            Loding.lodingList_2D = [
                "res/atlas/Frame/Effects.png",
                "res/atlas/Frame/UI.png",
                "res/atlas/UI/GameStart.png",
                "res/atlas/UI/Common.png",
                "res/atlas/UI/Shop/Skin.png",
                "res/atlas/UI/Shop/Props.png",
                "res/atlas/UI/Shop/Other.png",
                "res/atlas/UI/Shop.png",
                "res/atlas/UI/Skin.png",
                "res/atlas/UI/EasterEgg_Aotoman/Congratulation.png",
                "res/atlas/UI/EasterEgg_Aotoman/GameStart.png",
                "res/atlas/UI/EasterEgg_Aotoman/Hint.png",
                "res/atlas/UI/EasterEgg_Aotoman/Unworthy.png",
                "res/atlas/UI/EasterEgg_Aotoman/Task.png",
                "res/atlas/UI/XDSkin.png",
                "res/atlas/UI/Set.png",
                "res/atlas/UI/Task.png",
                "res/atlas/UI/Register.png",
                "res/atlas/UI/Common.png",
            ];
            Loding.lodingList_3DScene = [
                "3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls"
            ];
            Loding.lodingList_3DPrefab = [
                "3DPrefab/LayaScene_SampleScene/Conventional/LevelParent.lh"
            ];
            Loding.lodingList_Json = [
                "GameData/Shop/Other.json",
                "GameData/Shop/Props.json",
                "GameData/Shop/Skin.json",
                'GameData/Task/everydayTask.json',
                "GameData/VictoryBox/VictoryBox.json",
                "GameData/CheckIn/CheckIn.json",
                "GameData/Dialog/Dialog.json",
                "GameData/Game/GameLevel.json",
                "GameData/EasterEgg/EasterEgg.json",
                "Scene/UICheckIn.json",
                "Scene/UIEasterEgg.json",
                "Scene/UIOperation.json",
                "Scene/UISet.json",
                "Scene/UIShop.json",
                "Scene/UISkinXD.json",
                "Scene/UITask.json",
                "Scene/UIADSHint.json",
            ];
            this.shearAni();
        }
        lodingPhaseComplete() {
        }
        lodingComplete() {
            this.self['Mask'].x = 0;
            this.self['Shear'].x = this.self['Mask'].width;
            this.self['Per'].text = 100 + '%';
            this.maskMoveSwitch = false;
            let Scene3D = Laya.loader.getRes("3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls");
            Laya.stage.addChildAt(Scene3D, 0);
            Admin._sceneControl[Admin.SceneName.GameMain3D] = Scene3D;
            Scene3D.addComponent(GameMain3D);
            Laya.timer.once(500, this, () => {
                Gold.createGoldNode(Laya.stage);
                Setting.createSetBtn(65, 104, 47, 54, 'UI/GameStart/shezhi.png', Laya.stage);
                lwg.Admin._openScene(lwg.Admin.SceneName.UIStart, null, this.self);
            });
        }
        lwgInterior() {
            this.self.addComponent(Init);
        }
        lwgAdaptive() {
            this.self['Bg'].y = Laya.stage.height / 2;
            this.self['Logo'].y = Laya.stage.height * 0.174;
            this.self['Progress'].y = Laya.stage.height * 0.827;
            this.self['FCM'].y = Laya.stage.height * 0.910;
        }
        shearAni() {
            Laya.timer.loop(20, this, () => {
                if (this.self['Shear_02'].rotation > 15) {
                    this.self['Shear_02']['dir'] = 'up';
                }
                else if (this.self['Shear_02'].rotation <= 0) {
                    this.self['Shear_02']['dir'] = 'down';
                }
                if (this.self['Shear_02']['dir'] === 'up') {
                    this.self['Shear_02'].rotation -= this.shearSpeed;
                    this.self['Shear_01'].rotation += this.shearSpeed;
                }
                else if (this.self['Shear_02']['dir'] === 'down') {
                    this.self['Shear_02'].rotation += this.shearSpeed;
                    this.self['Shear_01'].rotation -= this.shearSpeed;
                }
            });
        }
        lwgOnUpdate() {
            if (this.maskMoveSwitch) {
                if (this.self['Mask'].x < -20) {
                    this.self['Mask'].x += 3;
                    this.self['Shear'].x += 3;
                    let str = ((-this.self['Mask'].width - this.self['Mask'].x) / -this.self['Mask'].width * 100).toString().substring(0, 2);
                    this.self['Per'].text = str + '%';
                }
            }
        }
        lwgOnDisable() {
            lwg.PalyAudio.playMusic();
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

    class UIOperation extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this._numZoder = [];
            this.residueNum = 10;
            this._HairParentNum = {
                index: 0,
                sum: 0,
                switch: true,
                value: 0,
                set setValue(vals) {
                    this.value = vals;
                    if (this.switch) {
                        let residue = [10, 10, 10, 10, 20, 10, 20, 10, 26, 28];
                        let index;
                        if (Game._gameLevel.value > 10) {
                            index = Game._gameLevel.value % 10 + 1 - 1;
                        }
                        else {
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
            this._leftBeardNum = {
                index: 0,
                sum: 0,
                switch: true,
                value: 0,
                set setValue(vals) {
                    this.value = vals;
                    if (this.switch) {
                        if (this.value <= 10) {
                            console.log('任务完成了！');
                            this.switch = false;
                            EventAdmin.notify(EventAdmin.EventType.taskReach);
                        }
                    }
                    EventAdmin.notify(GEnum.EventType.taskProgress);
                }
            };
            this._rightBeardNum = {
                index: 0,
                sum: 0,
                switch: true,
                value: 0,
                set setValue(vals) {
                    this.value = vals;
                    if (this.switch) {
                        if (this.value <= 10) {
                            console.log('任务完成了！');
                            this.switch = false;
                            EventAdmin.notify(EventAdmin.EventType.taskReach);
                        }
                    }
                    EventAdmin.notify(GEnum.EventType.taskProgress);
                }
            };
            this._middleBeardNum = {
                index: 0,
                sum: 0,
                switch: true,
                value: 0,
                set setValue(vals) {
                    this.value = vals;
                    if (this.switch) {
                        if (this.value <= 10) {
                            console.log('任务完成了！');
                            this.switch = false;
                            EventAdmin.notify(EventAdmin.EventType.taskReach);
                        }
                    }
                    EventAdmin.notify(GEnum.EventType.taskProgress);
                }
            };
            this._upRightBeardNum = {
                index: 0,
                sum: 0,
                switch: true,
                value: 0,
                set setValue(vals) {
                    this.value = vals;
                    if (this.switch) {
                        if (this.value <= 10) {
                            console.log('任务完成了！');
                            this.switch = false;
                            EventAdmin.notify(EventAdmin.EventType.taskReach);
                        }
                    }
                    EventAdmin.notify(GEnum.EventType.taskProgress);
                }
            };
            this._upLeftBeardNum = {
                index: 0,
                sum: 0,
                switch: true,
                value: 0,
                set setValue(vals) {
                    this.value = vals;
                    if (this.switch) {
                        if (this.value <= 10) {
                            console.log('任务完成了！');
                            this.switch = false;
                            EventAdmin.notify(EventAdmin.EventType.taskReach);
                        }
                    }
                    EventAdmin.notify(GEnum.EventType.taskProgress);
                }
            };
            this.touchPosX = null;
            this.touchPosY = null;
            this.moveSwitch = false;
        }
        lwgNodeDec() {
            this.Rocker = this.self['Rocker'];
            this.TaskBar = this.self['TaskBar'];
            this.BtnLast = this.self['BtnLast'];
        }
        lwgOnAwake() {
            GVariate._taskNum = 0;
            Admin._gameStart = true;
            this.createProgress();
            EventAdmin.notify(Task.TaskType.useSkins);
            RecordManager.startAutoRecord();
            ADManager.TAPoint(TaT.LevelStart, 'level' + Game._gameLevel.value);
        }
        lwgOnEnable() {
            this.BtnLast.visible = false;
            this.createTaskContent();
            this.mainCameraMove();
            Dialog.createVoluntarilyDialogue(150, 334, Dialog.UseWhere.scene2, 0, 2000, this.self);
        }
        lwgEventReg() {
            EventAdmin.reg(EventAdmin.EventType.closeOperation, this, () => {
                this.self.close();
            });
            EventAdmin.reg(EventAdmin.EventType.taskReach, this, () => {
                if (Admin._gameStart) {
                    this.BtnLast.visible = true;
                }
            });
            EventAdmin.reg(EventAdmin.EventType.defeated, this, () => {
                if (Admin._gameStart) {
                    Admin._openScene(Admin.SceneName.UIDefeated);
                    Admin._gameStart = false;
                }
            });
            EventAdmin.reg(EventAdmin.EventType.resurgence, this, () => {
                Admin._openScene(Admin.SceneName.UIResurgence);
            });
            EventAdmin.reg(GEnum.EventType.LeftBeard, this, () => {
                this._leftBeardNum.setValue = this._leftBeardNum.value - 1;
            });
            EventAdmin.reg(GEnum.EventType.RightBeard, this, () => {
                this._rightBeardNum.setValue = this._rightBeardNum.value - 1;
            });
            EventAdmin.reg(GEnum.EventType.MiddleBeard, this, () => {
                this._middleBeardNum.setValue = this._middleBeardNum.value - 1;
            });
            EventAdmin.reg(GEnum.EventType.UpRightBeard, this, () => {
                this._upRightBeardNum.setValue = this._upRightBeardNum.value - 1;
            });
            EventAdmin.reg(GEnum.EventType.UpLeftBeard, this, () => {
                this._upLeftBeardNum.setValue = this._upLeftBeardNum.value - 1;
            });
            EventAdmin.reg(GEnum.EventType.taskProgress, this, () => {
                let TaskBar0 = this.TaskBar.getChildAt(GVariate._taskNum);
                let Bar = TaskBar0.getChildByName('Bar');
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
                if (Bar.mask.x > 0) {
                    Bar.mask.x = 0;
                }
            });
        }
        createProgress() {
            this.TaskBar.removeChildren(0, this.TaskBar.numChildren);
            let spacing = 100;
            for (let index = 0; index < GVariate._taskArr.length; index++) {
                const TaskPro = Laya.Pool.getItemByCreateFun('TaskPro', this.TaskProgress.create, this.TaskProgress);
                this.TaskBar.addChild(TaskPro);
                TaskPro.pos(index * spacing, 0);
                let Bar = TaskPro.getChildByName('Bar');
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
        createTaskContent() {
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
        }
        monitorHiarLen() {
            let _HairParentNum = this._HairParentNum;
            for (let index = 0; index < GSene3D.HairParent.numChildren; index++) {
                const element = GSene3D.HairParent.getChildAt(index);
                let len = element.transform.localPositionY;
                element['HairLen'] = {
                    detection: true,
                    value: len,
                    get getValue() {
                        return this.value;
                    },
                    set setValue(v) {
                        if (this.detection) {
                            if (v < 0.19) {
                                this.detection = false;
                                _HairParentNum.setValue = _HairParentNum.value - 1;
                            }
                            this.value = v;
                        }
                    }
                };
            }
        }
        mainCameraMove() {
            if (GVariate._taskNum > GVariate._taskArr.length) {
                return;
            }
            EventAdmin.notify(GEnum.EventType.cameraMove, GVariate._taskArr[GVariate._taskNum]);
        }
        lwgBtnClick() {
            lwg.Click.on(Click.Type.largen, this.BtnLast, this, null, null, this.btnLastUp, null);
        }
        btnLastUp(e) {
            this.BtnLast.visible = false;
            this.moveSwitch = false;
            e.stopPropagation();
            if (GVariate._taskNum >= GVariate._taskArr.length - 1) {
                Admin._openScene(Admin.SceneName.UISkin, null, this.self);
            }
            else {
                GVariate._taskNum++;
                this.mainCameraMove();
                EventAdmin.notify(GEnum.EventType.taskProgress);
                if (this._numZoder[GVariate._taskNum].value <= 10) {
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
        }
        onStageMouseDown(e) {
            this.moveSwitch = true;
            this.touchPosX = e.stageX;
            this.touchPosY = e.stageY;
            let Camera = GSene3D.MainCamera.getChildByName('MainCamera');
            let hitResult_Touch = Tools.rayScanning(Camera, GSene3D.GameMain3D, new Laya.Vector2(this.touchPosX, this.touchPosY), GSene3D.TouchScreen.name);
            if (hitResult_Touch) {
                let x = GSene3D.Headcollision.transform.position.x - GSene3D.knife.transform.position.x + hitResult_Touch.point.x;
                let y = GSene3D.Headcollision.transform.position.y - GSene3D.knife.transform.position.y + hitResult_Touch.point.y;
                let z = GSene3D.Headcollision.transform.position.z - GSene3D.knife.transform.position.z + hitResult_Touch.point.z;
                GSene3D.HeadSimulate.transform.position = new Laya.Vector3(x, y, z);
            }
        }
        onStageMouseMove(e) {
            if (!Admin._gameStart) {
                return;
            }
            if (this.moveSwitch) {
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
        razorMove(e) {
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
        knifeMove(e) {
            this.touchPosX = e.stageX;
            this.touchPosY = e.stageY;
            let hitResult = Tools.rayScanning(GSene3D.MainCamera.getChildByName('MainCamera'), GSene3D.GameMain3D, new Laya.Vector2(this.touchPosX, this.touchPosY), GSene3D.HeadSimulate.name);
            if (hitResult) {
                let x = GSene3D.Headcollision.transform.position.x - (GSene3D.HeadSimulate.transform.position.x - hitResult.point.x);
                let y = GSene3D.Headcollision.transform.position.y - (GSene3D.HeadSimulate.transform.position.y - hitResult.point.y);
                let z = GSene3D.Headcollision.transform.position.z - (GSene3D.HeadSimulate.transform.position.z - hitResult.point.z);
                GSene3D.knife.transform.position = new Laya.Vector3(x, y, z);
                if (GSene3D.knife.transform.position.y >= GSene3D.HingeUp.transform.position.y) {
                    GSene3D.knife.transform.lookAt(GSene3D.HingeUp.transform.position, new Laya.Vector3(0, 1, 0));
                }
                else if (GSene3D.knife.transform.position.y <= GSene3D.HingeDown.transform.position.y) {
                    GSene3D.knife.transform.lookAt(GSene3D.HingeDown.transform.position, new Laya.Vector3(0, 1, 0));
                }
                else {
                    GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                    GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0));
                }
            }
        }
        onStageMouseUp(e) {
            this.touchPosX = null;
            this.touchPosY = null;
            this.moveSwitch = false;
        }
        lwgOnDisable() {
        }
    }

    class UIResurgence extends Admin.Scene {
        lwgOnEnable() {
            Admin._gameStart = false;
            ADManager.TAPoint(TaT.BtnShow, 'closeword_revive');
            ADManager.TAPoint(TaT.BtnShow, 'ADrevivebt_revive');
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnResurgence'], this, null, null, this.btnResurgenceUp);
            Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp);
        }
        btnResurgenceUp() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'ADrevivebt_revive');
                Admin._gameStart = true;
                EventAdmin.notify(EventAdmin.EventType.scene3DResurgence);
                this.self.close();
            });
        }
        btnNoUp() {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_revive');
            EventAdmin.notify(EventAdmin.EventType.closeOperation);
            Admin._openScene(Admin.SceneName.UIDefeated);
            this.self.close();
        }
    }

    class UISet extends lwg.Admin.Scene {
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

    class UIShare extends lwg.Admin.Scene {
        lwgOnAwake() {
            Admin._gameStart = false;
            if (Game._platform !== Game._platformTpye.Bytedance) {
                this.self['BtnClose'].visible = false;
                Laya.timer.once(2000, this, () => {
                    this.self['BtnClose'].visible = true;
                });
                this.self['WeChat'].visible = true;
                this.self['Bytedance'].visible = false;
            }
            else {
                this.self['WeChat'].visible = false;
                this.self['Bytedance'].visible = true;
                this.self['BtnClose_Bytedance'].visible = false;
                Laya.timer.frameOnce(180, this, () => {
                    this.self['BtnClose_Bytedance'].visible = true;
                });
            }
        }
        lwgOnEnable() {
            ADManager.TAPoint(TaT.BtnShow, 'closeword_share');
            ADManager.TAPoint(TaT.BtnShow, 'sharebt_share');
            this.endPhoto();
            let index;
            if (Game._gameLevel.value > 10) {
                index = Game._gameLevel.value % 10 + 1;
            }
            else {
                index = Game._gameLevel.value;
            }
            let url = 'UI/Share/Photo/' + index + '.png';
            this.self['SmallPhoto'].skin = url;
        }
        lwgOpenAni() {
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
                Laya.timer.once(this.aniDelayde * 7, this, () => { this.self['Icon_hand'].skin = 'UI/Share/tubiao_1-2.png'; });
                Animation2D.rotate_Scale(this.self['Icon_hand'], -10, 2, 2, 0, 1, 1, this.aniTime * 4, this.aniDelayde * 7);
            });
            Effects.createExplosion_Rotate(this.self['SceneContent'], 40, this.self['SceneContent'].width / 2, this.self['SceneContent'].height / 2 - 100, Effects.SkinStyle.star, 20, 15);
            return this.aniTime * 5;
        }
        endPhoto() {
            this.EndCamera = GSene3D.MainCamera.clone();
            GSene3D.GameMain3D.addChild(this.EndCamera);
            this.EndCamera.transform.position = GSene3D.PhotoCameraMark.transform.position;
            this.EndCamera.transform.localRotationEuler = GSene3D.PhotoCameraMark.transform.localRotationEuler;
            let renderTargetCamera = this.EndCamera.getChildAt(0);
            renderTargetCamera.renderTarget = new Laya.RenderTexture(this.self['BigPhoto'].width, this.self['BigPhoto'].height);
            renderTargetCamera.renderingOrder = -1;
            renderTargetCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            var rtex = new Laya.Texture(renderTargetCamera.renderTarget, Laya.Texture.DEF_UV);
            var sp1 = new Laya.Sprite();
            this.self['BigPhoto'].addChild(sp1);
            sp1.graphics.drawTexture(rtex);
        }
        lwgBtnClick() {
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
        }
        btnShareUp() {
            console.log('分享！');
            RecordManager._share('award', () => {
                this.shareFunc();
                Dialog.createHint_Middle(Dialog.HintContent["分享成功，获得50金币！"]);
                Gold.addGold(50);
                ADManager.TAPoint(TaT.BtnClick, 'sharebt_share');
            });
        }
        btnNoShareUp() {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_share');
            this.shareFunc();
        }
        shareFunc() {
            Admin._openScene(Admin.SceneName.UIVictoryBox, null, this.self);
        }
        lwgOnDisable() {
            this.EndCamera.removeSelf();
        }
    }

    class UIShop_Goods extends Admin.Object {
        lwgOnEnable() {
            this.Select = this.self.getChildByName('Select');
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self, this, null, null, this.up, null);
        }
        up() {
            EventAdmin.notify(Shop.EventType.select, [this.self['_dataSource']]);
        }
    }

    class UIShop extends Shop.ShopScene {
        shopOnAwake() {
            ADManager.TAPoint(TaT.BtnShow, 'ADrewardbt_skin');
            ADManager.TAPoint(TaT.BtnShow, 'closeword_skin');
            ADManager.TAPoint(TaT.BtnShow, 'Adcoinget');
            ADManager.TAPoint(TaT.BtnShow, 'Adxiangsu_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adjiguangjjian_get');
            ADManager.TAPoint(TaT.BtnShow, 'Admyworld_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adcat_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adstar_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adanquan_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adtomato_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adiron_get');
            ADManager.TAPoint(TaT.BtnShow, 'Adhama_get');
            ADManager.TAPoint(TaT.BtnShow, 'ADyuan_ge');
            ADManager.TAPoint(TaT.BtnShow, 'ADjiemao1_get');
            ADManager.TAPoint(TaT.BtnShow, 'ADjiemao2_get');
            Gold.goldAppear();
            Setting.setBtnVinish();
            GVariate._stageClick = false;
            Shop.goodsClassArr = [Shop.allOther, Shop.allProps, Shop.allSkin];
            let SkinName;
            (function (SkinName) {
                SkinName["anquanmao"] = "anquanmao";
                SkinName["yuanyanjing"] = "yuanyanjing";
                SkinName["jiemao_01"] = "jiemao_01";
                SkinName["hamajing"] = "hamajing";
                SkinName["yanshemao_gangtie"] = "yanshemao_gangtie";
                SkinName["yanshemao"] = "yanshemao";
                SkinName["jiemao_02"] = "jiemao_02";
                SkinName["xiaochoumao"] = "xiaochoumao";
                SkinName["xingxingyanjing"] = "xingxingyanjing";
                SkinName["yanshemao_shijie"] = "yanshemao_shijie";
                SkinName["maomaozi"] = "maomaozi";
            })(SkinName || (SkinName = {}));
            let PropsName;
            (function (PropsName) {
                PropsName["yingguangbang"] = "yingguangbang";
                PropsName["lifadao"] = "lifadao";
                PropsName["jiandao"] = "jiandao";
                PropsName["dianjupian"] = "dianjupian";
                PropsName["dianju"] = "dianju";
            })(PropsName || (PropsName = {}));
            let OtherName;
            (function (OtherName) {
                OtherName["xiangsudao"] = "xiangsudao";
                OtherName["tixudao"] = "tixudao";
                OtherName["ruwu"] = "ruwu";
                OtherName["lifadao"] = "lifadao";
                OtherName["jundao"] = "jundao";
                OtherName["tulongdao"] = "tulongdao";
            })(OtherName || (OtherName = {}));
            Tools.objPropertySort(Shop.allSkin, 'arrange');
            Tools.objPropertySort(Shop.allProps, 'arrange');
            Tools.objPropertySort(Shop.allOther, 'arrange');
            if (!Shop._currentSkin.name) {
                Shop._currentSkin.name = SkinName.anquanmao;
            }
            if (!Shop._currentProp.name) {
                Shop._currentProp.name = PropsName.jiandao;
            }
            if (!Shop._currentOther.name) {
                Shop._currentOther.name = OtherName.tixudao;
            }
            this.self['Dispaly'].skin = 'UI/Shop/Other/' + Shop._currentOther.name + '.png';
            let condition = Shop.getGoodsProperty(Shop.GoodsClass.Skin, SkinName.xiaochoumao, Shop.GoodsProperty.condition);
            if (Game._gameLevel.value >= condition) {
                Shop.setGoodsProperty(Shop.GoodsClass.Skin, SkinName.xiaochoumao, Shop.GoodsProperty.have, true);
            }
            else {
                Shop.setGoodsProperty(Shop.GoodsClass.Skin, SkinName.xiaochoumao, Shop.GoodsProperty.resCondition, Game._gameLevel.value);
            }
            this.buyPriceDisplay();
        }
        buyPriceDisplay() {
            let noHaveGold = [];
            switch (Shop._ShopTap.selectedIndex) {
                case 2:
                    noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Skin, false);
                    break;
                case 1:
                    noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Props, false);
                    break;
                case 0:
                    noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Other, false);
                    break;
                default:
                    break;
            }
            Tools.objPropertySort(noHaveGold, Shop.GoodsProperty.getOder);
            if (noHaveGold[0]) {
                let price = noHaveGold[0][Shop.GoodsProperty.condition];
                this.self['BuyPrice'].value = price.toString();
            }
        }
        shopEventReg() {
            EventAdmin.reg(Shop.EventType.select, this, (dataSource) => {
                if (dataSource.have) {
                    this.sceletDisplay(dataSource, false);
                }
                else {
                    if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ads) {
                        ADManager.ShowReward(() => {
                            this.adsAcquisition(dataSource);
                            switch (dataSource.name) {
                                case 'yingguangbang':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adjiguangjjian_get');
                                    break;
                                case 'yuanyanjing':
                                    ADManager.TAPoint(TaT.BtnClick, 'ADyuan_ge');
                                    break;
                                case 'xingxingyanjing':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adstar_get');
                                    break;
                                case 'jiemao_01':
                                    ADManager.TAPoint(TaT.BtnClick, 'ADjiemao1_get');
                                    break;
                                case 'jiemao_02':
                                    ADManager.TAPoint(TaT.BtnClick, 'ADjiemao2_get');
                                    break;
                                case 'hamajing':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adhama_get');
                                    break;
                                case 'yanshemao_gangtie':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adiron_get');
                                    break;
                                case 'yanshemao':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adtomato_get');
                                    break;
                                case 'maomaozi':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adcat_get');
                                    break;
                                case 'xiangsudao':
                                    ADManager.TAPoint(TaT.BtnClick, 'Adxiangsu_get');
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                    else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.adsXD) {
                        Dialog.createHint_Middle(Dialog.HintContent["请前往皮肤限定界面获取!"]);
                    }
                    else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ineedwin) {
                        Dialog.createHint_Middle(Dialog.HintContent["通过相应的关卡数达到就可以得到了!"]);
                    }
                    else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.gold) {
                        Dialog.createHint_Middle(Dialog.HintContent["点击金币抽奖按钮购买!"]);
                    }
                }
            });
            Shop._ShopList.refresh();
        }
        sceletDisplay(dataSource, scrollTo) {
            switch (Shop._ShopTap.selectedIndex) {
                case 2:
                    Shop._currentSkin.name = dataSource.name;
                    this.self['Dispaly'].skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                    break;
                case 1:
                    Shop._currentProp.name = dataSource.name;
                    this.self['Dispaly'].skin = 'UI/Shop/Props/' + dataSource.name + '.png';
                    break;
                case 0:
                    Shop._currentOther.name = dataSource.name;
                    this.self['Dispaly'].skin = 'UI/Shop/Other/' + dataSource.name + '.png';
                    break;
                default:
                    break;
            }
            if (scrollTo) {
                let index = dataSource.arrange - 1;
                Shop._ShopList.scrollTo(index);
            }
        }
        adsAcquisition(dataSource) {
            let claName;
            switch (Shop._ShopTap.selectedIndex) {
                case 2:
                    claName = Shop.GoodsClass.Skin;
                    break;
                case 1:
                    claName = Shop.GoodsClass.Props;
                    break;
                case 0:
                    claName = Shop.GoodsClass.Other;
                    break;
                default:
                    break;
            }
            let condition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.condition);
            let resCondition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition);
            Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition, resCondition + 1);
            if (condition <= resCondition + 1) {
                Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.have, true);
                this.sceletDisplay(dataSource, false);
            }
            Shop._ShopList.refresh();
        }
        myTap_Select(index) {
            PalyAudio.playSound();
            switch (index) {
                case 2:
                    Shop._ShopList.array = Shop.allSkin;
                    this.self['Dispaly'].skin = 'UI/Shop/Skin/' + Shop._currentSkin.name + '.png';
                    break;
                case 1:
                    Shop._ShopList.array = Shop.allProps;
                    this.self['Dispaly'].skin = 'UI/Shop/Props/' + Shop._currentProp.name + '.png';
                    break;
                case 0:
                    Shop._ShopList.array = Shop.allOther;
                    this.self['Dispaly'].skin = 'UI/Shop/Other/' + Shop._currentOther.name + '.png';
                    break;
                default:
                    break;
            }
            Shop._ShopList.refresh();
            this.buyPriceDisplay();
        }
        myList_Update(cell, index) {
            let dataSource = cell.dataSource;
            let Select = cell.getChildByName('Select');
            Select.visible = false;
            let Pic = cell.getChildByName('Pic');
            switch (Shop._ShopTap.selectedIndex) {
                case 2:
                    Pic.skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                    if (cell.dataSource[Shop.GoodsProperty.name] == Shop._currentSkin.name) {
                        Select.visible = true;
                    }
                    else {
                        Select.visible = false;
                    }
                    break;
                case 1:
                    Pic.skin = 'UI/Shop/Props/' + dataSource.name + '.png';
                    if (cell.dataSource[Shop.GoodsProperty.name] == Shop._currentProp.name) {
                        Select.visible = true;
                    }
                    else {
                        Select.visible = false;
                    }
                    break;
                case 0:
                    Pic.skin = 'UI/Shop/Other/' + dataSource.name + '.png';
                    if (cell.dataSource[Shop.GoodsProperty.name] == Shop._currentOther.name) {
                        Select.visible = true;
                    }
                    else {
                        Select.visible = false;
                    }
                    break;
                default:
                    break;
            }
            let NoHave = cell.getChildByName('NoHave');
            NoHave.visible = true;
            let Board = cell.getChildByName('Board');
            let Dec = NoHave.getChildByName('Dec');
            let Icon = NoHave.getChildByName('Icon');
            if (!cell.dataSource[Shop.GoodsProperty.have]) {
                switch (cell.dataSource[Shop.GoodsProperty.getway]) {
                    case Shop.Getway.ads:
                        Dec.text = cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition];
                        Dec.x = 88;
                        Dec.fontSize = 30;
                        Icon.visible = true;
                        break;
                    case Shop.Getway.adsXD:
                        Dec.text = '限定获取';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    case Shop.Getway.easterEgg:
                        Dec.text = '彩蛋获取';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    case Shop.Getway.ineedwin:
                        Dec.text = '过' + cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition] + '关';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    case Shop.Getway.gold:
                        Dec.text = '金币抽取';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    default:
                        Icon.visible = false;
                        break;
                }
                Board.skin = 'UI/Common/kuang2.png';
            }
            else {
                NoHave.visible = false;
                Board.skin = 'UI/Common/kuang1.png';
            }
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnBuy'], this, null, null, this.btnBuyUp);
            Click.on(Click.Type.largen, this.self['BtnGetGold'], this, null, null, this.btnGetGold);
            Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, this.btnBackUp);
        }
        btnBuyUp() {
            ADManager.TAPoint(TaT.BtnShow, 'Adcoinget');
            let noHaveGold = [];
            switch (Shop._ShopTap.selectedIndex) {
                case 2:
                    noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Skin, false);
                    break;
                case 1:
                    noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Props, false);
                    break;
                case 0:
                    noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Other, false);
                    break;
                default:
                    break;
            }
            if (noHaveGold.length <= 0) {
                Dialog.createHint_Middle(Dialog.HintContent["没有可以购买的皮肤了！"]);
            }
            else {
                Tools.objPropertySort(noHaveGold, Shop.GoodsProperty.getOder);
                let price = noHaveGold[0][Shop.GoodsProperty.condition];
                if (noHaveGold[1]) {
                    let price1 = noHaveGold[1][Shop.GoodsProperty.condition];
                    this.self['BuyPrice'].value = price1.toString();
                }
                if (Gold._goldNum < price) {
                    Dialog.createHint_Middle(Dialog.HintContent["金币不够了！"]);
                }
                else {
                    Dialog.createHint_Middle(Dialog.HintContent["恭喜获得新皮肤!"]);
                    switch (Shop._ShopTap.selectedIndex) {
                        case 2:
                            Shop.setGoodsProperty(Shop.GoodsClass.Skin, noHaveGold[0].name, Shop.GoodsProperty.have, true);
                            break;
                        case 1:
                            Shop.setGoodsProperty(Shop.GoodsClass.Props, noHaveGold[0].name, Shop.GoodsProperty.have, true);
                            break;
                        case 0:
                            Shop.setGoodsProperty(Shop.GoodsClass.Other, noHaveGold[0].name, Shop.GoodsProperty.have, true);
                            break;
                        default:
                            break;
                    }
                    this.sceletDisplay(noHaveGold[0], true);
                    Gold.addGold(-price);
                }
                Shop._ShopList.refresh();
            }
        }
        btnGetGold() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_skin');
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    this.advFunc();
                });
            });
        }
        advFunc() {
            Gold.addGold(500);
        }
        btnBackUp() {
            ADManager.TAPoint(TaT.BtnClick, 'closeword_skin');
            this.self.close();
        }
        shopOnDisable() {
            GVariate._stageClick = true;
            Setting.setBtnAppear();
        }
    }

    class UISKin_Goods extends Admin.Object {
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self, this, null, null, this.up, null);
        }
        up() {
            EventAdmin.notify(Skin.EventType.select, [this.self['_dataSource']]);
        }
    }

    class UISkin extends SkinScene {
        skinOnAwake() {
            Dialog.createVoluntarilyDialogue(150, 334, Dialog.UseWhere.scene3, 0, 2000, this.self);
            let skinArr = Shop.getGoodsClassArr(Shop.GoodsClass.Skin);
            Skin._headSkinArr = [];
            Skin._eyeSkinArr = [];
            Skin._currentEye.name = null;
            Skin._currentHead.name = null;
            for (let index = 0; index < skinArr.length; index++) {
                const element = skinArr[index];
                if (element[Skin.SkinProperty.classify] === Skin.SkinClass.head) {
                    Skin._headSkinArr.push(element);
                }
                else if (element[Skin.SkinProperty.classify] === Skin.SkinClass.eye) {
                    Skin._eyeSkinArr.push(element);
                }
            }
            let condition = Shop.getGoodsProperty(Shop.GoodsClass.Skin, "xiaochoumao", Shop.GoodsProperty.condition);
            if (Game._gameLevel.value >= condition) {
                Shop.setGoodsProperty(Shop.GoodsClass.Skin, "xiaochoumao", Shop.GoodsProperty.have, true);
            }
            else {
                Shop.setGoodsProperty(Shop.GoodsClass.Skin, "xiaochoumao", Shop.GoodsProperty.resCondition, Game._gameLevel.value);
            }
        }
        skinEventReg() {
            EventAdmin.reg(Skin.EventType.select, this, (dataSource) => {
                if (dataSource[Shop.GoodsProperty.have]) {
                    switch (Skin._SkinTap.selectedIndex) {
                        case 0:
                            Skin._currentEye.name = dataSource[Shop.GoodsProperty.name];
                            EventAdmin.notify(GEnum.EventType.changeEyeDecoration);
                            break;
                        case 1:
                            Skin._currentHead.name = dataSource[Shop.GoodsProperty.name];
                            EventAdmin.notify(GEnum.EventType.changeHeadDecoration);
                            if (GSene3D.HairParent) {
                                GSene3D.HairParent.active = false;
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ads) {
                        ADManager.ShowReward(() => {
                            this.adsAcquisition(dataSource);
                        });
                    }
                    else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.adsXD) {
                        Dialog.createHint_Middle(Dialog.HintContent["请前往皮肤限定界面获取!"]);
                    }
                    else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ineedwin) {
                        Dialog.createHint_Middle(Dialog.HintContent["通过相应的关卡数达到就可以得到了!"]);
                    }
                    else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.gold) {
                        Dialog.createHint_Middle(Dialog.HintContent["请前往皮肤界面购买！"]);
                    }
                }
            });
            Skin._SkinList.refresh();
        }
        adsAcquisition(dataSource) {
            let claName = Shop.GoodsClass.Skin;
            let condition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.condition);
            let resCondition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition);
            Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition, resCondition + 1);
            if (condition <= resCondition + 1) {
                Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.have, true);
                switch (Skin._SkinTap.selectedIndex) {
                    case 0:
                        Skin._currentEye.name = dataSource[Shop.GoodsProperty.name];
                        break;
                    case 1:
                        Skin._currentHead.name = dataSource[Shop.GoodsProperty.name];
                        break;
                    default:
                        break;
                }
            }
            Skin._SkinList.refresh();
        }
        skinTap_Select(index) {
            PalyAudio.playSound();
            switch (index) {
                case 0:
                    Skin._SkinList.array = Skin._eyeSkinArr;
                    break;
                case 1:
                    Skin._SkinList.array = Skin._headSkinArr;
                    break;
                default:
                    break;
            }
            Skin._SkinList.refresh();
        }
        skinList_Update(cell, index) {
            console.log(Skin._SkinList);
            let dataSource = cell.dataSource;
            let Select = cell.getChildByName('Select');
            Select.visible = false;
            let Pic = cell.getChildByName('Pic');
            Pic.skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
            switch (Skin._SkinTap.selectedIndex) {
                case 0:
                    if (cell.dataSource['name'] == Skin._currentEye.name) {
                        Select.visible = true;
                    }
                    else {
                        Select.visible = false;
                    }
                    break;
                case 1:
                    if (cell.dataSource['name'] == Skin._currentHead.name) {
                        Select.visible = true;
                    }
                    else {
                        Select.visible = false;
                    }
                    break;
                default:
                    break;
            }
            let NoHave = cell.getChildByName('NoHave');
            NoHave.visible = true;
            let Board = cell.getChildByName('Board');
            let Dec = NoHave.getChildByName('Dec');
            let Icon = NoHave.getChildByName('Icon');
            if (!cell.dataSource[Shop.GoodsProperty.have]) {
                switch (cell.dataSource[Shop.GoodsProperty.getway]) {
                    case Shop.Getway.ads:
                        Dec.text = cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition];
                        Dec.x = 88;
                        Dec.fontSize = 30;
                        Icon.visible = true;
                        break;
                    case Shop.Getway.adsXD:
                        Dec.text = '限定获取';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    case Shop.Getway.easterEgg:
                        Dec.text = '彩蛋获取';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    case Shop.Getway.ineedwin:
                        Dec.text = '过' + cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition] + '关';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    case Shop.Getway.gold:
                        Dec.text = '金币抽取';
                        Dec.x = NoHave.width / 2;
                        Dec.fontSize = 23;
                        Icon.visible = false;
                        break;
                    default:
                        Icon.visible = false;
                        break;
                }
                Board.skin = 'UI/Common/kuang2.png';
            }
            else {
                NoHave.visible = false;
                Board.skin = 'UI/Common/kuang1.png';
            }
        }
        skinOnEnable() {
            Skin._SkinList.array = Skin._headSkinArr;
            Skin._SkinList.refresh();
            EventAdmin.notify(GEnum.EventType.cameraMove, [GEnum.TaskType.movePhotoLocation]);
        }
        skinBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnComplete'], this, null, null, this.btnCompleteUp, null);
        }
        btnCompleteUp() {
            Admin._openScene(Admin.SceneName.UIShare, null, this.self);
        }
    }

    class UISkinTry extends Admin.Scene {
        lwgOnAwake() {
            this.randomNoHave();
            if (Game._platform == Game._platformTpye.OPPO) {
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
            let hair;
            let beard;
            for (let index = 0; index < GVariate._taskArr.length; index++) {
                const element = GVariate._taskArr[index];
                if (element === GEnum.TaskType.HairParent) {
                    hair = true;
                }
                else if (element === GEnum.TaskType.LeftBeard || element === GEnum.TaskType.RightBeard || element === GEnum.TaskType.UpLeftBeard || element === GEnum.TaskType.UpRightBeard || element === GEnum.TaskType.MiddleBeard) {
                    beard = true;
                }
            }
            if (hair) {
                console.log('本关有剃头任务！');
            }
            if (beard) {
                console.log('本关剃胡须任务！');
            }
            if (hair && beard) {
                if (Math.floor(Math.random() * 2) === 1) {
                    this.randomProp();
                }
                else {
                    this.randomOther();
                }
            }
            else if (hair && !beard) {
                this.randomProp();
            }
            else if (!hair && beard) {
                this.randomOther();
            }
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
            Click.on(lwg.Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp);
            Click.on(lwg.Click.Type.largen, this.self['BtnGet_WeChat'], this, null, null, this.btnGetUp);
            Click.on(lwg.Click.Type.largen, this.self['BtnGet_OPPO'], this, null, null, this.btnGetUp);
        }
        btnGetUp(event) {
            if (Game._platform == Game._platformTpye.OPPO) {
                Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
                EventAdmin.notify(GEnum.EventType.changeOther);
                EventAdmin.notify(GEnum.EventType.changeProp);
            }
            else {
                ADManager.ShowReward(() => {
                    Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
                    EventAdmin.notify(GEnum.EventType.changeOther);
                    EventAdmin.notify(GEnum.EventType.changeProp);
                });
            }
        }
        btnNoUp(event) {
            if (this.beforeTryOtherName) {
                Shop._currentOther.name = this.beforeTryOtherName;
            }
            if (this.beforeTryPropName) {
                Shop._currentProp.name = this.beforeTryPropName;
            }
            Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
            EventAdmin.notify(GEnum.EventType.changeOther);
            EventAdmin.notify(GEnum.EventType.changeProp);
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

    class UISkinXD extends SkinXD.SkinXDScene {
        skinXDOnAwake() {
            ADManager.TAPoint(TaT.BtnShow, 'Adlimmitget');
            Gold.goldVinish();
            Setting.setBtnVinish();
        }
        skinXDOnEnable() {
            this.progressDisplay();
        }
        skinXDAdaptive() {
            this.self['SceneContent'].y = Laya.stage.height / 2;
        }
        progressDisplay() {
            let resCondition = Shop.getGoodsProperty(Shop.GoodsClass.Props, 'xiandanren', Shop.GoodsProperty.resCondition);
            if (resCondition > 0) {
                for (let index = 0; index < resCondition; index++) {
                    let name = 'Bar' + (index + 1);
                    this.self[name].skin = 'UI/XDSkin/tiao1.png';
                }
            }
        }
        skinXDBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnGet'], this, null, null, this.btnGetUp);
            Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, this.btnBackUp);
        }
        btnGetUp() {
            ADManager.ShowReward(() => {
                this.btnGetFunc();
            });
        }
        btnBackUp() {
            this.self.close();
        }
        btnGetFunc() {
            ADManager.TAPoint(TaT.BtnClick, 'Adlimmitget');
            let have = Shop.buyGoods(Shop.GoodsClass.Props, 'xiandanren', 1);
            if (have) {
                this.progressDisplay();
                Dialog.createHint_Middle(Dialog.HintContent["限定皮肤已经获得，请前往皮肤界面查看。"]);
                Shop._currentProp.name = 'xiandanren';
                EventAdmin.notify(SkinXD.EventType.acquisition);
                Animation2D.fadeOut(this.self, 1, 0, 500, 500, () => {
                    this.self.close();
                });
            }
            else {
                this.progressDisplay();
            }
        }
        skinXDOnDisable() {
            Setting.setBtnAppear();
            Gold.goldAppear();
        }
    }

    class UIStart extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this.easterEgg_AotumanSwitch = false;
        }
        lwgNodeDec() {
            this.LevelDisplay = this.self['LevelDisplay'];
            this.LevelStyle = this.self['LevelStyle'];
            ADManager.TAPoint(TaT.BtnShow, 'setbt_main');
            ADManager.TAPoint(TaT.BtnShow, 'signbt_main');
            ADManager.TAPoint(TaT.BtnShow, 'limitskinbt_main');
            ADManager.TAPoint(TaT.BtnShow, 'startword_main');
            if (Game._platform !== Game._platformTpye.Bytedance) {
                this.self['P204'].visible = false;
                this.self['P201'].visible = false;
                this.self['P205'].visible = false;
            }
        }
        lwgEventReg() {
            EventAdmin.reg(SkinXD.EventType.acquisition, this, () => {
                this.self['BtnXDSkin'].visible = false;
            });
            EventAdmin.regOnce(CheckIn.EventType.removeCheckBtn, this, () => {
                this.self['BtnCheck'].visible = false;
            });
            EventAdmin.reg(EasterEgg.EventType.trigger, this, () => {
                this.self['BtnAotuman'].visible = true;
                this.self['EasterEgg_Aotuman'].visible = false;
            });
        }
        lwgOnEnable() {
            Skin._currentEye.name = null;
            Skin._currentHead.name = null;
            EventAdmin.notify(GEnum.EventType.changeHeadDecoration);
            EventAdmin.notify(GEnum.EventType.changeEyeDecoration);
            this.levelStyleDisplay();
            if (Shop.getGoodsProperty(Shop.GoodsClass.Props, 'xiandanren', Shop.GoodsProperty.have)) {
                this.self['BtnXDSkin'].visible = false;
            }
            if (!EasterEgg._easterEgg_1.value) {
                this.self['BtnAotuman'].visible = false;
            }
            else {
                this.self['EasterEgg_Aotuman'].visible = false;
            }
            CheckIn.openCheckIn();
            Dialog.createVoluntarilyDialogue(150, 334, Dialog.UseWhere.scene1, 1000, 2000, this.self);
            Setting.setBtnAppear();
        }
        lwgAdaptive() {
            this.self['P204'].y = Laya.stage.height;
            this.self['Guide'].y = Laya.stage.height * 0.732;
            this.self['SceneContent'].y = Laya.stage.height * 0.378;
        }
        levelStyleDisplay() {
            let location = Game._gameLevel.value % this.LevelStyle.numChildren;
            for (let index = 0; index < this.LevelStyle.numChildren; index++) {
                const element = this.LevelStyle.getChildAt(index);
                let location0 = Number(element.name.substring(element.name.length - 1, element.name.length));
                if (Game._gameLevel.value < 5) {
                    location0 += 1;
                }
                let Num = element.getChildByName('Num');
                if (location0 === location) {
                    Num.value = Game._gameLevel.value.toString();
                }
                else if (location0 < location) {
                    Num.value = (Game._gameLevel.value - (location - location0)).toString();
                }
                else if (location0 > location) {
                    Num.value = (Game._gameLevel.value + (location0 - location)).toString();
                    let Pic = element.getChildByName('Pic');
                    Pic.skin = 'UI/GameStart/jindu_hui.png';
                    let Color = element.getChildByName('Color');
                    if (Color !== null) {
                        Color.visible = false;
                    }
                    Num.skin = 'UI/Common/shuzi3.png';
                }
            }
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnSkin'], this, null, null, (e) => {
                ADManager.TAPoint(TaT.BtnClick, 'setbt_main');
                e.stopPropagation();
                lwg.Admin._openScene(Admin.SceneName.UIShop);
            });
            Click.on(Click.Type.largen, this.self['BtnTask'], this, null, null, (e) => {
                e.stopPropagation();
                Admin._openScene(lwg.Admin.SceneName.UITask);
            });
            Click.on(Click.Type.largen, this.self['BtnCheck'], this, null, null, (e) => {
                ADManager.TAPoint(TaT.BtnClick, 'signbt_main');
                e.stopPropagation();
                lwg.Admin._openScene(Admin.SceneName.UICheckIn);
            });
            Click.on(Click.Type.largen, this.self['BtnAotuman'], this, null, null, (e) => {
                e.stopPropagation();
                lwg.Admin._openScene(Admin.SceneName.UIEasterEgg);
            });
            Click.on(Click.Type.largen, this.self['BtnXDSkin'], this, this.btnXDSkinDown, null, this.btnXDSkinUp);
            Click.on(Click.Type.largen, this.self['Background'], this, () => {
                ADManager.TAPoint(TaT.BtnClick, 'startword_main');
                Admin._openScene(lwg.Admin.SceneName.UISkinTry, null, this.self);
            });
        }
        btnXDSkinDown() {
        }
        btnXDSkinUp() {
            lwg.Admin._openScene(Admin.SceneName.UISkinXD);
            ADManager.TAPoint(TaT.BtnClick, 'limitskinbt_main');
        }
        onStageMouseMove(event) {
            if (this.easterEgg_AotumanSwitch && !EasterEgg._easterEgg_1.value) {
                this.self.addChild(this.self['Aotuman']);
                this.self['Aotuman'].x = event.stageX;
                this.self['Aotuman'].y = event.stageY;
                let point = new Laya.Point(this.self['EasterEgg_Aotuman'].x, this.self['EasterEgg_Aotuman'].y);
                if (point.distance(event.stageX, event.stageY) < 50) {
                    this.aotumanBack();
                    let time = 100;
                    let delayed = 100;
                    let fxClamp = this.self['Clamp'].x;
                    let fyClamp = this.self['Clamp'].y;
                    let frRightClamp = this.self['RightClamp'].rotation;
                    let frLeftClamp = this.self['LeftClamp'].rotation;
                    let fxPicAotuman = this.self['PicAotuman'].x;
                    let fyPicAotuman = this.self['PicAotuman'].y;
                    let frPicAotuman = this.self['PicAotuman'].rotation;
                    Animation2D.simple_Rotate(this.self['RightClamp'], 0, -19, time * 0.5);
                    Animation2D.simple_Rotate(this.self['LeftClamp'], 0, 19, time * 0.5, 0, () => {
                        Animation2D.move_Simple(this.self['Clamp'], fxClamp, fyClamp, fxClamp, fyClamp - 200, time * 2, delayed * 4);
                        Animation2D.drop_KickBack(this.self['PicAotuman'], 1, this.self['PicAotuman'].y, this.self['PicAotuman'].y + 600, 50, time * 8, 0, () => {
                            this.self['Clamp'].x = fxClamp;
                            this.self['Clamp'].y = fyClamp;
                            this.self['RightClamp'].rotation = frRightClamp;
                            this.self['LeftClamp'].rotation = frLeftClamp;
                            this.self['PicAotuman'].x = fxPicAotuman;
                            this.self['PicAotuman'].y = fyPicAotuman;
                            this.self['PicAotuman'].rotation = frPicAotuman;
                        });
                        Animation2D.simple_Rotate(this.self['PicAotuman'], 0, 360, time * 6, 0, () => {
                            Admin._openScene(Admin.SceneName.UIEasterEgg);
                        });
                    });
                }
            }
        }
        onStageMouseUp() {
            this.aotumanBack();
        }
        aotumanBack() {
            this.easterEgg_AotumanSwitch = false;
            this.self['BtnXDSkin'].addChild(this.self['Aotuman']);
            this.self['Aotuman'].x = 77;
            this.self['Aotuman'].y = 63;
        }
        lwgOnDisable() {
            Gold.GoldNode.visible = false;
            Setting.setBtnVinish();
        }
    }

    class SubpackController {
        constructor() {
            this.subPkgInfo = [
                { name: "sp1", root: "res" },
                { name: "sp2", root: "3DScene" },
                { name: "sp3", root: "3DPrefab" },
            ];
        }
        init(cb) {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                this.onCpl = cb;
                this.pkgFlag = 0;
                this.loadPkg_wx();
            }
        }
        loadPkg_wx() {
            if (this.pkgFlag == this.subPkgInfo.length) {
                this.onCpl();
            }
            else {
                let info = this.subPkgInfo[this.pkgFlag];
                let name = info.name;
                let root = info.root;
                Laya.Browser.window.wx.loadSubpackage({
                    name: name,
                    success: (res) => {
                        console.log(`load ${name} suc`);
                        Laya.MiniAdpter.subNativeFiles[name] = root;
                        Laya.MiniAdpter.nativefiles.push(root);
                        this.pkgFlag++;
                        console.log("加载次数", this.pkgFlag);
                        this.loadPkg_wx();
                    },
                    fail: (res) => {
                        console.error(`load ${name} err: `, res);
                    },
                });
            }
        }
    }

    let isInit = false;
    TJ.Common.PriorityInit.Add(100, () => {
        isInit = true;
    });
    class UISubpackages extends Laya.Script {
        onAwake() {
            Game._platform == Game._platformTpye.Bytedance;
            if (Game._platform !== Game._platformTpye.WeChat) {
                Admin._openScene('UILoding');
                return;
            }
            let act = () => {
                if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                    let gameContrl = new SubpackController();
                    gameContrl.init(() => {
                        Admin._openScene('UILoding');
                    });
                }
                else {
                    Admin._openScene('UILoding');
                }
            };
            if (isInit) {
                act();
            }
            else {
                TJ.Common.PriorityInit.Add(100, act);
            }
        }
    }

    class UITask_GetAward extends Admin.Object {
        lwgBtnClick() {
            let BtnGet = this.self.getChildByName('BtnGet');
            Click.on(Click.Type.largen, BtnGet, this, null, null, this.btnGetUp);
        }
        btnGetUp() {
            if (this.self['dataSource'][Task.TaskProperty.name] === '观看广告获得金币') {
                EventAdmin.notify(Task.EventType.adsGetAward_Every, [this.self['dataSource']]);
                return;
            }
            if (this.self['dataSource'][Task.TaskProperty.get] === 1) {
                EventAdmin.notify(Task.EventType.getAward, [this.self['dataSource']]);
            }
            else if (this.self['dataSource'][Task.TaskProperty.get] === 0) {
                console.log('任务没有完成');
            }
            else if (this.self['dataSource'][Task.TaskProperty.get] === -1) {
                console.log('或者已经领取过！');
            }
        }
    }

    class UITask extends lwg.Task.TaskScene {
        taskOnAwake() {
            console.log(Laya.stage);
            ADManager.TAPoint(TaT.BtnShow, 'Adtask');
            GVariate._stageClick = false;
            Setting.setBtnVinish();
        }
        taskEventReg() {
            EventAdmin.reg(Task.EventType.getAward, this, (dataSource) => {
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    Task.setTaskProperty(Task.TaskClass.everyday, dataSource.name, Task.TaskProperty.get, -1);
                    Gold.addGold(dataSource[Task.TaskProperty.rewardNum]);
                    Task._TaskList.refresh();
                });
            });
            EventAdmin.reg(Task.EventType.adsGetAward_Every, this, (dataSource) => {
                ADManager.ShowReward(() => {
                    ADManager.TAPoint(TaT.BtnClick, 'Adtask');
                    Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                        Gold.addGold(Task.getTaskProperty(Task.TaskClass.everyday, dataSource.name, Task.TaskProperty.rewardNum));
                        Task._TaskList.refresh();
                    });
                });
            });
        }
        taskList_Update(cell, index) {
            let dataSource = cell.dataSource;
            let Name = cell.getChildByName('Name');
            Name.text = dataSource.name;
            let BtnGet = cell.getChildByName('BtnGet');
            if (dataSource.get === 0) {
                BtnGet.skin = 'UI/Task/jinxing.png';
            }
            else if (dataSource.get === 1) {
                BtnGet.skin = 'UI/Task/linqu.png';
            }
            else if (dataSource.get === -1) {
                BtnGet.skin = 'UI/Task/yilingqu.png';
            }
            let ProgressBar = cell.getChildByName('ProgressBar');
            ProgressBar.width = dataSource.resCondition / dataSource.condition * 169;
            let ProNum = cell.getChildByName('ProNum');
            ProNum.text = dataSource.resCondition + '/' + dataSource.condition;
            let AwardNum = cell.getChildByName('AwardNum');
            AwardNum.text = dataSource.rewardNum;
            if (index === 0) {
                ProgressBar.width = 169;
                ProNum.text = '1/1';
                BtnGet.skin = 'UI/Task/adslingqu.png';
            }
        }
        lwgBtnClick() {
            Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, this.btnBackUp);
        }
        ;
        btnBackUp() {
            this.self.close();
        }
        taskOnDisable() {
            Setting.setBtnAppear();
            GVariate._stageClick = true;
        }
    }

    class UIVictory extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this.addOrSub = 'add';
        }
        lwgNodeDec() {
            this.GlodNum = this.self['GlodNum'];
            ADManager.TAPoint(TaT.BtnShow, 'ADrewardbt_success');
            ADManager.TAPoint(TaT.BtnShow, 'closeword_success');
        }
        lwgOnEnable() {
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
        lwgOpenAni() {
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
        getGoldDisPlay(number) {
            let Num = this.GlodNum.getChildByName('Num');
            Num.text = (this.getGoldNum * number).toString();
        }
        lwgBtnClick() {
            Click.on(Click.Type.noEffect, this.self['BtnSelect_Wechat'], this, null, null, this.btnSelectUp);
            Click.on(Click.Type.largen, this.self['BtnAdv_WeChat'], this, null, null, this.btnAdvUp);
            Click.on(Click.Type.largen, this.self['BtnNormal_WeChat'], this, null, null, this.btnNormalUp);
            Click.on(Click.Type.largen, this.self['BtnAdv_OPPO'], this, null, null, this.btnAdvUp);
            Click.on(Click.Type.largen, this.self['BtnNormal_OPPO'], this, null, null, this.btnNormalUp);
            Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNext_BytedanceUp);
            Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
        }
        offClick() {
            Click.off(Click.Type.noEffect, this.self['BtnSelect_Wechat'], this, null, null, this.btnSelectUp);
            Click.off(Click.Type.largen, this.self['BtnAdv_WeChat'], this, null, null, this.btnAdvUp);
            Click.off(Click.Type.largen, this.self['BtnNormal_WeChat'], this, null, null, this.btnNormalUp);
            Click.off(Click.Type.largen, this.self['BtnAdv_OPPO'], this, null, null, this.btnAdvUp);
            Click.off(Click.Type.largen, this.self['BtnNormal_OPPO'], this, null, null, this.btnNormalUp);
            Click.off(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNext_BytedanceUp);
            Click.off(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
        }
        btnNext_BytedanceUp() {
            if (this.self['Dot_Bytedance'].visible) {
                this.btnAdvUp();
            }
            else {
                this.btnNormalUp();
            }
        }
        btnSelectUp() {
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
                Dot.visible = false;
                this.self['BtnAdv_WeChat'].visible = false;
                this.self['BtnNormal_WeChat'].visible = true;
                this.addOrSub = 'sub';
                let Multiply10 = this.self['Multiply10'];
                Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 0, 0, 0, 100);
                let Num = this.GlodNum.getChildByName('Num');
                Laya.timer.loop(30, this, () => {
                    if (this.addOrSub == 'sub') {
                        if (Number(Num.text) < this.getGoldNum) {
                            Num.text = (this.getGoldNum).toString();
                            this.addOrSub = null;
                        }
                        else {
                            Num.text = (Number(Num.text) - 30).toString();
                        }
                    }
                });
            }
            else {
                Dot.visible = true;
                this.self['BtnAdv_WeChat'].visible = true;
                this.self['BtnNormal_WeChat'].visible = false;
                this.addOrSub = 'add';
                let Multiply10 = this.self['Multiply10'];
                Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 1, 1, 1, 100);
                let Num = this.GlodNum.getChildByName('Num');
                Laya.timer.loop(30, this, () => {
                    if (this.addOrSub == 'add') {
                        if (Number(Num.text) > this.getGoldNum * 10) {
                            Num.text = (this.getGoldNum * 10).toString();
                            this.addOrSub = null;
                        }
                        else {
                            Num.text = (Number(Num.text) + 30).toString();
                        }
                    }
                });
            }
        }
        btnNormalUp() {
            ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_success');
            this.offClick();
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                this.advFunc(1);
            });
        }
        btnAdvUp() {
            ADManager.ShowReward(() => {
                ADManager.TAPoint(TaT.BtnClick, 'closeword_success');
                Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                    this.advFunc(10);
                });
            });
        }
        advFunc(number) {
            Gold.addGold(this.getGoldNum * number);
            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
            Admin._openScene(Admin.SceneName.UIStart, null, this.self);
        }
        lwgOnDisable() {
            EventAdmin.notify(GEnum.EventType.goBack);
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
                if (VictoryBox._defaultOpenNum > 0) {
                    let Pic_Box = this.self.getChildByName('Pic_Box');
                    if (!this.self['_dataSource'][VictoryBox.BoxProperty.ads]) {
                        Pic_Box.skin = 'UI/VictoryBox/baoxian3.png';
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
        victoryBoxOnAwake() {
            ADManager.TAPoint(TaT.BtnShow, 'Adboxvideo');
            ADManager.TAPoint(TaT.BtnShow, 'Adboxagain');
            Gold.goldAppear();
            if (VictoryBox._openVictoryBoxNum > 1) {
                let arr = Tools.randomNumOfArray([0, 1, 2, 3, 4, 5, 6, 7, 8], 3);
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    VictoryBox.setBoxProperty('box' + arr[index], VictoryBox.BoxProperty.ads, true);
                }
            }
            switch (Game._platform) {
                case Game._platformTpye.WeChat:
                    this.self['Bytedance'].visible = false;
                    this.self['WeChat'].visible = true;
                    this.self['BtnAgain_WeChat'].visible = false;
                    this.self['BtnNo_WeChat'].visible = false;
                    break;
                case Game._platformTpye.Bytedance:
                    this.self['Bytedance'].visible = true;
                    this.self['WeChat'].visible = false;
                    this.self['BtnAgain_Bytedance'].visible = false;
                    this.self['BtnNo_Bytedance'].visible = false;
                    this.self['Select_Bytedance'].visible = false;
                    break;
                default:
                    break;
            }
        }
        victoryBoxEventReg() {
            EventAdmin.reg(VictoryBox.EventType.openBox, this, (dataSource) => {
                console.log(dataSource, VictoryBox._defaultOpenNum);
                if (VictoryBox._defaultOpenNum > 0) {
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
            let automan = false;
            if (VictoryBox._alreadyOpenNum === 9 && !EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_4, EasterEgg.Property.complete)) {
                EasterEgg.doDetection(EasterEgg.Classify.EasterEgg_01, EasterEgg.Name.assembly_4, 1);
                let cell = VictoryBox._BoxList.getCell(dataSource.arrange - 1);
                let Automan = cell.getChildByName('Automan');
                Automan.visible = true;
                automan = true;
            }
            VictoryBox._defaultOpenNum--;
            if (VictoryBox._defaultOpenNum == 0) {
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
            VictoryBox.setBoxProperty(dataSource[VictoryBox.BoxProperty.name], VictoryBox.BoxProperty.openState, true);
            if (!automan) {
                Laya.timer.frameOnce(20, this, f => {
                    Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                        Gold.addGold(VictoryBox.getBoxProperty(dataSource.name, VictoryBox.BoxProperty.rewardNum));
                    });
                });
            }
            EventAdmin.notify(Task.EventType.victoryBox);
        }
        boxList_Update(cell, index) {
            let dataSource = cell.dataSource;
            let Select = cell.getChildByName('Select');
            if (VictoryBox._selectBox === dataSource[VictoryBox.BoxProperty.name]) {
                Select.visible = true;
            }
            else {
                Select.visible = false;
            }
            let Num = cell.getChildByName('Num');
            let Pic_Gold = cell.getChildByName('Pic_Gold');
            let Pic_Box = cell.getChildByName('Pic_Box');
            let BordPic = cell.getChildByName('BordPic');
            if (!dataSource[VictoryBox.BoxProperty.openState]) {
                if (dataSource[VictoryBox.BoxProperty.ads]) {
                    Pic_Box.skin = 'UI/VictoryBox/baoxian_adv.png';
                }
                else {
                    Pic_Box.skin = 'UI/VictoryBox/baoxian2.png';
                }
                Pic_Box.visible = true;
                Pic_Gold.visible = false;
                Num.visible = false;
                BordPic.skin = 'UI/Common/kuang2.png';
            }
            else {
                Pic_Box.visible = false;
                Pic_Gold.visible = true;
                Num.visible = true;
                Num.text = dataSource[VictoryBox.BoxProperty.rewardNum];
                BordPic.skin = 'UI/Common/kuang1.png';
            }
        }
        victoryBoxBtnClick() {
            Click.on('largen', this.self['BtnNo_WeChat'], this, null, null, this.btnNoUp);
            Click.on('largen', this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
            Click.on('largen', this.self['BtnNo_Bytedance'], this, null, null, this.btnNoUp);
            Click.on('largen', this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
            Click.on('largen', this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelect_BytedanceUp);
        }
        btnOffClick() {
            Click.off('largen', this.self['BtnNo_WeChat'], this, null, null, this.btnNoUp);
            Click.off('largen', this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
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
            lwg.Admin._openScene(lwg.Admin.SceneName.UIVictory, null, null, null);
            this.self.close();
        }
        btnAgainUp(event) {
            ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_box');
            ADManager.TAPoint(TaT.BtnClick, 'Adboxagain');
            if (VictoryBox._alreadyOpenNum < 9 && VictoryBox._adsMaxOpenNum > 0) {
                ADManager.ShowReward(() => {
                    Dialog.createHint_Middle(Dialog.HintContent["增加三次开启宝箱次数！"]);
                    VictoryBox._defaultOpenNum += 3;
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
        victoryOnUpdate() {
            if (VictoryBox._defaultOpenNum > 0) {
                this.self['BtnAgain_WeChat'].visible = false;
                this.self['BtnNo_WeChat'].visible = false;
            }
            else {
                this.self['BtnAgain_WeChat'].visible = true;
                this.self['BtnNo_WeChat'].visible = true;
            }
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
            reg("script/Game/UIADSHint.ts", UIADSHint);
            reg("script/Game/UICheckIn.ts", UICheckIn);
            reg("script/Game/UIDefeated.ts", UIDefeated);
            reg("script/Game/UIEasterEgg.ts", UIEasterEgg);
            reg("script/Game/UILoding.ts", UILoding);
            reg("script/Game/UIOperation.ts", UIOperation);
            reg("script/Game/UIResurgence.ts", UIResurgence);
            reg("script/Game/UISet.ts", UISet);
            reg("script/Game/UIShare.ts", UIShare);
            reg("script/Game/UIShop_Goods.ts", UIShop_Goods);
            reg("script/Game/UIShop.ts", UIShop);
            reg("script/Game/UISKin_Goods.ts", UISKin_Goods);
            reg("script/Game/UISkin.ts", UISkin);
            reg("script/Game/UISkinTry.ts", UISkinTry);
            reg("script/Game/UISkinXD.ts", UISkinXD);
            reg("script/Game/UIStart.ts", UIStart);
            reg("script/Game/UISubpackages.ts", UISubpackages);
            reg("script/Game/UITask_GetAward.ts", UITask_GetAward);
            reg("script/Game/UITask.ts", UITask);
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
    GameConfig.startScene = "Scene/UISubpackages.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
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
