class HeadMC extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "HeadMCSkin";
    }

    private bg: eui.Image;
    private rect: eui.Rect;
    private mc: eui.Image;


    public childrenCreated() {
        super.childrenCreated();
        //this.addBtnEvent(this,this.onClick)
    }

    private onClick(){

    }

    public dataChanged(){
        this.setData(this.data,0);
    }

    public setData(head,gender?){

        this.mc.source = MyTool.getHeadUrl(head || 1)
        if(gender)
        {
            this.rect.visible = true
            this.bg.visible = false
            this.rect.fillColor = gender == 1?0x5198ff:0xff517e
        }
        else
        {
            this.rect.visible = false
            this.bg.visible = true
        }
    }

}