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
        console.log(this.data)
        RoleInfoUI.getInstance().show(this.data.id);
    }

    public dataChanged(){
        var vo:MyRoleVO = this.data;
          this.nameText.text = vo.name
          this.forceText.text = vo.force + ''
        if(vo.lastAction)
            this.setHtml(this.desText,vo.lastAction.getDes());
        else
            this.desText.text = '???'
    }

}