package ru.olmart.kata_security_v2.dao;

import org.springframework.stereotype.Repository;
import ru.olmart.kata_security_v2.models.User;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<User> getAllUsers() {
        Query query = entityManager.createQuery("SELECT u FROM User u");
        List<User> list = query.getResultList();
        return list;
    }

    @Override
    public User getUserById(int id) {
        User user = entityManager.find(User.class, id);
        return user;
    }

    @Override
    public User getUserByEmail(String email) {
        Query query = entityManager.createQuery("SELECT u FROM User u WHERE u.email = :login");
        query.setParameter("login", email);
        try {
            return (User) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void update(int id, User user) {
        entityManager.merge(user);
    }

    @Override
    public void deleteUser(int id) {
        entityManager.createQuery("DELETE FROM User u WHERE u.id = :id").setParameter("id", id).executeUpdate();
    }
}