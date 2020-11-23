package com.smithmoney.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.smithmoney.exception.DataIntegrityException;
import com.smithmoney.exception.ObjectNotFoundException;
import com.smithmoney.model.Categoria;
import com.smithmoney.repository.CategoriaRepository;


@Service
public class CategoriaService {
	
	private final CategoriaRepository categoriaRepository;

	public CategoriaService(CategoriaRepository categoriaRepository) {
		this.categoriaRepository = categoriaRepository;
	}
	
	public Categoria create(Categoria categoria) {
		categoria.setId(null);
		return this.categoriaRepository.save(categoria);
	}
	
	public void deleteById(Long id) {
		this.findById(id);

		this.categoriaRepository.deleteById(id);
	}
	
	public List<Categoria> findAll(){
		return this.categoriaRepository.findAll();
	}
	
	public Categoria findById(Long id) {
		Optional
		.ofNullable(id)
		.orElseThrow( () -> new DataIntegrityException("O id não pode ser nulo"));

		return this.categoriaRepository.findById(id)
				.orElseThrow( () -> new ObjectNotFoundException("Não foi possivel encontrar uma categoria com id " + id));
	}
	
	public Categoria update(Categoria novo) {

		Categoria antigo = this.findById(novo.getId());

			antigo.setCategoria(novo.getCategoria());

			return this.categoriaRepository.save(antigo);

		}

}