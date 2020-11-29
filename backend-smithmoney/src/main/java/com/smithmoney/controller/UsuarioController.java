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

import com.smithmoney.dto.UsuarioDTO;
import com.smithmoney.model.Login;
import com.smithmoney.model.Usuario;
import com.smithmoney.service.UsuarioService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/usuarios")
@AllArgsConstructor
public class UsuarioController {

	private final UsuarioService usuarioService;
	
	@GetMapping
	public ResponseEntity<Usuario> getUser(@AuthenticationPrincipal Login login){
		Usuario usuario = this.usuarioService.findById(login.getId());
		return ResponseEntity.ok(usuario);
	}
		
	@PostMapping
	public ResponseEntity<Void> create(@Valid @RequestBody UsuarioDTO usuarioDTO){
		Usuario usuarioSalvo = this.usuarioService.create(usuarioDTO);
		
		URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(usuarioSalvo.getId())
                .toUri();		
		
		return ResponseEntity.created(uri).build();
	}
	
	@PatchMapping
	public ResponseEntity<Usuario> update(@AuthenticationPrincipal Login login, @Valid @RequestBody UsuarioDTO usuarioDTO){
		usuarioDTO.setId(login.getId());
		this.usuarioService.update(usuarioDTO);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(@AuthenticationPrincipal Login login){
		this.usuarioService.delete(login.getId());
		return ResponseEntity.noContent().build();
	}
	
	
}
