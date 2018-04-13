class RoleInfoUI extends game.BaseWindow {

    private static _instance: RoleInfoUI;
    public static getInstance(): RoleInfoUI {
        if(!this._instance)
            this._instance = new RoleInfoUI();
        return this._instance;
    }

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
    }

    public hide() {
        super.hide();
    }

    public show(v?){
        this.dataIn = v;
        super.show();
    }

    public onShow(){
        this.renew();
        //this.addPanelOpenEvent(ServerEvent.Client.BUSINESS_BUILDING_RENEW,this.renew)
    }

    public renew(){

    }
}
