package com.smithmoney.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<List<Usuario>> findAll(){
		List<Usuario> usuarioTodos = this.usuarioService.findAll();
		return ResponseEntity.ok(usuarioTodos);
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Usuario> findById(@PathVariable Long id){
		Usuario usuario = this.usuarioService.findById(id);
		return ResponseEntity.ok(usuario);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<Usuario> findById(@PathVariable String email){
		Usuario usuario = this.usuarioService.findByEmail(email);
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
	
	@PatchMapping("/{id}")
	public ResponseEntity<Usuario> update(@PathVariable Long id, @Valid @RequestBody UsuarioDTO usuarioDTO){
		usuarioDTO.setId(id);
		this.usuarioService.update(usuarioDTO);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id){
		this.usuarioService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	
}
