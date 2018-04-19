class MainInfoItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "MainInfoItemSkin";
    }

    private text: eui.Label;






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
        this.text.text = role.name + '+' + vo.force;
    }

}