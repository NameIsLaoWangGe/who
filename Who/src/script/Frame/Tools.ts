/**工具模块*/
export module Tools {
    /**
    * RGB三个颜色值转换成16进制的字符串‘000000’，需要加上‘#’；
    * @param r 
    * @param g
    * @param b
     */
    export function color_RGBtoHexString(r, g, b) {
        return '#' + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
    }
    /**
   * 将数字格式化，例如1000 = 1k；
   * @param number 数字
   */
    export function format_FormatNumber(number: number): string {
        if (typeof (number) !== "number") {
            console.warn("要转化的数字并不为number");
            return number;
        }
        let backNum: string;
        if (number < 1000) {
            backNum = "" + number;
        } else if (number < 1000000) {
            backNum = "" + (number / 1000).toFixed(1) + "k";
        } else if (number < 10e8) {
            backNum = "" + (number / 1000000).toFixed(1) + "m";
        } else {
            backNum = "" + number;
        }
        return backNum;
    }

    /**
     * 字符串和数字相加返回字符串
     * */
    export function format_StrAddNum(str: string, num: number): string {
        return (Number(str) + num).toString();
    }
    /**
     * 数字和字符串相加返回数字
     * */
    export function format_NumAddStr(num: number, str: string): number {
        return Number(str) + num;
    }

    /**
     * 根据子节点的某个属性，获取相同属性的数组
     * @param node 节点
     * @param property 属性值
     * @param value 值
     * */
    export function node_GetChildArrByProperty(node: Laya.Node, property: string, value: any): Array<Laya.Node> {
        let childArr = [];
        for (let index = 0; index < node.numChildren; index++) {
            const element = node.getChildAt(index);
            if (element[property] == value) {
                childArr.push(element);
            }
        }
        return childArr;
    }

    /**
     * 随机出数个子节点，返回这个子节点数组
     * @param node 节点
     * @param num 数量，默认为1
     */
    export function node_RandomChildren(node: Laya.Node, num?: number): Array<Laya.Node> {
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

    /**
     * 移除该节点的所有子节点，没有子节点则无操作
     * @param node 节点
     */
    export function node_RemoveAllChildren(node: Laya.Node): void {
        if (node.numChildren > 0) {
            node.removeChildren(0, node.numChildren - 1);
        }
    }

    /**
     * 切换隐藏或显示子节点，当输入的名称数组是隐藏时，其他子节点则是显示
     * @param node 节点
     * @param childNameArr 子节点名称数组
     * @param bool 隐藏还是显示，true为显示，flase为隐藏
     */
    export function node_2DShowExcludedChild(node: Laya.Sprite, childNameArr: Array<string>, bool: boolean): void {
        for (let i = 0; i < node.numChildren; i++) {
            let Child = node.getChildAt(i) as Laya.Sprite;
            for (let j = 0; j < childNameArr.length; j++) {
                if (Child.name == childNameArr[j]) {
                    if (bool) {
                        Child.visible = true;
                    } else {
                        Child.visible = false;
                    }
                } else {
                    if (bool) {
                        Child.visible = false;
                    } else {
                        Child.visible = true;
                    }
                }
            }
        }
    }
    /**
     * 切换隐藏或显示子节点，当输入的名称数组是隐藏时，其他子节点则是显示
     * @param node 节点
     * @param childNameArr 子节点名称数组
     * @param bool 隐藏还是显示，true为显示，flase为隐藏
     */
    export function node_3DShowExcludedChild(node: Laya.MeshSprite3D, childNameArr: Array<string>, bool: boolean): void {
        for (let i = 0; i < node.numChildren; i++) {
            let Child = node.getChildAt(i) as Laya.MeshSprite3D;
            for (let j = 0; j < childNameArr.length; j++) {
                if (Child.name == childNameArr[j]) {
                    if (bool) {
                        Child.active = true;
                    } else {
                        Child.active = false;
                    }
                } else {
                    if (bool) {
                        Child.active = false;
                    } else {
                        Child.active = true;
                    }
                }
            }
        }
    }

    /**
     *2D隐藏或者打开所有子节点
     * @param node 节点
     * @param bool visible控制
    */
    export function node_2DChildrenVisible(node: Laya.Sprite, bool: boolean): void {
        for (let index = 0; index < node.numChildren; index++) {
            const element = node.getChildAt(index) as Laya.Sprite;
            if (bool) {
                element.visible = true;
            } else {
                element.visible = false;
            }
        }
    }

    /**
     *2D隐藏或者打开所有子节点
     * @param node 节点
     * @param bool visible控制
    */
    export function node_3DChildrenVisible(node: Laya.MeshSprite3D, bool: boolean): void {
        for (let index = 0; index < node.numChildren; index++) {
            const element = node.getChildAt(index) as Laya.MeshSprite3D;
            if (bool) {
                element.active = true;
            } else {
                element.active = false;
            }
        }
    }

    /**3D递归向下查找子节点*/
    export function node_3dFindChild(parent: any, name: string): Laya.MeshSprite3D {
        var item: Laya.MeshSprite3D = null;
        //寻找自身一级目录下的子物体有没有该名字的子物体
        item = parent.getChildByName(name) as Laya.MeshSprite3D;
        //如果有，返回他
        if (item != null) return item;
        var go: Laya.MeshSprite3D = null;
        //如果没有，就吧该父物体所有一级子物体下所有的二级子物体找一遍(以此类推)
        for (var i = 0; i < parent.numChildren; i++) {
            go = node_3dFindChild(parent.getChildAt(i) as Laya.MeshSprite3D, name);
            if (go != null)
                return go;
        }
        return null;
    }

    /**2D递归向下查找子节点*/
    export function node_2dFindChild(parent: any, name: string): Laya.Sprite {
        var item: Laya.Sprite = null;
        //寻找自身一级目录下的子物体有没有该名字的子物体
        item = parent.getChildByName(name) as Laya.Sprite;
        //如果有，返回他
        if (item != null) return item;
        var go: Laya.Sprite = null;
        //如果没有，就吧该父物体所有一级子物体下所有的二级子物体找一遍(以此类推)
        for (var i = 0; i < parent.numChildren; i++) {
            go = node_2dFindChild(parent.getChildAt(i) as Laya.Sprite, name);
            if (go != null)
                return go;
        }
        return null;
    }

    /**
     * 返回0或者1，用随机二分之一概率,返回后0是false，true是1，所以Boolen和number都可以判断
     * */
    export function randomOneHalf(): number {
        let number;
        number = Math.floor(Math.random() * 2);
        return number;
    }

    /**
     * 在某个区间内取一个整数
     * @param section1 区间1
     * @param section2 区间2，不输入则是0~section1
     */
    export function randomNumber(section1, section2?: number): number {
        if (section2) {
            return Math.floor(Math.random() * (section2 - section1)) + section1;
        } else {
            return Math.floor(Math.random() * section1);
        }
    }

    /**
     * 返回一个数值区间内的数个随机数
     * @param section1 区间1
     * @param section2 区间2,不输入则是0~section1
     * @param count 数量默认是1个
     * @param intSet 是否是整数,默认是整数，为true
     */
    export function randomCountNumer(section1: number, section2?: number, count?: number, intSet?: boolean): Array<number> {
        let arr = [];
        if (!count) {
            count = 1;
        }
        if (intSet == undefined) {
            intSet = true;
        }
        if (section2) {
            while (count > arr.length) {
                let num;
                if (intSet) {
                    num = Math.floor(Math.random() * (section2 - section1)) + section1;
                } else {
                    num = Math.random() * (section2 - section1) + section1;
                }
                arr.push(num);
                Tools.arrayUnique_01(arr);
            };
            return arr;
        } else {
            while (count > arr.length) {
                let num;
                if (intSet) {
                    num = Math.floor(Math.random() * section1);
                } else {
                    num = Math.random() * section1;
                }
                arr.push(num);
                Tools.arrayUnique_01(arr);
            }
            return arr;
        }
    }


    /**返回两个二维物体的距离*/
    export function d2_twoObjectsLen(obj1: Laya.Sprite, obj2: Laya.Sprite): number {
        let point = new Laya.Point(obj1.x, obj1.y);
        let len = point.distance(obj2.x, obj2.y);
        return len;
    }

    /**
      * 在Laya2维世界中
      * 求向量的夹角在坐标系中的角度
      * @param x 坐标x
      * @param y 坐标y
      * */
    export function d2_Vector_Angle(x, y): number {
        let radian: number = Math.atan2(x, y) //弧度  0.6435011087932844
        let angle: number = 90 - radian * (180 / Math.PI); //角度  36.86989764584402;
        if (angle <= 0) {
            angle = 270 + (90 + angle);
        }
        return angle - 90;
    };

    /**
     * 在Laya2维世界中
     * 通过一个角度，返回一个单位向量
     * @param x 坐标x
     * @param y 坐标y
     * */
    export function d2_angle_Vector(angle): Laya.Point {
        angle -= 90;
        let radian = (90 - angle) / (180 / Math.PI);
        let p = new Laya.Point(Math.sin(radian), Math.cos(radian));
        p.normalize();
        return p;
    };

    /**
     * 返回两个三维物体的世界空间的距离
     * @param obj1 物体1
     * @param obj2 物体2
     */
    export function d3_twoObjectsLen(obj1: Laya.MeshSprite3D, obj2: Laya.MeshSprite3D): number {
        let obj1V3: Laya.Vector3 = obj1.transform.position;
        let obj2V3: Laya.Vector3 = obj2.transform.position;
        let p = new Laya.Vector3();
        // 向量相减后计算长度
        Laya.Vector3.subtract(obj1V3, obj2V3, p);
        let lenp = Laya.Vector3.scalarLength(p);
        return lenp;
    }

    /**
     * 返回两个3维向量之间的距离
    * @param v1 物体1
    * @param v2 物体2
    */
    export function d3_twoPositionLen(v1: Laya.Vector3, v2: Laya.Vector3): number {
        let p = d3_twoSubV3(v1, v2);
        let lenp = Laya.Vector3.scalarLength(p);
        return lenp;
    }

    /**
      * 返回相同坐标系中两个三维向量的相减向量（obj1-obj2）
      * @param V3_01 向量1
      * @param V3_02 向量2
      * @param normalizing 是否是单位向量,默认为不是
      */
    export function d3_twoSubV3(V3_01: Laya.Vector3, V3_02: Laya.Vector3, normalizing?: boolean): Laya.Vector3 {
        let p = new Laya.Vector3();
        // 向量相减后计算长度
        Laya.Vector3.subtract(V3_01, V3_02, p);
        if (normalizing) {
            let p1: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.normalize(p, p1);
            return p1;
        } else {
            return p;
        }
    }

    /**
      * 3D世界中，制约一个物体不会超过和另一个点的最长距离,如果超过或者等于则设置这个球面坐标，并且返回这个坐标
      * @param originV3 原点的位置
      * @param obj 物体
      * @param length 长度
     */
    export function d3_maximumDistanceLimi(originV3: Laya.Vector3, obj: Laya.Sprite3D, length: number): Laya.Vector3 {
        // 两个向量相减等于手臂到手的向量
        let subP = new Laya.Vector3();
        let objP = obj.transform.position;
        Laya.Vector3.subtract(objP, originV3, subP);
        // 向量的长度
        let lenP = Laya.Vector3.scalarLength(subP);
        if (lenP >= length) {
            // 归一化向量
            let normalizP = new Laya.Vector3();
            Laya.Vector3.normalize(subP, normalizP);
            // 坐标
            let x = originV3.x + normalizP.x * length;
            let y = originV3.y + normalizP.y * length;
            let z = originV3.z + normalizP.z * length;
            let p = new Laya.Vector3(x, y, z);
            obj.transform.position = p;
            return p;
        }
    }

    /**
     * 射线检测，返回射线扫描结果，可以筛选结果
     * @param camera 摄像机
     * @param scene3D 当前场景
     * @param vector2 触摸点
     * @param filtrateName 找出指定触摸的模型的信息，如果不传则返回全部信息数组；
     */
    export function d3_rayScanning(camera: Laya.Camera, scene3D: Laya.Scene3D, vector2: Laya.Vector2, filtrateName?: string): any {
        /**射线*/
        let _ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
        /**射线扫描结果*/
        let outs: Array<Laya.HitResult> = new Array<Laya.HitResult>();
        //产生射线
        //射线碰撞到挡屏，用来设置手的初始位置，挡屏的属性isTrigger 要勾上，这样只检测碰撞，不产生碰撞反应
        camera.viewportPointToRay(vector2, _ray);
        scene3D.physicsSimulation.rayCastAll(_ray, outs);
        //找到挡屏的位置，把手的位置放在投屏位置的上方，也就是触摸点的上方
        if (outs.length != 0 && filtrateName) {
            let outsChaild = null;
            for (var i = 0; i < outs.length; i++) {
                //找到挡屏
                let hitResult = outs[i].collider.owner;
                if (hitResult.name === filtrateName) {
                    // 开启移动
                    outsChaild = outs[i];
                }
            }
            return outsChaild;
        } else {
            return outs;
        }
    }

    /**
     * 将3D坐标转换成屏幕坐标
     * @param v3 3D世界的坐标
     * @param camera 摄像机
    */
    export function d3_TransitionScreenPointfor(v3: Laya.Vector3, camera: Laya.Camera): Laya.Vector2 {
        let ScreenV3 = new Laya.Vector3();
        camera.viewport.project(v3, camera.projectionViewMatrix, ScreenV3);
        let point: Laya.Vector2 = new Laya.Vector2();
        point.x = ScreenV3.x;
        point.y = ScreenV3.y;
        return point;
    }

    /**
      * 播放动画。
      * @param Sp3D 节点
      * @param name 如果为null则播放默认动画，否则按名字播放动画片段。
      * @param normalizedTime 归一化的播放起始时间。
      * @param layerIndex 层索引。
      */
    export function d3_animatorPlay(Sp3D: Laya.Sprite3D, aniName?: string, normalizedTime?: number, layerIndex?: number): Laya.Animator {
        let sp3DAni = Sp3D.getComponent(Laya.Animator) as Laya.Animator;
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

    /**
     * 返回一个向量相对于一个点的反向向量，或者反向向量的单位向量，可用于一个物体被另一个物体击退
     * @param type 二维还是三维
     * @param Vecoter1 固定点
     * @param Vecoter2 反弹物体向量
     * @param normalizing 是否归一成单位向量
     */
    export function dAll_reverseVector(type: string, Vecoter1: any, Vecoter2: any, normalizing: boolean): Laya.Vector3 {
        let p;
        if (type === '2d') {
            p = new Laya.Point(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y);
            if (normalizing) {
                p.normalize();
            }
            return p;

        } else if (type === '3d') {
            p = new Laya.Vector3(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y, Vecoter1.z - Vecoter2.z);
            if (normalizing) {
                let returnP = new Laya.Vector3();
                Laya.Vector3.normalize(p, returnP);
                return returnP;
            } else {
                return p;
            }
        }
    }

    export function sk_indexControl(sk: Laya.Skeleton, name: string): void {
        sk.play(name, true);//从初始位置开始继续播放
        sk.player.currentTime = 15 * 1000 / sk.player.cacheFrameRate;
    }

    /**
     * 为一个节点绘制一个扇形遮罩
     * 想要遮罩的形状发生变化，必须先将父节点的cacheAs改回“none”，接着改变其角度，再次将cacheAs改为“bitmap”，必须在同一帧内进行，因为是同一帧，所以在当前帧最后或者下一帧前表现出来，帧内时间不会表现任何状态，这是个思路，帧内做任何变化都不会显示，只要帧结尾改回来就行。
     * @param parent 被遮罩的节点，也是父节点
     * @param startAngle 扇形的初始角度
     * @param endAngle 扇形结束角度
    */
    export function draw_drawPieMask(parent, startAngle, endAngle): Laya.DrawPieCmd {
        // 父节点cacheAs模式必须为"bitmap"
        parent.cacheAs = "bitmap";
        //新建一个sprite作为绘制扇形节点
        let drawPieSpt = new Laya.Sprite();
        //设置叠加模式
        drawPieSpt.blendMode = "destination-out";
        // 加入父节点
        parent.addChild(drawPieSpt);
        // 绘制扇形，位置在中心位置，大小略大于父节点，保证完全遮住
        let drawPie = drawPieSpt.graphics.drawPie(parent.width / 2, parent.height / 2, parent.width / 2 + 10, startAngle, endAngle, "#000000");
        return drawPie;
    }

    /**
     * 对象数组按照对象的某个属性排序
     * @param array 对象数组
     * @param property 对象中一个相同的属性名称
     */
    export function objArrPropertySort(array: Array<any>, property: string): Array<any> {
        var compare = function (obj1, obj2) {
            var val1 = obj1[property];
            var val2 = obj2[property];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
        array.sort(compare);
        return array;
    }

    /**
     * 对比两个对象数组中的某个对象属性，返回相对第一个数组中有的这个property属性，第二个数组中没有这个属性的对象数组，例如两张数据表，通过名字查找，objArr2有8个不同的名字，objArr1也有（也可以没有）这个8个名字，并且objArr1还多了其他两个名字，那么返回objArr1中这两个个名字
     * @param objArr1 对象数组1
     * @param objArr2 对象数组2
     * @param property 需要对比的属性名称
    */
    export function objArr2DifferentPropertyObjArr1(objArr1: Array<any>, objArr2: Array<any>, property: string): Array<any> {
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

    /**
     * 返回两个数组对象中，有相同属性的对象集合
     * @param data1 对象数组1
     * @param data2 对象数组2
     * @param property 需要对比的属性名称
     */
    export function objArr1IdenticalPropertyObjArr2(data1: Array<any>, data2: Array<any>, property: string): Array<any> {
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

    /**
     * 对象数组去重，根据对象的某个属性值去重
     * @param arr 数组
     * @param property 属性
     * */
    export function objArrUnique(arr, property): void {
        for (var i = 0, len = arr.length; i < len; i++) {
            for (var j = i + 1, len = arr.length; j < len; j++) {
                if (arr[i][property] === arr[j][property]) {
                    arr.splice(j, 1);
                    j--;        // 每删除一个数j的值就减1
                    len--;      // j值减小时len也要相应减1（减少循环次数，节省性能）   
                }
            }
        }
        return arr;
    }

    /**
     * 根据一个对像的属性，从对象数组中返回某个属性的值数组
     * @param arr 
     * @param property 
     */
    export function objArrGetValue(objArr, property): Array<any> {
        let arr = [];
        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i][property]) {
                arr.push(objArr[i][property]);
            }
        }
        return arr;
    }

    /**
     * 对象数组的拷贝
     * @param ObjArray 需要拷贝的对象数组 
     */
    export function objArray_Copy(ObjArray): any {
        var sourceCopy = ObjArray instanceof Array ? [] : {};
        for (var item in ObjArray) {
            sourceCopy[item] = typeof ObjArray[item] === 'object' ? obj_Copy(ObjArray[item]) : ObjArray[item];
        }
        return sourceCopy;
    }

    /**
     * 对象的拷贝
     * @param obj 需要拷贝的对象
     */
    export function obj_Copy(obj) {
        var objCopy = {};
        for (const item in obj) {
            if (obj.hasOwnProperty(item)) {
                const element = obj[item];
                if (typeof element === 'object') {
                    // 其中有一种情况是对某个对象值为数组的拷贝
                    if (Array.isArray(element)) {
                        let arr1 = array_Copy(element);
                        objCopy[item] = arr1;
                    } else {
                        obj_Copy(element);
                    }
                } else {
                    objCopy[item] = element;
                }
            }
        }
        return objCopy;
    }

    /**
     * 往第一个数组中陆续添加第二个数组中的元素
     * @param array1 
     * @param array2
     */
    export function arrayAddToarray(array1, array2): Array<any> {
        for (let index = 0; index < array2.length; index++) {
            const element = array2[index];
            array1.push(element);
        }
        return array1;
    }

    /**
     * 从一个数组中随机取出几个元素，如果刚好是数组长度，则等于是乱序,此方法不会改变原数组
     * @param arr 数组
     * @param num 取出几个元素默认为1个
     */
    export function arrayRandomGetOut(arr: Array<any>, num?: number): any {
        if (!num) {
            num = 1;
        }
        let arrCopy = Tools.array_Copy(arr);
        let arr0 = [];
        if (num > arrCopy.length) {
            return '数组长度小于取出的数！';
        } else {
            for (let index = 0; index < num; index++) {
                let ran = Math.round(Math.random() * (arrCopy.length - 1));
                let a1 = arrCopy[ran];
                arrCopy.splice(ran, 1);
                arr0.push(a1);
            }
            return arr0;
        }
    }

    /**
     * 普通数组复制 
     * @param arr1 被复制的数组
     */
    export function array_Copy(arr1): Array<any> {
        var arr = [];
        for (var i = 0; i < arr1.length; i++) {
            arr.push(arr1[i]);
        }
        return arr;
    }

    /**
     * 数组去重
     * @param arr 数组
    */
    export function arrayUnique_01(arr): Array<any> {
        for (var i = 0, len = arr.length; i < len; i++) {
            for (var j = i + 1, len = arr.length; j < len; j++) {
                if (arr[i] === arr[j]) {
                    arr.splice(j, 1);
                    j--;        // 每删除一个数j的值就减1
                    len--;      // j值减小时len也要相应减1（减少循环次数，节省性能）   
                }
            }
        }
        return arr;
    }

    /**数组去重*/
    export function arrayUnique_02(arr): Array<any> {
        arr = arr.sort();
        var arr1 = [arr[0]];
        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] !== arr[i - 1]) {
                arr1.push(arr[i]);
            }
        }
        return arr1;
    }

    /**ES6数组去重,返回的数组是新数组，需接收*/
    export function arrayUnique_03(arr): Array<any> {
        return Array.from(new Set(arr));
    }

    /**
     * 返回从第一个数组中排除第二个数组中的元素，也就是第二个数组中没有第一个数组中的这些元素，如果第一个数组包含第二个数组，那么刚好等于是第一个数组排除第二个数组的元素
     * @param arr1 
     * @param arr2 
     */
    export function array1ExcludeArray2(arr1, arr2): Array<any> {

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

    /**
     * 找出几个数组中都有的元素，或者相互没有的元素，
     * 查找方法如下：如果某个元素的个数等于数组个数，这说明他们都有；
     * @param arrays 数组组成的数组
     * @param exclude 默认为false,false为返回都有的元素，true为返回排除这些相同元素，也就是相互没有的元素
     */
    export function array_ExcludeArrays(arrays: Array<Array<any>>, exclude?: boolean): Array<any> {
        // 避免三重for循环嵌套，一步一步做
        // 取出所有元素
        let arr0 = [];
        for (let i = 0; i < arrays.length; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                arr0.push(arrays[i][j]);
            }
        }
        // 保留arr0，赋值一份
        let arr1 = Tools.array_Copy(arr0);
        // 去重排列出元素列表
        let arr2 = Tools.arrayUnique_01(arr1);

        // 列出记录数量的数组
        let arrNum = [];
        for (let k = 0; k < arr2.length; k++) {
            arrNum.push({
                name: arr2[k],
                num: 0,
            });
        }

        // 记录数量
        for (let l = 0; l < arr0.length; l++) {
            for (let m = 0; m < arrNum.length; m++) {
                if (arr0[l] == arrNum[m]['name']) {
                    arrNum[m]['num']++;
                }
            }
        }
        // 找出数量和arrays长度相同或者不相同的数组
        let arrAllHave = [];
        let arrDiffHave = [];
        for (let n = 0; n < arrNum.length; n++) {
            const element = arrNum[n];
            if (arrNum[n]['num'] == arrays.length) {
                arrAllHave.push(arrNum[n]['name']);
            } else {
                arrDiffHave.push(arrNum[n]['name']);
            }
        }
        if (!exclude) {
            return arrAllHave;
        } else {
            return arrDiffHave;
        }
    }

    /**
     * 二维坐标中一个点按照另一个点旋转一定的角度后，得到的点
     * @param x0 原点X
     * @param y0 原点Y
     * @param x1 旋转点X
     * @param y1 旋转点Y
     * @param angle 角度
     */
    export function point_DotRotatePoint(x0, y0, x1, y1, angle): Laya.Point {
        let x2 = x0 + (x1 - x0) * Math.cos(angle * Math.PI / 180) - (y1 - y0) * Math.sin(angle * Math.PI / 180);
        let y2 = y0 + (x1 - x0) * Math.sin(angle * Math.PI / 180) + (y1 - y0) * Math.cos(angle * Math.PI / 180);
        return new Laya.Point(x2, y2);
    }

    /**
     * 根据不同的角度和速度计算坐标,从而产生位移
     * @param angle 角度
     * @param speed 移动速度
     * */
    export function point_SpeedXYByAngle(angle: number, speed: number): Laya.Point {
        if (angle % 90 === 0 || !angle) {
            //debugger
        }
        const speedXY = { x: 0, y: 0 };
        speedXY.x = speed * Math.cos(angle * Math.PI / 180);
        speedXY.y = speed * Math.sin(angle * Math.PI / 180);
        return new Laya.Point(speedXY.x, speedXY.y);
    }
    /**
    * 求圆上的点的坐标，可以根据角度和半径作出圆形位移
    * @param angle 角度
    * @param radius 半径
    * @param centerPos 原点
    */
    export function point_GetRoundPos(angle: number, radius: number, centerPos: Laya.Point): Laya.Point {
        var center = centerPos; //圆心坐标
        var radius = radius; //半径
        var hudu = (2 * Math.PI / 360) * angle; //90度角的弧度

        var X = center.x + Math.sin(hudu) * radius; //求出90度角的x坐标
        var Y = center.y - Math.cos(hudu) * radius; //求出90度角的y坐标
        return new Laya.Point(X, Y);
    }

    /**
     * 返回在一个中心点周围的随机产生数个点的数组
     * @param centerPos 中心点坐标
     * @param radiusX X轴半径
     * @param radiusY Y轴半径
     * @param count 产生多少个随机点
     */
    export function point_RandomPointByCenter(centerPos: Laya.Point, radiusX: number, radiusY: number, count?: number): Array<Laya.Point> {
        if (!count) {
            count = 1;
        }
        let arr: Array<Laya.Point> = [];
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

    /**
     * 根据角度计算弧度
     * @param angle 角度
     */
    export function angle_GetRad(angle) {
        return angle / 180 * Math.PI;
    }

    /**
      * 获取本地存储数据并且和文件中数据表对比,对比后会上传
      * @param url 本地数据表地址
      * @param storageName 本地存储中的json名称
      * @param propertyName 数组中每个对象中同一个属性名，通过这个名称进行对比
      */
    export function jsonCompare(url: string, storageName: string, propertyName: string): Array<any> {
        // 第一步，先尝试从本地缓存获取数据，
        // 第二步，如果本地缓存有，那么需要和数据表中的数据进行对比，把缓存没有的新增对象复制进去
        // 第三步，如果本地缓存没有，那么直接从数据表获取
        let dataArr;
        if (Laya.LocalStorage.getJSON(storageName)) {
            dataArr = JSON.parse(Laya.LocalStorage.getJSON(storageName))[storageName];
            console.log(storageName + '从本地缓存中获取到数据,将和文件夹的json文件进行对比');
            try {
                let dataArr_0: Array<any> = Laya.loader.getRes(url)['RECORDS'];
                // 如果本地数据条数大于json条数，说明json减东西了，不会对比，json只能增加不能删减
                if (dataArr_0.length >= dataArr.length) {
                    let diffArray = Tools.objArr2DifferentPropertyObjArr1(dataArr_0, dataArr, propertyName);
                    console.log('两个数据的差值为：', diffArray);
                    Tools.arrayAddToarray(dataArr, diffArray);
                } else {
                    console.log(storageName + '数据表填写有误，长度不能小于之前的长度');
                }
            } catch (error) {
                console.log(storageName, '数据赋值失败！请检查数据表或者手动赋值！')
            }
        } else {
            try {
                dataArr = Laya.loader.getRes(url)['RECORDS'];
            } catch (error) {
                console.log(storageName + '数据赋值失败！请检查数据表或者手动赋值！')
            }
        }
        let data = {};
        data[storageName] = dataArr;
        Laya.LocalStorage.setJSON(storageName, JSON.stringify(data));
        return dataArr;
    }
}