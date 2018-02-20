/**
 * Created by qrf on 2017/6/28.
 */
/**
 * bootstrap table 本地化
 */
(function ($) {
    'use strict';

    if ($.fn.bootstrapTable == undefined){
        return;
    }

    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            return '正在努力地加载数据中，请稍候……';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页显示 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '显示' + pageFrom + '到' + pageTo + '，共' + totalRows + '记录';
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            return '没有找到匹配的记录';
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        },
        formatExport: function () {
            return '导出数据';
        },
        formatClearFilters: function () {
            return '清空过滤';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);

/**
 * 日期控件 本地化
 */
(function($){
    if ($.fn.datetimepicker == undefined){
        return;
    }
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };
}(jQuery));

/**
 * jquery validator 本地化
 */
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( ["jquery", "../jquery.validate"], factory );
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory( require( "jquery" ) );
    } else {
        factory( jQuery );
    }
}(function( $ ) {

    /*
     * Translated default messages for the jQuery validation plugin.
     * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
     */
    $.extend( $.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
        minlength: $.validator.format( "最少要输入 {0} 个字符" ),
        rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符串" ),
        range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
        max: $.validator.format( "请输入不大于 {0} 的数值" ),
        min: $.validator.format( "请输入不小于 {0} 的数值" )
    } );
    return $;
}));


/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
    if (jQuery.fn.select2 == undefined){
        return;
    }
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd){
        var e = jQuery.fn.select2.amd;
    }
    return e.define("select2/i18n/zh-CN", [], function () {
        return {
            errorLoading: function () {
                return "无法载入结果。"
            }, inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "请删除" + t + "个字符";
                return n
            }, inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "请再输入至少" + t + "个字符";
                return n
            }, loadingMore: function () {
                return "载入更多结果…"
            }, maximumSelected: function (e) {
                var t = "最多只能选择" + e.maximum + "个项目";
                return t
            }, noResults: function () {
                return "未找到结果"
            }, searching: function () {
                return "搜索中…"
            }
        }
    }), {define: e.define, require: e.require}
})();
