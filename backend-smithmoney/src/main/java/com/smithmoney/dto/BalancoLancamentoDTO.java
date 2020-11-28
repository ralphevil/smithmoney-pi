package com.smithmoney.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BalancoLancamentoDTO {

	private Double total;
	
	private Double pago;
	
	private Double pendente;
}
