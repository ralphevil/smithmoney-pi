package com.smithmoney.model;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lancamento")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Lancamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	
	@Column(length = 100, nullable = false)
	private String descricao;
	
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	@Column(length = 10, nullable = false)
	private LocalDate dataAtual;
	
	@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
	@Column(length = 10, nullable = false)
	private LocalDate dataVencimento;
	
	@Column(nullable = false)
	private double valor;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private TipoLancamento tipo;
	
	@Column(nullable = false)
	private Boolean pago;
	
	@ManyToOne
	@JoinColumn(name = "conta_id", nullable = false)
	private Conta conta;
	
	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "categoria_id", nullable = false)
	private Categoria categoria;
	
	@ManyToOne
	@JoinColumn(name = "usuario_id", nullable = false)
	@JsonIgnore
	private Usuario usuario;
}
