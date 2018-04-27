class BagDrawUI extends game.BaseUI {

    private static _instance: BagDrawUI;
    public static getInstance(): BagDrawUI {
        if(!this._instance)
            this._instance = new BagDrawUI();
        return this._instance;
    }

    private con: eui.Group;
    private drawBtn: eui.Button;
    private closeBtn: eui.Image;


    private mv:egret.MovieClip;
    public constructor() {
        super();
        this.hideBehind = false;
        this.skinName = "BagDrawUISkin";
        this.LoadFiles = ['bag']
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.closeBtn,this.hide)
        this.addBtnEvent(this.drawBtn,this.onDraw)

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
        PropManager.getInstance().drawProp(10,(arr)=>{

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
        //this.addPanelOpenEvent(GameEvent.client.mail_change,this.justRenewList)
    }



    public renew(){
        this.mv.gotoAndPlay(1,-1)
        //var list = MailManager.getInstance().getListByTpyes(this.typeObj[this.tab.selectedIndex].type)
        //this.list.dataProvider = new eui.ArrayCollection(list);
        //this.emptyGroup.visible = list.length == 0;
    }
}