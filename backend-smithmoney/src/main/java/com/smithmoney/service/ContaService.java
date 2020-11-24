package com.smithmoney.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.smithmoney.dto.ContaDTO;
import com.smithmoney.dto.UsuarioDTO;
import com.smithmoney.exception.ArgumentNotValidException;
import com.smithmoney.exception.IllegalAcessException;
import com.smithmoney.exception.ObjectNotFoundException;
import com.smithmoney.model.Conta;
import com.smithmoney.model.Lancamento;
import com.smithmoney.model.TipoConta;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.model.Usuario;
import com.smithmoney.repository.ContaRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContaService {

	private final ContaRepository contaRepository;
	
	@Transactional
	public Conta create(ContaDTO contaDTO, Long usuarioId) {
		Conta conta = createDTO(contaDTO, usuarioId);
		return this.contaRepository.save(conta);
	}
	
	@Transactional
	public void delete(Long id) {
		this.findById(id);
		this.contaRepository.deleteById(id);
	}
	
	@Transactional
	public Conta update(ContaDTO contaDTO) {
		Conta contaSalva = this.findById(contaDTO.getId());		
		if(contaDTO.getNome() != null) contaSalva.setNome(contaDTO.getNome());
		if(contaDTO.getTipo_Conta()!= null) contaSalva.setTipoConta(contaDTO.getTipo_Conta());
		
		if(contaDTO.getTipo_Conta() == TipoConta.Carteira) {
			contaSalva.setBanco(null);
		}else {
			contaSalva.setBanco(contaDTO.getBanco());
		}		
		
		return this.contaRepository.save(contaSalva);
	}
	
	@Transactional
	public void updateSaldo(Lancamento lancamentoSalvo, Lancamento lancamentoNovo) {		
		Conta conta = lancamentoNovo.getConta();		
		Conta contaAntiga = this.findById(lancamentoSalvo.getConta().getId());
		
		if(lancamentoNovo.getUsuario().getId() != conta.getUsuario().getId()) {
			throw new IllegalAcessException("Você não tem permissão para acessar a conta bancária");
		}		
		
		if(conta.getId() == contaAntiga.getId()) {
			
			//CONTA IGUAL			
			if(lancamentoNovo.getPago() != lancamentoSalvo.getPago()) {
				
				if(lancamentoNovo.getPago()) {					
					if(lancamentoNovo.getTipo() == TipoLancamento.Receita) {
						conta.setSaldo(conta.getSaldo()+lancamentoNovo.getValor());
					}else {
						conta.setSaldo(conta.getSaldo()-lancamentoNovo.getValor());	
					}						
				}else{
					if(lancamentoNovo.getTipo() == TipoLancamento.Receita) {
						conta.setSaldo(conta.getSaldo()-lancamentoNovo.getValor());
					}else {
						conta.setSaldo(conta.getSaldo()+lancamentoNovo.getValor());	
					}	
				}				
			}else {				
				if(lancamentoNovo.getPago() && (lancamentoNovo.getValor() > lancamentoSalvo.getValor())) {
					switch(lancamentoNovo.getTipo()) {
						case Receita:
							conta.setSaldo(conta.getSaldo() + (lancamentoNovo.getValor() - lancamentoSalvo.getValor()));
							break;
						case Despesa:
							conta.setSaldo(conta.getSaldo() - (lancamentoNovo.getValor() - lancamentoSalvo.getValor()));
							break;
						default:
							break;
					}
				}else if(lancamentoNovo.getPago() && (lancamentoNovo.getValor() < lancamentoSalvo.getValor())) {
					switch(lancamentoNovo.getTipo()) {
						case Receita:
							conta.setSaldo(conta.getSaldo() - (lancamentoSalvo.getValor() - lancamentoNovo.getValor()));
							break;
						case Despesa:
							conta.setSaldo(conta.getSaldo() + (lancamentoSalvo.getValor() - lancamentoNovo.getValor()));
							break;
						default:
							break;
					}
				}
			}
			
			if(lancamentoNovo.getPago() && (lancamentoNovo.getTipo() != lancamentoSalvo.getTipo())) {
				switch(lancamentoNovo.getTipo()) {
					case Receita:
						conta.setSaldo(conta.getSaldo()+(2*(lancamentoNovo.getValor())));
						break;
					case Despesa:
						conta.setSaldo(conta.getSaldo()-(2*(lancamentoNovo.getValor())));
						break;
					default:
						break;
				}
			}
		}else {
			
			//TROCA DE CONTA
			if(lancamentoNovo.getPago()) {
				switch(lancamentoNovo.getTipo()){
					case Receita:
						contaAntiga.setSaldo(contaAntiga.getSaldo()-lancamentoNovo.getValor());
						conta.setSaldo(conta.getSaldo()+lancamentoNovo.getValor());
						this.contaRepository.save(contaAntiga);
						break;
					case Despesa:
						contaAntiga.setSaldo(contaAntiga.getSaldo()+lancamentoNovo.getValor());
						conta.setSaldo(conta.getSaldo()-lancamentoNovo.getValor());
						this.contaRepository.save(contaAntiga);
						break;
					default:
						break;
				}
			}			
		}
		
		this.contaRepository.save(conta);
	}
	
	public List<Conta> findAllByUser(Long usuarioId){
		return this.contaRepository.findAllByUser(usuarioId);
	}
	
	public Conta findById(Long id) {
        Optional
            .ofNullable(id)
            .orElseThrow(() -> new ArgumentNotValidException("Id não pode ser nulo"));
        return this.contaRepository.findById(id)
            .orElseThrow(() -> new ObjectNotFoundException("Conta de id " + id + " não encontrado"));
    }
	
	public Conta createDTO(ContaDTO contaDTO, Long usuarioId) {
		if(contaDTO.getTipo_Conta() == TipoConta.Carteira) {
			contaDTO.setBanco(null);
		}
		
		Conta conta = Conta.builder()
				.nome(contaDTO.getNome())
				.saldo(contaDTO.getSaldo())
				.banco(contaDTO.getBanco())
				.tipoConta(contaDTO.getTipo_Conta())
				.usuario(
						Usuario.builder()
							.id(usuarioId)
							.build())
				.build();
		
		return conta;
	}
	
}
