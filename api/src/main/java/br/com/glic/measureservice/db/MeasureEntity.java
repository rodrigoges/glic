package br.com.glic.measureservice.db;

import br.com.glic.measureservice.enums.MeasureStatusEnum;
import br.com.glic.userservice.db.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "measures")
@NoArgsConstructor
@AllArgsConstructor
public class MeasureEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "measure_id", nullable = false, updatable = false)
    private UUID measureId;

    @Column(name = "value", nullable = false)
    private Integer value;

    @Column(name = "date_creation", nullable = false)
    private OffsetDateTime dateCreation;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 16)
    private MeasureStatusEnum status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_measures_users"))
    private UserEntity user;
}
