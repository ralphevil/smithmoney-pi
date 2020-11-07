package com.smithmoney.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class JwtResponse {

	private String token;
}
