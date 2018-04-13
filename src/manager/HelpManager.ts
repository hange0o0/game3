class HelpManager {
    private static _instance:HelpManager;

    public static getInstance():HelpManager {
        if (!this._instance)
            this._instance = new HelpManager();
        return this._instance;
    }

    private helpObj = {};
    private infoList = [];
    public constructor() {

        this.helpObj['pos'] = {
            title:'阵容配置',
            list:[
                '改变位置：玩家可拖动卡牌进行位置调整',
                '移除卡牌：点击卡牌可使其从该阵容中移除',
                '增加卡牌：当阵容未达上限时，点击列表中最后一个[+]的位置，可打开[选择卡牌]列表，增加的卡牌会自动放入队列的最后端',
                '查看卡牌：长按卡牌可弹出卡牌详情',
                '玩家可使用[测试]攻能对当前卡组进行测试，测试对手由玩家从自己的进攻/防守阵容中选取',
            ]
        }





        this.helpObj['temp'] = {
            list:[
                //'玩家的体力上限是'+UM.maxEnergy+',每['+30+'分钟]回复1点体力'
            ]
        }

        for(var s in this.helpObj)
        {
            var oo = this.helpObj[s];
            for(var ss in oo.list)
            {
                var text = oo.list[ss];
                this.infoList.push(text);
            }
        }

        for(var i=0;i<this.helpObj['card'].list.length;i++)
        {
            var str = this.helpObj['card'].list[i];
            if(str.indexOf('解锁') == -1 && str.indexOf('投票') == -1)
            {
                this.helpObj['pk'].list.push(str)
            }
        }
    }




    public getInfoText(){
        var text = ArrayUtil.randomOne(this.infoList);
        return text.replace(/\[/g,'<font color="#E0A44A">').replace(/\]/g,'<\/font>')
    }

    public showHelp(key,fun?){
        HelpUI.getInstance().show(this.helpObj[key],fun);
    }



}