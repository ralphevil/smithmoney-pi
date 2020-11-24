package com.smithmoney.exception;

public class DataIntegrityException extends RuntimeException{

	private static final long serialVersionUID = 1673547632L;
	
	public DataIntegrityException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public DataIntegrityException(String msg) {
		super(msg);
	}
	
}