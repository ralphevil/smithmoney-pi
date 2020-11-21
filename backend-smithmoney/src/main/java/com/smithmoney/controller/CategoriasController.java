package com.smithmoney.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/categoria")

public class CategoriasController {
	
	@GetMapping
	public void busca() {
		System.out.println("Chegou aqui!");
	}

}
