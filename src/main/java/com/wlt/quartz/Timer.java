package com.wlt.quartz;

import com.wlt.quartz.job.HelloJob;
import com.wlt.quartz.util.QuartzScheduleJob;
import com.wlt.quartz.util.QuartzScheduleUtil;
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
    @Resource(name = "scheduler")
    private Scheduler scheduler;
    @PostConstruct
    public void initJob() throws SchedulerException, IOException, InterruptedException {
        // Grab the Scheduler instance from the Factory
        QuartzScheduleUtil quartzScheduleUtil = new QuartzScheduleUtil(scheduler);
        quartzScheduleUtil.start();

        String jobName = "wltTimer";
        String jobGroup = "job-group";
        String triggerGroup = "trigger-group";
        String triggerRule = "*/5 * * * * ?";
        QuartzScheduleJob quartzScheduleJob = new QuartzScheduleJob();
        quartzScheduleJob.setJobGroup(jobGroup);
        quartzScheduleJob.setJobName(jobName);
        quartzScheduleJob.setTriggerGroup(triggerGroup);
        JobDetail job = newJob(HelloJob.class)
                .withIdentity(jobName, jobGroup)
                .build();

        Trigger trigger = newTrigger()
                .withIdentity(jobName, triggerGroup)
                .withSchedule(cronSchedule(triggerRule))
                .build();
        try {
            quartzScheduleUtil.getScheduler().scheduleJob(job, trigger);
            System.out.println("初始化定时任务success");
            System.out.println(quartzScheduleUtil.isStarted());

            quartzScheduleUtil.pauseTrigger(quartzScheduleJob);
            Thread.sleep(6000);
            quartzScheduleUtil.resumeTrigger(quartzScheduleJob);
        } catch (SchedulerException e) {
            System.out.println("初始化定时任务失败");
        }
        System.in.read(); // 按任意键退出
    }
}
