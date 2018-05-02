class BagItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "BagItemSkin";
    }

    private nameText: eui.Label;
    private qualityText: eui.Label;
    private typeText: eui.Label;
    private mc: eui.Image;






    public childrenCreated() {
        super.childrenCreated();
        //this.addBtnEvent(this,this.onClick)
    }

    private onClick(){

    }

    public dataChanged(){
        var data:MyPropVO = this.data;
        this.nameText.text = data.name
        this.setHtml(this.typeText,data.getTypeText())
        this.setHtml(this.qualityText,data.getQualityText())
        //if(this.data.coin)
        //{
        //    this.nameText.text = '金币'
        //    this.desText.text =  '金币用途很广，所有的科技升级都要用到。';
        //    this.mc.source = MyTool.getPropCoin();
        //    //this.numText.text = '×'+NumberUtil.addNumSeparator(this.data.coin)
        //}
        //else
        //{
        //    this.nameText.text = this.data.propname
        //    this.desText.text =  this.data.propdes;
        //    this.mc.source = this.data.getThumb();
        //    //this.numText.text = '×'+NumberUtil.addNumSeparator(PropManager.getInstance().getNum(this.data.id))
        //}

    }

}




