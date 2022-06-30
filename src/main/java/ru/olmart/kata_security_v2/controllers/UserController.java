package ru.olmart.kata_security_v2.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.olmart.kata_security_v2.models.UserForm;
import ru.olmart.kata_security_v2.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public UserForm index() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new UserForm(userService.getUserByEmail(authentication.getName()));
    }
}