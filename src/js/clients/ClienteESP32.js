export class ClienteESP32 {
  constructor(endereco) {
    this.endereco = endereco.replace(/\/$/, '');
  }

  async receberPeso() {
    const resposta = await fetch(`${this.endereco}/weight`);

    if (!resposta.ok) {
      throw new Error(`Erro ao consultar a balança: HTTP ${resposta.status}`);
    }

    return resposta.json();
  }
}
