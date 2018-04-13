class WorldManager {
    private static _instance:WorldManager;

    public static getInstance():WorldManager {
        if (!this._instance)
            this._instance = new WorldManager();
        return this._instance;
    }


    public removeTime//被冻结时间
    public lastTime//上次结算时间
    public roleMaxID


    public createCD = 60 * 30//每次生成


    public init(data) {
        this.removeTime = data.removetime || 0;
        this.lastTime = data.lasttime || 0;
        this.roleMaxID = data.maxid || 0;
    }

    public now(){
        return TM.now() - this.removeTime
    }

    public onTimer(){
        this.testGetData();
    }

    private testGetData(){
         if(this.now() > this.createCD + this.lastTime)
         {
             this.lastTime +=10;
             this.getWorld()
         }
    }

    //取最新世界数据
    public getWorld(fun?){
        var oo:any = {};
        Net.send(GameEvent.rank.get_rank,oo,(data) =>{
            var msg = data.msg;

            if(fun)
                fun();
        });
    }
}