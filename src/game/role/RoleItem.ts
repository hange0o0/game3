class RoleItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "RoleItemSkin";
    }

    private nameText: eui.Label;
    private desText: eui.Label;
    private forceText: eui.Label;





    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        //OtherInfoUI.getInstance().show(this.data.gameid);
    }

    public dataChanged(){

    }

}