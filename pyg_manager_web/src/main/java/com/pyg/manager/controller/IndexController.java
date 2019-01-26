package com.pyg.manager.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName IndexController
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/26 18:49
 * @Version 1.0
 **/
@RestController
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/showName")
    public String showName(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return username;
    }
}
