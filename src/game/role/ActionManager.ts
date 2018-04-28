class ActionManager {
    private static _instance:ActionManager;

    public static getInstance():ActionManager {
        if (!this._instance)
            this._instance = new ActionManager();
        return this._instance;
    }

    private bornPlace = [];
    public constructor() {

    }

    private getBornPlace(id,time){
        return this.bornPlace[id%this.bornPlace.length]
    }

    public getDes(vo:MyRoleActionVO){
        var remark = vo.remark.concat();
        var rd = MyTool.str2Num(remark.pop());
        var placeStr =  remark.shift()
        if(placeStr.indexOf('#') == -1)
            placeStr = this.getBornPlace(parseInt(placeStr),vo.time)
        var place = new MyPlaceVO(placeStr);

        var type =  MyTool.str2Num(remark.shift());
       var str = this['action' + type](remark,place,rd);

        return str;
    }

    //出生
    private action0(remark,place,rd){
        var str = '出生于' + place.name;
        return str;
    }

    //发现道具
    private action1(remark,place,rd){
        var propVO = new MyPropVO(remark.shift());
        var str = '在' + place.name + '发现了' + propVO.name;
        return str;
    }

    //死亡
    private action2(remark,place,rd){
        var str = '死于' + place.name;
        return str;
    }

    //什么都没发生
    private action61(remark,place,rd){
        var str = '在' + place.name + '虚度年华';
        return str;
    }
}

