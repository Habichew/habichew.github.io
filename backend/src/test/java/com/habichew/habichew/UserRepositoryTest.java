package com.habichew.habichew;

import com.habichew.habichew.model.User;
import com.habichew.habichew.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        User user1= new User("Alice", "23");
        User user2= new User("Bob", "38");
        //save user, verify has ID value after save
        assertNull(user1.getId());
        assertNull(user2.getId());//null before save
        this.userRepository.save(user1);
        this.userRepository.save(user2);
        assertNotNull(user1.getId());
        assertNotNull(user2.getId());
    }

    @Test
    public void testFetchData(){
        /*Test data retrieval*/
        User userA = userRepository.findByName("Bob");
        assertNotNull(userA);
        assertEquals("38", userA.getPassword());
        /*Get all products, list should only have two*/
        List<User> users = userRepository.findAll();
        int count = users.size();
        assertEquals(2, count);
    }
}
