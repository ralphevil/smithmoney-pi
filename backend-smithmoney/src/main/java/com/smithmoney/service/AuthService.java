package com.smithmoney.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.smithmoney.dto.JwtRequest;
import com.smithmoney.dto.JwtResponse;
import com.smithmoney.model.Login;
import com.smithmoney.model.Usuario;
import com.smithmoney.security.JwtUtil;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final  LoginService loginService;
	private final UsuarioService usuarioService;
	private final JwtUtil jwtUtil;
	
	public JwtResponse authenticate(JwtRequest request) {
		final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					request.getUsername(),
					request.getPassword()
				));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final Login login = this.loginService.findByUsername(request.getUsername());
		final Usuario user = this.usuarioService.findByEmail(request.getUsername());
		final String token = jwtUtil.generateToken(login);
		return JwtResponse.builder().token(token).user(user).build();

	}
}
