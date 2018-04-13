class MainInfoItem extends game.BaseItem {
    public constructor() {
        super();
        this.skinName = "MainInfoItemSkin";
    }

    private des: eui.Label;
    private nameText: eui.Label;
    private rankText: eui.Label;
    private scoreText: eui.Label;
    private indexMC: eui.Image;





    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }

    private onClick(){
        //OtherInfoUI.getInstance().show(this.data.gameid);
    }

    public dataChanged(){
        if(this.data.text)
        {
            this.des.text = this.data.text
            this.currentState = 'text'
            return;
        }

        this.nameText.text = this.data.nick
        this.scoreText.text = this.data.score;
        this.currentState = this.data.gameid == UM.gameid?'self':'normal'

        if(this.data.index <=3)
        {
            this.indexMC.visible = true
            this.indexMC.source = this.data.index + 'th_png'
            this.rankText.text = ''
        }
        else
        {
            this.indexMC.visible = false
            this.rankText.text = this.data.index
        }
    }

}