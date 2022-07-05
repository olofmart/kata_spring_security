package ru.olmart.kata_security_v2.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.olmart.kata_security_v2.models.User;
import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getAllUsers();
    User getUserById(int id);
    void addUser(User user);
    void updateUser(int id, User user, RoleService roleService);
    void deleteUser(int id);
    User getUserByEmail(String email);
}