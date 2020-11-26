package com.smithmoney.service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.smithmoney.dto.LancamentoDTO;
import com.smithmoney.exception.ArgumentNotValidException;
import com.smithmoney.exception.IllegalAcessException;
import com.smithmoney.exception.ObjectNotFoundException;
import com.smithmoney.model.Conta;
import com.smithmoney.model.Lancamento;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.model.Usuario;
import com.smithmoney.repository.ContaRepository;
import com.smithmoney.repository.LancamentoRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LancamentoService {

	private final LancamentoRepository lancamentoRepository;
	private final ContaRepository contaRepository;
	private final ContaService contaService;
	
	@Transactional
	public Lancamento create(LancamentoDTO lancamentoDTO, Long usuarioId) {
		Conta conta = this.contaService.findById(lancamentoDTO.getContaId());
		if(conta.getUsuario().getId() != usuarioId) {
			throw new IllegalAcessException("Você não tem permissão para acessar a conta bancária");
		}
		Lancamento lancamento = createDTO(lancamentoDTO, usuarioId);		
		return this.lancamentoRepository.save(lancamento);
	}
	
	@Transactional
	public Lancamento update(LancamentoDTO lancamentoDTO) {	
		
		Lancamento lancamentoNovo = this.findById(lancamentoDTO.getId());
		Lancamento lancamentoSalvo = Lancamento.builder()
											.valor(lancamentoNovo.getValor())
											.tipo(lancamentoNovo.getTipo())
											.pago(lancamentoNovo.getPago())
											.conta(lancamentoNovo.getConta())
											.build();

		//ITENS A ATUALIZAR
		if(lancamentoDTO.getContaId() == null) lancamentoDTO.setContaId(lancamentoNovo.getConta().getId());
		Conta conta = this.contaService.findById(lancamentoDTO.getContaId());

		if(lancamentoDTO.getDescricao() != null) lancamentoNovo.setDescricao(lancamentoDTO.getDescricao());
		if(lancamentoDTO.getCategoria() != null) lancamentoNovo.setCategoria(lancamentoDTO.getCategoria());
		if(lancamentoDTO.getDataVencimento() != null) lancamentoNovo.setDataVencimento(lancamentoDTO.getDataVencimento());
		if(lancamentoDTO.getValor() != 0) lancamentoNovo.setValor(lancamentoDTO.getValor());
		if(lancamentoDTO.getTipo() != null) lancamentoNovo.setTipo(lancamentoDTO.getTipo());
		if(lancamentoDTO.getPago() != null) lancamentoNovo.setPago(lancamentoDTO.getPago());
		lancamentoNovo.setConta(conta);

		//ATUALIZAR SALDO
		this.contaService.updateSaldo(lancamentoSalvo, lancamentoNovo);

		//RETORNO
		return this.lancamentoRepository.save(lancamentoNovo);
	}
	
	
	
	@Transactional
	public void delete(Long id) {
		Lancamento lancamento = this.findById(id);	
		if(lancamento.getPago()) {
			switch(lancamento.getTipo()) {
				case Receita:
					lancamento.getConta().setSaldo(lancamento.getConta().getSaldo()-lancamento.getValor());
					break;
				case Despesa:
					lancamento.getConta().setSaldo(lancamento.getConta().getSaldo()+lancamento.getValor());
					break;
			}
		}		
		
		this.contaRepository.save(lancamento.getConta());		
		this.lancamentoRepository.deleteById(id);
	}
	
	@Transactional
	public List<Lancamento> findAllByUser(Long usuarioId){
		return this.lancamentoRepository.findAllByUser(usuarioId);
	}
	
	@Transactional
	public List<Lancamento> findAllByMonth(Long usuarioId, int mes){
		return this.lancamentoRepository.findAllByMonth(usuarioId, mes);
	}
	
	@Transactional
	public List<Lancamento> findAllByPaid(Long usuarioId, boolean pago){
		return this.lancamentoRepository.findAllByPaid(usuarioId, pago);
	}
	
	@Transactional
	public List<Lancamento> findAllByType(Long usuarioId, TipoLancamento tipo){
		return this.lancamentoRepository.findAllByType(usuarioId, tipo);
	}
	
	@Transactional
	public Double totalByType(Long usuarioId, TipoLancamento tipo){
		List<Lancamento> lancamentos = this.lancamentoRepository.findAllByType(usuarioId, tipo);
		Double totalValue = lancamentos.stream().mapToDouble(x->x.getValor()).sum();
		return totalValue;
	}
	
	@Transactional
	public List<Lancamento> findAllByCategory(Long usuarioId, String categoria){
		return this.lancamentoRepository.findAllByCategory(usuarioId, categoria);
	}
	
	@Transactional
	public Lancamento findById(Long id) {
		Optional
		     .ofNullable(id)
		     .orElseThrow( () ->  new ArgumentNotValidException("Id não pode ser nulo"));
		     
		return this.lancamentoRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("Lancamento de id " + id + " não foi encontrado"));
	}
	
	public Lancamento createDTO(LancamentoDTO lancamentoDTO, Long usuarioId) {
		LocalDate dataAtual = LocalDate.now();
		lancamentoDTO.setPago(false);
		if(lancamentoDTO.getDataVencimento().isBefore(dataAtual)) {
			throw new DateTimeException("Data de vencimento inválida");
		}else {			
			Lancamento lancamento = Lancamento.builder()
					.descricao(lancamentoDTO.getDescricao())
					.categoria(lancamentoDTO.getCategoria())
					.dataAtual(dataAtual)
					.dataVencimento(lancamentoDTO.getDataVencimento())
					.valor(lancamentoDTO.getValor())
					.tipo((lancamentoDTO.getTipo()))
					.pago(lancamentoDTO.getPago())
					.conta(Conta.builder()
							.id(lancamentoDTO.getContaId())
							.build())
					.usuario(Usuario.builder()
							.id(usuarioId)
							.build())
					.build();
			return lancamento;
		}		
		
		
	}
	
}
