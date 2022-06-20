package ru.olmart.kata_security_v2.dao;

import ru.olmart.kata_security_v2.models.User;
import java.util.List;

public interface UserDao {
    List<User> getAllUsers();
    User getUserById(int id);
    User getUserByEmail(String email);
    void addUser(User user);
    void update(int id, User user);
    void deleteUser(int id);
}