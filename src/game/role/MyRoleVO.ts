class MyRoleVO {

    public id
    public name //arr
    public gender
    public born //出生
    public force //战力
    public endTime //本次生成数据的到达时间
    public waitCD //下次生成数据要等待的时间
    public nextAction //待触发的
    public history//已触发的
    public dieTime;
    public constructor(data?: any) {
        if(data)
            this.fill(data);

    }

    public fill(data){
        var dataArr = data.split('|')
        this.id = parseInt(dataArr[0]);
        this.name = Base64.decode(dataArr[1]);
        this.gender = parseInt(dataArr[2]);
        this.born = parseInt(dataArr[3]);
        this.force = parseInt(dataArr[4]);
        this.endTime = parseInt(dataArr[5]);
        this.waitCD = parseInt(dataArr[6]);
        this.dieTime = parseInt(dataArr[7]);

        var arr = dataArr[8].split('#');
        this.nextAction = []
        for(var i=0;i<arr.length;i++)
        {
              if(arr[i])
                  this.nextAction.push(new MyRoleActionVO(this.id,arr[i]))
        }

        var arr = dataArr[9].split('#');
        this.history = []
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i])
                this.history.push(new MyRoleActionVO(this.id,arr[i]))
        }
    }

    //测试可生效的
    public testAction(t){
        var arr = []
        for(var i=0;i<this.nextAction.length;i++)
        {
            var vo:MyRoleActionVO = this.nextAction[i];
            if(vo.time <= t)
            {
                this.nextAction.splice(i,1)
                i--;
                arr.push(vo)
                this.history.unshift(vo);
                this.force += vo.force
                if(vo.type == 1)
                {
                    this.dieTime = vo.time;
                    break;
                }
            }
            else
                break;
        }
        return arr;

    }
}


class MyRoleActionVO {

    public time//生效时间
    public force //增加战力
    public remark //描述数据
    public type //类型 0普通 1死亡

    public owner;//拥有者ID



    public constructor(owner,data?: any) {
        this.owner = owner;
        if(data)
            this.fill(data);

    }

    public fill(data){
        var arr = data.split('，')
        this.time = parseInt(data[0]);
        this.force = parseInt(data[1]);
        this.type = parseInt(data[2]);
        this.remark = JSON.parse(Base64.decode(data[3]));


    }
}