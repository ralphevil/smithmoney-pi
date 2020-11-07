package com.smithmoney.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

	private Long id;
	
    @Size(min =6, max = 60)
	private String nome;
	
	@Email
    @Size(min =6, max = 60)
	private String email;
		
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	private LocalDate dataNascimento;
	
    @Size(max = 10)
	private String genero;
	
    @Size(min =6)
	private String password;
}
