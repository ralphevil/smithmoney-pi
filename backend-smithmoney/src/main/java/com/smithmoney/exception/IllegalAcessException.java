package com.smithmoney.exception;

public class IllegalAcessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public IllegalAcessException(String message, Throwable cause) {
		super(message, cause);
	}

	public IllegalAcessException(String message) {
		super(message);
	}
	
	

}
