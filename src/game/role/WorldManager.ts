class WorldManager {
    private static _instance:WorldManager;

    public static getInstance():WorldManager {
        if (!this._instance)
            this._instance = new WorldManager();
        return this._instance;
    }


    public beginTime//被冻结时间
    public lastTime//上次结算时间
    public iceTime
    public force


    public createCD = 60 * 30//每次生成


    public history//已发生的事件
    public action//未发生的事件
    public init(gameData,userWorld) {
        this.beginTime = userWorld.begintime || 0;
        this.lastTime = userWorld.lasttime || 0;
        this.iceTime = userWorld.icetime || 0;
        this.force = userWorld.force || 0;

        this.history = ObjectUtil.objToClass(gameData.history,MyRoleActionVO);
        this.action = ObjectUtil.objToClass(gameData.action,MyRoleActionVO);

        this.runTime();

        var RM = RoleManager.getInstance();
        RM.init(gameData);
        for(var i=0;i<this.history.length;i++)
        {
              var hvo = this.history[i];
            var role = RM.getRole(hvo.id);
            role.lastAction = hvo;
        }




    }

    public now(){
        return TM.now() - this.beginTime - this.iceTime
    }

    public onTimer(){
        this.testGetData();
        var news = this.runTime();
        if(news.length > 0)
        {
            this.history = news.concat(this.history);
            EM.dispatchEventWith(GameEvent.client.action_change,false,news)
        }
    }

    private testGetData(){
         if(this.now() > this.beginTime + this.lastTime - 60)//提前1分钟请求
         {
             this.lastTime +=10;
             this.getWorld()
         }
    }

    //返回生效的
    public runTime(){
        var t = this.now()
        var news = [];
        var RM = RoleManager.getInstance();
        while(this.action[0])
        {
            var action:MyRoleActionVO = this.action[0];
            if(action.time > t)
                  break;
            this.action.shift();

            var role = RM.getRole(action.id);
            role.addAction(action);
            news.push(action);
            if(role.dieTime > 100)
            {
                RM.newDie.push(role.id)
                this.testAddRank(role);
                if(RM.current)
                {
                    var index = RM.current.indexOf(role.id);
                    RM.current.splice(index,1)
                }
            }
        }
        return news;
    }

    //测试是否可以上榜
    private testAddRank(role){
        var RM = RoleManager.getInstance();
        if(!RM.rank)
        {
            RM.tempRank.push(role);
            return;
        }
        if(RM.rank.length < RM.rankMax)
        {
            RM.rank.push(role)
            RM.sortRoleArr(RM.rank)
            return true
        }
        if(RM.rank[RM.rankMax-1].force < role.force)
        {
            RM.rank.pop();
            RM.rank.push(role)
            RM.sortRoleArr(RM.rank)
            return true
        }
        return false
    }

    //取最新世界数据
    public getWorld(fun?){
        var oo:any = {};
        Net.addUser(oo)
        Net.send(GameEvent.game.get_new_action,oo,(data) =>{
            var msg = data.msg;
            if(msg.action && msg.action.length > 0)
                this.action = this.action.concat(ObjectUtil.objToClass(msg.action,MyRoleActionVO));
            if(msg.role)
            {
                var RM = RoleManager.getInstance();
                for(var s in msg.role)
                {
                    RM.renewRole(data.role[s]);
                }
            }
            if(fun)
                fun();
        });
    }
}