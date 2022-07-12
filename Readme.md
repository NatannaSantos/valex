<p align="center">
  <a href="https://github.com/NatannaSantos/valex">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    $Valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/NatannaSantos/valex

$ cd $valex

$ npm install

$ npm run dev
```

API:

```
- POST /cards
    - Rota para gerar um novo cartão
    
- PATCH /cards/:id/activate
    - Rota para ativar o cartão
   
- PATCH /cards/:id/blockcard
    - Rota para bloquear um cartão
    
- PATCH /cards/:id/unblockcard
    - Rota para desbloquear um cartão
   
- POST /cards/:id/recharge
    - Rota para criar uma recarga
   
- POST /cards/:id/payment
    - Rota para criar uma transação (pagamento)

- GET /cards/:id/transactions
    - Rota para visualizar saldos e transações   
```