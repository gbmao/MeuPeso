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

# Arquitetura

## clients

- responsável por receber as informações e enviar para o service

## services

- camada com as regras de negocio
- valida o valor do peso
- calcula os ganhos/perde

## repository

- basicamente vai ser quem vai conversar com o SQLite

# Android

O projeto usa Capacitor 8, Android Gradle Plugin 8.13 e Java 21. No Android Studio, selecione o Gradle Wrapper do projeto e um JDK 21 ou mais novo nas configurações de Gradle. O Gradle 9.6 não é compatível com o AGP 8.13; o wrapper do projeto está na versão 8.14.3.

Ao compilar pelo terminal, configure `JAVA_HOME` para esse mesmo JDK e `ANDROID_HOME` para o Android SDK. O terminal usa `JAVA_HOME`; a configuração de JDK do Android Studio só vale para builds iniciados pela IDE.

Com o Android Studio instalado, `JAVA_HOME` e `ANDROID_HOME` configurados para JDK 21 e Android SDK, e o celular conectado com depuração USB habilitada, compile, instale e abra o app com:

```bash
npm ci
npm run android:run
```

Se houver mais de um dispositivo conectado, indique o serial do celular:

```bash
npm run android:run -- --target=SERIAL_DO_CELULAR
```

Para apenas gerar/sincronizar os arquivos Android antes de abrir o projeto no Android Studio:

```bash
npm run android:sync
```
