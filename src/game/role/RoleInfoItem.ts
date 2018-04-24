class RoleInfoItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "RoleInfoItemSkin";
    }

    private text: eui.Label;

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged(){
        var vo:MyRoleActionVO = this.data;
        this.setHtml(this.text,vo.getDes());
    }

}