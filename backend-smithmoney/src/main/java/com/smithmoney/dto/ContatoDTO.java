package com.smithmoney.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContatoDTO {

    private String nome;

    private String email;

    private String assunto;
    
    private String mensagem;
}
