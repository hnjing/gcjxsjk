$(function(){
    var equipmentId = null;
    var devFilter = {
        'userName': null,
        'insuranceAgency': null,
        'auditStatus': null,
        'equipmentType': null,
        'equipmentCity': null,
        'equipmentArea': null,
        'startTime': null,
        'endTime': null,
        'rescueStatus':1,
        'pageNo': 1,
        'pageSize': 10
    };
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
        var equipmentBrand = $('#equipmentBrand').val();
        var companyName = $('#companyName').val();
        var equipmentModel = $('#equipmentModel').val();
        var equipmentType = $('#equipmentType').val();
        var insuranceAgency = $('#insuranceAgency').val();
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
        }
        if (!userIdCard) {
            $('.userIdCard').show();
            passOver = false
        }
        if (!equipmentArea) {
            $('.equipmentArea').show();
            passOver = false
        }
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
            rescueStatus:1
        };
        if (passOver) {
            console.log('sendData', sendData);
            return sendData
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
        $('#equipmentCity').val(window.sessionStorage.getItem('userCity'));
        $('#equipmentArea').val('');
        $('#purchaseTime').val('');
        $('#equipmentBrand').val('');
        $('#companyName').val('');
        $('#equipmentModel').val('');
        $('#equipmentType').val('');
        $('#insuranceAgency').val('');
        $('#insuranceInsurance').val('');
        $('#bucketCapacity').val('');
        $('#machineQuality').val('');
        $('#fuelConsumption').val('');
        $('#equipmentTrack').val('');
        $('#engineNumber').val('');
        $('#enginePower').val('');
        $('#purchaseMethod').val('');
        $('#equipmentLong').val('');
        $('#equipmentWide').val('');
        $('#equipmentHight').val('');
        $('#exhaustEmission').val('');
        $('#dischargeStage').val('');
        $('#noiseDetection').val('');
        $('#equipmentContaminants').val('');
        $('#fuelSource').val('');
        $('#fuelVariety').val('');
        $('.dev-add .title-error').hide();
    };
    // 打开表单详情
    var openDevDetail = function (data) {
        service.DevDetail(data, function (data) {
            console.log(data);
            //详情赋值
            for (var key in data) {
                var current = $('.detail-' + key);
                if (current.attr('data-type') === 'purchaseMethod') {
                    current.text(data[key] ? '分期购买' : '全款购买')
                } else if (current.attr('data-type') === 'noiseDetection') {
                    current.text(data[key]==='1' ? '合格' : '不合格')
                } else {
                    if (current.length) {
                        current.text(data[key]);
                    }
                }
            }
            //二维码显示
            if(data.qrCodePath){
                $('.qrCode-img').attr('src',data.qrCodePath);
            }
            //设备照片
            $('.detail-billPic').attr('src', data.billPic ? data.billPic : null);
            //发票照片
            $('.detail-equipmentPic').attr('src', data.equipmentPic ? data.equipmentPic : null);
            $('.main-right-dev').hide();
            $('.dev-detail').show();
        });
        $('.main-right-dev').hide();
        $('.dev-detail').show();
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
                + '<td data-userName="' + i.userName + '" data-equipmentNumber="' + i.equipmentNumber + '" data-equipmentId="' + i.equipmentId + '">'
                + '<button class="btn btn-info btn-sm tableInfo">详情</button>'
                + '<button class="btn btn-success btn-sm tableAudit">初审</button>' +
                '<button class="btn btn-warning btn-sm tableEdit">编辑</button>' +
                '<button class="btn btn-default btn-sm tableCancelRescue">取消应急救援</button>' +
                '<button class="btn btn-default btn-sm tableSetRescue">设为应急救援</button>'+
                '<button class="btn btn-danger btn-sm tableDelete">删除</button>'
                + '</td></tr>';
            dom += currentDom
        });
        $('.main-right-dev-table-content').html(dom);
    };
    // 设备管理初始化
    var devInit = function () {
        service.getDevList({pageNo: 1, pageSize: 10,'rescueStatus':1}, function (data) {
            createTable(data.list);
            $('#pageLimit').bootstrapPaginator({
                currentPage: data.pageNum,
                totalPages: data.pages
            });
            $('.main-right-dev').show();
        });
    };
// 登录后初始化
    var init = function () {
        devInit();
        var roleId = window.sessionStorage.getItem('roleId');
        $('.header-right-title-name').html(window.sessionStorage.getItem('userName'));
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
        //市的设置
        if(roleId != 1){
            $('.initCity').val(window.sessionStorage.getItem('userCity')).attr('disabled',true);
            $('.initArea').html(orignCityReturnArea(window.sessionStorage.getItem('userCity')))
        }
    };
    //点击新增设备
    $('.addDev').click(function () {
        vacantForm();
        $('.main-right-dev').hide();
        $('.dev-add').show();
        $('.tableHandleEdit').removeClass('tableHandleEdit')
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
    $('#equipmentCity').change(function () {
        $('#equipmentArea').html(orignCityReturnArea($(this).val()));
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
        console.log(send);
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
                console.log(data);
                //详情赋值
                $('#purchaseTime').attr('type', 'datetime');
                $('#equipmentArea').html(orignCityReturnArea(data.equipmentCity));
                for (var key in data) {
                    var current = $('#' + key);
                    if (current.length) {
                        current.val(data[key]);
                    }
                }
                $('.main-right-dev').hide();
                $('.dev-add').addClass('tableHandleEdit').show();
            });
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
        // table 删除
        .on('click', '.tableDelete', function () {
            equipmentId = $(this).parent().attr('data-equipmentId');
            $('.deleteEquipmentNumber').html($(this).parent().attr('data-equipmentNumber'));
            $('#deleteDev').modal('show');
        });
    $('.dev-detail-back').click(function () {
        if($('.main-left .active').html() === '环保检测'){
            $('.main-right-ev').show();
        }else{
            $('.main-right-dev').show();
        }
        $('.dev-detail').hide();
    });
    $('.modalDeleteDev').click(function(){
        service.deleteDev(equipmentId, function (data) {
            $('#deleteDev').modal('hide');
            $('.equipmentId' + equipmentId).remove();
        })
    });
    //点击搜索
    $('#devSearch').click(function () {
        devFilter.userName = $('#searchName').val();
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
    init();
});
