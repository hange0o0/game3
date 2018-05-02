class RoleInfoUI extends game.BaseWindow {

    private static _instance: RoleInfoUI;
    public static getInstance(): RoleInfoUI {
        if(!this._instance)
            this._instance = new RoleInfoUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private headMC: HeadMC;
    private nameText: eui.Label;
    private ageText: eui.Label;
    private genderMC: eui.Image;
    private genderText: eui.Label;
    private forceText: eui.Label;






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
        this.nameText.text = role.name;
        this.ageText.text = '年龄：' + role.getAge() + '岁';
        this.forceText.text = '战力：' + role.force + '';
        this.setHtml(this.genderText,'性别：' + (role.gender==1?this.createHtml('男',0x5198ff):this.createHtml('女',0xff517e)));
        this.genderMC.source = 'gender_'+role.gender+'_png';

        this.list.dataProvider = new eui.ArrayCollection(role.action)
        this.headMC.setData(role.head,role.gender)
    }
}
