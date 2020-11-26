package com.smithmoney.service;

import java.nio.charset.StandardCharsets;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.smithmoney.dto.ContatoDTO;

import lombok.AllArgsConstructor;


@Service
public class ContatoService {
    
	@Autowired
	private JavaMailSender emailSender;
	
	@Value("${api.email.from.address}")
	private String address;
	
	@Value("${api.email.from.name}")
	private String name;
	
	public void sendContact(ContatoDTO contato) {
		
		try {
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message,
					MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
					
			helper.setTo(address);
			helper.setText(contato.getMensagem());
			helper.setSubject(contato.getAssunto() + " - Contato");
			helper.setFrom(address, contato.getNome());
			
			emailSender.send(message);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
}
