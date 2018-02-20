package com.wlt.quartz.util;

/**
 * Created by wlt on 2018/2/20.
 */
public class QuartzScheduleJob {
    private String jobName;
    private String jobGroup;
    private String triggerGroup;

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getJobGroup() {
        return jobGroup;
    }

    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }

    public String getTriggerGroup() {
        return triggerGroup;
    }

    public void setTriggerGroup(String triggerGroup) {
        this.triggerGroup = triggerGroup;
    }
}
