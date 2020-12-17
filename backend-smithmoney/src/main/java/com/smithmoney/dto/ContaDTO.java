package com.smithmoney.dto;

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

	private Long id;
		
	private String nome;
		
	private double saldo;
		
	private String banco;
		
	private TipoConta tipo_Conta;
}
