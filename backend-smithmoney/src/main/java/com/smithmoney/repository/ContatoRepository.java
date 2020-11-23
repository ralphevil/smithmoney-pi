package com.smithmoney.repository;

import java.lang.StackWalker.Option;

import com.google.common.base.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

    Optional<Contato> findByEmail(String email);
    
}
