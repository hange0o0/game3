class UserManager {
    public constructor() {

    }

    private static _instance: UserManager;

    public static getInstance():UserManager{
        if(!UserManager._instance)
            UserManager._instance = new UserManager();
        return UserManager._instance;
    }



    public gameid: string = 'test';
    public landid: string;

    public nick: string;

    public diamond: number;
    public uid: number;
    public level: number;
    public opentime: number;
    public tec_force:number;
    public last_land: number;


    public exp: number;

    public maxLevel = 50;


    public fill(msg:any):void{
        var data = msg.data;
        this.gameid = data.gameid;
        this.landid = data.land_key;
        this.nick = data.nick;
        this.exp = data.exp;
        this.uid = data.uid;

        this.opentime = data.opentime;
        this.level = data.level;
        this.tec_force = data.tec_force;
        this.last_land = data.last_land;
        this.diamond = data.diamond;



        ActiveManager.getInstance().init(data.active)
        PropManager.getInstance().init(data)
        RoleManager.getInstance().init(msg.game)
        WorldManager.getInstance().init(msg.game,data.world)
    }





    public testDiamond(v){
        if(UM.diamond < v)
        {
            MyWindow.Confirm('钻石不足！\n需要：' +v+'\n当前：'+UM.diamond + '\n是否前往购买钻石？',function(v){
                if(v == 1)
                {
                    ShopUI.getInstance().show(true);
                }
            },['取消','购买'])
            return false;
        }
        return true;
    }

}
                                