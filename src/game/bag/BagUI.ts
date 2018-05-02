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
    private desText: eui.Label;





    private dataArray = new eui.ArrayCollection()

    public constructor() {
        super();
        this.skinName = "BagUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.scroller.viewport = this.list;

        this.list.dataProvider = this.dataArray

        var self = this;
        this.list.itemRendererFunction = function(){
            if(self.tab.selectedIndex == 0)
                return BagItem
            return BagLogItem
        }

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
        if(this.tab.selectedIndex == 0)
        {
            PropManager.getInstance().getServerProp(()=>{
                this.renew();
            })
        }
        else
        {
            PropManager.getInstance().getPropLog(()=>{
                this.renew();
            })
        }

    }

    public hide() {
        super.hide();
    }

    public onShow(){

        this.onTab();
        this.addPanelOpenEvent(GameEvent.client.prop_change,this.renew)
    }

    public renew(){
        var arr = PropManager.getInstance().getList();
        if(this.tab.selectedIndex == 1)
        {
            var arr = PropManager.getInstance().propLog;
            this.currentState = 's2'
        }
        else
        {
            var arr = PropManager.getInstance().getList();
            this.currentState = 's1'
            this.desText.text = '剩余宝物数量：' + arr.length
        }
        this.dataArray.source = arr
        this.emptyGroup.visible = arr.length == 0;
        this.dataArray.refresh()
    }
}