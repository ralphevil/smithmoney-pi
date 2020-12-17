package com.smithmoney.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.smithmoney.model.Login;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    
	@Value("${jwt.validity}")
    private Long JWT_VALIDITY;

    public String generateToken(Login login) {
        final Map<String, Object> claims = new HashMap<>();
        claims.put("usrid", login.getUsuario().getId());
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(login.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + JWT_VALIDITY))
            .signWith(key)
            .compact();
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public String getSubject(String token) {
        return getClaims(token).getSubject();
    }

    public Date getExpirationDate(String token) {
        return getClaims(token).getExpiration();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDate(token);
        return expiration.before(new Date());
    }

    public Boolean validateToken(String token) {
        return (getClaims(token) != null && !isTokenExpired(token));
    }

    public Login getUser(String token) {
        final Claims claims = getClaims(token);
        final Long id = claims.get("usrid", Long.class);
        final String username = claims.getSubject();
        return Login.builder()
            .id(id)
            .username(username)
            .build();
    }
}
