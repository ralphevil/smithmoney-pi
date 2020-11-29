package com.smithmoney.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	
	@Column(length = 60, nullable = false)
	private String nome;
	
	@Column(length = 60, nullable = false, unique = true)
	private String email;
		
	@Column(length = 10)
	private LocalDate dataNascimento;
	
	@Column(length = 15)
	private String celular;
	
	private String foto;
	
	@Column(length = 10)
	private String genero;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "login_id", nullable = false)
	@JsonIgnore
	private Login login;
	
	@OneToMany(mappedBy ="usuario", cascade = CascadeType.ALL)
	@JsonIgnore
	Set<Conta> contas = new HashSet<>();
		
}
