# MeuPeso

Aplicativo feito para rodar em celular capaz de receber um peso via HTTP.
A idéia é que você consiga configurar uma balança com ESP32(ou qualquer outra coisa capaz de enviar um POST http)
e o app receber os dados, armazenar, e devolver um balanço de ganhos e perdas de peso
(sim, eu comprei um ESP32 e não tenho medo de usa-lo)

# MVP

- Armazenar um valor númerico  que representa o peso
- conseguir o peso enviado pelo ESP32
- salvar o peso no celular


# Fluxo

┌──────────────┐
│    HX711     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    ESP32     │
│              │
│ GET /weight  │
└──────▲───────┘
       │ HTTP
       │
┌──────┴───────┐
│    MeuPeso   │
│  Capacitor   │
│  JavaScript  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    SQLite    │
│              │
│ 72.35        │
│ 72.10        │
│ 71.90        │
└──────────────┘
# Escolhas

## Capacitor

Já havia tido um pequeno contato com ele no meu outro projeto. Dessa vez o escolhi por sugestão da IA que o sugeriu por minha afinidade com HTTP/HTML

## JavaScript

Eu trabalho com ele no estágio, não sei como não o usar. Mas irei delegar toda a geração de código para a IA. Ficarei apenas com a lógica.

## SQLite

Sei que existem formas mais simples/práticas de armazenar dados TÃO simples como o valor do peso de uma pessoa. Porém
eu trabalho com banco relacional no meu estágio e toda oportunidade que tenho de treinar com ele, vou estar usando.
E além disso, no fundo do meu coração sempre que começo um projeto eu imagino na sua capacidade de crescer, caso esse seja o caso do MeuPeso, acredito que deixar a lógica dentro do banco seria a melhor opção. 

