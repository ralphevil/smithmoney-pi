package com.smithmoney.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smithmoney.model.Categoria;
import com.smithmoney.model.TipoLancamento;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
	
	@Query(value = "select c from Categoria c where tipo = :tipo")
	List<Categoria> findAllByType(TipoLancamento tipo);
}
