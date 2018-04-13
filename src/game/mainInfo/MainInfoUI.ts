class MainInfoUI extends MainBase {

    private static _instance: MainInfoUI;
    public static getInstance(): MainInfoUI {
        if(!this._instance)
            this._instance = new MainInfoUI();
        return this._instance;
    }

    private mailBtn: eui.Group;
    private mailRed: eui.Image;
    private rankBtn: eui.Group;
    private shopBtn: eui.Group;
    private settingBtn: eui.Group;
    private scroller: eui.Scroller;
    private scrollGroup: eui.Group;
    private emptyGroup: eui.Group;



    private vGroup = new VScrollerGroup();


    public constructor() {
        super();
        this.skinName = "MainInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.mailBtn,this.onMail)
        this.addBtnEvent(this.rankBtn,this.onRank)
        this.addBtnEvent(this.shopBtn,this.onShop)
        this.addBtnEvent(this.settingBtn,this.onSetting)

        this.scrollGroup.addChild(this.vGroup)
        this.vGroup.itemRenderer = MainInfoItem;
        this.vGroup.initScroller(this.scroller)
        this.vGroup.margin = -1;
        this.vGroup.desTop = 15;
        this.vGroup.marginBottom = 10;

    }

    private onMail(){

    }
    private onRank(){

    }
    private onShop(){

    }
    private onSetting(){

    }

    private onTab(){
        this.renew();
    }

    public hide() {
        this.vGroup.clean()
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.tec_change,this.renew)
    }

    public renew(){
        var arr =  []
        this.vGroup.setData([])
        this.emptyGroup.visible = arr.length == 0;
        //this.vGroup.addItems(guests.concat(list));
    }
}