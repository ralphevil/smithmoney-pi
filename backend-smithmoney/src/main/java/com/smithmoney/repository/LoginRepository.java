package com.smithmoney.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smithmoney.model.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {

	Optional<Login> findByUsername(String username);
}
