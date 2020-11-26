package com.smithmoney.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Mail {

	private String fromEmail;
	private String toEmail;
	private String subject;
	private String fromName;
}
