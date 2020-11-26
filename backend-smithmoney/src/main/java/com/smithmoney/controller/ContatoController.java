package com.smithmoney.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smithmoney.dto.ContatoDTO;
import com.smithmoney.service.ContatoService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/contato")
@AllArgsConstructor
public class ContatoController {

	private final ContatoService contatoService;
	
    @PostMapping
    public ResponseEntity<Void> contato(@RequestBody ContatoDTO contatoDTO) {
    	
    	
    	this.contatoService.sendContact(contatoDTO);
    	return ResponseEntity.noContent().build();
    }

}
