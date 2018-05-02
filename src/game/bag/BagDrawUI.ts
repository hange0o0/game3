class BagDrawUI extends game.BaseUI {

    private static _instance: BagDrawUI;
    public static getInstance(): BagDrawUI {
        if(!this._instance)
            this._instance = new BagDrawUI();
        return this._instance;
    }

    private con: eui.Group;
    private btnGroup: eui.Group;
    private drawBtn: eui.Button;
    private drawBtn10: eui.Button;
    private freeText: eui.Label;
    private freeDrawBtn: eui.Button;
    private closeBtn: eui.Image;



    private mv:egret.MovieClip;
    private drawCost = 30
    public constructor() {
        super();
        this.hideBehind = false;
        this.skinName = "BagDrawUISkin";
        this.LoadFiles = ['bag']
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.drawBtn,this.onDraw1)
        this.addBtnEvent(this.drawBtn10,this.onDraw10)
        this.addBtnEvent(this.freeDrawBtn,this.onDraw)

        var name = 'bag_mv'
        var data:any = RES.getRes(name + "_json"); //qid
        var texture:egret.Texture = RES.getRes(name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, texture);
        this.mv = new egret.MovieClip();
        this.mv.movieClipData = mcFactory.generateMovieClipData('mv');

        this.mv.scaleX = this.mv.scaleY = 1.5
        this.con.addChild(this.mv)
        this.mv.x = (500-256*1.5)/2;
    }

    private onDraw(){
        this.sendDraw(0)
    }
    private onDraw1(){
        this.sendDraw(1)
    }
    private onDraw10(){
        this.sendDraw(10)
    }

    private sendDraw(num){
        if(!UM.testDiamond(this.drawCost*num))
            return;
        PropManager.getInstance().drawProp(num,(arr)=>{

        })
    }


    public show(){

        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }

    private onTimer(){
        var cd = PropManager.getInstance().getFreeCD();
         if(cd)
         {
             this.freeText.text = DateUtil.getStringBySecond(cd) + ' 后免费'
             this.btnGroup.visible = true
             this.freeDrawBtn.visible = false
         }
        else
         {
             this.freeText.text = ''
             this.btnGroup.visible = false
             this.freeDrawBtn.visible = true
         }
    }


    public renew(){
        this.mv.gotoAndPlay(1,-1)
        this.onTimer();
        //var list = MailManager.getInstance().getListByTpyes(this.typeObj[this.tab.selectedIndex].type)
        //this.list.dataProvider = new eui.ArrayCollection(list);
        //this.emptyGroup.visible = list.length == 0;
    }
}