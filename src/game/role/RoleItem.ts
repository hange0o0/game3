class RoleItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "RoleItemSkin";
    }

    private nameText: eui.Label;
    private desText: eui.Label;
    private forceText: eui.Label;
    private headMC: HeadMC;






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
        this.headMC.setData(vo.head)
          this.nameText.text = vo.name
          this.forceText.text = vo.force + ''
        if(vo.dieTime)
        {
            this.desText.text = '已死亡，享年'+vo.getAge()+'岁'
        }
        else if(vo.lastAction)
            this.setHtml(this.desText,vo.lastAction.getDes());
        else
            this.desText.text = '???'
    }

}