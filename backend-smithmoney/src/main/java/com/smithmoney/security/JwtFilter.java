package com.smithmoney.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.smithmoney.model.Login;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer")) {
			UsernamePasswordAuthenticationToken auth = getAuthentication(header.substring(7));
			if (auth != null) {
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
		}
		filterChain.doFilter(request, response);		
	}
	
	private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (jwtUtil.validateToken(token)) {
            Login login = jwtUtil.getUser(token);
            return new UsernamePasswordAuthenticationToken(login, null, login.getAuthorities());
        }
        return null;
    }

}
