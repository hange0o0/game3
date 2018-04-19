class RoleInfoUI extends game.BaseWindow {

    private static _instance: RoleInfoUI;
    public static getInstance(): RoleInfoUI {
        if(!this._instance)
            this._instance = new RoleInfoUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private titleText: eui.Label;
    private desText: eui.Label;





    public dataIn
    public constructor() {
        super();
        this.skinName = "RoleInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.scroller.viewport = this.list;
        this.list.itemRenderer = RoleInfoItem;
    }

    public hide() {
        super.hide();
    }

    public show(v?){
        this.dataIn = v;
        var role = RoleManager.getInstance().getRole(v);
        if(role && role.action)
            super.show();
        else{
            RoleManager.getInstance().getServerRole(UM.gameid,v,(role)=>{
                if(role)
                    super.show();
            })
        }
    }

    public onShow(){
        this.renew();
        //this.addPanelOpenEvent(ServerEvent.Client.BUSINESS_BUILDING_RENEW,this.renew)
    }

    public renew(){
        var role =  RoleManager.getInstance().getRole(this.dataIn);
        this.titleText.text = role.name;
        this.desText.text = ''
        this.list.dataProvider = new eui.ArrayCollection(role.action)
    }
}
