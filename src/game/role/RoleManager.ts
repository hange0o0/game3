class RoleManager {
    private static _instance:RoleManager;
    public static getInstance():RoleManager {
        if (!this._instance)
            this._instance = new RoleManager();
        return this._instance;
    }
    public roleObj = {};
    public historyMax = 30;

    public current_role
    public history_role
    public die_role = []//本次死亡的单位
    public newDie = []//新死亡还没提示的

    public news = []//新消息

    public init(data){
        this.current_role = this.renewRole(data.current_role.list);
        this.history_role = this.renewRole(data.history_role.list);
        this.sortRoleArr(this.history_role)
        if(data.die_role)
        {
            this.die_role = this.renewRole(data.die_role);
            this.newDie = this.die_role.concat();
        }
    }

    private renewRole(arr){
        for(var i=0;i<arr.length;i++)
        {
            arr[i] = new MyRoleVO(arr[i])
            this.roleObj[arr[i].id] = arr[i];
        }
        return arr;
    }

    public onTimer(){
        var news = this.runTime();
        if(news.length > 0)
        {
            this.news = news.concat(this.news)
            EM.dispatchEventWith(GameEvent.client.news_change,false,news)
        }

        if(this.newDie.length > 0)
        {

        }
    }

    //返回生效的
    public runTime(){
        var t = WM.now()
        var news = [];
        for(var i=0;i<this.current_role.length;i++)
        {
            var role:MyRoleVO = this.current_role[i];
            var arr = role.testAction(t)
            if(arr.length > 0)
                news = news.concat(arr);
            if(role.isDie)
            {
                this.newDie.push(role)
                this.testAddHistory(role);
                this.current_role.splice(i,1)
                i--;
            }
        }
        return news;
    }

    //测试是否可以上榜
    private testAddHistory(role){
        if(this.history_role.length < this.historyMax)
        {
            this.history_role.push(role)
            this.sortRoleArr(this.history_role)
            return true
        }
        if(this.history_role[this.historyMax-1].force < role.force)
        {
            this.history_role.pop();
            this.history_role.push(role)
            this.sortRoleArr(this.history_role)
            return true
        }
        return false
    }

    public sortRoleArr(arr){
        ArrayUtil.sortByField(arr,['force','born'],[1,0])
    }




}