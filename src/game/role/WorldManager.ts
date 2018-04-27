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





    public history//已发生的事件
    public action//未发生的事件
    public init(gameData,userWorld) {
        this.beginTime = userWorld.begintime || 0;
        this.lastTime = userWorld.lasttime || 0;
        this.iceTime = userWorld.icetime || 0;
        this.force = userWorld.force || 0;

        this.history = ObjectUtil.objToClass(gameData.history,MyRoleActionVO);
        this.action = ObjectUtil.objToClass(gameData.action,MyRoleActionVO);



        var RM = RoleManager.getInstance();
        RM.init(gameData);
        for(var i=0;i<this.history.length;i++)
        {
              var hvo = this.history[i];
            var role = RM.getRole(hvo.id);
            role.lastAction = hvo;
        }


        this.runTime();

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
        while(this.action && this.action[0])
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
    private testAddDie(role){
        var RM = RoleManager.getInstance();
        if(!RM.die)
        {
            RM.tempDie.push(role);
            return;
        }
        RM.die.unshift(role)
        if( RM.die.length > GameConfig.dieMax)
            RM.die.length = GameConfig.dieMax;
        return true
    }

    //测试是否可以上榜
    private testAddRank(role){
        var RM = RoleManager.getInstance();
        if(!RM.rank)
        {
            RM.tempRank.push(role);
            return;
        }
        if(RM.rank.length < GameConfig.rankMax)
        {
            RM.rank.push(role)
            RM.sortRoleArr(RM.rank)
            return true
        }
        if(RM.rank[GameConfig.rankMax-1].force < role.force)
        {
            RM.rank.pop();
            RM.rank.push(role);
            RM.sortRoleArr(RM.rank);
            RM.rank.length = GameConfig.rankMax;
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
            PropManager.getInstance().dealRemoveProp(msg.remove_prop)
            if(fun)
                fun();
        });
    }
}