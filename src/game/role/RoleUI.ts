class RoleUI extends MainBase {

    private static _instance: RoleUI;
    public static getInstance(): RoleUI {
        if(!this._instance)
            this._instance = new RoleUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private tab: eui.TabBar;
    private emptyGroup: eui.Group;




    private dataArray = new eui.ArrayCollection()

    public constructor() {
        super();
        this.skinName = "RoleUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.scroller.viewport = this.list;

        this.list.dataProvider = this.dataArray
        this.list.itemRenderer = BagItem

        this.tab.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onTab,this);
        this.tab.selectedIndex = 0;

        //this.list.layout['requestedColumnCount'] = 1
        //this.list.layout['paddingLeft'] = 15
        //this.list.layout['verticalGap'] = 10
        //this.list.layout['paddingTop'] = 10
    }

    private onTab(){
        this.renew();
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        //this.addPanelOpenEvent(ServerEvent.Client.BUSINESS_BUILDING_RENEW,this.renew)
    }

    public renew(){
        var arr = PropManager.getInstance().getListByType(this.tab.selectedIndex + 1);
        //if(this.tab.selectedIndex == 1)
        //{
        //    var coin = UM.getCoin();
        //    if(coin)
        //        arr.unshift({coin:coin});
        //}
        //else
        //{
        //    this.list.itemRenderer = BagItem2
        //    this.list.layout['requestedColumnCount'] = 3
        //    this.list.layout['paddingLeft'] = 50
        //    this.list.layout['verticalGap'] = 20
        //    this.list.layout['paddingTop'] = 20
        //}
        this.dataArray.source = arr
        this.emptyGroup.visible = arr.length == 0;
        this.dataArray.refresh()
    }
}