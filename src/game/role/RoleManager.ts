class RoleManager {
    private static _instance:RoleManager;
    public static getInstance():RoleManager {
        if (!this._instance)
            this._instance = new RoleManager();
        return this._instance;
    }
    public roleObj = {};//所有角色数据合集
    public rankMax = 30;

    public current
    public rank
    public tempRank = [];//不知道要不要放进排行榜的角色
    //public dieRole = []//本次死亡的单位
    public newDie = []//新死亡还没提示的

    public news = []//新消息

    public init(data){
        for(var s in data.role)
        {
            this.roleObj[s] = new MyRoleVO(data.role[s]);
        }
        this.newDie = data.die || [];

        this.current = [];
        for(var s in data.current)
        {
            this.current.push(this.getRole(data.current[s]));
        }
    }

    public getRole(id):MyRoleVO{
        return this.roleObj[id];
    }

    public renewRole(data,id?){
        if(!id)
            id = data.id;
        var role = this.getRole(id);
        if(!role)
            role = this.roleObj[id] = new MyRoleVO(data);
        else
            role.fill(data)
        return role;
    }

    public onTimer(){
        //var news = this.runTime();
        //if(news.length > 0)
        //{
        //    this.news = news.concat(this.news)
        //    EM.dispatchEventWith(GameEvent.client.news_change,false,news)
        //}
        //
        //if(this.newDie.length > 0)
        //{
        //
        //}
    }



    public sortRoleArr(arr){
        ArrayUtil.sortByField(arr,['force','born'],[1,0])
    }


    //取最新世界数据
    public getServerRole(gameid,id,fun?){
        var oo:any = {};
        oo.id = id;
        oo.gameid = gameid;
        Net.send(GameEvent.game.role_info,oo,(data) =>{
            var msg = data.msg;
            if(!msg.role)
            {
                fun && fun();
                return
            }
            if(gameid == UM.gameid)
                var role = this.renewRole(msg.role)
            else
                var role = new MyRoleVO(msg.role)

            if(msg.role_action) //只有自己的才有，其它人能看到都是死了的
            {
                for(var i=0;i<msg.role_action.length;i++)
                {
                    var vo = new MyRoleActionVO(msg.role_action)
                    if(vo.time <= WorldManager.getInstance().now())
                        role.addAction(vo);
                }
            }
            if(fun)
                fun(role);
        });
    }

    //取最新世界数据
    public getRank(fun?){
        if(this.rank)
        {
            if(fun)
                fun();
            return;
        }
        var oo:any = {};
        oo.gameid = UM.gameid;
        Net.send(GameEvent.game.role_info,oo,(data) =>{
            var msg = data.msg;
            var rankRoleID = {};
            this.rank = [];
            for(var s in data.role)//能进排行榜都是死了的
            {
                this.renewRole(data.role[s]);
            }
            for(var s in data.list)
            {
                var role = this.getRole(data.list[s]);
                this.rank.push(role);
                rankRoleID = role.id;
            }

            if(this.tempRank.length)//测试新死亡的要加回排行榜
            {
                for(var i=0;i<this.tempRank.length;i++)
                {
                    var role = <MyRoleVO>this.tempRank[i];
                    if(!rankRoleID[role.id])
                        this.rank.push(role);
                }
                this.sortRoleArr(this.rank)
                if(this.rank.length > this.rankMax)
                    this.rank.length = this.rankMax;
            }


            if(fun)
                fun();
        });
    }

}