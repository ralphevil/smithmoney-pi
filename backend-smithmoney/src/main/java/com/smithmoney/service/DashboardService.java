package com.smithmoney.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.smithmoney.dto.BalancoCategoriaDTO;
import com.smithmoney.dto.BalancoPendenteDTO;
import com.smithmoney.dto.DashboardDTO;
import com.smithmoney.model.Categoria;
import com.smithmoney.model.Conta;
import com.smithmoney.model.Lancamento;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.repository.CategoriaRepository;
import com.smithmoney.repository.ContaRepository;
import com.smithmoney.repository.LancamentoRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DashboardService {
	
	private final ContaRepository contaRepository;
	private final LancamentoRepository lancamentoRepository;
	private final CategoriaRepository categoriaRepository;

	public DashboardDTO getTotalDashboard(Long usuarioId, int mes) {
		List<Conta> contas = this.contaRepository.findAllByUser(usuarioId);
		List<Lancamento> despesas = this.lancamentoRepository.totalByType(usuarioId, mes, TipoLancamento.Despesa);
		List<Lancamento> receitas = this.lancamentoRepository.totalByType(usuarioId, mes, TipoLancamento.Receita);
		
		Double contaTotal = contas.stream().mapToDouble(x->x.getSaldo()).sum();
		Double despesaTotal = despesas.stream().mapToDouble(x->x.getValor()).sum();
		Double receitaTotal = receitas.stream().mapToDouble(x->x.getValor()).sum();
		Double total = receitaTotal - despesaTotal;
		
		return DashboardDTO.builder().contaTotal(contaTotal).despesaTotal(despesaTotal).receitaTotal(receitaTotal).total(total).build();
	}
	
	public List<BalancoCategoriaDTO> getAllCategoryDashboard(Long usuarioId, int mes){
		List<BalancoCategoriaDTO> balancoCategoria = new ArrayList<>();
		List<Categoria> categorias = this.categoriaRepository.findAll();
		List<Lancamento> lancamentos = this.lancamentoRepository.findAllByMonth(usuarioId, mes);
		
		
		categorias.stream().forEach(categoria->{
			String nomeCategoria = categoria.getCategoria();
			Double totalCategoria = lancamentos.stream().filter(l->l.getCategoria().equals(categoria)).mapToDouble(x->x.getValor()).sum();
			balancoCategoria.add(BalancoCategoriaDTO.builder().categoria(nomeCategoria).total(totalCategoria).build());
		});
		
		return balancoCategoria;
	}
	
	public List<BalancoCategoriaDTO> getCategoryDashboard(Long usuarioId, int mes, TipoLancamento tipo){
		List<BalancoCategoriaDTO> balancoCategoria = new ArrayList<>();
		List<Categoria> categorias = this.categoriaRepository.findAll();
		List<Lancamento> lancamentos = this.lancamentoRepository.totalByType(usuarioId, mes, tipo);
		
		
		categorias.stream().forEach(categoria->{
			String nomeCategoria = categoria.getCategoria();
			Double totalCategoria = lancamentos.stream().filter(l->l.getCategoria().equals(categoria)).mapToDouble(x->x.getValor()).sum();
			if(totalCategoria > 0)
			balancoCategoria.add(BalancoCategoriaDTO.builder().categoria(nomeCategoria).total(totalCategoria).build());
		});
		
		return balancoCategoria;
	}
	
	@Transactional
	public List<Lancamento> pendingByType(Long usuarioId, TipoLancamento tipo){
		List<Lancamento> lancamentos = this.lancamentoRepository.findAllByType(usuarioId, tipo);
		List<Lancamento> pending = lancamentos.stream().filter(l->l.getPago().equals(false)).collect(Collectors.toList());
		return pending;
	}
	
	@Transactional
	public BalancoPendenteDTO totalPendingByType(Long usuarioId){
		List<Lancamento> pending = this.lancamentoRepository.findAllByPaid(usuarioId, false);
		Double receita = pending.stream().filter(l->l.getTipo() == TipoLancamento.Receita).mapToDouble(x->x.getValor()).sum();
		Double despesa = pending.stream().filter(l->l.getTipo() == TipoLancamento.Despesa).mapToDouble(x->x.getValor()).sum();
		return BalancoPendenteDTO.builder().despesa(despesa).receita(receita).build();
	}
}
