class MyRoleVO {

    public id
    public name //arr
    public gender
    public head
    public born //出生
    public dieTime;
    public force //战力
    public action //待触发的
    public lastAction

    public constructor(data?: any) {
        if(data)
            this.fill(data);

    }


    private testFillKey(data,serverKey,localKey){
        if(data[serverKey])
            this[localKey] = data[serverKey];
    }


    public fill(data){
        this.testFillKey(data,'id','id');
        this.testFillKey(data,'g','gender');
        this.testFillKey(data,'b','born');
        this.testFillKey(data,'f','force');
        this.testFillKey(data,'h','head');
        if(data.n)
        {
            this.name = Base64.decode(data.n);
        }

        if(data.a)
        {
            this.action = ObjectUtil.objToClass(data.a,MyRoleActionVO);
            this.lastAction = this.action[0];
        }

        if(data.d && data.d > 0)
            this.dieTime = data.d;
    }

    //测试可生效的
    public addAction(vo:MyRoleActionVO){
        if(!this.action)
        {
            this.lastAction = vo;
            return;
        }
        if(this.action[0] && vo.time <= this.action[0].time)
            return;
        this.lastAction = vo;
        this.action.unshift(vo);
        this.force += vo.force
        if(vo.type == 2)
        {
            this.dieTime = vo.time;
        }
    }

    public getAge(){
        if(this.dieTime)
        {
            return Math.floor(this.dieTime/GameConfig.yearCD)
        }
        return Math.floor((WM.now() - this.born)/GameConfig.yearCD)
    }
}


class MyRoleActionVO {

    public time//生效时间
    public force //增加战力
    public remark //描述数据
    public type //类型 0普通 1出生，2死亡

    public id;//拥有者ID



    public constructor(data?: any) {
        if(data)
            this.fill(data);

    }

    private testFillKey(data,serverKey,localKey){
        if(data[serverKey])
            this[localKey] = data[serverKey];
    }

    public fill(data){
        this.testFillKey(data,'id','id');
        this.testFillKey(data,'t','time');
        this.testFillKey(data,'f','force');
        this.testFillKey(data,'ty','type');
        this.remark = data.r.split(',');
    }

    public getDes(){
        return '+' + this.force;
    }
}