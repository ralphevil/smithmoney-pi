package com.smithmoney.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.smithmoney.dto.LancamentoDTO;
import com.smithmoney.exception.IllegalAcessException;
import com.smithmoney.model.Lancamento;
import com.smithmoney.model.Login;
import com.smithmoney.service.LancamentoService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/lancamentos")
@AllArgsConstructor
public class LancamentoController {

	private final LancamentoService lancamentoService;
	
	@GetMapping("/{id}")
	public ResponseEntity<Lancamento> findById(@PathVariable Long id, @AuthenticationPrincipal Login login){
		Lancamento lancamento = this.lancamentoService.findById(id);
		if(login.getId()!= lancamento.getUsuario().getId()) {
			throw new IllegalAcessException("Você não tem permissão para acessar os dados do lançamento");
		}
		
		return ResponseEntity.ok(lancamento);
	}	
	
	@GetMapping
	public ResponseEntity<List<Lancamento>> findAll(@AuthenticationPrincipal Login login){
		List<Lancamento> lancamentos = this.lancamentoService.findAll(login.getId());
		return ResponseEntity.ok(lancamentos);
	}
	
	@PostMapping
	public ResponseEntity<Void> create(@Valid @RequestBody LancamentoDTO lancamentoDTO, @AuthenticationPrincipal Login login){
		Lancamento lancamentoSalvo = this.lancamentoService.create(lancamentoDTO, login.getId());		
		URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(lancamentoSalvo.getId())
                .toUri();		
		
		return ResponseEntity.created(uri).build();
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Lancamento> update(@PathVariable Long id, @Valid @RequestBody LancamentoDTO lancamentoDTO, @AuthenticationPrincipal Login login){
		Lancamento lancamento = this.lancamentoService.findById(id);
		if(login.getId()!= lancamento.getUsuario().getId()) {
			throw new IllegalAcessException("Você não tem permissão para atualizar os dados do lançamento");
		}
		lancamentoDTO.setId(id);
		this.lancamentoService.update(lancamentoDTO);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id, @AuthenticationPrincipal Login login){
		Lancamento lancamento = this.lancamentoService.findById(id);
		if(login.getId()!= lancamento.getUsuario().getId()) {
			throw new IllegalAcessException("Você não tem permissão excluir o lançamento");
		}
		this.lancamentoService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}