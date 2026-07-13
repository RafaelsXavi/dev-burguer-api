# 📋 TODO - DevBurguer API

## 🚀 Funcionalidades Futuras Planejadas

### 🔍 Product Search & Filtering
**Prioridade: Alta**
- Implementar busca de produtos por nome
- Adicionar filtros por categoria
- Filtrar por faixa de preço
- Filtrar produtos em oferta (offer=true)
- Implementar paginação para listas de produtos
- Adicionar ordenação (preço, nome, popularidade)

**Benefícios:**
- Melhora significativa na experiência do usuário
- Facilita a descoberta de produtos
- Essencial para catálogos grandes

### ❌ Order Cancellation
**Prioridade: Alta**
- Permitir que usuários cancelem seus próprios pedidos
- Implementar validação de status (só cancelar se status for "Pedido realizado")
- Adicionar endpoint `DELETE /orders/:id` ou `PATCH /orders/:id/cancel`
- Notificar administradores sobre cancelamentos
- Histórico de cancelamentos

**Benefícios:**
- Melhora experiência do cliente
- Reduz workload de suporte
- Controle melhor do fluxo de pedidos

### 📦 Inventory Management
**Prioridade: Média**
- Adicionar campo `quantity` na tabela de produtos
- Implementar atualização automática de estoque em pedidos
- Validação de estoque antes de criar pedido
- Alertas de estoque baixo
- Endpoint para administradores gerenciarem estoque
- Relatórios de movimentação de estoque

**Benefícios:**
- Evita vendas de produtos indisponíveis
- Melhora gestão de negócio
- Prevenção de problemas operacionais

## 🛠️ Melhorias Técnicas

### 🔒 Segurança
- [ ] Implementar rate limiting para prevenir ataques de força bruta
- [ ] Adicionar CORS mais granular (especificar domínios permitidos)
- [ ] Implementar sanitização de inputs contra XSS
- [ ] Adicionar validação de email mais robusta
- [ ] Implementar refresh tokens para JWT
- [ ] Adicionar logs de auditoria para ações administrativas

### 📊 Monitoramento & Logging
- [ ] Implementar sistema de logging estruturado (Winston ou Pino)
- [ ] Adicionar métricas de performance (Prometheus/Grafana)
- [ ] Implementar health checks para kubernetes/docker
- [ ] Monitoramento de erros em tempo real (Sentry)
- [ ] Logs de acesso e uso da API

### 🧪 Testes
- [ ] Expandir cobertura de testes unitários
- [ ] Adicionar testes de integração para todos os endpoints
- [ ] Implementar testes E2E com Cypress ou Playwright
- [ ] Testes de carga e performance (Artillery/k6)
- [ ] Testes de segurança automatizados

### 🏗️ Arquitetura
- [ ] Implementar cache (Redis) para endpoints frequentemente acessados
- [ ] Adicionar fila de processamento para pedidos (Bull/Queue)
- [ ] Implementar sistema de notificações (WebSocket/Socket.io)
- [ ] Adicionar suporte a transações distribuídas
- [ ] Implementar arquitetura de microserviços se necessário

### 📱 API Documentation
- [ ] Implementar Swagger/OpenAPI documentation
- [ ] Adicionar exemplos de requisições/respostas
- [ ] Documentar códigos de erro
- [ ] Criar coleção do Postman
- [ ] Adicionar versionamento da API

### 🔧 Database
- [ ] Implementar backups automatizados do PostgreSQL
- [ ] Adicionar replicação para alta disponibilidade
- [ ] Otimizar queries com índices apropriados
- [ ] Implementar migrations rollback
- [ ] Adicionar seeding de dados de desenvolvimento

### 🚀 Performance
- [ ] Implementar compressão de respostas (gzip/brotli)
- [ ] Adicionar CDN para imagens estáticas
- [ ] Otimizar tamanho de imagens uploadadas
- [ ] Implementar lazy loading para relacionamentos
- [ ] Adicionar connection pooling otimizado

## 🐛 Bugs Conhecidos Corrigidos

- ✅ **Potential null reference error** em CategoryController - Adicionado optional chaining (`?.`) para `request.files`
- ✅ **Lack of status validation** em OrderSchema - Adicionado validação Yup com `oneOf()` para garantir status válidos
- ✅ **Missing error handling** em vários controllers - Melhorado tratamento de erros consistentemente

## 📝 Notas de Desenvolvimento

### Próximos Passos Imediatos
1. Implementar Product Search & Filtering (alto impacto, baixa complexidade)
2. Adicionar Order Cancellation (essencial para UX)
3. Expandir suíte de testes (garantir qualidade)

### Stack Tecnológica Considerada
- **Cache:** Redis
- **Fila:** Bull (baseado em Redis)
- **Logging:** Winston
- **Monitoramento:** Prometheus + Grafana
- **Documentação:** Swagger/OpenAPI
- **Testes E2E:** Playwright

---

*Última atualização: 2026-07-13*
*Prioridades baseadas em impacto no usuário e complexidade de implementação*