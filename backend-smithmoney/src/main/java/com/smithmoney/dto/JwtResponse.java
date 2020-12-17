package com.smithmoney.dto;

import com.smithmoney.model.Usuario;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class JwtResponse {

	private String token;
	private Usuario user;
}
