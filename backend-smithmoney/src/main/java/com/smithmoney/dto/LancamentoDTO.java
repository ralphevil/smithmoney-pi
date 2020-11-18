package com.smithmoney.dto;

import java.time.LocalDate;

import com.smithmoney.model.TipoLancamento;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LancamentoDTO {

	private Long id;
	
	private String descricao;
	
	private String categoria;
	
	private LocalDate dataVencimento;

	private double valor;
	
	private TipoLancamento tipo;
	
	private Boolean pago;
	
	private Long contaId;
}
