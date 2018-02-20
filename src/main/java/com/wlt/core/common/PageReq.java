package com.wlt.core.common;

/**
 * 分页入参基类
 * 默认值：第1页，每页10条
 */
public class PageReq {
    private Integer pageNo;
    private Integer pageSize;

    public Integer getPageNo() {
        if(this.pageNo == null || this.pageNo < 1){
            return 1;
        }else{
            return pageNo;
        }
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        if(this.pageSize == null || this.pageSize < 1){
            return 10;
        }else{
            return pageSize;
        }
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
