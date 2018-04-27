class BagUI extends MainBase {

    private static _instance: BagUI;
    public static getInstance(): BagUI {
        if(!this._instance)
            this._instance = new BagUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private tab: eui.TabBar;
    private emptyGroup: eui.Group;
    private propGroup: eui.Group;
    private addBtn: eui.Button;




    private dataArray = new eui.ArrayCollection()

    public constructor() {
        super();
        this.skinName = "BagUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.scroller.viewport = this.list;

        this.list.dataProvider = this.dataArray
        this.list.itemRenderer = BagItem

        this.tab.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onTab,this);
        this.tab.selectedIndex = 0;

        this.addBtnEvent(this.addBtn,this.onAdd)

        //this.list.layout['requestedColumnCount'] = 1
        //this.list.layout['paddingLeft'] = 15
        //this.list.layout['verticalGap'] = 10
        //this.list.layout['paddingTop'] = 10
    }

    private onAdd(){
        BagDrawUI.getInstance().show()
    }

    private onTab(){
        this.renew();
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        PropManager.getInstance().getServerProp(()=>{
            this.renew();
        })

        this.addPanelOpenEvent(GameEvent.client.prop_change,this.renew)
    }

    public renew(){
        var arr = PropManager.getInstance().getList();
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