import { EmailTemplate } from './index'
import { baseEmail } from './base.email'

function activationEmail (name: string, email: string, activationLink: string): EmailTemplate {
  const subject = `Bem vindo ${name}`
  const text = 'Bem vindo ao Mush Manager'
  const html = `<tr style="margin-top: 10px">
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px; margin-top: 25px">
            Olá ${name},</p>
        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
            Obrigado por se registrar no Mush Manager.<br><br>
            Para conseguir utilizar os recursos do Mush Manager, ative sua conta através do link abaixo
        </p>
        <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
            <tbody>
            <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                    <table style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                        <tbody>
                        <tr align="center">
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 10px; text-align: center;">
                                <a href="${activationLink}" target="_blank"
                                   style="display: inline-block; color: #FFF; background-color: #4338CA; border: solid 1px #4338CA; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 8px 16px; text-transform: capitalize;">
                                    Confirmar minha conta
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
</tr>`
  return {
    subject,
    text,
    html: baseEmail(html)
  }
}

export { activationEmail }
