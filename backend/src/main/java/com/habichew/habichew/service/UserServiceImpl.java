package com.habichew.habichew.service;

import com.habichew.habichew.model.User;
import com.habichew.habichew.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * @return
     */
    @Override
    public List<User> listUsers() {
        return userRepository.findAll();
    }
}
