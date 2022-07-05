package ru.olmart.kata_security_v2.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.olmart.kata_security_v2.dao.UserDao;
import ru.olmart.kata_security_v2.models.Role;
import ru.olmart.kata_security_v2.models.User;

import java.util.HashSet;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final UserDao dao;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserDao dao, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.dao = dao;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return dao.getAllUsers();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(int id) {
        return dao.getUserById(id);
    }

    @Override
    @Transactional
    public void addUser(User user) {
        User userFromDB = dao.getUserByEmail(user.getEmail());

        if (userFromDB != null) {
            throw new RuntimeException("User already exists");
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        dao.addUser(user);
    }

    @Override
    @Transactional
    public void updateUser(int id, User user, RoleService roleService) {
        user = updateUserRoles(user, roleService);
        dao.update(id, user);
    }

    @Override
    @Transactional
    public void deleteUser(int id) {
        dao.deleteUser(id);
    }

    @Override
    public User getUserByEmail(String email) {
        return dao.getUserByEmail(email);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUserByEmail(username);
        if(user==null){
            throw new UsernameNotFoundException("User " + username + " not found");
        }
        return user;
    }


    private User updateUserRoles(User userView, RoleService roleService){

        User userDB = getUserById(userView.getId());
        userDB.setName(userView.getName());
        userDB.setSurname(userView.getSurname());
        userDB.setAge(userView.getAge());
        userDB.setEmail(userView.getEmail());
        if(!userView.getPassword().equals("")) {
            userDB.setPassword(userView.getPassword());
            userDB.setPassword(new BCryptPasswordEncoder().encode(userView.getPassword()));
        }
        userDB.setRoles(new HashSet<>());
        for(Role role : roleService.getAllRoles()){
            if(userView.getRoles().contains(role)){
                userDB.setOneRole(role);
            }
        }

        return userDB;
    }
}