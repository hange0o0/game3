/**
 *
 * @author 
 *
 */
class Config {
	public constructor() {
	}

    public static isDebug: boolean = true;
    public static userHost: string = 'hangegame.com';
    public static host: string = 'hangegame.com';
    public static serverID: number = 1;
    //public static host: string = '172.17.196.195:90';
    public static user_version: number = 1;
    public static version: number = 1;
    public static m_version: number = 1;   //只是客户端变，服务器没变
    public static pk_version: number = 1;
    public static cdn: string = "";
    public static localResRoot:string = "resource/net_resource/";



    public static friendLevel = 3;
    public static gambleLevel = 20;


    public static mapLevel = 5;
    public static dayLevel = 15;
    public static serverLevel = 25;//卡士二阶
    public static serverEqualLevel = 45;  //卡士五阶
    public static leaderLevel = 95;  //
    public static leaderSkillLevel = 145;  //


    public static platform = '';
    public static platformGameidAdd = '';
    public static equalValue = 1000;


    public static init(){
        Config.isDebug =  SharedObjectManager.getInstance().getValue('debug_open');
    }

    private static createImg(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"image",
           "url": path + name
       }
    }
    private static createJSON(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"json",
           "url": path + name
       }
    }
}
