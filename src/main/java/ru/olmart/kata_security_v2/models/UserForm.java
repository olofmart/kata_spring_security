package ru.olmart.kata_security_v2.models;

import org.springframework.beans.factory.annotation.Autowired;
import ru.olmart.kata_security_v2.services.RoleService;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class UserForm {
    @Autowired
    private RoleService service;
    private int id;
    private String name;
    private String surname;
    private byte age;
    private String email;
    private String password;
    private Set<String> roles;

    public UserForm() {
        roles = new HashSet<>();
    }

    public UserForm(int id, String name, String surname, byte age, String email, String password, Set<String> roles) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.email = email;
        this.password = password;
        this.roles = new HashSet<>();
        for(Role role : service.getAllRoles()) {
            if(roles.contains(role.getValue())) {
                this.roles.add(role.getValue());
            }
        }
    }

    public UserForm(User user){
        id = user.getId();
        name = user.getName();
        surname = user.getSurname();
        age = user.getAge();
        email = user.getEmail();
        password = "";
        roles = user.getRoles().stream()
                .map(r->r.getValue())
                .collect(Collectors.toSet());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public byte getAge() {
        return age;
    }

    public void setAge(byte age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles.stream()
                .map(r->r.getValue())
                .collect(Collectors.toSet());
    }

    public boolean hasAdminRole() {
        return roles.contains("ROLE_ADMIN");
    }
    public boolean hasUserRole() {
        return roles.contains("ROLE_USER");
    }
}