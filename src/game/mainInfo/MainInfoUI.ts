class MainInfoUI extends MainBase {

    private static _instance: MainInfoUI;
    public static getInstance(): MainInfoUI {
        if(!this._instance)
            this._instance = new MainInfoUI();
        return this._instance;
    }

    private mailBtn: eui.Group;
    private mailRed: eui.Image;
    private settingBtn: eui.Group;
    private scroller: eui.Scroller;
    private scrollGroup: eui.Group;
    private emptyGroup: eui.Group;




    private vGroup = new VScrollerGroup();

    private first = false
    public constructor() {
        super();
        this.skinName = "MainInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.mailBtn,this.onMail)
        //this.addBtnEvent(this.rankBtn,this.onRank)
        //this.addBtnEvent(this.shopBtn,this.onShop)
        this.addBtnEvent(this.settingBtn,this.onSetting)

        this.scrollGroup.addChild(this.vGroup)
        this.vGroup.itemRenderer = MainInfoItem;
        this.vGroup.initScroller(this.scroller)
        this.vGroup.margin = 10;
        this.vGroup.desTop = 10;
        //this.vGroup.marginBottom = 10;

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
        if(!this.first)
        {
            this.validateNow();
            this.first = true
        }

        this.renew();
        this.addPanelOpenEvent(GameEvent.client.action_change,this.onActionChange)
    }

    private onActionChange(e){
        var arr = e.data;
        var autoScroll = this.scroller.viewport.scrollV < 20;
        this.vGroup.addItemsToFront(arr);
        if(autoScroll)
        {
            this.vGroup.scrollToMV(0);
        }
    }

    public renew(){
        var WM = WorldManager.getInstance();
        this.vGroup.setData(WM.history)
        this.emptyGroup.visible = WM.history.length == 0;
        //this.vGroup.addItems(guests.concat(list));
    }
}