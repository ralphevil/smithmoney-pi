package com.smithmoney.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.smithmoney.exception.ArgumentNotValidException;
import com.smithmoney.exception.ObjectNotFoundException;
import com.smithmoney.model.Categoria;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.repository.CategoriaRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class CategoriaService {
	
	private final CategoriaRepository categoriaRepository;
	
	@Transactional
	public List<Categoria> findAll(){
		return this.categoriaRepository.findAll();
	}
	
	@Transactional
	public List<Categoria> findAllByType(TipoLancamento tipo){
		return this.categoriaRepository.findAllByType(tipo);
	}
	
	@Transactional
	public Categoria findById(Long id) {
		Optional
		.ofNullable(id)
		.orElseThrow( () -> new ArgumentNotValidException("Id não pode ser nulo"));

		return this.categoriaRepository.findById(id)
				.orElseThrow( () -> new ObjectNotFoundException("Categoria de id " + id + " não foi encontrado"));
	}

}