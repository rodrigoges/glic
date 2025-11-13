package br.com.glic.measureservice.db;

import br.com.glic.measureservice.enums.MeasureStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.UUID;

public interface MeasureRepository extends JpaRepository<MeasureEntity, UUID> {

    Page<MeasureEntity> findByStatus(MeasureStatusEnum status, Pageable pageable);

    Page<MeasureEntity> findByDateCreationBetween(OffsetDateTime from, OffsetDateTime to, Pageable pageable);

    Page<MeasureEntity> findByStatusAndDateCreationBetween(
            MeasureStatusEnum status, OffsetDateTime from, OffsetDateTime to, Pageable pageable
    );
}
