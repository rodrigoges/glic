package br.com.glic.measureservice.mappers;

import br.com.glic.measureservice.db.MeasureEntity;
import br.com.glic.measureservice.dto.MeasureResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MeasureMapper {

    @Mapping(target = "measureId", source = "measureId")
    @Mapping(target = "value", source = "value")
    @Mapping(target = "dateCreation", source = "dateCreation")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "userId", source = "user.userId")
    MeasureResponse toResponse(MeasureEntity entity);
}
