class RankManager {
    private static _instance:RankManager;
    public static getInstance():RankManager {
        if (!this._instance)
            this._instance = new RankManager();
        return this._instance;
    }

    public rankData = {};

    public getRankList(ranktype){
        var list = this.rankData[ranktype].list;
        for(var i=0;i<list.length;i++)
        {
            if(list[i].gameid == UM.gameid)
            {
                //list[i].head = UM.head;
                //switch (ranktype)
                //{
                //    case 'force':
                //        list[i].source = UM.tec_force;
                //        break;
                //    case 'hang':
                //        list[i].source = HangManager.getInstance().level;
                //        break;
                //    case 'hourcoin':
                //        list[i].source = UM.hourcoin;
                //        break;
                //}
            }
        }
        ArrayUtil.sortByField(list,['score'],[1]);
        for(var i=0;i<list.length;i++)
        {
            list[i].index = i+1;
        }
        return list;
    }

    public getServerRank(ranktype,fun?){
        if(this.rankData[ranktype] && this.rankData[ranktype].time > TM.now())
        {
            fun && fun();
            return;
        }
        var oo:any = {};
        oo.ranktype = ranktype;
        Net.send(GameEvent.rank.get_rank,oo,(data) =>{
            var msg = data.msg;
            var list = msg.list || []
            this.rankData[ranktype] = {
                time:TM.now() + 5*60,
                list:list
            }
            if(fun)
                fun();
        });
    }


}