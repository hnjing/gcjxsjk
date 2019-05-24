/**
 * Created by py on 2018/5/5.
 */
$(function () {
    var userId = 11;
    var equipmentId = null;
    var index;
    var currentCity = window.sessionStorage.getItem('userCity');
    var currentArea = window.sessionStorage.getItem('userArea');
    var currentRoleId = window.sessionStorage.getItem('roleId');
    var currentUserId = window.sessionStorage.getItem('userId');
    var equipmentPic = null;
    var billPic = null;
    var userData = [];
    //手机正则
    var regExpPhone = /^1\d{10}$/;
    //身份证正则
    var regExpCare = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var roleList = [
        {roleId: 2, roleName: "市级管理员"},
        {roleId: 3, roleName: "区级管理员"},
        {roleId: 4, roleName: "市级审核员"},
        {roleId: 5, roleName: "区级审核员"},
        {roleId: 6, roleName: "市级录入员"},
        {roleId: 7, roleName: "区级录入员"}
    ];
    var userFilter = {
        userName: null,
        userPhone: null,
        userCity: null,
        userArea: null,
        pageNo: 1,
        pageSize: 10
    };
    var devFilter = {
        'userName': null,
        'insuranceAgency': null,
        'auditStatus': null,
        'equipmentType': null,
        'equipmentCity': null,
        'equipmentArea': null,
        'startTime': null,
        'endTime': null,
        'pageNo': 1,
        'pageSize': 10
    };
    var evFilter = {
        'userName': null,
        'equipmentCity': null,
        'equipmentArea': null,
        'noiseDetection': null,
        'pageNo': 1,
        'pageSize': 10
        };
    //请求用到的参数
    var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
    var cos = new COS({
        // 必选参数
        getAuthorization: function (options, callback) {
            $.get(config.IP+'/cosKey', {
                bucket: 'test',
                region: Region
            }, function (data) {
                data = data.data;
                callback({
                    TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                    TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                    XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                    ExpiredTime: data.expiredTime
                });
            });
        }
    });
    // 表单提交获取result的函数
    var submitCommon = function () {
        var passOver = true;
        var userName = $('#userName').val();
        var registerNumber = $('#registerNumber').val();
        var registerCompany = $('#registerCompany').val();
        var equipmentNumber = $('#equipmentNumber').val();
        var userPhone = $('#userPhone').val();
        var userIdCard = $('#userIdCard').val();
        var equipmentCity = $('#equipmentCity').val();
        var equipmentArea = $('#equipmentArea').val();
        var purchaseTime = $('#purchaseTime').val();
        var userAddress = $('#userAddress').val();
        var equipmentBrand = $('#equipmentBrand').val();
        var companyName = $('#companyName').val();
        var equipmentModel = $('#equipmentModel').val();
        var equipmentType = $('#equipmentType').val();
        var insuranceAgency = $('#insuranceAgency').val();
        var creditCode = $('#creditCode').val();
        var insuranceInsurance = $('#insuranceInsurance').val();
        var bucketCapacity = $('#bucketCapacity').val();
        var machineQuality = $('#machineQuality').val();
        var fuelConsumption = $('#fuelConsumption').val();
        var equipmentTrack = $('#equipmentTrack').val();
        var engineNumber = $('#engineNumber').val();
        var enginePower = $('#enginePower').val();
        var purchaseMethod = $('#purchaseMethod').val();
        var equipmentLong = $('#equipmentLong').val();
        var equipmentWide = $('#equipmentWide').val();
        var equipmentHight = $('#equipmentHight').val();
        var exhaustEmission = $('#exhaustEmission').val();
        var dischargeStage = $('#dischargeStage').val();
        var noiseDetection = $('#noiseDetection').val();
        var equipmentContaminants = $('#equipmentContaminants').val();
        var fuelSource = $('#fuelSource').val();
        var fuelVariety = $('#fuelVariety').val();
        var machineNumber = $('#machineNumber').val();
        if (!userName) {
            $('.userName').show();
            passOver = false
        }
        if (!registerNumber) {
            $('.registerNumber').show();
            passOver = false
        }
        if (!registerCompany) {
            $('.registerCompany').show();
            passOver = false
        }
        if (!equipmentNumber) {
            $('.equipmentNumber').show();
            passOver = false
        }
        if (!userPhone) {
            $('.userPhone').show();
            passOver = false
        }else if(!regExpPhone.test(userPhone)){
            $('.handleErrorModalContent').text('手机号格式错误，提交失败！');
            $('#handleErrorModal').modal('show');
            passOver = false
        }
        if (!userIdCard) {
            $('.userIdCard').show();
            passOver = false
        }else if(!regExpCare.test(userIdCard)){
            $('.handleErrorModalContent').text('身份证格式错误，提交失败！');
            $('#handleErrorModal').modal('show');
            passOver = false
        }
        if (!equipmentArea) {
            $('.equipmentArea').show();
            passOver = false
        }
        console.log(purchaseTime);
        var sendData = {
            userName: userName,
            registerNumber: registerNumber,
            registerCompany: registerCompany,
            equipmentNumber: equipmentNumber,
            userPhone: userPhone,
            userIdCard: userIdCard,
            equipmentCity: equipmentCity,
            equipmentArea: equipmentArea,
            purchaseTime: purchaseTime ? (purchaseTime + ' 00:00:00') : null,
            equipmentBrand: equipmentBrand,
            companyName: companyName,
            equipmentModel: equipmentModel,
            equipmentType: equipmentType,
            insuranceAgency: insuranceAgency,
            creditCode:creditCode,
            machineNumber:machineNumber,
            userAddress:userAddress,
            insuranceInsurance: insuranceInsurance,
            bucketCapacity: bucketCapacity,
            machineQuality: machineQuality,
            fuelConsumption: fuelConsumption,
            equipmentTrack: equipmentTrack,
            engineNumber: engineNumber,
            enginePower: enginePower,
            purchaseMethod: purchaseMethod,
            equipmentLong: equipmentLong,
            equipmentWide: equipmentWide,
            equipmentHight: equipmentHight,
            exhaustEmission: exhaustEmission,
            dischargeStage: dischargeStage,
            noiseDetection: noiseDetection,
            equipmentContaminants: equipmentContaminants,
            fuelSource: fuelSource,
            fuelVariety: fuelVariety,
            rescueStatus: 0,
            equipmentPic:equipmentPic,
            billPic:billPic
        };
        if (passOver) {
            return sendData
        } else {
            return false
        }
    };
    // 人员表单获取result函数
    var submitUser = function () {
        var validator = true;
        var addPersonnelName = $('#addPersonnelName').val();
        var addPersonnelPhone = $('#addPersonnelPhone').val();
        var addPersonnelRoleId = $('#addPersonnelRoleId').val();
        var addPersonnelity = $('#addPersonnelity').val();
        var addPersonnelArea = $('#addPersonnelArea').val();
        if (!addPersonnelName) {
            $('.addPersonnelName').show();
            validator = false;
        }
        if (!addPersonnelPhone) {
            $('.addPersonnelPhone').show();
            validator = false;
        }
        if (!addPersonnelRoleId) {
            $('.addPersonnelRoleId').show();
            validator = false;
        }
        if (!addPersonnelity) {
            $('.addPersonnelity').show();
            validator = false;
        }
        if (!addPersonnelArea && $('#addPersonnelArea').css('display') === 'block') {
            $('.addPersonnelity').show();
            validator = false;
        }
        var send = {
            userName: addPersonnelName,
            userPhone: addPersonnelPhone,
            roleId: addPersonnelRoleId,
            userCity: addPersonnelity,
            userArea: (addPersonnelRoleId != '2' && addPersonnelRoleId != '4' && addPersonnelRoleId != '6' ? addPersonnelArea : null)
        };
        if (validator) {
            return send
        } else {
            return false
        }
    };
    //设备新增表单置空
    var vacantForm = function () {
        $('#userName').val('');
        $('#registerNumber').val('');
        $('#registerCompany').val('');
        $('#equipmentNumber').val('');
        $('#userPhone').val('');
        $('#userIdCard').val('');
        $('#equipmentCity').val(currentCity);
        $('#equipmentArea').val(currentArea);
        $('#userAddress').val('');
        $('#purchaseTime').val('');
        $('#equipmentBrand').val('');
        $('#companyName').val('');
        $('#equipmentModel').val('');
        $('#equipmentType').val('综合机械');
        $('#creditCode').val('');
        $('#insuranceAgency').val('');
        $('#machineNumber').val('');
        $('#insuranceInsurance').val('');
        $('#bucketCapacity').val('');
        $('#machineQuality').val('');
        $('#fuelConsumption').val('');
        $('#equipmentTrack').val('0');
        $('#engineNumber').val('');
        $('#enginePower').val('');
        $('#purchaseMethod').val('0');
        $('#equipmentLong').val('');
        $('#equipmentWide').val('');
        $('#equipmentHight').val('');
        $('#exhaustEmission').val('');
        $('#dischargeStage').val('');
        $('#noiseDetection').val('1');
        $('#equipmentContaminants').val('');
        $('#fuelSource').val('');
        $('#fuelVariety').val('');
        $('#equipmentPic').val('');
        $('#billPic').val('');
        $('.dev-add .title-error').hide();
        $('.checkEquipmentPic').hide();
        $('.checkBillPic').hide();
        //图片滞空
        billPic = null;
        equipmentPic = null;
    };
    // 人员管理表单置空
    var vacanPersonnel = function () {
        $('#addPersonnelName').val('');
        $('#addPersonnelPhone').val('');
        $('#addPersonnelRoleId').val('');
        $('#addPersonnelity').val(currentCity);
        $('#addPersonnelArea').val(currentArea);
        $('#addPersonnelModal .title-error').hide();
    };
    // 打开表单详情
    var openDevDetail = function (data) {
        $('.dev-detail-table span').text('');
        $('.stamp .stamp-clear').text('');
        service.DevDetail(data, function (data) {
            //详情赋值
            for (var key in data) {
                var current = $('.detail-' + key);
                if (current.attr('data-type') === 'purchaseMethod') {
                    current.text(data[key]==0 ? '全款购买' :data[key]==1 ? '分期购买':'转让购买')
                } else if (current.attr('data-type') === 'noiseDetection') {
                    current.text(data[key] === '1' ? '合格' : '不合格')
                } else if(current.attr('data-type') == 'equipmentTrack'){
                    current.text(data[key] == '0' ? '轮胎' : '履带')
                }else if(current.attr('data-type') == 'purchaseTime'){
                    current.text(handleDataForYMD(data[key]));
                }else {
                    if (current.length) {
                        current.text(data[key]);
                    }
                }
            }
            //二维码显示
            $('.qrCode-img').attr('src', data.qrCodePath ? data.qrCodePath : null);
            //设备照片
            $('.detail-billPic').attr('src', data.billPic ? data.billPic : null);
            //发票照片
            $('.detail-equipmentPic').attr('src', data.equipmentPic ? data.equipmentPic : null);
            $('.qrCode-img-stamp').attr('src', data.qrCodePath);
            if (data.qrCodePath) {
                $('.tablePrint').show();
                $('.tablePrint2').show();
                $('.tablePrint3').show();
                $('.detail-equipmentTrack-lt').text(data.equipmentTrack == '0'?'是':'否');
                $('.detail-equipmentTrack-ld').text(data.equipmentTrack == '0'?'否':'是')
            }else{
                $('.tablePrint').hide();
                $('.tablePrint2').hide();
                $('.tablePrint3').hide();
            }
            $('.main-right-dev').hide();
            $('.dev-detail').show();
        });
        $('.main-right-dev').hide();
        $('.dev-detail').show();
    };
    // 安全培训后台数据生成table
    var createSafetyTable = function (data) {
        var dom = '';
        data.forEach(function (i) {
            var addClassName = 'equipmentId' + i.equipmentId;
            if (i.auditStatus) {
                // 审核通过class
                addClassName += ' auditStatus1';
                if (i.rescueStatus) {
                    // 是应急救援class
                    addClassName += ' rescueStatus1';
                } else {
                    addClassName += ' rescueStatus0';
                }
            }
            var currentDom = '<tr class="' + addClassName + '">'
                + '<td>' + i.equipmentNumber + '</td>'
                + '<td>' + i.userName + '</td>'
                + '<td>' + i.userIdCard + '</td>'
                + '<td>' + i.registerNumber + '</td>'
                + '<td>' + i.registerCompany + '</td>'
                + '<td>' + i.userPhone + '</td>'
                + '<td>'
                + '<span class="label label-success labelAuditStatus1">通过培训</span>'
                + '</td></tr>';
            dom += currentDom
        });
        $('.main-right-dev-table-content-safety').html(dom);
    };
    // 后台数据生成table
    var createTable = function (data) {
        var dom = '';
        data.forEach(function (i) {
            var addClassName = 'equipmentId' + i.equipmentId;
            if (i.auditStatus) {
                // 审核通过class
                addClassName += ' auditStatus1';
                if (i.rescueStatus) {
                    // 是应急救援class
                    addClassName += ' rescueStatus1';
                } else {
                    addClassName += ' rescueStatus0';
                }
            }
            var currentDom = '<tr class="' + addClassName + '">'
                + '<td>' + i.equipmentNumber + '</td>'
                + '<td>' + i.userName + '</td>'
                + '<td>' + i.userIdCard + '</td>'
                + '<td>' + i.registerNumber + '</td>'
                + '<td>' + i.registerCompany + '</td>'
                + '<td>' + i.userPhone + '</td>'
                + '<td>'
                + '<span class="label label-success labelAuditStatus1">审核完成</span><span class="label label-warning labelAuditStatus0">待审核</span>'
                + '</td>'
                + '<td data-userName="' + i.userName + '" data-equipmentNumber="' + i.equipmentNumber + '" data-equipmentId="' + i.equipmentId + '">'
                + '<button class="btn btn-info btn-sm tableInfo">详情</button>' +
                (currentRoleId < 6 ? '<button class="btn btn-success btn-sm tableAudit">初审</button>' : '') +
                '<button class="btn btn-warning btn-sm tableEdit">编辑</button>' +
                    // '<button class="btn btn-primary btn-sm tablePrint">打印</button>' +
                '<button class="btn btn-default btn-sm tableCancelRescue">取消应急救援</button>' +
                '<button class="btn btn-default btn-sm tableSetRescue">设为应急救援</button>' +
                '<button class="btn btn-info btn-sm tableSetPaystatus" ' +
                (i.payStatus ? 'disabled' : '')
                + '>' +
                (i.payStatus ? "已缴费" : "新增缴费") +
                '</button>'
                + ((currentRoleId == 1 || currentRoleId == 2 || currentRoleId == 3) ? '<button class="btn btn-danger btn-sm tableDelete">删除</button>' : '')
                + '</td></tr>';
            dom += currentDom
        });
        $('.main-right-dev-table-content').html(dom);
    };
    // ev后台数据生成table
    var createEvTable = function (data) {
        var dom = '';
        data.forEach(function (i) {
            var addClassName = 'equipmentId' + i.equipmentId;
            var label = i.noiseDetection === '1' ? '<span class="label label-success">合格</span>' : i.noiseDetection === '0' ? '<span class="label label-danger">不合格</span>' : '<span class="label label-warning">待检测</span>';
            var currentDom = '<tr class="' + addClassName + '">'
                + '<td>' + i.equipmentNumber + '</td>'
                + '<td>' + i.userName + '</td>'
                + '<td>' + i.userIdCard + '</td>'
                + '<td>' + i.registerNumber + '</td>'
                + '<td>' + i.registerCompany + '</td>'
                + '<td>' + i.userPhone + '</td>'
                + '<td>'
                + label
                + '</td>'
                + '<td data-userName="' + i.userName + '" data-equipmentNumber="' + i.equipmentNumber + '" data-equipmentId="' + i.equipmentId + '">'
                + '<button class="btn btn-info btn-sm ev-tableInfo">详情</button>'
                + '</td></tr>';
            dom += currentDom
        });
        $('.main-right-ev-table-content').html(dom);
    };
    //时间处理
    function handleDataForYMD(time){
        if(!time)return;
        var handleTime = new Date(time);
        var year = handleTime.getFullYear();
        var month = handleTime.getMonth()<9?'0'+(handleTime.getMonth()+1):(handleTime.getMonth()+1);
        var day = handleTime.getDate()<10?'0'+handleTime.getDate():handleTime.getDate();
        return year+'-'+month+'-'+day
    }
    // user table
    var createUserTable = function (data) {
        var dom = '';
        data.forEach(function (k, index) {
            if (k.roleId === 1) {
                return false;
            }
            var roleName = k.roleId === 1 ? '超级管理员' :
                k.roleId === 2 ? '市级管理员' :
                    k.roleId === 3 ? '区级管理员' :
                        k.roleId === 4 ? '市级审核员' :
                            k.roleId === 5 ? '区级审核员' :
                                k.roleId === 6 ? '市级录入员' :
                                    '区级录入员';
            var addr = k.userCity ? k.userCity : '';
            if (k.userArea) {
                addr += k.userArea
            }
            var current = '<tr class="user' + k.userId + '" data-index="' + index + '">'
                + '<td class="personnelName">' + k.userName + '</td>'
                + '<td class="personnelRoleId">' + roleName + '</td>'
                + '<td>' + addr + '</td>'
                + '<td class="personnelPhone">' + k.userPhone + '</td>'
                + '<td data-userId="' + k.userId + '">'
                + '<button class="btn btn-success btn-sm handleEditPersonnel">编辑</button>'
                + '<button class="btn btn-danger btn-sm handleDeletePersonnel">删除</button>'
                + '<button class="btn btn-warning btn-sm handlePasswordRepeat">密码重置</button>'
                + '</td>'
                + '</tr>';
            dom += current
        });
        $('.tableForPersonnel').html(dom);
    };
    // 登录后初始化
    var init = function () {
        var roleName = currentRoleId == 1 ? '超级管理员' :
            currentRoleId == 2 ? '市级管理员' :
                currentRoleId == 3 ? '区级管理员' :
                    currentRoleId == 4 ? '市级审核员' :
                        currentRoleId == 5 ? '区级审核员' :
                            currentRoleId == 6 ? '市级录入员' :
                                '区级录入员';
        $('.header-right-title-name').html(window.sessionStorage.getItem('userName'));
        $('.header-right-title-per').html(roleName);
        $('#account').val(window.sessionStorage.getItem('userPhone'));
        // dev翻页
        //pagination
        $('#pageLimit').bootstrapPaginator({
            currentPage: 1,
            totalPages: 1,
            size: "normal",
            bootstrapMajorVersion: 3,
            alignment: "right",
            numberOfPages: 8,
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }//默认显示的是第一页。
            },
            onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                devFilter.pageNo = page;
                service.getDevList(devFilter, function (data) {
                    $('#pageLimit').bootstrapPaginator({
                        currentPage: data.pageNum,
                        totalPages: data.pages
                    });
                    createTable(data.list);
                })
            }
        });
        // user翻页
        $('#pageLimit1').bootstrapPaginator({
            currentPage: 1,
            totalPages: 1,
            size: "normal",
            bootstrapMajorVersion: 3,
            alignment: "right",
            numberOfPages: 8,
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }//默认显示的是第一页。
            },
            onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                userFilter.pageNo = page;
                service.getUserList(userFilter, function (data) {
                    createUserTable(data.list);
                })
            }
        });
        // ev翻页
        $('#pageLimit2').bootstrapPaginator({
            currentPage: 1,
            totalPages: 1,
            size: "normal",
            bootstrapMajorVersion: 3,
            alignment: "right",
            numberOfPages: 8,
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }//默认显示的是第一页。
            },
            onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                evFilter.pageNo = page;
                service.getDevList(evFilter, function (data) {
                    createEvTable(data.list);
                })
            }
        });
        // Safety翻页
        //pagination
        $('#pageLimit3').bootstrapPaginator({
            currentPage: 1,
            totalPages: 1,
            size: "normal",
            bootstrapMajorVersion: 3,
            alignment: "right",
            numberOfPages: 8,
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }//默认显示的是第一页。
            },
            onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                devFilter.pageNo = page;
                service.getDevList(devFilter, function (data) {
                    $('#pageLimit3').bootstrapPaginator({
                        currentPage: data.pageNum,
                        totalPages: data.pages
                    });
                    createSafetyTable(data.list);
                })
            }
        });
        //市的设置
        if (currentRoleId != 1) {
            $('.initCity').val(currentCity).attr('disabled', true);
            $('.initArea').html(orignCityReturnArea(currentCity))
        }
        if (currentRoleId == 3 || currentRoleId == 5 || currentRoleId == 7) {
            $('.initArea').val(currentArea).attr('disabled', true);
        }
        if (currentRoleId < 4) {
            $('.personnelLeftBtn').show();
        }
        if (config.IP == 'http://www.yysgcjx.cn/zbsjk/') {
            $('.safetyTrainingLeftBtn').show();
        }
        // 导出按钮
        if(currentRoleId==2){
            $('.deriveDev').show();
        }
    };
    // 设备管理初始化
    var devInit = function () {
        service.getDevList({pageNo: 1, pageSize: 10}, function (data) {
            createTable(data.list);
            $('#pageLimit').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
            $('.main-right-dev').show();
        });
    };
    var safetyInit = function () {
        service.getDevList({pageNo: 1, pageSize: 10}, function (data) {
            createSafetyTable(data.list);
            debugger
            $('#pageLimit3').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
            $('.main-right-safety').show();
        });
    };
    // 环境检测初始化
    var evInit = function () {
        service.getDevList({pageNo: 1, pageSize: 10}, function (data) {
            createEvTable(data.list);
            $('#pageLimit2').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
            $('.main-right-ev').show();
        });
    };
    // 人员列表初始化
    var userInit = function () {
        //获取人员列表
        service.getUserList(userFilter, function (data) {
            userData = data.list;
            createUserTable(data.list);
            $('#pageLimit1').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
        });
    };

    //修改密码
    $('.updatePassword').click(function () {
        //判断两次密码是否相同
        var account = $('#account').val();
        var password = $('#password').val();
        var newPassword = $('#newPassword').val();
        var newPasswordRepeat = $('#newPasswordRepeat').val();
        if (!account) {
            $('.account').show()
        }
        if (!password) {
            $('.password').show()
        }
        if (!newPassword) {
            $('.newPassword').show()
        }
        if (!newPasswordRepeat) {
            $('.newPasswordRepeat').show()
        }
        if (newPassword !== newPasswordRepeat) {
            $('#newPassword').parent().addClass('has-error');
            $('#newPasswordRepeat').parent().addClass('has-error');
            $('.updatePasswordErrorTitle').html('新密码输入不一致！');
        } else if (newPassword === password) {
            $('#newPassword').parent().addClass('has-error');
            $('#newPasswordRepeat').parent().addClass('has-error');
            $('.updatePasswordErrorTitle').html('新密码不和旧密码一致！');
        } else {
            //修改密码
            service.passwordUpdate({
                account: account,
                oldpwd: password,
                newpwd: newPassword
            }, currentUserId, function (data) {
                $('#passwordUpdateSuccess').modal('show');
            })
        }
    });
    $('#account').change(function () {
        $('.account').hide()
    });
    $('#password').change(function () {
        $('.password').hide()
    });
    $('#newPassword').change(function () {
        $('.newPassword').hide()
    });
    $('#newPasswordRepeat').change(function () {
        $('.newPasswordRepeat').hide()
    });
    $('.main-right-password input').change(function () {
        $('.has-error').removeClass('has-error');
        $('.updatePasswordErrorTitle').html('');
    });
    //左侧列表
    $('.list-group').on('click', 'button', function () {
            var handleClickListFont = $(this).html();
            $(this).addClass('active').siblings().removeClass('active');
            $(".main-right>div").hide();
            switch (handleClickListFont) {
                case '首页':
                    $('.main-right-index').show();
                    break;
                case '修改密码':
                    $('.main-right-password').show();
                    break;
                case '设备管理':
                    $('.main-right-dev').show();
                    devInit();
                    break;
                case '环保检测':
                    $('.main-right-ev').show();
                    evInit();
                    break;
                case '安全培训管理':
                    $('.main-right-safety').show();
                    safetyInit();
                    break;
                default :
                    $('.main-right-personnel').show();
                    //获取职能列表
                    service.getRole(function (data) {
                        roleList = data;
                        var roleDom = '';
                        roleList.forEach(function (k) {
                            roleDom += ('<option value="' + k.roleId + '">' + k.roleName + '</option>')
                        });
                        $('#addPersonnelRoleId').html(roleDom);
                    });
                    userInit();
            }
        }
    );
    //选市
    $('#city').change(function () {
        $('#area').html(orignCityReturnArea($(this).val()));
    });
    $('#ev-city').change(function () {
        $('#ev-area').html(orignCityReturnArea($(this).val()));
    });
    $('#managerCity').change(function () {
        $('#managerArea').html(orignCityReturnArea($(this).val()));
    });
    $('#equipmentCity').change(function () {
        $('#equipmentArea').html(orignCityReturnArea($(this).val()));
    });
    $('#addPersonnelity').change(function () {
        $('#addPersonnelArea').html(orignCityReturnArea($(this).val()));
    });
    //点击搜索
    $('#devSearch').click(function () {
        devFilter.userName = $('#searchName').val();
        devFilter.equipmentNumber = $('#searchId').val();
        devFilter.insuranceAgency = $('#searchProtect').val();
        devFilter.auditStatus = $('#searchState').val();
        devFilter.equipmentType = $('#searchType').val();
        devFilter.equipmentCity = $('#city').val();
        devFilter.equipmentArea = $('#area').val();
        devFilter.startTime = $('#beginDate').val();
        devFilter.endTime = $('#endDate').val();
        devFilter.pageNo = 1;
        service.getDevList(devFilter, function (data) {
            createTable(data.list);
            $('#pageLimit').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
        })
    });
    //点击搜索
    $('#devSearchSafety').click(function () {
        devFilter.userName = $('#searchNameSafety').val();
        devFilter.pageNo = 1;
        service.getDevList(devFilter, function (data) {
            createSafetyTable(data.list);
            $('#pageLimit3').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
        })
    });
    //点击新增设备
    $('.addDev').click(function () {
        vacantForm();
        $('.main-right-dev').hide();
        $('.dev-add').show();
        $('.tableHandleEdit').removeClass('tableHandleEdit')
    });
    //点击导出
    $('.deriveDev').click(function(){
        var query = '?';
        if(currentRoleId == 2){
            //市级管理员的导出
            query = "?equipmentCity="+window.sessionStorage.getItem('userCity');
        }else if(currentRoleId == 3){
            query = "?equipmentCity="+window.sessionStorage.getItem('userCity')+"&equipmentArea="+window.sessionStorage.getItem('userArea');
        }
        window.open(config.IP+"equipment/download"+query)
    });
    //新增设备提交
    $('.dev-add-btn-send').click(function () {
        var result = submitCommon();
        if (result) {
            service.addDev(result, function (data) {
                devInit();
                $('#purchaseTime').attr('type', 'date');
                $('.dev-add').hide();
            })
        }
    });
    //编辑设备提交
    $('.dev-add-btn-send-edit').click(function () {
        var result = submitCommon();
        if (result) {
            service.updateDev(result, equipmentId, function (data) {
                devInit();
                $('.dev-add').hide();
            })
        }
    });
    $('#userName').change(function () {
        $('.userName').hide()
    });
    $('#registerNumber').change(function () {
        $('.registerNumber').hide()
    });
    $('#registerCompany').change(function () {
        $('.registerCompany').hide()
    });
    $('#equipmentNumber').change(function () {
        $('.equipmentNumber').hide()
    });
    $('#userPhone').change(function () {
        $('.userPhone').hide()
    });
    $('#userIdCard').change(function () {
        $('.userIdCard').hide()
    });
    $('#equipmentArea,#equipmentCity').change(function () {
        $('.equipmentArea').hide();
    });
    //点击环境检测设备详情
    $('.main-right-ev-table-content').on('click', '.ev-tableInfo', function () {
        $('.dev-audit-status').hide();
        $('.main-right-ev').hide();
        var userName = $(this).parent().attr('data-userName');
        var equipmentNumber = $(this).parent().attr('data-equipmentNumber');
        var send = {
            equipmentNumber: equipmentNumber,
            userName: userName
        };
        openDevDetail(send, 2)
    });
    //点击设备详情
    $('.main-right-dev-table').on('click', '.tableInfo', function () {
        $('.dev-audit-status').hide();
        var userName = $(this).parent().attr('data-userName');
        var equipmentNumber = $(this).parent().attr('data-equipmentNumber');
        var send = {
            equipmentNumber: equipmentNumber,
            userName: userName
        };
        openDevDetail(send)
    })
    //点击table编辑
        .on('click', '.tableEdit', function () {
            vacantForm();
            equipmentId = $(this).parent().attr('data-equipmentId');
            var userName = $(this).parent().attr('data-userName');
            var equipmentNumber = $(this).parent().attr('data-equipmentNumber');
            var send = {
                equipmentNumber: equipmentNumber,
                userName: userName
            };
            service.DevDetail(send, function (data) {
                //详情赋值
                // $('#purchaseTime').attr('type', 'datetime');
                $('#equipmentArea').html(orignCityReturnArea(data.equipmentCity));
                for (var key in data) {
                    var current = $('#' + key);
                    if (current.length) {
                        if(key=='equipmentPic'){
                            $('.checkEquipmentPic').attr('data-src',data[key]).show();
                        }else if(key=='billPic'){
                            $('.checkBillPic').attr('data-src',data[key]).show();
                        }else if(key=='purchaseTime'){
                            current.val(handleDataForYMD(data[key]));
                        }else{
                            current.val(data[key]);
                        }
                    }
                }
                $('.main-right-dev').hide();
                $('.dev-add').addClass('tableHandleEdit').show();
            });
        })
        //点击table审核
        .on('click', '.tableAudit', function () {
            equipmentId = $(this).parent().attr('data-equipmentId');
            var userName = $(this).parent().attr('data-userName');
            var equipmentNumber = $(this).parent().attr('data-equipmentNumber');
            var send = {
                equipmentNumber: equipmentNumber,
                userName: userName
            };
            $('.dev-audit-status').show();
            openDevDetail(send)
        })
        //设为应急救援
        .on('click', '.tableSetRescue', function () {
            equipmentId = $(this).parent().attr('data-equipmentId');
            $('.equipmentId' + equipmentId).addClass('rescueStatus1').removeClass('rescueStatus0');
            service.setRescue({rescueStatus: 1}, equipmentId, function (data) {
                $('.equipmentId' + equipmentId).addClass('rescueStatus1').removeClass('rescueStatus0');
            })
        })
        //取消应急救援
        .on('click', '.tableCancelRescue', function () {
            equipmentId = $(this).parent().attr('data-equipmentId');
            $('.equipmentId' + equipmentId).addClass('rescueStatus0').removeClass('rescueStatus1');
            service.setRescue({rescueStatus: 0}, equipmentId, function (data) {
                $('.equipmentId' + equipmentId).addClass('rescueStatus0').removeClass('rescueStatus1');
            })
        })
        // 新增缴费
        .on('click', '.tableSetPaystatus', function () {
            equipmentId = $(this).parent().attr('data-equipmentId');
            service.setPaystatus(equipmentId, function () {
                $('.equipmentId' + equipmentId).find('.tableSetPaystatus').html('已缴费').attr('disabled', true);
            })
        })
        // table 删除
        .on('click', '.tableDelete', function () {
            equipmentId = $(this).parent().attr('data-equipmentId');
            $('.deleteEquipmentNumber').html($(this).parent().attr('data-equipmentNumber'));
            $('#deleteDev').modal('show');

        });
    //点击正面打印
    $('.tablePrint').click(function () {
        $('.certificate-year').text(new Date().getFullYear());
        $('.certificate-month').text(new Date().getMonth()+1);
        $('.certificate-day').text(new Date().getDate());
        $('.stamp').show();
        $(".stamp").print({
        });
        $('.stamp').hide();
    });
    //点击个人正面打印
    $('.tablePrint3').click(function () {
        $('.certificate-year').text(new Date().getFullYear());
        $('.certificate-month').text(new Date().getMonth()+1);
        $('.certificate-day').text(new Date().getDate());
        $('.stamp3').show();
        $(".stamp3").print({
        });
        $('.stamp3').hide();
    });
    //背面打印
    $('.tablePrint2').click(function () {
        $('.stamp2').show();
        $(".stamp2").print({
        });
        $('.stamp2').hide();
    });
    $('.modalDeleteDev').click(function () {
        service.deleteDev(equipmentId, function (data) {
            $('#deleteDev').modal('hide');
            $('.equipmentId' + equipmentId).remove();
        })
    });
    //详情审核通过
    $('.dev-audit-status').click(function () {
        $('.main-right-dev').show();
        $('.dev-detail').hide();
        $('.equipmentId' + equipmentId).addClass('auditStatus1 rescueStatus0');
        service.updateStatus(equipmentId, function (data) {
            $('.main-right-dev').show();
            $('.dev-detail').hide();
            $('.equipmentId' + equipmentId).addClass('auditStatus1 rescueStatus0');
        })
    });
    // 环保检测按钮
    $('.evTest').click(function () {
        evFilter.noiseDetection = '0';
        evFilter.userName = $('#ev-searchName').val();
        evFilter.equipmentCity = $('#ev-city').val();
        evFilter.equipmentArea = $('#ev-area').val();
        service.getDevList(evFilter, function (data) {
            createEvTable(data.list);
            $('#pageLimit2').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
        })
    });
    //新增设备点击返回
    $('.dev-add-btn-back').click(function () {
        $('.main-right-dev').show();
        $('.dev-add').hide();
    });
    $('.dev-detail-back').click(function () {
        if ($('.main-left .active').html() === '环保检测') {
            $('.main-right-ev').show();
        } else {
            $('.main-right-dev').show();
        }
        $('.dev-detail').hide();
    });
    //新增员工
    $('.addPersonnel').click(function () {
        vacanPersonnel();
        $('#addPersonnelPhone').attr("disabled", false);
        $('#addPersonnelModal').removeClass('stateForEdit').modal('show');
    });
    //编辑员工
    $('.tableForPersonnel').on('click', '.handleEditPersonnel', function () {
        vacanPersonnel();
        userId = $(this).parent().attr('data-userId');
        index = $(this).parent().parent().attr('data-index');
        var thisData = userData[index];
        $('#addPersonnelName').val(thisData.userName);
        $('#addPersonnelPhone').val(thisData.userPhone);
        $('#addPersonnelRoleId').val(thisData.roleId);
        $('#addPersonnelity').val(thisData.userCity);
        if (thisData.roleId == 2 || thisData.roleId == 4 || thisData.roleId == 6) {
            $('#addPersonnelArea').hide();
        } else {
            $('#addPersonnelArea').html(orignCityReturnArea(thisData.userCity)).val(thisData.userArea).show();
        }
        $('#addPersonnelPhone').attr("disabled", true);
        $('#addPersonnelModal').addClass('stateForEdit').modal('show');
    })
    //删除员工
        .on('click', '.handleDeletePersonnel', function () {
            $('.deleteUserName').html($(this).parent().siblings('.personnelName').html());
            $('#deleteUser').modal('show');
            userId = $(this).parent().attr('data-userId');
        })
        //密码重置
        .on('click', '.handlePasswordRepeat', function () {
            $('.repeatPasswordModalName').html($(this).parent().siblings('.personnelName').html());
            $('#repeatPasswordModal').modal('show');
            userId = $(this).parent().attr('data-userId');
        })
    ;
    //确定删除人员
    $('.confirmDeleteUser').click(function () {
        service.deleteUser(userId, function (data) {
            $('.userId' + userId).remove();
            $('#addPersonnelModal').modal('hide');
            $('#deleteUser').modal('hide');
            userInit();
        })
    });
    //确定重置密码
    $('.confirmRepeatPassword').click(function () {
        service.passwordRepeat(userId, function (data) {
            //$('#passwordRepeatSuccess').modal('show');
            $('#repeatPasswordModal').modal('hide');
        });
    });
    //人员搜索
    $('#userSearch').click(function () {
        userFilter.userName = $('#managerUserName').val();
        userFilter.userPhone = $('#managerUserPhone').val();
        userFilter.userCity = $('#managerCity').val();
        userFilter.userArea = $('#managerArea').val();
        userFilter.pageNo = 1;
        userInit()
    });
    //modal人员新增按钮
    $('.modal-btn-add').click(function () {
        var sendData = submitUser();
        if (sendData) {
            service.addUser(sendData, function (data) {
                $('#addPersonnelModal').modal('hide');
                userInit();
            })
        }
    });
    //modal编辑提交
    $('.modal-btn-upDate').click(function () {
        var sendData = submitUser();
        // 不能修改手机号
        sendData.userPhone = '';
        service.updateUser(sendData, userId, function (data) {
            $('#addPersonnelModal').modal('hide');
            userInit()
        })
    });
    $('#addPersonnelName').change(function () {
        $('.addPersonnelName').hide();
    });
    $('#addPersonnelPhone').change(function () {
        $('.addPersonnelPhone').hide();
    });
    $('#addPersonnelRoleId').change(function () {
        var val = $(this).val();
        $('.addPersonnelRoleId').hide();
        if (val == 2 || val == 4 || val == 6) {
            $('#addPersonnelArea').hide();
        } else {
            $('#addPersonnelArea').show();
        }
    });
    $('#equipmentPic').change(function(){
        uploadImg($('#equipmentPic')[0].files[0],'equipmentPic')
    });
    $('#billPic').change(function(){
        uploadImg($('#billPic')[0].files[0],'billPic')
    });
    $('.checkEquipmentPic,.checkBillPic').click(function(){
        $('#showPicImg').attr('src',$(this).attr('data-src'));
        $('#showPic').modal('show')
    });
    function uploadImg(selectedFile,handle){
        var key = handle +'/'+currentUserId +(Date.now());
        cos.putObject({
            Bucket: Bucket,
            Region: Region,
            Key: key,
            StorageClass: 'STANDARD',
            Body: selectedFile, // 上传文件对象
            onProgress: function(progressData) {
                console.log(JSON.stringify(progressData));
            }
        }, function(err, data) {
            console.log(err || data);
            data.Location = data.Location?data.Location:protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/'+key;
            if(handle === 'equipmentPic'){
                equipmentPic = data.Location;
                $('.checkEquipmentPic').attr('data-src',data.Location).show();
            }else{
                billPic = data.Location;
                $('.checkBillPic').attr('data-src',data.Location).show();
            }
        });
    };
    $('#addPersonnelity').change(function () {
        $('.addPersonnelity').hide();
    });
    init();
});
