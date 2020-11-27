package com.smithmoney.util;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.smithmoney.model.Categoria;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.repository.CategoriaRepository;

@Component
public class CategoriaData {
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@PostConstruct
	public void loadData() {
		categoriaRepository.save(new Categoria(1L,TipoLancamento.Despesa,"Alimentação"));
        categoriaRepository.save(new Categoria(2L,TipoLancamento.Receita,"Salário"));
	}
	
	@PreDestroy
	public void removeData() {
		categoriaRepository.deleteAll();
	}
}
