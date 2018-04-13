class RegisterServerUI extends game.BaseWindow {
    private static instance:RegisterServerUI;
    public static getInstance() {
        if (!this.instance) this.instance = new RegisterServerUI();
        return this.instance;
    }

    private backBtn: eui.Button;
    private registerBtn: eui.Button;
    private nameText: eui.TextInput;
    private randomBtn: eui.Group;





    private type = 1;

    public constructor() {
        super();
        this.skinName = "RegisterServerUISkin";
        this.canBGClose = false;
    }


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn, this.onClose);
        this.addBtnEvent(this.registerBtn, this.onClick);
        this.addBtnEvent(this.randomBtn, this.onRandom);

        this.nameText.restrict = "a-zA-Z0-9_\u0391-\uFFE5";
        this.nameText.addEventListener(egret.TextEvent.CHANGE,this.onChange,this);


    }

    public onClose(){
        this.hide();
        LoginUI.getInstance().show();
    }

    public hide(){
        super.hide();
    }

    private onClick(){
        var LM = LoginManager.getInstance();
        if(!this.nameText.text || this.nameText.text == '神秘人' || BadWordsFilter.validateName(this.nameText.text))
        {
            MyWindow.Alert('名字中含有非法字符');
            return;
        }

        LM.registerServer(this.nameText.text);
    }

    private onRandom(){
        this.nameText.text = MyTool.randomName();
    }



    private onChange(){
        this.nameText.text = MyTool.replaceEmoji(this.nameText.text);
        var len = StringUtil.getStringLength(this.nameText.text);
        if(len > 14)
        {
            this.nameText.text = StringUtil.getStringByLength(this.nameText.text,7);
        }
    }

    public show(){
        MainLoadingUI.getInstance().hide();
        super.show();
    }

    public onShow(){
        this.onRandom();
        this.type = Math.floor(Math.random()*3 + 1)

        if(FromManager.getInstance().h5Form)
        {
            var nick = FromManager.getInstance().getDefaultNick()
            if(nick)
                this.nameText.text = nick;
            MyTool.removeMC(this.backBtn);
        }
    }





}