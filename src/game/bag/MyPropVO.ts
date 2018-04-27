class MyPropVO {

    public name//
    public type //
    public quality //
    public useTime = 0 //

    public id;//标志ID



    public constructor(data?: any) {
        if(data)
            this.fill(data);
    }


    public fill(data){
        var arr = data.split('@')
        this.id = arr[0];
        if(arr[1])
            this.useTime = parseInt(arr[1]);
        arr = arr[0].split('#');
        this.name = Base64.decode(arr[1]);
        this.type = MyTool.str2Num(arr[0].charAt(0))
        this.quality = MyTool.str2Num(arr[0].charAt(1))
    }

    public getTypeText(){
        return MyTool.createHtml(GameConfig.propQuality[this.type],GameConfig.propTypeColor[this.type]);
    }

    public getQualityText(){
        var temp = (this.quality%3 || 3)-1
        var index = Math.ceil(this.quality/3)
        return MyTool.createHtml(GameConfig.propQuality[index] + ['-','','+'][temp],GameConfig.propQualityColor[index]);
    }


}