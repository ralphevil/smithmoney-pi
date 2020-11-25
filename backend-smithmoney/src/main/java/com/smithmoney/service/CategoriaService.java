package com.smithmoney.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.smithmoney.exception.ArgumentNotValidException;
import com.smithmoney.exception.ObjectNotFoundException;
import com.smithmoney.model.Categoria;
import com.smithmoney.repository.CategoriaRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class CategoriaService {
	
	private final CategoriaRepository categoriaRepository;
	
	@Transactional
	public Categoria create(Categoria categoria) {
		categoria.setId(null);
		return this.categoriaRepository.save(categoria);
	}
	
	@Transactional
	public void deleteById(Long id) {
		this.findById(id);

		this.categoriaRepository.deleteById(id);
	}
	
	@Transactional
	public List<Categoria> findAll(){
		return this.categoriaRepository.findAll();
	}
	
	@Transactional
	public Categoria findById(Long id) {
		Optional
		.ofNullable(id)
		.orElseThrow( () -> new ArgumentNotValidException("Id não pode ser nulo"));

		return this.categoriaRepository.findById(id)
				.orElseThrow( () -> new ObjectNotFoundException("Categoria de id " + id + " não foi encontrado"));
	}
	
	@Transactional
	public Categoria update(Categoria novo) {

		Categoria antigo = this.findById(novo.getId());

			antigo.setCategoria(novo.getCategoria());

			return this.categoriaRepository.save(antigo);

		}

}