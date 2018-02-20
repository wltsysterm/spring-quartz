package com.wlt.quartz;

/**
 *  定时服务监控台api
 */
public interface ITimerConsoleService {

    /**
     * 暂停任务
     */
    void stopJob(String jobId) throws Exception ;

    /**
     * 启动任务
     */
    void startJob(String jobId) throws Exception ;

    /**
     * 同步任务
     * 修改或新增数据库中某任务配置信息，但quartz未同步修改，调用此方法同步
     * @param taskId
     * @return
     */
    void syncJob(String taskId) throws Exception ;

    /**
     * 同步任务所有任务
     * 删除quartz已有任务，重新加载
     * @return
     */
    void syncAllJob() throws Exception ;
}
