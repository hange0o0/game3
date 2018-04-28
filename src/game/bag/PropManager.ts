class PropManager {
    private static _instance:PropManager;
    public static getInstance():PropManager {
        if (!this._instance)
            this._instance = new PropManager();
        return this._instance;
    }

    public props
    public remove_prop
    public propLog

    public init(data){
       this.props = ObjectUtil.objToClass(data.list,MyPropVO);
       this.remove_prop = ObjectUtil.objToClass(data.remove,MyPropVO);
    }

    public dealRemoveProp(arr){
        if(!arr || !this.props)
            return;
        for(var i=0;i<arr.length;i++)
        {
            var temp = arr[i].split('@')
            var index = ArrayUtil.indexOf(this.props,temp[0],'id')//this.props.indexOf(temp[0]);
            if(index != -1)
                this.props.splice(index,1);
            this.remove_prop.push(new MyPropVO(arr[i]));
        }
    }

   public getList(){
       //清除已被用的
       var list = this.props.concat();
       var t = WM.now();
       for(var i=0;i<this.remove_prop.length;i++)
       {
            var temp = this.remove_prop[i]
           if(temp.useTime > t)
               list.push(temp)
           else
           {
               this.remove_prop.splice(i,1);
               i--;
           }
       }
       return list;
   }

    public getServerProp(fun?){
        if(this.props)
        {
            if(fun)
                fun();
            return;
        }
        var oo:any = {};
        Net.addUser(oo)
        Net.send(GameEvent.game.get_prop,oo,(data) =>{
            var msg = data.msg;
            this.init(msg.prop);
            if(fun)
                fun();
        });
    }

    public getPropLog(fun?){
        if(this.propLog)
        {
            if(fun)
                fun();
            return;
        }
        var oo:any = {};
        Net.addUser(oo)
        Net.send(GameEvent.game.get_prop,oo,(data) =>{
            var msg = data.msg;
            this.propLog = ObjectUtil.objToClass(msg.list,MyRoleActionVO);
            if(fun)
                fun();
        });
    }

    //抽道具
    public drawProp(num,fun?){
        var oo:any = {};
        oo.num = num;
        Net.addUser(oo)
        Net.send(GameEvent.game.draw_prop,oo,(data) =>{
            var msg = data.msg;
            if(msg.fail)
            {
                MyWindow.Alert('投入宝物出错！错误码：'+ msg.fail)
                return;
            }
            this.props = this.props.concat(ObjectUtil.objToClass(msg.prop,MyPropVO))
            EM.dispatch(GameEvent.client.prop_change);
            if(fun)
                fun(msg.prop);
        });
    }
}