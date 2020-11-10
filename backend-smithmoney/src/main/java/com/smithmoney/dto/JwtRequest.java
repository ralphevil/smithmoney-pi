package com.smithmoney.dto;

import javax.validation.constraints.NotBlank;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class JwtRequest {

	@NotBlank
	private String username;
	
	@NotBlank
	private String password;
}
