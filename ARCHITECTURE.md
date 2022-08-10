[gitmd]:https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

# Documentação da arquitetura do projeto 
## N-Tiers Architecture
    Entendo que para resolver o problema do desafio teria mais do que uma entidade, cada entidade com suas regras de validação especificas e que haveria relacionamento entre as entidades, este padrão me pareceu o ideal para organizar o projeto.

## Factory
    Na solução implementada o padrão Factory foi utilizado para criar instancias de serviços das entidades, dessa maneira a sequência de ações e as dependencias para crição das instancias ficaram somente em um lugar centralizado.

## Abstract Factory
    Utilizei nas entidades de mensagem de forma a obrigar que todas elas tenham o metodo sendMessage 
 
## Dependency Injection
    Usei para deixar as camadas mais desaclopadas possível e facilitar os testes.

## Facade
    Utilizei para disponbilizar uma interface simplificada para ação de enviar mensagem caso o usuário tenha créditos para o envio da mensagem. Considerando que seria o padrão ideal para quando temos que juntar ações
    de entidades diferentes do sistema. 
    
## Object Mother
    Uitilizei para teste da camada de serviço do Credito do usuário. Esta é camada onde estão concentradas várias regras de negócio, sendo que para testar as regras precisava da entidade Crédito do Usuário carregada com muitas
    variações. Com Object Mother essa variações ficaram nomeadas, facil de serem reutilizadas  e montadas.