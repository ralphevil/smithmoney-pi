package com.smithmoney.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.smithmoney.dto.ContaDTO;
import com.smithmoney.exception.IllegalAcessException;
import com.smithmoney.model.Conta;
import com.smithmoney.model.Login;
import com.smithmoney.service.ContaService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/contas")
@AllArgsConstructor
public class ContaController {

	private final ContaService contaService;
	
	@PostMapping
	public ResponseEntity<Void> create(@Valid @RequestBody ContaDTO contaDTO, @AuthenticationPrincipal Login login){
		Conta contaCriada = this.contaService.create(contaDTO, login.getId());
		URI uri = ServletUriComponentsBuilder
	            .fromCurrentRequest()
	            .path("/{id}")
	            .buildAndExpand(contaCriada.getId())
	            .toUri();
	    return ResponseEntity.created(uri).build();
	}
	
	@GetMapping
	public ResponseEntity<List<Conta>> findAll(@AuthenticationPrincipal Login login){
		List<Conta> contas = this.contaService.findAll(login.getId());
		return ResponseEntity.ok(contas);
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Conta> findById(@PathVariable Long id, @AuthenticationPrincipal Login login) {
		Conta conta = this.contaService.findById(id);
		if(login.getId()!= conta.getUsuario().getId()) {
			throw new IllegalAcessException("Você não tem permissão para acessar os dados");
		}else {
			return ResponseEntity.ok(conta);
		}
        
    }
	
	@DeleteMapping
    public ResponseEntity<Void> deleteById(@AuthenticationPrincipal Login login) {
        this.contaService.delete(login.getId());
        return ResponseEntity.noContent().build();
    }
}
