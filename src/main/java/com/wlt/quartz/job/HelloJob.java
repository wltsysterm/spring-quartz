package com.wlt.quartz.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;

import java.util.Date;

/**
 * Created by wlt on 2018/2/20.
 */
//下面注解代表job是有状态的，即多次运行的job，可以共享变量，默认是每次都会启动一个全新的job,即无状态job
@PersistJobDataAfterExecution
public class HelloJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        System.out.println(new Date().getSeconds());
    }
}
