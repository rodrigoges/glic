package br.com.glic.userservice.api;

import br.com.glic.userservice.dto.SendEmailRequest;
import br.com.glic.userservice.services.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailController {

    private final MailService mailService;

    @PostMapping
    public ResponseEntity<String> sendEmail(@RequestBody SendEmailRequest request) {
        mailService.sendEmail(request);
        return ResponseEntity.ok().body("E-mail send successfully");
    }
}
