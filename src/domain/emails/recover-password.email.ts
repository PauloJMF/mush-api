import { EmailTemplate } from './index'
import { baseEmail } from './base.email'

function recoverPasswordEmail (name: string, recoverLink: string): EmailTemplate {
  const subject = 'Solicitação de Troca de Senha do Mush Manager'
  const text = ''
  const html = `<tr style="margin-top: 10px">
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; margin-top: 25px">
            Olá ${name},</p>
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
            Uma solicitação de recuperação de senha foi realizada para sua conta no Mush Manager. Se você não foi o autor, apenas descarte esse e-mail.<br><br>
            Para continuar com a recuperação de senha clique no botão abaixo para criar uma nova senha. Ah, esse link expira em 30 minutos.
        </p>
        <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
            <tbody>
            <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                    <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                        <tbody>
                        <tr align="center">
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 10px; text-align: center;">
                                <a href="${recoverLink}" target="_blank"
                                   style="display: inline-block; color: #FFF; background-color: #4338CA; border: solid 1px #4338CA; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 8px 16px; text-transform: capitalize;">
                                    Recuperar minha senha
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    </td>
</tr>
  `
  return {
    subject,
    text,
    html: baseEmail(html)
  }
}

export { recoverPasswordEmail }
