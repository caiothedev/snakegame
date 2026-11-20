# CONTRIBUIÇÃO - ᴘᴛ

Obrigado por considerar contribuir com o **SnakeGame**! Este é um projeto de estudos, então toda contribuição — de uma correção de digitação a uma nova funcionalidade — é muito bem-vinda.

## Como Posso Contribuir?

- **Reportando bugs**: abra uma *issue* descrevendo o problema
- **Sugerindo melhorias**: novas ideias para o modo solo, multiplayer ou interface
- **Melhorando a documentação**: README, comentários no código ou este próprio arquivo
- **Enviando código**: correções de bugs, otimizações e novas funcionalidades

## Reportando Bugs

Antes de abrir uma *issue*, verifique se o problema já não foi reportado. Ao criar uma nova, inclua:

- Uma descrição clara do problema
- Passos para reproduzir
- O comportamento esperado e o que aconteceu de fato
- Modo de jogo afetado (solo ou multiplayer)
- Navegador, sistema operacional e versão do Node.js
- Capturas de tela ou mensagens do console, se possível

## Configurando o Ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- [Git](https://git-scm.com) instalado

### Passo a passo

1. Faça um **fork** do repositório
2. Clone o seu fork:

```bash
git clone https://github.com/seu-usuario/snakegame.git
cd snakegame
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie os servidores em dois terminais separados:

```bash
# Terminal 1 — servidor HTTP (porta 3000)
npm start

# Terminal 2 — servidor WebSocket (porta 8080)
npm run server
```

5. Acesse `http://localhost:3000` no navegador

## Fluxo de Contribuição

1. Crie uma *branch* a partir da `main` com um nome descritivo:

```bash
git checkout -b feat/nome-da-funcionalidade
```

   Prefixos sugeridos: `feat/`, `fix/`, `docs/`, `style/`, `refactor/`

2. Faça suas alterações
3. Teste localmente (veja abaixo)
4. Faça commits pequenos e com mensagens claras:

```bash
git commit -m "fix: corrige colisão da cobra com a borda no multiplayer"
```

5. Envie a *branch* para o seu fork:

```bash
git push origin feat/nome-da-funcionalidade
```

6. Abra um **Pull Request** para a `main` explicando o que foi alterado e por quê. Se resolver uma *issue*, mencione-a (ex.: `Closes #12`)

## Padrões de Código

Mantenha a consistência com o código existente:

- **JavaScript puro** — sem frameworks no frontend
- **Indentação de 4 espaços**
- **Sem ponto e vírgula** no final das linhas
- Use `const` e `let` (nunca `var`)
- Nomes de variáveis e funções em **camelCase** e em inglês
- Mensagens exibidas ao jogador em **português**
- Os módulos usam **ES Modules** (`import` / `export`)
- Evite adicionar dependências novas sem necessidade

### Segurança

O servidor HTTP só serve os caminhos públicos listados em `PUBLIC_ENTRIES` (`server.js`). Se você criar uma nova pasta pública, adicione-a lá. Nunca exponha arquivos de servidor ou de configuração.

No servidor WebSocket, **valide todas as mensagens recebidas** dos clientes — nunca confie nos dados enviados pelo navegador.

## Testando

Ainda não há testes automatizados, então teste manualmente antes de abrir o PR:

- **Modo solo**: jogue uma partida completa, teste pausa, game over e troca de cores
- **Modo multiplayer**: abra várias abas em `http://localhost:3000` e verifique se os jogadores aparecem e se movem corretamente
- **Conexão**: abra `test_multiplayer.html` para checar a comunicação com o servidor WebSocket
- **Console**: verifique se não há erros no console do navegador nem no terminal
- **Responsividade**: confira se a interface continua funcionando em telas diferentes

## Dúvidas

Se tiver qualquer dúvida, abra uma *issue*, será um prazer ajudar!

by caiothedev<br/>
#contributing #code