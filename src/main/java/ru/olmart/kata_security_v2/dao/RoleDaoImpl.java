package ru.olmart.kata_security_v2.dao;

import org.springframework.stereotype.Repository;
import ru.olmart.kata_security_v2.models.Role;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Role> getAllRoles() {
        Query query = entityManager.createQuery("SELECT r FROM Role r");
        List<Role> list = query.getResultList();
        return list;
    }

    @Override
    public Role getRoleById(int id) {
        Role role = entityManager.find(Role.class, id);
        return role;
    }

    @Override
    public void addRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public void update(int id, Role role) {
        entityManager.merge(role);
    }

    @Override
    public void deleteRole(int id) {
        entityManager.createQuery("DELETE FROM Role r WHERE r.id = :id").setParameter("id", id).executeUpdate();
    }
}