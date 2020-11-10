package com.smithmoney.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smithmoney.repository.LoginRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements UserDetailsService {

	private final LoginRepository loginRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return this.loginRepository.findByUsername(username)
	            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado na base de dados"));
	}

}
