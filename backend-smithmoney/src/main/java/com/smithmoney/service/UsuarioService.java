package com.smithmoney.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.smithmoney.dto.UsuarioDTO;
import com.smithmoney.exception.ArgumentNotValidException;
import com.smithmoney.exception.ObjectNotFoundException;
import com.smithmoney.model.Login;
import com.smithmoney.model.Usuario;
import com.smithmoney.repository.LoginRepository;
import com.smithmoney.repository.UsuarioRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UsuarioService {

	private final UsuarioRepository usuarioRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	@Transactional
	public Usuario create(UsuarioDTO usuarioDTO) {
		Usuario usuario = createDTO(usuarioDTO);
		return this.usuarioRepository.save(usuario);
	}
	
	@Transactional
	public Usuario update(UsuarioDTO usuarioDTO) {
		Usuario usuarioSalvo = this.findById(usuarioDTO.getId());
		
		if(usuarioDTO.getNome() != null) usuarioSalvo.setNome(usuarioDTO.getNome());
		if(usuarioDTO.getEmail()!= null) usuarioSalvo.setEmail(usuarioDTO.getEmail());
		if(usuarioDTO.getDataNascimento() != null) usuarioSalvo.setDataNascimento(usuarioDTO.getDataNascimento());
		if(usuarioDTO.getGenero() != null) usuarioSalvo.setGenero(usuarioDTO.getGenero());
		if(usuarioDTO.getCelular() != null) usuarioSalvo.setCelular(usuarioDTO.getCelular());
		if(usuarioDTO.getFoto() != null) usuarioSalvo.setFoto(usuarioDTO.getFoto());
		
		return this.usuarioRepository.save(usuarioSalvo);
	}
	
	public Usuario findById(Long id) {
        Optional
            .ofNullable(id)
            .orElseThrow(() -> new ArgumentNotValidException("Id não pode ser nulo"));

        return this.usuarioRepository.findById(id)
            .orElseThrow(() -> new ObjectNotFoundException("Usuário de id " + id + " não encontrado"));
    }
	
	public Usuario findByEmail(String email) {
        Optional
            .ofNullable(email)
            .orElseThrow(() -> new ArgumentNotValidException("Email não pode ser nulo"));

        return this.usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new ObjectNotFoundException("Usuário de email: " + email + " não encontrado"));
    }
	
	public List<Usuario> findAll(){
		return this.usuarioRepository.findAll();
	}
	
	@Transactional
	public void delete(Long id) {
		this.findById(id);
		this.usuarioRepository.deleteById(id);
	}
	
	public Usuario createDTO(UsuarioDTO usuarioDTO) {
		Usuario usuario = Usuario.builder()
				.nome(usuarioDTO.getNome())
				.email(usuarioDTO.getEmail())
				.login(
					Login.builder()
						.username(usuarioDTO.getEmail())
						.password(this.passwordEncoder.encode(usuarioDTO.getPassword()))
						.build())
				.build();
		
		return usuario;
	}
}
