package com.smithmoney.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smithmoney.model.Login;
import com.smithmoney.repository.LoginRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoginService {

	private final LoginRepository loginRepository;
	
	public Login findByUsername(String username) {
		return this.loginRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado na base de dados"));

	}
}
