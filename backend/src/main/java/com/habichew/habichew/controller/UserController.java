package com.habichew.habichew.controller;

import com.habichew.habichew.model.User;
import com.habichew.habichew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public List<User> listUsers() {
        List<User> users;
        users = userService.listUsers();
        return users;
    }
}
