/**
 * Created by py on 2018/4/30.
 */
var config = {
    // IP:'http://localhost:63342/zbsjk/'
    // IP : 'http://140.143.99.188/zbsjk/'
    // IP:'http://localhost/zbsjk/'
    // IP: 'http://www.yysgcjx.cn/zbsjk/'
    IP:'http://www.hnsyjjyzbsjk.cn/zbsjk/'
    // IP : 'http://132.232.28.225/zbsjk/'
};
//修改变化
// hn Bucket = 'test-1251784278';  Region = 'ap-guangzhou';
// yy Bucket = 'test-1255970667';  Region = 'ap-guangzhou';
// cs Bucket = 'test-1257352992';  Region = 'ap-chengdu';

var Bucket = '';
var Region = '';
switch (config.IP) {
    case 'http://www.yysgcjx.cn/zbsjk/':
        $('.changeName').text('益阳市工程机械数据库');
        Bucket = 'test-1255970667';
        Region = 'ap-guangzhou';
        break;
    // case 'http://www.cssgcjxyjsjk.cn/zbsjk/':
    case 'http://132.232.28.225/zbsjk/':
        $('.changeName').text('长沙市工程机械应急数据库');
        Bucket = 'test-1257352992';
        Region = 'ap-chengdu';
        break;
    default:
        Bucket = 'test-1251784278';
        Region = 'ap-guangzhou';
}
