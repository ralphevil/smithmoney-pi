package com.smithmoney.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smithmoney.dto.BalancoCategoriaDTO;
import com.smithmoney.dto.BalancoPendenteDTO;
import com.smithmoney.dto.DashboardDTO;
import com.smithmoney.model.Lancamento;
import com.smithmoney.model.Login;
import com.smithmoney.model.TipoLancamento;
import com.smithmoney.service.DashboardService;

import lombok.AllArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/api/dashboard")
@AllArgsConstructor
public class DashboardController {

	private final DashboardService dashboardService;
	
	@GetMapping("/total/mes/{mes}")
	public ResponseEntity<DashboardDTO> getTotalDashboard(@PathVariable int mes, @AuthenticationPrincipal Login login){
		DashboardDTO dashboard = this.dashboardService.getTotalDashboard(login.getId(), mes);
		return ResponseEntity.ok(dashboard);
	}
	
	@GetMapping("/categoria/mes/{mes}")
	public ResponseEntity<List<BalancoCategoriaDTO>> getAllCategoryDashboard(@PathVariable int mes, @AuthenticationPrincipal Login login){
		List<BalancoCategoriaDTO> balanco = this.dashboardService.getAllCategoryDashboard(login.getId(), mes);
		return ResponseEntity.ok(balanco);
	}
	
	@GetMapping("/categoria/mes/{mes}/tipo/{tipo}")
	public ResponseEntity<List<BalancoCategoriaDTO>> getCategoryDashboard(@PathVariable int mes, TipoLancamento tipo, @AuthenticationPrincipal Login login){
		List<BalancoCategoriaDTO> balanco = this.dashboardService.getCategoryDashboard(login.getId(), mes, tipo);
		return ResponseEntity.ok(balanco);
	}
	
	@GetMapping("/pendente/tipo/{tipo}")
	public ResponseEntity<List<Lancamento>> pendingByType(@PathVariable TipoLancamento tipo, @AuthenticationPrincipal Login login){
		List<Lancamento> lancamentos = this.dashboardService.pendingByType(login.getId(), tipo);
		return ResponseEntity.ok(lancamentos);
	}
	
	@GetMapping("/pendente/total")
	public ResponseEntity<BalancoPendenteDTO> totalPendingByType(@AuthenticationPrincipal Login login){
		BalancoPendenteDTO balanco = this.dashboardService.totalPendingByType(login.getId());
		return ResponseEntity.ok(balanco);
	}
}
