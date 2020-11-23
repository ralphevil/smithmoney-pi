package com.smithmoney.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.CollectionId;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
public class Contato {

    @Column(length = 60, nullable = false)
    private String nome;

    @Column(length = 60, nullable = false)
    private String email;

    @Column(length = 60, nullable = false)
    private String email;

    @Column(length = 60, nullable = false)
    private String menssagem;
    
}
