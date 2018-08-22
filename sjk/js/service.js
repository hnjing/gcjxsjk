var service = {};

function handleData(data) {
    var dom = '{';
    for (var key in data) {
        if (data[key] || (data[key] === 0)) {
            dom += ('"' + key + '":"' + data[key] + '",')
        }
    }
    dom = dom.slice(0, dom.length - 1) + '}';
    console.log(dom);
    return dom
}

function handleDataForGet(data) {
    var obj = {
        timeStamp:Date.now()
    };
    for (var key in data) {
        if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
            obj[key] = data[key]
        }
    }
    return obj
}


//新增人员接口
// {
//     userName     String  姓名,
//     userPhone     String  电话,
//     roleId           int    职位id,
//     userCity         String  市，
//     userArea       String   区
// }
service.addUser = function (userData, callback, callError) {
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: config.IP + "user",
        async: true,
        data: handleData(userData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//编辑人员接口
service.updateUser = function (userData, userId, callback, callError) {
    // 如果是市级管理员 不应该传区
    if(userData.roleId == 2){
        userData.userArea = ''
    }
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "user/" + userId,
        async: true,
        data: handleData(userData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//删除人员接口
service.deleteUser = function (userId, callback, callError) {
    $.ajax({
        type: "delete",
        url: config.IP + "user/" + userId,
        async: true,
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//人员列表接口
// userCity	市
// userArea       区
// userName     姓名
// userPhone     电话
// pageNo  第几页
// pageSize	每页多少条
service.getUserList = function (filterData, callback, callError) {
    $.ajax({
        type: "get",
        url: config.IP + "user",
        async: true,
        data: handleDataForGet(filterData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//密码重置
service.passwordRepeat = function (userid, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "user/" + userid + "/resetpwd",
        async: true,
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//密码修改
// {
//     account	string	账号
//     oldpwd		string	旧密码
//     newpwd	string	新密码
// }
service.passwordUpdate = function (sendInfo, userid, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "user/" + userid + "/putpwd",
        async: true,
        data: handleData(sendInfo),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//登录接口
// {
//     account	string	账号，
// 	   pwd	string 密码
//     loginType	string	登录类型	应急 yingji,管理guanli
// }
service.login = function (userData, callback, callError) {
    $.ajax({
        type: "post",
        url: config.IP + "login",
        contentType: 'application/json',
        dataType: "json",//返回值类型
        data: handleData(userData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    });
};

//角色列表接口
service.getRole = function (callback, callError) {
    $.ajax({
        type: "get",
        url: config.IP + "role",
        async: true,
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');

        }
    })
};

//新增设备接口
service.addDev = function (devData, callback, callError) {
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: config.IP + "equipment",
        async: true,
        data: handleData(devData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//编辑设备接口
service.updateDev = function (devData, devId, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "equipment/" + devId,
        async: true,
        data: handleData(devData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//设备详情接口
// equipmentNumber	string	设备编号,
//     userName	string	姓名
service.DevDetail = function (data, callback, callError) {
    $.ajax({
        type: "get",
        url: config.IP + "equipment/equipmentInfo",
        async: true,
        data:handleDataForGet(data),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//设备列表接口
// userCity	市
// userArea       区
// userName     姓名
// auditStatus	审核状态
// startTime	开始时间
// endTime	结束时间
// equipmentType	设备类型
// insuranceAgency	保险机构
// pageNo  第几页
// pageSize	每页多少条
service.getDevList = function (filterData, callback, callError) {
    $.ajax({
        type: "get",
        url: config.IP + "equipment",
        cache:false,
        data: handleDataForGet(filterData),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//删除设备接口
service.deleteDev = function (devId, callback, callError) {
    $.ajax({
        type: "delete",
        url: config.IP + "equipment/" + devId,
        async: true,
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//修改审核状态接口
service.updateStatus = function (devId, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "equipment/" + devId + "/auditstatus",
        async: true,
        data: '{"auditStatus":1}',
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

// 设置应急状态接口
// url:   /equipment/{equipmentId}/rescuestatus
service.setRescue = function (data, devId, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "equipment/" + devId + "/rescuestatus",
        async: true,
        data: handleData(data),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

// 设置缴费状态接口
// url:   /equipment/{equipmentId}/paystatus
service.setPaystatus = function (equipmentId, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "equipment/" + equipmentId + "/paystatus",
        async: true,
        data:'{"payStatus":1}',
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//新增考试信息
// {
//     userName	string	姓名，
// 	   equipmentNumber	string 设备编号
// }
service.addExamination = function (data, callback, callError) {
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: config.IP + "examination",
        async: true,
        data: handleData(data),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//获取考试详情接口
// {
//     examinationResults	string	考试成绩,
//     watchTime	string	观看时长
// }
service.getExamination = function (id, callback, callError) {
    $.ajax({
        type: "get",
        url: config.IP + "examination/" + id,
        async: true,
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//编辑考试信息接口
service.updateExamination = function (data, id, callback, callError) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        url: config.IP + "examination/" + id,
        async: true,
        data: handleData(data),
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};

//导出设备信息接口
//url:   /equipment/download
// equipmentCity	 市
// equipmentArea       区
// userName     姓名
// auditStatus	审核状态  0待审核1审核通过
// startTime	开始时间
// endTime	结束时间
// equipmentType	设备类型
// insuranceAgency	保险机构
// noiseDetection		噪音检测 1合格0不合格,
// rescueStatus	int	是否应急救援 0否1是
service.downloadDev = function (data, callback, callError) {
    $.ajax({
        type: "get",
        url: config.IP + "equipment/download",
        async: true,
        success: function (data) {
            callback(data)
        },
        error: function (data) {
            var title = data.responseJSON?data.responseJSON.msg:'操作失败，服务器繁忙，请稍后重试！';
            $('.handleErrorModalContent').html(title);
            $('#handleErrorModal').modal('show');
        }
    })
};


