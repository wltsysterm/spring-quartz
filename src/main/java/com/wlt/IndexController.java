package com.wlt;

import com.wlt.core.common.MsgResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 魏霖涛
 * @since 2018/1/25 0025
 */
@RestController
@RequestMapping("/index")
public class IndexController {
    /**
     * 调试springmvc
     * @return
     */
    @RequestMapping("/test")
    public MsgResult test(){
        return  new MsgResult("springmvc test success(调试成功)");
    }
    /**
     * 调试全局异常捕捉
     * @return
     */
    @RequestMapping("/error")
    public MsgResult error() throws Exception {
        throw new Exception("测试全局异常捕捉成功");
    }
}
