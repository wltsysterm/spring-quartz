package com.wlt.quartz;

import com.wlt.quartz.job.HelloJob;
import org.junit.Test;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import java.io.IOException;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

/**
 * Created by wlt on 2018/2/20.
 */
@Service
public class Timer {
//    @Resource(name = "scheduler")
//    private Scheduler scheduler;
    @PostConstruct
    public void initJob() throws SchedulerException, IOException {
        // Grab the Scheduler instance from the Factory
        Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

        // and start it off
        scheduler.start();
        String jobName = "wltTimer";
        String jobGroup = "job-group";
        String triggerGroup = "trigger-group";
        String triggerRule = "*/5 * * * * ?";
        JobDetail job = newJob(HelloJob.class)
                .withIdentity(jobName, jobGroup)
                .build();

        Trigger trigger = newTrigger()
                .withIdentity(jobName, triggerGroup)
                .withSchedule(cronSchedule(triggerRule))
                .build();
        try {
            scheduler.scheduleJob(job, trigger);
            System.out.println("初始化定时任务success");
        } catch (SchedulerException e) {
            System.out.println("初始化定时任务失败");
        }
        System.in.read(); // 按任意键退出
    }
}
