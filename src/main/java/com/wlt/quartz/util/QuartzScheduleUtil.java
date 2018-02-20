package com.wlt.quartz.util;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

/**
 * Created by wlt on 2018/2/20.
 */
public class QuartzScheduleUtil {
    private Scheduler scheduler;

    public Scheduler getScheduler() {
        return scheduler;
    }

    public void setScheduler(Scheduler scheduler) {
        this.scheduler = scheduler;
    }

    public QuartzScheduleUtil(){

    }
    public QuartzScheduleUtil(Scheduler scheduler){
        this.scheduler = scheduler;
    }
    /**
     * 启动一个调度对象
     * @throws SchedulerException
     */
    public  void start() throws SchedulerException {
        if (!scheduler.isShutdown()) {
            scheduler.start();
        }
    }

    /**
     * 判断调度器是否关闭
     * @return
     */
    private  boolean isShutdown(){
        try {
            return scheduler.isShutdown();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
        return false;
    }
    /**
     * 调度是否启动
     * @return
     * @throws SchedulerException
     */
    public  boolean isStarted() throws SchedulerException {
        return scheduler.isStarted();
    }
    /**
     * 关闭调度器
     * @throws SchedulerException
     */
    public  void shutdown() throws SchedulerException {
        scheduler.shutdown();
    }

    /**
     * 暂停调度任务
     * @return
     * @throws SchedulerException
     */
    public  void unscheduleJob(QuartzScheduleJob job)
            throws SchedulerException{
        if (!isShutdown()) {
            scheduler.pauseJob(new JobKey(job.getJobName(),
                    job.getJobGroup()));
            scheduler.pauseTrigger(new TriggerKey(job.getJobName(),
                    job.getTriggerGroup()));
        }
    }

    /**
     * 重启任务调度
     * @param job
     */
    public  void resumeJob(QuartzScheduleJob job){
        try {
            if (!isShutdown()) {
                scheduler.resumeJob(new JobKey(job.getJobName(),
                        job.getJobGroup()));
                scheduler.resumeTrigger(new TriggerKey(job.getJobName(),
                        job.getTriggerGroup()));
            }
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }

    /**
     * 暂停触发器
     * @param job
     */
    public  void pauseTrigger(QuartzScheduleJob job) {
        try {
            if (!isShutdown()) {
                scheduler.pauseTrigger(new TriggerKey(job.getJobName(),
                        job.getTriggerGroup()));// 停止触发器
            }
        } catch (SchedulerException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 恢复触发器
     * @param job
     */
    public  void resumeTrigger(QuartzScheduleJob job) {
        try {
            if (!isShutdown()) {
                scheduler.resumeTrigger(new TriggerKey(job.getJobName(),
                        job.getTriggerGroup()));// 重启触发器
            }
        } catch (SchedulerException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 删除触发器
     * @param job
     * @return
     */
    public  boolean removeTrigdger(QuartzScheduleJob job) {
        TriggerKey triggerKey = new TriggerKey(job.getJobName(),
                job.getTriggerGroup());
        try {
            if (!isShutdown()) {
                scheduler.pauseTrigger(triggerKey);// 停止触发器
            }
            return scheduler.unscheduleJob(triggerKey);// 移除触发器
        } catch (SchedulerException e) {
            throw new RuntimeException(e);
        }
    }
    /**
     * 暂停调度中所有的job
     * 恢复任务时，停止时间段之间的任务会被执行
     */
    public  void pauseAll() {
        try {
            if (!isShutdown()) {
                scheduler.pauseAll();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 恢复调度中所有的job
     * @throws SchedulerException
     */
    public  void resumeAll() throws SchedulerException {
        if (!isShutdown()) {
            scheduler.resumeAll();
        }
    }

    /**
     * 删除一个任务
     * @param job
     * @throws SchedulerException
     */
    public  void removeJob(QuartzScheduleJob job)
            throws SchedulerException{
        TriggerKey triggerKey = new TriggerKey(job.getJobName(),
                job.getTriggerGroup());
        if (!isShutdown()) {
            scheduler.pauseTrigger(triggerKey);//停止触发器
            scheduler.unscheduleJob(triggerKey);//移除触发器
            scheduler.deleteJob(new JobKey(job.getJobName(),
                    job.getJobGroup()));//删除任务
        }
    }

    /**
     * 创建一个调度对象
     *
     * @return
     * @throws SchedulerException
     */
    public static  Scheduler newScheduler() {
        SchedulerFactory sf = new StdSchedulerFactory();
        Scheduler scheduler = null;
        try {
            scheduler = sf.getScheduler();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
        return scheduler;
    }
}
