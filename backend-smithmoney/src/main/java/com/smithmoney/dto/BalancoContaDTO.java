package com.smithmoney.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class BalancoContaDTO {

	private Double total;
	
	private Double corrente;
	
	private Double poupanca;
	
	private Double carteira;
}
