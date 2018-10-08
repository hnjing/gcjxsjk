/**
 * Created by py on 2018/4/30.
 */
var config = {
    // IP: 'http://www.yysgcjx.cn/zbsjk/'
    // IP:'http://www.hnsyjjyzbsjk.cn/zbsjk/'
    //IP: 'http://www.cssgcjxyjsjk.cn/zbsjk/'
    IP: 'http://www.sysgcjx.cn/zbsjk/'
};
//修改变化
// hn Bucket = 'test-1251784278';  Region = 'ap-guangzhou';
// yy Bucket = 'test-1255970667';  Region = 'ap-guangzhou';
// cs Bucket = 'test-1257352992';  Region = 'ap-guangzhou';

var Bucket = '';
var Region = 'ap-guangzhou';
switch (config.IP) {
    case 'http://www.yysgcjx.cn/zbsjk/':
        $('.changeName').text('益阳市工程机械数据库');
        Bucket = 'test-1255970667';
        break;
    // case 'http://www.cssgcjxyjsjk.cn/zbsjk/':
    case 'http://www.cssgcjxyjsjk.cn/zbsjk/':
        $('.changeName').text('长沙市工程机械应急数据库');
        Bucket = 'test-1257352992';
        break;
    case 'http://www.sysgcjx.cn/zbsjk/':
        $('.changeName').text('邵阳市工程机械应急数据库');
        Bucket = 'test-1257375524';
        break;
    default:
        Bucket = 'test-1251784278';
}
