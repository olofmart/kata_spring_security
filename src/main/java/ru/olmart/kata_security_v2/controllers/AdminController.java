package ru.olmart.kata_security_v2.controllers;

import org.springframework.web.bind.annotation.*;
import ru.olmart.kata_security_v2.models.Role;
import ru.olmart.kata_security_v2.models.User;
import ru.olmart.kata_security_v2.models.UserForm;
import ru.olmart.kata_security_v2.services.RoleService;
import ru.olmart.kata_security_v2.services.UserService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private UserService userService;
    private RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles(){
        return roleService.getAllRoles();
    }

    @GetMapping("/users")
    public List<UserForm> getAllUsers() {
        return userService.getAllUsers().stream().map(UserForm::new).collect(Collectors.toList());
    }

    @GetMapping("/users/{id}")
    public UserForm getUserById(@PathVariable("id") int id){
        return new UserForm(userService.getUserById(id));
    }

    @PostMapping("/users")
    public User addUser(@ModelAttribute("user") User user){
        userService.addUser(new User(user, roleService));
        return new User(userService.getUserByEmail(user.getEmail()));
    }

    @PatchMapping("/users")
    public UserForm updateUser(@ModelAttribute("user") UserForm user) {
        User editingUser = userService.getUserById(user.getId());
        editingUser.update(user, roleService);
        userService.updateUser(user.getId(), editingUser);
        return new UserForm(userService.getUserById(user.getId()));
    }

    @DeleteMapping("users/{id}")
    public UserForm deleteUser(@PathVariable("id") int id) {
        UserForm user = new UserForm(userService.getUserById(id));
        userService.deleteUser(id);
        return user;
    }
}