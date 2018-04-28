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
        this.list.itemRenderer = RoleItem

        this.tab.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onTab,this);
        this.tab.selectedIndex = 0;

        //this.list.layout['requestedColumnCount'] = 1
        //this.list.layout['paddingLeft'] = 15
        //this.list.layout['verticalGap'] = 10
        //this.list.layout['paddingTop'] = 10
    }

    private onTab(){

        if(this.tab.selectedIndex == 1)
        {
            var RM = RoleManager.getInstance();
            RM.getRank(()=>{
                this.renew();
            })
        }
        else
        {
            var RM = RoleManager.getInstance();
            RM.getDie(()=>{
                this.renew();
            })
        }
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.onTab();
        //this.addPanelOpenEvent(ServerEvent.Client.BUSINESS_BUILDING_RENEW,this.renew)
    }

    public renew(){
        var RM = RoleManager.getInstance();
        if(this.tab.selectedIndex == 0)
        {
            var arr = RM.current;
            RM.sortRoleArr(arr);
            if(RM.die && RM.die.length)
                arr = arr.concat(RM.die)
        }
        else
        {
            var arr = RM.rank.concat(RM.current);
            RM.sortRoleArr(arr);
            if(arr.length > GameConfig.rankMax)
                arr.length = GameConfig.rankMax
        }
        this.dataArray.source = arr
        this.emptyGroup.visible = arr.length == 0;
        this.dataArray.refresh()
    }
}