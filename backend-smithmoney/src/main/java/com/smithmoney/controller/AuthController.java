package com.smithmoney.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smithmoney.dto.ForgottenPasswordDTO;
import com.smithmoney.dto.JwtRequest;
import com.smithmoney.dto.JwtResponse;
import com.smithmoney.dto.UpdatePasswordDTO;
import com.smithmoney.model.Login;
import com.smithmoney.service.AuthService;
import com.smithmoney.service.LoginService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final LoginService loginService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticate(@RequestBody @Valid JwtRequest request){
		final JwtResponse response = authService.authenticate(request);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<?> generateAuthenticatedLink(@RequestBody ForgottenPasswordDTO data){
		authService.recoverPassword(data);
		return ResponseEntity.noContent().build();
	}
	
	@PatchMapping("/login")
	public ResponseEntity<Login> updatePassword(@Valid @RequestBody UpdatePasswordDTO loginNovo,@AuthenticationPrincipal Login login){
		this.loginService.updatePassword(loginNovo, login);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/valid")
	public ResponseEntity<Void> validated(){
		return ResponseEntity.noContent().build();
	}	
}
