# Controles do Gamepad - ᴘᴛ

Os modos Solo e Multijogador aceitam controles reconhecidos pelo navegador por meio da [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) nativa. Não estão incluídas bibliotecas ou drivers de terceiros para controles.

## Controles compatíveis

A implementação utiliza o mapeamento padrão dos navegadores e foi projetada para controles de Xbox One/Series, PlayStation 4 (DualShock 4), PlayStation 5 (DualSense) e outros controles USB/Bluetooth que apresentem um layout compatível. O suporte efetivo depende do sistema operacional, do navegador, do método de conexão e do mapeamento disponibilizado pelo navegador.

## Configuração

1. Conecte o controle via USB ou Bluetooth.
2. Abra o jogo em um navegador moderno que ofereça suporte à Gamepad API. Ambientes de produção devem utilizar HTTPS; o `localhost` é adequado para desenvolvimento.
3. Pressione qualquer botão no controle, caso o navegador ainda não tenha ativado o dispositivo.
4. Verifique a mensagem de status abaixo do jogo para confirmar se o controle foi detectado.
5. Utilize o direcional digital (D-pad) ou o analógico esquerdo para controlar a direção.

Alguns navegadores só reconhecem o controle após o usuário pressionar um botão. Esse comportamento é esperado.

## Mapeamento de botões

| Entrada | Solo | Multijogador |
| --- | --- | --- |
| Direcional digital (D-pad) | Controlar direção | Controlar direção |
| Analógico esquerdo | Controlar direção | Controlar direção |
| A (Xbox) / X (PlayStation) | Reiniciar após vitória ou derrota | Entrar no jogo (a partir da tela de nome); retornar ao jogo após eliminação |
| Start (Xbox) / Options (PlayStation) | Pausar ou retomar | Nenhuma ação |

Cada comando de direção é enviado apenas uma vez, até que o analógico ou o direcional digital retorne à posição neutra. Isso evita que o envio repetido de comandos sobrecarregue o WebSocket no modo multijogador.

## Solução de problemas

- **Não detectado:** reconecte o controle, pressione um botão e verifique se o sistema operacional o reconhece.
- **Problemas com Bluetooth:** tente conectar via USB e feche outros aplicativos que possam estar utilizando o controle.
- **Botões incorretos:** verifique se o navegador está utilizando o mapeamento padrão. Layouts não padronizados podem variar de acordo com o navegador e o sistema operacional. - **Sem atualização de status:** utilize um navegador atualizado e execute o jogo via HTTPS ou localhost.
- **Falha no movimento em modo multijogador:** verifique se o servidor WebSocket está em execução e se o jogador entrou na sala.

Os controles por teclado e toque permanecem disponíveis e não são desativados pelo suporte a controles (gamepads).