package com.smithmoney.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.smithmoney.model.Categoria;
import com.smithmoney.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
		
		private final CategoriaService categoriaService;

		public CategoriaController(CategoriaService categoriaService) {
			this.categoriaService = categoriaService;
		}
		
		@PostMapping
		@Transactional
		public ResponseEntity<Void> create(@Valid @RequestBody Categoria categoria) {
			
			categoria = this.categoriaService.create(categoria);
			
			URI uri = ServletUriComponentsBuilder
					 .fromCurrentRequest()
					 .path("/{id}")
					 .buildAndExpand(categoria.getId())
					 .toUri();
			
			return ResponseEntity.created(uri).build();
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Void> update(@PathVariable Long id, @Valid @RequestBody Categoria categoria) {
			categoria.setId(id);
			
			this.categoriaService.update(categoria);
			
			return ResponseEntity.noContent().build();
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Categoria> findById(@PathVariable Long id) {
			
			Categoria categoria = this.categoriaService.findById(id);
			
			return ResponseEntity.ok(categoria);
		}
		
		@GetMapping
		public ResponseEntity<List<Categoria>> findAll() {
			
			List<Categoria> categoria = this.categoriaService.findAll();
			
			return ResponseEntity.ok(categoria);
		}
		
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id) {
			this.categoriaService.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		
	}