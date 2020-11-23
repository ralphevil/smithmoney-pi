package com.smithmoney.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smithmoney.model.Conta;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {

	@Query(value = "select c from Conta c where usuario_id = :usuarioId")
	List<Conta> findAllByUser(Long usuarioId);

}
