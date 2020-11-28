package com.smithmoney.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smithmoney.dto.DashboardDTO;
import com.smithmoney.model.Login;
import com.smithmoney.service.DashboardService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/dashboard")
@AllArgsConstructor
public class DashboardController {

	private final DashboardService dashboardService;
	
	@GetMapping("/mes/{mes}")
	public ResponseEntity<DashboardDTO> getDashboard(@PathVariable int mes, @AuthenticationPrincipal Login login){
		DashboardDTO dashboard = this.dashboardService.getDashboard(login.getId(), mes);
		return ResponseEntity.ok(dashboard);
	}
}
