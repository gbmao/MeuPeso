export class PesoService {
  constructor(clienteESP32, pesoRepository) {
    this.clienteESP32 = clienteESP32;
    this.pesoRepository = pesoRepository;
  }

  async obterPeso() {
    const mensagem = await this.clienteESP32.receberPeso();
    await this.pesoRepository.salvar(mensagem.weight, new Date().toISOString());

    return mensagem;
  }

  async listarPesos() {
    return this.pesoRepository.listar();
  }
}
