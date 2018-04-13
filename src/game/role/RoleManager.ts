class RoleManager {
    private static _instance:RoleManager;
    public static getInstance():RoleManager {
        if (!this._instance)
            this._instance = new RoleManager();
        return this._instance;
    }

    public current_role
    public history_role

    public init(data){
        this.current_role = data.current_role || [];
        this.history_role = data.history_role || [];
    }


}