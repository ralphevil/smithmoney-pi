package com.smithmoney.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smithmoney.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Optional<Usuario> findByEmail(String email);
}
