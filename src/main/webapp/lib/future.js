/**
 * Created by qrf on 2017/6/28.
 */
var bs = {};

/**
 * 调整高度
 */
// $(document).ready(function () {
//     var isExist = false;
//     $('head link').each(function(index,item){
//         if ($(item).attr('href').indexOf("animate")>0){
//             isExist = true;
//         }
//     });
//     if (!isExist){
//         $($('head')[0]).append('<link rel="stylesheet" href="../lib/adminlte/css/animate.min.css">');
//     }
//     $('body').find('.box').css('height',window.innerHeight - 10);
// });
/**
 * 窗口调整
 */
// $(window).resize(function() {
//     $('body').find('.box').css('height',window.innerHeight - 10);
// });

/**
 * 自定义错误提示位置
 */
$.validator.setDefaults({
    errorPlacement:function(error,element) {
        //最后插入
        error.appendTo(element.parent());
    }
});

window.bs = bs;
/**
 * toast提示时间
 * @type {number}
 */
var TIME_SHOW_TOAST = 2000;
/**
 * ajax超时时间
 * @type {number}
 */
var TIME_OUT = 30000;

/**
 * select选择
 * http://select2.github.io/examples.html
 * @param id
 * @param data
 * [
 *  {id:'值',text:'名称'},
 *  {id:'值',text:'名称'}
 * ]
 */
bs.select = function (id,data) {
    var options = {};
    options.data = data;
    var defaultOptions = {
        language: "zh-CN",
        theme: "bootstrap",
        width:"100%"
    };
    $.extend(defaultOptions,options);
    $(id).select2(defaultOptions);
    $(id+" option").each(function (index,item){
        if($(item).attr('value') == undefined){
            $(item).attr('value','');
        }
    });
};

/**
 * 日期选择
 * http://www.bootcss.com/p/bootstrap-datetimepicker/
 * @param id
 * @param options
 * {
 *  date:'yyyy-MM-dd(当天日期)',
 *  startDate:'yyyy-MM-dd(最小日期)',
 *  endDate:'yyyy-MM-dd(最大日期)',
 *  change:function (date) {//日期选择事件}
 *  pickerPosition: 默认"bottom-left" "bottom-right" "top-left" "top-right"
 *  }
 *  @return date yyyy-MM-dd(当前日期)
 */
bs.datetimepicker = function (id,options) {
    var nowDate;
    if (options&&options.date){
        nowDate = options.date;
    }else{
        nowDate = $(id).find('.form-control').val();
        if (nowDate == undefined || nowDate == ''){
            nowDate = new Date().format("yyyy-MM-dd");
        }
    }
    $(id).find('.form-control').val(nowDate);
    var defaultOptions = {
        language:  'zh-CN',
        weekStart: 1,
        todayBtn: true,
        autoclose: true,
        todayHighlight: true,
        startView: 2,
        minView: 2,
        forceParse: 0,
        // endDate:new Date().format("yyyy-MM-dd"),
        zIndex:11111,
        pickerPosition: "bottom-left"
    };
    $.extend(defaultOptions,options);
    $(id).datetimepicker(defaultOptions).on('changeDate',function (ev) {
        $(id).find('.form-control').val(ev.date.format("yyyy-MM-dd"));
        var dateVal = bs.datePickerFormat(id);
        if(options&&options.change){
            options.change(dateVal);
        }
    });


    bs.datePickerFormat(id);

    return nowDate;
};

/**
 * 更新日期
 * @param id
 * @param date
 */
bs.datePickerUpdate = function (id,date) {
    $(id).find('.form-control').val(date);
    $(id).datetimepicker('update');
    return bs.datePickerFormat(id);
};

/**
 * 日期格式化
 * @param id
 * @return {*|jQuery}
 */
bs.datePickerFormat = function (id) {
    var linkFormat = $(id).attr('data-link-format');
    if (linkFormat) {
        var dateValue = $(id).find('.form-control').val();
        var dateId = $(id).attr('data-link-field');
        if (dateId) {
            $('#' + dateId).val(bs.formatDate(dateValue, linkFormat));
        }
    }

    var dateFormat = $(id).attr('data-date-format');
    if (dateFormat) {
        var dateValue = $(id).find('.form-control').val();
        var dateId = $(id).attr('data-link-field');
        if (dateId) {
            $(id).find('.form-control').val(bs.formatDate(dateValue, dateFormat));
            $(id).find('.form-control').attr('value', bs.formatDate(dateValue, dateFormat));
        }
    }
    return $('#' + dateId).val();
};

/**
 * 月份选择
 * http://www.bootcss.com/p/bootstrap-datetimepicker/
 * {
 *  date:'yyyy-MM-dd(当天日期)',
 *  startDate:'yyyy-MM-dd(最小日期)',
 *  endDate:'yyyy-MM-dd(最大日期)',
 *  change:function (date) {//日期选择事件}
 *  }
 *  @return date yyyy-MM-dd(当前日期)
 */
bs.monthPicker = function (id, options) {
    var defaultOptions = {
        startView: 3,
        minView: 3,
        todayBtn: false,
    };
    $.extend(defaultOptions,options);
    return bs.datetimepicker(id,defaultOptions);
};


/**
 * 上个月选择
 * @param id
 * @param date
 * @returns {*}
 */
bs.monthPickerPre = function (id, date) {
    date = bs.preMonth(date);
    $(id+' input').val(date);
    $(id).datetimepicker('update');
    $(id+' input').val(bs.formatDate(date,"yyyy年mm月"));
    return date;
};

/**
 * 下个月选择
 * @param id
 * @param date
 * @returns {*}
 */
bs.monthPickerNext = function (id, date) {
    date = bs.nextMonth(date);
    $(id+' input').val(date);
    $(id).datetimepicker('update');
    $(id+' input').val(bs.formatDate(date,"yyyy年mm月"));
    return date;
};

/**
 * 上个月
 * @param date
 * @return {string}
 */
bs.preMonth = function (date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
};

/**
 * 下个月
 * @param date
 * @return {string}
 */
bs.nextMonth = function (date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
};

/**
 * 格式化时间
 * @param timestamp 时间戳
 * @param dateFormat yyyy-MM-dd hh:mm:ss.S
 * @return
 */
bs.formatTimestamp = function (timestamp,dateFormat) {
    if(timestamp == null || timestamp == ""){
        return "";
    }
    var date = new Date();
    date.setTime(timestamp);
    return date.format(dateFormat);
};

/**
 * 格式化日期
 * @param dateValue yyyy-mm-dd
 * @param dateFormat
 * @return {string|XML}
 */
bs.formatDate = function (dateValue, dateFormat) {
    if (dateFormat){
        var year = dateValue.substring(0,4);
        var month = dateValue.substring(5,7);
        var day = dateValue.substring(8,11);
        return dateFormat.replace('yyyy',year).replace('mm',month).replace('dd',day);
    }
    if(dateValue==null || dateValue==undefined || dateValue== "null"){
        return "";
    }
    if (dateValue.length == 8) {
        return dateValue.substring(0,4)+"-"+dateValue.substring(4,6)+"-"+dateValue.substring(6,8);
    }
    return dateValue;
};


/**
 * 格式化时间
 * @param date yyyymmdd
 * @returns yyyy:mm:dd
 */
bs.formatTime = function(date){
    if(date==null || date==undefined || date== "null"){
        return "";
    }
    if (date.length == 6) {
        return date.substring(0,2)+":"+date.substring(2,4)+":"+date.substring(4,6);
    }
    return date;
};

/**
 * 格式化金额
 * @param s xxxxxx 金额分
 * @returns {String} ￥xxx,xxx.xx
 */
bs.formatMoney = function(s){
    if(s==null || s==undefined || s== "null"){
        return "";
    }
    n = 2;
    s = parseFloat(parseInt(s)/100).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
};

/**
 * yyyyMMdd 转 yyyyXXMMxxdd
 * @param dateValue
 * @param dateFormat
 * @return {XML|string}
 */
bs.formatDbDate = function (dateValue, dateFormat) {
    var year = dateValue.substring(0,4);
    var month = dateValue.substring(4,6);
    var day = dateValue.substring(6,8);
    return dateFormat.replace('yyyy',year).replace('mm',month).replace('dd',day);
};

/**
 * bootstrap-table
 * http://bootstrap-table.wenzhixin.net.cn/
 * @param id
 * @param options
 * {
 * url: "后端json接口url",
 * toolbar: '工具栏id',
 * permission: true|false true 开启功能权限过滤
 * params:function(){
 *     //返回额外参数
 *     return {params:'params1'};
 * },
 * columns:[{
 *    field: '字段',
 *    title: '标题',
 *    width: '宽度',
 *    formatter:function (value,row,index) {
 *          //字段格式化
 *          return '';
 *    }
 * }]
 * }
 */
bs.table = function (id, options) {
    var defaultOptions = {
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 15, 20, 100],        //可供选择的每页的行数（*）
        // classes:"table table-no-bordered",
        // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        // height:window.innerHeight-160,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        // showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        undefinedText:'-',                   //当数据为 undefined 时显示的字符
        exportTypes:[ 'csv', 'excel'], //导出文件类型 ，支持多种类型文件导出
        queryParams: function (params) {
            if (params.limit){
                var pageParams = {
                    //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    pageNo: params.offset/params.limit+1,  //页码
                    pageSize: params.limit   //页面大小
                };
                $.extend(params,pageParams);
            }
            if (options.params){
                $.extend(params,options.params());
            }
            return params;
        },//传递参数（*）
        responseHandler:function (result) {
            bs.respHandle(result);
            return result.data;
        },
        onLoadSuccess:function () {
            if(options.permission == undefined){
                bs.refreshPermission();
            }
            if (options.permission){
                bs.refreshPermission();
            }
        },
        onColumnSwitch: function (field, checked) {
            if(options.permission == undefined){
                bs.refreshPermission();
            }
            if (options.permission){
                bs.refreshPermission();
            }
        }
    };
    options.url = bs.apiRoot()+options.url;
    $.extend(defaultOptions,options);
    var $table = $(id);
    $table.bootstrapTable(defaultOptions);

    if (defaultOptions.height){

    }else{
        $table.parent().parent().css('height',bs.tableHeight());
        $(window).resize(function() {
            $table.parent().parent().css('height',bs.tableHeight());
        });
    }
};

/**
 * 调整表格高度
 * @return {number}
 */
bs.tableHeight = function() {
    var boxHeaderHeight = $('.box .box-header').height();
    var toolbarHeight = $('.fixed-table-toolbar').height();
    var tableFooterHeight = $('.fixed-table-pagination').height();

    boxHeaderHeight == null?0:(boxHeaderHeight+=20);
    toolbarHeight == null?0:toolbarHeight;
    tableFooterHeight == null?0:tableFooterHeight;

    var height = window.innerHeight-boxHeaderHeight-toolbarHeight-tableFooterHeight-20;
    return height;
};
/**
 * 刷新表格
 * @param id
 */
bs.tableRefresh = function (id) {
    $(id).bootstrapTable('refresh');
};

/**
 * query查询
 * @param id
 * @param params
 * {
 *    params1:'params1',
 *    params2:'params2'
 * }
 */
bs.tableQuery = function (id,params) {
    $(id).bootstrapTable('refresh', {
        query:params
    });
};


/**
 * query查询(传入新url)
 * @param id
 * @param newUrl
 */
bs.tableQueryUrl = function (id,newUrl) {
    $(id).bootstrapTable('refresh', {
        url:bs.apiRoot()+ newUrl
    });
};

/**
 * 获取表格行数据
 * @param id
 * @param index
 * @return {*}
 */
bs.tableRow = function (id,index) {
    return $(id).bootstrapTable('getData')[index];
};

/**
 * from 弹窗
 * @param options dialog 参数:
 * {
 *  id:'必填，id',
 *  title:'标题',
 *  width:'宽度',
 *  height:'高度',
 *  cancelText:'取消文字',
 *  agreeText:'确认文字',
 *  single:true  单按钮
 * }
 * @param handler 回调函数
 */
bs.openDialog= function (options,handler) {
    var defaultOptions = {
        title:"标题",
        // width:600,
        // height:300,
        cancelText:"取消",
        agreeText:"提交"
    };
    var dialogTag = options.id+'dlg';
    var nodeId = '#'+options.id;
    var dialogId = '#'+dialogTag;

    $.extend(defaultOptions,options);

    //已经初始化显示
    if ($(dialogId).length>0){
        $(dialogId).modal({'show':true,backdrop: 'static'});
        return;
    }

    //初始化
    var html = [];
    html.push('<div class="modal fade" id="'+dialogTag+'">');
    html.push('<div class="modal-dialog" style="width: '+defaultOptions.width+'px;">');
    html.push('<div class="modal-content">');
    html.push('<div class="modal-header">');
    html.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    html.push('<h4 class="modal-title">'+defaultOptions.title+'</h4>');
    html.push('</div>');
    html.push('<div class="modal-body" style="overflow-y: auto;height: '+defaultOptions.height+'px;">');
    html.push('</div>');
    if (options.single){
        html.push('<div class="modal-footer tc">');
        defaultOptions.agreeText = '确定';
        html.push('<button type="button" class="btn btn-success agree-btn w200">'+defaultOptions.agreeText+'</button>');
    }else{
        html.push('<div class="modal-footer tc">');
        html.push('<button type="button" class="btn btn-default" data-dismiss="modal">'+defaultOptions.cancelText+'</button>');
        html.push('<button type="button" class="btn btn-success agree-btn">'+defaultOptions.agreeText+'</button>');
    }
    html.push('</div>');
    html.push('</div></div></div>');

    $('body').append(html.join(''));

    if ($(nodeId)){
        $(dialogId+' .modal-body').append($(nodeId));
    }

    $(dialogId+' .modal-footer .agree-btn').on('click',function () {
        if (options.single){
            $(dialogId).modal('hide');
        }else{
            if (handler) {
                handler(dialogId);
            }
        }
    });

    $(dialogId).modal({'show':true,backdrop: 'static'});

};
bs.resetDlgPosition=function (id) {
    $("#"+id+"dlg>.modal-dialog").css({"top":10+$(window.parent.document).scrollTop()});
}
bs.resetDlgPositionByState=function (id) {
    if($("#"+id+"dlg").css("display")!="none"){
        bs.resetDlgPosition(id);
    }
}
/**
 * 重置当前的dlg的title属性
 * @param id
 * @param title
 */
bs.resetDlgTitle=function (id,title) {
    $("#"+id+"dlg h4[class=modal-title]").text(title);
}
/**
 * from 弹窗
 * @param options dialog 参数:
 * {
 *  formId:'必填，formId',
 *  title:'标题',
 *  width:'宽度',
 *  height:'高度',
 *  cancelText:'取消文字',
 *  agreeText:'确认文字',
 *  isClear:'是否清除表单'
 * }
 * @param successHandler 回调函数
 * @param beforeHandler 提交之前处理
 * @param failHandler 失败回调
 */
bs.submitForm = function (options, successHandler, beforeHandler, failHandler) {

    var formId = '#'+options.id;

    //清除表单
    if (options.isClear){
        $(formId)[0].reset();
        $(formId+' .form-control').removeClass('error');
        $(formId+' .error').css('display','none');
    }

    //打开弹窗
    bs.openDialog(options, function (dialogId) {

        //清楚disabled
        var inputDisables = $(formId+' input[disabled]');
        var selectDisables = $(formId+' select[disabled]');
        inputDisables.removeAttr('disabled');
        selectDisables.removeAttr('disabled');

        if(!$(formId).valid()){
            //新增动画效果
            $(dialogId+' .modal-content').addClass('animated shake').
            one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated shake');
            });
            return;
        }

        //提交之前处理
        if(beforeHandler){
            if(beforeHandler() == false){
                return;
            }
        }

        bs.ajax({
            url : $(formId).attr('action'),
            data: $(formId).serialize(),
            success : function(data) {
                inputDisables.attr('disabled','disabled');
                selectDisables.attr('disabled','disabled');
                $(dialogId).modal('hide');
                if (successHandler) {
                    successHandler(data);
                }
            },
            error : function(data) {
                inputDisables.attr('disabled','disabled');
                selectDisables.attr('disabled','disabled');
                if (failHandler){
                    failHandler(data);
                }
            }
        });
    });
};

/**
 * 弹框
 * @param options 参数:
 * {
 *    msg:'提示信息'
 * }
 * @param handler 确定点击回调
 */
bs.alert = function (options, handler) {

    var randId = parseInt(10*Math.random());
    var defaultOptions = {
        id: randId,
        msg:"提示",
        agreeText:"确定",
        cancelText:"取消"
    };
    var dialogTag = defaultOptions.id+'dlg';
    var nodeId = '#'+defaultOptions.id;
    var dialogId = '#'+dialogTag;

    $.extend(defaultOptions,options);

    //已经初始化显示
    if ($(dialogId).length>0){
        $(dialogId).modal('show');
        return;
    }
    //初始化
    var html = [];
    html.push('<div class="modal fade" data-backdrop="static" id="'+dialogTag+'">');
    html.push('<div class="modal-dialog modal-sm">');
    html.push('<div class="modal-content tc">');
    if (options.title){
        html.push('<div class="modal-header">');
        html.push('<h4 class="modal-title">'+defaultOptions.title+'</h4>');
        html.push('</div>');
    }
    html.push('<div class="modal-body">');
    html.push('<div>'+defaultOptions.msg+"</div>");
    html.push('</div>');
    html.push('<div class="modal-footer tc">');
    if (options.cancelText){
        html.push('<button type="button" class="btn btn-default w100" data-dismiss="modal">'+defaultOptions.cancelText+'</button>');
        html.push('<button type="button" class="btn btn-primary w100">'+defaultOptions.agreeText+'</button>');
    }else {
        html.push('<button type="button" class="btn btn-primary" style="width: 180px;">'+defaultOptions.agreeText+'</button>');
    }
    html.push('</div>');
    html.push('</div></div></div>');

    $('body').append(html.join(''));

    if ($(nodeId)){
        $(dialogId+' .modal-body').append($(nodeId));
    }

    $(dialogId+' .modal-footer .btn-primary').on('click',function () {
        if (handler) {
            $(dialogId).modal('hide');
            handler(dialogId);
        }
    });
    $(dialogId).on('hidden.bs.modal', function (e) {
        $(dialogId).remove();
    });

    $(dialogId).modal('show');
    bs.resetDlgPosition(randId);
};

/**
 * api根url地址
 * @return {string|*}
 */
bs.apiRoot = function (subpath) {
    if(bs.rootUrl){
        return bs.rootUrl;
    }
    var js=document.scripts;
    var jsroot='';
    for(var i=js.length;i>0;i--){
        jsroot=js[i-1].src;
        if(jsroot.indexOf(subpath==null?"/lib":subpath)>-1){
            jsroot=jsroot.substring(0,jsroot.indexOf("/js/util"));
            break;
        }
    }
    bs.rootUrl = jsroot;
    return bs.rootUrl;
};

/**
 * ajax请求
 * @param option 参数：
 * {
 *  type:'post' or 'get',
 *  url:'/api/json路径',
 *  data:$(formId).serialize() or {params:'params'},
 *  success:funciton(result){
 *      //成功处理
 *  },
 *  error:function(result){
 *      //失败处理
 *  }
 * }
 */
bs.ajax = function (option) {
    var ajaxjson = {
        type : option.type==null?"POST":option.type,
        url : bs.apiRoot()+option.url,
        dataType : 'json',
        timeout : TIME_OUT,
        data:option.data,
        async:option.async==null?false:option.async,
        success : function(result) {
            bs.respHandle(result,option);
        },
        error : function(xhr, type) {
            if(xhr.responseText){
                var responseJson = eval("("+xhr.responseText+")");
                bs.toast('error',xhr.status,responseJson.message);
            }else{
                bs.toast('error',xhr.status,xhr.statusText);
            }
        }
    };
    if(option.contentType){
        ajaxjson.contentType="application/json";
        ajaxjson.data=JSON.stringify(option.data);
    }
    $.ajax(ajaxjson);
};

/**
 * ajax 回调处理
 * @param result 结果数据
 * @param option 处理方法
 */
bs.respHandle = function (result, option) {
    if (result.code == null){
        bs.toast('响应格式不正确！');
        return;
    }
    if (result.code == 'ok'){
        //成功
        if(option&&option.success){
            option.success(result.data);
        }
    } else if (result.code == 'globalError'){
        bs.errorMsg(result.data);
    }else {
        bs.errorMsg(result);
        if(option&&option.error){
            option.error(result);
        }
    }
}

/**
 * 错误提示
 * @param result
 */
bs.errorMsg = function(result){
    bs.toast('error',result.code,result.msg);
};

/**
 * toast提示
 * @param type 'error','info','success','warn'
 * @param title 标题
 * @param msg 消息
 */
bs.toast = function (type,title,msg) {
    // toast-top-right
    // toast-bottom-right
    // toash-bottom-left
    // toast-top-left
    // toast-top-full-width 这个是在网页顶端，宽度铺满整个屏幕
    // toast-bottom-full-width
    // toast-top-center顶端中间
    // toast-bottom-center
    toastr.options = {
        closeButton: true,
        debug: false,
        progressBar: true,
        positionClass: "toast-top-center",
        onclick: null,
        showDuration: "300000",
        hideDuration: "1000",
        timeOut: TIME_SHOW_TOAST,
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };
    switch (arguments.length){
        case 1:
            toastr['error'](type,"");
            break;
        case 2:
            toastr[type](title,"");
            break;
        default:
            toastr[type](msg,title);
            break;
    }

};

/**
 * html需包含：<button permission="M01020205"></button>
 * 刷新权限
 */
bs.refreshPermission = function () {
    if (parent.permissions){
        var permissionCodes = parent.permissions;
        //隐藏全部功能
        $('*[permission]').hide();
        //加载功能
        $('*[permission]').each(function(index,item){
            var $id = $(this);
            var permissionCode = $id.attr("permission");
            var isContain = $.inArray(permissionCode, permissionCodes)>-1;
            if (isContain){
                $id.css("visibility","visible");
                $id.show();
            }
        });
    }
};
/**
 * 获取url参数
 * @param name
 * @return {*}
 */
bs.getUrlParameter = function (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
        return  decodeURIComponent(r[2]);
    }
    return null;
};
/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

bs.jsonArray2JsonObject = function(a) {
        var o = {};
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [ o[this.name] ];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
}

/**
 *yyyyMMdd转yyyy-MM-dd
 * 或者
 * hhmmss转hh:mm:ss
 * @param value
 * @param type date:转换日期；time:转化时间
 * @param splitParam 不为空时，会作为分隔符分割时间或者日期参数，eg:yyyy/MM/dd
 * @returns {*}
 */
bs.formateDateOrTime = function (value,type,splitParam) {
    if(splitParam)
        if(type=='date')
            return value.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1"+splitParam+"$2"+splitParam+"$3");
        else if(type=='time')
            return value.replace(/^(\d{2})(\d{2})(\d{2})$/, "$1"+splitParam+"$2"+splitParam+"$3");
        else
            return value;
    else
        if(type=='date')
            return value.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
        else if(type=='time')
            return value.replace(/^(\d{2})(\d{2})(\d{2})$/, "$1:$2:$3");
        else
            return value;
}

/**
 * 移动日期
 * date 日期，当前时间为 new Date()
 * offset 偏移天数，可正负
 * dateFormat  出参格式，如yyyyXXmmXXdd
 */
bs.moveDays=function(date,offset,dateFormat){
    var newDate = date;
    newDate.setDate(newDate.getDate()+offset);

    if(!dateFormat){
        dateFormat = "yyyy-MM-dd";
    }
    return newDate.format(dateFormat);
}

/**
 * 补足下拉框元素
 * @param arr 下拉框数组对象
 * @param id 下拉框id 默认不填
 * @param text 下拉框text 默认不填
 * @returns {*}
 */
bs.addArrFull=function (arr,id,text) {
    id=(id==null?"null":id);
    text=(text==null?'全部':text);
    // 拼接函数(索引位置, 要删除元素的数量, 元素)
    arr.splice(0, 0, {id:id,text:text});
    return arr;
}

/**
 * toast显示
 */
!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return f({type:O.error,iconClass:g().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=g()),v=e("#"+t.containerId),v.length?v:(n&&(v=c(t)),v)}function i(e,t,n){return f({type:O.info,iconClass:g().iconClasses.info,message:e,optionsOverride:n,title:t})}function o(e){w=e}function s(e,t,n){return f({type:O.success,iconClass:g().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return f({type:O.warning,iconClass:g().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e){var t=g();v||n(t),l(e,t)||u(t)}function d(t){var i=g();return v||n(i),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function u(t){for(var n=v.children(),i=n.length-1;i>=0;i--)l(e(n[i]),t)}function l(t,n){return t&&0===e(":focus",t).length?(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0):!1}function c(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass).attr("aria-live","polite").attr("role","alert"),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function m(e){w&&w(e)}function f(t){function i(t){return!e(":focus",l).length||t?(clearTimeout(O.intervalId),l[r.hideMethod]({duration:r.hideDuration,easing:r.hideEasing,complete:function(){h(l),r.onHidden&&"hidden"!==b.state&&r.onHidden(),b.state="hidden",b.endTime=new Date,m(b)}})):void 0}function o(){(r.timeOut>0||r.extendedTimeOut>0)&&(u=setTimeout(i,r.extendedTimeOut),O.maxHideTime=parseFloat(r.extendedTimeOut),O.hideEta=(new Date).getTime()+O.maxHideTime)}function s(){clearTimeout(u),O.hideEta=0,l.stop(!0,!0)[r.showMethod]({duration:r.showDuration,easing:r.showEasing})}function a(){var e=(O.hideEta-(new Date).getTime())/O.maxHideTime*100;f.width(e+"%")}var r=g(),d=t.iconClass||r.iconClass;if("undefined"!=typeof t.optionsOverride&&(r=e.extend(r,t.optionsOverride),d=t.optionsOverride.iconClass||d),r.preventDuplicates){if(t.message===C)return;C=t.message}T++,v=n(r,!0);var u=null,l=e("<div/>"),c=e("<div/>"),p=e("<div/>"),f=e("<div/>"),w=e(r.closeHtml),O={intervalId:null,hideEta:null,maxHideTime:null},b={toastId:T,state:"visible",startTime:new Date,options:r,map:t};return t.iconClass&&l.addClass(r.toastClass).addClass(d),t.title&&(c.append(t.title).addClass(r.titleClass),l.append(c)),t.message&&(p.append(t.message).addClass(r.messageClass),l.append(p)),r.closeButton&&(w.addClass("toast-close-button").attr("role","button"),l.prepend(w)),r.progressBar&&(f.addClass("toast-progress"),l.prepend(f)),l.hide(),r.newestOnTop?v.prepend(l):v.append(l),l[r.showMethod]({duration:r.showDuration,easing:r.showEasing,complete:r.onShown}),r.timeOut>0&&(u=setTimeout(i,r.timeOut),O.maxHideTime=parseFloat(r.timeOut),O.hideEta=(new Date).getTime()+O.maxHideTime,r.progressBar&&(O.intervalId=setInterval(a,10))),l.hover(s,o),!r.onclick&&r.tapToDismiss&&l.click(i),r.closeButton&&w&&w.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),i(!0)}),r.onclick&&l.click(function(){r.onclick(),i()}),m(b),r.debug&&console&&console.log(b),l}function g(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),C=void 0))}var v,w,C,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:d,error:t,getContainer:n,info:i,options:{},subscribe:o,success:s,version:"2.1.0",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});

//iframe页面权限状态检查
bs.authCheck=function () {
    var auth = bs.auth();
    if(!auth || !auth.permissions){
        bs.toast("warning",auth.code,auth.msg);
        logoutAutoForIframe();
        return true;
    }
}
bs.auth=function () {
    var auth;
    bs.ajax({
        url:"/future/money/auth",
        success:function (data) {
            auth=data;
        }
    });
    return auth;
}
bs.greet=function () {
    var now = new Date();
    var hour = now.getHours();
    if(hour < 6){return("凌晨好！")}
    else if (hour < 9){return("早上好！")}
    else if (hour < 12){return("上午好！")}
    else if (hour < 14){return("中午好！")}
    else if (hour < 17){return("下午好！")}
    else if (hour < 19){return("傍晚好！")}
    else if (hour < 22){return("晚上好！")}
    else {return("夜里好！")}
}
bs.authMenu = function (auth) {
    //隐藏全部功能
    $('li[money]').hide();
    if (auth && auth.permissions){
        var permissions = auth.permissions;
        //加载功能
        $('li[money]').each(function(index,item){
            var $id = $(this);
            var permissionCode = $id.attr("money");
            var isContain = $.inArray(permissionCode, permissions)>-1;
            if (isContain){
                $id.css("visibility","visible");
                $id.show();
            }
        });
    }else{
        bs.toast("warning",auth.code,auth.msg);
        return true;
    }
};
bs.validMoney=function(money,flag) {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if(reg.test(money))
        return true;
    if(flag)
        bs.toast("warning","金额格式出错(最高精度0.00)");
    return false;
}
bs.validNumber=function(money,flag){
    var reg = /^[1-9]\d*$/;
    if(reg.test(money))
        return true;
    if(flag)
        bs.toast("warning","数量格式出错(只能为正整数)");
    return false;
}
bs.errorHandle=function (result,tabbleId,msg) {
    if(result && result.code){
        bs.toast("error",result.code,result.msg);
        return;
    }
    bs.tableRefresh(tabbleId?tabbleId:'#table');
    bs.toast("info",msg?msg:"操作成功");
}
function logoutAuto() {
    setTimeout(function () {
        toLogin();
    },"2000");
}
function logoutAutoForIframe() {
    setTimeout(function () {
        window.parent.location="../html/login.html";
    },"2000");
}
function toLogin() {
    window.location="../html/login.html";
}
//获取地址栏的参数插件
jQuery.extend({
    /**
     * Returns get parameters.
     *
     * If the desired param does not exist, null will be returned
     *
     * @example value = $.getURLParam("paramName");
     */
    getURLParam: function(strParamName)
    {
        var strReturn = "";
        var strHref = window.location.href.toUpperCase();

        var bFound = false;

        var cmpstring = strParamName.toUpperCase() + "=";
        var cmplen = cmpstring.length;

        if (strHref.indexOf("?") > -1)
        {
            var strQueryString = strHref.substr(strHref.indexOf("?") + 1);0
            var aQueryString = strQueryString.split("&");
            for (var iParam = 0; iParam < aQueryString.length; iParam++)
            {
                if (aQueryString[iParam].substr(0, cmplen) == cmpstring)
                {
                    var aParam = aQueryString[iParam].split("=");
                    strReturn = aParam[1];
                    bFound = true;
                    break;
                }

            }
        }
        if (bFound == false) return null;
        //  www.permadi.com/tutorial/urlEncoding/
        //<space> %20  or +
        // return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
        strReturn = strReturn.replace(/\+/g, '%20');
        return unescape(strReturn);
    },
    getStringParam: function(strParamName, strParamString)
    {
        var strReturn = "";
        var strHref = strParamString.toUpperCase();
        var bFound = false;

        var cmpstring = strParamName.toUpperCase() + "=";
        var cmplen = cmpstring.length;

        var strQueryString = strHref;
        var aQueryString = strQueryString.split("&");
        for (var iParam = 0; iParam < aQueryString.length; iParam++)
        {
            if (aQueryString[iParam].substr(0, cmplen) == cmpstring)
            {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                bFound = true;
                break;
            }

        }

        if (bFound == false) return null;
        return strReturn;
    }
});