package com.smithmoney.dto;

import javax.validation.constraints.NotNull;

import com.smithmoney.model.TipoConta;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContaDTO {

	
	private String nome;
	
	
	private double saldo;
	
	
	private String banco;
	
	
	private TipoConta tipoConta;
}
