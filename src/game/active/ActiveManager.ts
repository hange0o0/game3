class ActiveManager {
    private static _instance:ActiveManager;
    public static getInstance():ActiveManager {
        if (!this._instance)
            this._instance = new ActiveManager();
        return this._instance;
    }


    public init(data){

    }


}