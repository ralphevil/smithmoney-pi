package com.smithmoney.exception;

public class ArgumentNotValidException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ArgumentNotValidException(String message, Throwable cause) {
		super(message, cause);
	}

	public ArgumentNotValidException(String message) {
		super(message);
	}
}
