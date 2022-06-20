package ru.olmart.kata_security_v2.services;

import ru.olmart.kata_security_v2.models.Role;
import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
}