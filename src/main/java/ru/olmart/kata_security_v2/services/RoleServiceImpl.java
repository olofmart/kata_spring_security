package ru.olmart.kata_security_v2.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.olmart.kata_security_v2.dao.RoleDao;
import ru.olmart.kata_security_v2.models.Role;
import java.util.List;
@Service
public class RoleServiceImpl implements RoleService{
    private RoleDao dao;
    public RoleServiceImpl(RoleDao dao) {
        this.dao = dao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return dao.getAllRoles();
    }
}