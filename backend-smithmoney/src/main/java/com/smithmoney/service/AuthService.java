package com.smithmoney.service;

import javax.transaction.Transactional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.smithmoney.dto.ForgottenPasswordDTO;
import com.smithmoney.dto.JwtRequest;
import com.smithmoney.dto.JwtResponse;
import com.smithmoney.model.Login;
import com.smithmoney.model.Usuario;
import com.smithmoney.security.JwtUtil;
import com.smithmoney.util.Mail;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final LoginService loginService;
	private final UsuarioService usuarioService;
	private final JwtUtil jwtUtil;
	private final EmailService emailService;
	
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
	
	@Transactional
	public void recoverPassword(ForgottenPasswordDTO dto) {
			Login user = loginService.findByUsername(dto.getEmail());		
			Login login = user;
			String token = jwtUtil.generateToken(login);			
			Mail mail = new Mail();			
			mail.setToEmail(dto.getEmail());
			mail.setSubject("Recuperação de Senha - Smith Money");
			emailService.sendEmail(mail, token);			
		}
	}
