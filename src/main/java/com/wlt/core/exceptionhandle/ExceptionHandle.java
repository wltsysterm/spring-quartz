package com.wlt.core.exceptionhandle;

import com.wlt.core.common.MsgResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * created by 魏霖涛 on 2017/11/14 0014
 */
@RestControllerAdvice
//@ControllerAdvice
public class ExceptionHandle{
    private Logger logger = LoggerFactory.getLogger(Exception.class);
    /**
     * 全局异常捕捉处理
     * @param ex
     * @return
     */
    @ExceptionHandler(value = Exception.class)
//    @ResponseBody
    public MsgResult globalExceptionHandle(Exception ex){
        Map map = new HashMap();
        map.put("code","出错啦！");
        map.put("msg",ex.getMessage());
        logger.error(ex.getMessage());
        return new MsgResult("globalError", map);
    }
}
