package ru.olmart.kata_security_v2.dao;

import ru.olmart.kata_security_v2.models.Role;
import java.util.List;

public interface RoleDao {
    List<Role> getAllRoles();
    Role getRoleById(int id);
    void addRole(Role role);
    void update(int id, Role role);
    void deleteRole(int id);
}