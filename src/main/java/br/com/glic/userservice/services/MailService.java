package br.com.glic.userservice.services;

import br.com.glic.userservice.dto.SendEmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void sendEmail(SendEmailRequest request) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setFrom(from);
            helper.setTo(request.to());
            helper.setSubject("Glic - Recovery Password");
            String resetUrl = "https://seusite.com/reset-password?token=" + request.token();
            String html = """
                    <html>
                      <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
                        <div style="max-width: 500px; margin: auto; background-color: white; padding: 20px; border-radius: 10px;">
                          <h2 style="color: #333;">Recuperação de Senha</h2>
                          <p>Olá,</p>
                          <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para continuar:</p>
                          <p style="text-align: center;">
                            <a href="%s" style="display: inline-block; background-color: #4CAF50; color: white; 
                                padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                              Redefinir Senha
                            </a>
                          </p>
                          <p>Se você não solicitou isso, ignore este e-mail.</p>
                          <p style="color: #777; font-size: 12px;">© 2025 Glic</p>
                        </div>
                      </body>
                    </html>
                    """.formatted(resetUrl);
            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
