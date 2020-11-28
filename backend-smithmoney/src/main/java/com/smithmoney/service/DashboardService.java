package com.smithmoney.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smithmoney.dto.DashboardDTO;
import com.smithmoney.model.Conta;
import com.smithmoney.model.Lancamento;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.repository.ContaRepository;
import com.smithmoney.repository.LancamentoRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DashboardService {
	
	private final ContaRepository contaRepository;
	private final LancamentoRepository lancamentoRepository;

	public DashboardDTO getDashboard(Long usuarioId, int mes) {
		List<Conta> contas = this.contaRepository.findAllByUser(usuarioId);
		List<Lancamento> despesas = this.lancamentoRepository.totalByType(usuarioId, mes, TipoLancamento.Despesa);
		List<Lancamento> receitas = this.lancamentoRepository.totalByType(usuarioId, mes, TipoLancamento.Receita);
		
		Double contaTotal = contas.stream().mapToDouble(x->x.getSaldo()).sum();
		Double despesaTotal = despesas.stream().mapToDouble(x->x.getValor()).sum();
		Double receitaTotal = receitas.stream().mapToDouble(x->x.getValor()).sum();
		Double total = receitaTotal - despesaTotal;
		
		return DashboardDTO.builder().contaTotal(contaTotal).despesaTotal(despesaTotal).receitaTotal(receitaTotal).total(total).build();
	}
}
