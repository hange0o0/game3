class BagLogItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "BagLogItemSkin";
    }

    private nameText: eui.Label;
    private desText: eui.Label;
    private timeText: eui.Label;
    private headMC: HeadMC;


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        RoleInfoUI.getInstance().show(this.data.id);
    }

    public dataChanged(){
        var vo:MyRoleActionVO = this.data;
        var role = RoleManager.getInstance().getRole(vo.id)
        this.nameText.text =  role.name;
        this.timeText.text = WM.getStringBySeconds(WM.now() - (this.data.time + role.born));

        this.setHtml(this.desText,vo.getDes());
        this.headMC.setData(role.head,role.gender)
    }

}