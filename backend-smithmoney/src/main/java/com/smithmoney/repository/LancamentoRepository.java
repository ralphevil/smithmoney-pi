package com.smithmoney.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smithmoney.model.Lancamento;
import com.smithmoney.model.TipoLancamento;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

	@Query(value = "select l from Lancamento l where usuario_id = :usuarioId")
	List<Lancamento> findAllByUser(Long usuarioId);
	
	@Query(value = "select l from Lancamento l where usuario_id = :usuarioId and month(data_atual) = :mes")
	List<Lancamento> findAllByMonth(Long usuarioId, int mes);
	
	@Query(value = "select l from Lancamento l where usuario_id = :usuarioId and pago = :pago")
	List<Lancamento> findAllByPaid(Long usuarioId, boolean pago);
	
	@Query(value = "select l from Lancamento l where usuario_id = :usuarioId and tipo = :tipo")
	List<Lancamento> findAllByType(Long usuarioId, TipoLancamento tipo);
	
	@Query(value = "select l from Lancamento l where usuario_id = :usuarioId and categoria_id = :categoriaId")
	List<Lancamento> findAllByCategory(Long usuarioId, Long categoriaId);
	
}
