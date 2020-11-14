package com.smithmoney.model;

import lombok.Getter;
import java.util.Arrays;
import com.smithmoney.exception.*;

@Getter
public enum TipoConta {
	
	CONTA_CORRENTE(0),
	CONTA_POUPANCA(1);
	
	
	
	private TipoConta(int id) {
		this.id = id;
	}
	
	private int id;
	
	public static TipoConta fromId(int id) {
		return Arrays
				.stream(TipoConta.values())
				.filter(v -> v.getId() == id)
				.findFirst()
				.orElseThrow(() -> new ObjectNotFoundException("TipoConta de id " + id + " não encontrada"));
	}


}
