export class PesoService {
  constructor(clienteESP32) {
    this.clienteESP32 = clienteESP32;
  }

  async obterPeso() {
    return this.clienteESP32.receberPeso();
  }
}
