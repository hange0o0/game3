class RoleInfoItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "RoleInfoItemSkin";
    }

    private con: eui.Group;
    private text: eui.Label;
    private forceGroup: eui.Group;
    private arrow: eui.Image;
    private force: eui.Label;


    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged(){
        var vo:MyRoleActionVO = this.data;
        this.setHtml(this.text,vo.getDes());
        if(vo.force)
        {
            this.con.addChild(this.forceGroup)
            if(vo.force > 0)
            {
                this.arrow.source = 'arrow5_png'
                this.force.textColor = 0x66fd34
                this.force.text = '+' + vo.force;
            }
            else
            {
                this.arrow.source = 'arrow4_png'
                this.force.textColor = 0xfc7431
                this.force.text = vo.force + ''
            }
        }
        else
        {
            MyTool.removeMC(this.forceGroup)
        }
    }

}