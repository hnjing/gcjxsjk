/**
 * Created by py on 2018/4/30.
 */
var config = {
    // IP:'http://localhost:63342/zbsjk/'
    // IP : 'http://118.24.171.48:8080/zbsjk/'
    // IP : 'http://140.143.99.188/zbsjk/'
    // IP:'http://localhost/zbsjk/'
    IP: 'http://www.yysgcjx.cn/zbsjk/'
    // IP:'http://www.hnsyjjyzbsjk.cn/zbsjk/'
};
//修改变化
// hn Bucket = 'test-1251784278';  Region = 'ap-guangzhou';
// yy Bucket = '';  Region = 'ap-guangzhou';
// cs Bucket = 'test-1257352992';  Region = 'ap-chengdu';

var Bucket = '';
var Region = '';
switch (config.IP) {
    case 'http://www.yysgcjx.cn/zbsjk/':
        $('.changeName').text('益阳市工程机械数据库');
        break;
    case 'www.cssgcjxyjsjk.cn/zbsjk/':
        $('.changeName').text('长沙市工程机械应急数据库');
        Bucket = 'test-1257352992';
        Region = 'ap-chengdu';
        break;
    default:
        Bucket = 'test-1251784278';
        Region = 'ap-guangzhou';
}
