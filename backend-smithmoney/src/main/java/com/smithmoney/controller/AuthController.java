package com.smithmoney.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smithmoney.dto.JwtRequest;
import com.smithmoney.dto.JwtResponse;
import com.smithmoney.service.AuthService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

	private final AuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticate(@RequestBody @Valid JwtRequest request){
		final JwtResponse response = authService.authenticate(request);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/valid")
	public ResponseEntity<Void> validated(){
		return ResponseEntity.noContent().build();
	}
}
