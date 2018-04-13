class MainUI extends game.BaseUI {

    private static _instance: MainUI;
    public static getInstance(): MainUI {
        if(!this._instance)
            this._instance = new MainUI();
        return this._instance;
    }
    private bg: eui.Image;
    private con: eui.Group;
    private bottomSelectMC: eui.Rect;
    private b0: MainBottomBtn;
    private b1: MainBottomBtn;
    private b2: MainBottomBtn;
    private nameText: eui.Label;
    private levelText: eui.Label;
    private diamondText: eui.Label;










    public hideTopState = false
    public currentIndex = 1
    public bottomItems = []
    public currentUI:MainBase;
    public lastUI:MainBase;
    public constructor() {
        super();
        this.skinName = "MainUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();


        this.b0.data = {text:'宝物',index:0,source:'main_bag_png',type:'bag'}
        this.b1.data = {text:'世界',index:1,source:'main_pk_png',type:'main'}
        this.b2.data = {text:'强者',index:2,source:'main_slave_png',type:'role'}

        this.bottomItems.push(this.b0)
        this.bottomItems.push(this.b1)
        this.bottomItems.push(this.b2)

    }




    public onBottomSelect(index){
       if(index != this.currentIndex)
       {
           var t = egret.getTimer();
           this.bottomItems[this.currentIndex].select(false)
           this.bottomItems[index].select(true)
           this.currentIndex = index;

           egret.Tween.removeTweens(this.bottomSelectMC)
           var tw = egret.Tween.get(this.bottomSelectMC)
           var bottomX = this.getBottomX()
           tw.to({x:bottomX},200)

           if(this.lastUI)
               this.lastUI.hide();
           this.lastUI = this.currentUI
           this.setCurrentUI();
           var rota = 1;
           if(this.bottomSelectMC.x > bottomX)
               rota = -1
           if(this.lastUI)
               this.lastUI.x = 0
           this.currentUI.x = 640*rota;
           egret.Tween.removeTweens(this.con)
           var tw = egret.Tween.get(this.con)
           tw.to({x:-640*rota},200).call(function(){
               this.con.x = 0
               this.currentUI.x = 0
               if(this.lastUI)
               {
                   this.lastUI.hide()
                   this.lastUI = null;
               }
           },this)
       }
    }






    public show(){
        //先初始化，加快切换速度
        BagUI.getInstance()


        //GuideManager.getInstance().isGuiding = true;

        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)

        //GuideManager.getInstance().isGuiding = true;
        if(GuideManager.getInstance().isGuiding)
        {
            GuideManager.getInstance().guideStep = 0;
            GuideManager.getInstance().reInit();
            GuideManager.getInstance().showGuide()
        }
        else if(!LoginManager.getInstance().logText.cb && LoginManager.getInstance().logText.text)
            LogUI.getInstance().show();
    }

    private onTimer(){

    }



    public onVisibleChange(){

    }

    public renew(){


        for(var i=0;i<this.bottomItems.length;i++)
        {
            this.bottomItems[i].select(this.currentIndex == i,false)
        }
        this.bottomSelectMC.x = this.getBottomX()

        if(this.lastUI)
            this.lastUI.hide();
        if(this.currentUI)
            this.currentUI.hide();
        this.setCurrentUI();
        egret.Tween.removeTweens(this.con)
        this.currentUI.x = 0
        this.con.x = 0
    }


    public setCurrentUI(){
        switch(this.currentIndex)
        {
            case 0:
                this.currentUI = BagUI.getInstance();
                break;
            case 1:
                this.currentUI = MainInfoUI.getInstance();
                break;
            case 2:
                this.currentUI = RoleUI.getInstance();
                break;

        }
        this.currentUI.show(this.con)

    }

    private getBottomX(){
        return this.currentIndex*180
    }

    public renewRed(){
        for(var i=0;i<this.bottomItems.length;i++)
        {
            this.bottomItems[i].renewRed();
        }
    }
}