package com.smithmoney.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EnviarEmail {
    
    @Autowired
    private JavaMailSender javaMailSender;

    void sendEmail() {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("smithmoney0020@gmail.com");
        msg.setText("formulario.conteudo");

        javaMailSender.send(msg);
    }
    
}

