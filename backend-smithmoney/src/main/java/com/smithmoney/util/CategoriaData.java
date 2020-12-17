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
		
		//DESPESAS
		categoriaRepository.save(new Categoria(1L,TipoLancamento.Despesa,"Alimentação"));
		categoriaRepository.save(new Categoria(2L,TipoLancamento.Despesa,"Assinaturas & Serviços"));
		categoriaRepository.save(new Categoria(3L,TipoLancamento.Despesa,"Bares & Restaurantes"));
		categoriaRepository.save(new Categoria(4L,TipoLancamento.Despesa,"Casa"));
		categoriaRepository.save(new Categoria(5L,TipoLancamento.Despesa,"Compras"));
		categoriaRepository.save(new Categoria(6L,TipoLancamento.Despesa,"Cuidados Pessoais"));
		categoriaRepository.save(new Categoria(7L,TipoLancamento.Despesa,"Dívidas & Empréstimos"));
		categoriaRepository.save(new Categoria(8L,TipoLancamento.Despesa,"Educação"));
		categoriaRepository.save(new Categoria(9L,TipoLancamento.Despesa,"Família & Filhos"));
		categoriaRepository.save(new Categoria(10L,TipoLancamento.Despesa,"Impostos & Taxas"));
		categoriaRepository.save(new Categoria(11L,TipoLancamento.Despesa,"Investimentos"));
		categoriaRepository.save(new Categoria(12L,TipoLancamento.Despesa,"Lazer & Hobbies"));
		categoriaRepository.save(new Categoria(13L,TipoLancamento.Despesa,"Mercado"));
		categoriaRepository.save(new Categoria(14L,TipoLancamento.Despesa,"Outras Despesas"));
		categoriaRepository.save(new Categoria(15L,TipoLancamento.Despesa,"Pets"));
		categoriaRepository.save(new Categoria(16L,TipoLancamento.Despesa,"Presentes & Doações"));
		categoriaRepository.save(new Categoria(17L,TipoLancamento.Despesa,"Roupas"));
		categoriaRepository.save(new Categoria(18L,TipoLancamento.Despesa,"Saúde"));
		categoriaRepository.save(new Categoria(19L,TipoLancamento.Despesa,"Trabalho"));
		categoriaRepository.save(new Categoria(20L,TipoLancamento.Despesa,"Transporte"));
		categoriaRepository.save(new Categoria(21L,TipoLancamento.Despesa,"Viagem"));
		
		//RECEITAS
		categoriaRepository.save(new Categoria(22L,TipoLancamento.Receita,"13º Salário"));
		categoriaRepository.save(new Categoria(23L,TipoLancamento.Receita,"Aluguéis"));
		categoriaRepository.save(new Categoria(24L,TipoLancamento.Receita,"Empréstimos"));
		categoriaRepository.save(new Categoria(25L,TipoLancamento.Receita,"Férias"));
		categoriaRepository.save(new Categoria(26L,TipoLancamento.Receita,"Investimentos"));
		categoriaRepository.save(new Categoria(27L,TipoLancamento.Receita,"Outras receitas"));
		categoriaRepository.save(new Categoria(28L,TipoLancamento.Receita,"Salário"));
        
	}
	
	@PreDestroy
	public void removeData() {
		categoriaRepository.deleteAll();
	}
}
