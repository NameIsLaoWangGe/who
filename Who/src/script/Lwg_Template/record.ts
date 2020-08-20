
/**记录引擎中解决的一些问题，节约同类问题的解决时间*/
export module record {

    /**
       * 关于引擎
       * 打括号的是刚体属性，不打括号的是问题名称
       */
    export enum Engine {

        'atlas' = '当图集不在索引中，或者无法更新打包时，可以在bin文件夹下手动添加需要用到的图片和文件夹，这样的用以就是不打包，直接用',
        'spine_01(骨骼动画)' = '不知道为什么添加了spine(骨骼动画)，然后骨骼动画的图片设置成不打包之后，fileconfig.json文件就不更新打包信息了',

        'skeleton(骨骼动画)' = '骨骼动画所用到的图片是不可以打包的，否则取图片时候图片会错乱',

        'fileconfig.json(索引文件)' = 'atlas打包了，索引文件中找不到，可以把图片名称添加到fileconfig.json中',
    }
    /**
     * 关于2d物理引擎
     * 打括号的是刚体属性，不打括号的是问题名称
     */
    export enum Box2d {
        allowSleep = '这个属性是休眠，默认开启，操作过一次后，可能就休眠了，所以如果需要平凡操作，一定要记得打开',
        bullet = '这个属性防止高速穿透',
        dynamic = 'dynamic物理类型，是运动类型，无论是自由运动，通过力来运动，通过坐标移动，都可以可以产生碰撞反应，坐标移动的话，可以做如下设置this.rig.setVelocity({ x: 0, y: 0 });',

        'childMove' = '子节点刚体不会跟着主节点的移动而移动，所以在update里面可以设置子节点跟随，或者建立多个刚体,此方法在相互碰撞中可能会产生问题',
        'BoxCollider' = '方形碰撞框，目前是以两个物体的第一次碰到的边作为进入碰撞，持续碰撞，结束碰撞来计算的，所以对碰撞框是有要求的，例如父节点的box被挤压后，有穿透，带着子节点位移了，很容易就会结束碰撞'
    }

    export enum Unity {
        size = '一个模型真实大小测量方法，1、给一个模型增加一个boxCollider组件，此时会自动计算物体的长宽高，并且显示在boxcollider中;2、如果需要调整模型的大小，用scale，这时候会自动调整boxcollider的大小，无需手动调整，但是boxcollider的长宽高数字并不会发生改变，不需要改变这个值。那么此时模型的大小就是boxcollider.size*scale;3.如果物体的父节点也发生了scale缩放，则模型的真实大小为boxcollider.size*scale*parent.size；4、如果父节点还有父节点发生了缩放，那么逐级进行*parent.size',

        IsTrigger = '在box中，这个IsTrigger表示是否为触发器，如果IsTrigger=true，则不受物理属性影响，并且需要用onTriggerEnter进行碰撞检测，如果为false，则用onCollisionEnter方法检测碰撞；如果一个为true另一个为false的两个物体碰撞，那么在他们的挂载的脚本中，检测碰撞也是不一样的，必须和IsTrigger所匹配'
    }

    /**一些变量的初始化*/
    export enum Init {
        new = '声明引用变量，必须初始化，否则无法直接赋值，例如 provide point ：Laya.point,可以直接写成provide point ：Laya.Point = new Laya.Point();'
    }

    /**一些变量的初始化*/
    export enum Script {
        parentClass = '目前脚本内部很多通用方法，例如开场动画，消失动画，时间注册，self节点属性，等一些通用属性和方法，需要写个父类，然后开始直接运行父类的这些方法，就可以起到整合作用，不用每次都声明',
    }

    /**解谜游戏中需要注意的问题*/
    export enum Riddle {
        '(Room)房子的结构' = '移动物体的位置，所有房子必须满足PovitX和PovitY必须在房子的左上角，这样统一计算位置偏移',

        '(Room)房子的名称' = '房子的名称必须是唯一的旋转用的Room+需要，房子里面的物体名称要加上房子的名称',

        '(Room)房子的中心点' = '房子的中心点，暂时设置在房子的正中间，在属性列表里面修改，这样更加精确',

        '(Floor)地板的宽度' = '地板的宽度不短于房子的宽度，一般要略长于房子的长度，判断碰撞方便',

        '(Floor)悬空地板的宽度' = '悬空地板的宽度和普通地板的宽度一样，靠近墙壁的那一边必须不短于房子的宽度',

        '(Floor)地板的名字' = '地板的名字后面加上，房间的名称,例如"_Room1",这样可以肯定判定属于哪个房间，假如因为一点穿透，碰到了2个地板，可以通过名字来判定属于哪个房间',

        '(Floor)中间地板的高度要高一些' = '中间地板的高度要高一些，房子吸附时瞬间移动距离过大，出地板，和地板分离进入空状态，掉下去，因为没有范围控制',


        '(Person)角色刚开始的状态' = '角色当前无论属于哪个房间，刚开始必须放在和地板连接起来！',

        '(ladder)一个梯子配对一个上访通道' = '一个梯子配对一个上方通道的时候，两个物体命名规则必须是一样的顺序结尾利，例如ladder_01配对up_Aisle_01，ladder_02配对up_Aisle_02',

        '(ladder)梯子的命名' = '梯子的命名不需要加上房间名，因为第二个个房间的梯子和当前房间的梯子不会直接连接，否则没有意义，不如直接连接第二个梯子',

        '(Person)角色的方向需要通过播放不同方向的骨骼动画来改变' = '通过动画改变角色的方向最合适',

        '(Person)角色的碰撞框' = '角色的碰撞框高度需要大一些，否则可能会在出现吸附的时候，一帧内移动距离过大，出屏幕了，下一帧无法补回来了，并且需要给予角色移动范围',

        '(aisle)通道的碰撞框不要太宽' = '目前的碰撞是以最初的那个边来进行判断碰撞或者离开碰撞的，所以如果过大，房子挤压，可能会造成离开',

        '(aisle)通道必须紧密结合在一起' = '目前角色有三种状态，第一种是在梯子上，第二种是在地板上，第三种是在空中，如果离地过远，没有接触到另一个房间，那么可能就是在空中状态，会自由下落，不过可以做预防，如果角色离房间太远则拉到地板上',

        '(aisle)四个方向制作' = '通道的四个方向制作的时候，不要旋转方向，直接在当前方向制作，更加直观，修改方便；并且可以用4个prefab来动态添加通道',

        '(aisle)通道的中心点' = '目前通道的中心点放在房间的最边缘，X在房间的最边缘，Y在通道的中间，方便做吸附',

        '(aisle)通道旁边很近有墙壁的时候' = '拉宽通道的碰撞框，让碰到墙壁的时候也不出通道，这样就不会转向，因为转向需要重新碰撞',

        '(aisle)down通道的向上碰撞边缘需要高于地板' = '有一种情形，上下通道打通，并且上梯子更换了房间：梯子=》上通道（判断打开进入）=》另一房间下通道（下通道只有左右方向才判断，所以啥也不做）=》另一个房间地板，此时属于这个房间，并且改反向为左右=》接下来概率性会出现又碰到了下通道，因为有了左右方向，所以立即下去。此时，刚更换完房间，down通道依然打开，会立即下去，这是正确的逻辑，因为通道一直开着并且碰到了。但是我们的需求是这一次并不需要下去，因为直接下去，永远不会左右走了，进入不了第二个房间，所以这种情形下，为了玩家可以顺利进入下个房间，上去的这次应当不会碰到down通道，需要把down通道的碰撞框高度高于地板，即自换房间后，一直处于和下通道的碰撞中，只有左右走离开后，再次碰撞，才会触发下去的条件。',

        '(BtnSet)动态创建设置按钮' = '制作成预制体，节约拼关卡成本',
        '(KeyNum)动态创建钥匙显示' = '制作成预制体，节约拼关卡成本',
        '(BtnAgain)动态创建刷新按钮' = '制作成预制体，节约拼关卡成本',

        '(BelongRoom)角色行走的新思路' = '角色目前是在世界坐标内，连接不够紧密，还需要计算位置偏移，于是可以尝试另一种思路，每次角色必须在房间内，在房间内行走，一旦进入下一个房间需要进行如下操作：碰到通道=》进入下一个房间=》在总控制脚本内记录世界坐标和下个房间名称走向=》删掉自己=》总控制脚本从对象池创建一个新的角色=》通过世界坐标位置和新的房间计算出在新的房间内的位置和走向。这样的好处在于无限连接，不会出房间，并且可控。',

        '(moveDog)狗所在坐标系' = '移动狗和角色一样，必须在和角色在同一坐标系体系内，才可以用角色的脚本，一般分为两种，一种是房间坐标系，一种是世界坐标系，目前处于世界坐标系',

        '(wall)不可以同时碰撞墙壁和通道' = '加上房间有两层，在同一边上，上面一个通道，下面一个墙壁，此时墙壁短一些即可，防止角色同时碰到墙壁和通道，造成转向两次（等于没有转向）的情况！',

        '(wall)墙壁的高度' = '只有本房间内的墙壁才可以改变方向，防止房间相互撞击的时候，发生穿透，其他房间墙壁撞到角色了',
    }

    /**
     * 游戏中为解决bug
     * 打双引号的说明已解决或者解决后没有复现
    */
    export enum RiddleBug {
        'bug_01' = '连接过于平凡的时候，角色可能会掉下去，因为连接属于瞬间移动，那么这一帧当中，产生的距离如果过大，那么可能导致角色脱离地板，状态为空，下一帧补不回来，则直接掉下',

        bug_01Pre = '这个问题可以做一个房间范围控制，下一帧的时候，拉回来,碰到地板即可',

        bug_02Pre = '左右频繁连接断开，概率性出现角色掉下，大概复现方法，左右频繁连接后，来到第二个房间，此时第二个房间的通道断开了，然后碰到了这个通道，发现关闭后立即反向，直接出房间。原因可能是状态置空没做好，或者是和down通道一样，碰撞宽度要拉长到房间内，这样保持进入房间依然属于通道连接状态，不会发生再次碰撞，然后走了一段路才会离开通道，这样刚开始不会再和通道碰撞',
    }

    /**
     * 游戏中为解决bug
     * 打双引号的说明已解决或者解决后没有复现
     */
    export enum Editor {

    }

    /**
     * 游戏中为解决bug
     * 打双引号的说明已解决或者解决后没有复现
     */
    export enum Node {
        mouseEnabled = '节点上的这个属性为true时，可以注册点击事件，为false时，不触发点击事件！',
        '节点的长宽' = '节点的属性面板中，无论是sprite还是img只要在游戏中需要改变其图片，并且图片的大小发生了变化，只需要把节点的长宽变为空值auto即可，如果不变为auto，无论怎么换图片都是一样的大小，会压缩或者拉伸'
    }


    export enum Laya3D {
        '_defaultPhysicsMemory' = '如果出现内存不够的情况‘abort Cannot enlarge memory arrays’，在Laya.d3.js中的构造函数中改变this._defaultPhysicsMemory = 512;'

    }

    export enum LocalStorage {
        "Laya.LocalStorage.getItem()" = '在pc浏览器中，会自动把“null”转换为null，但是微信小游戏等不会，所以getItem()如果没有上传，返回的是一个字符串“null”，并不是是真正的null，所以不可以用Laya.LocalStorage.getItem()！==null，来判断有无存储，必须得用Laya.LocalStorage.getItem()！==“null”，如果用Laya.LocalStorage.getItem()！==null会被自动判定成Laya.LocalStorage.getItem()==false，用Laya.LocalStorage.getItem()！==“null”才为true，为了避免歧义，直接用Laya.LocalStorage.getItem()是正确或者是错误即可有无存储',

        'JSON.parse()' = 'json转换成对象问题，同上在pc浏览器中，会自动把“null”转换为null，当Laya.LocalStorage.getJson()时，如果是没有上传json，那么在小游戏中返回的是“null”，pc会自动把“null”转换为null，此时浏览器不会报错，而小游戏中JSON.parse(“null”)是报错的，因为非json结构，所以此时不可以直接用JSON.parse(Laya.LocalStorage.getJson())，需先做判断!Laya.LocalStorage.getItem(),有上传过才可以转换',

        '上传格式' = '为了统一，不要用number进行存储，所有的数据在本地存取的时候都用string和null，需要转换时则转换成number等',

    }

    /**出包*/
    export enum Pack {

        '资源加载不出来——01'='分包后，依然需要把分包的一些资源例如场景json、图片等进行预加载，否则可能会出现丢失的情况',
        '资源加载不出来——02'='上传平台是，如果还有写资源包括文件夹，因为大小写对不上而加载不出来，但是在浏览器中可能会忽略',
        
    }
}