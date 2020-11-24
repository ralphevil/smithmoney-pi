package com.smithmoney.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categoria")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class Categoria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
<<<<<<< HEAD
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
=======
		
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
>>>>>>> 2f3702a78cfbbde326aa0d15c6dd16c0c748b2a1
	private TipoLancamento tipo;
		
	@Column(length = 60, nullable = false)
	private String categoria;
}
