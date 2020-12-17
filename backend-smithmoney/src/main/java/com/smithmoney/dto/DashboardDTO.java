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
public class DashboardDTO {

	private Double contaTotal;
	
	private Double despesaTotal;
	
	private Double receitaTotal;
	
	private Double total;
}
