package com.smithmoney.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.smithmoney.dto.UpdatePasswordDTO;
import com.smithmoney.model.Login;
import com.smithmoney.repository.LoginRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoginService {

	private final LoginRepository loginRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	public Login findByUsername(String username) {
		return this.loginRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado na base de dados"));
	}
	
	public Login updatePassword(UpdatePasswordDTO loginNovo, Login login) {
		Login loginSalvo = this.findByUsername(login.getUsername());		
		if(loginNovo.getPassword() != null) loginSalvo.setPassword(this.passwordEncoder.encode(loginNovo.getPassword()));		
		return this.loginRepository.save(loginSalvo);
	}
	
	
}
