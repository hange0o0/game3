class MainInfoItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "MainInfoItemSkin";
    }

    private nameText: eui.Label;
    private desText: eui.Label;
    private forceGroup: eui.Group;
    private forceText0: eui.Label;
    private arrow: eui.Image;
    private forceText: eui.Label;
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
        if(vo.force > 0)
        {
            this.forceGroup.visible = true;
            //this.forceText0.text = (role.force - vo.force) + '';
            this.forceText.text = role.force + '';
            if(vo.force > 0)
            {
                this.arrow.source = 'arrow5_png'
                this.arrow.rotation = 90
                this.forceText0.textColor = 0x66fd34
                this.forceText0.text = '+' +  vo.force;
            }
            else
            {
                this.arrow.source = 'arrow4_png'
                this.arrow.rotation = -90
                this.forceText0.text = '' +  vo.force;
                this.forceText0.textColor = 0xfc7431
            }
        }
        else
        {
            this.forceGroup.visible = false;
        }
        this.setHtml(this.desText,vo.getDes());
        this.headMC.data = role.head
    }

}