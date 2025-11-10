package br.com.glic.measureservice.api;

import br.com.glic.measureservice.dto.CreateMeasureRequest;
import br.com.glic.measureservice.dto.DeleteMeasureRequest;
import br.com.glic.measureservice.dto.FindMeasureRequest;
import br.com.glic.measureservice.dto.MeasureResponse;
import br.com.glic.measureservice.dto.UpdateMeasureRequest;
import br.com.glic.measureservice.services.MeasureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/measures")
public class MeasureController {

    private final MeasureService measureService;

    @PostMapping
    public ResponseEntity<MeasureResponse> create(@Valid @RequestBody CreateMeasureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(measureService.create(request));
    }

    @PutMapping
    public ResponseEntity<MeasureResponse> update(@Valid @RequestBody UpdateMeasureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(measureService.update(request));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@Valid @RequestBody DeleteMeasureRequest request) {
        measureService.delete(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Measure deleted successfully");
    }

    @GetMapping
    public ResponseEntity<List<MeasureResponse>> find(@ModelAttribute FindMeasureRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(measureService.find(request));
    }
}
